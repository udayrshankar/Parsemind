// src/components/Animation/IntegrationVisual.tsx
import { motion } from "framer-motion";
import { useState, useEffect, type ElementType } from "react";
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
const BASE_SIZE = 700; // The internal coordinate system size
const CENTER = BASE_SIZE / 2;
const RADIUS = 220; 
const CARD_WIDTH = 140;
const CARD_HEIGHT = 100;

// Light Mode Palette
const ACTIVE_COLOR = "#000000"; // Indigo-600 (Main Accent)
const RING_DOT_COLOR = "#0891b2"; // Cyan-600 (Data flow)
const INACTIVE_LINE_COLOR = "#969696"; // Neutral-200
const ACTIVE_LINE_COLOR = "#000000"; // Indigo-600

const EASE_SWISS = [0.25, 1, 0.5, 1] as const;

interface IntegrationItem {
  id: string;
  label: string;
  subLabel: string;
  angle: number;
  icon: ElementType; 
}

const ITEMS: IntegrationItem[] = [
  { 
    id: "slack", 
    label: "MESSAGING", 
    subLabel: "Slack / Teams",
    angle: 315, 
    icon: Slack, 
  },
  { 
    id: "db", 
    label: "KNOWLEDGE", 
    subLabel: "Postgres / Vector",
    angle: 45, 
    icon: Database, 
  },
  { 
    id: "crm", 
    label: "CRM SYNC", 
    subLabel: "Salesforce / Hubspot",
    angle: 135, 
    icon: Cloud, 
  },
  { 
    id: "git", 
    label: "CI/CD", 
    subLabel: "Github Actions",
    angle: 225, 
    icon: Github, 
  },
];

const toCartesian = (angle: number, r: number) => {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER + r * Math.sin(rad),
  };
};

const describeArc = (x1: number, y1: number, x2: number, y2: number, r: number) => {
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
};

/* ------------------------------
   SUB-COMPONENTS
-------------------------------- */

// 1. Radial Beam (Center <-> Node)
const RadialBeam = ({ 
  angle,
  isActive
}: { 
  angle: number;
  isActive: boolean;
}) => {
  const start = toCartesian(angle, 50); 
  const end = toCartesian(angle, RADIUS - 60); 

  return (
    <g>
      {/* Background Line */}
      <line
        x1={start.x} y1={start.y}
        x2={end.x} y2={end.y}
        stroke={INACTIVE_LINE_COLOR}
        strokeWidth="1"
      />

      {/* Active Connection Line */}
      <motion.line
        x1={start.x} y1={start.y}
        x2={end.x} y2={end.y}
        stroke={ACTIVE_LINE_COLOR}
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      
      {/* Active Data Dot */}
      <motion.circle
        r="3"
        fill={ACTIVE_COLOR}
        initial={{ opacity: 0 }}
        animate={{ 
            cx: isActive ? [start.x, end.x] : start.x,
            cy: isActive ? [start.y, end.y] : start.y,
            opacity: isActive ? [0, 1, 0] : 0
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            delay: 0.2
        }}
      />
    </g>
  );
};

// 2. Ring Beam (Node <-> Node)
const RingBeam = ({ 
  startAngle, 
  endAngle, 
}: { 
  startAngle: number; 
  endAngle: number; 
}) => {
  const start = toCartesian(startAngle, RADIUS);
  const end = toCartesian(endAngle, RADIUS);
  const pathData = describeArc(start.x, start.y, end.x, end.y, RADIUS);
  const dots = [0]; 

  return (
    <g>
      {/* Background Path */}
      <path d={pathData} fill="none" stroke={INACTIVE_LINE_COLOR} strokeWidth="1" strokeDasharray="4 4" />
      
      {/* Moving Dots */}
      {dots.map((i) => (
        <circle key={i} r="2" fill={RING_DOT_COLOR}>
          <animateMotion 
             dur="4s" 
             repeatCount="indefinite"
             path={pathData}
             begin={`-${i * 1.3}s`} 
             keyPoints="0;1"
             keyTimes="0;1"
          />
        </circle>
      ))}
    </g>
  );
};

