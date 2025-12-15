import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layers, 
  Box, 
  Hexagon, 
  Component, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

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
  duration: number; 
};

const COMPONENT_LIST: Slide[] = [
  { 
    id: 'agent-core', 
    component: <AgentSystemVisual scale={0.8} />, 
    duration: 8000 
  },
  { 
    id: 'fast-results', 
    component: <FastResultsDark scale={0.65} />, 
    duration: 4000 
  },
  { 
    id: 'integration', 
    component: <IntegrationVisualDark scale={0.6} />, 
    duration: 10000 
  },
  { 
    id: 'enterprise-trust', 
    component: <EnterpriseTrustVisualDark scale={0.55} />, 
    duration: 4000 
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
    // Reduced background opacity (zinc-900/50) and borders for subtler look
    className={`absolute z-20 bg-zinc-900/50 backdrop-blur-sm p-3 rounded-2xl border border-zinc-800/50 shadow-lg flex items-center justify-center ${className}`}
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ 
        opacity: 0.6, // Reduced visibility
        scale: 1, 
        y: [0, -12, 0], // Vertical float
        x: [0, 8, 0]    // Horizontal drift
    }}
    transition={{
      // Different durations for X and Y create an organic "wandering" path
      y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: delay },
      x: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: delay },
      opacity: { duration: 0.5, delay: delay }
    }}
  >
    {children}
  </motion.div>
);

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
    className={`absolute z-0 border border-zinc-800/60 flex items-center justify-center pointer-events-none ${className}`}
    initial={{ opacity: 0, y: 0 }}
    animate={{ 
        opacity: 0.4, 
        y: [0, -15, 0],
        rotate: [0, 5, 0] 
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle logic
  useEffect(() => {
    if (isPaused) return;

    const currentDuration = COMPONENT_LIST[currentIndex].duration;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % COMPONENT_LIST.length);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused]);

  // Manual Controls
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % COMPONENT_LIST.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + COMPONENT_LIST.length) % COMPONENT_LIST.length);
  };

  return (
    // Reduced height to 600px
    <div 
      className="relative w-full max-w-[700px] h-[600px] mx-auto flex items-center justify-center font-sans text-zinc-300 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      
      {/* --- LAYER 0: Background Atmosphere --- */}
      <GhostNode className="top-[5%] left-[10%] w-16 h-16 rounded-full border-dashed" delay={0.5}>
         <div className="w-2 h-2 rounded-full bg-zinc-800" />
      </GhostNode>
      <GhostNode className="bottom-[10%] right-[5%] w-24 h-24 border-0" delay={2}>
         <Hexagon className="w-full h-full text-zinc-800/50" strokeWidth={1} />
      </GhostNode>
      <GhostNode className="top-[15%] right-[5%] w-12 h-16 rounded-lg border-zinc-800" delay={1.5}>
         <div className="flex flex-col gap-2 opacity-20">
            <div className="w-6 h-1 bg-zinc-500 rounded-full" />
            <div className="w-4 h-1 bg-zinc-500 rounded-full" />
         </div>
      </GhostNode>
      <GhostNode className="bottom-[20%] left-[5%] border-0" delay={3}>
         <Component className="w-10 h-10 text-zinc-800/60" strokeWidth={1} />
      </GhostNode>

      {/* --- LAYER 1: Floating Decorations (Drifting) --- */}
      <FloatingNode className="top-[8%] left-[0%]" delay={0}>
        <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffaa00]" />
        </div>
        <span className="text-[10px] text-zinc-500 font-mono ml-2">DATA</span>
      </FloatingNode>

      <FloatingNode className="top-[12%] right-[-5%]" delay={1.2}>
         <Layers className="text-zinc-600 w-6 h-6" strokeWidth={1.5} />
      </FloatingNode>

       <FloatingNode className="bottom-[12%] left-[-5%]" delay={0.8}>
         <Box className="text-zinc-600 w-6 h-6" strokeWidth={1.5} />
      </FloatingNode>

      {/* --- LAYER 2: Central Card Switcher --- */}
      <div className="relative z-30 w-full h-full flex items-center justify-center pointer-events-none overflow-visible">
        <div className="pointer-events-auto flex items-center justify-center"> 
            <AnimatePresence mode='wait'>
                <motion.div
                    key={COMPONENT_LIST[currentIndex].id}
                    initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -30, scale: 0.9, filter: "blur(8px)" }}
                    transition={{ 
                        duration: 0.6, 
                        ease: [0.25, 1, 0.5, 1] 
                    }}
                    className="absolute flex items-center justify-center"
                >
                    {COMPONENT_LIST[currentIndex].component}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>

      {/* --- LAYER 3: Carousel Controls --- */}
      
      <button 
        onClick={handlePrev}
        className="absolute left-2 md:left-4 z-50 p-3 rounded-full 
                   bg-zinc-900/10 text-zinc-700 border border-zinc-800/10
                   hover:bg-zinc-800/50 hover:text-zinc-300 hover:border-zinc-700/50 
                   transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft size={24} strokeWidth={1.5} />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-2 md:right-4 z-50 p-3 rounded-full 
                   bg-zinc-900/10 text-zinc-700 border border-zinc-800/10
                   hover:bg-zinc-800/50 hover:text-zinc-300 hover:border-zinc-700/50 
                   transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight size={24} strokeWidth={1.5} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 z-40 flex gap-2">
        {COMPONENT_LIST.map((slide, idx) => (
            <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 
                    ${idx === currentIndex 
                        ? 'w-8 bg-indigo-500' 
                        : 'w-2 bg-zinc-800/50 hover:bg-zinc-700'
                    }`}
            />
        ))}
      </div>

    </div>
  );
};

export default EmaAnimation;