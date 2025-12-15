import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
// 1. Import Lucide Icons
import { 
  Database, 
  Terminal, 
  Cloud, 
  Sparkles, 
  MessageSquare,
  Slack 
} from "lucide-react";

/* ------------------------------
   CONSTANTS
-------------------------------- */
const SIZE = 640;
const CENTER = SIZE / 2;
const RADIUS = 200; 
const CARD_SIZE = 100;

const TRANSITION = { 
  duration: 0.4, 
  ease: [0.25, 1, 0.5, 1] as const 
};

/* ------------------------------
   MATH UTILS
-------------------------------- */
const polarToCartesian = (angleDeg: number, radius: number) => {
  const angleRad = (angleDeg - 90) * (Math.PI / 180);
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  };
};

/* ------------------------------
   DATA MAPPING
-------------------------------- */
const ITEMS = [
  { 
    id: "slack", 
    label: "SLACK", 
    angle: 0, 
    // Lucide Icon Component
    icon: Slack, 
    status: "LISTENING" 
  },
  { 
    id: "db", 
    label: "DATABASE", 
    angle: 90, 
    icon: Database, 
    status: "INDEXING" 
  },
  { 
    id: "tools", 
    label: "INTERNAL TOOLS", 
    angle: 180, 
    icon: Terminal, 
    status: "EXECUTING" 
  },
  { 
    id: "crm", 
    label: "CRM SYNC", 
    angle: 270, 
    icon: Cloud, 
    status: "UPDATING" 
  },
];

/* ------------------------------
   CONNECTION COMPONENT
-------------------------------- */
const Connection = ({ 
    angle, 
    isActive 
}: { 
    angle: number; 
    isActive: boolean; 
}) => {
  const end = polarToCartesian(angle, RADIUS - CARD_SIZE / 2 - 10);
  
  return (
    <g>
      <line
        x1={CENTER}
        y1={CENTER}
        x2={end.x}
        y2={end.y}
        stroke="#E5E5E5"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <motion.line
        x1={CENTER}
        y1={CENTER}
        x2={end.x}
        y2={end.y}
        stroke="#2563eb"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isActive ? 1 : 0 }}
        transition={TRANSITION}
        strokeLinecap="round"
      />
      <motion.circle
        r="3"
        fill={isActive ? "#2563eb" : "#a3a3a3"}
        animate={isActive ? {
            cx: [CENTER, end.x],
            cy: [CENTER, end.y],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
        } : {
            cx: [CENTER, end.x],
            cy: [CENTER, end.y],
            opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: isActive ? 1 : 3,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random()
        }}
      />
    </g>
  );
};

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
export default function SwissIntegrationsLucide() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[640px] bg-white flex items-center justify-center font-sans overflow-hidden">
 

      {/* 2. SVG LAYER */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <circle 
            cx={CENTER} 
            cy={CENTER} 
            r={RADIUS} 
            fill="none" 
            stroke="#f5f5f5" 
            strokeWidth="1" 
        />
        {ITEMS.map((item) => (
          <Connection 
            key={item.id} 
            angle={item.angle} 
            isActive={activeId === item.id} 
          />
        ))}
      </svg>

      {/* 3. CENTER CORE (AI AGENT) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
            className="w-32 h-32 bg-neutral-900 rounded-full border-4 border-white shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
            animate={{
                scale: activeId ? 1.05 : 1,
            }}
            transition={TRANSITION}
        >
            <motion.div 
               className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-neutral-900 to-neutral-900"
               animate={{ opacity: activeId ? 0.8 : 0.4 }}
            />

            <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="text-white mb-1">
                     {/* Lucide Sparkles for AI */}
                     <Sparkles size={24} strokeWidth={1.5} />
                </div>
                
                <div className="flex flex-col items-center h-6">
                    <AnimatePresence mode="wait">
                        {activeId ? (
                             <motion.div
                                key="active"
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -5, opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-[9px] font-bold tracking-widest text-indigo-300 uppercase">
                                    {ITEMS.find(i => i.id === activeId)?.status}
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ y: 5, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -5, opacity: 0 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                                    AI AGENT
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
      </div>

      {/* 4. SATELLITE CARDS */}
      {ITEMS.map((item, i) => {
        const pos = polarToCartesian(item.angle, RADIUS);
        const isActive = activeId === item.id;
        const isDimmed = activeId && !isActive;
        const Icon = item.icon; // Get the Lucide component

        return (
          <motion.div
            key={item.id}
            className="absolute flex items-center justify-center cursor-pointer"
            style={{
                top: 0, left: 0,
                width: CARD_SIZE, height: CARD_SIZE,
                x: pos.x - CARD_SIZE / 2,
                y: pos.y - CARD_SIZE / 2,
            }}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
            animate={{
                opacity: isDimmed ? 0.5 : 1,
                scale: isActive ? 1.1 : 1,
            }}
            transition={TRANSITION}
          >
            <motion.div 
                className="w-full h-full bg-white rounded-2xl border border-neutral-100 flex flex-col items-center justify-center gap-3 relative overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                animate={{
                    borderColor: isActive ? "rgba(37, 99, 235, 1)" : "rgba(229, 229, 229, 1)"
                }}
            >
                <div className={`absolute top-3 right-3 w-1.5 h-1.5 rounded-full ${isActive ? 'bg-blue-600' : 'bg-neutral-200'}`} />

                <div className={`${isActive ? 'text-blue-600' : 'text-neutral-800'} transition-colors duration-300`}>
                    {/* Render Lucide Icon with consistent stroke width */}
                    <Icon size={24} strokeWidth={1.5} />
                </div>
                
                <span className={`text-[10px] font-bold tracking-wider ${isActive ? 'text-blue-600' : 'text-neutral-500'} transition-colors duration-300`}>
                    {item.label}
                </span>
            </motion.div>
          </motion.div>
        );
      })}

    </div>
  );
}