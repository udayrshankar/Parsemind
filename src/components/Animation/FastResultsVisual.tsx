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
const CARD_WIDTH = 280;
const DASHBOARD_WIDTH = 340; // Wider to accommodate metrics
const DELAY_STEP = 0.5; // Seconds between each step

// The "Swiss" ease: Sharp start, smooth end
const EASE_SWISS = [0.25, 1, 0.5, 1] as const;

/* ------------------------------
   VARIANTS
-------------------------------- */
const itemVariants = {
  hidden: { 
    opacity: 0, 
    scale: 1.15, // Start slightly larger
    y: 20,       // Start slightly lower
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
      delay: (i * DELAY_STEP) - 0.2, // Appear slightly before the next card
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
    className="relative z-10 bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-4 shadow-sm w-full"
    style={{ maxWidth: CARD_WIDTH }}
  >
    <div className="w-10 h-10 bg-neutral-50 rounded-lg flex items-center justify-center text-neutral-500 border border-neutral-100">
      <Icon size={18} strokeWidth={1.5} />
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-bold text-neutral-900 tracking-wide uppercase">
        {label}
      </span>
      <span className="text-[10px] text-neutral-500 font-medium">
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
    className="flex justify-center py-2 text-neutral-300"
  >
    <ArrowDown size={16} strokeWidth={1.5} color="blue"/>
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
    className="relative z-20 bg-white border border-neutral-200 rounded-xl shadow-2xl overflow-hidden"
    style={{ width: DASHBOARD_WIDTH }}
  >
    {/* Dashboard Header */}
    <div className="bg-neutral-50 px-5 py-3 border-b border-neutral-100 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LayoutDashboard size={14} className="text-indigo-600" />
        <span className="text-[10px] font-bold text-neutral-700 uppercase tracking-widest">
          Live ROI Dashboard
        </span>
      </div>
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-400/20 border border-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/20 border border-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400/20 border border-green-400" />
      </div>
    </div>

    {/* Dashboard Body - The Metrics */}
    <div className="p-6 grid grid-cols-2 gap-6 bg-white/50 backdrop-blur-sm">
      
      {/* Metric A */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 mb-1">
          <TrendingUp size={12} className="text-neutral-400" />
          <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider">
            Efficiency
          </span>
        </div>
        <span className="text-4xl font-bold text-neutral-900 tracking-tighter">
          32%
        </span>
        <div className="flex items-center gap-1 text-[9px] font-medium text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full w-fit mt-1">
          <span>+12.5%</span>
          <span>vs last mo</span>
        </div>
      </div>

      {/* Metric B (Separator Line) */}
      <div className="flex flex-col gap-1 border-l border-neutral-100 pl-6">
        <div className="flex items-center gap-1.5 mb-1">
          <Timer size={12} className="text-neutral-400" />
          <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider">
            Manual Work
          </span>
        </div>
        <span className="text-4xl font-bold text-neutral-900 tracking-tighter">
          -41%
        </span>
        <div className="flex items-center gap-1 text-[9px] font-medium text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-full w-fit mt-1">
          <span>Saved 120hrs</span>
        </div>
      </div>

    </div>

    {/* Dashboard Footer / Graph Placeholder */}
    <div className="h-12 bg-neutral-50/50 border-t border-neutral-100 relative flex items-end px-6 pb-0 gap-1 overflow-hidden">
       {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
          <motion.div 
            key={i}
            className="flex-1 bg-indigo-100 rounded-t-sm"
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            transition={{ delay: 1 + (i * 0.05), duration: 0.5 }}
          />
       ))}
    </div>
  </motion.div>
);

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
export default function FastResultsVisual() {
  return (
    <div className="relative w-full h-[640px] flex flex-col items-center justify-center font-sans overflow-hidden">
      
      {/* Background decoration line */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-px h-full bg-linear-to-b from-transparent via-neutral-200 to-transparent" />
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
  );
}