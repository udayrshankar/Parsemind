import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Reveal } from './Reveal';

// Imported Visuals
import AgentSystemVisual from './Animation/CustomAI';
import FastResultsVisual from './Animation/FastResultsVisual';
import IntegrationsVisual from './Animation/IntegrationVisual';
import EnterpriseTrustVisual from './Animation/EnterpriceTrustVisual';

/* ------------------------------
   FLICKERING GRID (Unchanged)
-------------------------------- */
interface GridProps {
  gridGap?: number;
  gridColor?: string;
  flickerColor?: string;
  backgroundColor?: string;
  maxFlickers?: number;
  flickerChance?: number;
  maskCoverage?: string;
}

const FlickeringGrid = ({
  gridGap = 30,
  gridColor = "#333333",          
  flickerColor = "#737373",       
  backgroundColor = "#0a0a0a",    
  maxFlickers = 15,
  flickerChance = 0.05,
  maskCoverage = "70%",
}: GridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const hexToRgb = (hex: string) => {
    hex = hex.replace('#', '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const gridRgb = hexToRgb(gridColor);
    const flickerRgb = hexToRgb(flickerColor);

    let animationFrameId: number;
    let cols = 0;
    let rows = 0;
    let flickers: { id: number; r: number; c: number; opacity: number; dying: boolean }[] = [];

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
      cols = Math.ceil(canvas.width / gridGap);
      rows = Math.ceil(canvas.height / gridGap);
    };

    const drawGrid = () => {
      ctx.strokeStyle = `rgba(${gridRgb}, 1)`; 
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        ctx.moveTo(i * gridGap, 0);
        ctx.lineTo(i * gridGap, canvas.height);
      }
      for (let j = 0; j <= rows; j++) {
        ctx.moveTo(0, j * gridGap);
        ctx.lineTo(canvas.width, j * gridGap);
      }
      ctx.stroke();
    };

    const updateFlickers = () => {
      if (flickers.length < maxFlickers && Math.random() < flickerChance) {
        flickers.push({
          id: Math.random(),
          r: Math.floor(Math.random() * rows),
          c: Math.floor(Math.random() * cols),
          opacity: 0,
          dying: false
        });
      }
      flickers.forEach((f) => {
        if (f.dying) {
          f.opacity -= 0.02;
        } else {
          f.opacity += 0.02;
          if (f.opacity >= 0.5) f.dying = true;
        }
      });
      flickers = flickers.filter((f) => f.opacity > 0);
    };

    const drawFlickers = () => {
      flickers.forEach((f) => {
        ctx.fillStyle = `rgba(${flickerRgb}, ${f.opacity})`;
        ctx.fillRect(
          f.c * gridGap + 1,
          f.r * gridGap + 1,
          gridGap - 2,
          gridGap - 2
        );
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      updateFlickers();
      drawFlickers();
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridGap, gridColor, flickerColor, maxFlickers, flickerChance]);


  return (
    <div className="absolute inset-0 z-0" style={{ backgroundColor }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          maskImage: `radial-gradient(circle at center, black 0%, transparent ${maskCoverage})`,
          WebkitMaskImage: `radial-gradient(circle at center, black 0%, transparent ${maskCoverage})`
        }}
      />
    </div>
  );
};

// --- Feature Data ---
const features = [
  { 
    id: 0, 
    title: "Custom AI Agent Engineering", 
    description: "Enterprise-grade agentic AI systems purpose-built for your workflows, data landscape, and governance requirements.", 
    animation: <AgentSystemVisual />,
    mobileScale: 0.6
  },
  { 
    id: 1, 
    title: "Fast, Measurable Business Impact", 
    description: "Move from pilot to ROI quickly with production-ready agents that deliver efficiency gains and cost reduction.", 
    animation: <FastResultsVisual />,
    mobileScale: 0.6
  },
  { 
    id: 2, 
    title: "Seamless Enterprise Integration", 
    description: "Integrate AI agents directly into your existing systems, APIs, data platforms, and enterprise tools.", 
    animation: <IntegrationsVisual />,
    mobileScale: 0.52
  },
  { 
    id: 3, 
    title: "Trusted, Enterprise-Ready AI", 
    description: "Secure, compliant, and governed AI systems designed for regulated and mission-critical environments.", 
    animation: <EnterpriseTrustVisual />,
    mobileScale: 0.55
  },
];


