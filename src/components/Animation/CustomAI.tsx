import { motion } from 'framer-motion';
import { Database, Shield, Sliders, Cpu, Terminal as TerminalIcon } from 'lucide-react';

// --- Configuration ---
const COLORS = {
  primary: '#000000', // Amber-400
  secondary: '#FAFAFA', // Amber-600
  glow: 'rgba(251, 191, 36, 0.5)',
  faint: 'rgba(251, 191, 36, 0.15)',
  text: '#000000',
  bg: '#000000',
};

// --- Sub-components ---

// 1. Background Blueprint Grid
function BlueprintGrid({ height }: { width: number; height: number }) {
  return (
    <g opacity={0.2}>
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke={COLORS.faint} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      {/* Animated Scanning Line */}
      <motion.line
        x1="0" y1="0" x2="100%" y2="0"
        stroke={COLORS.primary}
        strokeWidth="1"
        opacity="0.3"
        animate={{ y: [0, height, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
    </g>
  );
}

// 2. Chaotic Inputs (Raw Materials)
function ChaosInputs({ x, y }: { x: number; y: number }) {
  const lines = Array.from({ length: 8 });
  return (
    <g transform={`translate(${x}, ${y})`}>
      <text x="-60" y="-40" fill={COLORS.text} fontSize="10" fontFamily="monospace" opacity="0.7">RAW_DATA_STREAM</text>
      {lines.map((_, i) => (
        <motion.path
          key={i}
          d={`M -80 ${-30 + i * 10} L -20 ${-20 + i * 8 + Math.sin(i) * 5}`}
          stroke={COLORS.primary}
          strokeWidth={1 + Math.random()}
          strokeOpacity={0.3 + Math.random() * 0.5}
          strokeDasharray={`${5 + Math.random() * 10} ${5 + Math.random() * 10}`}
          animate={{
            x: [0, 20, 0],
            opacity: [0.4, 0.8, 0.4],
            strokeDashoffset: [0, -50]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}
    </g>
  );
}

// 3. Central Assembly Core (The Reactor)
function ReactorCore({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Outer Rotating Ring */}
      <motion.circle
        r="70"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="1"
        strokeDasharray="20 10 5 10"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner Counter-Rotating Ring */}
      <motion.circle
        r="55"
        fill="none"
        stroke={COLORS.secondary}
        strokeWidth="2"
        strokeDasharray="40 60"
        opacity="0.7"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
       {/* Core Glow & Icon */}
      <motion.circle
        r="30"
        fill="url(#core-glow)"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <g transform="translate(-16, -16)">
        <Cpu size={32} color={COLORS.primary} />
      </g>
      <text x="0" y="95" textAnchor="middle" fill={COLORS.text} fontSize="12" fontFamily="monospace" letterSpacing="2">
        ASSEMBLY_CORE
      </text>
    </g>
  );
}

// 4. Docking Modules
interface ModuleProps {
    label: string;
    icon: React.ReactNode;
    angle: number;
    delay: number;
}

function DockingModule({ label, icon, angle, delay }: ModuleProps) {
    const orbitRadius = 140;
    const dockRadius = 85;
    const rad = angle * (Math.PI / 180);
    
    // Start position (orbiting)
    const startX = Math.cos(rad) * orbitRadius;
    const startY = Math.sin(rad) * orbitRadius;
    
    // End position (docked)
    const endX = Math.cos(rad) * dockRadius;
    const endY = Math.sin(rad) * dockRadius;

    return (
        <motion.g
            initial={{ x: startX, y: startY, opacity: 0.6 }}
            animate={{ 
                x: [startX, endX, endX], // Move in and stay
                y: [startY, endY, endY],
                opacity: [0.6, 1, 1],
                scale: [1, 1.2, 1] // Flash effect on dock
            }}
            transition={{ 
                duration: 4,
                times: [0, 0.8, 1], // Most time spent moving
                repeat: Infinity,
                repeatDelay: 1,
                delay: delay,
                ease: "easeInOut"
            }}
        >
            {/* Connector Beam appearing on dock */}
             <motion.line
                x1="0" y1="0" x2={-endX*0.3} y2={-endY*0.3}
                stroke={COLORS.primary} strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1] }}
                transition={{ duration: 4, times:[0, 0.8, 1], repeat: Infinity, repeatDelay: 1, delay: delay }}
            />
            
            {/* Module Node */}
            <circle r="18" fill="#0A0A0A" stroke={COLORS.primary} strokeWidth="2" />
            <g transform="translate(-10, -10) scale(0.8)">{icon}</g>
             
            {/* Label showing only when docking/docked */}
            <motion.g
                 initial={{ opacity: 0 }}
                 animate={{ opacity: [0, 1, 1] }}
                 transition={{ duration: 4, times:[0, 0.7, 1], repeat: Infinity, repeatDelay: 1, delay: delay }}
            >
                <text 
                    x="0" 
                    y="30" 
                    textAnchor="middle" 
                    fill={COLORS.text} 
                    fontSize="9" 
                    fontFamily="monospace"
                    transform={`rotate(${angle > 90 && angle < 270 ? 180 : 0})`} // Flip text on left side
                >
                    {label}
                </text>
            </motion.g>
        </motion.g>
    );
}


// 5. Engineered Output Beam
function OutputBeam({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
       <text x="20" y="-20" fill={COLORS.text} fontSize="10" fontFamily="monospace" opacity="0.7">ENGINEERED_SOLUTION</text>
      {/* Core high-intensity beam */}
      <motion.path
        d="M 0 0 L 150 0"
        stroke="url(#output-gradient)"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0.5 }}
        animate={{ pathLength: [0.8, 1, 0.8], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Outer pulse */}
      <motion.path
        d="M 0 0 L 150 0"
        stroke={COLORS.primary}
        strokeWidth="12"
        strokeOpacity="0.2"
        strokeLinecap="round"
        animate={{ strokeWidth: [10, 16, 10] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}


// 6. HUD Elements
function SystemHUD({ width, height }: { width: number; height: number }) {
    return (
        <g>
            {/* System Load Gauge - Bottom Left */}
            <g transform={`translate(60, ${height - 60})`}>
                <text x="0" y="-35" textAnchor="middle" fill={COLORS.text} fontSize="10" fontFamily="monospace">SYSTEM_LOAD</text>
                <circle r="25" fill="none" stroke={COLORS.faint} strokeWidth="4" />
                <motion.circle
                    r="25"
                    fill="none"
                    stroke={COLORS.primary}
                    strokeWidth="4"
                    strokeDasharray="157" // 2 * pi * 25
                    strokeDashoffset="157"
                    strokeLinecap="round"
                    animate={{ strokeDashoffset: [157, 20, 20] }} // Animate to ~85%
                    transition={{ duration: 4, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
                    transform="rotate(-90)"
                />
                 <text x="0" y="5" textAnchor="middle" fill={COLORS.text} fontSize="12" fontFamily="monospace">85%</text>
            </g>

            {/* Terminal Output - Bottom Right */}
            <g transform={`translate(${width - 140}, ${height - 80})`}>
                 <rect x="0" y="0" width="120" height="60" fill="rgba(0,0,0,0.5)" stroke={COLORS.faint} />
                 <g transform="translate(10, 15)">
                    <TerminalIcon size={14} color={COLORS.primary} />
                    <text x="20" y="5" fill={COLORS.text} fontSize="10" fontFamily="monospace">BUILD_LOG</text>
                 </g>
                 {/* Clipping area for scrolling text */}
                 <svg x="5" y="25" width="110" height="30" viewBox="0 0 110 30">
                     <motion.g
                        animate={{ y: [0, -40] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                     >
                        <text x="0" y="10" fill={COLORS.text} fontSize="8" fontFamily="monospace" opacity="0.8">
                             init_core... OK
                        </text>
                         <text x="0" y="22" fill={COLORS.text} fontSize="8" fontFamily="monospace" opacity="0.8">
                             dock_module: RAG...
                        </text>
                         <text x="0" y="34" fill={COLORS.text} fontSize="8" fontFamily="monospace" opacity="0.8">
                             apply_guardrails...
                        </text>
                        <text x="0" y="46" fill={COLORS.text} fontSize="8" fontFamily="monospace" opacity="0.8">
                             tune_parameters... OK
                        </text>
                         <text x="0" y="58" fill={COLORS.text} fontSize="8" fontFamily="monospace" opacity="0.8">
                             BUILD COMPLETE.
                        </text>
                     </motion.g>
                 </svg>
            </g>
        </g>
    );
}


// --- Main Component ---

export default function CustomAIEngineering() {
  const width = 800;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2;

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-neutral-900/50 to-black pointer-events-none" />

      <div className="relative w-full max-w-4xl h-full">
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
        >
          <defs>
            {/* Glow for the core */}
            <radialGradient id="core-glow" cx="0.5" cy="0.5" r="0.5">
              <stop stopColor={COLORS.primary} stopOpacity="0.6" />
              <stop offset="1" stopColor={COLORS.primary} stopOpacity="0" />
            </radialGradient>
            {/* Gradient for the output beam */}
            <linearGradient id="output-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={COLORS.primary} stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#FFF" stopOpacity="1"/>
            </linearGradient>
          </defs>

          {/* 1. Background Layer */}
          <BlueprintGrid width={width} height={height} />

          {/* 2. HUD Layer */}
          <SystemHUD width={width} height={height} />

          {/* 3. Main Assembly Layer */}
          <g transform={`translate(${centerX}, ${centerY})`}>
            
            {/* Inputs flows into the center */}
            <ChaosInputs x={-centerX + 100} y={0} />

             {/* Connecting Beam from Chaos to Core */}
            <motion.path
                d={`M ${-centerX + 150} 0 L -80 0`}
                stroke={COLORS.primary} strokeWidth="2" strokeDasharray="10 20"
                animate={{ strokeDashoffset: [0, -30] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                opacity="0.5"
            />

            {/* The Reactor Core */}
            <ReactorCore x={0} y={0} />

            {/* Docking Modules representing Custom Engineering */}
            <DockingModule 
                label="CONTEXT (RAG)" 
                icon={<Database color={COLORS.primary} size={18}/>} 
                angle={-90} // Top
                delay={0}
            />
            <DockingModule 
                label="LOGIC & RULES" 
                icon={<Shield color={COLORS.primary} size={18}/>} 
                angle={90} // Bottom
                delay={1.5}
            />
            <DockingModule 
                label="MODEL TUNING" 
                icon={<Sliders color={COLORS.primary} size={18}/>} 
                angle={180} // Left side, near inputs
                delay={0.8}
            />

             {/* The Final Output */}
            <OutputBeam x={80} y={0} />
          </g>

        </svg>
      </div>
    </div>
  );
}