import { motion } from "framer-motion";
import {
  BrainCircuit,
  CheckCircle2,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { Link } from "wouter";

type Service = {
  icon?: LucideIcon;
  iconImage?: string;
  iconAlt?: string;
  title: string;
  desc: string;
  highlight: string;
  color: string;
  subPoints: string[] | null;
  href?: string;
  cta?: string;
};

const services: Service[] = [
  {
    iconImage: `${import.meta.env.BASE_URL}images/meditation-lotus.svg`,
    iconAlt: "Meditation and lotus symbol",
    title: "Elemental Healing Blends",
    desc: "Discover our bespoke healing remedies that combine the vibrational power of crystals with therapeutic-grade essential oils. Tailored blends address specific concerns for a deeply holistic healing experience.",
    highlight: "Customized Remedies",
    color: "bg-slate-950 border-cyan-400/20",
    subPoints: [
      "Crystal Healing Sessions - personalised chakra balancing (60 & 90 min)",
      "Aroma & Herbs Therapy - therapeutic essential herbs & oil blends for deep relaxation and healing",
      "Take-home remedy kits for stress, sleep & emotional healing etc.",
      "Custom crystal grid setups for your home or workspace",
      "Rudraksha - sacred beads for protection, grounding, and spiritual elevation",
      "Yantras - energised sacred geometry diagrams for prosperity, health, and harmony",
    ],
  },
  {
    icon: BrainCircuit,
    title: "NLP Sessions",
    desc: "Transform your mindset with our Neuro-Linguistic Programming sessions. We help you identify and reprogram limiting beliefs, overcome fears, break negative patterns, and unlock the full potential of your mind for lasting personal growth.",
    highlight: "Individual & group sessions",
    color: "bg-blue-50 text-blue-600 border-blue-100",
    subPoints: [
      "One-on-One NLP Coaching - personalised sessions to reprogram limiting beliefs",
      "Fear & Phobia Release - rapid techniques to overcome deep-rooted fears",
      "Emotional Freedom - break negative patterns and release past trauma",
      "Goal Setting & Motivation - align your mindset for success and clarity",
      "Group NLP Workshops - transformative group sessions for collective growth",
      "Gut Wellness - harness the mind-gut connection through NLP for digestive health and vitality",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Sacred Crystal Boutique",
    desc: "Browse our curated collection of ethically sourced healing crystals - amethyst, rose quartz, citrine, black tourmaline, selenite, and many more. Each crystal is hand-selected for its quality, energy, and healing properties. Perfect for personal use or gifting.",
    highlight: "Raw, tumbled & premium pieces",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    subPoints: null,
    href: "/products",
    cta: "Shop the collection",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Services() {
  return (
    <section id="services" className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            What We Offer
          </h2>
          <h3 className="mb-6 text-4xl text-foreground sm:text-5xl">
            Our Healing Services
          </h3>
          <p className="text-lg text-muted-foreground">
            Discover a sanctuary for your mind, body, and spirit. Our integrated
            therapies and offerings are designed to awaken your innate healing
            potential.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group flex flex-col gap-4 rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border transition-transform duration-300 group-hover:scale-110 ${service.color}`}
              >
                {service.iconImage ? (
                  <img
                    src={service.iconImage}
                    alt={service.iconAlt}
                    className="h-full w-full object-cover"
                  />
                ) : service.icon ? (
                  <service.icon className="h-6 w-6" aria-hidden="true" />
                ) : null}
              </div>

              <div>
                <h4 className="mb-2 text-2xl font-semibold text-foreground">
                  {service.title}
                </h4>
                <span className="mb-3 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {service.highlight}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.desc}
                </p>
              </div>

              {service.subPoints ? (
                <ul className="mt-2 flex flex-col gap-2">
                  {service.subPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {service.href ? (
                <Link
                  href={service.href}
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  {service.cta}
                </Link>
              ) : (
                <div className="mt-auto flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Learn more{" "}
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    {"->"}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
