import { SiteLayout } from "@/components/layout/SiteLayout";
import { useShop } from "@/components/shop/ShopProvider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  allProducts,
  formatCurrency,
  getCategoryById,
  productTabs,
  type Product,
} from "@/lib/product-catalog";

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
        className="mt-5 w-full rounded-full border-transparent bg-[#8f67d8] py-3 text-white hover:bg-[#7650bc]"
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

export default function ProductsPage() {
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
            <Tabs defaultValue="view-all" className="w-full">
              <div className="overflow-x-auto pb-4">
                <div className="flex w-max min-w-full justify-center">
                  <TabsList className="h-auto min-w-max gap-2 rounded-full border border-[#eadff7] bg-white/80 p-2 backdrop-blur">
                    {productTabs.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="rounded-full px-5 py-2.5 text-sm text-[#5f4c86] data-[state=active]:bg-[#8f67d8] data-[state=active]:text-white data-[state=active]:shadow-none"
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              <TabsContent value="view-all" className="mt-8">
                <ProductGrid products={allProducts} />
              </TabsContent>

              {productTabs
                .filter((tab) => tab.id !== "view-all")
                .map((tab) => {
                  const category = getCategoryById(tab.id);

                  if (!category) {
                    return null;
                  }

                  return (
                    <TabsContent key={tab.id} value={tab.id} className="mt-8">
                      <div className="space-y-12">
                        {category.sections.map((section) => (
                          <CategorySection
                            key={section.id}
                            title={section.title}
                            description={section.description}
                            note={section.note}
                            products={section.products}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  );
                })}
            </Tabs>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
