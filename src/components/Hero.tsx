// src/components/Hero.tsx
import { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import EmaAnimation from './EmaAnimation';
import { useCalendly } from './hooks/useCalendly'; 
import { motion } from 'framer-motion';

// --- Visual Components ---

const FlickeringGrid = () => {
  const [squares, setSquares] = useState<{ id: number; r: number; c: number; delay: number }[]>([]);

  useEffect(() => {
    const count = 25;
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

// --- Reusable Sub-component for Partners ---
// Extracted to avoid code duplication since we need it in two places now
const TrustedPartnersContent = () => (
  <div className="pt-8 border-t border-white/10 max-w-lg">
    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 font-inter">
      Trusted by industry leaders
    </p>
    <div className="flex flex-wrap items-center gap-8 opacity-60 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0">
      <svg className="h-7 w-auto fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.1 2H24v20L15.1 2zM8.9 2H0v20L8.9 2zM12 9.4L17.6 22h-3.8l-1.6-4H8.1L12 9.4z"/></svg>
      <svg className="h-6 w-auto fill-current text-white" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h11v11H0zM12 0h11v11H12zM0 12h11v11H0zM12 12h11v11H12z"/></svg>
      <svg className="h-6 w-auto fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
      <svg className="h-5 w-auto fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M16.924 5.587c-.896 0-1.84.237-2.61.59-1.57.717-2.31 1.76-2.31 1.76s-.738-1.042-2.31-1.76c-.77-.353-1.714-.59-2.61-.59C3.155 5.587 0 8.52 0 13.918c0 2.227.674 4.498 3.52 4.498 1.488 0 2.502-.455 3.33-1.054.82-.592 1.258-1.284 1.258-1.284s.48 1.255 2.105 1.725c.717.208 1.435.313 2.055.313 3.69 0 6.13-2.66 6.13-6.576 0-3.363-2.196-5.953-6.074-5.953zM7.09 15.776c-1.355 0-2.454-1.14-2.454-2.546 0-1.405 1.1-2.546 2.454-2.546 1.355 0 2.454 1.14 2.454 2.546 0 1.405-1.1 2.546-2.454 2.546zm9.82 0c-1.354 0-2.454-1.14-2.454-2.546 0-1.405 1.1-2.546 2.454-2.546 1.354 0 2.454 1.14 2.454 2.546 0 1.405-1.1 2.546-2.454 2.546z"/></svg>
    </div>
  </div>
);

// --- Logic Hooks ---

const useTypewriter = (text: string, speed: number = 100, pause: number = 2000) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentLength = displayedText.length;

      if (!isDeleting && currentLength < text.length) {
        setDisplayedText(text.substring(0, currentLength + 1));
      } else if (!isDeleting && currentLength === text.length) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && currentLength > 0) {
        setDisplayedText(text.substring(0, currentLength - 1));
      } else if (isDeleting && currentLength === 0) {
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, speed, pause]);

  return displayedText;
};

// --- Main Component ---

export const Hero = () => {
  // Updated to match PDF Headline "intelligent Agentic architectures"
  const typedText = useTypewriter("Agentic AI", 150, 2000);
  const { loadScript, openPopup } = useCalendly();

  return (
    <section className="relative min-h-screen w-full overflow-hidden isolate px-6 md:px-12 bg-black">
      
      {/* 1. Background Layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          maskImage: 'radial-gradient(circle at 30% 50%, white 0px, white 800px, transparent 800px)',
          WebkitMaskImage: 'radial-gradient(circle at 75% 50%, white 0px, white 500px, transparent 400px)',
          pointerEvents: 'none',
        }}
       >
        <FlickeringGrid />
      </div>

      {/* 2. Noise Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Content Layer */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center mt-23 pb-12 md:pb-0">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
          
          {/* Left: Text Content & Actions */}
          <div className="md:col-span-7 pt-16">
            <Reveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl type-h1 text-white tracking-tight leading-[1.1] mb-10 font-fraunces">
                We Engineer Intelligent <br/>
                <span className='inline-block min-w-60 text-7xl text-transparent bg-clip-text py-3 bg-linear-to-r from-gray-300 to-gray-500'>
                  {typedText} 
                  <span className="animate-pulse text-white">|</span>
                </span>
                <span><br/>Architectures and Solutions <br/> for your Buisness Growth</span>
              </h1>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-6 text-gray-400 mb-10 max-w-[590px] leading-relaxed text-lg font-inter">
                <p>
                  At Parsemind we design, deploy, and scale production-ready agentic systems that automate workflows, integrate seamlessly, and operate securely at scale that deliver measurable business outcomes.
                </p>
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-4 font-inter">
                <button 
                  onMouseEnter={loadScript}
                  onClick={openPopup}
                  className="bg-white text-black font-medium px-8 py-3 hover:bg-black hover:text-white hover:scale-105 cursor-pointer transition-all duration-300"
                >
                  Book a Strategy Call
                </button>

                <a 
                  className="border-white border px-8 py-3 hover:bg-white hover:text-black hover:scale-105 cursor-pointer text-white transition-all duration-300"
                  href="/#process"
                >
                  How we Work
                </a>
              </div>
            </Reveal>

            {/* Trusted Partners Section - DESKTOP ONLY */}
            {/* hidden on mobile, block on medium+ screens */}
            {/*<div className="hidden md:block mt-14">
              <Reveal delay={0.6}>
                <TrustedPartnersContent />
              </Reveal>
            </div>*/}
          </div>

          {/* Right: Visual Animation */}
          <div className="md:col-span-5 w-full relative mt-12 md:mt-0">
            <EmaAnimation />
          </div>

          {/* Trusted Partners Section - MOBILE ONLY */}
          {/* block on mobile, hidden on medium+ screens. Placed at end of grid to render last. */}
          <div className="block md:hidden col-span-1 mt-12">
            <Reveal delay={0.6}>
              <TrustedPartnersContent />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
};