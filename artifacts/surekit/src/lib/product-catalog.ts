export type ProductCategoryId =
  | "finished-products"
  | "raw-crystals"
  | "crystal-clusters"
  | "crystal-tumbles"
  | "tumble-sets"
  | "pocket-chunks"
  | "crystal-items";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  image: string;
  category: ProductCategoryId;
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

const REMOTE_ORIGIN = "https://o-4724.vercel.app";
const PLACEHOLDER_IMAGE = `${REMOTE_ORIGIN}/placeholder.svg`;
const upload = (filename: string) =>
  `${REMOTE_ORIGIN}/lovable-uploads/${filename}`;

function createProduct(
  id: string,
  category: ProductCategoryId,
  name: string,
  description: string,
  price: number,
  priceLabel: string,
  image: string,
): Product {
  return { id, category, name, description, price, priceLabel, image };
}

const finishedProducts = [
  createProduct("finished-pyrite", "finished-products", "Pyrite", "Known as 'Fool's Gold', pyrite promotes abundance, wealth and good fortune. It enhances willpower and confidence.", 24.99, "₹24.99", upload("a4d21bf7-f7a1-4dbe-9b40-922a37735b8c.png")),
  createProduct("finished-kyanite", "finished-products", "Kyanite", "Kyanite aligns all chakras and energy meridians. It never retains negative energy and promotes tranquility and healing.", 32.99, "₹32.99", upload("6145ccd6-deea-47e8-af6a-7c6ec77a857a.png")),
  createProduct("finished-amethyst", "finished-products", "Amethyst", "The protective stone that brings purification and spiritual growth. Relieves stress and enhances intuition.", 29.99, "₹29.99", upload("c5b619bf-ad29-4b6e-9175-23fc1852197e.png")),
  createProduct("finished-rose-quartz", "finished-products", "Rose Quartz", "The stone of unconditional love that opens the heart chakra, promoting self-love, friendship, and romantic relationships.", 27.99, "₹27.99", upload("22d33c83-52c5-4916-a395-dbef9a0581ad.png")),
  createProduct("finished-clear-quartz", "finished-products", "Clear Quartz", "The master healer stone that amplifies energy and thought. Enhances psychic abilities and helps with clarity and concentration.", 22.99, "₹22.99", upload("34a58283-8b82-48f9-88f4-2c88b069921d.png")),
  createProduct("finished-amethyst-cluster", "finished-products", "Amethyst Cluster", "A powerful healing cluster that purifies energy and provides protection. Perfect for meditation spaces and energy cleansing.", 45.99, "₹45.99", upload("af28398b-9e23-4e2b-9de1-bda457e09fd8.png")),
] satisfies Product[];

