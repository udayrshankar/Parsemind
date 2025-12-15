import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Box, Hexagon, Component } from 'lucide-react';

// Imported Visuals (Assuming these exist based on previous context)
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
  duration: number; 
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

// Primary Floating Node (Foreground, Glassmorphism)
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
    className={`absolute z-20 bg-zinc-900/80 backdrop-blur-md p-3 rounded-2xl border border-zinc-700 shadow-xl flex items-center justify-center ${className}`}
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

// Secondary "Ghost" Node (Background, Outlines only)
const GhostNode = ({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
}) => (
  <motion.div
    // Lower z-index, transparent bg, barely visible border
    className={`absolute z-0 border border-zinc-800/60 flex items-center justify-center pointer-events-none ${className}`}
    initial={{ opacity: 0, y: 0 }}
    animate={{ 
        opacity: 0.4, // Keep opacity low naturally
        y: [0, -15, 0], // Slower, deeper float for parallax effect
        rotate: [0, 5, 0] // Subtle rotation
    }} 
    transition={{
      y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: delay },
      rotate: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: delay },
      opacity: { duration: 1, delay: delay }
    }}
  >
    {children}
  </motion.div>
);

/* ------------------------------------------------------------
   3. MAIN COMPONENT
------------------------------------------------------------ */
const EmaAnimation = () => {
  const [currentIndex, setCurrentIndex] = useState(() => 
    Math.floor(Math.random() * COMPONENT_LIST.length)
  );

  useEffect(() => {
    const currentDuration = COMPONENT_LIST[currentIndex].duration;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % COMPONENT_LIST.length);
    }, currentDuration);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-[500px] h-[550px] mx-auto flex items-center justify-center font-sans text-zinc-300">
      
      {/* --- LAYER 0: Ghost Nodes (Background Decoration) --- */}
      
      {/* Ghost 1: Dashed Circle */}
      <GhostNode className="top-[5%] left-[20%] w-16 h-16 rounded-full border-dashed" delay={0.5}>
         <div className="w-2 h-2 rounded-full bg-zinc-800" />
      </GhostNode>

      {/* Ghost 2: Large Hexagon Outline */}
      <GhostNode className="bottom-[10%] right-[10%] w-24 h-24 border-0" delay={2}>
         <Hexagon className="w-full h-full text-zinc-800/50" strokeWidth={1} />
      </GhostNode>

      {/* Ghost 3: Schematic Rectangle */}
      <GhostNode className="top-[20%] right-[5%] w-12 h-16 rounded-lg border-zinc-800" delay={1.5}>
         <div className="flex flex-col gap-2 opacity-20">
            <div className="w-6 h-1 bg-zinc-500 rounded-full" />
            <div className="w-4 h-1 bg-zinc-500 rounded-full" />
         </div>
      </GhostNode>

      {/* Ghost 4: Tiny Geometric Cluster */}
      <GhostNode className="bottom-[25%] left-[8%] border-0" delay={3}>
         <Component className="w-10 h-10 text-zinc-800/60" strokeWidth={1} />
      </GhostNode>


      {/* --- LAYER 1: Ambient Primary Nodes --- */}
      
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


      {/* --- LAYER 2: Central Card Switcher --- */}
      <div className="relative z-30 w-full h-full flex items-center justify-center">
        <AnimatePresence mode='wait'>
            <motion.div
                key={COMPONENT_LIST[currentIndex].id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
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