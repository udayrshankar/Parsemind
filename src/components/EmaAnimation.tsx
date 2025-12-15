import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Box, Search, Code, Rocket } from 'lucide-react';
import AgentSystemVisual from './Animation/CustomAIDark';

// --- Configuration ---

// All steps now use the "ParseMind Orange" (#ffaa00)
// using Tailwind's arbitrary value syntax: text-[#ffaa00]
const STEPS = [
  {
    id: 'discover',
    label: 'Discover',
    title: 'Problem Discovery',
    description: 'We analyze your current workflow bottlenecks.',
    subtext: 'Identifying friction points...',
    icon: Search,
  },
  {
    id: 'develop',
    label: 'Develop',
    title: 'Solution Architecture',
    description: 'Building custom agents to automate tasks.',
    subtext: 'Writing robust integration code...',
    icon: Code,
  },
  {
    id: 'deploy',
    label: 'Deploy',
    title: 'Live Deployment',
    description: 'Seamless integration into your ecosystem.',
    subtext: 'Monitoring real-time performance...',
    icon: Rocket,
  }
];

// --- Sub-Components ---

const FloatingNode = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
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
};

// --- Main Component ---

const EmaAnimation = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % STEPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeStep = STEPS[activeStepIndex];

  return (
    // Container
    <div className="relative w-full max-w-[500px] h-[450px] mx-auto flex items-center justify-center font-sans text-zinc-300">
      
      {/* --- Background Nodes (Floating Ambiently) --- */}
      {/* Note: Lines removed as requested. Nodes now act as ambient 'satellites' */}
      
      {/* Top Left: Data Source */}
      <FloatingNode className="top-[15%] left-[5%]" delay={0}>
        <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            {/* Updated to Brand Orange */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffaa00]" />
        </div>
        <span className="text-[10px] text-zinc-500 font-mono ml-2">DATA</span>
      </FloatingNode>

      {/* Top Right: Logic */}
      <FloatingNode className="top-[20%] right-[0%]" delay={1.2}>
         <Layers className="text-zinc-600 w-6 h-6" strokeWidth={1.5} />
      </FloatingNode>

       {/* Bottom Left: Asset */}
       <FloatingNode className="bottom-[10%] left-[5%]" delay={0.8}>
         <Box className="text-zinc-600 w-6 h-6" strokeWidth={1.5} />
      </FloatingNode>


      {/* --- Central Card --- */}
      <div className="relative z-10 w-full max-w-[360px] h-[260px] -translate-y-10">
        <AnimatePresence mode='wait'>
            <AgentSystemVisual scale={0.7}/>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default EmaAnimation;