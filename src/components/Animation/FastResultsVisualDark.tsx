import { motion } from "framer-motion";
import { 
  Database, 
  BrainCircuit, 
  LineChart, 
  LayoutDashboard, 
  ArrowDown, 
  TrendingUp, 
  Timer
} from "lucide-react";

/* ------------------------------
   CONSTANTS & CONFIG
-------------------------------- */
const BASE_WIDTH = 400;  // Fixed base width for calculation
const BASE_HEIGHT = 640; // Fixed base height for calculation

const CARD_WIDTH = 280;
const DASHBOARD_WIDTH = 340; 
const DELAY_STEP = 0.5; 

const EASE_SWISS = [0.25, 1, 0.5, 1] as const;

/* ------------------------------
   VARIANTS
-------------------------------- */
const itemVariants = {
  hidden: { 
    opacity: 0, 
    scale: 1.15, 
    y: 20,       
    filter: "blur(10px)"
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * DELAY_STEP,
      duration: 0.8,
      ease: EASE_SWISS
    }
  })
};

const arrowVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: (i: number) => ({
    opacity: 1, 
    height: "auto",
    transition: {
      delay: (i * DELAY_STEP) - 0.2, 
      duration: 0.4
    }
  })
};

/* ------------------------------
   SUB-COMPONENTS
-------------------------------- */

// 1. Standard Pipeline Step
const PipelineStep = ({ 
  icon: Icon, 
  label, 
  subLabel,
  index 
}: { 
  icon: any, 
  label: string, 
  subLabel: string, 
  index: number 
}) => (
  <motion.div
    custom={index}
    variants={itemVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className="relative z-10 bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 shadow-xl shadow-black/20 w-full"
    style={{ maxWidth: CARD_WIDTH }}
  >
    <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-400 border border-zinc-700/50">
      <Icon size={18} strokeWidth={1.5} />
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-bold text-zinc-100 tracking-wide uppercase">
        {label}
      </span>
      <span className="text-[10px] text-zinc-500 font-medium">
        {subLabel}
      </span>
    </div>
  </motion.div>
);

// 2. The Connecting Arrow
const Connector = ({ index }: { index: number }) => (
  <motion.div 
    custom={index}
    variants={arrowVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="flex justify-center py-2 text-zinc-600"
  >
    <ArrowDown size={16} strokeWidth={1.5} />
  </motion.div>
);

// 3. The Sophisticated Dashboard (Final Step)
const RoiDashboard = ({ index }: { index: number }) => (
  <motion.div
    custom={index}
    variants={itemVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="relative z-20 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
    style={{ width: DASHBOARD_WIDTH }}
  >
    {/* Dashboard Header */}
    <div className="bg-zinc-800/30 px-5 py-3 border-b border-zinc-800 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LayoutDashboard size={14} className="text-indigo-400" />
        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          Live ROI Dashboard
        </span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-zinc-700" />
        <div className="w-2 h-2 rounded-full bg-zinc-700" />
        <div className="w-2 h-2 rounded-full bg-zinc-700" />
      </div>
    </div>

    {/* Dashboard Body - The Metrics */}
    <div className="p-6 grid grid-cols-2 gap-6">
      
      {/* Metric A */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 mb-1">
          <TrendingUp size={12} className="text-zinc-500" />
          <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">
            Efficiency
          </span>
        </div>
        <span className="text-4xl font-bold text-white tracking-tighter">
          32%
        </span>
        <div className="flex items-center gap-1 text-[9px] font-medium text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full w-fit mt-1 border border-emerald-500/20">
          <span>+12.5%</span>
          <span className="text-emerald-400/60">vs last mo</span>
        </div>
      </div>

      {/* Metric B (Separator Line) */}
      <div className="flex flex-col gap-1 border-l border-zinc-800 pl-6">
        <div className="flex items-center gap-1.5 mb-1">
          <Timer size={12} className="text-zinc-500" />
          <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider">
            Manual Work
          </span>
        </div>
        <span className="text-4xl font-bold text-white tracking-tighter">
          -41%
        </span>
        <div className="flex items-center gap-1 text-[9px] font-medium text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-full w-fit mt-1 border border-indigo-500/20">
          <span>Saved 120hrs</span>
        </div>
      </div>

    </div>

    {/* Dashboard Footer / Graph Placeholder */}
    <div className="h-12 bg-zinc-800/20 border-t border-zinc-800 relative flex items-end px-6 pb-0 gap-1 overflow-hidden">
       {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
          <motion.div 
            key={i}
            className="flex-1 bg-indigo-500/30 rounded-t-sm"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            transition={{ delay: (i * 0.05), duration: 0.5 }}
          />
       ))}
    </div>
  </motion.div>
);

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
interface FastResultsDarkProps {
  scale?: number;
}

export default function FastResultsDark({ scale = 1 }: FastResultsDarkProps) {
  return (
    // Outer bounding box reserves the correct Scaled space in the layout
    <div 
        style={{ 
            width: BASE_WIDTH * scale, 
            height: BASE_HEIGHT * scale 
        }} 
        className="relative mx-auto"
    >
      {/* Scaler Wrapper: Transforms the internal coordinate system */}
      <div
        style={{
            width: BASE_WIDTH,
            height: BASE_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left'
        }}
        className="relative flex flex-col items-center justify-center font-sans overflow-hidden"
      >
        
        {/* Background decoration line */}
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="w-px h-full bg-linear-to-b from-transparent via-zinc-800 to-transparent" />
        </div>

        {/* 1. Raw Activity */}
        <PipelineStep 
          index={0}
          icon={Database}
          label="Raw Activity"
          subLabel="Ingesting unstructured events"
        />

        <Connector index={1} />

        {/* 2. Agent Decisions */}
        <PipelineStep 
          index={1}
          icon={BrainCircuit}
          label="Agent Decisions"
          subLabel="Chain-of-thought processing"
        />

        <Connector index={2} />

        {/* 3. Metrics Engine */}
        <PipelineStep 
          index={2}
          icon={LineChart}
          label="Metrics Engine"
          subLabel="Quantifying output quality"
        />

        <Connector index={3} />

        {/* 4. The Dashboard */}
        <RoiDashboard index={3} />

      </div>
    </div>
  );
}