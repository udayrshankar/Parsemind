// 1. Add 'Variants' to the import
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState } from "react";

/* ------------------------------
   CONSTANTS
-------------------------------- */
const SIZE = 700;
const CENTER = SIZE / 2;
const CORE_RADIUS = 88;

const LAYERS = [
  // ... (same as before) ...
  {
    id: "compliance",
    label: "COMPLIANCE",
    radius: 310,
    speed: 50,
    dashArray: "4 8",
    width: 1,
    description: "SOC2 • GDPR • HIPAA",
  },
  {
    id: "security",
    label: "DATA SECURITY",
    radius: 245,
    speed: 35,
    dashArray: "40 120",
    width: 1.5,
    description: "AES-256 ENCRYPTION",
  },
  {
    id: "observability",
    label: "OBSERVABILITY",
    radius: 180,
    speed: 25,
    dashArray: "10 10",
    width: 1,
    description: "REAL-TIME LOGGING",
  },
  {
    id: "oversight",
    label: "HUMAN OVERSIGHT",
    radius: 115,
    speed: 20,
    dashArray: "80 180",
    width: 2,
    description: "MANUAL REVIEW",
  },
];

/* ------------------------------
   ANIMATION VARIANTS
-------------------------------- */

// 2. Explicitly type as ': Variants'
const ringVariants: Variants = {
  idle: (i: number) => ({
    stroke: "#525252",
    opacity: [0.1, 1, 0.1, 1, 0.1],
    transition: {
      stroke: { duration: 0.2 },
      opacity: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.8,
        ease: "linear", // TypeScript now knows this is a valid Easing type
        times: [0, 0.03, 0.06, 0.09, 1],
      },
    },
  }),
  active: {
    stroke: "#6366f1",
    opacity: 1,
    transition: { duration: 0.2 },
  },
  dimmed: {
    stroke: "#525252",
    opacity: 0.1,
    transition: { duration: 0.2 },
  },
};

// 3. Explicitly type as ': Variants'
const textVariants: Variants = {
  idle: (i: number) => ({
    color: "#525252",
    opacity: [0.5, 1, 0.5, 1, 0.5],
    transition: {
      color: { duration: 0.2 },
      opacity: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.8,
        ease: "linear",
        times: [0, 0.03, 0.06, 0.09, 1],
      },
    },
  }),
  active: {
    color: "#818cf8",
    opacity: 1,
    transition: { duration: 0.2 },
  },
  dimmed: {
    color: "#525252",
    opacity: 0.2,
    transition: { duration: 0.2 },
  },
};

/* ------------------------------
   ICON COMPONENT
-------------------------------- */
const ShieldIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

/* ------------------------------
   MAIN COMPONENT
-------------------------------- */
interface EnterpriseTrustVisualDarkProps {
  scale?: number;
}

export default function EnterpriseTrustVisualDark({
  scale = 1,
}: EnterpriseTrustVisualDarkProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      className="relative mx-auto overflow-hidden "
      style={{
        width: SIZE * scale,
        height: SIZE * scale,
      }}
    >
      <div
        className="relative flex items-center justify-center font-sans text-white translate-y-20"
        style={{
          width: SIZE,
          height: SIZE,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          {/* A. SVG LAYER (Rings & Radiation) */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox={`0 0 ${SIZE} ${SIZE}`}
          >
            {/* 1. Background Waves */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={`wave-${i}`}
                cx={CENTER}
                cy={CENTER}
                r={CORE_RADIUS}
                fill="none"
                stroke="#6366f1"
                strokeWidth="1"
                initial={{ opacity: 0.3, scale: 1 }}
                animate={{
                  opacity: 0,
                  r: SIZE / 2,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 1.3,
                }}
              />
            ))}

            {/* 2. Rotating Layers */}
            {LAYERS.map((layer, index) => {
              // Determine current state based on hover
              const state =
                hoveredId === layer.id
                  ? "active"
                  : hoveredId
                  ? "dimmed"
                  : "idle";

              return (
                <motion.g
                  key={layer.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: layer.radius * 0.002 }}
                >
                  <motion.g
                    style={{ originX: "50%", originY: "50%" }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: layer.speed,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    {/* Hit Area (Invisible) */}
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={layer.radius}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="40"
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
                      // Pass the index to custom for staggering
                      custom={index} 
                      // Switch between variants based on state string
                      variants={ringVariants}
                      animate={state}
                    />
                  </motion.g>
                </motion.g>
              );
            })}
          </svg>

          {/* B. HTML LAYER (Labels) */}
          {LAYERS.map((layer, index) => {
            const state =
              hoveredId === layer.id
                ? "active"
                : hoveredId
                ? "dimmed"
                : "idle";

            return (
              <div
                key={`label-${layer.id}`}
                className="absolute top-1/2 left-1/2 pointer-events-none"
                style={{
                  transform: `translate(-50%, calc(-50% - ${layer.radius}px))`,
                }}
              >
                <div
                  className="pointer-events-auto cursor-pointer p-2"
                  onMouseEnter={() => setHoveredId(layer.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <motion.div
                    className="bg-neutral-900/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm border border-transparent z-10"
                    animate={{
                      borderColor:
                        state === "active"
                          ? "rgba(99, 102, 241, 0.5)"
                          : "rgba(255,255,255,0)",
                    }}
                  >
                    {/* Label Text */}
                    <motion.span
                      className="text-xs font-bold tracking-[0.2em] whitespace-nowrap block"
                      custom={index}
                      variants={textVariants}
                      animate={state}
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
              className="w-44 h-44 bg-neutral-900 rounded-full border border-neutral-800 shadow-2xl flex flex-col items-center justify-center gap-3"
              animate={{
                borderColor: hoveredId
                  ? "rgba(99, 102, 241, 0.5)"
                  : "rgba(38, 38, 38, 1)",
                boxShadow: hoveredId
                  ? "0 0 50px -10px rgba(99, 102, 241, 0.3)"
                  : "0 20px 50px -10px rgba(0,0,0,0.5)",
              }}
            >
              <motion.div
                animate={{ color: hoveredId ? "#818cf8" : "#ffffff" }}
                transition={{ duration: 0.1 }}
              >
                <ShieldIcon />
              </motion.div>

              <div className="h-10 flex flex-col items-center justify-center w-full px-4 text-center">
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
                      <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
                        STATUS: ACTIVE
                      </span>
                      <span className="text-xs font-medium tracking-wide text-neutral-400 mt-1 truncate w-full">
                        {LAYERS.find((l) => l.id === hoveredId)?.description}
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
                      <span className="text-[10px] font-medium tracking-widest text-neutral-500">
                        SYSTEM
                      </span>
                      <span className="text-xs font-bold tracking-wider text-white mt-0.5">
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
    </div>
  );
}