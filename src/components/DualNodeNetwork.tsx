import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

// --- Types & Interfaces ---

interface BeamProps {
  d: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  dashArray?: string;
  reverse?: boolean;
}

interface CentralNodeProps {
  label: string;
  icon?: React.ReactNode;
}

// --- Configuration ---

const COLORS = {
  primary: '#FBBF24', // Amber-400
  secondary: '#D97706', // Amber-600
  glow: 'rgba(251, 191, 36, 0.5)',
  faint: 'rgba(251, 191, 36, 0.1)',
};

// --- Sub-components (Defined BEFORE usage) ---

const Beam: React.FC<BeamProps> = ({ 
  d, 
  delay = 0, 
  duration = 5, 
  strokeWidth = 1.5, 
  dashArray = "100 400", 
  reverse = false 
}) => {
  return (
    <g>
      <path d={d} stroke={COLORS.faint} strokeWidth={1} fill="none" />
      <motion.path
        d={d}
        stroke={COLORS.primary}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashArray}
        initial={{ strokeDashoffset: reverse ? -500 : 500, opacity: 0 }}
        animate={{
          strokeDashoffset: reverse ? 500 : -500,
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          delay: delay,
        }}
        fill="none"
      />
    </g>
  );
};

const CentralNode: React.FC<CentralNodeProps> = ({ label, icon }) => {
    return (
      <g>
        {/* Glow */}
        <motion.circle
          r="80"
          fill="url(#node-glow)"
          initial={{ opacity: 0.4, scale: 0.9 }}
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sonar Waves */}
        {[0, 1].map((i) => (
            <motion.circle
            key={i}
            r="30"
            stroke={COLORS.primary}
            strokeWidth="1"
            fill="none"
            initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2.5 }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.5,
            }}
            />
        ))}
  
        {/* Spinning Ring */}
        <motion.circle
          r="45"
          stroke={COLORS.faint}
          strokeWidth="1"
          strokeDasharray="6 10"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
  
        {/* Core */}
        <circle r="20" fill="#0A0A0A" stroke={COLORS.primary} strokeWidth="2" />
        
        {/* Icon / Dot */}
        {icon ? (
          <g transform="translate(-12, -12)">{icon}</g>
        ) : (
          <motion.circle
            r="6"
            fill={COLORS.primary}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}

        {/* Label */}
        <foreignObject x="-50" y="50" width="100" height="50">
            <div className="flex flex-col items-center justify-center overflow-visible">
                <span className="text-xs font-mono tracking-[0.2em] text-amber-400 opacity-90 whitespace-nowrap">
                    {label}
                </span>
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-1"></div>
            </div>
        </foreignObject>
      </g>
    );
};

// --- Main Component ---

const DualNodeNetwork: React.FC = () => {
  // Coordinates for the SVG canvas
  const width = 800;
  const height = 500;
  const centerY = height / 2;
  
  // Node Positions
  const aiNodePos = { x: width * 0.35, y: centerY };
  const expertNodePos = { x: width * 0.65, y: centerY };

  // Path definitions
  const paths = {
    topLeftToAi: `M 0 50 Q ${aiNodePos.x * 0.5} 50, ${aiNodePos.x} ${aiNodePos.y}`,
    bottomLeftToAi: `M 0 ${height - 50} Q ${aiNodePos.x * 0.5} ${height - 50}, ${aiNodePos.x} ${aiNodePos.y}`,
    topRightToExpert: `M ${width} 50 Q ${width - (width - expertNodePos.x) * 0.5} 50, ${expertNodePos.x} ${expertNodePos.y}`,
    bottomRightToExpert: `M ${width} ${height - 50} Q ${width - (width - expertNodePos.x) * 0.5} ${height - 50}, ${expertNodePos.x} ${expertNodePos.y}`,
    centerConnection: `M ${aiNodePos.x} ${aiNodePos.y} L ${expertNodePos.x} ${expertNodePos.y}`,
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/50 to-black pointer-events-none" />

      <div className="relative w-full max-w-4xl h-full perspective-1000">
        <svg
          className="absolute inset-0 w-full h-full overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
        >
          <defs>
            <radialGradient id="node-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(100)">
              <stop stopColor={COLORS.primary} stopOpacity="0.3" />
              <stop offset="1" stopColor={COLORS.primary} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ---- Beams ---- */}
          <Beam d={paths.topLeftToAi} delay={0} />
          <Beam d={paths.bottomLeftToAi} delay={1.5} reverse />
          <Beam d={paths.topRightToExpert} delay={0.8} />
          <Beam d={paths.bottomRightToExpert} delay={2.2} reverse />
          
          {/* Central Beam */}
          <Beam d={paths.centerConnection} delay={0} duration={3} strokeWidth={3} dashArray="40 100" />

          {/* ---- Nodes ---- */}
          <g transform={`translate(${aiNodePos.x}, ${aiNodePos.y})`}>
            <CentralNode label="AI AGENT" />
          </g>

          <g transform={`translate(${expertNodePos.x}, ${expertNodePos.y})`}>
            <CentralNode label="EXPERT" icon={<User size={24} color={COLORS.primary} />} />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default DualNodeNetwork;