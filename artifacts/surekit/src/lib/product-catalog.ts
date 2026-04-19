import seedEntries from "./crystal-catalog.seed.json";

export type ProductCategoryId = string;

export type Product = {
  id: string;
  name: string;
  header: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
  category: ProductCategoryId;
  purchasable: boolean;
};

export type ProductSection = {
  id: string;
  title: string;
  description: string;
  note?: string;
  products: Product[];
};

export type ProductCategory = {
  id: ProductCategoryId;
  label: string;
  sections: ProductSection[];
};

export type ProductTab = {
  id: string;
  label: string;
};

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
  priceAmount?: number | string | null;
  priceLabel?: string | null;
  image?: string | null;
  isActive?: boolean | null;
};

export type ProductCatalogResponse = {
  productCategories: ProductCategory[];
  productTabs: ProductTab[];
  allProducts: Product[];
};

const REMOTE_ORIGIN = "https://o-4724.vercel.app";
const PLACEHOLDER_IMAGE = `${REMOTE_ORIGIN}/placeholder.svg`;
const upload = (filename: string) =>
  `${REMOTE_ORIGIN}/lovable-uploads/${filename}`;

function legacyProduct(
  name: string,
  price: number,
  priceLabel: string,
  image: string,
) {
  return { name, price, priceLabel, image };
}

const legacyProducts = [
  legacyProduct("Pyrite", 24.99, "₹24.99", upload("a4d21bf7-f7a1-4dbe-9b40-922a37735b8c.png")),
  legacyProduct("Kyanite", 32.99, "₹32.99", upload("6145ccd6-deea-47e8-af6a-7c6ec77a857a.png")),
  legacyProduct("Amethyst", 29.99, "₹29.99", upload("c5b619bf-ad29-4b6e-9175-23fc1852197e.png")),
  legacyProduct("Rose Quartz", 27.99, "₹27.99", upload("22d33c83-52c5-4916-a395-dbef9a0581ad.png")),
  legacyProduct("Clear Quartz", 22.99, "₹22.99", upload("34a58283-8b82-48f9-88f4-2c88b069921d.png")),
  legacyProduct("Amethyst Cluster", 45.99, "₹45.99", upload("af28398b-9e23-4e2b-9de1-bda457e09fd8.png")),
  legacyProduct("Red Carnelian", 3500, "₹3,500", upload("f51f041f-e723-4f9f-ad28-8d48052b1dbf.png")),
  legacyProduct("Black Tourmaline", 2000, "₹2,000", upload("b0b567d9-dba3-49e6-850d-b604f32ea613.png")),
  legacyProduct("Red Jasper", 2000, "₹2,000", upload("43e6cc35-9b19-43eb-b161-68a48a225a71.png")),
  legacyProduct("Tiger Eye", 2500, "₹2,500", upload("70731218-1039-4572-b8fc-99b8b04f6353.png")),
  legacyProduct("Amazonite", 2500, "₹2,500", upload("95983e07-78cf-406c-86ae-62c1b746806d.png")),
  legacyProduct("Citrine", 5000, "₹5,000", upload("5d5eef58-3426-4fe5-8e57-d8cd1740a3d3.png")),
  legacyProduct("Green Aventurine", 1500, "₹1,500", upload("ba123740-d46b-4f1b-ac8c-6c575ea9f6c0.png")),
  legacyProduct("Pyrite", 8000, "₹8,000", upload("74ee9f6d-2f17-4bb1-b3bc-a265b7e3f1e2.png")),
  legacyProduct("Rose Quartz", 2500, "₹2,500", upload("d8a13f62-7b2b-4f0f-b263-f542ae7a5e39.png")),
  legacyProduct("Clear Quartz", 2500, "₹2,500", upload("fdefdd9d-0f46-4b1a-bc9a-669a5370470f.png")),
  legacyProduct("Amethyst", 2500, "₹2,500", upload("1a9a30b1-9ac6-4174-9f44-c12a45fb941d.png")),
];

