// src/components/Footer.tsx
import React from "react";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { Reveal } from "./Reveal";
import { Link } from "react-router-dom";
import { usePageTransition } from "./TransitionContext";
import { useCalendly } from "./hooks/useCalendly";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";


const FlickeringGrid = () => {
  const [squares, setSquares] = useState<{ id: number; r: number; c: number; delay: number }[]>([]);

  useEffect(() => {
    const count = 3;
    const newSquares = Array.from({ length: count }).map((_, i) => ({
      id: i,
      r: Math.floor(Math.random() * 20),
      c: Math.floor(Math.random() * 20),
      delay: Math.random() * 5,
    }));
    setSquares(newSquares);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundPosition: "0 0",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          className="absolute bg-indigo-400/20 border border-indigo-400/30 shadow-[0_0_15px_rgba(129,140,248,0.3)]"
          style={{
            width: 40,
            height: 40,
            top: sq.r * 40,
            left: sq.c * 40,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: sq.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};


const links = [
  { name: "Home", href: "/" },
  { name: "Our Products", href: "#solutions" },
  { name: "About", href: "/about" },
  { name: "Partners", href: "/partners" },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { triggerTransition } = usePageTransition();
  const { loadScript, openPopup } = useCalendly();

  const handleNavClick = (e: React.MouseEvent, linkName: string) => {
    if (linkName === "Our Products") {
      e.preventDefault();
      triggerTransition("https://anseru.ai");
    }
  };

  return (
    <footer className="relative w-full bg-black text-white isolate overflow-hidden border-t border-white/10">
      
      {/* Grid Background */}
      <FlickeringGrid/>

      {/* Gradient Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-24">

        {/* =====================
            Top CTA
        ===================== */}
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between gap-12 items-start md:items-start border-b border-white/10 pb-16">
            <div className="max-w-2xl space-y-6">
              <h2 className="text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight font-fraunces">
                Build enterprise AI <br /> with clarity and control
              </h2>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-xl font-inter">
                We help organizations design, deploy, and govern agentic AI systems
                that operate reliably in real production environments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto translate-y-2">
              <button
                onMouseEnter={loadScript}
                onClick={openPopup}
                className="
                  px-8 py-4 text-sm font-bold uppercase tracking-widest
                  bg-white text-black
                  hover:bg-black hover:text-white
                  transition-all duration-300
                  border border-white
                "
              >
                Start a Strategy Call
              </button>
              <button
                onMouseEnter={loadScript}
                onClick={openPopup}
                className="
                  px-8 py-4 text-sm font-bold uppercase tracking-widest
                  bg-black text-white
                  hover:bg-white hover:text-black
                  transition-all duration-300
                  border border-white
                "
              >
                Join Our Partner Ecosystem
              </button>

            </div>
          </div>
        </Reveal>

        {/* =====================
            Footer Grid
        ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-6 space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-6">
                <span className="uppercase tracking-[0.2em] text-xs font-bold text-white block">
                  Parsemind
                </span>
                <p className="text-neutral-500 text-base leading-relaxed max-w-md">
                  Parsemind is an enterprise AI consulting and engineering firm
                  focused on building secure, governable, and scalable agentic
                  systems for real-world operations.
                </p>

                <div className="flex gap-4">
                  {[
                    { icon: Mail, href: "mailto:kggoutham@anseru.ai" },
                    { icon: Linkedin, href: "#" },
                    { icon: Twitter, href: "#" },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="w-10 h-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                      <social.icon
                        size={16}
                        className="text-neutral-400 group-hover:text-black transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Solutions */}
          <div className="md:col-span-3">
            <Reveal delay={0.15}>
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                  Capabilities
                </h3>
                <ul className="space-y-4">
                  {[
                    "Agentic Systems",
                    "Enterprise AI Integration",
                    "Knowledge Automation",
                    "Custom AI Workflows",
                  ].map((s) => (
                    <li key={s}>
                      <span className="text-sm text-neutral-500 block">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white">
                  Company
                </h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      {link.name === "Our Products" ? (
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.name)}
                          className="text-sm text-neutral-500 hover:text-white transition-colors block"
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className="text-sm text-neutral-500 hover:text-white transition-colors block"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

        </div>

        {/* =====================
            Bottom Bar
        ===================== */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row gap-6 md:gap-0 items-start md:items-center justify-between">
          <p className="text-xs text-neutral-600 font-mono">
            © {year} PARSEMIND INC. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap gap-8 text-xs text-neutral-600 font-mono uppercase tracking-wide">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link to="/responsible-ai" className="hover:text-white transition-colors">
              Responsible AI
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
