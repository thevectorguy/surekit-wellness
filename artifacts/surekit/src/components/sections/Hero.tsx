import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { bookingLinkProps } from "@/lib/booking";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png?v=${Date.now()}`}
          alt="Serene holistic spa background"
          className="w-full h-full object-cover object-center"
        />
        {/* Lighter overlay so Sri Chakra on the left remains visible */}
        <div className="absolute inset-0 bg-gradient-to-l from-background/85 via-background/40 to-background/10" />
      </div>
      {/* Two-column layout: left is clear for Sri Chakra, right holds text */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 gap-8 items-center min-h-[75vh]">

          {/* Left column — intentionally empty so Sri Chakra shows through */}
          <div />

          {/* Right column — text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-start"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-6 border border-primary/20">
                Surekit Sattva
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-primary italic font-light leading-[1.1] mb-6">Concious tools for a Balanced Life.</h1>

            <p className="text-lg sm:text-xl text-foreground/80 leading-relaxed mb-10 max-w-xl font-light">
              Discover the transformative power of crystal healing, aromatic therapy, and NLP techniques — your journey to inner peace begins here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                {...bookingLinkProps}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1 transition-all duration-300"
              >
                Book a Session
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/50 backdrop-blur-sm text-foreground font-medium text-lg border border-border hover:bg-white/80 hover:shadow-md transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