// 3. The Integration Node (Card) - LIGHT THEME
const IntegrationCard = ({ 
    item, 
    isActive, 
    onHover 
}: { 
    item: IntegrationItem; 
    isActive: boolean;
    onHover: (id: string | null) => void;
}) => {
  const pos = toCartesian(item.angle, RADIUS);
  const Icon = item.icon;

  return (
    <motion.div
        className="absolute z-20"
        style={{
            left: pos.x,
            top: pos.y,
            x: "-50%",
            y: "-50%",
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
        }}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: EASE_SWISS }}
    >
        <motion.div
            // Light Mode Styles: bg-white, border-neutral-200
            className={`
                w-full h-full border flex flex-col items-center justify-center gap-2 p-3 text-center cursor-pointer
                backdrop-blur-md transition-all duration-500
                ${isActive 
                    ? 'bg-white border-black shadow-[0_10px_30px_-10px_rgba(79,70,229,0.2)]' 
                    : 'bg-white/80 border-neutral-100 shadow-sm hover:border-neutral-200'
                }
            `}
            animate={{ y: isActive ? -4 : 0 }}
        >
            <div 
                className={`p-2.5 transition-colors duration-500 rounded-sm ${isActive ? 'text-black bg-indigo-50' : 'text-neutral-400 bg-neutral-50'}`}
            >
                <Icon size={20} strokeWidth={1.5} />
            </div>
            
            <div>
                <span className={`block text-[10px] font-bold tracking-widest uppercase ${isActive ? 'text-neutral-900' : 'text-neutral-500'}`}>
                    {item.label}
                </span>
                <span className="block text-[9px] text-neutral-400 font-medium mt-0.5">
                    {item.subLabel}
                </span>
            </div>

            
        </motion.div>
    </motion.div>
  );
};

/* ------------------------------
   MAIN EXPORT
-------------------------------- */
export default function IntegrationVisual({ scale = 1 }: { scale?: number }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [autoCycle, setAutoCycle] = useState(true);

  // Cycle Logic
  useEffect(() => {
    if (!autoCycle) return;
    const interval = setInterval(() => {
        setActiveId(prev => {
            if (!prev) return ITEMS[0].id;
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
    // Outer Wrapper controls the Layout Size based on Scale
    <div 
      className="relative flex items-center justify-center font-sans overflow-visible"
      style={{ 
        width: BASE_SIZE * scale, 
        height: BASE_SIZE * scale 
      }}
    >
      
      {/* Inner Scaler applies the transform */}
      <div 
        className="relative flex-shrink-0 origin-top-left"
        style={{ 
            width: BASE_SIZE, 
            height: BASE_SIZE,
            transform: `scale(${scale})`,
            transformOrigin: "center center"
        }}
      >
        {/* 1. Connection Layer (SVG) */}
        <svg 
            width={BASE_SIZE} 
            height={BASE_SIZE} 
            viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
        >
          {/* Main Ring Guide (Light) */}
          <circle 
            cx={CENTER} cy={CENTER} r={RADIUS} 
            fill="none" stroke="#e5e5e5" strokeWidth="1" 
          />

          {ITEMS.map((item, i) => {
             const nextItem = ITEMS[(i + 1) % ITEMS.length];
             
             return (
               <g key={`conns-${item.id}`}>
                 <RadialBeam 
                    angle={item.angle} 
                    isActive={activeId === item.id}
                 />
                 
                 <RingBeam 
                    startAngle={item.angle}
                    endAngle={nextItem.angle}
                 />
               </g>
             );
          })}
        </svg>

        {/* 2. The Orchestration Core (Agent) - LIGHT THEME */}
        <div 
            className="absolute z-30"
            style={{ 
                left: CENTER, 
                top: CENTER,
                transform: "translate(-50%, -50%)"
            }}
        >
          <motion.div
            // bg-white, border-neutral-100
            className="w-24 h-24 bg-white border border-neutral-100 shadow-xl flex items-center justify-center relative overflow-hidden"
            animate={{ 
                scale: activeId ? 1.05 : 1,
                boxShadow: activeId 
                    ? "0 20px 40px -10px rgba(79, 70, 229, 0.15)" // Indigo Glow (Soft)
                    : "0 10px 20px -5px rgba(0,0,0,0.05)"
            }}
            transition={{ ease: EASE_SWISS }}
          >
            <div className="relative z-10 text-neutral-900">
                <Workflow size={36} strokeWidth={1.5} />
            </div>
            
            {/* Inner Processing Pulse */}
            <motion.div 
               className="absolute inset-0 bg-indigo-50/50 blur-xl"
               animate={{ opacity: [0.2, 0.6, 0.2] }}
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Core Label */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 shadow-sm">
                <Radio size={12} className="text-indigo-600 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-neutral-500">
                    AI ORCHESTRATOR
                </span>
            </div>
          </div>
        </div>

        {/* 3. Satellite Nodes */}
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