import process from "node:process";
import { eq, notInArray } from "drizzle-orm";
import {
  crystalCatalogItemsTable,
  getDb,
  hasDatabaseUrl,
} from "@workspace/db";
import {
  getDefaultCrystalCatalogSeedPath,
  loadCrystalCatalogSeedData,
} from "./lib/crystal-catalog.js";

function serializePriceAmount(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return null;
  }

  return value.toString();
}

async function main() {
  if (!hasDatabaseUrl()) {
    throw new Error(
      "DATABASE_URL must be set before seeding the crystal catalog.",
    );
  }

  const sourcePath =
    process.argv[2] ??
    process.env.CRYSTAL_CATALOG_SOURCE_PATH ??
    getDefaultCrystalCatalogSeedPath();
  const { entries, sourcePath: resolvedSourcePath } =
    await loadCrystalCatalogSeedData(sourcePath);
  const db = getDb();
  const activeSlugs = entries.map((entry) => entry.slug);

  if (activeSlugs.length > 0) {
    await db
      .update(crystalCatalogItemsTable)
      .set({ isActive: false })
      .where(notInArray(crystalCatalogItemsTable.slug, activeSlugs));
  }

  for (const entry of entries) {
    const existing = await db
      .select({ id: crystalCatalogItemsTable.id })
      .from(crystalCatalogItemsTable)
      .where(eq(crystalCatalogItemsTable.slug, entry.slug))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(crystalCatalogItemsTable)
        .set({
          collection: entry.collection,
          section: entry.section,
          subsection: entry.subsection,
          name: entry.name,
          description: entry.description,
          rawLabel: entry.rawLabel,
          priceAmount: serializePriceAmount(entry.priceAmount),
          priceLabel: entry.priceLabel ?? null,
          sortOrder: entry.sortOrder,
          sourceWorkbook: entry.sourceWorkbook,
          sourceSheet: entry.sourceSheet,
          isActive: true,
        })
        .where(eq(crystalCatalogItemsTable.slug, entry.slug));
      continue;
    }

    await db.insert(crystalCatalogItemsTable).values({
      slug: entry.slug,
      collection: entry.collection,
      section: entry.section,
      subsection: entry.subsection,
      name: entry.name,
      description: entry.description,
      rawLabel: entry.rawLabel,
      priceAmount: serializePriceAmount(entry.priceAmount),
      priceLabel: entry.priceLabel ?? null,
      sortOrder: entry.sortOrder,
      sourceWorkbook: entry.sourceWorkbook,
      sourceSheet: entry.sourceSheet,
      isActive: true,
    });
  }

  console.log(
    `Seeded ${entries.length} crystal catalog entries from ${resolvedSourcePath}.`,
  );
}

await main();
