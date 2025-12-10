// src/components/Process.tsx
import { useRef } from 'react';
import { Reveal } from './Reveal';

const steps = [
  {
    icon: <p>1</p>,
    title: "Discover",
    desc: "Analyze infrastructure efficiency gaps to identify high-impact opportunities."
  },
  {
    icon: <p>2</p>,
    title: "Develop",
    desc: "Our engineers build custom AI agents tailored to your specific workflows."
  },
  {
    icon: <p>3</p>,
    title: "Deploy",
    desc: "We launch your agents with secure access and continuous monitoring."
  }
];

export const Process = () => {
  const containerRef = useRef(null);

  return (
    <section id="process" className="w-7xl">
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        
        {/* --- Section Header --- */}
        <div className="text-center justify-center flex flex-col items-center mb-5">
          <Reveal>
            <span className="text-text-body uppercase mx-auto">
              Covers all of it
            </span>
            <h2 className="type-h2 text-black">
              From Concept to Deployment
            </h2>
          </Reveal>
        </div>

        {/* --- Steps Grid --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-7.5">
          
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 0.2}>
              {/* Added relative and overflow-hidden here */}
              <div className="h-50 shadow-card flex flex-col justify-center group bg-bg-card p-6 
                              hover:bg-black hover:text-white transition-colors duration-300 
                              relative overflow-hidden">
         
                <span className="absolute -bottom-12 -right-6 text-[12rem] font-bold leading-none 
                                 text-black opacity-5 
                                 group-hover:text-white group-hover:opacity-10 
                                 transition-colors duration-300 pointer-events-none select-none z-0">
                  {index + 1}
                </span>

                <div className="relative z-10 flex flex-col gap-4 h-90">
                  
                  <div className="flex gap-4 ml-4 items-center">
                    <h3 className="type-h3">{step.title}</h3>
                  </div>

                  <p className="type-body-main ml-4">
                    {step.desc}
                  </p>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};