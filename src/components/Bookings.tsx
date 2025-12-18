// src/components/Booking.tsx
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCalendly } from "./hooks/useCalendly";

import CalendarImage from "../assets/Calendar.png";

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
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full pt-8 lg:pt-0"
            >
              
              {/* Left Column */}
              <div className="flex flex-col justify-center order-2 lg:order-1">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-fraunces text-black mb-6 leading-[1.1]">
                  Let’s Talk About Your Enterprise AI Strategy
                </h2>

                <p className="text-lg md:text-xl text-gray-600 font-inter leading-relaxed mb-8">
                  Align business objectives, operating models, and technology with a clear,
                  execution-ready AI strategy <br/> built for real production environments.
                </p>

                <ul className="space-y-5 mb-8">
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
              <div className="order-1 lg:order-2 w-full">
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                  className="relative w-full aspect-video md:aspect-4/3 rounded-xl overflow-hidden shadow-xl border border-black/5 bg-white group"
                >
                  <img
                    src={CalendarImage}
                    onMouseEnter={loadScript}
                    onClick={openPopup}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent pointer-events-none" />
                </motion.div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
