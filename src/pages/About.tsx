import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { TransitionProvider } from "../components/TransitionContext";

// --------------------
// Types
// --------------------
type Person = {
  id: number;
  name: string;
  role: string;
  bio: string;
  qualities: string[];
  image: string;
};

// --------------------
// Data
// --------------------
const founders: Person[] = [
  {
    id: 0,
    name: "Sudharshan Bala",
    role: "Founder & CEO",
    bio: "Leads product strategy and long-term vision. Focused on building enduring systems with clarity, intent, and trust.",
    qualities: ["Product Vision", "Strategy", "Design Leadership"],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 1,
    name: "KG Goutham",
    role: "Co-Founder & Head of Engineering",
    bio: "Architects scalable platforms and resilient systems with an obsession for correctness, performance, and reliability.",
    qualities: ["System Architecture", "Cloud Infrastructure", "Engineering Culture"],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600",
  },
];

const principles = [
  {
    title: "Our Mission",
    description:
      "To design and engineer dependable AI systems that simplify complexity, empower people, and create long-term economic value. We focus on foundations, not hype.",
  },
  {
    title: "Clarity Over Complexity",
    description:
      "We prioritize clear thinking, well-defined outcomes, and systems that are understandable, auditable, and maintainable.",
  },
  {
    title: "Craft & Precision",
    description:
      "Every detail matters. From architecture to interface, we build with restraint, intention, and long-term quality in mind.",
  },
  {
    title: "Human-Centered AI",
    description:
      "AI should augment human judgment, not replace it. We design systems that keep people in control.",
  },
  {
    title: "Enterprise Trust",
    description:
      "Security, reliability, and compliance are engineered into every system we build — never bolted on later.",
  },
  {
    title: "Impact That Compounds",
    description:
      "We focus on high-leverage work — systems that improve over time and create sustained business value.",
  },
];

// --------------------
// Founder Block (Fixed Parallax)
// --------------------
const FounderBlock = ({ person }: { person: Person }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth parallax movement
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="border-t border-neutral-200 pt-8">
      {/* Image Container - Enforced Grayscale & Parallax */}
      <div className="relative h-[520px] w-full overflow-hidden border border-neutral-200 bg-neutral-100">
        <motion.div style={{ y }} className="h-[120%] w-full relative -top-[10%]">
             <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover grayscale" // Forced grayscale to remove "purple/color"
             />
        </motion.div>
        {/* Subtle Overlay to unify contrast */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Content */}
      <div className="pt-8">
        <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">
          {person.role}
        </span>

        <h3 className="mt-4 text-4xl font-serif font-medium text-neutral-900">
          {person.name}
        </h3>

        <p className="mt-6 text-lg leading-relaxed text-neutral-600 max-w-xl">
          {person.bio}
        </p>

        <div className="mt-10 border-t border-neutral-200 pt-6">
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4">
            Focus Areas
          </p>
          <div className="flex flex-col gap-2">
            {person.qualities.map((q) => (
              <span key={q} className="text-sm text-neutral-800 font-medium">
                — {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --------------------
// Page
// --------------------
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-inter">
      <TransitionProvider>
        <Navbar />

        <main className="w-full max-w-7xl mx-auto pt-32 pb-32 px-6">

          {/* ====================
              Header
          ==================== */}
          <section className="mb-24 border-b border-neutral-200 pb-16">
            <Reveal>
              {/* Removed bg-accent-hover, replaced with bg-neutral-100 (Light Grey) */}
              <div className="flex flex-col lg:flex-row justify-between items-end gap-12 bg-white border border-neutral-200 p-12">
                
                {/* Primary Content Node */}
                <div className="max-w-4xl">
                  <span className="text-neutral-500 uppercase tracking-[0.25em] mb-4 block font-medium text-xs">
                    Who We Are
                  </span>
                  <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-neutral-900 leading-[1.1]">
                    We build systems that scale with trust.
                  </h1>
                </div>

                {/* Secondary CTA Node */}
                <div className="w-full lg:w-auto min-w-[240px]">
                  <button 
                    onClick={() => document.getElementById('mission-principles')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full bg-neutral-900 text-white border border-neutral-900 px-8 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    View Principles
                  </button>
                </div>

              </div>
            </Reveal>
          </section>

          {/* ====================
              Founders
          ==================== */}
          <section className="mb-32">
            <div className="border-b border-neutral-200 pb-4 flex justify-between items-end mb-12">
              <Reveal>
                <h2 className="text-3xl font-medium">Meet Our Founders</h2>
              </Reveal>
              <span className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                Leadership
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {founders.map((person) => (
                <Reveal key={person.id}>
                  <FounderBlock person={person} />
                </Reveal>
              ))}
            </div>
          </section>

          {/* ====================
              Mission & Principles
          ==================== */}
          {/* Added ID here to fix the connection issue */}
          <section id="mission-principles" className="border-t border-neutral-200 pt-24">
            <div className="flex flex-col text-center justify-center items-center mb-16">
              <Reveal>
                <span className="text-neutral-500 uppercase tracking-wider text-xs font-bold">
                  How We Think
                </span>
                <h2 className="text-4xl font-medium text-neutral-900 mt-4">
                  Mission & Principles
                </h2>
              </Reveal>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div
                    className="group relative h-full bg-white border border-neutral-200 p-10
                               hover:bg-neutral-900 transition-all duration-500 ease-out
                               cursor-default overflow-hidden"
                  >
                    {/* Background Number */}
                    <span
                      className="absolute -bottom-10 -right-4 text-[10rem] font-bold leading-none
                                 text-neutral-100
                                 group-hover:text-neutral-800
                                 transition-colors duration-500 pointer-events-none select-none z-0"
                    >
                      {index + 1}
                    </span>

                    <div className="relative z-10 flex flex-col items-start gap-4 h-full min-h-[200px]">
                      <div>
                        <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-white transition-colors duration-500 leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-[16px] text-neutral-600 group-hover:text-neutral-400 transition-colors duration-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

        </main>

        <Footer />
      </TransitionProvider>
    </div>
  );
}