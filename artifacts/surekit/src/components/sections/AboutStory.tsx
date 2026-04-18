import { useRef } from "react";
import { LayoutGroup, motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Compass,
  Gem,
  Heart,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { Link } from "wouter";
import { bookingLinkProps } from "@/lib/booking";

const heroHighlights = [
  { value: "30+", label: "Years in Learning & Development" },
  { value: "Sacred", label: "Srividya as the spiritual foundation" },
  { value: "Holistic", label: "Ancient wisdom with modern guidance" },
];

const storySections = [
  {
    eyebrow: "The Foundation",
    title: "A life spent helping people grow",
    layout: "split",
    body: [
      "With over 30 years in Learning & Development across leading IT organizations, I dedicated my career to unlocking human potential through coaching, counselling, and structured growth.",
      "Even while I saw people achieve visible success, I often sensed an unspoken inner gap beneath it all: stress, lack of clarity, and a deeper search for meaning that conventional approaches could not fully hold.",
    ],
    image: "images/1a0a9509-b54d-4284-a16f-d5751c063a43.jpg",
    alt: "Founder portrait placeholder in a serene lavender palette",
    badge: "Enigmatic Presence",
    aspect: "aspect-[4/5]",
  },
  {
    eyebrow: "The Turning Point",
    title: "A path that moved inward",
    layout: "centered",
    centerVisual: "none",
    body: [
      "That realization became a turning point in my own journey. I was drawn inward, where I was initiated into Srividya, a sacred spiritual path rooted in the worship of the Divine Feminine and a deep exploration of consciousness.",
      "More than a practice, Srividya became a way of life. It led me toward deeper awareness, inner balance, and a more expansive understanding of what true transformation asks of us.",
    ],
  },
  {
    eyebrow: "The Integration",
    title: "Where ancient wisdom meets modern transformation",
    layout: "centered",
    centerVisual: "circle",
    body: [
      "Building on that spiritual grounding, I began integrating Neuro-Linguistic Programming, counselling, and coaching to help individuals shift limiting beliefs and patterns with clarity and compassion.",
      "I also incorporate Crystal Healing, Prana Vidya, and Numerology to support emotional release, energetic balance, and inner harmony, creating a holistic path that addresses both the seen and unseen layers of change.",
    ],
    // image: "images/9705cbca-1b62-4a6e-b066-07c5dc2b8aa7.jpg",
    // alt: "Second founder portrait placeholder with sacred geometry details",
    // badge: "Calming Soul",
    // aspect: "aspect-[4/5]",
  },
];

const practicePillars = [
  {
    icon: BookOpen,
    title: "Srividya",
    description:
      "A sacred path of awareness, devotion, and inner balance that anchors the work in consciousness rather than surface fixes.",
  },
  {
    icon: Brain,
    title: "NLP",
    description:
      "Gentle yet powerful reframing of limiting beliefs and habitual thought patterns so change becomes sustainable.",
  },
  {
    icon: Heart,
    title: "Numerology",
    description:
      "Predicting the future, and bridging between who you are now and who you have the potential to be.",
  },
  {
    icon: Gem,
    title: "Crystal Healing",
    description:
      "Working with natural vibrational energies to support release, energetic balance, and emotional steadiness.",
  },
  // {
  //   icon: Compass,
  //   title: "Numerology",
  //   description:
  //     "A symbolic lens for understanding timing, tendencies, and life themes with greater clarity and meaning.",
  // },
  {
    icon: SunMedium,
    title: "Prana Vidya",
    description:
      "A subtle energy-based practice that helps restore flow, vitality, and a stronger connection to the inner self.",
  },
];

const transformationSteps = [
  {
    step: "Connect",
    description:
      "Begin by listening to what our experts have to say about your inner energies.",
  },
  {
    step: "Release",
    description:
      "Gently loosen the beliefs, emotional patterns, and energetic blocks that keep repeating the same cycle.",
  },
  {
    step: "Realign",
    description:
      "Bring mind, emotion, and energy back into harmony through practices chosen for your inner landscape.",
  },
  {
    step: "Thrive",
    description:
      "Create lasting change with clarity, balance, and purpose in both personal and professional life.",
  },
];

const revealProps = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-120px" },
};

type ImageMomentProps = {
  src: string;
  alt: string;
  aspect: string;
  layoutId: string;
  frameClassName?: string;
  imageClassName?: string;
  outerClassName?: string;
};

