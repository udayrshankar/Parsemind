import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  ShieldCheck, 
  Database, 
  BadgeCheck, 
  TrendingUp, 
  DollarSign,
  BrainCircuit 
} from 'lucide-react';

// --- Types & Interfaces ---

interface BeamProps {
  d: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  dashArray?: string;
  reverse?: boolean;
}

interface NodeProps {
  label: string;
  icon?: React.ReactNode;
}

// --- Configuration ---

const COLORS = {
  primary: '#FBBF24', // Amber-400
  secondary: '#D97706', // Amber-600
  accent: '#10B981',    // Emerald-500
  glow: 'rgba(251, 191, 36, 0.5)',
  faint: 'rgba(251, 191, 36, 0.1)',
  dark: '#0A0A0A',
};

// --- Sub-components ---

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
      {/* Faint static path for track visibility */}
      <path d={d} stroke={COLORS.faint} strokeWidth={1} fill="none" opacity="0.3" />
      
      {/* Animated Beam */}
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

const CentralNode: React.FC<NodeProps> = ({ label, icon }) => {
    return (
      <g>
        {/* Ambient Glow */}
        <motion.circle
          r="60"
          fill="url(#node-glow)"
          initial={{ opacity: 0.3, scale: 0.9 }}
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Sonar Waves */}
        {[0, 1].map((i) => (
            <motion.circle
            key={i}
            r="35"
            stroke={COLORS.primary}
            strokeWidth="1"
            fill="none"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0, scale: 2.0 }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.5,
            }}
            />
        ))}
  
        {/* Core Ring */}
        <circle r="30" fill={COLORS.dark} stroke={COLORS.primary} strokeWidth="2" />
        
        {/* Icon */}
        <g transform="translate(-12, -12)">{icon}</g>

        {/* Label */}
        <foreignObject x="-60" y="45" width="120" height="50">
            <div className="flex flex-col items-center justify-center overflow-visible">
                <span className="text-[10px] font-bold tracking-[0.2em] text-amber-400 opacity-90 whitespace-nowrap uppercase">
                    {label}
                </span>
            </div>
        </foreignObject>
      </g>
    );
};

const SatelliteNode: React.FC<NodeProps & { color?: string }> = ({ label, icon, color = COLORS.secondary }) => {
    return (
        <g>
            <motion.circle 
                r="20" 
                fill={COLORS.dark} 
                stroke={color} 
                strokeWidth="1.5"
                whileHover={{ scale: 1.1 }}
            />
            <g transform="translate(-10, -10)">
                {/* FIXED: Cast to 'any' to allow 'size' prop injection without TS error */}
                {React.isValidElement(icon) 
                  ? React.cloneElement(icon as React.ReactElement<any>, { size: 20, color: color }) 
                  : icon}
            </g>
            
            <foreignObject x="-50" y="25" width="100" height="40">
                <div className="flex justify-center">
                    <span className="text-[9px] font-mono tracking-widest uppercase bg-black/60 px-2 py-0.5 rounded text-gray-400">
                        {label}
                    </span>
                </div>
            </foreignObject>
        </g>
    );
};

// Special ROI Card Component (The Outcome)
const ROINode: React.FC = () => {
    return (
        <g>
            <foreignObject x="-60" y="-30" width="140" height="80">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="flex flex-col items-center justify-center p-2 rounded-xl border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md"
                >
                    <div className="flex items-center gap-2 mb-1">
                        <DollarSign size={14} className="text-emerald-400" />
                        <span className="text-emerald-400 font-bold text-sm tracking-wide">ROI</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <TrendingUp size={12} className="text-emerald-400" />
                        <span className="text-xs font-mono text-emerald-300">+240%</span>
                    </div>
                </motion.div>
            </foreignObject>
            
            {/* Pulsing Green Glow underneath */}
            <motion.circle
                r="40"
                fill="url(#roi-glow)"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
            />
        </g>
    );
};

// --- Main Component ---

