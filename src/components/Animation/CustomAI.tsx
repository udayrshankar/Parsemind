import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
// Import Lucide Icons for visual storytelling
import { 
  Database, 
  Globe, 
  Zap, 
  BrainCircuit, 
  HardDrive, 
  ListTodo, 
  Bot, 
  CheckCircle2,
  ArrowDown
} from "lucide-react";

/* ------------------------------
   CONSTANTS
-------------------------------- */
const CONTAINER_HEIGHT = 640;
const MAIN_WIDTH = 320; // Slightly wider for better readability
const MAIN_HEIGHT = 380;
const INPUT_HEIGHT = 48;
const OUTPUT_HEIGHT = 48;
const GAP = 48;

// Vertical Layout Calculations
const TOTAL_STACK = INPUT_HEIGHT + GAP + MAIN_HEIGHT + GAP + OUTPUT_HEIGHT;
const STACK_TOP = (CONTAINER_HEIGHT - TOTAL_STACK) / 2;

const TOP_Y = STACK_TOP;
const MAIN_Y = TOP_Y + INPUT_HEIGHT + GAP;
const BOTTOM_Y = MAIN_Y + MAIN_HEIGHT + GAP;

/* ------------------------------
   ANIMATION CONFIG
-------------------------------- */
const EASE_SWISS = [0.25, 1, 0.5, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: EASE_SWISS }
  },
};

/* ------------------------------
   COMPONENTS
-------------------------------- */

// 1. BACKGROUND GRID (The Swiss Foundation)


// 2. FLOWING DATA PARTICLES
const FlowLine = ({ startY, endY }: { startY: number; endY: number }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Base Line */}
        <line 
            x1="50%" y1={startY} 
            x2="50%" y2={endY} 
            stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" 
        />
        {/* Animated Particle */}
        <motion.circle
            r="3" fill="#2563eb"
            initial={{ cy: startY, cx: "50%", opacity: 0 }}
            animate={{ cy: endY, opacity: [0, 1, 1, 0] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0.5
            }}
        />
    </svg>
);

// 3. AGENT MODULE ROW
const AgentModule = ({ 
    icon: Icon, 
    label, 
    subLabel,
    isActive 
}: { 
    icon: any; 
    label: string; 
    subLabel: string;
    isActive: boolean;
}) => (
    <motion.div 
        className={`relative w-full  border px-4 py-3 flex items-center gap-4 transition-colors duration-500
            ${isActive ? 'bg-indigo-50/50 border-indigo-200' : 'bg-white border-neutral-100'}
        `}
    >
        {/* Active Indicator Bar */}
        <motion.div 
            className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-600 "
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
        />

        <div className={`p-2  ${isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-neutral-50 text-neutral-400'}`}>
            <Icon size={18} strokeWidth={1.5} />
        </div>
        
        <div className="flex flex-col">
            <span className={`text-xs font-bold tracking-wide uppercase ${isActive ? 'text-indigo-900' : 'text-neutral-900'}`}>
                {label}
            </span>
            <span className="text-[10px] text-neutral-500 font-medium">
                {subLabel}
            </span>
        </div>

        {/* Processing Spinner (Only when active) */}
        {isActive && (
            <motion.div 
                className="ml-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            </motion.div>
        )}
    </motion.div>
);

/* ------------------------------
   MAIN EXPORT
-------------------------------- */
export default function SwissAgentSystem() {
  const [activeStep, setActiveStep] = useState(0);

  // Cycle through the steps to simulate processing
  useEffect(() => {
    const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
    }, 2000); // Change step every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[640px] flex justify-center font-sans overflow-hidden ">
      

      {/* --- CONNECTORS --- */}
      <FlowLine startY={TOP_Y + INPUT_HEIGHT} endY={MAIN_Y} />
      <FlowLine startY={MAIN_Y + MAIN_HEIGHT} endY={BOTTOM_Y} />

      {/* --- 1. INPUTS (TOP) --- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{ top: TOP_Y, height: INPUT_HEIGHT }}
        className="absolute z-10 flex gap-3"
      >
        {/* We split inputs into distinct pills for clarity */}
        {[
            { label: "DATA", icon: Database },
            { label: "WEB", icon: Globe },
            { label: "EVENTS", icon: Zap }
        ].map((item, i) => (
             <div 
                key={item.label}
                className="bg-white border border-neutral-200 rounded-full px-4 flex items-center gap-2 shadow-sm text-xs font-semibold text-neutral-600 tracking-wide"
             >
                <item.icon size={12} className="text-neutral-400" />
                {item.label}
             </div>
        ))}
      </motion.div>


      {/* --- 2. THE AGENT (CENTER) --- */}
      <motion.div
        style={{ 
          top: MAIN_Y, 
          height: MAIN_HEIGHT,
          width: MAIN_WIDTH 
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_SWISS }}
        className="absolute z-20 bg-white/80 backdrop-blur-xl border border-neutral-200 p-1 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-900 flex items-center justify-center text-white">
                    <Bot size={18} />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-neutral-900 leading-tight">
                        AGENT CORE
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-medium tracking-wide uppercase">
                        Orchestration Layer
                    </p>
                </div>
            </div>
            <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-500" />
                <div className="w-2 h-2 bg-neutral-200" />
            </div>
        </div>

        {/* Modules Stack */}
        <div className="flex-1 p-4 flex flex-col gap-2 justify-center">
            <AgentModule 
                icon={ListTodo} 
                label="Planning" 
                subLabel="Decomposing user intent"
                isActive={activeStep === 0}
            />
            <AgentModule 
                icon={HardDrive} 
                label="Context Memory" 
                subLabel="Retrieving relevant vector data"
                isActive={activeStep === 1}
            />
            <AgentModule 
                icon={BrainCircuit} 
                label="Reasoning" 
                subLabel="LLM Chain-of-Thought analysis"
                isActive={activeStep === 2}
            />
             <AgentModule 
                icon={Zap} 
                label="Action" 
                subLabel="Executing external tools"
                isActive={activeStep === 3}
            />
        </div>
        
        {/* Footer decoration */}
        <div className="h-1 w-full bg-neutral-50 overflow-hidden flex">
             <motion.div 
                className="h-full bg-indigo-500" 
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             />
        </div>
      </motion.div>


      {/* --- 3. OUTPUT (BOTTOM) --- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{ top: BOTTOM_Y, height: OUTPUT_HEIGHT }}
        className="absolute z-10"
      >
         <div className="bg-neutral-900 text-white px-6 py-3 flex items-center gap-3 shadow-xl shadow-indigo-500/10">
            <div className="p-1 bg-white/10 ">
                <CheckCircle2 size={14} className="text-green-400" />
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wide">
                    EXECUTION COMPLETE
                </span>
            </div>
         </div>
      </motion.div>

    </div>
  );
}