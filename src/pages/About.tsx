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
// Founder Block
// --------------------
const FounderBlock = ({ person }: { person: Person }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <div ref={ref} className="border-t border-border pt-8">
      {/* Image */}
      <div className="relative h-[520px] overflow-hidden border border-border">
        <motion.img
          src={person.image}
          alt={person.name}
          style={{ y }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="pt-6">
        <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
          {person.role}
        </span>

        <h3 className="mt-4 text-4xl font-serif font-medium text-text-main">
          {person.name}
        </h3>

        <p className="mt-6 text-lg leading-relaxed text-text-body/80 max-w-xl">
          {person.bio}
        </p>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
            Focus Areas
          </p>
          <div className="flex flex-col gap-2">
            {person.qualities.map((q) => (
              <span key={q} className="text-sm text-text-main">
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
    <div className="min-h-screen bg-bg-main text-text-main font-inter">
      <TransitionProvider>
        <Navbar />

        <main className="w-full max-w-7xl mx-auto pt-32 pb-32 px-6">

          {/* ====================
              Header
          ==================== */}
          <section className="border-b border-border pb-16">
            <Reveal>
              <span className="text-text-body uppercase tracking-[0.25em] mb-4 block font-medium">
                Who We Are
              </span>
              <h1 className="type-h1 text-text-main max-w-4xl">
                We build systems that scale with trust.
              </h1>
            </Reveal>
          </section>

          {/* ====================
              Founders
          ==================== */}
          <section className="mb-32">
            <div className="border-b border-border pb-4 flex justify-between items-end">
              <Reveal>
                <h2 className="type-h2">Founders</h2>
              </Reveal>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-400">
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
          <section className="border-t border-border pt-24">
            <div className="flex flex-col text-center justify-center items-center mb-16">
              <Reveal>
                <span className="text-text-body uppercase tracking-wider">
                  How We Think
                </span>
                <h2 className="type-h2 text-text-main mt-2">
                  Mission & Principles
                </h2>
              </Reveal>
            </div>

            {/* Cards — SAME system as "What Sets Us Apart" */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div
                    className="group relative h-full bg-bg-card border border-gray-100 p-8
                               hover:bg-black transition-all duration-500 ease-out
                               hover:shadow-2xl cursor-default overflow-hidden"
                  >
                    {/* Large background number */}
                    <span
                      className="absolute -bottom-10 -right-4 text-[10rem] font-bold leading-none
                                 text-black opacity-5
                                 group-hover:text-white group-hover:opacity-10
                                 transition-colors duration-500 pointer-events-none select-none z-0"
                    >
                      {index + 1}
                    </span>

                    <div className="relative z-10 flex flex-col items-start gap-4 h-full min-h-[200px]">
                      <div>
                        <h3 className="type-h3 text-text-main mb-3 group-hover:text-white transition-colors duration-500 leading-tight">
                          {item.title}
                        </h3>

                        <p className="type-body-main text-[18px] text-gray-600 group-hover:text-gray-400 transition-colors duration-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Subtle hover glow */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
