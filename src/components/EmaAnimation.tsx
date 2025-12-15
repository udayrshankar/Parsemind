import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Slack, 
  Bot, 
  DollarSign, 
  Database, 
  Mail, 
  Layers,
  Server
} from 'lucide-react';

// --- Types ---

export interface CardItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
}

export interface EmaFlowProps {
  // Dimensions
  width?: number | string;   
  height?: number | string;  
  
  // Scaling Controls
  centerScale?: number;      // Scale for the central processing nodes
  secondaryScale?: number;   // Scale for Inputs and Outputs
  
  // Layout Direction
  stacking?: 'h' | 'v'; // 'h' = Horizontal, 'v' = Vertical

  // Colors
  themeColor?: string;      
  primaryColor?: string;    
  secondaryColor?: string;  
  textColor?: string;       
  
  // Data
  inputs?: CardItem[];
  centers?: CardItem[];
  outputs?: CardItem[];
  
  speed?: number;
}

// --- Helper: Color Converter ---
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// --- Helper: Path Generator ---
const getOrthogonalPath = (
  x1: number, y1: number, 
  x2: number, y2: number, 
  bend: number, 
  orientation: 'h' | 'v',
  radius: number = 20
) => {
  const isHoriz = orientation === 'h';
  
  const distMain = isHoriz ? Math.abs(bend - x1) : Math.abs(bend - y1);
  const distCross = isHoriz ? Math.abs(y2 - y1) : Math.abs(x2 - x1);
  const safeRadius = Math.min(radius, distCross / 2, distMain);

  const dirCross = (isHoriz ? y2 > y1 : x2 > x1) ? 1 : -1;

  if (isHoriz) {
    if (Math.abs(y1 - y2) < 1) return `M ${x1} ${y1} L ${x2} ${y2}`;
    return `
      M ${x1} ${y1}
      L ${bend - safeRadius} ${y1}
      Q ${bend} ${y1} ${bend} ${y1 + safeRadius * dirCross}
      L ${bend} ${y2 - safeRadius * dirCross}
      Q ${bend} ${y2} ${bend + safeRadius} ${y2}
      L ${x2} ${y2}
    `;
  } else {
    // Vertical Logic
    if (Math.abs(x1 - x2) < 1) return `M ${x1} ${y1} L ${x2} ${y2}`;
    return `
      M ${x1} ${y1}
      L ${x1} ${bend - safeRadius}
      Q ${x1} ${bend} ${x1 + safeRadius * dirCross} ${bend}
      L ${x2 - safeRadius * dirCross} ${bend}
      Q ${x2} ${bend} ${x2} ${bend + safeRadius}
      L ${x2} ${y2}
    `;
  }
};

// --- Sub-Component: Connection Line ---
const ConnectionLine = ({ 
  startX, startY, endX, endY, bend, orientation,
  isActive, themeColor, duration, delay
}: { 
  startX: number, startY: number, endX: number, endY: number, bend: number, orientation: 'h'|'v',
  isActive: boolean, themeColor: string, duration: number, delay: number 
}) => {
  const pathData = getOrthogonalPath(startX, startY, endX, endY, bend, orientation);

  return (
    <>
      <path d={pathData} fill="none" stroke="#e2e8f0" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      <motion.path 
        d={pathData}
        fill="none" 
        stroke={themeColor} 
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0 15"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { 
          pathLength: [0, 1], 
          strokeDashoffset: [0, -30], 
          opacity: [0, 1, 1, 0]
        } : { opacity: 0 }}
        transition={{ duration: duration, ease: "linear", delay: delay }}
      />
    </>
  );
};

// --- Sub-Component: Node Card ---
const NodeCard = ({ 
  item, x, y, size, scale, isActive, isCenter = false,
  themeColor, primaryColor, secondaryColor, textColor, stacking
}: { 
  item: CardItem, x: number, y: number, size: number, scale: number, isActive: boolean, isCenter?: boolean,
  themeColor: string, primaryColor: string, secondaryColor: string, textColor: string, stacking: 'h' | 'v'
}) => {
  
  const iconProps = { size: 24 * scale, color: secondaryColor };
  const scaledIcon = React.isValidElement(item.icon) 
    // @ts-ignore
    ? React.cloneElement(item.icon, iconProps) 
    : item.icon;

  const shadowColor = hexToRgba(themeColor, 0.2);
  const isVertical = stacking === 'v';

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center z-10"
      style={{ left: x - size/2, top: y - size/2, width: size, height: size }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={`relative w-full h-full border flex items-center justify-center shadow-sm transition-all duration-300
          ${isCenter ? 'rounded-[20%]' : 'rounded-[18%]'}
        `}
        style={{ 
          backgroundColor: primaryColor,
          borderColor: isActive ? themeColor : (isCenter ? '#cbd5e1' : '#f1f5f9')
        }}
        animate={isActive ? { 
          boxShadow: `0 ${10 * scale}px ${25 * scale}px -${5 * scale}px ${shadowColor}`,
          scale: 1.1
        } : { scale: 1 }}
      >
        <div style={{ color: secondaryColor }}>{scaledIcon}</div>
        
        {isActive && (
          <span className="absolute -top-1 -right-1 flex" style={{ width: 12 * scale, height: 12 * scale }}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: themeColor }}></span>
            <span className="relative inline-flex rounded-full h-full w-full" style={{ backgroundColor: themeColor }}></span>
          </span>
        )}
      </motion.div>

      {/* --- SAFE TEXT POSITIONING --- */}
      <div 
        className="absolute"
        style={isVertical ? {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: 15 * scale,
          textAlign: 'left',
          width: 'max-content',
          maxWidth: 120 * scale,
        } : {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: 10 * scale,
          textAlign: 'center',
          width: 'max-content',
          maxWidth: 140 * scale
        }}
      >
        <div 
          className="font-bold whitespace-normal leading-tight" 
          style={{ 
            color: textColor, 
            fontSize: `${0.75 * scale}rem`
          }}
        >
          {item.label}
        </div>
        {item.subLabel && (
          <div 
            className="whitespace-normal leading-tight mt-0.5 opacity-80" 
            style={{ 
              color: textColor,
              fontSize: `${0.65 * scale}rem` 
            }}
          >
            {item.subLabel}
          </div>
        )}
      </div>
    </motion.div>
  );
};


