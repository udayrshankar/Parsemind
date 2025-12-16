import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Reveal } from './Reveal';

// Imported Visuals
import AgentSystemVisual from './Animation/CustomAI';
import FastResultsVisual from './Animation/FastResultsVisual';
import IntegrationsVisual from './Animation/IntegrationVisual';
import EnterpriseTrustVisual from './Animation/EnterpriceTrustVisual';

/* ------------------------------
   1. FLICKERING GRID (Hex Props Version)
-------------------------------- */

interface GridProps {
  gridGap?: number;          // Size of the squares
  gridColor?: string;        // Hex Code (e.g. #333333)
  flickerColor?: string;     // Hex Code (e.g. #737373)
  backgroundColor?: string;  // Hex Code (e.g. #0a0a0a)
  maxFlickers?: number;      // Max squares active at once
  flickerChance?: number;    // Probability of spawning a flicker
  maskCoverage?: string;     // How big the spotlight is (CSS percentage)
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
      // Opacity is set to 0.4 for distinct but subtle lines
      ctx.strokeStyle = `rgba(${gridRgb}, 0.4)`; 
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
          dying: false,
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
        ctx.fillRect(f.c * gridGap + 1, f.r * gridGap + 1, gridGap - 2, gridGap - 2);
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
    <div 
      className="absolute inset-0 z-0"
      style={{ backgroundColor: backgroundColor }} 
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{
          // Use 'white' in the gradient to mask properly on a light background if needed, 
          // but 'transparent' usually works best for the fade out.
          maskImage: `radial-gradient(circle at center, black 0%, transparent ${maskCoverage})`,
          WebkitMaskImage: `radial-gradient(circle at center, black 0%, transparent ${maskCoverage})`
        }}
      />
    </div>
  );
};


// --- Feature Data (Unchanged) ---
const features = [
  {
    id: 0,
    title: "Custom AI Agent Engineering",
    description: "We architect, deploy, and maintain AI systems tailored specifically to your business goals and infrastructure.",
    animation: <AgentSystemVisual/>
  },
  {
    id: 1,
    title: "Achieve Fast Results",
    description: "Track ROI and efficiency gains with custom dashboards designed to visualize your AI impact in real-time.",
    animation: <FastResultsVisual/>
  },
  {
    id: 2,
    title: "Integrate With Tools You Use",
    description: "Seamlessly connect our agents with your existing stack—Slack, Salesforce, HubSpot, and proprietary databases.",
    animation: <IntegrationsVisual/>
  },
  {
    id: 3,
    title: "Trusted, Enterprise-Ready AI",
    description: "Deliver safe, reliable, and transparent generative AI that adheres to strict enterprise compliance standards.",
    animation: <EnterpriseTrustVisual/>
  },
];

export const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="px-4 md:px-6 py-16 md:py-10 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center flex justify-center mb-8 md:mb-10">
          <Reveal>
            <span className="text-text-body uppercase mx-auto mb-1 block">
              Unique Features
            </span>
            <h2 className="type-h2 text-text-main">Our Key Features</h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col gap-2 relative z-10 pb-20">
            {features.map((feature, index) => {
              const isActive = activeIndex === index;
              return (
                <Reveal delay={feature.id * 0.1} key={feature.id}>
                  <div
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`
                      relative p-6 md:p-8 cursor-pointer transition-all duration-500 ease-out border
                      ${
                        isActive
                          ? 'bg-black border-black shadow-2xl scale-[1.02]'
                          : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-100'
                      }
                    `}
                  >
                    {isActive && <div className="absolute inset-0 bg-black -z-10" />}
                    <div className="flex gap-6 items-start relative z-10">
                      <div
                        className={`
                          w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 font-inter font-medium
                          ${
                            isActive
                              ? 'border-white/20 text-black bg-white'
                              : 'border-gray-200 text-gray-500 bg-gray-50'
                          }
                        `}
                      >
                        {index + 1}
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className={`text-xl md:text-2xl font-semibold transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                          {feature.title}
                        </h3>
                        <p className={`text-base md:text-lg leading-relaxed transition-colors duration-500 ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="hidden lg:block lg:sticky lg:top-32 lg:h-[730px] w-full overflow-hidden relative border border-gray-200 rounded-2xl shadow-sm">
            
            {/* --------------------------------------------------
                DULL WHITE THEME
            -------------------------------------------------- */}
            <FlickeringGrid 
              gridGap={40}
              gridColor="#E5E5E5"        // Light Gray Lines
              flickerColor="#A3A3A3"     // Medium Gray Flickers
              backgroundColor="#FAFAFA"  // Dull White Background
              maskCoverage="70%" 
            />
            {/* -------------------------------------------------- */}

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
                  {features[activeIndex].animation}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};