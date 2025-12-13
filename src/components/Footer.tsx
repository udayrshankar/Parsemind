// src/components/Footer.tsx
import React from "react";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { Reveal } from './Reveal';
import { WavyBackground } from './WavyBackground';
import { Link } from 'react-router-dom';
import { usePageTransition } from './TransitionContext';
import { useEffect, useState } from 'react';

const links = [
  { name: "Home", href: "/" },
  { name: "Our Products", href: "#solutions" }, // fallback anchor
  { name: "About", href: "/about" },
  { name: "Partners", href: "/partners" },
];

export const Footer: React.FC = () => {

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // 1. Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Load Calendly JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (!isScriptLoaded || !window.Calendly) return;
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/kg-goutham-anseru/30min',
    });
  };

  const year = new Date().getFullYear();
  const { triggerTransition } = usePageTransition();

  const handleNavClick = (e: React.MouseEvent, linkName: string, href: string) => {
    // Keep the same behavior as Navbar: intercept "Our Products"
    if (linkName === "Our Products") {
      e.preventDefault();
      triggerTransition("https://anseru.ai");
      return;
    }

    // For same-page anchors (like #solutions) we allow default behaviour; Link will handle route changes
    // Close any overlays here if you have that logic (not required in this Footer)
  };

  return (
    <footer className="relative w-full bg-black text-white isolate overflow-hidden">
      {/* Full-bleed animated background */}
      <WavyBackground />

      {/* Overlay noise texture (same style as Hero) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20 space-y-20">
        {/* Top CTA Block */}
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between gap-10 items-start md:items-center">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
                Architect your next AI leap with Parsemind
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
                Design and deploy fully managed agentic AI architectures — secure, scalable, and built for real production environments.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full md:w-auto">
              <button
                onClick={() => { openCalendly(); }}
                className="
                  px-8 py-3 text-sm md:text-base font-medium
                  bg-white text-black
                  hover:bg-black hover:text-white
                  transition-all duration-300 hover:scale-[1.03]
                  border border-white
                "
              >
                Book a Strategy Call
              </button>

              <a
                href="mailto:kggoutham@anseru.ai"
                className="
                  px-8 py-3 text-sm md:text-base font-medium
                  bg-black text-white
                  border border-white
                  hover:bg-white hover:text-black
                  transition-all duration-300 hover:scale-[1.03]
                "
              >
                Email Us
              </a>
            </div>
          </div>
        </Reveal>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <Reveal delay={0.1}>
            <div className="space-y-4 md:col-span-2">
              <span className="uppercase tracking-[0.2em] text-sm font-semibold">
                Parsemind
              </span>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-md">
                Parsemind engineers intelligent agentic architectures that transform how enterprise teams operate, automate and scale their business.
              </p>

              <div className="flex gap-3 pt-2">
                <a
                  href="mailto:kggoutham@anseru.ai"
                  className="w-9 h-9 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <Mail size={16} />
                </a>

                <a
                  href="#"
                  className="w-9 h-9 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <Linkedin size={16} />
                </a>

                <a
                  href="#"
                  className="w-9 h-9 border border-white/30 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <Twitter size={16} />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Solutions (now routed) */}
          <Reveal delay={0.15}>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Solutions
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                {/* If you want these to navigate to dedicated routes in future, swap Link->to accordingly */}
                {['Agentic Automation', 'AI Integration', 'Knowledge Agents', 'Custom Workflows'].map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Company (nav links mirrored from Navbar) */}
          <Reveal delay={0.2}>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Company
              </h3>

              <ul className="space-y-2 text-sm text-gray-400">
                {links.map((link) => {
                  const isExternalAnchor = link.href.startsWith('#');
                  // Render as anchor for in-page anchors or Link for routes
                  return (
                    <li key={link.name}>
                      {link.name === "Our Products" ? (
                        // For Our Products we intercept and trigger the same transition
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.name, link.href)}
                          className="hover:text-gray-200 transition-colors cursor-pointer"
                        >
                          {link.name}
                        </a>
                      ) : isExternalAnchor ? (
                        <a href={link.href} className="hover:text-gray-200 transition-colors">{link.name}</a>
                      ) : (
                        <Link to={link.href} className="hover:text-gray-200 transition-colors">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  );
                })}

               
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between text-xs text-gray-500">
          <p>© {year} Parsemind. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-gray-300 transition-all">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-300 transition-all">Terms of Use</Link>
            <Link to="/responsible-ai" className="hover:text-gray-300 transition-all">Responsible AI</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