function ImageMoment({
  src,
  alt,
  aspect,
  layoutId,
  frameClassName,
  imageClassName,
  outerClassName,
}: ImageMomentProps) {
  return (
    <motion.figure
      layoutId={layoutId}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
      whileHover={{ y: -6 }}
      className={`group relative ${outerClassName ?? ""}`}
    >
      <div className="absolute -inset-5 rounded-[2rem] bg-primary/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
      <div
        className={`relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 shadow-[0_24px_80px_rgba(36,52,49,0.12)] backdrop-blur-sm ${frameClassName ?? ""
          }`}
      >
        <div className={`${aspect} overflow-hidden`}>
          <img
            src={`${import.meta.env.BASE_URL}${src}`}
            alt={alt}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${imageClassName ?? ""
              }`}
          />
        </div>
      </div>
    </motion.figure>
  );
}

function IntegrationCircle() {
  return (
    <motion.div
      {...revealProps}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="relative mx-auto flex w-full max-w-[28rem] items-center justify-center"
    >
      <div className="absolute inset-4 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute inset-0 rounded-full border border-primary/15 bg-[radial-gradient(circle,_rgba(255,255,255,0.95)_0%,_rgba(243,236,247,0.9)_45%,_rgba(224,236,226,0.82)_100%)] shadow-[0_28px_90px_rgba(36,52,49,0.12)]" />
      <div className="relative flex aspect-square w-full max-w-[24rem] flex-col items-center justify-center rounded-full border border-white/70 bg-white/35 px-10 text-center backdrop-blur-sm">
        <span className="text-xs font-medium uppercase tracking-[0.34em] text-primary">
          Integration
        </span>
        <h3 className="mt-4 max-w-[12ch] text-3xl leading-tight text-foreground sm:text-4xl">
          Ancient wisdom in a modern circle
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
          A unified space for NLP, counselling, coaching, crystal healing,
          Prana Vidya, and numerology.
        </p>
      </div>
    </motion.div>
  );
}

export function AboutStory() {
  const imageBase = `${import.meta.env.BASE_URL}images/`;
  const foundationRef = useRef<HTMLDivElement | null>(null);
  const foundationInView = useInView(foundationRef, {
    amount: 0.38,
    margin: "0px 0px -30% 0px",
  });
  const portraitLayoutId = "founder-portrait";
  const foundationSection = storySections[0];
  const turningPointSection = storySections[1];
  const integrationSection = storySections[2];

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden pt-24">
        <div className="absolute inset-0 -z-20">
          <motion.img
            src={`${imageBase}hero-bg.png`}
            alt="Soft holistic healing background"
            className="h-full w-full object-cover opacity-25"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(156,126,185,0.26),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(145,182,152,0.2),_transparent_34%),linear-gradient(180deg,_rgba(250,246,240,0.72),_rgba(250,246,240,0.97))]" />
        </div>

        <div className="absolute left-0 top-24 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-8 right-0 -z-10 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <p className="text-sm font-medium uppercase tracking-[0.34em] text-primary">
                The Journey
              </p>

              <h1 className="mt-6 text-balance text-5xl font-light leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
                A story shaped by{" "}
                <span className="italic text-primary">
                  coaching, consciousness, and holistic healing
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/78 sm:text-xl">
                My work began in the world of learning, coaching, and structured
                growth. Over time, it opened into something deeper: helping
                people move from external success into alignment, clarity, and
                inner balance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative flex justify-start lg:justify-end"
            >
              {!foundationInView ? (
                <div className="w-full max-w-[25rem] lg:max-w-[29rem]">
                  <ImageMoment
                    layoutId={portraitLayoutId}
                    src={storySections[0].image ?? "images/founder-placeholder-2.svg"}
                    alt={storySections[0].alt ?? storySections[0].title}
                    aspect="aspect-[5/6]"
                    imageClassName="object-[center_18%]"
                  />
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-28">
        <div className="absolute inset-x-0 top-28 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...revealProps}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                {...bookingLinkProps}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-medium text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
              >
                Begin your Journey
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-foreground/10 bg-white/60 px-7 py-4 text-base font-medium text-foreground transition-all duration-300 hover:border-primary/20 hover:bg-white/80"
              >
                Explore the Modalities
              </Link>
            </div>

            <div className="mt-12 grid gap-6 border-t border-foreground/10 pt-8 sm:grid-cols-3">
              {heroHighlights.map((item) => (
                <div key={item.label}>
                  <p className="font-serif text-3xl text-foreground">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <div ref={foundationRef} className="mt-16 space-y-20 lg:space-y-28">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
              <motion.div
                {...revealProps}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="overflow-hidden rounded-[2rem] border border-foreground/10 bg-white/55 p-6 shadow-[0_22px_70px_rgba(36,52,49,0.06)] backdrop-blur-sm sm:p-8 lg:p-10"
              >
                <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
                  <div className="order-2 xl:order-1">
                    <p className="text-sm font-medium uppercase tracking-[0.32em] text-primary">
                      {foundationSection.eyebrow}
                    </p>
                    <h3 className="mt-4 text-3xl sm:text-4xl">
                      {foundationSection.title}
                    </h3>
                    <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
                      {foundationSection.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  <div className="order-1 xl:order-2">
                    {foundationInView ? (
                      <ImageMoment
                        layoutId={portraitLayoutId}
                        src={foundationSection.image ?? "images/founder-placeholder-2.svg"}
                        alt={foundationSection.alt ?? foundationSection.title}
                        aspect={foundationSection.aspect ?? "aspect-[4/5]"}
                        outerClassName="w-full max-w-[28rem] xl:ml-auto"
                        imageClassName="object-center"
                      />
                    ) : null}
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...revealProps}
                transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
                className="flex h-full flex-col justify-center rounded-[2rem] border border-primary/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(247,242,251,0.86))] p-6 shadow-[0_22px_70px_rgba(36,52,49,0.06)] sm:p-8 lg:p-10"
              >
                <p className="text-sm font-medium uppercase tracking-[0.32em] text-primary">
                  {turningPointSection.eyebrow}
                </p>
                <h3 className="mt-4 text-3xl sm:text-4xl">
                  {turningPointSection.title}
                </h3>
                <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
                  {turningPointSection.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </div>

            {integrationSection.layout === "centered" ? (
              <div className="grid gap-10 lg:grid-cols-1">
                {integrationSection.centerVisual === "circle" ? (
                  <div className="lg:col-span-12">
                    <IntegrationCircle />
                  </div>
                ) : null}
                <motion.div
                  {...revealProps}
                  transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
                  className="mx-auto max-w-3xl text-center lg:col-span-12"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.32em] text-primary">
                    {integrationSection.eyebrow}
                  </p>
                  <h3 className="mt-4 text-3xl sm:text-4xl">
                    {integrationSection.title}
                  </h3>
                  <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
                    {integrationSection.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-foreground/[0.03] py-24 sm:py-28">
        <div className="absolute left-12 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-18">
            <motion.div
              {...revealProps}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl"
            >
              <p className="text-sm font-medium uppercase tracking-[0.34em] text-primary">
                The Practice
              </p>
              <h2 className="mt-4 text-balance text-4xl sm:text-5xl">
                Transformation held across mind, emotion, energy, and spirit.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Today, the work goes beyond helping people reach goals. It is
                about alignment at every level: reconnecting with the inner
                self, releasing what no longer serves, and creating change that
                feels clear, balanced, and deeply lived.
              </p>

              <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/70 bg-white/70 shadow-[0_24px_70px_rgba(36,52,49,0.1)] backdrop-blur-sm">
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={`${imageBase}philosophy.png`}
                    alt="A serene healing environment with soft natural light"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              {...revealProps}
              transition={{ duration: 0.85, delay: 0.08, ease: "easeOut" }}
              className="grid gap-x-8 gap-y-10 sm:grid-cols-2"
            >
              {practicePillars.map((pillar, index) => (
                <div
                  key={pillar.title}
                  className={`border-t border-foreground/10 pt-5 ${index < 2 ? "sm:pt-0 sm:border-t-0" : ""
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <pillar.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl">{pillar.title}</h3>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* <section className="py-24 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...revealProps}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.4rem] border border-foreground/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(238,232,248,0.72),rgba(236,244,237,0.8))] p-8 shadow-[0_28px_90px_rgba(36,52,49,0.08)] sm:p-10 lg:p-14"
          >
            <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-primary/12 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-secondary/15 blur-3xl" />

            <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-2xl">
                <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.34em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  How the journey unfolds
                </p>
                <h2 className="mt-4 text-balance text-4xl sm:text-5xl">
                  Lasting change begins when inner life and outer life start
                  moving together.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Every session is designed to help you come back to yourself
                  with greater clarity, steadiness, and purpose. The intention
                  is not just to heal a moment, but to create a way of being
                  that continues to support your life beyond it.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a
                    {...bookingLinkProps}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-4 text-base font-medium text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:shadow-lg hover:shadow-primary/20"
                  >
                    Book a Session
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="grid gap-6">
                {transformationSteps.map((item, index) => (
                  <div
                    key={item.step}
                    className="border-t border-foreground/10 pt-5 first:border-t-0 first:pt-0"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-serif text-4xl text-primary/50">
                        0{index + 1}
                      </span>
                      <div>
                        <h3 className="text-2xl">{item.step}</h3>
                        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}
    </div>
  );
}
