import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Elena M.",
    service: "Crystal Therapy & NLP",
    text: "My sessions at SureKit completely shifted my perspective. The combination of crystal work and NLP helped me release anxiety I had been carrying for years. The atmosphere is purely magical."
  },
  {
    name: "James T.",
    service: "Energy Alignment",
    text: "I was skeptical at first, but the Energy Alignment session left me feeling lighter and more grounded than I have in a decade. The attention to detail and care is unmatched."
  },
  {
    name: "Sarah K.",
    service: "Aromatherapy Workshop",
    text: "Not only did I enjoy the healing treatments, but the aromatherapy workshop gave me practical tools to create a calming environment in my own home. Truly transformative."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl mix-blend-multiply" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <Quote className="w-12 h-12 text-primary/30 mx-auto mb-4" />
          <h3 className="text-4xl font-serif text-foreground">Client Journeys</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-card/80 backdrop-blur-md p-8 rounded-3xl border border-white shadow-lg shadow-primary/5"
            >
              <div className="flex gap-1 mb-6 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-foreground/80 font-serif text-lg leading-relaxed italic mb-8">
                "{t.text}"
              </p>
              <div className="mt-auto">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-sm text-primary">{t.service}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