// --- MAIN COMPONENT ---
const EmaAnimation = ({
  width = '100%',
  height = 500,
  
  // Independent Scaling Controls
  centerScale = 1.2,    // Default: slightly larger center nodes
  secondaryScale = 0.8, // Default: slightly smaller inputs/outputs
  
  stacking = 'h', 
  themeColor = '#10b981', 
  primaryColor = '#ffffff',
  secondaryColor = '#475569',
  textColor = '#334155',
  
  inputs = [
    { id: 'in1', icon: <Slack />, label: 'Slack' },
    { id: 'in2', icon: <Mail />, label: 'Email' },
  ],
  centers = [
    { id: 'c1', icon: <Layers />, label: 'Ingest' },
    { id: 'c2', icon: <Bot />, label: 'AI Agent' },
    { id: 'c3', icon: <Server />, label: 'Action' },
  ],
  outputs = [
    { id: 'out1', icon: <DollarSign />, label: 'Revenue' },
    { id: 'out2', icon: <Database />, label: 'CRM' },
  ],
  speed = 6
}: EmaFlowProps) => {

  const BASE_SIZE = 80;
  // Calculate distinct sizes
  const centerSize = BASE_SIZE * centerScale;
  const secondarySize = BASE_SIZE * secondaryScale;

  // --- Animation Loop ---
  const [activeIndex, setActiveIndex] = useState(-2); 
  const [transitionIndex, setTransitionIndex] = useState(-2);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 800, h: 500 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setDim({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight });
      }
    };
    updateSize();
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const totalSteps = centers.length + 2; 
    const stepDuration = (speed * 1000) / totalSteps;
    let isMounted = true;

    const runSequence = async () => {
      if (!isMounted) return;
      setActiveIndex(-1); setTransitionIndex(-2);
      await new Promise(r => setTimeout(r, stepDuration * 0.5)); 

      setTransitionIndex(-1); 
      await new Promise(r => setTimeout(r, stepDuration));

      for (let i = 0; i < centers.length; i++) {
        if (!isMounted) return;
        setActiveIndex(i); 
        if (i < centers.length - 1) {
           await new Promise(r => setTimeout(r, stepDuration * 0.5));
           setTransitionIndex(i); 
           await new Promise(r => setTimeout(r, stepDuration));
        }
      }

      await new Promise(r => setTimeout(r, stepDuration * 0.5));
      setTransitionIndex(centers.length - 1); 
      await new Promise(r => setTimeout(r, stepDuration));

      setActiveIndex(centers.length); 
      await new Promise(r => setTimeout(r, stepDuration * 1.5));
      
      setActiveIndex(-2); setTransitionIndex(-2); 
    };

    runSequence();
    const interval = setInterval(runSequence, speed * 1000 + 1000);
    return () => { isMounted = false; clearInterval(interval); };
  }, [speed, centers.length]);

  // --- Dynamic Layout Engine ---
  const { w: W, h: H } = dim;
  const isHoriz = stacking === 'h';

  const getSpreadPos = (index: number, count: number, length: number, padding: number, scale: number) => {
    // Dynamic padding based on the scale of the specific card type
    const safePadding = padding + (30 * scale); 
    const available = length - (safePadding * 2);
    if (count <= 1) return length / 2;
    const step = available / (count - 1);
    return safePadding + (index * step);
  };

  const ZONE_IN = isHoriz ? W * 0.18 : H * 0.18;
  const ZONE_OUT = isHoriz ? W * 0.82 : H * 0.82;
  const ZONE_MID_START = isHoriz ? W * 0.35 : H * 0.35;
  const ZONE_MID_END = isHoriz ? W * 0.65 : H * 0.65;

  const getInputPos = (i: number) => {
    const x = isHoriz ? ZONE_IN : getSpreadPos(i, inputs.length, W, 80 * secondaryScale, secondaryScale);
    const y = isHoriz ? getSpreadPos(i, inputs.length, H, 60 * secondaryScale, secondaryScale) : ZONE_IN;
    return { x, y };
  };

  const getOutputPos = (i: number) => {
    const x = isHoriz ? ZONE_OUT : getSpreadPos(i, outputs.length, W, 80 * secondaryScale, secondaryScale);
    const y = isHoriz ? getSpreadPos(i, outputs.length, H, 60 * secondaryScale, secondaryScale) : ZONE_OUT;
    return { x, y };
  };

  const getCenterPos = (i: number) => {
    const midLength = isHoriz ? (ZONE_MID_END - ZONE_MID_START) : (ZONE_MID_END - ZONE_MID_START);
    const spreadOffset = centers.length <= 1 
        ? midLength / 2 
        : (i * (midLength / (centers.length - 1)));
    const x = isHoriz ? (ZONE_MID_START + spreadOffset) : (W / 2);
    const y = isHoriz ? (H / 2) : (ZONE_MID_START + spreadOffset);
    return { x, y };
  };

  const BEND_IN_CENTER = (ZONE_IN + ZONE_MID_START) / 2; 
  const BEND_CENTER_OUT = (ZONE_MID_END + ZONE_OUT) / 2;
  
  // Connection offsets based on card sizes
  const secondaryOffset = secondarySize / 2;
  const centerOffset = centerSize / 2;

  return (
    <div 
      ref={containerRef}
      className="relative rounded-xl overflow-hidden font-sans "
      style={{ width: width, height: height }}
    >
        

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          
          {/* A. Inputs (Secondary) -> First Center */}
          {inputs.map((_, i) => {
            const start = getInputPos(i);
            const end = getCenterPos(0);
            return (
              <ConnectionLine
                key={`line-in-${i}`}
                // Use secondaryOffset for start, centerOffset for end
                startX={isHoriz ? start.x + secondaryOffset : start.x}
                startY={isHoriz ? start.y : start.y + secondaryOffset}
                endX={isHoriz ? end.x - centerOffset : end.x}
                endY={isHoriz ? end.y : end.y - centerOffset}
                bend={BEND_IN_CENTER}
                orientation={stacking}
                isActive={transitionIndex === -1}
                themeColor={themeColor}
                duration={0.8} delay={0}
              />
            );
          })}

          {/* B. Center -> Center Chain */}
          {centers.map((_, i) => {
            if (i === centers.length - 1) return null;
            const start = getCenterPos(i);
            const end = getCenterPos(i + 1);
            const midBend = isHoriz ? (start.x + end.x) / 2 : (start.y + end.y) / 2;
            return (
              <ConnectionLine
                key={`line-mid-${i}`}
                // Use centerOffset for both ends
                startX={isHoriz ? start.x + centerOffset : start.x}
                startY={isHoriz ? start.y : start.y + centerOffset}
                endX={isHoriz ? end.x - centerOffset : end.x}
                endY={isHoriz ? end.y : end.y - centerOffset}
                bend={midBend}
                orientation={stacking}
                isActive={transitionIndex === i}
                themeColor={themeColor}
                duration={0.8} delay={0}
              />
            );
          })}

          {/* C. Last Center -> Outputs (Secondary) */}
          {outputs.map((_, i) => {
            const start = getCenterPos(centers.length - 1);
            const end = getOutputPos(i);
            return (
              <ConnectionLine
                key={`line-out-${i}`}
                // Use centerOffset for start, secondaryOffset for end
                startX={isHoriz ? start.x + centerOffset : start.x}
                startY={isHoriz ? start.y : start.y + centerOffset}
                endX={isHoriz ? end.x - secondaryOffset : end.x}
                endY={isHoriz ? end.y : end.y - secondaryOffset}
                bend={BEND_CENTER_OUT}
                orientation={stacking}
                isActive={transitionIndex === centers.length - 1}
                themeColor={themeColor}
                duration={0.8} delay={0}
              />
            );
          })}
        </svg>

        {inputs.map((item, i) => {
          const pos = getInputPos(i);
          return <NodeCard key={item.id} item={item} x={pos.x} y={pos.y} size={secondarySize} scale={secondaryScale} isActive={activeIndex === -1} 
                  themeColor={themeColor} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} stacking={stacking} />;
        })}
        {centers.map((item, i) => {
          const pos = getCenterPos(i);
          return <NodeCard key={item.id} item={item} x={pos.x} y={pos.y} size={centerSize} scale={centerScale} isActive={activeIndex === i} isCenter={true} 
                  themeColor={themeColor} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} stacking={stacking} />;
        })}
        {outputs.map((item, i) => {
          const pos = getOutputPos(i);
          return <NodeCard key={item.id} item={item} x={pos.x} y={pos.y} size={secondarySize} scale={secondaryScale} isActive={activeIndex === centers.length} 
                  themeColor={themeColor} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} stacking={stacking} />;
        })}
    </div>
  );
};

export default EmaAnimation;