// --- COMPONENT: Mobile Feature Item ---
// Handles the logic for scroll-triggered focus on small screens
const MobileFeatureItem = ({ feature, index }: { feature: any, index: number }) => {
  const ref = useRef(null);
  
  // Triggers when the element is in the middle viewport
  const isInView = useInView(ref, { margin: "-20% 0px -20% 0px", amount: 0.4 });

  return (
    <motion.div 
      ref={ref}
      animate={{ 
        opacity: isInView ? 1 : 0.3, 
        scale: isInView ? 1 : 0.98,
        filter: isInView ? "blur(0px)" : "blur(1px)"
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-12 border-b border-gray-100 pb-12 last:border-0 last:pb-0"
    >
      <div className="flex flex-col gap-6">
        
        {/* Header Text */}
        <div className="flex gap-4 items-start">
          {/* Removed rounded-full, made square */}
          <div className={`w-8 h-8 flex items-center justify-center shrink-0 border font-inter font-medium text-sm transition-colors duration-500
            ${isInView ? 'bg-black text-white border-black' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
            {index + 1}
          </div>
          <div>
            <h3 className={`text-xl font-semibold transition-colors duration-500 ${isInView ? 'text-black' : 'text-gray-400'}`}>
              {feature.title}
            </h3>
            <p className="text-gray-500 mt-2 text-base leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Animation Container - Removed rounded-xl */}
        <div className="w-full relative overflow-hidden border border-gray-200 bg-[#f7f6f2] h-[300px]">
          <FlickeringGrid
            gridGap={30}
            gridColor="#e4e3df"
            flickerColor="#A3A3A3"
            backgroundColor="#f7f6f2"
            maskCoverage="100%"
          />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {React.isValidElement(feature.animation) &&
              React.cloneElement(
                feature.animation as React.ReactElement<any>,
                { scale: feature.mobileScale }
              )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};


// --- MAIN COMPONENT ---
export const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex justify-center mb-12 md:mb-16">
          <Reveal>
            <span className="text-text-body uppercase mx-auto mb-2 block tracking-wider text-sm font-semibold text-gray-500">
              Production-ready capabilities
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 font-fraunces">
              Our Key Features
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* --- MOBILE LAYOUT (Stacked & Scroll Triggered) --- */}
          <div className="lg:hidden flex flex-col">
            {features.map((feature, index) => (
              <MobileFeatureItem key={feature.id} feature={feature} index={index} />
            ))}
          </div>


          {/* --- DESKTOP LAYOUT (Sticky Sidebar) --- */}
          
          {/* Left Column: Text List (Desktop Only) */}
          <div className="hidden lg:flex flex-col gap-2 relative z-10 pb-20">
            {features.map((feature, index) => {
              const isActive = activeIndex === index;
              return (
                <Reveal delay={feature.id * 0.1} key={feature.id}>
                  {/* Removed rounded-xl, now square */}
                  <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    className={`relative p-8 cursor-pointer transition-all duration-500 ease-out border overflow-hidden ${
                      isActive
                        ? 'bg-black border-black shadow-2xl scale-[1.02]'
                        : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-100'
                    }`}
                  >
                    <div className="flex gap-6 items-start relative z-10">
                      {/* Removed rounded-full, now square */}
                      <div
                        className={`w-10 h-10 flex rounded-full items-center justify-center shrink-0 border transition-colors duration-500 font-inter font-medium ${
                          isActive
                            ? 'border-white/20 text-black bg-white'
                            : 'border-gray-200 text-gray-500 bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3
                          className={`text-2xl font-semibold transition-colors duration-500 ${
                            isActive ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className={`text-lg leading-relaxed transition-colors duration-500 ${
                            isActive ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Sticky Animation (Desktop Only) */}
          {/* Removed rounded-2xl, now square */}
          <div className="hidden lg:block lg:sticky lg:top-32 lg:h-[600px] w-full overflow-hidden relative border border-gray-200 shadow-sm bg-[#f7f6f2]">
            <FlickeringGrid
              gridGap={40}
              gridColor="#e4e3df"
              flickerColor="#A3A3A3"
              backgroundColor="#f7f6f2"
              maskCoverage="100%"
            />
            <div className="relative z-30 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'circOut' }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  {React.isValidElement(features[activeIndex].animation) &&
                    React.cloneElement(
                      features[activeIndex].animation as React.ReactElement<any>,
                      { scale: 1 }
                    )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};