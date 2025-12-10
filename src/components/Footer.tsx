// src/components/Footer.tsx
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { Reveal } from './Reveal';
import { WavyBackground } from './WavyBackground';

export const Footer = () => {
  const year = new Date().getFullYear();

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
                onClick={() => {
                  const bookingSection = document.getElementById('booking');
                  bookingSection?.scrollIntoView({ behavior: 'smooth' });
                }}
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

          {/* Solutions */}
          <Reveal delay={0.15}>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Solutions
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Agentic Automation</li>
                <li>AI Integration</li>
                <li>Knowledge Agents</li>
                <li>Custom Workflows</li>
              </ul>
            </div>
          </Reveal>

          {/* Company */}
          <Reveal delay={0.2}>
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide">
                Company
              </h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About</li>
                <li>How We Work</li>
                <li>Trust & Security</li>
                <li>Careers</li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-between text-xs text-gray-500">
          <p>© {year} Parsemind. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <button className="hover:text-gray-300 transition-all">
              Privacy Policy
            </button>
            <button className="hover:text-gray-300 transition-all">
              Terms of Use
            </button>
            <button className="hover:text-gray-300 transition-all">
              Responsible AI
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
