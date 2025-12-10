// src/components/TrustCenter.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

// --- IMPORT YOUR IMAGES HERE ---
import discoverImage from '../assets/markus-spiske-jG8nlwLRZTM-unsplash.jpg';
import developImage from '../assets/nadine-e-VA9xSQekC8c-unsplash.jpg';
import deployImage from '../assets/premium_photo-1681488265680-dccd1c52d8a8.jpg';

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
};

type TabKey = 'discover' | 'develop' | 'deploy';

export const TrustCenter = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('discover');

  return (
    <section className="relative overflow-hidden px-4">
      <div className="max-w-7xl mx-auto">
        {/* --- Tab Navigation --- */}
        <div className="flex justify-center mb-[-26px] relative z-20">
          <div className="max-w-full overflow-x-auto">
            <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full inline-flex gap-1 border border-black shadow-xl">
              {(['discover', 'develop', 'deploy'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative px-5 py-2 md:px-8 md:py-3 rounded-full
                    text-sm md:text-base lg:text-lg font-medium
                    transition-all duration-300
                    ${activeTab === tab
                      ? 'text-white shadow-md'
                      : 'text-gray-500 hover:text-black hover:bg-gray-50'}
                  `}
                >
                  {/* Background Pill Animation */}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-black rounded-full"
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

        <div className="bg-card-gradient rounded-xl p-6 md:p-10 lg:p-16 shadow-card relative w-full z-10 min-h-[420px] md:min-h-[550px] overflow-hidden">
          <div className="absolute top-5 left-5 flex gap-2 z-20">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-black/5" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-black/5" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full"
            >
              {/* Left Column: Text Content */}
              <div className="flex flex-col justify-center mt-8 md:mt-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-fraunces text-text-main mb-6 md:mb-8 leading-tight">
                  {tabContent[activeTab].title}
                </h2>

                <ul className="space-y-5 md:space-y-6 mb-8 md:mb-10">
                  {tabContent[activeTab].bullets.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-1 w-6 h-6 rounded-full bg-black flex items-center justify-center shrink-0">
                        <Check size={14} className="text-white" />
                      </div>
                      <p className="text-base md:text-lg text-text-body font-inter leading-relaxed">
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
                  <button className="bg-black text-white px-7 py-3 md:px-8 md:py-4 rounded-full font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg">
                    {tabContent[activeTab].buttonText}
                  </button>
                </motion.div>
              </div>

              {/* Right Column: Mac Window with Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
                transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                className="w-full aspect-[4/3] rounded-xl relative overflow-hidden bg-gray-50 border border-black/5 shadow-inner mt-4 lg:mt-0"
              >
                <img
                  src={tabContent[activeTab].image}
                  alt={tabContent[activeTab].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
