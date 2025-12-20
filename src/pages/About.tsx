// src/pages/About.tsx
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Reveal } from "../components/Reveal";

/* --------------------
   Types & Data
-------------------- */
type Person = {
  id: number;
  name: string;
  role: string;
  bio: string;
  qualities: string[];
  image: string;
};

const founders: Person[] = [
  {
    id: 0,
    name: "Sudharshan Bala",
    role: "Founder & CEO",
    bio: "Leads Parsemind’s security-first vision and long-term technical strategy, focused on building enterprise-grade AI systems that are secure, compliant, and dependable at scale.",
    qualities: ["Cybersecurity & Compliance", "Enterprise AI Architecture", "System Reliability"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 1,
    name: "KG Goutham",
    role: "Founder & CEO",
    bio: "Leads product direction and go-to-market strategy, driving adoption of AI systems through clear positioning, scalable execution, and customer-centric design.",
    qualities: ["Go-To-Market Strategy", "Product Leadership", "Growth & Partnerships"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600",
  },
];

const principles = [
  { title: "Our Mission", description: "To build AI systems enterprises can trust - secure, governable, and engineered to deliver sustained business value in real-world environments." },
  { title: "Intentional by Design", description: "Every system begins with clear outcomes, ownership, and accountability - not experimentation for its own sake." },
  { title: "Responsible & Secure", description: "Security, compliance, and governance are foundational. They are designed in from day one, never bolted on later." },
  { title: "Human-in-the-Loop", description: "AI should augment human judgment, not replace it. Control, oversight, and escalation paths matter." },
  { title: "Built to Scale", description: "We design architectures that scale across teams, geographies, and use cases without constant rework." },
  { title: "Enduring Impact", description: "We focus on systems that compound value over time - technically, operationally, and commercially." },
];

/* --------------------
   Founder Component
-------------------- */
const FounderBlock = ({ person }: { person: Person }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="pt-4 md:pt-8">
      <div className="relative h-[400px] md:h-[520px] w-full overflow-hidden border border-neutral-200 bg-neutral-100">
        <motion.div style={{ y }} className="h-[120%] w-full relative -top-[10%]">
          <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale" />
        </motion.div>
        <div className="absolute inset-0 bg-black/5" />
      </div>
      <div className="pt-6 md:pt-8">
        <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">{person.role}</span>
        <h3 className="mt-3 md:mt-4 text-3xl md:text-4xl font-fraunces font-medium text-neutral-900 leading-tight">{person.name}</h3>
        <p className="mt-4 md:mt-6 text-base md:text-lg leading-relaxed text-neutral-600 max-w-xl">{person.bio}</p>
        <div className="mt-8 md:mt-10 pt-6 border-t border-neutral-100 md:border-none">
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4">Focus Areas</p>
          <div className="flex flex-col gap-2">
            {person.qualities.map((q) => (
              <span key={q} className="text-sm text-neutral-800 font-medium">- &nbsp;{q}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --------------------
   Principle Card (FIXED)
-------------------- */
interface PrincipleCardProps {
  item: { title: string; description: string };
  index: number;
  activeCard: number | null;
  setActiveCard: (index: number | null) => void;
}

const PrincipleCard = ({ item, index, activeCard, setActiveCard }: PrincipleCardProps) => {
  const ref = useRef(null);
  
  // FIX 1: Stricter margin ("-50%") creates a razor-thin line in the center.
  // This prevents multiple cards from being "in view" simultaneously.
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    // FIX 2: Only use Scroll logic on Mobile/Tablet (< 1024px)
    // On desktop, we ignore this and let the mouse handle it.
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile && isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  // FIX 3: Desktop-only Hover Handlers
  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024) setActiveCard(index);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 1024) setActiveCard(null);
  };

  // Determine state
  const isDimmed = activeCard !== null && activeCard !== index;

  return (
    <div 
      ref={ref} 
      className="h-full relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
            opacity: isDimmed ? 0.3 : 1,
            scale: isDimmed ? 0.95 : 1,
            filter: isDimmed ? "blur(1px)" : "blur(0px)", // Adds a subtle blur to inactive ones
        }}
        transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition to stop jitter
        className={`
            group relative h-full bg-white border border-neutral-200 
            p-6 md:p-8 lg:p-10 
            hover:bg-neutral-900 
            cursor-default overflow-hidden min-h-[250px]
            ${activeCard === index ? "shadow-2xl ring-1 ring-neutral-900/5 z-10" : "shadow-none z-0"}
        `}
      >
        {/* Background Number */}
        <span className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-4 text-[6rem] md:text-[8rem] lg:text-[10rem] font-bold leading-none text-neutral-100 group-hover:text-neutral-800 transition-colors duration-500 pointer-events-none select-none z-0">
          {index + 1}
        </span>

        <div className="relative z-10 flex flex-col gap-3 md:gap-4">
          <h3 className="text-lg md:text-xl font-semibold text-neutral-900 mb-1 md:mb-3 group-hover:text-white transition-colors">
            {item.title}
          </h3>
          <p className="text-sm md:text-[16px] text-neutral-600 group-hover:text-neutral-400 leading-relaxed transition-colors">
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

/* --------------------
   Main Page
-------------------- */
export default function AboutPage() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA] mt-10 md:mt-0 text-neutral-900 font-inter">
      <main className="w-full max-w-7xl mx-auto pt-20 pb-20 md:pt-32 md:pb-32 px-6 space-y-20 md:space-y-32">
        
        {/* --- Hero --- */}
        <section className="w-full">
          <Reveal>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 lg:gap-12">
              <div className="max-w-4xl">
                <span className="text-neutral-500 uppercase tracking-[0.25em] mb-4 block text-xs font-bold">Who We Are</span>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-fraunces font-medium text-text-main leading-[1.1]">We build AI systems enterprises can trust.</h1>
                <p className="mt-6 md:mt-8 text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl">
                  Parsemind is an enterprise AI consulting and engineering firm focused on designing, deploying, and scaling agentic AI systems inside real organizations.
                </p>
              </div>
              <div className="flex items-center w-full lg:w-auto">
                <button
                  onClick={() => document.getElementById("mission-principles")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full lg:w-auto px-10 py-4 md:px-14 bg-black text-white border-2 border-black text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-black flex justify-center"
                >
                  View Principles
                </button>
              </div>
            </div>
          </Reveal>
        </section>

        {/* --- Founders --- */}
        <section>
          <div className="border-b border-neutral-200 flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-12 gap-2 md:gap-0">
            <Reveal><h2 className="text-3xl md:text-4xl font-fraunces text-text-main">Leadership</h2></Reveal>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Founders</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
            {founders.map((person) => (
              <Reveal key={person.id}><FounderBlock person={person} /></Reveal>
            ))}
          </div>
        </section>

        {/* --- Principles --- */}
        <section id="mission-principles" className="border-t border-neutral-200 pt-16 md:pt-24">
          <div className="flex flex-col text-center justify-center items-center mb-12 md:mb-16">
            <Reveal>
              <span className="text-neutral-500 uppercase tracking-wider text-xs font-bold">How We Think</span>
              <h2 className="text-3xl md:text-5xl font-fraunces text-text-main mt-4">Mission and Principles</h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {principles.map((item, index) => (
              <Reveal key={index} delay={index * 0.1}>
                 <PrincipleCard 
                   item={item} 
                   index={index} 
                   activeCard={activeCard}
                   setActiveCard={setActiveCard}
                 />
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- Footer Quote --- */}
        <section className="max-w-3xl">
          <Reveal>
            <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed">
              Enterprise AI succeeds not through speed alone, but through clarity, discipline, and systems designed to endure.
            </p>
          </Reveal>
        </section>
      </main>
    </div>
  );
}