const rawCrystalProducts = [
  createProduct("raw-clear-quartz", "raw-crystals", "Clear Quartz", "Premium quality clear quartz crystal sold by weight for healing and metaphysical purposes.", 2500, "₹2,500", upload("fdefdd9d-0f46-4b1a-bc9a-669a5370470f.png")),
  createProduct("raw-amethyst", "raw-crystals", "Amethyst", "Premium quality amethyst crystal sold by weight for healing and metaphysical purposes.", 2500, "₹2,500", upload("1a9a30b1-9ac6-4174-9f44-c12a45fb941d.png")),
  createProduct("raw-red-carnelian", "raw-crystals", "Red Carnelian", "Premium quality red carnelian crystal sold by weight for healing and metaphysical purposes.", 3500, "₹3,500", upload("f51f041f-e723-4f9f-ad28-8d48052b1dbf.png")),
  createProduct("raw-black-tourmaline", "raw-crystals", "Black Tourmaline", "Premium quality black tourmaline crystal sold by weight for healing and metaphysical purposes.", 2000, "₹2,000", upload("b0b567d9-dba3-49e6-850d-b604f32ea613.png")),
  createProduct("raw-red-jasper", "raw-crystals", "Red Jasper", "Premium quality red jasper crystal sold by weight for healing and metaphysical purposes.", 2000, "₹2,000", upload("43e6cc35-9b19-43eb-b161-68a48a225a71.png")),
  createProduct("raw-pyrite", "raw-crystals", "Pyrite", "Premium quality pyrite crystal sold by weight for healing and metaphysical purposes.", 8000, "₹8,000", upload("74ee9f6d-2f17-4bb1-b3bc-a265b7e3f1e2.png")),
  createProduct("raw-rose-quartz", "raw-crystals", "Rose Quartz", "Premium quality rose quartz crystal sold by weight for healing and metaphysical purposes.", 2500, "₹2,500", upload("d8a13f62-7b2b-4f0f-b263-f542ae7a5e39.png")),
  createProduct("raw-tiger-eye", "raw-crystals", "Tiger Eye", "Premium quality tiger eye crystal sold by weight for healing and metaphysical purposes.", 2500, "₹2,500", upload("70731218-1039-4572-b8fc-99b8b04f6353.png")),
  createProduct("raw-amazonite", "raw-crystals", "Amazonite", "Premium quality amazonite crystal sold by weight for healing and metaphysical purposes.", 2500, "₹2,500", upload("95983e07-78cf-406c-86ae-62c1b746806d.png")),
  createProduct("raw-citrine", "raw-crystals", "Citrine", "Premium quality citrine crystal sold by weight for healing and metaphysical purposes.", 5000, "₹5,000", upload("5d5eef58-3426-4fe5-8e57-d8cd1740a3d3.png")),
  createProduct("raw-green-aventurine", "raw-crystals", "Green Aventurine", "Premium quality green aventurine crystal sold by weight for healing and metaphysical purposes.", 1500, "₹1,500", upload("ba123740-d46b-4f1b-ac8c-6c575ea9f6c0.png")),
  createProduct("raw-sodalite", "raw-crystals", "Sodalite", "Premium quality sodalite crystal sold by weight for healing and metaphysical purposes.", 1500, "₹1,500", PLACEHOLDER_IMAGE),
  createProduct("raw-blue-kyanite", "raw-crystals", "Blue Kyanite", "Premium quality blue kyanite crystal sold by weight for healing and metaphysical purposes.", 7000, "₹7,000", PLACEHOLDER_IMAGE),
  createProduct("raw-lapis-lazuli", "raw-crystals", "Lapis Lazuli", "Premium quality lapis lazuli crystal sold by weight for healing and metaphysical purposes.", 4000, "₹4,000", PLACEHOLDER_IMAGE),
  createProduct("raw-selenite", "raw-crystals", "Selenite", "Premium quality selenite crystal sold by weight for healing and metaphysical purposes.", 2000, "₹2,000", PLACEHOLDER_IMAGE),
  createProduct("raw-brazilian-amethyst", "raw-crystals", "Brazilian Amethyst", "Premium quality brazilian amethyst crystal sold by weight for healing and metaphysical purposes.", 4000, "₹4,000", PLACEHOLDER_IMAGE),
  createProduct("raw-flourite", "raw-crystals", "Flourite", "Premium quality flourite crystal sold by weight for healing and metaphysical purposes.", 2500, "₹2,500", PLACEHOLDER_IMAGE),
  createProduct("raw-shungite", "raw-crystals", "Shungite", "Premium quality shungite crystal sold by weight for healing and metaphysical purposes.", 4000, "₹4,000", PLACEHOLDER_IMAGE),
  createProduct("raw-yellow-aventurine", "raw-crystals", "Yellow Aventurine", "Premium quality yellow aventurine crystal sold by weight for healing and metaphysical purposes.", 1500, "₹1,500", PLACEHOLDER_IMAGE),
  createProduct("raw-rainbow-moon", "raw-crystals", "Rainbow Moon", "Premium quality rainbow moon crystal sold by weight for healing and metaphysical purposes.", 2500, "₹2,500", PLACEHOLDER_IMAGE),
  createProduct("raw-blood-stone", "raw-crystals", "Blood Stone", "Premium quality blood stone crystal sold by weight for healing and metaphysical purposes.", 2500, "₹2,500", PLACEHOLDER_IMAGE),
  createProduct("raw-natural-citrine-pencil", "raw-crystals", "Natural Citrine Pencil", "Premium quality natural citrine pencil crystal sold by weight for healing and metaphysical purposes. Highly sought after for its unique properties.", 7000, "₹7,000", PLACEHOLDER_IMAGE),
] satisfies Product[];

