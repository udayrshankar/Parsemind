// src/components/Features.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import { Carousel } from './Carousel';
import f11 from '../assets/1 (5).png';
import f12 from '../assets/2.png';
import f13 from '../assets/3.png';
import f21 from '../assets/f21.png';
import f22 from '../assets/f22.png';
import f23 from '../assets/f23.png';
import f31 from '../assets/f31.png';
import f32 from '../assets/f32.png';
import f33 from '../assets/f33.png';
import f41 from '../assets/f41.png';
import f42 from '../assets/f42.png';
import f43 from '../assets/f43.png';


// --- Feature Data with 3 Images Each ---
const features = [
  {
    id: 0,
    title: 'Custom AI Agent Engineering',
    description:
      'We architect, deploy, and maintain AI systems tailored specifically to your business goals and infrastructure.',
    images: [
      // Tech/Engineering/Code
      f11,
      // AI Brain/Nodes
      f12,
      // Server/Infrastructure
      f13,
    ] as [string, string, string],
  },
  {
    id: 1,
    title: 'Achieve fast results',
    description:
      'Track ROI and efficiency gains with custom dashboards designed to visualize your AI impact in real-time.',
    images: [
      // Dashboard/Analytics
      f21,f22,f23
    ] as [string, string, string],
  },
  {
    id: 2,
    title: 'Integrate With Tools You Use',
    description:
      'Seamlessly connect our agents with your existing stack—Slack, Salesforce, HubSpot, and proprietary databases.',
    images: [
      f31,f32,f33
    ] as [string, string, string],
  },
  {
    id: 3,
    title: 'Trusted, Enterprise-Ready AI',
    description:
      'Deliver safe, reliable, and transparent generative AI that adheres to strict enterprise compliance standards.',
    images: [
      // Security/Lock
      f41,f42,f43
    ] as [string, string, string],
  },
];

export const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="px-4 md:px-6 py-16 md:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="text-center flex justify-center mb-8 md:mb-10">
          <Reveal>
            <span className="text-text-body uppercase mx-auto mb-1 block">
              Unique Features
            </span>
            <h2 className="type-h2 text-text-main">Our Key Features</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* --- Left Column: Interactive List --- */}
          <div className="flex flex-col gap-2">
            {features.map((feature, index) => {
              const isActive = activeIndex === index;

              return (
                <Reveal delay={feature.id * 0.1} key={feature.id}>
                  <div
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      relative p-6 md:p-8 cursor-pointer transition-all duration-500 ease-out border
                      ${
                        isActive
                          ? 'bg-blackZS border-black shadow-2xl scale-[1.02]'
                          : 'bg-bg-card border-transparent hover:bg-gray-50 hover:border-gray-100'
                      }
                    `}
                  >
                    {/* Active State Background (Optional fix for bg-blackZS typo if needed, assuming bg-black) */}
                    {isActive && <div className="absolute inset-0 bg-black -z-10" />}

                    <div className="flex gap-6 items-start relative z-10">
                      {/* Numbered Circle Indicator */}
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 font-inter font-medium
                          ${
                            isActive
                              ? 'border-white/20 text-black bg-white'
                              : 'border-border text-text-button bg-functional'
                          }
                        `}
                      >
                        {index + 1}
                      </div>

                      <div className="flex flex-col gap-3">
                        <h3
                          className={`
                            text-xl md:text-2xl font-semibold transition-colors duration-500
                            ${isActive ? 'text-white' : 'text-text-main'}
                          `}
                        >
                          {feature.title}
                        </h3>

                        <p
                          className={`
                            text-base md:text-lg leading-relaxed transition-colors duration-500
                            ${isActive ? 'text-gray-400' : 'text-gray-500'}
                          `}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* --- Right Column: Carousel Viewer --- */}
        <div className="hidden lg:block lg:sticky lg:top-32 lg:h-[730px] w-full overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: 'circOut' }}
                className="absolute inset-0 w-full h-full"
              >
              
                <Carousel 
                  images={features[activeIndex].images} 
                  interval={3500} 
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};