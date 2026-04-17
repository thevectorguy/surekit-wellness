import { motion } from "framer-motion";
import { ArrowRight, Leaf, Heart, Brain, Sparkles } from "lucide-react";
import { Link } from "wouter";

const values = [
  {
    icon: Leaf,
    title: "Nature's Wisdom",
    desc: "Drawing from the earth's natural energy."
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    desc: "Reprogramming limits with proven NLP."
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    desc: "A safe, nurturing space for your journey."
  },
  {
    icon: Sparkles,
    title: "Lasting Shift",
    desc: "Transformation that echoes in daily life."
  }
];

// export function Philosophy() {
//   return (
//     <section id="about" className="py-24 bg-background relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
//           <motion.div
//             initial={{ opacity: 0, x: -30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.8 }}
//             className="relative"
//           >
//             <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-2xl shadow-black/5">
//               <img
//                 src={`${import.meta.env.BASE_URL}images/1a0a9509-b54d-4284-a16f-d5751c063a43.jpg`}
//                 alt="Healing crystals and lavender"
//                 className="w-full h-full object-cover object-[center_38%]"
//               />
//               <div className="absolute inset-0 border border-black/5 rounded-3xl" />
//             </div>
//             {/* Decorative offset card */}
//             <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -z-10" />
//             <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
//           </motion.div>

//           {/* <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <h2 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">About Me</h2>
//             <h3 className="text-4xl sm:text-5xl font-serif mb-6 text-foreground">
//               From developing careers to <span className="italic text-primary">healing lives</span>
//             </h3>
            
//             <p className="text-lg text-muted-foreground leading-relaxed mb-10">
//               For over 30 years, I worked in Learning & Development with leading IT organizations, helping individuals grow and become leaders, but I came to realize that true transformation goes beyond skills—it begins within. This insight led me on a deeper journey into inner healing and self-discovery, where I was drawn to ancient wisdom and became an initiate into Srividya, exploring energy, consciousness, and balance. Alongside this path, I trained in counselling, coaching, and Neuro-Linguistic Programming (NLP) to help people reframe limiting beliefs and create meaningful, lasting change.
//             </p>

//             <Link
//               href="/about"
//               className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.28em] text-primary mb-10"
//             >
//               Read the full founder story
//               <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//             </Link>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
//               {values.map((val, idx) => (
//                 <div key={idx} className="flex gap-4">
//                   <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
//                     <val.icon className="w-5 h-5" />
//                   </div>
//                   <div>
//                     <h4 className="font-serif font-semibold text-lg text-foreground mb-1">{val.title}</h4>
//                     <p className="text-sm text-muted-foreground">{val.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div> */}

//         </div>
//       </div>
//     </section>
//   );
// }
