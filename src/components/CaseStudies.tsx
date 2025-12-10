// src/components/CaseStudies.tsx
import { Reveal } from './Reveal';

const imageUrl = "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export const CaseStudies = () => {
  return (
    <section className="px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex text-center justify-center mb-5">
          <Reveal>
            <span className="text-text-body uppercase">
              Real Results
            </span>
            <h2 className="type-h2 text-text-main">
              Our Case Studies
            </h2>
          </Reveal>
        </div>

        {/* --- Featured Case Study Card --- */}
        <Reveal>
          <div className="w-full overflow-hidden relative">
            
            {/* Background Gradient (Matches the reference image) */}
            <div className="absolute inset-0 bg-card-gradient z-0" />
            
            <div className="relative z-10 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              <div>
                <h3 className="type-h2 text-text-main mb-6">
                  Harmonizing Complex Disparate Data Made Simple
                </h3>
                
                <p className="type-h2 text-[25px] mb-10">
                  Discover how this organic food company used AI operations to transform scrappy early systems into scalable growth engines, breaking through critical barriers every fast-growing CPG faces.
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div>
                    <div className="type-h2 text-text-main mb-2">16%</div>
                    <p className="type-h2 text-[25px]">Reduction in vendor payment inconsistencies</p>
                  </div>
                  <div>
                    <div className="type-h2 text-text-main mb-2">50%</div>
                    <p className="type-h2 text-[25px]">Reduction in operational Cost</p>
                  </div>
                </div>

                {/* Author Footer */}
                <div className="border-t border-gray-300 pt-6">
                  <p className="type-body-main">Sarah Jenkins</p>
                  <p className="type-body-main text-sm">CTO, FinScale</p>
                </div>
              </div>

              {/* Right Column: Visual / Placeholder for Chart */}
              <div className="hidden lg:flex justify-end relative">
                 {/* This represents the abstract "calendar/data" visual in your PDF */}
                 <div className="relative w-full max-w-md aspect-square">
                    {/* Decorative Elements simulating the data visualization */}
                    <img 
                      src={imageUrl} 
                      alt="Case Study Visual" 
                      className="w-full h-full object-cover shadow-xl border border-white"
                    />
                 </div>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};