const crystalClusterProducts = [
  createProduct("cluster-amethyst", "crystal-clusters", "Amethyst", "Premium quality amethyst crystal cluster sold by weight for healing and metaphysical purposes.", 8000, "₹8,000per Kg", PLACEHOLDER_IMAGE),
  createProduct("cluster-citrine", "crystal-clusters", "Citrine", "Premium quality citrine crystal cluster sold by weight for healing and metaphysical purposes.", 11000, "₹11,000per Kg", PLACEHOLDER_IMAGE),
] satisfies Product[];

const crystalTumbleProducts = [
  createProduct("tumble-clear-quartz", "crystal-tumbles", "Clear Quartz", "Premium quality clear quartz crystal tumble sold by weight for healing and metaphysical purposes.", 125, "₹125per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-rose-quartz", "crystal-tumbles", "Rose Quartz", "Premium quality rose quartz crystal tumble sold by weight for healing and metaphysical purposes.", 125, "₹125per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-amethyst", "crystal-tumbles", "Amethyst", "Premium quality amethyst crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-sodalite", "crystal-tumbles", "Sodalite", "Premium quality sodalite crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-selenite", "crystal-tumbles", "Selenite", "Premium quality selenite crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-green-aventurine", "crystal-tumbles", "Green Aventurine", "Premium quality green aventurine crystal tumble sold by weight for healing and metaphysical purposes.", 75, "₹75per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-yellow-aventurine", "crystal-tumbles", "Yellow Aventurine", "Premium quality yellow aventurine crystal tumble sold by weight for healing and metaphysical purposes.", 75, "₹75per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-citrine", "crystal-tumbles", "Citrine", "Premium quality citrine crystal tumble sold by weight for healing and metaphysical purposes.", 300, "₹300per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-red-jasper", "crystal-tumbles", "Red Jasper", "Premium quality red jasper crystal tumble sold by weight for healing and metaphysical purposes.", 75, "₹75per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-black-tourmaline", "crystal-tumbles", "Black Tourmaline", "Premium quality black tourmaline crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-pyrite", "crystal-tumbles", "Pyrite", "Premium quality pyrite crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-amazonite", "crystal-tumbles", "Amazonite", "Premium quality amazonite crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-tiger-eye", "crystal-tumbles", "Tiger Eye", "Premium quality tiger eye crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-lapiz-lazuli", "crystal-tumbles", "Lapiz Lazuli", "Premium quality lapiz lazuli crystal tumble sold by weight for healing and metaphysical purposes.", 150, "₹150per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-shun-gite", "crystal-tumbles", "Shun Gite", "Premium quality shun gite crystal tumble sold by weight for healing and metaphysical purposes.", 250, "₹250per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-rainbow-moon-stone", "crystal-tumbles", "Rainbow Moon Stone", "Premium quality rainbow moon stone crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-red-carnalian", "crystal-tumbles", "Red Carnalian", "Premium quality red carnalian crystal tumble sold by weight for healing and metaphysical purposes.", 100, "₹100per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-bloodstone", "crystal-tumbles", "Bloodstone Tumble", "Premium quality bloodstone tumble sold by weight for healing and metaphysical purposes.", 75, "₹75per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-flourite", "crystal-tumbles", "Flourite Tumble", "Premium quality flourite tumble sold by weight for healing and metaphysical purposes.", 75, "₹75per Kg", PLACEHOLDER_IMAGE),
  createProduct("tumble-malachite", "crystal-tumbles", "Malachite Tumbles", "Premium quality malachite tumbles sold by weight for healing and metaphysical purposes.", 450, "₹450per Kg", PLACEHOLDER_IMAGE),
] satisfies Product[];

