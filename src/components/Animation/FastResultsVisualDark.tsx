import { motion } from "framer-motion";
import { 
  Database, 
  BrainCircuit, 
  LineChart, 
  LayoutDashboard, 
  TrendingUp, 
  Timer,
  Zap,
} from "lucide-react";

/* ------------------------------
   CONSTANTS & CONFIG
-------------------------------- */
const BASE_WIDTH = 400; 
const BASE_HEIGHT = 800;

const CARD_WIDTH = 300;
const DASHBOARD_WIDTH = 340;
const DELAY_STEP = 0.4;

const EASE_SWISS = [0.25, 1, 0.5, 1] as const;

/* ------------------------------
   VISUAL ASSETS
-------------------------------- */
const FlowLine = () => (
    <div className="absolute inset-0 flex justify-center pointer-events-none z-0">
        <svg className="h-full w-px overflow-visible">
            <line 
                x1="0" y1="0" 
                x2="0" y2="100%" 
                stroke="#262626" strokeWidth="1" strokeDasharray="4 4" 
            />
            <motion.circle
                r="3" fill="#6366f1" 
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
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    className="relative z-10 bg-neutral-900 border border-neutral-800 p-4 flex items-center gap-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] w-full mb-8 group"
    style={{ maxWidth: CARD_WIDTH }}
  >
    {/* Left Connector Dot */}
    <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-neutral-900 border border-neutral-800 rounded-full z-20 flex items-center justify-center">
        <div className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-indigo-500 transition-colors" />
    </div>

    <div className="w-10 h-10 bg-neutral-800/50 border border-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-indigo-400 group-hover:bg-indigo-500/20 transition-colors duration-500">
      <Icon size={18} strokeWidth={1.5} />
    </div>

    <div className="flex flex-col">
      <span className="text-sm font-bold text-white uppercase">
        {label}
      </span>
      <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">
        {subLabel}
      </span>
    </div>

    {/* Right Connector Dot */}
    <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-neutral-900 border border-neutral-800 rounded-full z-20 flex items-center justify-center">
         <div className="w-1 h-1 bg-neutral-600 rounded-full group-hover:bg-indigo-500 transition-colors" />
    </div>
  </motion.div>
);

const RoiDashboard = ({ index }: { index: number }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="relative z-20 bg-neutral-900 border border-neutral-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
    style={{ width: DASHBOARD_WIDTH }}
  >
    {/* Top Center Connector Notch - Visual Anchor for Center Alignment */}
    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-neutral-900 border-t border-l border-neutral-800 rotate-45 z-30" />

    <div className="bg-black px-5 py-3 flex items-center justify-between border-b border-neutral-800 relative z-40">
      <div className="flex items-center gap-3">
        <div className="p-1 bg-neutral-800 rounded">
            <LayoutDashboard size={14} className="text-neutral-300" />
        </div>
        <div className="flex flex-col">
            <span className="text-xs font-bold text-white uppercase tracking-widest leading-none">
            ROI Dashboard
            </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wide">Active</span>
      </div>
    </div>

    <div className="p-6 grid grid-cols-2 gap-8 bg-neutral-900">
      
  {/* Metric A */}
  <div className="flex flex-col gap-2 items-center text-center">
    <div className="flex items-center justify-center gap-2">
      <TrendingUp size={14} className="text-neutral-500" />
      <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
        Efficiency
      </span>
    </div>
    <div>
        <span className="text-4xl font-bold text-white tracking-tighter block text-center">
        32%
        </span>
        <div className="flex items-center justify-center gap-1 mt-1 text-emerald-500">
            <span className="text-[10px] font-bold uppercase tracking-wide">+12.5% vs Last Mo</span>
        </div>
    </div>
  </div>

  {/* Metric B */}
  <div className="flex flex-col gap-2 relative items-center text-center">
    {/* Divider Line */}
    <div className="absolute -left-4 top-2 bottom-2 w-px bg-neutral-800" />
    
    <div className="flex items-center justify-center gap-2">
      <Timer size={14} className="text-neutral-500" />
      <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
        Workload
      </span>
    </div>
    <div>
        <span className="text-4xl font-bold text-white tracking-tighter block text-center">
        -41%
        </span>
         <div className="flex items-center justify-center gap-1 mt-1">
            <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wide block">
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
interface FastResultsVisualDarkProps {
    scale?: number;
}

export default function FastResultsVisualDark({ scale = 1 }: FastResultsVisualDarkProps) {
  return (
    <div 
        className="relative mx-auto overflow-hidden"
        style={{ 
            width: BASE_WIDTH * scale, 
            height: BASE_HEIGHT * scale 
        }}
    >
        <div 
            style={{ 
                width: BASE_WIDTH,
                height: BASE_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: 'top left', 
            }}
            // 'justify-center' aligns the whole stack vertically in the middle of the 800px
            // 'items-center' aligns the stack horizontally in the center
            className="relative font-sans flex flex-col items-center justify-center py-12"
        >
            <FlowLine />

            <div className="flex flex-col items-center justify-center w-full">
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

                {/* Increased margin (mt-8) to match the flow, ensuring it feels equally spaced and centered */}
                <div className="mt-8">
                    <RoiDashboard index={3} />
                </div>
            </div>
        </div>
    </div>
  );
}