function normalizeWhitespace(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeName(value: string) {
  return normalizeWhitespace(value).toLowerCase();
}

function slugify(value: string) {
  return normalizeWhitespace(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHeadingPrefix(value: string) {
  return normalizeWhitespace(value)
    .replace(/^[0-9]+[.)]\s*/i, "")
    .replace(/^[a-z][.)]\s*/i, "")
    .trim();
}

function parseRawLabel(rawLabel: string) {
  const normalized = normalizeWhitespace(rawLabel);
  const match = normalized.match(/^(.*?)\((.*?)\)\s*$/);

  if (!match) {
    return {
      name: normalized.replace(/^[, ]+|[, ]+$/g, ""),
      header: "",
    };
  }

  return {
    name: normalizeWhitespace(match[1].replace(/^[, ]+|[, ]+$/g, "")),
    header: normalizeWhitespace(match[2]),
  };
}

function titleCaseWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function prettifyHeading(value: string | null | undefined, fallback: string) {
  const stripped = stripHeadingPrefix(value ?? "");
  const baseValue = stripped || fallback;

  if (!baseValue) {
    return "Collection";
  }

  if (baseValue.toLowerCase() === "jewellery") {
    return "Amulets";
  }

  if (!/[a-z]/.test(baseValue)) {
    return baseValue
      .split(/(\s+|\/|-|,)/)
      .map((segment) =>
        /^[A-Z0-9]+$/.test(segment) ? titleCaseWord(segment) : segment,
      )
      .join("");
  }

  return baseValue;
}

function parsePriceAmount(value: number | string | null | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.replace(/,/g, "").trim();

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function createResolvedPriceLabel(
  priceAmount: number | null,
  explicitLabel: string | null | undefined,
) {
  const normalizedLabel = explicitLabel?.trim() || "";

  if (normalizedLabel) {
    return normalizedLabel;
  }

  if (priceAmount === null) {
    return "Contact for pricing";
  }

  return formatCurrency(priceAmount);
}

function createDefaultDescription(
  entry: CrystalCatalogSeedEntry,
  sectionTitle: string,
  collectionLabel: string,
) {
  if (entry.description) {
    return normalizeWhitespace(entry.description);
  }

  return `Part of the ${sectionTitle} collection from ${collectionLabel}.`;
}

const legacyProductByName = new Map(
  legacyProducts.map((product) => [normalizeName(product.name), product]),
);

function buildProduct(entry: CrystalCatalogSeedEntry, categoryId: string, sectionTitle: string): Product {
  const legacyProductMatch = legacyProductByName.get(normalizeName(entry.name));
  const explicitPrice = parsePriceAmount(entry.priceAmount);
  const resolvedPrice = explicitPrice ?? 0;
  const resolvedPriceLabel = createResolvedPriceLabel(
    explicitPrice,
    entry.priceLabel,
  );
  const resolvedImage =
    entry.image?.trim() || legacyProductMatch?.image || PLACEHOLDER_IMAGE;
  const collectionLabel = prettifyHeading(entry.collection, "Collection");
  const { header } = parseRawLabel(entry.rawLabel || entry.name);

  return {
    id: entry.slug,
    name: normalizeWhitespace(entry.name),
    header,
    description: createDefaultDescription(entry, sectionTitle, collectionLabel),
    price: resolvedPrice,
    priceLabel: resolvedPriceLabel,
    image: resolvedImage,
    category: categoryId,
    purchasable: true,
  };
}

export function buildProductCatalog(
  entries: CrystalCatalogSeedEntry[],
): ProductCatalogResponse {
  const activeEntries = entries
    .filter((entry) => entry.isActive ?? true)
    .sort((left, right) => left.sortOrder - right.sortOrder);

  const categories: ProductCategory[] = [];
  const categoryMap = new Map<
    string,
    ProductCategory & { sectionMap: Map<string, ProductSection> }
  >();

  for (const entry of activeEntries) {
    const categoryId = slugify(entry.collection);
    let category = categoryMap.get(categoryId);

    if (!category) {
      category = {
        id: categoryId,
        label: prettifyHeading(entry.collection, "Collection"),
        sections: [],
        sectionMap: new Map<string, ProductSection>(),
      };
      categoryMap.set(categoryId, category);
      categories.push(category);
    }

    const sectionTitle = entry.subsection
      ? prettifyHeading(entry.subsection, "Collection")
      : prettifyHeading(entry.section, "Collection");
    const sectionDescription = entry.subsection
      ? `${prettifyHeading(entry.section, category.label)} selections from ${category.label}.`
      : `Curated ${sectionTitle.toLowerCase()} selections from ${category.label}.`;
    const sectionId = slugify(
      [entry.collection, entry.section ?? "", entry.subsection ?? ""].join("-"),
    );

    let section = category.sectionMap.get(sectionId);

    if (!section) {
      section = {
        id: sectionId,
        title: sectionTitle,
        description: sectionDescription,
        products: [],
      };
      category.sectionMap.set(sectionId, section);
      category.sections.push(section);
    }

    section.products.push(buildProduct(entry, category.id, section.title));
  }

  const productCategories: ProductCategory[] = categories.map((category) => ({
    id: category.id,
    label: category.label,
    sections: category.sections.map((section) => ({
      ...section,
      note:
        "Matching legacy images are preserved where available. Prices are shown when listed, and unpriced items remain available on request.",
    })),
  }));
  const allProducts = productCategories.flatMap((category) =>
    category.sections.flatMap((section) => section.products),
  );
  const productTabs = [
    ...productCategories.map(({ id, label }) => ({ id, label })),
    { id: "view-all", label: "View All" },
  ];

  return { productCategories, productTabs, allProducts };
}

const defaultSeedEntries = seedEntries as CrystalCatalogSeedEntry[];

const defaultCatalog = buildProductCatalog(defaultSeedEntries);

export const fallbackCatalogSourceWorkbook =
  defaultSeedEntries[0]?.sourceWorkbook ?? null;

export const productCategories = defaultCatalog.productCategories;
export const productTabs = defaultCatalog.productTabs;
export const allProducts = defaultCatalog.allProducts;

export function getCategoryById(id: ProductCategoryId) {
  return productCategories.find((category) => category.id === id);
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount: number) {
  return currencyFormatter.format(amount);
}
