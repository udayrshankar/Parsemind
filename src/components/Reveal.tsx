// src/components/Reveal.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface Props {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export const Reveal = ({ children, width = "fit-content", delay = 0.25 }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  
  // 1. Create a state to manage overflow
  const [overflow, setOverflow] = useState("hidden");

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    // 2. Bind the overflow state to the style
    <div ref={ref} style={{ position: "relative", width, overflow: overflow }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75, filter: "blur(10px)" },
          visible: { opacity: 1, y: 0, filter: "blur(0px)" },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5, delay: delay }}
        
        // 3. When animation finishes, allow content (shadows) to spill out
        onAnimationComplete={() => setOverflow("visible")}
      >
        {children}
      </motion.div>
    </div>
  );
};