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
  priceAmount?: number | null;
  priceLabel?: string | null;
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
const GENERIC_SHEET_PATTERN = /^Sheet\d+$/i;
const CURRENCY_FORMATTER = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const COLLECTION_NAME_ALIASES: Record<string, string> = {
  amulets: "Amulets",
  "alignment collections": "Alignment Collections",
  "allignment collections": "Alignment Collections",
  "alignment collections of brace": "Alignment Collections",
  "allignment collections of brace": "Alignment Collections",
  "high vibration pyramids": "High Vibration Pyramids",
  "luminous collections of crystals": "Luminous Collections of Crystals",
  "luminious collections of crystals": "Luminous Collections of Crystals",
  "luminious collections": "Luminous Collections of Crystals",
  "raw radiance": "Raw Radiance",
};

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

function hasHeadingPrefix(text: string) {
  return HEADING_PATTERN.test(text.trim());
}

function isAllCapsHeading(text: string) {
  const normalized = text.trim().replace(/\s+/g, " ");

  if (!normalized || hasHeadingPrefix(normalized)) {
    return false;
  }

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

function normalizeCollectionName(value: string) {
  const normalized = value.trim().replace(/\s+/g, " ");
  const alias = COLLECTION_NAME_ALIASES[normalized.toLowerCase()];

  if (alias) {
    return alias;
  }

  return normalized
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatPriceLabel(amount: number) {
  return CURRENCY_FORMATTER.format(amount);
}

function parsePriceCell(value: string | number | undefined) {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return { priceAmount: null, priceLabel: null };
    }

    return {
      priceAmount: value,
      priceLabel: formatPriceLabel(value),
    };
  }

  if (typeof value !== "string") {
    return { priceAmount: null, priceLabel: null };
  }

  const normalized = value.trim().replace(/\s+/g, " ");

  if (!normalized) {
    return { priceAmount: null, priceLabel: null };
  }

  if (
    !/^(?:rs\.?\s*|inr\s*|₹\s*)?\d+(?:,\d{3})*(?:\.\d+)?(?:\s*per\b.*)?$/i.test(
      normalized,
    )
  ) {
    return { priceAmount: null, priceLabel: null };
  }

  const amountMatch = normalized.match(/\d+(?:,\d{3})*(?:\.\d+)?/);
  if (!amountMatch) {
    return { priceAmount: null, priceLabel: null };
  }

  const parsedAmount = Number(amountMatch[0].replace(/,/g, ""));
  const hasCurrencyPrefix = /^(?:rs\.?|inr|₹)/i.test(normalized);
  const priceLabel =
    hasCurrencyPrefix
      ? normalized
      : /per\b/i.test(normalized)
        ? `Rs. ${normalized}`
        : formatPriceLabel(parsedAmount);

  return {
    priceAmount:
      Number.isFinite(parsedAmount) ? parsedAmount : null,
    priceLabel,
  };
}

function pickStructuredDescription(
  row: Record<string, string>,
  priceAmount: number | null,
) {
  const candidates = [
    row["D"],
    row["E"],
    priceAmount === null ? row["C"] : "",
  ]
    .map((value) =>
      typeof value === "string"
        ? value.trim().replace(/\s+/g, " ")
        : typeof value === "number"
          ? String(value)
          : "",
    )
    .filter(Boolean)
    .filter((value) => !/^(?:description|healing benefits|rate(?: per gram)?|per piece)$/i.test(value));

  if (candidates.length === 0) {
    return null;
  }

  return candidates[0] ?? null;
}

function buildEntrySlug(
  slugCounts: Map<string, number>,
  collection: string,
  section: string | null,
  subsection: string | null,
  name: string,
) {
  const baseSlug = slugify(
    [collection, section, subsection, name].filter(Boolean).join("-"),
  );
  const duplicateIndex = (slugCounts.get(baseSlug) ?? 0) + 1;
  slugCounts.set(baseSlug, duplicateIndex);

  return duplicateIndex === 1 ? baseSlug : `${baseSlug}-${duplicateIndex}`;
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
      const slug = buildEntrySlug(
        slugCounts,
        collectionMeta.id,
        sections[column] ?? null,
        subsections[column] ?? null,
        name,
      );

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

function parseStructuredSheet(
  sheetName: string,
  rows: Record<string, string>[],
  workbookName: string,
  initialSortOrder: number,
) {
  const entries: CrystalCatalogSeedEntry[] = [];
  const slugCounts = new Map<string, number>();
  let sortOrder = initialSortOrder;
  let section: string | null = null;
  let subsection: string | null = null;
  let topLevelSection: string | null = null;
  const collection = normalizeCollectionName(rows[0]?.["B"]?.trim() || sheetName);

  for (const row of rows.slice(1)) {
    const rawLabel = row["B"]?.trim().replace(/\s+/g, " ") || "";

    if (!rawLabel) {
      continue;
    }

    if (normalizeCollectionName(rawLabel) === collection) {
      continue;
    }

    if (isHeading(rawLabel)) {
      if (isAllCapsHeading(rawLabel)) {
        section = rawLabel;
        subsection = null;
        topLevelSection = rawLabel;
        continue;
      }

      if (topLevelSection) {
        subsection = rawLabel;
        continue;
      }

      section = rawLabel;
      subsection = null;
      continue;
    }

    const { name, description: inlineDescription } = parseLabel(rawLabel);
    const { priceAmount, priceLabel } = parsePriceCell(row["C"]);
    const explicitDescription = pickStructuredDescription(row, priceAmount);
    const slug = buildEntrySlug(
      slugCounts,
      collection,
      section,
      subsection,
      name,
    );

    entries.push({
      slug,
      collection,
      section,
      subsection,
      name,
      description: explicitDescription ?? inlineDescription,
      rawLabel,
      sortOrder,
      sourceWorkbook: workbookName,
      sourceSheet: sheetName,
      priceAmount,
      priceLabel,
    });
    sortOrder += 1;
  }

  return {
    entries,
    nextSortOrder: sortOrder,
  };
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

  const structuredSheetNames = workbook.SheetNames.filter(
    (name) => !GENERIC_SHEET_PATTERN.test(name.trim()),
  );

  if (structuredSheetNames.length > 1) {
    const entries: CrystalCatalogSeedEntry[] = [];
    let sortOrder = 1;

    for (const currentSheetName of structuredSheetNames) {
      const rows = sheetToRows(workbook.Sheets[currentSheetName]!);
      const parsedSheet = parseStructuredSheet(
        currentSheetName,
        rows,
        workbookName,
        sortOrder,
      );
      entries.push(...parsedSheet.entries);
      sortOrder = parsedSheet.nextSortOrder;
    }

    return {
      entries,
      sheetName: structuredSheetNames.join(", "),
      sourcePath,
      workbookName,
    };
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
