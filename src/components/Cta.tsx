// src/components/Cta.tsx
import { Reveal } from "./Reveal";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePageTransition } from "./TransitionContext";

const useTypewriter = (text: string, speed: number = 100, pause: number = 2000) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      const currentLength = displayedText.length;
      if (!isDeleting && currentLength < text.length) {
        setDisplayedText(text.substring(0, currentLength + 1));
      } else if (!isDeleting && currentLength === text.length) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && currentLength > 0) {
        setDisplayedText(text.substring(0, currentLength - 1));
      } else if (isDeleting && currentLength === 0) {
        setIsDeleting(false);
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, speed, pause]);

  return displayedText;
};

const Cta = () => {
  const { triggerTransition } = usePageTransition();
  const typedText = useTypewriter("AI B2B", 150, 2000);

  return (
    <section className="relative px-6 py-16 mb-20 bg-black w-full text-white overflow-hidden flex justify-center max-w-7xl">
      <div
        className="absolute inset-0 opacity-[0.15] w-full"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <Reveal>
          <h2 className="text-4xl md:text-6xl font-fraunces font-medium mb-10 tracking-tight">
            Our first{" "}
            <span className="inline-block text-transparent bg-clip-text bg-linear-to-r from-gray-300 to-gray-500">
              {typedText}
            </span>{" "}
            SAAS
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-20 leading-relaxed max-w-3xl mx-auto italic">
            Revolutionizing Response Automation. Automate RFPs, RFIs and Vendor
            Security Assessment Questionnaires (VSAQs) with contextually
            accurate, auditable responses - built for security, sales, and
            compliance teams.
          </p>
          
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <button
              onClick={() => triggerTransition('https://anseru.ai')} 
              className="inline-flex items-center gap-3 text-2xl font-medium
                         border border-white bg-white text-black px-12 py-4
                         hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer"
            >
              Anseru.ai
            </button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

export default Cta;