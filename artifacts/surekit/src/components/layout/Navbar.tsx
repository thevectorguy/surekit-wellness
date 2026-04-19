import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { CartSheet } from "@/components/shop/CartSheet";
import { bookingLinkProps } from "@/lib/booking";
import { navLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const showHomeLink = location !== "/";
  const visibleNavLinks = navLinks.filter((link) => showHomeLink || link.name !== "Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 px-4 py-4 transition-all duration-300 ease-in-out sm:px-6 lg:px-8",
        isScrolled ? "bg-background/80 py-3 shadow-sm backdrop-blur-md" : "bg-transparent py-6",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group flex shrink-0 items-center">
          <img
            src="/images/surekit-wordmark-sage.png"
            alt="Surekit Sattva"
            className="h-10 w-auto opacity-95 transition-transform duration-300 group-hover:scale-[1.02] sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "relative text-sm font-medium transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300",
                location === link.href
                  ? "text-primary after:w-full"
                  : "text-foreground/80 after:w-0 hover:text-primary hover:after:w-full",
              )}
            >
              {link.name}
            </Link>
          ))}

          <CartSheet className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-background/90 text-primary shadow-sm transition-colors hover:border-primary/40 hover:bg-background" />

          <a
            {...bookingLinkProps}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20 active:translate-y-0"
          >
            Book Now
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <CartSheet className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/85 text-primary shadow-sm" />
          <button
            className="p-2 text-foreground"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 right-0 top-full overflow-hidden border-b border-border bg-background shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {visibleNavLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "p-2 font-serif text-lg transition-colors",
                    location === link.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <a
                {...bookingLinkProps}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 rounded-xl bg-primary px-6 py-3 text-center font-medium text-primary-foreground"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
