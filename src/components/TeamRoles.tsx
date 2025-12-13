// src/components/TeamRoles.tsx
import { Reveal } from './Reveal';

const roles = [
   {
    title: "AI Business Consultants",
    description: "Bridging the gap between business strategy, operational reality, and AI execution."
  },
  {
    title: "AI/ML Engineers",
    description: "Experts in building and fine-tuning production-grade AI and agentic systems."
  },
  {
    title: "Data Scientists",
    description: "Turning raw, unstructured data into actionable and predictive insights."
  },
  {
    title: "AI Solution Architects",
    description: "Designing scalable, secure, and cloud-native AI architectures."
  },
  {
    title: "Subject Matter Experts",
    description: "Ensuring domain-aligned AI systems that integrate seamlessly into real workflows."
  },
  {
    title: "UI/UX Specialists",
    description: "Crafting intuitive interfaces for complex agentic and human-in-the-loop systems."
  }
];

export const TeamRoles = () => {
  return (
    <section className="px-6 bg-bg-main py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex flex-col text-center justify-center items-center mb-16">
          <Reveal>
            <span className="text-text-body uppercase tracking-wider">
              Not the ordinary
            </span>
            <h2 className="type-h2 text-text-main mt-2">
              What Sets Us Apart
            </h2>
          </Reveal>
        </div>

        {/* --- 6-Card Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div 
                className="group relative h-full bg-bg-card border border-gray-100 p-8 
                           hover:bg-black transition-all duration-500 ease-out 
                           hover:shadow-2xl cursor-default overflow-hidden"
              >
                
                {/* --- LARGE BACKGROUND NUMBER --- */}
                {/* Same style as Process section: 
                    - Absolute bottom-right 
                    - Massive text 
                    - Low opacity 
                    - Changes to white on hover 
                */}
                <span className="absolute -bottom-10 -right-4 text-[10rem] font-bold leading-none 
                                 text-black opacity-5 
                                 group-hover:text-white group-hover:opacity-10 
                                 transition-colors duration-500 pointer-events-none select-none z-0">
                  {index + 1}
                </span>

                <div className="relative z-10 flex flex-col items-start gap-4 h-full min-h-[180px]">
                  

                  <div>
                    {/* Title */}
                    <h3 className="type-h3 text-text-main mb-3 group-hover:text-white transition-colors duration-500 leading-tight">
                      {role.title}
                    </h3>

                    {/* Description */}
                    <p className="type-body-main text-[18px] text-gray-600 group-hover:text-gray-400 transition-colors duration-500">
                      {role.description}
                    </p>
                  </div>

                </div>

                {/* Optional: Subtle Gradient Glow on Hover */}
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};