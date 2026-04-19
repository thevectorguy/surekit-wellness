import { Sparkles, Facebook, Instagram, Twitter } from "lucide-react";
import { Link, useLocation } from "wouter";
import { navLinks } from "@/lib/navigation";

export function Footer() {
  const [location] = useLocation();
  const showHomeLink = location !== "/";
  const visibleNavLinks = navLinks.filter((link) => showHomeLink || link.name !== "Home");

  return (
    <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="font-serif text-2xl font-semibold tracking-wide">
              SureKit Sattva
            </span>
          </Link>
          <p className="text-background/70 font-serif italic text-lg max-w-sm mb-6">
            "Concious tools for a Balanced Life"
          </p>
          <p className="text-background/60 text-sm max-w-sm leading-relaxed">
            Guiding you toward deep, lasting transformation through Crystal Healing, Aromatherapy, NLP and Numerology.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-background/70">
            {visibleNavLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="hover:text-primary transition-colors">
                  {link.name === "About" ? "Our Philosophy" : link.name === "Contact" ? "Contact Us" : link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg font-semibold mb-4">Connect</h4>
          <div className="flex gap-4 mb-6">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-background/70">
            surekitsattva@gmail.com<br />
            Contact us for pricing and availability
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-sm text-background/50">
        &copy; {new Date().getFullYear()} SureKit Wellness. All rights reserved.
      </div>
    </footer>
  );
}