const DualNodeNetwork: React.FC = () => {
  const width = 800;
  const height = 400; // Slightly shorter for a panoramic view
  const centerY = height / 2;
  
  // -- Coordinate System --
  
  // 1. Data Source (Left)
  const integrationsPos = { x: 100, y: centerY };
  
  // 2. Intelligence (Mid-Left)
  const aiNodePos = { x: 300, y: centerY };
  const securityPos = { x: 300, y: centerY + 100 }; // Security monitors AI from below
  
  // 3. Human Review (Mid-Right)
  const expertNodePos = { x: 500, y: centerY };
  
  // 4. Outcomes (Right)
  const trustPos = { x: 700, y: centerY - 60 };
  const roiPos = { x: 700, y: centerY + 60 };

  // Path Definitions
  const paths = {
    // Input Flow: Data -> AI
    dataToAi: `M ${integrationsPos.x} ${integrationsPos.y} L ${aiNodePos.x} ${aiNodePos.y}`,
    
    // Security Check: Security -> AI (Dashed line / Vertical)
    securityToAi: `M ${securityPos.x} ${securityPos.y} L ${aiNodePos.x} ${aiNodePos.y + 40}`,
    
    // Process Flow: AI -> Expert
    aiToExpert: `M ${aiNodePos.x} ${aiNodePos.y} L ${expertNodePos.x} ${expertNodePos.y}`,
    
    // Output Flows: Expert -> Outcomes
    expertToTrust: `M ${expertNodePos.x} ${expertNodePos.y} C ${expertNodePos.x + 50} ${expertNodePos.y}, ${trustPos.x - 50} ${trustPos.y}, ${trustPos.x} ${trustPos.y}`,
    expertToRoi: `M ${expertNodePos.x} ${expertNodePos.y} C ${expertNodePos.x + 50} ${expertNodePos.y}, ${roiPos.x - 50} ${roiPos.y}, ${roiPos.x} ${roiPos.y}`,
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden flex items-center justify-center">
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05),transparent_70%)] pointer-events-none" />

      <div className="relative w-full max-w-4xl h-full">
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
            <radialGradient id="roi-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0 0) rotate(90) scale(100)">
              <stop stopColor={COLORS.accent} stopOpacity="0.3" />
              <stop offset="1" stopColor={COLORS.accent} stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* ---- Connecting Beams ---- */}
          
          {/* 1. Integration feeding AI */}
          <Beam d={paths.dataToAi} delay={0} duration={2} />
          
          {/* 2. Security "Shielding" AI (Vertical beam) */}
          <Beam d={paths.securityToAi} delay={0} duration={3} dashArray="10 10" />
          
          {/* 3. AI handing off to Expert */}
          <Beam d={paths.aiToExpert} delay={0.5} duration={1.5} strokeWidth={3} dashArray="40 40" />

          {/* 4. Expert generating Outcomes */}
          <Beam d={paths.expertToTrust} delay={1.0} duration={2} />
          <Beam d={paths.expertToRoi} delay={1.2} duration={2} />

          {/* ---- Nodes ---- */}
          
          {/* 1. Integrations (Input) */}
          <g transform={`translate(${integrationsPos.x}, ${integrationsPos.y})`}>
            <SatelliteNode label="INTEGRATION" icon={<Database />} />
          </g>

          {/* 2. AI AGENT (The Processor) */}
          <g transform={`translate(${aiNodePos.x}, ${aiNodePos.y})`}>
            <CentralNode 
              label="AI AGENT" 
              icon={<BrainCircuit size={24} color={COLORS.primary} />} 
            />
          </g>

          {/* 3. Security (The Guard - below AI) */}
          <g transform={`translate(${securityPos.x}, ${securityPos.y})`}>
             {/* Simple Line connecting to AI visually */}
             <line x1="0" y1="0" x2="0" y2="-60" stroke={COLORS.faint} strokeDasharray="4 4" />
            <SatelliteNode label="Encrypted" icon={<ShieldCheck />} color="#ef4444" /> {/* Red/Amber tint for security */}
          </g>

          {/* 4. EXPERT (The Reviewer) */}
          <g transform={`translate(${expertNodePos.x}, ${expertNodePos.y})`}>
            <CentralNode label="EXPERT" icon={<User size={24} color={COLORS.primary} />} />
          </g>

          {/* 5. Trust (Outcome Top) */}
          <g transform={`translate(${trustPos.x}, ${trustPos.y})`}>
            <SatelliteNode label="Verified" icon={<BadgeCheck />} color={COLORS.accent} />
          </g>

          {/* 6. ROI (Outcome Bottom) */}
          <g transform={`translate(${roiPos.x}, ${roiPos.y})`}>
            <ROINode />
          </g>

        </svg>
      </div>
    </div>
  );
};

export default DualNodeNetwork;