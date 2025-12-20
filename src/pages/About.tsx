// src/pages/About.tsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../components/Reveal";

/* --------------------
   Types
-------------------- */
type Person = {
  id: number;
  name: string;
  role: string;
  bio: string;
  qualities: string[];
  image: string;
};

/* --------------------
   Founders
-------------------- */
const founders: Person[] = [
  {
    id: 0,
    name: "Sudharshan Bala",
    role: "Founder & CEO",
    bio: "Leads Parsemind’s security-first vision and long-term technical strategy, focused on building enterprise-grade AI systems that are secure, compliant, and dependable at scale.",
    qualities: [
      "Cybersecurity & Compliance",
      "Enterprise AI Architecture",
      "System Reliability",
    ],
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 1,
    name: "KG Goutham",
    role: "Founder & CEO",
    bio: "Leads product direction and go-to-market strategy, driving adoption of AI systems through clear positioning, scalable execution, and customer-centric design.",
    qualities: [
      "Go-To-Market Strategy",
      "Product Leadership",
      "Growth & Partnerships",
    ],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1600",
  },
];

/* --------------------
   Principles
-------------------- */
const principles = [
  {
    title: "Our Mission",
    description:
      "To build AI systems enterprises can trust - secure, governable, and engineered to deliver sustained business value in real-world environments.",
  },
  {
    title: "Intentional by Design",
    description:
      "Every system begins with clear outcomes, ownership, and accountability - not experimentation for its own sake.",
  },
  {
    title: "Responsible & Secure",
    description:
      "Security, compliance, and governance are foundational. They are designed in from day one, never bolted on later.",
  },
  {
    title: "Human-in-the-Loop",
    description:
      "AI should augment human judgment, not replace it. Control, oversight, and escalation paths matter.",
  },
  {
    title: "Built to Scale",
    description:
      "We design architectures that scale across teams, geographies, and use cases without constant rework.",
  },
  {
    title: "Enduring Impact",
    description:
      "We focus on systems that compound value over time - technically, operationally, and commercially.",
  },
];

/* --------------------
   Founder Block (UNCHANGED)
-------------------- */
const FounderBlock = ({ person }: { person: Person }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="pt-8">
      <div className="relative h-[520px] w-full overflow-hidden border border-neutral-200 bg-neutral-100">
        <motion.div
          style={{ y }}
          className="h-[120%] w-full relative -top-[10%]"
        >
          <img
            src={person.image}
            alt={person.name}
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="pt-8">
        <span className="text-xs uppercase tracking-widest font-bold text-neutral-400">
          {person.role}
        </span>

        <h3 className="mt-4 text-4xl font-fraunces font-medium text-neutral-900">
          {person.name}
        </h3>

        <p className="mt-6 text-lg leading-relaxed text-neutral-600 max-w-xl">
          {person.bio}
        </p>

        <div className="mt-10 pt-6">
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-4">
            Focus Areas
          </p>
          <div className="flex flex-col gap-2">
            {person.qualities.map((q) => (
              <span key={q} className="text-sm text-neutral-800 font-medium">
                 -  {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --------------------
   Page
-------------------- */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900 font-inter">

        <main className="w-full max-w-7xl mx-auto pt-32 pb-32 px-6 space-y-16">
          <section className="w-full">
            <Reveal>
              <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
                {/* LEFT: TEXT */}
                <div className="max-w-4xl">
                  <span className="text-neutral-500 uppercase tracking-[0.25em] mb-4 block text-xs font-bold">
                    Who We Are
                  </span>

                  <h1 className="type-h1 text-text-main">
                    We build AI systems enterprises can trust.
                  </h1>

                  <p className="mt-8 text-xl text-neutral-600 leading-relaxed">
                    Parsemind is an enterprise AI consulting and engineering
                    firm focused on designing, deploying, and scaling agentic AI
                    systems inside real organizations - where reliability,
                    governance, and accountability matter.
                  </p>
                </div>

                {/* RIGHT: BUTTON (VERTICALLY CENTERED) */}
                <div className="flex items-center">
                  <button
                    onClick={() =>
                      document
                        .getElementById("mission-principles")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="
            px-14 py-4
            bg-black text-white
            border-2 border-black
            text-sm font-bold uppercase tracking-widest
            transition-all duration-300
            hover:bg-white hover:text-black
          "
                  >
                    View Principles
                  </button>
                </div>
              </div>
            </Reveal>
          </section>

       
          <section>
            <div className="border-b py-2 border-neutral-200 flex justify-between items-center mb-8">
              <Reveal>
                <h2 className="type-h1 text-text-main">Leadership</h2>
              </Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                Founders
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

    
          <section
            id="mission-principles"
            className="border-t border-neutral-200 pt-24"
          >
            <div className="flex flex-col text-center justify-center items-center mb-16">
              <Reveal>
                <span className="text-neutral-500 uppercase tracking-wider text-xs font-bold">
                  How We Think
                </span>
                <h2 className="type-h2 text-text-main mt-4">
                  Mission and Principles
                </h2>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {principles.map((item, index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <div className="group relative h-full bg-white border border-neutral-200 p-10 hover:bg-neutral-900 transition-all duration-500 ease-out cursor-default overflow-hidden">
                    <span className="absolute -bottom-10 -right-4 text-[10rem] font-bold leading-none text-neutral-100 group-hover:text-neutral-800 transition-colors duration-500 pointer-events-none select-none z-0">
                      {index + 1}
                    </span>

                    <div className="relative z-10 flex flex-col gap-4 min-h-[200px]">
                      <h3 className="text-xl font-semibold text-neutral-900 mb-3 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[16px] text-neutral-600 group-hover:text-neutral-400 leading-relaxed transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="max-w-3xl">
            <Reveal>
              <p className="text-2xl text-neutral-700 leading-relaxed">
                Enterprise AI succeeds not through speed alone, but through
                clarity, discipline, and systems designed to endure.
              </p>
            </Reveal>
          </section>
        </main>

    </div>
  );
}
