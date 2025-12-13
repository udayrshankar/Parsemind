// src/components/Hero.tsx
import { Reveal } from './Reveal';
import { WavyBackground } from './WavyBackground';
import DualNodeNetwork from './DualNodeNetwork';

export const Hero = () => {
  return (
    // Mobile: single column
    // md+: 12-column grid with content + visual
    <section className="relative min-h-screen w-full overflow-hidden isolate px-4 py-20">
      {/* 1. The Interactive Wavy Background */}
      <WavyBackground />

      {/* 2. Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Content Layer */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-12 md:items-center">
          {/* Left: Text content */}
          <div className="md:col-span-7 pt-10 md:pt-0">
            <Reveal delay={0.1}>
              <h1 className="type-h1 mb-6 text-white tracking-tight">
                We engineer intelligent <br />
                <span className='text-[#ffaa00]'>AI Agentic</span> Architectures
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="type-body-large text-gray-400 mb-10 max-w-xl leading-relaxed font-light">
                We do not just build bots. We construct fully managed, secure automation pipelines designed for enterprise scale.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white px-8 py-2 hover:bg-black hover:scale-105 cursor-pointer hover:text-white transition-all duration-300">
                  Book a Strategy Call
                </button>

                <a className="border-white border-2 px-8 py-2 hover:bg-black hover:scale-105 hover:border-0 cursor-pointer text-white transition-all duration-300"
                href= "/#process">
                  How we Work
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: DualNodeNetwork (desktop/tablet only) */}
          <div className="hidden md:block md:col-span-5">
            <DualNodeNetwork />
          </div>
        </div>
      </div>
    </section>
  );
};
