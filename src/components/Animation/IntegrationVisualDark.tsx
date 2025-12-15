import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Database, 
  Cloud, 
  Slack,
  Github,
  Workflow,
  Radio
} from "lucide-react";

/* ------------------------------
   CONSTANTS & MATH
-------------------------------- */
const BASE_SIZE = 640;
const CENTER = BASE_SIZE / 2;
const RADIUS = 220; 
const CARD_WIDTH = 150;
const CARD_HEIGHT = 110;

// FIX: Explicitly typed as number array to satisfy Framer types
const EASE_SWISS: [number, number, number, number] = [0.25, 1, 0.5, 1];

const ITEMS = [
  { 
    id: "slack", 
    label: "MESSAGING", 
    subLabel: "Slack / Teams",
    angle: 315, 
    icon: Slack, 
    color: "#E01E5A" 
  },
  { 
    id: "db", 
    label: "KNOWLEDGE", 
    subLabel: "Postgres / Vector",
    angle: 45, 
    icon: Database, 
    color: "#336791" 
  },
  { 
    id: "crm", 
    label: "CRM SYNC", 
    subLabel: "Salesforce / Hubspot",
    angle: 135, 
    icon: Cloud, 
    color: "#00A1E0" 
  },
  { 
    id: "git", 
    label: "CI/CD", 
    subLabel: "Github Actions",
    angle: 225, 
    icon: Github, 
    color: "#FFFFFF" // White for Github in Dark Mode
  },
];

const toCartesian = (angle: number, r: number) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  };
};

/* ------------------------------
   SUB-COMPONENTS
-------------------------------- */

// 1. Dark Mode Data Beam
const DataBeam = ({ 
  angle, 
  isActive, 
  color 
}: { 
  angle: number; 
  isActive: boolean; 
  color: string 
}) => {
  const start = toCartesian(angle, 40); 
  const end = toCartesian(angle, RADIUS - 65); 

  return (
    <g>
      {/* Passive Base Line - Very subtle in dark mode */}
      <line
        x1={start.x} y1={start.y}
        x2={end.x} y2={end.y}
        stroke="#27272a" // zinc-800
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      
      {/* Active Pulse Line - Glowing */}
      <motion.line
        x1={start.x} y1={start.y}
        x2={end.x} y2={end.y}
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
            pathLength: isActive ? 1 : 0, 
            opacity: isActive ? 1 : 0 
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        strokeLinecap="round"
      />

      {/* Data Packet Particle */}
      {isActive && (
        <motion.circle
            r="3"
            fill={color}
            initial={{ cx: start.x, cy: start.y }}
            animate={{ 
                cx: [start.x, end.x],
                cy: [start.y, end.y],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 0.1
            }}
        />
      )}
    </g>
  );
};

// 2. Integration Node (Dark Glassmorphism)
const IntegrationCard = ({ 
    item, 
    isActive, 
    onHover 
}: { 
    item: typeof ITEMS[0]; 
    isActive: boolean;
    onHover: (id: string | null) => void;
}) => {
  const pos = toCartesian(item.angle, RADIUS);
  const Icon = item.icon;

  return (
    <motion.div
        className="absolute flex items-center justify-center cursor-pointer z-20"
        style={{
            left: pos.x - CARD_WIDTH / 2,
            top: pos.y - CARD_HEIGHT / 2,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
        }}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: EASE_SWISS }}
    >
        <motion.div
            className={`
                w-full h-full rounded-xl border flex flex-col items-center justify-center gap-2 p-3 text-center
                backdrop-blur-md transition-all duration-500
                ${isActive 
                    ? 'bg-zinc-900/80 shadow-2xl shadow-black/50' 
                    : 'bg-zinc-900/40 border-zinc-800 shadow-lg'
                }
            `}
            animate={{
                // Border lights up with brand color when active, else subtle zinc
                borderColor: isActive ? item.color : "rgba(39, 39, 42, 1)", 
                y: isActive ? -4 : 0
            }}
        >
            <div 
                className={`p-2.5 rounded-lg transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-500 bg-zinc-800/50'}`}
                style={{ backgroundColor: isActive ? item.color : undefined }}
            >
                <Icon size={20} strokeWidth={1.5} />
            </div>
            
            <div>
                <span className={`block text-[10px] font-bold tracking-widest uppercase ${isActive ? 'text-zinc-100' : 'text-zinc-500'}`}>
                    {item.label}
                </span>
                <span className="block text-[9px] text-zinc-600 font-medium mt-0.5">
                    {item.subLabel}
                </span>
            </div>

            {/* Live Indicator Dot */}
            <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-zinc-800'}`} />
        </motion.div>
    </motion.div>
  );
};

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
interface IntegrationVisualDarkProps {
  scale?: number;
}

