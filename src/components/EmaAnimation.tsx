import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Box } from 'lucide-react';

// Imported Visuals
import AgentSystemVisual from './Animation/CustomAIDark';
import FastResultsDark from './Animation/FastResultsVisualDark';
import IntegrationVisualDark from './Animation/IntegrationVisualDark';
import EnterpriseTrustVisualDark from './Animation/EnterpriceTrustVisualDark';

/* ------------------------------------------------------------
   1. CONFIGURATION
------------------------------------------------------------ */
type Slide = {
  id: string;
  component: React.ReactNode;
  duration: number; // Time in ms before switching to the next slide
};

const COMPONENT_LIST: Slide[] = [
  { 
    id: 'agent-core', 
    component: <AgentSystemVisual scale={0.7} />, 
    duration: 8000 
  },
  { 
    id: 'fast-results', 
    component: <FastResultsDark scale={0.7} />, 
    duration: 3000 
  },
  { 
    id: 'integration', 
    component: <IntegrationVisualDark scale={0.7} />, 
    duration: 10000 
  },
  { 
    id: 'enterprise-trust', 
    component: <EnterpriseTrustVisualDark scale={0.7} />, 
    duration: 3000 
  },
];

/* ------------------------------------------------------------
   2. HELPER COMPONENTS
------------------------------------------------------------ */
const FloatingNode = ({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => (
  <motion.div
    className={`absolute z-0 bg-zinc-900/50 backdrop-blur-sm p-3 rounded-2xl border border-zinc-800 flex items-center justify-center ${className}`}
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
    transition={{
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay },
      opacity: { duration: 0.5, delay: delay }
    }}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------
   3. MAIN COMPONENT
------------------------------------------------------------ */
const EmaAnimation = () => {
  // Initialize with a random index using a lazy state function
  const [currentIndex, setCurrentIndex] = useState(() => 
    Math.floor(Math.random() * COMPONENT_LIST.length)
  );

  useEffect(() => {
    // Get the duration for the currently active slide
    const currentDuration = COMPONENT_LIST[currentIndex].duration;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % COMPONENT_LIST.length);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-[500px] h-[550px] mx-auto flex items-center justify-center font-sans text-zinc-300">
      
      {/* --- Ambient Background Nodes --- */}
      <FloatingNode className="top-[10%] left-[5%]" delay={0}>
        <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffaa00]" />
        </div>
        <span className="text-[10px] text-zinc-500 font-mono ml-2">DATA</span>
      </FloatingNode>

      <FloatingNode className="top-[15%] right-[0%]" delay={1.2}>
         <Layers className="text-zinc-600 w-6 h-6" strokeWidth={1.5} />
      </FloatingNode>

       <FloatingNode className="bottom-[15%] left-[5%]" delay={0.8}>
         <Box className="text-zinc-600 w-6 h-6" strokeWidth={1.5} />
      </FloatingNode>

      {/* --- Central Card Switcher --- */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <AnimatePresence mode='wait'>
            <motion.div
                key={COMPONENT_LIST[currentIndex].id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }} // Swiss Ease
                className="absolute flex items-center justify-center"
            >
                {COMPONENT_LIST[currentIndex].component}
            </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default EmaAnimation;