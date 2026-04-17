import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product, ProductCategoryId } from "@/lib/product-catalog";

const CART_STORAGE_KEY = "sacred-crystal-boutique-cart";

export type CartItem = Product & {
  quantity: number;
};

export type CheckoutFormValues = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  notes: string;
};

type OrderReceipt = {
  orderId: number;
  reference: string;
};

type ShopContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isSubmitting: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  submitOrder: (values: CheckoutFormValues) => Promise<OrderReceipt>;
};

const ShopContext = createContext<ShopContextValue | null>(null);

type OrderRequestPayload = CheckoutFormValues & {
  currency: "INR";
  source: "sacred-crystal-boutique";
  subtotal: number;
  items: Array<{
    productId: string;
    name: string;
    category: ProductCategoryId;
    quantity: number;
    unitPrice: number;
    priceLabel: string;
    image: string;
  }>;
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) {
      return;
    }

    try {
      const parsedCart = JSON.parse(savedCart) as CartItem[];
      if (Array.isArray(parsedCart)) {
        setItems(parsedCart);
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const subtotal = items.reduce(
    (runningTotal, item) => runningTotal + item.price * item.quantity,
    0,
  );
  const totalItems = items.reduce(
    (runningTotal, item) => runningTotal + item.quantity,
    0,
  );

  async function submitOrder(values: CheckoutFormValues) {
    if (items.length === 0) {
      throw new Error("Your cart is empty.");
    }

    const payload: OrderRequestPayload = {
      ...values,
      currency: "INR",
      source: "sacred-crystal-boutique",
      subtotal,
      items: items.map((item) => ({
        productId: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.price,
        priceLabel: item.priceLabel,
        image: item.image,
      })),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/shop/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload =
          (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(
          errorPayload?.error ?? "We couldn't submit your order right now.",
        );
      }

      const data = (await response.json()) as OrderReceipt;
      setItems([]);
      return data;
    } finally {
      setIsSubmitting(false);
    }
  }

  const value = useMemo<ShopContextValue>(
    () => ({
      items,
      totalItems,
      subtotal,
      isSubmitting,
      addToCart(product) {
        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.id === product.id);

          if (!existingItem) {
            return [...currentItems, { ...product, quantity: 1 }];
          }

          return currentItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        });
      },
      removeFromCart(productId) {
        setItems((currentItems) =>
          currentItems.filter((item) => item.id !== productId),
        );
      },
      updateQuantity(productId, quantity) {
        if (quantity < 1) {
          setItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId),
          );
          return;
        }

        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        );
      },
      clearCart() {
        setItems([]);
      },
      submitOrder,
    }),
    [isSubmitting, items, subtotal, totalItems],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }

  return context;
}
