import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { 
  Database, 
  Globe, 
  Zap, 
  BrainCircuit, 
  HardDrive, 
  ListTodo, 
  Bot, 
  CheckCircle2
} from "lucide-react";

/* ------------------------------
   CONSTANTS
-------------------------------- */
const CONTAINER_HEIGHT = 640;
const CONTAINER_WIDTH = 400; // Defined width for scaling calculations
const MAIN_WIDTH = 320; 
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

// 1. FLOWING DATA PARTICLES (Dark Theme Adapted)
const FlowLine = ({ startY, endY }: { startY: number; endY: number }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Base Line - Darker gray for dark mode */}
        <line 
            x1="50%" y1={startY} 
            x2="50%" y2={endY} 
            stroke="#262626" strokeWidth="1" strokeDasharray="4 4" 
        />
        {/* Animated Particle - Bright cyan/white for visibility */}
        <motion.circle
            r="3" fill="#6366f1" // Indigo-500
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

// 2. AGENT MODULE ROW (Dark Theme Adapted)
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
        className={`relative w-full border px-4 py-3 flex items-center gap-4 transition-all duration-500
            ${isActive 
                ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_-3px_rgba(99,102,241,0.15)]' 
                : 'bg-neutral-900 border-neutral-800'
            }
        `}
    >
        {/* Active Indicator Bar */}
        <motion.div 
            className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
        />

        <div className={`p-2 rounded-md transition-colors duration-500 ${isActive ? 'text-indigo-400 bg-indigo-500/20' : 'text-neutral-500 bg-neutral-800/50'}`}>
            <Icon size={18} strokeWidth={1.5} />
        </div>
        
        <div className="flex flex-col">
            <span className={`text-xs font-bold tracking-wide uppercase transition-colors duration-500 ${isActive ? 'text-indigo-200' : 'text-neutral-300'}`}>
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
                <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
            </motion.div>
        )}
    </motion.div>
);

/* ------------------------------
   MAIN EXPORT
-------------------------------- */
interface SwissAgentSystemProps {
    scale?: number;
}

export default function SwissAgentSystem({ scale = 1 }: SwissAgentSystemProps) {
  const [activeStep, setActiveStep] = useState(0);

  // Cycle through the steps to simulate processing
  useEffect(() => {
    const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    // Outer container handles the DOM space based on scale
    <div 
        style={{ 
            width: CONTAINER_WIDTH * scale, 
            height: CONTAINER_HEIGHT * scale 
        }} 
        className="relative flex justify-center overflow-hidden bg-neutral-950 rounded-xl" // Dark background added here
    >
        {/* Inner container handles the Visual scaling using transform */}
        <div 
            style={{ 
                transform: `scale(${scale})`, 
                transformOrigin: 'top center',
                width: CONTAINER_WIDTH,
                height: CONTAINER_HEIGHT
            }}
            className="relative font-sans"
        >
      
            {/* --- BACKGROUND GRID (Subtle Dark Mode) --- */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
                style={{ 
                    backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
                    backgroundSize: '20px 20px' 
                }} 
            />

            {/* --- CONNECTORS --- */}
            <FlowLine startY={TOP_Y + INPUT_HEIGHT} endY={MAIN_Y} />
            <FlowLine startY={MAIN_Y + MAIN_HEIGHT} endY={BOTTOM_Y} />

            {/* --- 1. INPUTS (TOP) --- */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                style={{ top: TOP_Y, height: INPUT_HEIGHT }}
                className="absolute z-10 flex gap-3 w-full justify-center"
            >
                {[
                    { label: "DATA", icon: Database },
                    { label: "WEB", icon: Globe },
                    { label: "EVENTS", icon: Zap }
                ].map((item, i) => (
                     <div 
                        key={item.label}
                        className="bg-neutral-900 border border-neutral-800 rounded-full px-4 flex items-center gap-2 shadow-lg shadow-black/50 text-xs font-semibold text-neutral-400 tracking-wide"
                     >
                        <item.icon size={12} className="text-neutral-500" />
                        {item.label}
                     </div>
                ))}
            </motion.div>


            {/* --- 2. THE AGENT (CENTER) --- */}
            <motion.div
                style={{ 
                    top: MAIN_Y, 
                    height: MAIN_HEIGHT,
                    width: MAIN_WIDTH,
                    left: (CONTAINER_WIDTH - MAIN_WIDTH) / 2 // Centering manually since we are absolute
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: EASE_SWISS }}
                className="absolute z-20 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 shadow-[0_0_50px_-15px_rgba(0,0,0,0.5)] flex flex-col"
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-100 flex items-center justify-center text-neutral-950">
                            <Bot size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white leading-tight">
                                AGENT CORE
                            </h3>
                            <p className="text-[10px] text-neutral-500 font-medium tracking-wide uppercase">
                                Orchestration Layer
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-2 h-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <div className="w-2 h-2 bg-neutral-700" />
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
                <div className="h-1 w-full bg-neutral-800 overflow-hidden flex">
                     <motion.div 
                        className="h-full bg-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]" 
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
                className="absolute z-10 w-full flex justify-center"
            >
                <div className="bg-neutral-100 text-neutral-900 px-6 py-3 flex items-center gap-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]">
                    <div className="p-1 bg-neutral-950/10 rounded-full">
                        <CheckCircle2 size={14} className="text-emerald-600" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold tracking-wide">
                            EXECUTION COMPLETE
                        </span>
                    </div>
                </div>
            </motion.div>

        </div>
    </div>
  );
}