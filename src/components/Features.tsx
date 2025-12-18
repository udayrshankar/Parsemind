import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./Reveal";

// Imported Visuals
import FastResultsVisual from "./Animation/FastResultsVisual";
import IntegrationsVisual from "./Animation/IntegrationVisual";
import EnterpriseTrustVisual from "./Animation/EnterpriceTrustVisual";
import AgentSystemVisual from "./Animation/CustomAIDark"

/* ------------------------------
   FLICKERING GRID (SAME AS FOOTER)
-------------------------------- */

const FlickeringGrid = () => {
  const [squares, setSquares] = useState<
    { id: number; r: number; c: number; delay: number }[]
  >([]);

  useEffect(() => {
    const count = 35;
    const newSquares = Array.from({ length: count }).map((_, i) => ({
      id: i,
      r: Math.floor(Math.random() * 20),
      c: Math.floor(Math.random() * 20),
      delay: Math.random() * 5,
    }));
    setSquares(newSquares);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundPosition: "0 0",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          className="absolute bg-indigo-400/20 border border-indigo-400/30 shadow-[0_0_15px_rgba(129,140,248,0.3)]"
          style={{
            width: 40,
            height: 40,
            top: sq.r * 40,
            left: sq.c * 40,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.9, 1, 0.9] }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: sq.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* ------------------------------
   FEATURE DATA
-------------------------------- */

const features = [
  {
    id: 0,
    title: "Custom AI Agent Engineering",
    description:
      "Enterprise-grade agentic systems purpose-built for your workflows, data landscape, and governance requirements.",
    animation: <AgentSystemVisual />,
    mobileScale: 0.5,
  },
  {
    id: 1,
    title: "Fast, Measurable Business Impact",
    description:
      "Move from pilot to ROI quickly with production-ready agents that deliver efficiency gains and cost reduction.",
    animation: <FastResultsVisual />,
    mobileScale: 0.45,
  },
  {
    id: 2,
    title: "Seamless Enterprise Integration",
    description:
      "Integrate AI agents directly into your existing systems, APIs, data platforms, and enterprise tools.",
    animation: <IntegrationsVisual />,
    mobileScale: 0.45,
  },
  {
    id: 3,
    title: "Trusted, Enterprise-Ready AI",
    description:
      "Secure, compliant, and governed AI systems designed for regulated and mission-critical environments.",
    animation: <EnterpriseTrustVisual />,
    mobileScale: 0.55,
  },
];

/* ------------------------------
   FEATURES COMPONENT
-------------------------------- */

export const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth >= 1024) {
      setActiveIndex(index);
    }
  };

  return (
    <section className="px-6 md:px-12 relative">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center flex justify-center mb-10">
          <Reveal>
            <span className="text-text-body uppercase mx-auto mb-1 block">
              Production-ready capabilities
            </span>
            <h2 className="type-h2 text-text-main">
              Our Key Features
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">

          {/* LEFT: Feature List */}
          <div className="flex flex-col gap-2 relative z-10 pb-20">
            {features.map((feature, index) => {
              const isActive = activeIndex === index;

              return (
                <Reveal delay={feature.id * 0.1} key={feature.id}>
                  <div
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => setActiveIndex(index)}
                    className={`relative p-6 md:p-8 cursor-pointer transition-all duration-500 ease-out border overflow-hidden ${
                      isActive
                        ? "lg:bg-black lg:border-black lg:shadow-2xl lg:scale-[1.02] bg-white border-gray-200"
                        : "bg-bg-card border-transparent hover:bg-gray-50 hover:border-gray-100"
                    }`}
                  >
                    <div className="flex gap-6 items-start relative z-10">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 font-medium ${
                          isActive
                            ? "lg:border-white/20 lg:text-black lg:bg-white border-gray-200 text-gray-900 bg-gray-100"
                            : "border-gray-200 text-gray-500 bg-gray-50"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex flex-col gap-3">
                        <h3
                          className={`text-2xl font-semibold transition-colors duration-500 ${
                            isActive ? "lg:text-white text-gray-900" : "text-gray-900"
                          }`}
                        >
                          {feature.title}
                        </h3>

                        <p
                          className={`text-base leading-relaxed transition-colors duration-500 ${
                            isActive ? "lg:text-gray-400 text-gray-500" : "text-gray-500"
                          }`}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Visual */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "circOut" }}
                          className="lg:hidden w-full relative overflow-hidden"
                        >
                          <div className="relative w-full h-[350px] mt-6 border border-gray-100 bg-[#f7f6f2] overflow-hidden">
                            <FlickeringGrid />
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                              {React.cloneElement(
                                feature.animation as React.ReactElement<any>,
                                { scale: feature.mobileScale }
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* RIGHT: Sticky Visual */}
          <div className="hidden lg:block lg:sticky lg:top-32 lg:h-[600px] w-full overflow-hidden relative border border-gray-200 shadow-sm bg-black isolate">
            <FlickeringGrid />


            <div className="relative z-30 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {React.cloneElement(
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
