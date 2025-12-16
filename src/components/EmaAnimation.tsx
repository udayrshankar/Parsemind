// src/components/EmaAnimation.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
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
    component: <EnterpriseTrustVisualDark scale={0.9} />, 
    duration: 4000 
  },
];

// Pre-calculated random positions for background particles
const PARTICLES = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  top: `${Math.floor(Math.random() * 90)}%`,
  left: `${Math.floor(Math.random() * 90)}%`,
  size: Math.random() > 0.5 ? 4 : 8, 
  delay: Math.random() * 5,
  duration: 10 + Math.random() * 10,
  type: Math.random() > 0.7 ? 'square' : 'dot'
}));

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
    className={`absolute z-20 bg-zinc-900/80 backdrop-blur-md p-2.5 px-4 rounded-full border border-zinc-800/80 shadow-xl flex items-center justify-center ${className}`}
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -12, 0], 
        x: [0, 8, 0]    
    }}
    transition={{
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

  useEffect(() => {
    if (isPaused) return;
    const currentDuration = COMPONENT_LIST[currentIndex].duration;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % COMPONENT_LIST.length);
    }, currentDuration);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % COMPONENT_LIST.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + COMPONENT_LIST.length) % COMPONENT_LIST.length);

  return (
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

      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute pointer-events-none ${
            p.type === 'square' ? 'border border-zinc-800/40' : 'bg-zinc-800/40 rounded-full'
          }`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            y: [0, -30, 0],
            rotate: p.type === 'square' ? [0, 90, 180] : 0,
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* --- LAYER 1: Floating Status Chips --- */}
      
      {/* 1. DATA (Top Left) */}
      <FloatingNode className="top-[8%] left-[0%]" delay={0}>
        <div className="flex gap-1.5 items-center">
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                <div className="w-2 h-2 rounded-full bg-[#ffaa00]" /> {/* Orange */}
            </div>
            <span className="text-[10px] tracking-widest text-zinc-400 font-mono font-medium">DATA</span>
        </div>
      </FloatingNode>

      {/* 2. STACK (Top Right) */}
      <FloatingNode className="top-[12%] right-[-5%]" delay={1.2}>
         <div className="flex gap-1.5 items-center">
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]" /> {/* Blue */}
            </div>
            <span className="text-[10px] tracking-widest text-zinc-400 font-mono font-medium">STACK</span>
        </div>
      </FloatingNode>

       {/* 3. NODE (Bottom Left) */}
       <FloatingNode className="bottom-[12%] left-[-5%]" delay={0.8}>
         <div className="flex gap-1.5 items-center">
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                <div className="w-2 h-2 rounded-full bg-[#10b981]" /> {/* Green */}
            </div>
            <span className="text-[10px] tracking-widest text-zinc-400 font-mono font-medium">NODE</span>
        </div>
      </FloatingNode>

      {/* 4. SYNC (Bottom Right - New) */}
      <FloatingNode className="bottom-[25%] right-[-2%]" delay={2.5}>
         <div className="flex gap-1.5 items-center">
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-zinc-600" />
                <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" /> {/* Purple */}
            </div>
            <span className="text-[10px] tracking-widest text-zinc-400 font-mono font-medium">SYNC</span>
        </div>
      </FloatingNode>

      {/* --- LAYER 2: Central Card Switcher --- */}
      <div className="relative z-30 w-full h-full flex items-center justify-center pointer-events-none overflow-clip">
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
      
      {/* Left Arrow - Scale Animation Added */}
      <motion.button 
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }} // Pulse effect
        transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
        }}
        onClick={handlePrev}
        className="absolute left-2 md:left-4 z-50 p-3 rounded-full 
                   bg-zinc-900/10 text-zinc-700 border border-zinc-800/10
                   hover:bg-zinc-800/50 hover:text-zinc-300 hover:border-zinc-700/50 
                   transition-colors duration-300 backdrop-blur-sm cursor-pointer"
      >
        <ChevronLeft size={24} strokeWidth={1.5} />
      </motion.button>

      {/* Right Arrow - Scale Animation Added */}
      <motion.button 
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.15, 1] }} // Pulse effect
        transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 // Offset the pulse slightly from the left arrow
        }}
        onClick={handleNext}
        className="absolute right-2 md:right-4 z-50 p-3 rounded-full 
                   bg-zinc-900/10 text-zinc-700 border border-zinc-800/10
                   hover:bg-zinc-800/50 hover:text-zinc-300 hover:border-zinc-700/50 
                   transition-colors duration-300 backdrop-blur-sm cursor-pointer"
      >
        <ChevronRight size={24} strokeWidth={1.5} />
      </motion.button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 z-40 flex gap-2">
        {COMPONENT_LIST.map((slide, idx) => (
            <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 
                    ${idx === currentIndex 
                        ? 'w-8 bg-zinc-500' 
                        : 'w-2 bg-zinc-800/50 hover:bg-zinc-700'
                    }`}
            />
        ))}
      </div>

    </div>
  );
};

export default EmaAnimation;