const tumbleSetProducts = [
  createProduct("set-protection", "tumble-sets", "Protection and Energy Shielding", "A set of carefully selected crystals for protection and energy shielding.", 425, "₹425per Set", PLACEHOLDER_IMAGE),
  createProduct("set-love", "tumble-sets", "Love And Relationships", "A set of carefully selected crystals for enhancing love and relationships.", 650, "₹650per Set", PLACEHOLDER_IMAGE),
  createProduct("set-abundance", "tumble-sets", "Abundance And Wealth", "A set of carefully selected crystals for attracting abundance and wealth.", 1000, "₹1,000per Set", PLACEHOLDER_IMAGE),
  createProduct("set-spiritual-growth", "tumble-sets", "Spiritual Growth and Intuition", "A set of carefully selected crystals for spiritual growth and enhancing intuition.", 675, "₹675per Set", PLACEHOLDER_IMAGE),
  createProduct("set-emotional-healing", "tumble-sets", "Emotional Healing And Inner Peace", "A set of carefully selected crystals for emotional healing and inner peace.", 650, "₹650per Set", PLACEHOLDER_IMAGE),
  createProduct("set-confidence", "tumble-sets", "Confidence And Personal Power", "A set of carefully selected crystals for boosting confidence and personal power.", 900, "₹900per Set", PLACEHOLDER_IMAGE),
  createProduct("set-manifestation", "tumble-sets", "Manifestation And Goal Achievement", "A set of carefully selected crystals for manifestation and achieving your goals.", 1000, "₹1,000per Set", PLACEHOLDER_IMAGE),
  createProduct("set-chakra-balancing", "tumble-sets", "Chakra Balancing And Energy Alignment", "A set of carefully selected crystals for chakra balancing and energy alignment.", 1375, "₹1,375per Set", PLACEHOLDER_IMAGE),
  createProduct("set-fertility", "tumble-sets", "Fertility And Pregnancy Support", "A set of carefully selected crystals for fertility and pregnancy support.", 725, "₹725per Set", PLACEHOLDER_IMAGE),
  createProduct("set-grounding", "tumble-sets", "Grounding And Stability", "A set of carefully selected crystals for grounding and stability.", 400, "₹400per Set", PLACEHOLDER_IMAGE),
  createProduct("set-emf", "tumble-sets", "EMF Shielding", "A set of carefully selected crystals for EMF shielding.", 575, "₹575per Set", PLACEHOLDER_IMAGE),
  createProduct("set-energy-boost", "tumble-sets", "Energy Boost And Motivation", "A set of carefully selected crystals for energy boost and motivation.", 975, "₹975per Set", PLACEHOLDER_IMAGE),
  createProduct("set-healing-support", "tumble-sets", "Healing and Immune Support", "A set of carefully selected crystals for healing and immune support.", 800, "₹800per Set", PLACEHOLDER_IMAGE),
  createProduct("set-master-healing", "tumble-sets", "Master Healing Collection", "Our comprehensive master collection of healing crystals.", 2325, "₹2,325per Set", PLACEHOLDER_IMAGE),
] satisfies Product[];

const pocketChunkProducts = [
  createProduct("pocket-pyrite", "pocket-chunks", "Raw Pyrite Chunks For Prosperity", "Raw pyrite chunks that attract prosperity and abundance.", 100, "₹100per Piece", PLACEHOLDER_IMAGE),
  createProduct("pocket-zibu-coins", "pocket-chunks", "Zibu Coins For Prosperity", "Zibu coins that attract prosperity and wealth.", 251, "₹251per Piece", PLACEHOLDER_IMAGE),
  createProduct("pocket-red-carnelian", "pocket-chunks", "Red Carnelian For Creativity & Relationships", "Red carnelian chunks that enhance creativity and relationships.", 100, "₹100per Piece", PLACEHOLDER_IMAGE),
  createProduct("pocket-citrine", "pocket-chunks", "Citrine for Prosperity & Digestion", "Citrine chunks that help with prosperity and digestion.", 100, "₹100per Piece", PLACEHOLDER_IMAGE),
] satisfies Product[];

