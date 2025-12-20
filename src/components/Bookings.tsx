// src/components/Booking.tsx
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendly } from "./hooks/useCalendly";
import { useState, useEffect, useMemo } from "react";

// --- Helper to get dynamic dates ---
const getUpcomingDates = () => {
  const dates = [];
  const today = new Date();
  
  // Generate current date + next 4 days
  for (let i = 0; i < 5; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    
    dates.push({
      month: nextDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: nextDate.getDate(),
      weekday: nextDate.toLocaleDateString('en-US', { weekday: 'long' }),
      key: nextDate.toISOString() // Unique key for React
    });
  }
  return dates;
};

// --- Reusable Card UI ---
const CalendarCard = ({ date, isBackCard = false }: { date: any, isBackCard?: boolean }) => (
  <div className={`absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col ${isBackCard ? 'z-0' : 'z-10 shadow-xl'}`}>
    {/* Binder Rings */}
    <div className="absolute top-0 left-0 right-0 flex justify-evenly -mt-2 z-20">
        <div className="w-3 h-6 bg-gray-200 rounded-full border border-gray-300" />
        <div className="w-3 h-6 bg-gray-200 rounded-full border border-gray-300" />
    </div>

    {/* Header (Month) */}
    <div className="bg-red-500 h-14 md:h-16 flex items-center justify-center pt-2">
      <span className="text-white font-bold tracking-widest text-lg font-inter">
        {date.month}
      </span>
    </div>

    {/* Body (Day) */}
    <div className="flex-1 flex flex-col items-center justify-center bg-white relative">
      <span className="text-6xl md:text-7xl font-bold text-gray-800 font-inter tracking-tighter">
        {date.day}
      </span>
      <span className="text-gray-400 font-medium text-sm mt-2 uppercase tracking-wide">
        {date.weekday}
      </span>
      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/5 to-transparent pointer-events-none" />
    </div>
  </div>
);

// --- The Fixed Animation Component ---
const FlippingCalendar = () => {
  const dates = useMemo(() => getUpcomingDates(), []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dates.length);
    }, 2200); 
    return () => clearInterval(timer);
  }, [dates.length]);

  const currentDate = dates[currentIndex];
  const nextDate = dates[(currentIndex + 1) % dates.length];

  return (
    <div className="flex items-center justify-center w-full h-full bg-[#fcfcfc] perspective-1000">
      <div className="relative w-48 h-56 md:w-56 md:h-64 preserve-3d">
        
        {/* 1. The Static Card (The one BEHIND) */}
        {/* We render this statically so when the top one flies off, this is waiting underneath */}
        <CalendarCard date={nextDate} isBackCard={true} />

        {/* 2. The AnimatePresence Wrapper (The one FLIPPING) */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentDate.key} // Key change triggers the animation
            className="absolute inset-0 origin-top"
            initial={{ rotateX: 0, opacity: 1, zIndex: 20 }}
            animate={{ rotateX: 0, opacity: 1, y: 0 }}
            exit={{ 
              rotateX: -140, // Flips down/forward
              y: 20, 
              opacity: 0,
              zIndex: 30, // Stay on top while leaving
              transition: { duration: 0.6, ease: "easeInOut" } 
            }}
          >
             <CalendarCard date={currentDate} />
          </motion.div>
        </AnimatePresence>
        
        {/* Floor Shadow */}
        <div className="absolute -bottom-6 left-4 right-4 h-4 bg-black/10 blur-xl rounded-full" />
      </div>
    </div>
  );
};

// --- Main Component ---

const benefits = [
  "Strategic AI Consulting",
  "Custom, Solution-Driven Approach",
  "AI System Integration",
  "Ongoing Support & Optimization",
];

declare global {
  interface Window {
    Calendly: any;
  }
}

export const Booking = () => {
  const { loadScript, openPopup } = useCalendly();

  return (
    <section id="booking" className="bg-white px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#f7f8fa] border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl relative w-full z-10 min-h-[600px] md:min-h-[550px] flex flex-col justify-center overflow-hidden">
          
          <div className="absolute top-6 left-6 flex gap-2 z-20 opacity-50">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full pt-3 lg:pt-0"
            >
              
              {/* Left Column */}
              <div className="flex flex-col justify-center order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-fraunces text-black mb-2 leading-[1.1]">
                  Let’s Talk About Your Enterprise AI Strategy
                </h2>

                <p className="text-lg md:text-xl text-gray-600 font-inter leading-relaxed mb-4">
                  Align business objectives, operating models, and technology with a clear,
                  execution-ready AI strategy <br/> built for real production environments.
                </p>

                <ul className="space-y-2 mb-4">
                  {benefits.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                      <p className="text-base md:text-lg text-gray-600 font-inter leading-relaxed">
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onMouseEnter={loadScript}
                    onClick={openPopup}
                    className="bg-black text-white px-8 py-4 rounded-full font-medium font-inter hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg w-full md:w-auto"
                  >
                    Talk to Our AI Strategy Experts
                  </button>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="order-1 lg:order-2 w-full h-full flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  className="relative w-full aspect-video md:aspect-4/3 rounded-xl overflow-hidden shadow-xl border border-black/5 bg-white group"
                >
                  <FlippingCalendar />
                  
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};