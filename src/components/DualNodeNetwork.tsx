import React from 'react';
import { motion } from 'framer-motion';
import { User, Database, Shield, TrendingUp, Server, Globe } from 'lucide-react';

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

interface MiniNodeProps {
  x: number;
  y: number;
  icon: React.ReactNode;
  label: string;
}

// --- Configuration ---

const COLORS = {
  primary: '#FBBF24', // Amber-400
  secondary: '#D97706', // Amber-600
  glow: 'rgba(251, 191, 36, 0.5)',
  faint: 'rgba(251, 191, 36, 0.1)',
  bg: '#000000',
};

// --- Sub-components ---

function Beam({ 
  d, 
  delay = 0, 
  duration = 10, 
  strokeWidth = 1.5, 
  dashArray = "100 400", 
  reverse = false 
}: BeamProps) {
  return (
    <g>
      {/* Static Background Line */}
      <path d={d} stroke={COLORS.faint} strokeWidth={1} fill="none" />
      
      {/* Animated Data Packet */}
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
}

function CentralNode({ label, icon }: CentralNodeProps) {
  return (
    <g>
      {/* Ambient Glow */}
      <motion.circle
        r="80"
        fill="url(#node-glow)"
        initial={{ opacity: 0.4, scale: 0.9 }}
        animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Expanding Sonar Waves */}
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

      {/* Rotating Technical Ring */}
      <motion.circle
        r="45"
        stroke={COLORS.faint}
        strokeWidth="1"
        strokeDasharray="6 10"
        fill="none"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Solid Center Core */}
      <circle r="20" fill="#0A0A0A" stroke={COLORS.primary} strokeWidth="2" />
      
      {/* Icon or Dot */}
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

      {/* Floating Label */}
      <foreignObject x="-50" y="50" width="100" height="50">
        <div className="flex flex-col items-center justify-center overflow-visible">
          <span className="text-xs font-mono tracking-[0.2em] text-amber-400 opacity-90 whitespace-nowrap">
            {label}
          </span>
          <div className="h-1px w-12 bg-linear-to-r from-transparent via-amber-500 to-transparent mt-1"></div>
        </div>
      </foreignObject>
    </g>
  );
}

function IntegrationNode({ x, y, icon, label }: MiniNodeProps) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle r="15" fill="#0A0A0A" stroke={COLORS.primary} strokeWidth="1" />
      <g transform="translate(-8, -8) scale(0.8)">{icon}</g>
      <text x="0" y="28" textAnchor="middle" fill={COLORS.primary} fontSize="10" fontFamily="monospace" opacity="0.8">
        {label}
      </text>
    </g>
  );
}

function SecurityBadge({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Shield Pulse */}
      <motion.circle 
        r="25" 
        fill={COLORS.faint} 
        animate={{ opacity: [0.2, 0.5, 0.2] }} 
        transition={{ duration: 2, repeat: Infinity }} 
      />
      {/* Rotating Hexagon Border */}
      <motion.path
        d="M0,-24 L20.7,-12 L20.7,12 L0,24 L-20.7,12 L-20.7,-12 Z"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="1"
        strokeDasharray="4 4"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      {/* Icon */}
      <g transform="translate(-10, -10)">
        <Shield color={COLORS.primary} size={20} />
      </g>
      {/* Scan Line */}
      <motion.rect
        x="-20" y="-20" width="40" height="2"
        fill={COLORS.primary}
        opacity="0.5"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <text x="35" y="5" fill={COLORS.primary} fontSize="10" fontFamily="monospace" letterSpacing="2">SECURE_LINK</text>
    </g>
  );
}