const crystalPyramidProducts = [
  createProduct("item-pyramid-amethyst", "crystal-items", "Amethyst", "Beautiful amethyst crystal pyramid for spiritual growth and purification.", 1100, "₹1,100per Piece", PLACEHOLDER_IMAGE),
  createProduct("item-pyramid-lapiz-lasulli", "crystal-items", "Lapiz Lasulli", "Beautiful lapiz lasulli crystal pyramid for wisdom and intuition.", 1600, "₹1,600per Piece", PLACEHOLDER_IMAGE),
  createProduct("item-pyramid-clear-quartz", "crystal-items", "Clear Quartz", "Beautiful clear quartz crystal pyramid for amplifying energy and intentions.", 900, "₹900per Piece", PLACEHOLDER_IMAGE),
  createProduct("item-pyramid-rose-quartz", "crystal-items", "Rose Quartz", "Beautiful rose quartz crystal pyramid for love and heart healing.", 700, "₹700per Piece", PLACEHOLDER_IMAGE),
] satisfies Product[];

const crystalPencilProducts = [
  createProduct("item-pencil-seven-chakra-selenite", "crystal-items", "7 Chakra Selenite", "Selenite crystal pencil for chakra cleansing and alignment.", 700, "₹700per Piece", PLACEHOLDER_IMAGE),
  createProduct("item-pencil-clear-quartz", "crystal-items", "Clear Quartz", "Clear quartz crystal pencil for energy amplification and clarity.", 900, "₹900per Piece", PLACEHOLDER_IMAGE),
  createProduct("item-pencil-amethyst", "crystal-items", "Amethyst", "Amethyst crystal pencil for spiritual growth and intuition.", 700, "₹700per Piece", PLACEHOLDER_IMAGE),
] satisfies Product[];

export const productCategories: ProductCategory[] = [
  {
    id: "finished-products",
    label: "Finished Products",
    sections: [{ id: "finished-products-grid", title: "Finished Products", description: "Signature crystal pieces and ready-to-shop selections from the boutique.", products: finishedProducts }],
  },
  {
    id: "raw-crystals",
    label: "Raw Crystals",
    sections: [{ id: "raw-crystals-grid", title: "Divine Raw Healing Crystals", description: "Premium quality raw crystals sold by weight for healing and metaphysical purposes", note: "All prices are in Indian Rupees (INR)", products: rawCrystalProducts }],
  },
  {
    id: "crystal-clusters",
    label: "Crystal Clusters",
    sections: [{ id: "crystal-clusters-grid", title: "Divine Crystal Clusters", description: "Premium quality crystal clusters sold by weight for healing and metaphysical purposes", note: "All prices are in Indian Rupees (INR)", products: crystalClusterProducts }],
  },
  {
    id: "crystal-tumbles",
    label: "Crystal Tumbles",
    sections: [{ id: "crystal-tumbles-grid", title: "Divine Crystal Tumbles", description: "Premium quality crystal tumbles sold by weight for healing and metaphysical purposes", note: "All prices are in Indian Rupees (INR)", products: crystalTumbleProducts }],
  },
  {
    id: "tumble-sets",
    label: "Tumble Sets",
    sections: [{ id: "tumble-sets-grid", title: "Tumble Sets", description: "Specially curated crystal sets for specific purposes and intentions", note: "All prices are in Indian Rupees (INR)", products: tumbleSetProducts }],
  },
  {
    id: "pocket-chunks",
    label: "Pocket Chunks",
    sections: [{ id: "pocket-chunks-grid", title: "Divine Pocket Chunks", description: "Carry the healing power of crystals with you wherever you go", note: "All prices are in Indian Rupees (INR)", products: pocketChunkProducts }],
  },
  {
    id: "crystal-items",
    label: "Crystal Items",
    sections: [
      { id: "crystal-pyramids-grid", title: "Divine Crystal Pyramids", description: "Beautiful crystal pyramids to enhance your space and energy", note: "All prices are in Indian Rupees (INR)", products: crystalPyramidProducts },
      { id: "crystal-pencils-grid", title: "Divine Crystal Pencils", description: "Crystal pencils for precise energy work and healing", note: "All prices are in Indian Rupees (INR)", products: crystalPencilProducts },
    ],
  },
];

export const productTabs = [
  { id: "view-all", label: "View All" },
  ...productCategories.map(({ id, label }) => ({ id, label })),
] as const;

export const allProducts = productCategories.flatMap((category) =>
  category.sections.flatMap((section) => section.products),
);

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
