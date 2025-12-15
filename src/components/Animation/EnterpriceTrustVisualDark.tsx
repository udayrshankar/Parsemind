import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Lock, Eye, FileCheck, UserCheck } from "lucide-react";

/* ------------------------------
   CONSTANTS & CONFIG
-------------------------------- */
const BASE_SIZE = 600;
const CENTER = BASE_SIZE / 2;

const LAYERS = [
  { 
    id: "compliance",
    label: "COMPLIANCE", 
    radius: 240, 
    speed: 60, 
    dashArray: "4 8", 
    width: 1,
    color: "#10b981", // Emerald
    icon: FileCheck,
    description: "SOC2 • GDPR • HIPAA" 
  },
  { 
    id: "security",
    label: "DATA SECURITY", 
    radius: 180, 
    speed: 45, 
    dashArray: "40 120", 
    width: 1.5,
    color: "#3b82f6", // Blue
    icon: Lock,
    description: "AES-256 ENCRYPTION" 
  },
  { 
    id: "observability",
    label: "OBSERVABILITY", 
    radius: 120, 
    speed: 30, 
    dashArray: "10 10", 
    width: 1,
    color: "#8b5cf6", // Violet
    icon: Eye,
    description: "REAL-TIME LOGGING" 
  },
  { 
    id: "oversight",
    label: "OVERSIGHT", 
    radius: 70, 
    speed: 20, 
    dashArray: "80 180", 
    width: 2,
    color: "#f59e0b", // Amber
    icon: UserCheck,
    description: "HUMAN-IN-THE-LOOP" 
  },
];

/* ------------------------------
   SUB-COMPONENTS
-------------------------------- */

// 1. The Orbit Ring
const OrbitRing = ({ 
  layer, 
  isHovered, 
  isDimmed 
}: { 
  layer: typeof LAYERS[0]; 
  isHovered: boolean; 
  isDimmed: boolean;
}) => {
  return (
    <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
            opacity: isDimmed ? 0.1 : 1, 
            scale: 1 
        }}
        transition={{ duration: 0.5 }}
    >
        {/* Passive Track (Dark Zinc) */}
        <circle
            cx={CENTER} cy={CENTER} r={layer.radius}
            fill="none"
            stroke="#27272a" // zinc-800
            strokeWidth="1"
            strokeOpacity="0.5"
        />

        {/* Active Rotating Segment */}
        <motion.g
            animate={{ rotate: 360 }}
            transition={{ 
                duration: layer.speed, 
                repeat: Infinity, 
                ease: "linear" 
            }}
            style={{ originX: "50%", originY: "50%" }} // SVG Center
        >
            <motion.circle
                cx={CENTER} cy={CENTER} r={layer.radius}
                fill="none"
                stroke={isHovered ? layer.color : "#52525b"} // zinc-600 default
                strokeWidth={isHovered ? 2 : layer.width}
                strokeDasharray={layer.dashArray}
                strokeLinecap="round"
                animate={{
                    strokeOpacity: isHovered ? 1 : 0.6,
                    filter: isHovered ? `drop-shadow(0 0 4px ${layer.color})` : "none"
                }}
            />
            
            {/* Scanning Particle */}
            <circle 
                cx={CENTER + layer.radius} cy={CENTER} r="2" 
                fill={isHovered ? layer.color : "#71717a"}
            />
        </motion.g>
    </motion.g>
  );
};

