import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import xlsx from "xlsx";

export type CrystalCatalogSeedEntry = {
  slug: string;
  collection: string;
  section: string | null;
  subsection: string | null;
  name: string;
  description: string | null;
  rawLabel: string;
  sortOrder: number;
  sourceWorkbook: string;
  sourceSheet: string;
};

type CrystalWorkbookParseResult = {
  entries: CrystalCatalogSeedEntry[];
  sheetName: string;
  sourcePath: string;
  workbookName: string;
};

const COLLECTIONS: Record<
  string,
  {
    id: string;
    name: string;
  }
> = {
  B: {
    id: "luminous-collections-of-crystals",
    name: "Luminous Collections of Crystals",
  },
  D: { id: "raw-radiance", name: "Raw Radiance" },
  F: { id: "high-vibration-pyramids", name: "High Vibration Pyramids" },
  H: { id: "alignment-collections", name: "Alignment Collections" },
  I: { id: "jewellery", name: "Jewellery" },
};

const HEADING_PATTERN = /^(?:\d+\.|[a-z]\.|[A-Z]\.)/i;

export function getDefaultCrystalCatalogSeedPath() {
  return fileURLToPath(
    new URL("../../data/crystal-catalog.seed.json", import.meta.url),
  );
}

function sheetToRows(sheet: xlsx.WorkSheet) {
  return xlsx.utils.sheet_to_json<Record<string, string>>(sheet, {
    header: "A",
    defval: "",
  });
}

function isHeading(text: string) {
  const normalized = text.trim().replace(/\s+/g, " ");

  if (!normalized) return false;
  if (HEADING_PATTERN.test(normalized)) return true;

  return (
    normalized === normalized.toUpperCase() &&
    /[A-Z]/.test(normalized) &&
    normalized.length <= 40
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseLabel(rawLabel: string) {
  const normalized = rawLabel.trim().replace(/\s+/g, " ");
  const match = normalized.match(/^(.*?)\((.*?)\)\s*$/);

  if (!match) {
    return { name: normalized.replace(/^[, ]+|[, ]+$/g, ""), description: null };
  }

  return {
    name: match[1].trim().replace(/^[, ]+|[, ]+$/g, ""),
    description: match[2].trim() || null,
  };
}

function parseSheet(
  sheetName: string,
  rows: Record<string, string>[],
  workbookName: string,
) {
  const sections: Record<string, string | null> = {};
  const subsections: Record<string, string | null> = {};
  const entries: CrystalCatalogSeedEntry[] = [];
  const slugCounts = new Map<string, number>();
  let sortOrder = 1;

  for (const row of rows.slice(1)) {
    for (const [column, collectionMeta] of Object.entries(COLLECTIONS)) {
      const value = row[column]?.trim();
      if (!value) continue;

      const normalized = value.replace(/\s+/g, " ");
      if (column === "I" && normalized === collectionMeta.name) continue;

      if (isHeading(normalized)) {
        if (column === "H" && sections[column]?.toLowerCase() === "bracelets") {
          subsections[column] = normalized;
        } else {
          sections[column] = normalized;
          if (column !== "H") {
            subsections[column] = null;
          }
        }
        continue;
      }

      const { name, description } = parseLabel(normalized);
      const baseSlug = slugify(
        [collectionMeta.id, sections[column], subsections[column], name]
          .filter(Boolean)
          .join("-"),
      );
      const duplicateIndex = (slugCounts.get(baseSlug) ?? 0) + 1;
      slugCounts.set(baseSlug, duplicateIndex);
      const slug =
        duplicateIndex === 1 ? baseSlug : `${baseSlug}-${duplicateIndex}`;

      entries.push({
        slug,
        collection: collectionMeta.name,
        section: sections[column] ?? null,
        subsection: subsections[column] ?? null,
        name,
        description,
        rawLabel: normalized,
        sortOrder,
        sourceWorkbook: workbookName,
        sourceSheet: sheetName,
      });
      sortOrder += 1;
    }

    const jewelleryHeading = row["K"]?.trim();
    if (jewelleryHeading) {
      sections.I = jewelleryHeading.replace(/\s+/g, " ");
    }
  }

  return entries;
}

export function parseCrystalCatalogWorkbook(
  workbookPath: string,
): CrystalWorkbookParseResult {
  const sourcePath = path.resolve(workbookPath);
  const workbook = xlsx.readFile(sourcePath);
  const workbookName = path.basename(sourcePath);
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    throw new Error("The workbook does not contain any sheets.");
  }

  const rows = sheetToRows(workbook.Sheets[sheetName]!);

  return {
    entries: parseSheet(sheetName, rows, workbookName),
    sheetName,
    sourcePath,
    workbookName,
  };
}

export async function loadCrystalCatalogSeedData(sourcePath?: string) {
  const resolvedPath = path.resolve(sourcePath ?? getDefaultCrystalCatalogSeedPath());
  const extension = path.extname(resolvedPath).toLowerCase();

  if (extension === ".xlsx" || extension === ".xls") {
    const parsed = parseCrystalCatalogWorkbook(resolvedPath);
    return {
      entries: parsed.entries,
      sourcePath: parsed.sourcePath,
      sourceType: "workbook" as const,
    };
  }

  if (extension !== ".json") {
    throw new Error(
      `Unsupported crystal catalog source: ${resolvedPath}. Use a .json or .xlsx file.`,
    );
  }

  const fileContents = await readFile(resolvedPath, "utf8");
  const parsed = JSON.parse(fileContents) as CrystalCatalogSeedEntry[];

  return {
    entries: parsed,
    sourcePath: resolvedPath,
    sourceType: "json" as const,
  };
}

export async function writeCrystalCatalogSeedFile(
  entries: CrystalCatalogSeedEntry[],
  outputPath = getDefaultCrystalCatalogSeedPath(),
) {
  const resolvedOutputPath = path.resolve(outputPath);
  await mkdir(path.dirname(resolvedOutputPath), { recursive: true });
  await writeFile(resolvedOutputPath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  return resolvedOutputPath;
}
