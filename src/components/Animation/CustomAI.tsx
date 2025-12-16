import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Database, 
  Globe, 
  Zap, 
  BrainCircuit, 
  HardDrive, 
  ListTodo, 
  Bot, 
  CheckCircle2,
} from "lucide-react";

/* ------------------------------
   CONSTANTS & LAYOUT
-------------------------------- */
const CONTAINER_HEIGHT = 640;
const MAIN_WIDTH = 340; 
const MAIN_HEIGHT = 380;
const INPUT_HEIGHT = 48;
const OUTPUT_HEIGHT = 48;
const GAP = 48;

// Vertical Geometry
const TOTAL_STACK = INPUT_HEIGHT + GAP + MAIN_HEIGHT + GAP + OUTPUT_HEIGHT;
const STACK_TOP = (CONTAINER_HEIGHT - TOTAL_STACK) / 2;

const TOP_Y = STACK_TOP;
const MAIN_Y = TOP_Y + INPUT_HEIGHT + GAP;
const BOTTOM_Y = MAIN_Y + MAIN_HEIGHT + GAP;

// Horizontal Geometry for Inputs
const CENTER_X = "50%";
const LEFT_X = "30%";  // Adjust for spacing
const RIGHT_X = "70%"; // Adjust for spacing

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
   SUB-COMPONENTS
-------------------------------- */

// 1. Vertical Flow Line with Particle
const FlowLine = ({ 
  startX, 
  startY, 
  endX, 
  endY 
}: { 
  startX: string | number; 
  startY: number; 
  endX: string | number; 
  endY: number;
}) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Base Line */}
        <line 
            x1={startX} y1={startY} 
            x2={endX} y2={endY} 
            stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" 
        />
        {/* Animated Particle */}
        <motion.circle
            r="3" fill="#4f46e5" // Indigo-600
            initial={{ cy: startY, cx: startX, opacity: 0 }}
            animate={{ cy: endY, cx: endX, opacity: [0, 1, 1, 0] }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0.5
            }}
        />
    </svg>
);

// 2. Wifi Signal Transmission (Output)
const WifiTransmission = ({ startY, endY }: { startY: number; endY: number }) => {
  const distance = endY - startY;
  
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
       {/* Signal Waves */}
       {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 -translate-x-1/2 border-t-2 border-indigo-500 rounded-full"
            style={{ top: startY }}
            initial={{ 
              width: 10, 
              height: 10, 
              opacity: 0.6, 
              y: 0,
            }}
            animate={{ 
              width: 80,       // Expands width
              height: 50,      // Expands height (arc shape)
              opacity: 0,      // Fades out
              y: distance,     // Moves down
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.6, // Stagger the waves
            }}
          />
       ))}

       {/* Central Guide Line */}
       <div 
          className="absolute left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-indigo-200 to-transparent" 
          style={{ top: startY, height: distance }}
       />
    </div>
  );
};

// 3. Agent Module Row
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
        className={`relative w-full border px-4 py-3 flex items-center gap-4 transition-colors duration-500
            ${isActive ? 'bg-indigo-50/80 border-indigo-200' : 'bg-white border-neutral-100'}
        `}
    >
        {/* Active Indicator Bar */}
        <motion.div 
            className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-600"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
        />

        <div className={`p-2 rounded-sm transition-colors duration-300 ${isActive ? 'bg-indigo-100 text-indigo-600' : 'bg-neutral-50 text-neutral-400'}`}>
            <Icon size={18} strokeWidth={1.5} />
        </div>
        
        <div className="flex flex-col">
            <span className={`text-xs font-bold tracking-wide uppercase transition-colors duration-300 ${isActive ? 'text-indigo-900' : 'text-neutral-900'}`}>
                {label}
            </span>
            <span className="text-[10px] text-neutral-500 font-medium">
                {subLabel}
            </span>
        </div>

        {isActive && (
            <motion.div 
                className="ml-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            </motion.div>
        )}
    </motion.div>
);

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
export default function SwissAgentSystem() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[640px] flex justify-center font-sans overflow-hidden bg-white">
      
      {/* --- CONNECTIONS --- */}
      {/* 3 Parallel Flows for Inputs */}
      <FlowLine startX={LEFT_X} startY={TOP_Y + INPUT_HEIGHT} endX="50%" endY={MAIN_Y} />
      <FlowLine startX={CENTER_X} startY={TOP_Y + INPUT_HEIGHT} endX="50%" endY={MAIN_Y} />
      <FlowLine startX={RIGHT_X} startY={TOP_Y + INPUT_HEIGHT} endX="50%" endY={MAIN_Y} />
      
      {/* Wifi Signal Output */}
      <WifiTransmission startY={MAIN_Y + MAIN_HEIGHT} endY={BOTTOM_Y} />


      {/* --- 1. INPUTS (TOP) --- */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        style={{ top: TOP_Y, height: INPUT_HEIGHT, width: MAIN_WIDTH }}
        className="absolute z-10 flex justify-between px-2"
      >
        {/* DATA Input */}
        <div className="flex flex-col items-center gap-2">
            <div className="border border-neutral-200 px-3 py-2 flex items-center gap-2 shadow-sm text-xs font-semibold text-neutral-600 tracking-wide rounded-sm">
                <Database size={12} className="text-indigo-500" />
                DATA
            </div>
        </div>

        {/* WEB Input */}
        <div className="flex flex-col items-center gap-2">
             <div className="bg-white border border-neutral-200 px-3 py-2 flex items-center gap-2 shadow-sm text-xs font-semibold text-neutral-600 tracking-wide rounded-sm">
                <Globe size={12} className="text-indigo-500" />
                WEB
            </div>
        </div>

        {/* EVENTS Input */}
        <div className="flex flex-col items-center gap-2">
             <div className="bg-white border border-neutral-200 px-3 py-2 flex items-center gap-2 shadow-sm text-xs font-semibold text-neutral-600 tracking-wide rounded-sm">
                <Zap size={12} className="text-indigo-500" />
                EVENTS
            </div>
        </div>
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
        className="absolute z-20 bg-white/90 backdrop-blur-xl border border-neutral-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] flex flex-col"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-900 flex items-center justify-center text-white rounded-sm">
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
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
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
        <div className="h-1 w-full bg-neutral-100 overflow-hidden flex">
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
         <div className="bg-neutral-900 text-white px-6 py-3 flex items-center gap-3 shadow-xl shadow-indigo-500/20 rounded-sm">
            <div className="p-1 bg-white/10 rounded-full">
                <CheckCircle2 size={14} className="text-emerald-400" />
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