import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ------------------------------
   CONSTANTS
-------------------------------- */
const SIZE = 600; // Fixed internal coordinate system
const CENTER = SIZE / 2;

const LAYERS = [
  { 
    id: "compliance",
    label: "COMPLIANCE", 
    radius: 240, // Distance from center
    speed: 50, 
    dashArray: "4 8", 
    width: 1,
    description: "SOC2 • GDPR • HIPAA" 
  },
  { 
    id: "security",
    label: "DATA SECURITY", 
    radius: 190, 
    speed: 35, 
    dashArray: "40 120", 
    width: 1.5,
    description: "AES-256 ENCRYPTION" 
  },
  { 
    id: "observability",
    label: "OBSERVABILITY", 
    radius: 140, 
    speed: 25, 
    dashArray: "10 10", 
    width: 1,
    description: "REAL-TIME LOGGING" 
  },
  { 
    id: "oversight",
    label: "HUMAN OVERSIGHT", 
    radius: 90, 
    speed: 20, 
    dashArray: "80 180", 
    width: 2,
    description: "MANUAL REVIEW" 
  },
];

/* ------------------------------
   ICON COMPONENT
-------------------------------- */
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
export default function SwissTrustFixed() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[640px] flex items-center justify-center font-sans overflow-hidden ">
      
      

      <div 
        className="relative" 
        style={{ width: SIZE, height: SIZE }}
      >
        {/* A. SVG LAYER (Rings) */}
        <svg 
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
            {LAYERS.map((layer) => {
                const isHovered = hoveredId === layer.id;
                const isDimmed = hoveredId !== null && !isHovered;

                return (
                    <motion.g
                        key={layer.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: layer.radius * 0.002 }}
                    >
                         {/* ROTATING GROUP */}
                         <motion.g
                            style={{ originX: "50%", originY: "50%" }} // SVG origin is center
                            animate={{ rotate: 360 }}
                            transition={{ duration: layer.speed, repeat: Infinity, ease: "linear" }}
                         >
                            {/* Invisible Hit Area (Thicker) */}
                            {/* We use React Events on the SVG element for precise shape matching */}
                            <circle
                                cx={CENTER}
                                cy={CENTER}
                                r={layer.radius}
                                fill="none"
                                stroke="transparent"
                                strokeWidth="30"
                                className="pointer-events-auto cursor-pointer"
                                onMouseEnter={() => setHoveredId(layer.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            />

                            {/* Visible Ring */}
                            <motion.circle
                                cx={CENTER}
                                cy={CENTER}
                                r={layer.radius}
                                fill="none"
                                strokeWidth={layer.width}
                                strokeDasharray={layer.dashArray}
                                strokeLinecap="square"
                                animate={{
                                    stroke: isHovered ? "#2563eb" : "#000000",
                                    opacity: isDimmed ? 0.1 : 1
                                }}
                                transition={{ duration: 0.3 }}
                            />
                         </motion.g>
                    </motion.g>
                );
            })}
        </svg>

        {/* B. HTML LAYER (Labels) */}
        {/* We place labels in the same relative container so they align perfectly with SVG */}
        {LAYERS.map((layer) => {
             const isHovered = hoveredId === layer.id;
             const isDimmed = hoveredId !== null && !isHovered;

             return (
                <div
                    key={`label-${layer.id}`}
                    className="absolute top-1/2 left-1/2 pointer-events-none" // Start at center
                    style={{ 
                        // Move up by radius. -50% centers the div itself.
                        transform: `translate(-50%, calc(-50% - ${layer.radius}px))` 
                    }} 
                >
                    {/* Interactive wrapper for label */}
                    <div 
                        className="pointer-events-auto cursor-pointer p-1"
                        onMouseEnter={() => setHoveredId(layer.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <motion.div 
                            className="bg-white/90 backdrop-blur-sm px-1.5 py-0.5 z-10"
                            animate={{ opacity: isDimmed ? 0.2 : 1 }}
                        >
                             <motion.span 
                                className="text-[10px] font-bold tracking-[0.2em] whitespace-nowrap block"
                                animate={{ 
                                    color: isHovered ? "#2563eb" : "#000000",
                                    scale: isHovered ? 1.05 : 1
                                }}
                             >
                                {layer.label}
                             </motion.span>
                         </motion.div>
                    </div>
                </div>
             );
        })}

        {/* C. CENTER CORE */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
                className="w-32 h-32 bg-white rounded-full border border-neutral-100 shadow-2xl flex flex-col items-center justify-center gap-2"
                animate={{
                    borderColor: hoveredId ? "rgba(37, 99, 235, 0.2)" : "rgba(245, 245, 245, 1)",
                    boxShadow: hoveredId ? "0 10px 40px -10px rgba(37, 99, 235, 0.2)" : "0 10px 40px -10px rgba(0,0,0,0.1)"
                }}
            >
                <motion.div 
                    animate={{ color: hoveredId ? "#2563eb" : "#000000" }}
                    transition={{ duration: 0.3 }}
                >
                    <ShieldIcon />
                </motion.div>
                
                <div className="h-8 flex flex-col items-center justify-center w-full px-2 text-center">
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
                                <span className="text-[9px] font-bold tracking-widest text-blue-600 uppercase">
                                    STATUS: ACTIVE
                                </span>
                                <span className="text-[10px] font-medium tracking-wide text-neutral-500 mt-0.5 truncate w-full">
                                    {LAYERS.find(l => l.id === hoveredId)?.description}
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
                                <span className="text-[9px] font-medium tracking-widest text-neutral-400">
                                    SYSTEM
                                </span>
                                <span className="text-xs font-bold tracking-wider text-black">
                                    PROTECTED
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
      </div>
      
    </div>
  );
}