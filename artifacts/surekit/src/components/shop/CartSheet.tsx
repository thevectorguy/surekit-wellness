import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/product-catalog";
import { useShop, type CheckoutFormValues } from "./ShopProvider";

const EMPTY_FORM: CheckoutFormValues = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  shippingAddress: "",
  notes: "",
};

type CartSheetProps = {
  className?: string;
};

export function CartSheet({ className }: CartSheetProps) {
  const {
    items,
    totalItems,
    subtotal,
    isSubmitting,
    removeFromCart,
    updateQuantity,
    clearCart,
    submitOrder,
  } = useShop();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [formValues, setFormValues] = useState(EMPTY_FORM);

  async function handleOrderSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const receipt = await submitOrder(formValues);
      setFormValues(EMPTY_FORM);
      setIsCheckoutOpen(false);
      setIsSheetOpen(false);

      toast({
        title: "Order submitted",
        description: `Your Sacred Crystal Boutique order is now in the queue. Reference: ${receipt.reference}.`,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We couldn't submit your order right now.";

      toast({
        title: "Checkout paused",
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <button type="button" aria-label="Shopping Cart" className={className}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#8f67d8] px-1 text-[11px] font-semibold text-white">
                {totalItems}
              </span>
            ) : null}
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full border-l border-[#e6ddfa] bg-white px-5 sm:max-w-xl"
        >
          <SheetHeader className="border-b border-[#efe8fb] pb-5">
            <SheetTitle className="font-serif text-3xl text-[#352352]">
              Your Cart
            </SheetTitle>
            <SheetDescription className="text-sm text-[#6d617f]">
              {totalItems === 0
                ? "Your cart is empty."
                : `${totalItems} item${totalItems === 1 ? "" : "s"} in your cart`}
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-20 text-center">
              <div className="rounded-full bg-[#f6f0ff] p-5 text-[#8f67d8]">
                <ShoppingCart className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <p className="font-serif text-2xl text-[#352352]">
                  No items in your cart
                </p>
                <p className="max-w-sm text-sm text-[#6d617f]">
                  Add a few healing pieces from the collection and come back here
                  when you&apos;re ready to check out.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <div className="flex-1 space-y-5 overflow-y-auto py-6 pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-3xl border border-[#eee6fb] bg-[#fcfaff] p-4"
                  >
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex flex-1 flex-col gap-3">
                      <div>
                        <h4 className="font-serif text-xl text-[#352352]">
                          {item.name}
                        </h4>
                        <p className="text-sm text-[#6d617f]">{item.priceLabel}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-[#d9cdf1] text-[#5c4689]"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center text-sm font-medium text-[#352352]">
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full border-[#d9cdf1] text-[#5c4689]"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between gap-3">
                      <p className="font-semibold text-[#352352]">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <button
                        type="button"
                        className="text-sm font-medium text-[#b04a4a] transition-colors hover:text-[#8e3232]"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-[#efe8fb] py-5">
                <div className="flex items-center justify-between text-[#352352]">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-lg font-semibold">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#6d617f]">
                  Submit your order and we&apos;ll follow up with availability,
                  shipping, and payment confirmation for Sacred Crystal Boutique.
                </p>

                <div className="flex flex-col gap-3">
                  <Button
                    type="button"
                    className="w-full rounded-full border-transparent bg-[#25b05b] py-3 text-white hover:bg-[#1f944c]"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    Proceed to Checkout
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full rounded-full border-[#d9cdf1] py-3 text-[#5c4689]"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-2xl rounded-[28px] border border-[#e6ddfa] bg-white p-0">
          <DialogHeader className="border-b border-[#efe8fb] px-7 py-6">
            <DialogTitle className="font-serif text-3xl text-[#352352]">
              Complete Your Order
            </DialogTitle>
            <DialogDescription className="text-sm text-[#6d617f]">
              Share your details below and we&apos;ll create your boutique order
              immediately.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-5 px-7 py-6" onSubmit={handleOrderSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-[#352352]">Name</span>
                <Input
                  required
                  value={formValues.customerName}
                  onChange={(event) =>
                    setFormValues((currentValues) => ({
                      ...currentValues,
                      customerName: event.target.value,
                    }))
                  }
                  className="h-11 rounded-2xl border-[#d9cdf1] bg-[#fcfaff]"
                  placeholder="Your full name"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-[#352352]">Email</span>
                <Input
                  required
                  type="email"
                  value={formValues.customerEmail}
                  onChange={(event) =>
                    setFormValues((currentValues) => ({
                      ...currentValues,
                      customerEmail: event.target.value,
                    }))
                  }
                  className="h-11 rounded-2xl border-[#d9cdf1] bg-[#fcfaff]"
                  placeholder="you@example.com"
                />
              </label>

              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-[#352352]">Phone</span>
                <Input
                  required
                  value={formValues.customerPhone}
                  onChange={(event) =>
                    setFormValues((currentValues) => ({
                      ...currentValues,
                      customerPhone: event.target.value,
                    }))
                  }
                  className="h-11 rounded-2xl border-[#d9cdf1] bg-[#fcfaff]"
                  placeholder="Phone number"
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-[#352352]">
                Shipping Address
              </span>
              <Textarea
                required
                value={formValues.shippingAddress}
                onChange={(event) =>
                  setFormValues((currentValues) => ({
                    ...currentValues,
                    shippingAddress: event.target.value,
                  }))
                }
                className="min-h-28 rounded-3xl border-[#d9cdf1] bg-[#fcfaff]"
                placeholder="House number, street, city, state, postal code"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-medium text-[#352352]">
                Order Notes
              </span>
              <Textarea
                value={formValues.notes}
                onChange={(event) =>
                  setFormValues((currentValues) => ({
                    ...currentValues,
                    notes: event.target.value,
                  }))
                }
                className="min-h-24 rounded-3xl border-[#d9cdf1] bg-[#fcfaff]"
                placeholder="Anything we should know about sizing, gifting, or delivery?"
              />
            </label>

            <div className="rounded-[28px] border border-[#efe8fb] bg-[#fcfaff] p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#8f67d8]">
                  Order Summary
                </span>
                <span className="font-semibold text-[#352352]">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#6d617f]">
                {totalItems} item{totalItems === 1 ? "" : "s"} ready for checkout.
                We&apos;ll keep the item details from your cart on the submitted
                order.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-[#d9cdf1] px-6 py-3 text-[#5c4689]"
                onClick={() => setIsCheckoutOpen(false)}
              >
                Back to Cart
              </Button>
              <Button
                type="submit"
                className="rounded-full border-transparent bg-[#8f67d8] px-6 py-3 text-white hover:bg-[#7650bc]"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting Order..." : "Place Order"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
