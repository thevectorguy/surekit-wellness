import { SiteLayout } from "@/components/layout/SiteLayout";
import { useShop } from "@/components/shop/ShopProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import {
  allProducts,
  buildProductCatalog,
  type CrystalCatalogSeedEntry,
  type ProductCategory,
  type ProductCatalogResponse,
  type Product,
  productCategories,
  productTabs as fallbackProductTabs,
} from "@/lib/product-catalog";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();

  return (
    <article className="flex h-full flex-col rounded-[28px] border border-[#eadff7] bg-white p-5 shadow-[0_18px_48px_rgba(92,70,137,0.12)] transition-transform duration-300 hover:-translate-y-1">
      <div className="mb-5 flex min-h-56 items-center justify-center rounded-[22px] bg-[#faf6ff] p-6">
        <img
          src={product.image}
          alt={product.name}
          className="h-full max-h-44 w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-serif text-[1.85rem] leading-none text-[#362352]">
          {product.name}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-[#655a79]">
          {product.description}
        </p>
        <p className="mt-5 text-xl font-semibold text-[#362352]">
          {product.priceLabel}
        </p>
      </div>

      <Button
        type="button"
        className="mt-5 w-full rounded-full border-transparent bg-[#8f67d8] py-3 text-white hover:bg-[#7650bc] disabled:cursor-not-allowed disabled:bg-[#d7c9f1] disabled:text-[#6d617f]"
        onClick={() => {
          addToCart(product);
          toast({
            title: "Added to cart",
            description: `${product.name} is now in your Sacred Crystal Boutique cart.`,
          });
        }}
      >
        Add to Cart
      </Button>
    </article>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function CategorySection({
  title,
  description,
  note,
  products,
}: {
  title: string;
  description: string;
  note?: string;
  products: Product[];
}) {
  return (
    <section className="space-y-8">
      <div className="rounded-[32px] border border-[#eadff7] bg-[linear-gradient(180deg,#fcf8ff_0%,#ffffff_100%)] p-8 shadow-[0_18px_48px_rgba(92,70,137,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8f67d8]">
          Sacred Crystal Boutique
        </p>
        <h2 className="mt-4 font-serif text-4xl text-[#362352]">{title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[#655a79]">
          {description}
        </p>
        {note ? <p className="mt-3 text-sm text-[#8b7ea1]">{note}</p> : null}
      </div>

      <ProductGrid products={products} />
    </section>
  );
}

const fallbackCatalog: ProductCatalogResponse = {
  productCategories,
  productTabs: fallbackProductTabs,
  allProducts,
};

const LUMINOUS_COLLECTION_ID = "luminous-collections-of-crystals";

function getDefaultViewId(catalog: ProductCatalogResponse) {
  return (
    catalog.productCategories.find(
      (category) => category.id === LUMINOUS_COLLECTION_ID,
    )?.id ??
    catalog.productCategories[0]?.id ??
    "view-all"
  );
}

function isCategoryActive(category: ProductCategory, activeView: string) {
  return (
    activeView === category.id ||
    category.sections.some((section) => section.id === activeView)
  );
}

function getCategoryButtonClass(isActive: boolean) {
  return cn(
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors",
    isActive
      ? "bg-[#8f67d8] text-white shadow-none"
      : "text-[#5f4c86] hover:bg-[#f6efff]",
  );
}

async function fetchCatalogEntries() {
  const response = await fetch("/api/shop/catalog");

  if (!response.ok) {
    throw new Error("Unable to load the live catalog.");
  }

  return (await response.json()) as CrystalCatalogSeedEntry[];
}

export default function ProductsPage() {
  const { data } = useQuery({
    queryKey: ["shop-catalog"],
    queryFn: fetchCatalogEntries,
    retry: false,
  });
  const liveCatalog = data ? buildProductCatalog(data) : null;
  const catalog = liveCatalog ?? fallbackCatalog;
  const defaultViewId = getDefaultViewId(catalog);
  const [activeView, setActiveView] = useState(defaultViewId);

  useEffect(() => {
    const validViewIds = new Set([
      "view-all",
      ...catalog.productCategories.map((category) => category.id),
      ...catalog.productCategories.flatMap((category) =>
        category.sections.map((section) => section.id),
      ),
    ]);

    if (!validViewIds.has(activeView)) {
      setActiveView(defaultViewId);
    }
  }, [activeView, catalog.productCategories, defaultViewId]);

  const activeCategory = catalog.productCategories.find((category) =>
    isCategoryActive(category, activeView),
  );
  const activeSection =
    activeCategory?.sections.find((section) => section.id === activeView) ?? null;

  return (
    <SiteLayout mainClassName="pt-24">
      <section className="bg-[radial-gradient(circle_at_top,_rgba(154,120,224,0.14),_transparent_36%),linear-gradient(180deg,#ffffff_0%,#fbf8ff_52%,#ffffff_100%)] py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-[#8f67d8]">
              Sacred Crystal Boutique
            </p>
            <h1 className="mt-5 font-serif text-4xl text-[#362352] md:text-6xl">
              Our Collection
            </h1>
            <p className="mt-6 text-lg text-[#4f4268]">
              Discover our complete selection of healing crystals
            </p>
            <p className="mt-4 text-base leading-8 text-[#6d617f]">
              Each crystal is carefully selected for its unique properties and
              energy. Find the perfect crystal for your spiritual journey.
            </p>
          </div>

          <div className="mt-12">
            <div className="overflow-x-auto pb-4">
              <div className="flex w-max min-w-full justify-center">
                <div className="flex h-auto min-w-max items-center gap-2 rounded-full border border-[#eadff7] bg-white/80 p-2 backdrop-blur">
                  {catalog.productCategories.map((category) => {
                    const categoryActive = isCategoryActive(category, activeView);

                    if (category.sections.length <= 1) {
                      return (
                        <button
                          key={category.id}
                          type="button"
                          className={getCategoryButtonClass(categoryActive)}
                          onClick={() => setActiveView(category.id)}
                        >
                          {category.label}
                        </button>
                      );
                    }

                    return (
                      <DropdownMenu key={category.id}>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className={getCategoryButtonClass(categoryActive)}
                          >
                            {category.label}
                            <ChevronDown className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="start"
                          className="w-72 rounded-[24px] border-[#eadff7] bg-white p-2 shadow-[0_18px_48px_rgba(92,70,137,0.14)]"
                        >
                          <DropdownMenuLabel className="px-3 pb-1 pt-2 text-xs uppercase tracking-[0.24em] text-[#8f67d8]">
                            Browse {category.label}
                          </DropdownMenuLabel>
                          <DropdownMenuItem
                            className={cn(
                              "cursor-pointer rounded-2xl px-3 py-2.5 text-[#5f4c86] focus:bg-[#f6efff] focus:text-[#362352]",
                              activeView === category.id &&
                                "bg-[#f6efff] text-[#362352]",
                            )}
                            onSelect={() => setActiveView(category.id)}
                          >
                            All {category.label}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-[#f0e9fb]" />
                          {category.sections.map((section) => (
                            <DropdownMenuItem
                              key={section.id}
                              className={cn(
                                "cursor-pointer rounded-2xl px-3 py-2.5 text-[#5f4c86] focus:bg-[#f6efff] focus:text-[#362352]",
                                activeView === section.id &&
                                  "bg-[#f6efff] text-[#362352]",
                              )}
                              onSelect={() => setActiveView(section.id)}
                            >
                              {section.title}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    );
                  })}

                  <button
                    type="button"
                    className={getCategoryButtonClass(activeView === "view-all")}
                    onClick={() => setActiveView("view-all")}
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              {activeView === "view-all" ? (
                <ProductGrid products={catalog.allProducts} />
              ) : activeCategory && activeSection ? (
                <CategorySection
                  title={activeSection.title}
                  description={activeSection.description}
                  note={activeSection.note}
                  products={activeSection.products}
                />
              ) : activeCategory ? (
                <div className="space-y-12">
                  {activeCategory.sections.map((section) => (
                    <CategorySection
                      key={section.id}
                      title={section.title}
                      description={section.description}
                      note={section.note}
                      products={section.products}
                    />
                  ))}
                </div>
              ) : (
                <ProductGrid products={catalog.allProducts} />
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
