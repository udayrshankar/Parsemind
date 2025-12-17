import { motion } from "framer-motion";
import { 
  Database, 
  BrainCircuit, 
  LineChart, 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown,
  Timer,
  ChevronDown
} from "lucide-react";

/* ------------------------------
   CONSTANTS & CONFIG
-------------------------------- */
const CARD_WIDTH = 300;
const DASHBOARD_WIDTH = 340;
const DELAY_STEP = 0.4;

// The Signature Swiss Ease
const EASE_SWISS = [0.25, 1, 0.5, 1] as const;

/* ------------------------------
   VISUAL ASSETS
-------------------------------- */
// The animated data flow line (Background Layer)
const FlowLine = () => (
    <div className="absolute inset-0 flex justify-center pointer-events-none z-0">
        <svg className="h-full w-px overflow-visible">
            {/* Base Dashed Line */}
            <line 
                x1="0" y1="0" 
                x2="0" y2="100%" 
                stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" 
            />
            {/* Animated Particle */}
            <motion.circle
                r="3" fill="#4F46E5" // Indigo-600
                initial={{ cy: 0, opacity: 0 }}
                animate={{ cy: "100%", opacity: [0, 1, 1, 0] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 0.5
                }}
            />
        </svg>
    </div>
);

/* ------------------------------
   VARIANTS
-------------------------------- */
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    filter: "blur(8px)"
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * DELAY_STEP,
      duration: 0.8,
      ease: EASE_SWISS
    }
  })
};

/* ------------------------------
   SUB-COMPONENTS
-------------------------------- */

// 1. Swiss Pipeline Card
const PipelineStep = ({ 
  icon: Icon, 
  label, 
  subLabel,
  index,
  isLast = false
}: { 
  icon: any, 
  label: string, 
  subLabel: string, 
  index: number,
  isLast?: boolean
}) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className="relative z-10 w-full mb-8 flex flex-col items-center group"
    style={{ maxWidth: CARD_WIDTH }}
  >
    <div className="relative bg-white border border-neutral-200 p-4 flex items-center gap-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] w-full">
        {/* Connector Node (Left) */}
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-neutral-200 rounded-full z-20 flex items-center justify-center">
            {/* UPDATED: Made black and added animate-pulse */}
            <div className="w-1 h-1 bg-black rounded-full animate-pulse" />
        </div>

        {/* Icon Box */}
        <div className="w-12 h-12 bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors duration-500 shrink-0">
            <Icon size={20} strokeWidth={1.5} />
        </div>

        {/* Text Stack */}
        <div className="flex flex-col">
            <span className="text-sm font-bold text-neutral-900 tracking-wide uppercase">
                {label}
            </span>
            <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
                {subLabel}
            </span>
        </div>

        {/* Connector Node (Right) */}
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-neutral-200 rounded-full z-20 flex items-center justify-center">
             {/* UPDATED: Made black and added animate-pulse */}
            <div className="w-1 h-1 bg-black rounded-full animate-pulse" />
        </div>
    </div>

    {/* Chevron Arrow Flow Indicator */}
    <div className="absolute -bottom-7 text-neutral-300">
        <ChevronDown size={20} strokeWidth={2} />
    </div>
  </motion.div>
);


// 2. The Final Dashboard (Styled as a "Report")
const RoiDashboard = ({ index }: { index: number }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="relative z-20 bg-white border border-neutral-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col"
    style={{ width: DASHBOARD_WIDTH }}
  >
    {/* Header */}
    <div className="bg-neutral-900 px-5 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-1 bg-white/10 rounded">
            <LayoutDashboard size={14} className="text-white" />
        </div>
        <div className="flex flex-col">
            <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">
            ROI Dashboard
            </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[9px] text-green-500 font-bold uppercase tracking-wide">Active</span>
      </div>
    </div>

    {/* Metrics Grid */}
    <div className="p-6 grid grid-cols-2 gap-8 bg-white">
      
      {/* Metric A - GREEN */}
      <div className="flex flex-col gap-4 items-center text-center">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp size={14} className="text-neutral-400" />
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Efficiency
          </span>
        </div>
        <div>
            <span className="text-4xl font-bold text-green-600 tracking-tighter block text-center">
            32%
            </span>
            <div className="flex items-center justify-center gap-1.5 mt-2 text-green-600">
                <TrendingUp size={12} strokeWidth={3} />
                <span className="text-[10px] font-bold uppercase tracking-wide">12.5% vs Last Mo</span>
            </div>
        </div>
      </div>

      {/* Metric B - RED */}
      <div className="flex flex-col gap-4 relative items-center text-center">
        {/* Divider Line */}
        <div className="absolute -left-4 top-2 bottom-2 w-px bg-neutral-100" />
        
        <div className="flex items-center justify-center gap-2">
          <Timer size={14} className="text-neutral-400" />
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
            Workload
          </span>
        </div>
        <div>
            <span className="text-4xl font-bold text-red-600 tracking-tighter block text-center">
            41%
            </span>
             <div className="flex items-center justify-center gap-1.5 mt-2 text-indigo-700">
                <TrendingDown size={12} strokeWidth={3} />
                <span className="text-[10px] font-bold uppercase tracking-wide">
                    120hrs Saved
                </span>
            </div>
        </div>
      </div>

    </div>

      
  </motion.div>
);

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
export default function FastResultsVisual() {
  return (
    <div className="relative w-full h-[800px] flex flex-col items-center justify-center font-sans overflow-hidden py-12">
      
      {/* 0. Background Flow Line */}
      <FlowLine />

      {/* 1. Stacked Pipeline Steps */}
      <div className="flex flex-col items-center">
          <PipelineStep 
            index={0}
            icon={Database}
            label="Raw Activity"
            subLabel="Ingesting events"
          />

          <PipelineStep 
            index={1}
            icon={BrainCircuit}
            label="Agent Decisions"
            subLabel="Chain-of-thought"
          />

          <PipelineStep 
            index={2}
            icon={LineChart}
            label="Metrics Engine"
            subLabel="Quality Analysis"
          />

          {/* 2. The Dashboard Result */}
          <div className="mt-4">
             <RoiDashboard index={3} />
          </div>
      </div>

    </div>
  );
}