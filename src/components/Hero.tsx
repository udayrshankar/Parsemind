// src/components/Hero.tsx
import { Reveal } from './Reveal';
import { WavyBackground } from './WavyBackground';
import imageurl from '../assets/ChatGPT Image Dec 8, 2025, 08_22_52 PM.png'

export const Hero = () => {
  return (
    // 'isolate' keeps the canvas behind the text
    <section className="grid relative h-screen w-screen grid-cols-12 items-center overflow-hidden px-3 isolate">      
      {/* 1. The Interactive Wavy Background */}
      <WavyBackground />

      {/* 2. A noise texture overlay for a 'film' look (Optional but recommended) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* 3. Content Layer */}
      <div className="mx-auto relative z-10 pt-20 col-span-7">
        
        <div className="">
          {/* Small Tech Label */}
          
          {/* Headline - Using your .type-h1 class but overriding color to white */}
          <Reveal delay={0.1}>
            <h1 className="type-h1 mb-8 text-white tracking-tight ">
              We engineer intelligent <br />
              AI Agentic Architectures
            </h1>
          </Reveal>

          {/* Body Text - Using your .type-body-large */}
          <Reveal delay={0.2}>
            <p className="type-body-large text-gray-400 mb-12 max-w-xl leading-relaxed font-light">
              We do not just build bots. We construct fully managed, secure automation pipelines designed for enterprise scale.
            </p>
          </Reveal>

          {/* Sharp Buttons */}
          <Reveal delay={0.3}> 
            <div className="flex flex-wrap gap-6">
              <button className='bg-white px-8 hover:bg-black hover:scale-105 cursor-pointer hover:text-white transition-all duration-300'>
                Book a Call
              </button>
              
              <button className='border-white border-2 h-15 px-8 hover:bg-black hover:scale-105 hover:border-0 cursor-pointer text-white transition-all duration-300'>
                How we Work
              </button>
              
            </div>
          </Reveal>
        </div>

      </div>
      <img src={`${imageurl}`} alt="" className='h-150 z-10 col-span-4 translate-y-12'/>

      

    </section>
  );
};