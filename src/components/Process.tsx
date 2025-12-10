// src/components/Process.tsx
import { useRef } from 'react';
import { Reveal } from './Reveal';

const steps = [
  {
    title: 'Discover',
    desc: 'Analyze infrastructure efficiency gaps to identify high-impact opportunities.',
  },
  {
    title: 'Develop',
    desc: 'Our engineers build custom AI agents tailored to your specific workflows.',
  },
  {
    title: 'Deploy',
    desc: 'We launch your agents with secure access and continuous monitoring through out.',
  },
];

export const Process = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <section
      id="process"
      className="w-full px-4"
    >
      <div
        className="max-w-7xl mx-auto"
        ref={containerRef}
      >
        {/* --- Section Header --- */}
        <div className="text-center flex flex-col items-center mb-10">
          <Reveal>
            <span className="text-text-body uppercase tracking-[0.2em] mb-2">
              Covers all of it
            </span>
            <h2 className="type-h2 text-black">
              From Concept to Deployment
            </h2>
          </Reveal>
        </div>

        {/* --- Steps Grid --- */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7.5 items-stretch">
          {steps.map((step, index) => (
            <Reveal key={index} delay={index * 0.15}>
              <div
                className="
                  group
                  shadow-card
                  bg-bg-card
                  p-6 md:p-7
                  hover:bg-black hover:text-white
                  transition-colors duration-300
                  relative overflow-hidden
                  flex flex-col justify-center
                  h-full
                "
              >
                {/* Big background number */}
                <span
                  className="
                    absolute -bottom-10 -right-4
                    text-[6rem] md:text-[8rem] lg:text-[10rem]
                    font-bold leading-none
                    text-black opacity-5
                    group-hover:text-white group-hover:opacity-10
                    transition-colors duration-300
                    pointer-events-none select-none z-0
                  "
                >
                  {index + 1}
                </span>

                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <h3 className="type-h3">
                      {step.title}
                    </h3>
                  </div>

                  <p
                    className="
                      type-body-main
                      text-text-body/80
                      group-hover:text-white
                      transition-colors duration-300
                    "
                  >
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
