// src/components/Features.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';
import Lottie from 'lottie-react';

import animdata from '../assets/CustomAI.json';

// Placeholders for images - replace with your real imports
const feature2 =
  'https://images.unsplash.com/photo-1630091003936-aea522c1e8c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const feature1 =
  'https://images.unsplash.com/photo-1763972456511-fc3cf9bdca83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8';
const feature3 =
  'https://images.unsplash.com/photo-1764082497081-a023b72c9239?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D';
const feature4 =
  'https://images.unsplash.com/photo-1764893215559-9de481fca0f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMXx8fGVufDB8fHx8fA%3D%3D';

const features = [
  {
    id: 0,
    title: 'Custom AI Agent Engineering',
    description:
      'We architect, deploy, and maintain AI systems tailored specifically to your business goals and infrastructure.',
    image: feature1,
  },
  {
    id: 1,
    title: 'Achieve fast results',
    description:
      'Track ROI and efficiency gains with custom dashboards designed to visualize your AI impact in real-time.',
    image: feature2,
  },
  {
    id: 2,
    title: 'Integrate With Tools You Use',
    description:
      'Seamlessly connect our agents with your existing stack—Slack, Salesforce, HubSpot, and proprietary databases.',
    image: feature3,
  },
  {
    id: 3,
    title: 'Use trusted AI solutions',
    description:
      'Deliver safe, reliable, and transparent generative AI that adheres to strict enterprise compliance standards.',
    image: feature4,
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
                      ${isActive
                        ? 'bg-black border-black shadow-2xl scale-[1.02]'
                        : 'bg-bg-card border-transparent hover:bg-gray-50 hover:border-gray-100'}
                    `}
                  >
                    <div className="flex gap-6 items-start relative z-10">
                      {/* Numbered Circle Indicator */}
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 font-inter font-medium
                          border-border text-text-button bg-functional
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

          {/* --- Right Column: Sticky Image Viewer (Desktop only) --- */}
          <div className="hidden lg:block lg:sticky lg:top-32 lg:h-[725px] w-full overflow-hidden bg-bg-card border border-gray-100 shadow-lg relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: 'circOut' }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Lottie animationData={animdata}
                  loop= {false}
                  autoplay= {true}/>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Optional: Glossy overlay for depth */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
