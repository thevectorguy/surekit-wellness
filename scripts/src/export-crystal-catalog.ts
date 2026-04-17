import process from "node:process";
import {
  getDefaultCrystalCatalogSeedPath,
  parseCrystalCatalogWorkbook,
  writeCrystalCatalogSeedFile,
} from "./lib/crystal-catalog.js";

async function main() {
  const workbookPath = process.argv[2] ?? process.env.CRYSTAL_WORKBOOK_PATH;

  if (!workbookPath) {
    throw new Error(
      "Pass the workbook path as the first argument or set CRYSTAL_WORKBOOK_PATH.",
    );
  }

  const outputPath =
    process.argv[3] ??
    process.env.CRYSTAL_CATALOG_JSON_PATH ??
    getDefaultCrystalCatalogSeedPath();

  const { entries, sheetName, sourcePath } =
    parseCrystalCatalogWorkbook(workbookPath);
  const resolvedOutputPath = await writeCrystalCatalogSeedFile(entries, outputPath);

  console.log(
    `Exported ${entries.length} crystal catalog entries from ${sheetName} (${sourcePath}) to ${resolvedOutputPath}.`,
  );
}

await main();
