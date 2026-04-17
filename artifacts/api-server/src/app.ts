import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import router from "./routes/index.js";
import { logger } from "./lib/logger.js";

const app: Express = express();
const bundledDir = path.dirname(fileURLToPath(import.meta.url));
const runtimeSearchRoots = Array.from(
  new Set(
    [
      process.env["LAMBDA_TASK_ROOT"],
      process.cwd(),
      bundledDir,
      path.resolve(bundledDir, ".."),
      path.resolve(bundledDir, "..", ".."),
      path.resolve(bundledDir, "..", "..", ".."),
    ].filter((value): value is string => Boolean(value)),
  ),
);
const frontendDistDirCandidates = Array.from(
  new Set(
    runtimeSearchRoots.flatMap((root) => [
      path.resolve(root, "public"),
      path.resolve(root, "dist", "public"),
      path.resolve(root, "artifacts", "api-server", "public"),
      path.resolve(root, "artifacts", "api-server", "dist", "public"),
    ]),
  ),
);
const frontendDistDir =
  frontendDistDirCandidates.find((dir) =>
    existsSync(path.resolve(dir, "index.html")),
  ) ?? frontendDistDirCandidates[0];
const frontendIndexPath = path.resolve(frontendDistDir, "index.html");
const frontendAssetsAvailable = existsSync(frontendIndexPath);
const getFrontendFileChecks = (requestPath: string) => {
  const relativePath = requestPath.replace(/^\/+/, "");

  if (!relativePath) {
    return [];
  }

  return frontendDistDirCandidates.map((dir) => {
    const candidatePath = path.resolve(dir, relativePath);
    const relativeCandidatePath = path.relative(dir, candidatePath);
    const isInsideDir =
      !relativeCandidatePath.startsWith("..") &&
      !path.isAbsolute(relativeCandidatePath);

    return {
      dir,
      candidatePath,
      exists: isInsideDir && existsSync(candidatePath),
    };
  });
};
const resolveFrontendFile = (requestPath: string): string | undefined => {
  const relativePath = requestPath.replace(/^\/+/, "");

  if (!relativePath) {
    return undefined;
  }

  for (const dir of frontendDistDirCandidates) {
    const candidatePath = path.resolve(dir, relativePath);
    const relativeCandidatePath = path.relative(dir, candidatePath);

    if (
      relativeCandidatePath.startsWith("..") ||
      path.isAbsolute(relativeCandidatePath)
    ) {
      continue;
    }

    if (existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  return undefined;
};

if (frontendAssetsAvailable) {
  logger.info({ frontendDistDir }, "Resolved frontend assets directory");
} else {
  logger.warn(
    { frontendDistDirCandidates },
    "Frontend assets were not found in the expected runtime directories",
  );
}

app.use((req: Request, res: Response, next: NextFunction) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    logger.info(
      {
        req: {
          method: req.method,
          url: req.originalUrl.split("?")[0],
        },
        res: {
          statusCode: res.statusCode,
        },
        responseTime: Date.now() - startedAt,
      },
      "request completed",
    );
  });

  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.get("/{*path}", (req, res, next) => {
  if (req.path.startsWith("/api")) {
    next();
    return;
  }

  const frontendFilePath = resolveFrontendFile(req.path);

  if (frontendFilePath) {
    res.sendFile(frontendFilePath, (err) => {
      if (err) {
        next(err);
      }
    });
    return;
  }

  if (path.extname(req.path)) {
    logger.warn(
      {
        requestPath: req.path,
        frontendDistDir,
        checkedPaths: getFrontendFileChecks(req.path),
      },
      "Frontend asset was not found in any runtime candidate directory",
    );
    res.status(404).send("Not Found");
    return;
  }

  if (!frontendAssetsAvailable) {
    logger.error(
      { frontendDistDirCandidates },
      "Cannot serve SPA fallback because index.html is missing",
    );
    res.status(500).send("Frontend assets unavailable");
    return;
  }

  res.sendFile(frontendIndexPath, (err) => {
    if (err) {
      next(err);
    }
  });
});

export default app;
