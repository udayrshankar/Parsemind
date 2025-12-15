import React from "react";
import { 
  motion, 
  type Variants, 
  type TargetAndTransition 
} from "framer-motion";
import { 
  Database, 
  BrainCircuit, 
  LineChart, 
  LayoutDashboard,
  ArrowDown,
  TrendingUp,
  ArrowRight
} from "lucide-react";

/* ------------------------------
   TYPES & CONFIG
-------------------------------- */
const EASE_SWISS = [0.25, 1, 0.5, 1] as const;

/* ------------------------------
   VARIANTS
-------------------------------- */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_SWISS },
  },
};

const float = (delay = 0): TargetAndTransition => ({
  y: [0, -4, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    delay,
    ease: "easeInOut",
  },
});

/* ------------------------------
   COMPONENTS
-------------------------------- */

const MetricItem = ({ 
    value, 
    label, 
    trend,
    delay 
}: { 
    value: string; 
    label: string; 
    trend?: string;
    delay: number;
}) => (
  <motion.div variants={itemVariants} className="flex flex-col group cursor-default">
    {/* Animated Number */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE_SWISS, delay }}
      className="relative"
    >
        <span className="text-7xl font-bold text-neutral-900 tracking-tighter leading-none">
            {value}
        </span>
        {/* Decorative Trend Badge */}
        {trend && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: delay + 0.5 }}
                className="absolute -top-4 -right-12 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1"
            >
                <TrendingUp size={12} />
                {trend}
            </motion.div>
        )}
    </motion.div>

    {/* Label */}
    <div className="flex items-center gap-3 mt-4">
        <div className="h-px w-8 bg-neutral-300" />
        <span className="text-xs font-bold text-neutral-500 tracking-[0.2em] uppercase">
            {label}
        </span>
    </div>
  </motion.div>
);


const PipelineCard = ({ 
  icon: Icon, 
  label, 
  sublabel, 
  isLast = false 
}: { 
  icon: any; 
  label: string; 
  sublabel?: string; 
  isLast?: boolean; 
}) => (
  <motion.div
    variants={itemVariants}
    className="relative z-10 flex justify-center w-full"
  >
    <motion.div
      animate={float(0.5)} 
      className={`
        relative w-[280px] flex items-center px-5 py-4 gap-4 rounded-xl transition-all duration-300 group
        ${isLast 
            ? 'bg-neutral-900 border border-neutral-900 shadow-xl shadow-neutral-900/20' 
            : 'bg-white border border-neutral-200 shadow-sm hover:border-indigo-200 hover:shadow-md'
        }
      `}
    >
      {/* Icon Box */}
      <div className={`
        p-2.5 rounded-lg flex items-center justify-center transition-colors
        ${isLast ? 'bg-indigo-600 text-white' : 'bg-neutral-100 text-neutral-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'}
      `}>
        <Icon size={isLast ? 20 : 18} strokeWidth={1.5} />
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <span className={`text-sm font-bold tracking-wide ${isLast ? 'text-white' : 'text-neutral-900'}`}>
          {label}
        </span>
        {sublabel && (
          <span className={`text-[10px] font-medium mt-0.5 ${isLast ? 'text-neutral-400' : 'text-neutral-500'}`}>
            {sublabel}
          </span>
        )}
      </div>

      {/* Active Pulse Dot (Only on hover/active) */}
      {!isLast && (
          <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.div>
  </motion.div>
);


/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
export default function SwissResultsVisual() {
  return (
    <div className="relative w-full h-[640px] overflow-hidden flex font-sans antialiased">
      
     

      <motion.div
        className="w-full h-full max-w-5xl mx-auto flex items-center justify-between px-16"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* LEFT: METRICS */}
        <div className="flex flex-col gap-16 z-10">
          <MetricItem 
            value="32%" 
            label="Efficiency Gain" 
            trend="MONTHLY"
            delay={0} 
          />
          <MetricItem 
            value="41%" 
            label="Manual Work" 
            trend="REDUCED"
            delay={0.2} 
          />
        </div>

        {/* CENTER: ARROW */}
        <div className="text-neutral-200">
            <ArrowRight size={48} strokeWidth={1} />
        </div>

        {/* RIGHT: PIPELINE */}
        <div className="relative flex flex-col items-center py-10 h-full justify-center">

          {/* Vertical Connecting Line */}
          <div className="absolute top-[15%] bottom-[15%] left-1/2 -translate-x-1/2 w-px bg-neutral-200">
              <motion.div 
                 className="absolute top-0 left-0 w-full bg-indigo-500 h-[20%]"
                 animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
          </div>

          <div className="flex flex-col gap-6 relative z-10">
            <PipelineCard 
              icon={Database} 
              label="Raw Activity" 
              sublabel="Ingest unstructured data" 
            />
            
            <div className="flex justify-center py-1">
                <ArrowDown size={14} className="text-neutral-300" />
            </div>

            <PipelineCard 
              icon={BrainCircuit} 
              label="Agent Decisions" 
              sublabel="AI reasoning & processing" 
            />

            <div className="flex justify-center py-1">
                <ArrowDown size={14} className="text-neutral-300" />
            </div>

            <PipelineCard 
              icon={LineChart} 
              label="Metrics Engine" 
              sublabel="Quantify outcomes" 
            />

            <div className="flex justify-center py-1">
                <ArrowDown size={14} className="text-neutral-300" />
            </div>

            <PipelineCard
              icon={LayoutDashboard}
              isLast={true}
              label="ROI Dashboard"
              sublabel="Real-time impact realization"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}