// 2. The Interactive Label HUD
const LabelHUD = ({ 
    layer, 
    isHovered, 
    isDimmed,
    setHoveredId
}: { 
    layer: typeof LAYERS[0]; 
    isHovered: boolean; 
    isDimmed: boolean;
    setHoveredId: (id: string | null) => void;
}) => {
    return (
        <div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{ 
                // Position at top of ring
                transform: `translate(-50%, calc(-50% - ${layer.radius}px))` 
            }} 
        >
            <div 
                className="pointer-events-auto cursor-pointer p-2"
                onMouseEnter={() => setHoveredId(layer.id)}
                onMouseLeave={() => setHoveredId(null)}
            >
                <motion.div 
                    className={`
                        px-2 py-1 rounded border backdrop-blur-md transition-all duration-300 flex items-center gap-2
                        ${isHovered 
                            ? 'bg-zinc-900/90 border-zinc-700 shadow-xl' 
                            : 'bg-zinc-900/30 border-transparent'
                        }
                    `}
                    animate={{ 
                        opacity: isDimmed ? 0.2 : 1,
                        scale: isHovered ? 1.1 : 1,
                        borderColor: isHovered ? layer.color : "transparent"
                    }}
                >
                    {isHovered && (
                        <layer.icon size={10} color={layer.color} />
                    )}
                    <span 
                        className={`text-[9px] font-bold tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${isHovered ? 'text-white' : 'text-zinc-500'}`}
                    >
                        {layer.label}
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
interface EnterpriseTrustDarkProps {
    scale?: number;
}

export default function EnterpriseTrustVisualDark({ scale = 1 }: EnterpriseTrustDarkProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    // 1. BOUNDING BOX
    <div 
      style={{ 
        width: BASE_SIZE * scale, 
        height: BASE_SIZE * scale 
      }} 
      className="relative mx-auto"
    >
      {/* 2. SCALER WRAPPER */}
      <div 
        style={{
            width: BASE_SIZE,
            height: BASE_SIZE,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
        }}
        className="relative flex items-center justify-center font-sans overflow-hidden"
      >
        
        {/* Background Grid */}
        <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
                backgroundImage: "radial-gradient(circle at center, #333 1px, transparent 1px)",
                backgroundSize: "40px 40px"
            }}
        />

        {/* --- A. RINGS LAYER (SVG) --- */}
        <svg 
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox={`0 0 ${BASE_SIZE} ${BASE_SIZE}`}
        >
            {LAYERS.map((layer) => {
                const isHovered = hoveredId === layer.id;
                const isDimmed = hoveredId !== null && !isHovered;

                return (
                    <OrbitRing 
                        key={layer.id} 
                        layer={layer} 
                        isHovered={isHovered} 
                        isDimmed={isDimmed} 
                    />
                );
            })}
        </svg>

        {/* --- B. LABELS LAYER (HTML) --- */}
        {LAYERS.map((layer) => {
             const isHovered = hoveredId === layer.id;
             const isDimmed = hoveredId !== null && !isHovered;

             return (
                <LabelHUD 
                    key={`label-${layer.id}`}
                    layer={layer}
                    isHovered={isHovered}
                    isDimmed={isDimmed}
                    setHoveredId={setHoveredId}
                />
             );
        })}

        {/* --- C. CENTER SHIELD CORE --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
                className="w-24 h-24 bg-zinc-950 rounded-full border border-zinc-800 shadow-2xl flex flex-col items-center justify-center gap-1 relative overflow-hidden"
                animate={{
                    borderColor: hoveredId 
                        ? (LAYERS.find(l => l.id === hoveredId)?.color || "#fff") 
                        : "rgba(39, 39, 42, 1)",
                    boxShadow: hoveredId 
                        ? `0 0 30px -5px ${LAYERS.find(l => l.id === hoveredId)?.color}40` // 40 is hex opacity
                        : "0 10px 40px -10px rgba(0,0,0,0.5)"
                }}
                transition={{ duration: 0.3 }}
            >
                {/* Shield Icon */}
                <motion.div 
                    animate={{ 
                        color: hoveredId 
                            ? (LAYERS.find(l => l.id === hoveredId)?.color) 
                            : "#52525b", // zinc-600
                        scale: hoveredId ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <Shield size={24} strokeWidth={2} />
                </motion.div>
                
                {/* Status Text Area */}
                <div className="h-6 flex flex-col items-center justify-center w-full px-2 text-center relative z-10">
                    <AnimatePresence mode="wait">
                        {hoveredId ? (
                            <motion.div
                                key="hovered"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <span 
                                    className="text-[8px] font-bold tracking-widest uppercase truncate max-w-20"
                                    style={{ color: LAYERS.find(l => l.id === hoveredId)?.color }}
                                >
                                    ACTIVE
                                </span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="default"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-[8px] font-bold tracking-widest text-zinc-600">
                                    SECURE
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Inner Glow Background */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 pointer-events-none" />
            </motion.div>
        </div>

      </div>
    </div>
  );
}