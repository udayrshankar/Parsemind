// src/components/Stats.tsx
import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

// --- Animated Counter Component ---
const Counter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 400 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    // 1. Set initial value immediately (The Fix)
    if (ref.current) {
      ref.current.textContent = prefix + "0" + suffix;
    }

    // 2. Animate updates
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toString() + suffix;
      }
    });
    
    return () => unsubscribe();
  }, [springValue, prefix, suffix]);

  return <span ref={ref} />;
};

// --- Main Stats Section ---
const statItems = [
  { label: "Clients Served", value: 450, prefix: "", suffix: "" },
  { label: "Cost Saved", value: 450, prefix: "$", suffix: "" },
  { label: "Time Saved", value: 450, prefix: "", suffix: "hrs" },
  { label: "Clients Served", value: 450, prefix: "", suffix: "" },
];

export const Stats = () => {
  return (
    <section className="py-20 px-6 bg-bg-main border-y border-border">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-25 text-center">
          {statItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center justify-center gap-2">
              {/* RESTORED: Uses your design tokens */}
              <span className="text-sm font-bold text-text-body uppercase tracking-wide font-inter">
                {item.label}
              </span>
              
              {/* RESTORED: Uses your design tokens */}
              <h3 className="text-6xl md:text-7xl font-fraunces text-text-main leading-tight">
                <Counter 
                  value={item.value} 
                  prefix={item.prefix} 
                  suffix={item.suffix} 
                />
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};