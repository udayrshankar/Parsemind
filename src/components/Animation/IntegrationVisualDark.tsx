import { motion } from "framer-motion";
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
const SIZE = 640;
const CENTER = SIZE / 2;
const RADIUS = 220; 
const CARD_WIDTH = 150;
const CARD_HEIGHT = 110;

// The "Swiss" ease
const EASE_SWISS = { ease: [0.25, 1, 0.5, 1] as const };

const ITEMS = [
  { 
    id: "slack", 
    label: "MESSAGING", 
    subLabel: "Slack / Teams",
    angle: 315, 
    icon: Slack, 
    color: "#6366f1" // Indigo-500
  },
  { 
    id: "db", 
    label: "KNOWLEDGE", 
    subLabel: "Postgres / Vector",
    angle: 45, 
    icon: Database, 
    color: "#6366f1" 
  },
  { 
    id: "crm", 
    label: "CRM SYNC", 
    subLabel: "Salesforce / Hubspot",
    angle: 135, 
    icon: Cloud, 
    color: "#6366f1" 
  },
  { 
    id: "git", 
    label: "CI/CD", 
    subLabel: "Github Actions",
    angle: 225, 
    icon: Github, 
    color: "#6366f1" 
  },
];

// Helper: Convert Polar (angle, radius) to Cartesian (x, y)
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

// 1. The Data Beam (Radial Vector)
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
      {/* Passive Base Line - Dark Mode: Neutral-800 */}
      <line
        x1={start.x} y1={start.y}
        x2={end.x} y2={end.y}
        stroke="#262626" 
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      
      {/* Active Pulse Line */}
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

// 2. The Integration Node
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
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
    >
        <motion.div
            className={`
                w-full h-full border flex flex-col items-center justify-center gap-2 p-3 text-center
                backdrop-blur-md transition-all duration-500
                ${isActive 
                    ? 'bg-neutral-900/90 shadow-[0_0_30px_-5px_rgba(99,102,241,0.15)]' 
                    : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                }
            `}
            animate={{
                borderColor: isActive ? "rgba(99, 102, 241, 0.5)" : "rgba(38, 38, 38, 1)", 
                y: isActive ? -4 : 0
            }}
        >
            <div 
                className={`p-2.5 transition-colors duration-500 ${isActive ? 'text-indigo-400' : 'text-neutral-500 bg-neutral-800/50'}`}
                style={{ backgroundColor: isActive ? "rgba(99, 102, 241, 0.1)" : undefined }}
            >
                <Icon size={20} strokeWidth={1.5} />
            </div>
            
            <div>
                {/* Updated: text-[10px] -> text-xs (12px) */}
                <span className={`block text-xs font-bold tracking-widest uppercase ${isActive ? 'text-white' : 'text-neutral-500'}`}>
                    {item.label}
                </span>
                {/* Updated: text-[9px] -> text-[10px] */}
                <span className="block text-[10px] text-neutral-500 font-medium mt-0.5">
                    {item.subLabel}
                </span>
            </div>

            {/* Live Indicator */}
            <div className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-neutral-800'}`} />
        </motion.div>
    </motion.div>
  );
};

/* ------------------------------
   MAIN EXPORT
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
    // 1. Bounding Box (Scaled)
    <div 
        className="relative mx-auto overflow-hidden"
        style={{ 
            width: SIZE * scale, 
            height: SIZE * scale 
        }}
    >
      {/* 2. Scaler Container */}
      <div 
        className="relative flex items-center justify-center font-sans overflow-hidden"
        style={{ 
            width: SIZE, 
            height: SIZE,
            transform: `scale(${scale})`,
            transformOrigin: "top left"
        }}
      >
      
        {/* 1. Background Grid & Ambient Noise - Dark Mode */}
        <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
                backgroundImage: "linear-gradient(#404040 1px, transparent 1px), linear-gradient(90deg, #404040 1px, transparent 1px)",
                backgroundSize: "40px 40px"
            }}
        />

        {/* 2. Connection Layer (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <circle 
                cx={CENTER} cy={CENTER} r={RADIUS} 
                fill="none" stroke="#262626" strokeWidth="1" 
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

        {/* 3. The Orchestration Core (Agent) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-8 -translate-y-1/2 z-30">
            <motion.div
                // Dark Mode Core: Neutral-950, Border-Neutral-800
                className="w-24 h-24 bg-neutral-950 border-4 border-neutral-800 shadow-2xl flex items-center justify-center relative overflow-hidden"
                animate={{ scale: activeId ? 1.05 : 1 }}
                transition={EASE_SWISS}
            >
                <div className="relative z-10 text-white">
                    <Workflow size={32} strokeWidth={1.5} />
                </div>
                
                {/* Inner Processing Pulse */}
                <motion.div 
                    className="absolute inset-0 bg-indigo-500/20 blur-xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
            </motion.div>

            {/* Outer Ripple Ring */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-indigo-500/20 rounded-full -z-10"
                animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            
            {/* Core Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-neutral-900 border border-neutral-800 shadow-sm">
                    <Radio size={10} className="text-indigo-500 animate-pulse" />
                    {/* Updated: text-[9px] -> text-[10px] */}
                    <span className="text-md font-bold tracking-widest text-neutral-400">
                        AI Agent
                    </span>
                </div>
            </div>
        </div>

        {/* 4. Satellite Nodes */}
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