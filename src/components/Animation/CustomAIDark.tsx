import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Zap, 
  BrainCircuit, 
  HardDrive, 
  ListTodo, 
  Bot, 
  CheckCircle2,
  ArrowUpRight 
} from "lucide-react";
import { usePageTransition } from "../TransitionContext"; 

/* ------------------------------
   CONSTANTS & DIMENSIONS
-------------------------------- */
const BASE_WIDTH = 400; 
const BASE_HEIGHT = 640;

const MAIN_WIDTH = 320; 
const MAIN_HEIGHT = 380;
const INPUT_HEIGHT = 48;
const OUTPUT_HEIGHT = 48;
const GAP = 48;

// Vertical Layout Calculations
const TOTAL_STACK = INPUT_HEIGHT + GAP + MAIN_HEIGHT + GAP + OUTPUT_HEIGHT;
const STACK_TOP = (BASE_HEIGHT - TOTAL_STACK) / 2;

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
   SUB-COMPONENTS
-------------------------------- */

const FlowLine = ({ startY, endY }: { startY: number; endY: number }) => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <line 
            x1="50%" y1={startY} 
            x2="50%" y2={endY} 
            stroke="#262626" strokeWidth="1" strokeDasharray="4 4" 
        />
        <motion.circle
            r="3" fill="#6366f1"
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
        <motion.div 
            className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
        />

        <div className={`p-2 transition-colors duration-500 ${isActive ? 'text-indigo-400 bg-indigo-500/20' : 'text-neutral-500 bg-neutral-800/50'}`}>
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

        {isActive && (
            <motion.div 
                className="ml-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="w-2 h-2 bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
            </motion.div>
        )}
    </motion.div>
);

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
interface SwissAgentSystemProps {
    scale?: number;
}

export default function SwissAgentSystem({ scale = 1 }: SwissAgentSystemProps) {
  const [activeStep, setActiveStep] = useState(0);
  
  const { triggerTransition } = usePageTransition();

  useEffect(() => {
    const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
        onClick={() => triggerTransition("https://anseru.ai")}
        className="group relative mx-auto cursor-pointer overflow-hidden transition-all duration-500 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/20"
        style={{ 
            width: BASE_WIDTH * scale, 
            height: BASE_HEIGHT * scale 
        }}
    >
        {/* CTA OVERLAY */}
        <div className="absolute top-6 left-0 right-0 z-30 flex flex-col items-center justify-center pointer-events-none">
          {/* PULSING CONTAINER:
              - Changed div to motion.div
              - Added animate prop for scaling
          */}
          <motion.div 
            className="relative w-[260px] overflow-hidden p-[1px]"
            animate={{ scale: [1, 1.05, 1] }} // Pulse Effect
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }}
          >
            
            {/* LAYER 1: The Revolving Animation */}
            <motion.div
              className="absolute inset-[-100%]"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                background: "conic-gradient(from 90deg at 50% 50%, #E5E5E5 0%, #6366f1 50%, #E5E5E5 100%)",
              }}
            />

            {/* LAYER 2: The Content */}
            <div className="relative flex h-full w-full items-center justify-center gap-2 bg-white/95 px-4 py-2 backdrop-blur-md">
              <span className="text-xs font-medium text-neutral-500">
                <span className="font-bold text-indigo-600"> Anseru</span> - Our First AI{" "}
                <span className="font-bold text-indigo-600"> B2B SAAS</span>
              </span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUpRight size={14} className="text-indigo-500" />
              </motion.div>
            </div>
            
          </motion.div>
        </div>

        <div 
            style={{ 
                width: BASE_WIDTH,
                height: BASE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: 'top left', 
            }}
            className="relative font-sans"
        >
      
            <FlowLine startY={TOP_Y + INPUT_HEIGHT} endY={MAIN_Y} />
            <FlowLine startY={MAIN_Y + MAIN_HEIGHT} endY={BOTTOM_Y} />

            {/* --- CENTER AGENT --- */}
            <motion.div
                style={{ 
                    top: MAIN_Y, 
                    height: MAIN_HEIGHT,
                    width: MAIN_WIDTH,
                    left: "50%" 
                }}
                initial={{ y: 20, opacity: 0, x: "-50%" }}
                animate={{ y: 0, opacity: 1, x: "-50%" }}
                transition={{ duration: 0.8, ease: EASE_SWISS }}
                className="absolute z-20 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 shadow-[0_0_50px_-15px_rgba(0,0,0,0.5)] flex flex-col"
            >
                {/* Header */}
                <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-neutral-100 flex items-center justify-center text-neutral-950">
                            <Bot size={18} />
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-white leading-tight">
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

                {/* Modules */}
                <div className="flex-1 p-4 font-sans text-xs flex flex-col gap-2 justify-center">
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
                
                {/* Loading Bar */}
                <div className="h-1 w-full bg-neutral-800 overflow-hidden flex">
                     <motion.div 
                        className="h-full bg-indigo-500 shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]" 
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                     />
                </div>
            </motion.div>


            {/* --- BOTTOM OUTPUT --- */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                style={{ top: BOTTOM_Y, height: OUTPUT_HEIGHT }}
                className="absolute w-full z-10 flex justify-center"
            >
                <div className="bg-black text-white px-6 py-3 flex items-center gap-3 shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]">
                    <div className="p-1 bg-neutral-950/10">
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
    </motion.div>
  );
}