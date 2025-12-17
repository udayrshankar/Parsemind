// src/components/CaseStudies.tsx
import { Reveal } from './Reveal';

const imageUrl = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const CaseStudies = () => {
  return (
    <section className="px-4 md:px-6 bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex text-center justify-center mb-10 md:mb-16">
          <Reveal>
            <span className="text-gray-500 uppercase tracking-[0.2em] text-xs font-bold font-inter mb-3 block">
              Real Results
            </span>
            <h2 className="text-4xl md:text-5xl font-fraunces font-medium text-text-main">
              Our Case Studies
            </h2>
          </Reveal>
        </div>

        {/* --- Featured Case Study Card --- */}
        <Reveal>
          <div className="w-full overflow-hidden relative border border-gray-100 shadow-xl bg-[#f7f8fa]">
            
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-card-gradient z-0 opacity-50" />
            
            <div className="relative z-10 p-6 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              
              {/* Left Column: Text Content (Order 2 on Mobile) */}
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-fraunces font-medium text-text-main mb-4 md:mb-6 leading-[1.15]">
                  Harmonizing Complex Disparate Data Made Simple
                </h3>
                
                <p className="text-lg md:text-xl text-gray-600 font-inter leading-relaxed mb-8 md:mb-10">
                  Discover how this organic food company used AI operations to transform scrappy early systems into scalable growth engines, breaking through critical barriers every fast-growing CPG faces.
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-6 md:gap-10 mb-8 md:mb-12 border-t border-gray-200/60 pt-8">
                  <div>
                    <div className="text-4xl md:text-5xl font-fraunces font-medium text-text-main mb-2">16%</div>
                    <p className="text-sm md:text-base text-gray-500 font-inter leading-snug">
                      Reduction in vendor payment inconsistencies
                    </p>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-fraunces font-medium text-text-main mb-2">50%</div>
                    <p className="text-sm md:text-base text-gray-500 font-inter leading-snug">
                      Reduction in operational Cost
                    </p>
                  </div>
                </div>

                {/* Author Footer */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" /> {/* Placeholder avatar if needed */}
                  <div>
                    <p className="font-inter font-bold text-sm text-text-main">Sarah Jenkins</p>
                    <p className="font-inter text-xs font-medium text-gray-500 uppercase tracking-wide">CTO, FinScale</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual (Order 1 on Mobile) */}
              <div className="order-1 lg:order-2 w-full flex justify-center lg:justify-end">
                 <div className="relative w-full aspect-video lg:aspect-square max-w-lg overflow-hidden shadow-2xl border border-white/50 group">
                    <img 
                      src={imageUrl} 
                      alt="Case Study Visual" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Gloss Overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-black/10 to-transparent pointer-events-none" />
                 </div>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};