function RoiPanel({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Panel Background */}
      <rect x="-80" y="-40" width="160" height="80" rx="4" fill="rgba(10,10,10,0.8)" stroke={COLORS.faint} strokeWidth="1" />
      
      {/* Header */}
      <text x="-70" y="-25" fill={COLORS.primary} fontSize="10" fontFamily="monospace" opacity="0.7">ROI PROJECTION</text>
      
      {/* Big Percentage */}
      <text x="-70" y="5" fill={COLORS.primary} fontSize="24" fontWeight="bold" fontFamily="monospace">
        +245%
      </text>

      {/* Graph Line */}
      <motion.path
        d="M -70 20 L -40 20 L -10 10 L 20 15 L 60 -10"
        fill="none"
        stroke={COLORS.primary}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatDelay: 1 }}
      />
      
      {/* Trending Icon */}
      <g transform="translate(50, -32)">
        <TrendingUp color={COLORS.primary} size={16} />
      </g>
    </g>
  );
}

// --- Main Component ---

export default function AdvancedNetwork() {
  // Dimensions
  const width = 900;
  const height = 600;
  const centerY = height / 2;
  
  // Node Coordinates
  const aiNodePos = { x: width * 0.4, y: centerY };
  const expertNodePos = { x: width * 0.7, y: centerY };

  // Integration Nodes (Left Side)
  const integrations = [
    { id: 1, label: 'DB_SYNC', icon: <Database color={COLORS.primary} />, x: 80, y: centerY - 100 },
    { id: 2, label: 'API_GW', icon: <Server color={COLORS.primary} />, x: 80, y: centerY },
    { id: 3, label: 'WEB_HOOK', icon: <Globe color={COLORS.primary} />, x: 80, y: centerY + 100 },
  ];

  // SVG Paths
  const paths = {
    topRightToExpert: `M ${width} 50 Q ${width - (width - expertNodePos.x) * 0.5} 50, ${expertNodePos.x} ${expertNodePos.y}`,
    bottomRightToExpert: `M ${width} ${height - 50} Q ${width - (width - expertNodePos.x) * 0.5} ${height - 50}, ${expertNodePos.x} ${expertNodePos.y}`,
    centerConnection: `M ${aiNodePos.x} ${aiNodePos.y} L ${expertNodePos.x} ${expertNodePos.y}`,
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex items-center justify-center">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-neutral-900/50 to-black pointer-events-none" />

      <div className="relative w-full max-w-5xl h-full perspective-1000">
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

          {/* --- INTEGRATION LAYER (Left) --- */}
          {integrations.map((node, i) => (
            <React.Fragment key={node.id}>
               {/* Connecting Beam to AI */}
               <Beam 
                d={`M ${node.x + 15} ${node.y} C ${node.x + 50} ${node.y}, ${aiNodePos.x - 50} ${aiNodePos.y}, ${aiNodePos.x} ${aiNodePos.y}`} 
                delay={i * 0.5} 
                duration={8}
              />
              <IntegrationNode {...node} />
            </React.Fragment>
          ))}

          {/* --- EXPERT INPUTS (Right) --- */}
          <Beam d={paths.topRightToExpert} delay={0.8} />
          <Beam d={paths.bottomRightToExpert} delay={2.2} reverse />
          
          {/* --- CENTRAL CONNECTION --- */}
          <Beam d={paths.centerConnection} delay={0} duration={8} strokeWidth={3} dashArray="40 100" />

          {/* --- SECURITY LAYER (Center Top) --- */}
          {/* We position this visually above the connection line */}
          <SecurityBadge x={(aiNodePos.x + expertNodePos.x) / 2} y={centerY - 60} />

          {/* --- ROI GAINS LAYER (Center Bottom) --- */}
          <RoiPanel x={(aiNodePos.x + expertNodePos.x) / 2} y={centerY + 120} />

          {/* --- MAIN NODES --- */}
          {/* AI Node */}
          <g transform={`translate(${aiNodePos.x}, ${aiNodePos.y})`}>
            <CentralNode label="AI AGENT" />
          </g>

          {/* Expert Node */}
          <g transform={`translate(${expertNodePos.x}, ${expertNodePos.y})`}>
            <CentralNode label="EXPERT" icon={<User size={24} color={COLORS.primary} />} />
          </g>

        </svg>
      </div>
    </div>
  );
}