import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { bookingLinkProps } from "@/lib/booking";

const workshops = [
  {
    title: "Crystal Healing Fundamentals",
    desc: "Learn to work with crystals for personal healing, clearing energy fields, and setting intentions.",
    duration: "2-Day Intensive",
    // date: "Next: October 12-13",
    type: "In-Person"
  },
  {
    title: "The Art of Aromatherapy",
    desc: "Discover how to blend essential oils for therapeutic purposes, emotional balance, and home wellness.",
    duration: "Half-Day Workshop",
    // date: "Next: November 5",
    type: "Virtual & In-Person"
  },
  {
    title: "NLP for Personal Growth",
    desc: "Master your mindset, reframe negative self-talk, and transform your life with foundational NLP tools.",
    duration: "Weekend Workshop",
    // date: "Next: November 18-19",
    type: "In-Person"
  },
  {
    title: "Holistic Wellness Retreat",
    desc: "A full immersive wellness experience combining all our modalities for complete rejuvenation.",
    duration: "3-Day Retreat",
    // date: "Next: Spring 2025",
    type: "Destination"
  }
];

export function Workshops() {
  return (
    <section id="workshops" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Learn & Grow</h2>
            <h3 className="text-4xl sm:text-5xl font-serif text-foreground">Transformative Workshops</h3>
          </div>
          <p className="text-muted-foreground text-lg max-w-md md:text-right">
            Deepen your practice and learn the tools to sustain your wellness journey independently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshops.map((workshop, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col sm:flex-row gap-6 bg-muted/40 rounded-3xl p-6 sm:p-8 hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-transparent hover:border-border"
            >
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {workshop.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-foreground">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    {workshop.type}
                  </span>
                </div>
                
                <h4 className="font-serif text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {workshop.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {workshop.desc}
                </p>
                
                {/* <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-2 text-sm text-foreground/70 font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    {workshop.date}
                  </span>
                </div> */}
              </div>
              
              <div className="sm:w-auto flex items-end sm:items-center">
                <a
                  {...bookingLinkProps}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:bg-primary transition-colors duration-300 text-center"
                >
                  Reserve Spot
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