export default function IntegrationVisualDark({ scale = 1 }: IntegrationVisualDarkProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [autoCycle, setAutoCycle] = useState(true);

  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
        setActiveId(prev => {
            const currentIndex = ITEMS.findIndex(i => i.id === prev);
            const nextIndex = (currentIndex + 1) % ITEMS.length;
            return ITEMS[nextIndex].id;
        });
    }, 2000); 
    return () => clearInterval(interval);
  }, [autoCycle]);

  const handleHover = (id: string | null) => {
    if (id) {
        setAutoCycle(false);
        setActiveId(id);
    } else {
        setAutoCycle(true);
    }
  };

  return (
    // 1. BOUNDING BOX: Reserves space based on scaled dimensions
    <div 
      style={{ 
        width: BASE_SIZE * scale, 
        height: BASE_SIZE * scale 
      }} 
      className="relative mx-auto"
    >
      {/* 2. SCALER WRAPPER: Transforms coordinates */}
      <div 
        style={{
            width: BASE_SIZE,
            height: BASE_SIZE,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
        }}
        className="relative flex items-center justify-center font-sans overflow-hidden"
      >
      
        {/* Background Grid - Dark Mode */}
        <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
                backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
                backgroundSize: "40px 40px"
            }}
        />

        {/* Connection Layer (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Outer Orbit Ring */}
            <circle 
                cx={CENTER} cy={CENTER} r={RADIUS} 
                fill="none" stroke="#27272a" strokeWidth="1" 
            />
            {ITEMS.map((item) => (
            <DataBeam 
                key={item.id}
                angle={item.angle} 
                isActive={activeId === item.id} 
                color={item.color}
            />
            ))}
        </svg>

        {/* Central Core (The Orchestrator) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <motion.div
                className="w-24 h-24 bg-zinc-950 rounded-full border border-zinc-800 shadow-2xl flex items-center justify-center relative overflow-hidden"
                animate={{ 
                    scale: activeId ? 1.05 : 1,
                    borderColor: activeId ? "rgba(255, 255, 255, 0.2)" : "rgba(39, 39, 42, 1)"
                }}
                transition={{ duration: 0.4, ease: EASE_SWISS }}
            >
                <div className="relative z-10 text-white">
                    <Workflow size={32} strokeWidth={1.5} />
                </div>
                
                {/* Core Pulse (Inner) */}
                <motion.div 
                    className="absolute inset-0 bg-indigo-500/20 blur-xl"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Ripple Ring (Outer) */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-indigo-500/10 rounded-full -z-10"
                animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            
            {/* Label */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full shadow-lg">
                    <Radio size={10} className="text-indigo-500 animate-pulse" />
                    <span className="text-[9px] font-bold tracking-widest text-zinc-400">
                        AI Agent
                    </span>
                </div>
            </div>
        </div>

        {/* Nodes */}
        {ITEMS.map((item) => (
            <IntegrationCard 
                key={item.id} 
                item={item} 
                isActive={activeId === item.id} 
                onHover={handleHover}
            />
        ))}

      </div>
    </div>
  );
}