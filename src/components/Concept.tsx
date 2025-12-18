// src/components/Concept.tsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal } from './Reveal';

// Images - Note: Ensure you have a 'scale' image or update the path
import discoverImage from '../assets/markus-spiske-jG8nlwLRZTM-unsplash.jpg';
import developImage from '../assets/nadine-e-VA9xSQekC8c-unsplash.jpg';
import deployImage from '../assets/premium_photo-1681488265680-dccd1c52d8a8.jpg';
import scaleImage from '../assets/premium_photo-1681488265680-dccd1c52d8a8.jpg'; // Placeholder or your fourth image

const steps = [
  {
    title: 'Discover',
    desc: 'Analyze infrastructure efficiency gaps to identify high-impact opportunities.',
    tableKey: 'discover',
  },
  {
    title: 'Develop',
    desc: 'Our engineers build custom AI agents tailored to your specific workflows.',
    tableKey: 'develop',
  },
  {
    title: 'Deploy',
    desc: 'We launch your agents with secure access and continuous monitoring.',
    tableKey: 'deploy',
  },
  {
    title: 'Scale',
    desc: 'Expand AI across your organization with unified governance and optimization.',
    tableKey: 'scale',
  },
];

const tabContent = {
  discover: {
    title: 'AI in Your Trust Center',
    bullets: [
      'Customers can download documents or get AI answers behind a 1-click NDA gate',
      'Connect your systems to automate granting access',
      'Get analytics on every interaction',
    ],
    buttonText: 'Learn about Trust Center',
    image: discoverImage,
  },
  develop: {
    title: 'Engineering Custom Agents',
    bullets: [
      'Architect bespoke AI models tailored to your specific business workflows',
      'Seamlessly integrate with your existing tech stack (AWS, Azure, GCP)',
      'Iterative development loops with real-time feedback',
    ],
    buttonText: 'View Engineering Process',
    image: developImage,
  },
  deploy: {
    title: 'Secure Global Launch',
    bullets: [
      'Enterprise-grade security with SOC2 and GDPR compliance built-in',
      'Auto-scaling infrastructure to handle millions of requests',
      '24/7 monitoring and automated maintenance pipelines',
    ],
    buttonText: 'Check Security Specs',
    image: deployImage,
  },
  scale: {
    title: 'Enterprise-Wide Growth',
    bullets: [
      'Multi-departmental orchestration for shared organizational intelligence',
      'Cost-optimization through advanced token management and caching',
      'Centralized governance and compliance across all AI agents',
    ],
    buttonText: 'Explore Scale Solutions',
    image: scaleImage,
  },
};

type TabKey = 'discover' | 'develop' | 'deploy' | 'scale';

export default function Concept() {
  const [activeTab, setActiveTab] = useState<TabKey>('discover');
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleInteraction = (key: string) => {
    setActiveTab(key as TabKey);
  };

  return (
    <div className="w-full flex flex-col items-center gap-16 md:gap-24 py-12 md:py-20 bg-white">
      
      {/* --- SECTION 1: Steps Grid --- */}
      <section id="process" className="w-full px-6 md:px-12">
        <div className="max-w-7xl mx-auto" ref={containerRef}>
          
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <Reveal>
              <span className="text-gray-500 uppercase tracking-[0.2em] mb-3 block text-xs font-bold font-inter">
                Covers all of it
              </span>
              <h2 className="text-4xl md:text-5xl font-fraunces font-medium text-black">
                From Concept to Deployment
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {steps.map((step, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div
                  className="
                    group relative
                    bg-bg-card border border-gray-100
                    p-8 md:px-10
                    hover:bg-black hover:text-white
                    transition-colors duration-500 ease-out
                    overflow-hidden
                    cursor-pointer
                    flex flex-col justify-between
                    h-[240px] md:h-[220px]
                  "
                  onMouseEnter={() => handleInteraction(step.tableKey)}
                  onClick={() => handleInteraction(step.tableKey)}
                >
                  {/* Big Number */}
                  <span
                    className="
                      absolute -bottom-8 -right-2
                      text-[8rem] md:text-[9rem]
                      font-bold leading-none
                      text-black opacity-[0.03]
                      group-hover:text-white group-hover:opacity-[0.1]
                      transition-all duration-500
                      pointer-events-none select-none z-0
                      font-inter
                    "
                  >
                    {index + 1}
                  </span>

                  <div className="relative z-10 flex flex-col gap-4">
                    <h3 className="text-2xl font-fraunces font-medium group-hover:text-white transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-base text-gray-500 leading-relaxed font-inter group-hover:text-gray-300 transition-colors">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: Tabbed Content --- */}
      <section className="w-full px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-[-26px] relative z-20">
            <div className="max-w-full overflow-x-auto pb-4 md:pb-0 px-2 no-scrollbar">
              <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full inline-flex gap-1 border border-gray-200 shadow-xl min-w-max">
                {(['discover', 'develop', 'deploy', 'scale'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                      relative px-6 py-2.5 md:px-8 md:py-3 rounded-full
                      text-sm md:text-base font-medium font-inter tracking-wide
                      transition-all duration-300
                      ${activeTab === tab
                        ? 'text-white'
                        : 'text-gray-500 hover:text-black hover:bg-gray-50'}
                    `}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 bg-black rounded-full shadow-md"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="bg-[#f7f8fa] border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl relative w-full z-10 min-h-[600px] md:min-h-[550px] flex flex-col justify-center overflow-hidden">
            
            <div className="absolute top-6 left-6 flex gap-2 z-20 opacity-50">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full pt-8 lg:pt-0"
              >
                
                <div className="flex flex-col justify-center order-2 lg:order-1">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-fraunces text-black mb-6 leading-[1.1]">
                    {tabContent[activeTab].title}
                  </h2>

                  <ul className="space-y-5 mb-8">
                    {tabContent[activeTab].bullets.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className="mt-1 w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </div>
                        <p className="text-base md:text-lg text-gray-600 font-inter leading-relaxed">
                          {item}
                        </p>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button className="bg-black text-white px-8 py-4 rounded-full font-medium font-inter hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg w-full md:w-auto">
                      {tabContent[activeTab].buttonText}
                    </button>
                  </motion.div>
                </div>

                <div className="order-1 lg:order-2 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                    className="relative w-full aspect-video md:aspect-4/3 rounded-xl overflow-hidden shadow-xl border border-black/5 bg-white group"
                  >
                     <img
                      src={tabContent[activeTab].image}
                      alt={tabContent[activeTab].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </motion.div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}