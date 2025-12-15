import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Database, 
  Cloud, 
  Slack,
  Github,
  Bot
} from "lucide-react";

/* ------------------------------
   CONSTANTS & MATH
-------------------------------- */
const SIZE = 700;
const CENTER = SIZE / 2;
const RADIUS = 240; 
const CARD_WIDTH = 160;
const CARD_HEIGHT = 80;

// The Signature Swiss Ease
const EASE_SWISS = [0.25, 1, 0.5, 1] as const;

const ITEMS = [
  { 
    id: "slack", 
    label: "MESSAGING", 
    subLabel: "Team Sync",
    angle: 315, 
    icon: Slack, 
    color: "#E01E5A" 
  },
  { 
    id: "db", 
    label: "KNOWLEDGE", 
    subLabel: "Vector Store",
    angle: 45, 
    icon: Database, 
    color: "#336791" 
  },
  { 
    id: "crm", 
    label: "COMMERCE", 
    subLabel: "Sales Pipeline",
    angle: 135, 
    icon: Cloud, 
    color: "#00A1E0" 
  },
  { 
    id: "git", 
    label: "DEPLOYMENT", 
    subLabel: "CI/CD Pipeline",
    angle: 225, 
    icon: Github, 
    color: "#171515" 
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

// 1. The Data Beam (Background Layer)
const DataBeam = ({ 
  angle, 
  isActive, 
  color 
}: { 
  angle: number; 
  isActive: boolean; 
  color: string 
}) => {
  const start = toCartesian(angle, 60); // Edge of Core
  const end = toCartesian(angle, RADIUS - 90); // Edge of Card

  return (
    <g>
      {/* Base Connector */}
      <line
        x1={start.x} y1={start.y}
        x2={end.x} y2={end.y}
        stroke="#E5E5E5"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      
      {/* Active Data Packet */}
      <motion.circle
        r="4"
        fill={color}
        initial={{ cx: start.x, cy: start.y, opacity: 0 }}
        animate={isActive ? { 
            cx: [start.x, end.x],
            cy: [start.y, end.y],
            opacity: [0, 1, 0]
        } : { opacity: 0 }}
        transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: EASE_SWISS,
            repeatDelay: 0.2
        }}
      />
    </g>
  );
};

// 2. The Integration Card (Satellite)
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
        className="absolute z-20"
        style={{
            left: pos.x - CARD_WIDTH / 2,
            top: pos.y - CARD_HEIGHT / 2,
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
        }}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: EASE_SWISS }}
    >
        <motion.div
            className={`
                w-full h-full bg-white border cursor-pointer relative overflow-hidden group
                transition-all duration-500 flex items-center px-4 gap-4
                ${isActive 
                    ? 'border-transparent shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)]' 
                    : 'border-neutral-200 shadow-[0_5px_15px_-5px_rgba(0,0,0,0.05)] hover:border-neutral-300'
                }
            `}
            // Dynamic border color via box-shadow to avoid layout shift
            style={{ 
                boxShadow: isActive ? `0 0 0 1px ${item.color}, 0 15px 40px -15px rgba(0,0,0,0.15)` : undefined 
            }}
        >
            {/* Icon Box */}
            <div 
                className={`w-10 h-10 flex items-center justify-center border transition-colors duration-500
                    ${isActive ? 'bg-white border-transparent' : 'bg-neutral-50 border-neutral-100'}
                `}
            >
                <Icon 
                    size={18} 
                    color={isActive ? item.color : "#737373"} 
                    strokeWidth={1.5}
                />
            </div>

            {/* Labels */}
            <div className="flex flex-col">
                <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                    {item.label}
                </span>
                <span className="text-[9px] text-neutral-400 font-medium uppercase tracking-wider">
                    {item.subLabel}
                </span>
            </div>

            {/* Status Dot */}
            <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full transition-all duration-500 ${isActive ? 'scale-100' : 'scale-0'}`}
                style={{ backgroundColor: item.color }}
            />
        </motion.div>
    </motion.div>
  );
};

/* ------------------------------
   MAIN EXPORT
-------------------------------- */
export default function IntegrationVisual() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [autoCycle, setAutoCycle] = useState(true);

  // Cycle logic
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

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center font-sans overflow-hidden bg-neutral-50/50">
      
      {/* 1. Background Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
             backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
             backgroundSize: "60px 60px"
        }}
      />

      {/* 2. Radial Connection Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <circle 
            cx={CENTER} cy={CENTER} r={RADIUS - 50} 
            fill="none" stroke="#E5E5E5" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
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

      {/* 3. The Orchestration Core (Center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <motion.div
            className="w-28 h-28 bg-white border border-neutral-200 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center relative z-20"
            animate={{ 
                borderColor: activeId ? "rgba(79, 70, 229, 0.4)" : "rgba(229, 229, 229, 1)"
            }}
            transition={{ duration: 0.5 }}
        >
            {/* Header Strip */}
            <div className="absolute top-0 inset-x-0 h-1 bg-neutral-100 flex justify-center overflow-hidden">
                <motion.div 
                    className="w-full h-full bg-indigo-500"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="w-10 h-10 bg-neutral-900 flex items-center justify-center text-white mb-2">
                <Bot size={20} strokeWidth={1.5} />
            </div>
            
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold tracking-widest text-neutral-900 uppercase">
                    Agent Core
                </span>
                <div className="flex items-center gap-1 mt-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[9px] font-medium text-neutral-400 uppercase tracking-wide">Online</span>
                </div>
            </div>
        </motion.div>

        {/* Pulse Effect Behind Core */}
        <motion.div
            className="absolute inset-0 bg-indigo-500/5 z-10"
            animate={{ scale: [1, 1.4], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
      </div>

      {/* 4. Satellite Nodes */}
      {ITEMS.map((item) => (
        <IntegrationCard 
            key={item.id} 
            item={item} 
            isActive={activeId === item.id} 
            onHover={(id) => {
                setAutoCycle(!id);
                if(id) setActiveId(id);
            }}
        />
      ))}

    </div>
  );
}