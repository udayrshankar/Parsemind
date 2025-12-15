import React from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Zap } from 'lucide-react';

// --- Types ---

interface FloatingNodeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

interface ConnectingLineProps {
  path: string;
  delay?: number;
}

interface SkeletonLineProps {
  width: string;
}

// --- Components ---

const FloatingNode: React.FC<FloatingNodeProps> = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.div
      className={`absolute bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center ${className}`}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -15, 0] // Floating effect
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        opacity: { duration: 0.5, delay: delay }
      }}
    >
      {children}
    </motion.div>
  );
};

const ConnectingLine: React.FC<ConnectingLineProps> = ({ path, delay = 0 }) => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
      <motion.path
        d={path}
        fill="none"
        stroke="#10b981" // Green-500
        strokeWidth="1.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ 
          duration: 1.5, 
          ease: "easeInOut",
          delay: delay 
        }}
      />
    </svg>
  );
};

const SkeletonLine: React.FC<SkeletonLineProps> = ({ width }) => (
  <div className={`h-3 bg-slate-200 rounded-full mb-2 ${width}`} />
);

// --- Main Component ---

const ExchangeAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-[800px] bg-slate-50 flex items-center justify-center overflow-hidden font-sans text-slate-600">
      
      {/* 1. Background Nodes (Floating) */}
      
      {/* Top Left: Agent Assist */}
      <FloatingNode className="top-24 left-[20%] w-24 h-24 flex-col gap-2" delay={0}>
        <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full bg-emerald-200" />
            <div className="w-4 h-4 rounded-full bg-emerald-500" />
        </div>
        <span className="text-xs text-slate-500 font-medium text-center">Agent<br/>Assist</span>
      </FloatingNode>

      {/* Top Center: Logo */}
      <FloatingNode className="top-32 left-[50%] -translate-x-1/2 !p-0 overflow-hidden w-16 h-16 bg-emerald-700 border-none shadow-lg" delay={0.5}>
        <div className="w-full h-full flex items-center justify-center">
           <div className="w-8 h-8 bg-white rounded-full opacity-90" />
        </div>
      </FloatingNode>
      
      {/* Right Side: Geometric */}
      <FloatingNode className="top-1/2 right-[15%] w-20 h-20" delay={1.2}>
         <Layers className="text-slate-300 w-8 h-8" strokeWidth={1} />
      </FloatingNode>

       {/* Bottom Left: Geometric */}
       <FloatingNode className="bottom-32 left-[15%] w-20 h-20" delay={0.8}>
         <Box className="text-slate-300 w-8 h-8" strokeWidth={1} />
      </FloatingNode>


      {/* 2. Connecting Lines */}
      <div className="absolute inset-0 z-0">
          {/* Line from Agent Assist to Card */}
          <ConnectingLine 
            path="M 350 220 Q 350 350, 450 400" 
            delay={0.8} 
          />
           {/* Line from Right Node to Card */}
          <ConnectingLine 
            path="M 1000 400 Q 900 400, 800 450" 
            delay={1.5} 
          />
      </div>


      {/* 3. Central "Exchange" Card */}
      <motion.div 
        className="relative z-10 bg-white w-[400px] rounded-3xl shadow-xl border border-slate-100 p-8"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-3xl font-semibold text-emerald-800 tracking-tight">Exchange</h2>
            <motion.p 
              className="text-slate-500 text-sm mt-1"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 1 }}
            >
              Pulling order Information.
            </motion.p>
          </div>
          <span className="bg-slate-900 text-white text-xs px-2 py-1 rounded font-mono"># 1237</span>
        </div>

        {/* Product Card Inside */}
        <motion.div 
          className="mt-6 border border-slate-200 rounded-xl p-4 flex items-center justify-between bg-slate-50/50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div>
            <div className="w-6 h-6 bg-slate-800 rounded mb-2 flex items-center justify-center">
                <Zap className="text-white w-3 h-3" />
            </div>
            <p className="text-xs font-semibold text-slate-700">Eligible for exchange.</p>
            <p className="text-xs text-slate-500">You can issue $25 refund</p>
          </div>
          <div className="w-16 h-12 bg-blue-100 rounded-lg relative overflow-hidden shadow-sm">
             <div className="absolute inset-0 flex items-center justify-center text-[10px] text-blue-400">IMG</div>
          </div>
        </motion.div>

        {/* Skeleton Loader Lines */}
        <div className="mt-6 space-y-3">
          <motion.div 
            initial={{ width: "0%" }} 
            animate={{ width: "100%" }} 
            transition={{ duration: 1, delay: 1.5 }}
          >
             <SkeletonLine width="w-full" />
             <SkeletonLine width="w-5/6" />
             <SkeletonLine width="w-1/4" />
          </motion.div>
        </div>

        {/* Transaction Details */}
        <div className="mt-8 flex justify-between items-end">
            <div className="text-xs text-slate-400">
                <p>Transaction</p>
                <p>Details</p>
            </div>
            <div className="space-y-2">
                <div className="flex gap-2 justify-end">
                    <div className="w-12 h-3 bg-slate-200 rounded-full"/>
                    <div className="w-20 h-3 bg-slate-200 rounded-full"/>
                </div>
                <div className="flex gap-2 justify-end">
                    <div className="w-10 h-3 bg-slate-200 rounded-full"/>
                    <div className="w-16 h-3 bg-slate-200 rounded-full"/>
                </div>
            </div>
        </div>

        {/* Action Button */}
        <motion.button 
            className="w-full mt-8 py-3 border border-slate-800 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors uppercase tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
        >
            Send to Customer
        </motion.button>

      </motion.div>

      {/* Text label above card */}
      <motion.div 
        className="absolute top-[28%] text-center text-slate-400 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Response to exchange request Ticket..
      </motion.div>

    </div>
  );
};

export default ExchangeAnimation;