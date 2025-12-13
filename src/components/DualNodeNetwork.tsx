import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Database,
  Shield,
  TrendingUp,
  Server,
  Globe,
} from 'lucide-react';

/* ---------------- CONFIG ---------------- */

const COLORS = {
  primary: '#FBBF24',
  secondary: '#D97706',
  glow: 'rgba(251,191,36,0.5)',
  faint: 'rgba(251,191,36,0.12)',
  bg: '#000000',
};

const TEXT_SIZE = 12;

/** 🔒 SINGLE SOURCE OF TRUTH */
const NODE_RADIUS = 26; // ALL nodes use this

/* ---------------- TYPES ---------------- */

interface BeamProps {
  d: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  dashArray?: string;
  reverse?: boolean;
}

interface CenteredIconProps {
  scale?: number;
  children: React.ReactNode;
}

interface CentralNodeProps {
  label: string;
  icon?: React.ReactNode;
  variant?: 'circle' | 'hex';
}

interface IntegrationNodeProps {
  x: number;
  y: number;
  icon: React.ReactNode;
  label: string;
}

interface SecurityBadgeProps {
  x: number;
  y: number;
}

interface RoiPanelProps {
  x: number;
  y: number;
}

/* ---------------- UTILS ---------------- */

/** Perfect regular hexagon path */
function hexPath(r: number) {
  const a = Math.PI / 3;
  return Array.from({ length: 6 })
    .map((_, i) => {
      const x = r * Math.cos(a * i - Math.PI / 6);
      const y = r * Math.sin(a * i - Math.PI / 6);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ') + ' Z';
}

/* ---------------- BEAM ---------------- */

const Beam: React.FC<BeamProps> = ({
  d,
  delay = 0,
  duration = 8,
  strokeWidth = 1.5,
  dashArray = '60 160',
  reverse = false,
}) => (
  <g>
    <path d={d} stroke={COLORS.faint} strokeWidth={1} fill="none" />
    <motion.path
      d={d}
      fill="none"
      stroke={COLORS.primary}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={dashArray}
      initial={{ strokeDashoffset: reverse ? -300 : 300, opacity: 0 }}
      animate={{
        strokeDashoffset: reverse ? 300 : -300,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
        delay,
      }}
    />
  </g>
);

/* ---------------- ICON WRAPPER ---------------- */

const CenteredIcon: React.FC<CenteredIconProps> = ({
  scale = 1,
  children,
}) => (
  <g transform={`scale(${scale})`}>
    <g transform="translate(-12,-12)">{children}</g>
  </g>
);

/* ---------------- CENTRAL NODE ---------------- */

const CentralNode: React.FC<CentralNodeProps> = ({
  label,
  icon,
  variant = 'circle',
}) => {
  const shape =
    variant === 'hex' ? (
      <path d={hexPath(NODE_RADIUS)} />
    ) : (
      <circle r={NODE_RADIUS} />
    );

  return (
    <g>
      {/* Glow */}
      <motion.circle
        r={NODE_RADIUS * 2}
        fill="url(#nodeGlow)"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Outer rotating ring */}
      <motion.circle
        r={NODE_RADIUS * 1.6}
        fill="none"
        stroke={COLORS.faint}
        strokeDasharray="6 10"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      />

      {/* Core shape */}
      <g
        fill="#0A0A0A"
        stroke={COLORS.primary}
        strokeWidth={2}
      >
        {shape}
      </g>

      {/* Icon */}
      {icon && (
        <CenteredIcon scale={1}>
          {icon}
        </CenteredIcon>
      )}

      {/* Label */}
      <foreignObject
        x={-70}
        y={NODE_RADIUS + 26}
        width={140}
        height={40}
      >
        <div className="flex flex-col items-center">
          <span
            style={{
              fontSize: TEXT_SIZE,
              fontFamily: 'monospace',
              letterSpacing: '0.2em',
              color: COLORS.primary,
            }}
          >
            {label}
          </span>
          <div
            style={{
              marginTop: 6,
              height: 1,
              width: 48,
              background:
                'linear-gradient(90deg, transparent, #D97706, transparent)',
            }}
          />
        </div>
      </foreignObject>
    </g>
  );
};

/* ---------------- INTEGRATION NODE ---------------- */

const IntegrationNode: React.FC<IntegrationNodeProps> = ({
  x,
  y,
  icon,
  label,
}) => (
  <g transform={`translate(${x},${y})`}>
    <circle
      r={NODE_RADIUS}
      fill="#0A0A0A"
      stroke={COLORS.primary}
      strokeWidth={2}
    />

    <CenteredIcon scale={1}>
      {icon}
    </CenteredIcon>

    <text
      y={NODE_RADIUS + 22}
      textAnchor="middle"
      fill={COLORS.primary}
      fontSize={TEXT_SIZE}
      fontFamily="monospace"
      opacity={0.9}
    >
      {label}
    </text>
  </g>
);

/* ---------------- SECURITY ---------------- */

const SecurityBadge: React.FC<SecurityBadgeProps> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <motion.circle
      r={NODE_RADIUS}
      fill={COLORS.faint}
      animate={{ opacity: [0.2, 0.45, 0.2] }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    <motion.path
      d={hexPath(NODE_RADIUS * 0.9)}
      fill="none"
      stroke={COLORS.primary}
      strokeDasharray="4 4"
      animate={{ rotate: -360 }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
    />

    <CenteredIcon scale={0.9}>
      <Shield size={24} color={COLORS.primary} />
    </CenteredIcon>
  </g>
);

/* ---------------- ROI ---------------- */

const RoiPanel: React.FC<RoiPanelProps> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <rect
      x={-90}
      y={-40}
      width={180}
      height={80}
      rx={4}
      fill="rgba(10,10,10,0.85)"
      stroke={COLORS.faint}
    />
    <text
      x={-74}
      y={-18}
      fill={COLORS.primary}
      fontSize={TEXT_SIZE}
      fontFamily="monospace"
    >
      ROI PROJECTION
    </text>
    <text
      x={-74}
      y={8}
      fill={COLORS.primary}
      fontSize={TEXT_SIZE}
      fontWeight="bold"
      fontFamily="monospace"
    >
      +245%
    </text>

    <g transform="translate(64,-24)">
      <CenteredIcon scale={0.6}>
        <TrendingUp size={24} color={COLORS.primary} />
      </CenteredIcon>
    </g>
  </g>
);

/* ---------------- MAIN ---------------- */

const AdvancedNetwork: React.FC = () => {
  const width = 1100;
  const height = 660;
  const cy = height / 2;

  const ai = { x: width * 0.38, y: cy };
  const expert = { x: width * 0.62, y: cy };
  const roi = { x: expert.x + 260, y: cy };

  const integrations: IntegrationNodeProps[] = [
    { x: 140, y: cy - 120, label: 'DB_SYNC', icon: <Database color={COLORS.primary} /> },
    { x: 140, y: cy, label: 'API_GW', icon: <Server color={COLORS.primary} /> },
    { x: 140, y: cy + 120, label: 'WEB_HOOK', icon: <Globe color={COLORS.primary} /> },
  ];

  return (
    <div className="relative w-full h-[660px]">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <radialGradient id="nodeGlow">
            <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.35} />
            <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0} />
          </radialGradient>
        </defs>

        {integrations.map((n, i) => (
          <React.Fragment key={n.label}>
            <Beam
              d={`M 140 ${n.y} C 220 ${n.y}, ${ai.x - 90} ${ai.y}, ${ai.x} ${ai.y}`}
              delay={i * 0.4}
            />
            <IntegrationNode {...n} />
          </React.Fragment>
        ))}

        <Beam d={`M ${ai.x} ${ai.y} L ${expert.x} ${expert.y}`} strokeWidth={3} />
        <SecurityBadge x={(ai.x + expert.x) / 2} y={cy - 80} />
        <Beam
          d={`M ${expert.x} ${expert.y} C ${expert.x + 90} ${cy}, ${expert.x + 180} ${cy}, ${roi.x} ${cy}`}
          strokeWidth={2.5}
        />

        <RoiPanel x={roi.x} y={roi.y} />

        <g transform={`translate(${ai.x},${ai.y})`}>
          <CentralNode label="AI AGENT" variant="hex" />
        </g>

        <g transform={`translate(${expert.x},${expert.y})`}>
          <CentralNode
            label="EXPERT"
            icon={<User size={24} color={COLORS.primary} />}
          />
        </g>
      </svg>
    </div>
  );
};

export default AdvancedNetwork;
