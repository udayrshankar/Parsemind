import { createContext, useContext, useState, useEffect } from "react";
import type{ ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Define the shape of your context
interface TransitionContextType {
  triggerTransition: (url: string) => void;
}

// 2. Initialize with undefined
const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");

  const triggerTransition = (url: string) => {
    setTargetUrl(url);
    setIsRedirecting(true);
  };

  return (
    <TransitionContext.Provider value={{ triggerTransition }}>
      {children}
      <AnimatePresence>
        {isRedirecting && (
          <RedirectOverlay onComplete={() => (window.location.href = targetUrl)} />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

// 3. Update the hook to throw the error automatically
export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a TransitionProvider");
  }
  return context;
};

// ... RedirectOverlay component remains the same ...
const RedirectOverlay = ({ onComplete }: { onComplete: () => void }) => {
  // ... (same animation code as before)
  // Just ensure you add the type to the props:
  // ({ onComplete }: { onComplete: () => void })
    useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        zIndex: 9999, 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        style={{ textAlign: "center", color: "#fff" }}
      >
        <h1 className="text-3xl font-semibold -tracking-wide mb-2 text-white/80 font-sans">
          Introducing
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-white to-gray-500 font-sans">
          Our First Product
        </h2>
      </motion.div>
    </motion.div>
  );
};