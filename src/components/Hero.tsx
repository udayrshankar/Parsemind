// src/components/Hero.tsx
import { useState, useEffect } from 'react';
import { Reveal } from './Reveal';
import { SignalBackground } from './SignalBackground';
import EmaAnimation from './EmaAnimation';

// --- Custom Hook for Typewriter Effect (No external dependency needed) ---
const useTypewriter = (text: string, speed: number = 100, pause: number = 2000) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentLength = displayedText.length;

      // Typing phase
      if (!isDeleting && currentLength < text.length) {
        setDisplayedText(text.substring(0, currentLength + 1));
      }
      // Pause then delete
      else if (!isDeleting && currentLength === text.length) {
        setTimeout(() => setIsDeleting(true), pause);
      }
      // Deleting phase
      else if (isDeleting && currentLength > 0) {
        setDisplayedText(text.substring(0, currentLength - 1));
      }
      // Switch back to typing
      else if (isDeleting && currentLength === 0) {
        setIsDeleting(false);
      }
    };

    const timer = setTimeout(
      handleTyping,
      isDeleting ? speed / 2 : speed // Delete faster than type
    );

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, speed, pause]);

  return displayedText;
};

export const Hero = () => {
  const typedText = useTypewriter("AI Agentic", 150, 2000);


  return (
    <section className="relative min-h-screen w-full overflow-hidden isolate px-4 py-20 bg-black">
      
      <SignalBackground />

      {/* 2. Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Content Layer */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center mt-25">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
          
          {/* Left: Text content */}
          <div className="md:col-span-7 pt-16 md:pt-0">
            <Reveal delay={0.1}>
              {/* H1 Main Headline - Font: Fraunces */}
              <h1 
                className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4"
                style={{ fontFamily: '"Fraunces", serif' }}
              >
                We engineer intelligent <br />
                <span className='text-[#ffaa00] inline-block min-w-[280px]'>
                  {typedText}
                  <span className="animate-pulse text-white">|</span>
                </span>
                
                <span className='ml-1'>Architectures</span>
              </h1>
            </Reveal>

            {/* H2 Supporting Subheading - Font: Fraunces */}
         

            {/* Body Copy - Font: Inter */}
            <Reveal delay={0.3}>
              <div 
                className="space-y-6 text-gray-400 mb-10 max-w-xl leading-relaxed text-lg"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                <p>
                  We don’t just build AI bots or prototypes. 
                  <span className="text-gray-200 font-medium"> ParseMind</span> designs and deploys fully managed, secure agentic AI systems that operate reliably across enterprise environments.
                </p>
                
                
              </div>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={0.4}>
              <div className="flex flex-wrap gap-4" style={{ fontFamily: '"Inter", sans-serif' }}>
                <button className="bg-white text-black font-medium px-8 py-3 hover:bg-black hover:text-white hover:scale-105 cursor-pointer transition-all duration-300 ">
                  Book a Strategy Call
                </button>

                <a 
                  className="border-white border px-8 py-3 hover:bg-white hover:text-black hover:scale-105 cursor-pointer text-white transition-all duration-300 "
                  href="/#process"
                >
                  How we Work
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: DualNodeNetwork (Visual) */}
          <div className="hidden md:block md:col-span-5 w-full relative">
             {/* Added height/width wrapper to ensure the network has space to render */}
            <EmaAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}; 