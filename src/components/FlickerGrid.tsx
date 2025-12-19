import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const FlickeringGrid = () => {
  const [squares, setSquares] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    // 1. Get window dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // 2. Define grid parameters
    const gridSize = 40; // Must match backgroundSize below
    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);
    
    // 3. Determine how many squares to show (density)
    // We increase the count so it doesn't look too sparse on large screens
    const count = Math.floor((cols * rows) * 0.05) || 40; // Fills roughly 5% of the grid or min 40
    
    const newSquares = Array.from({ length: count }).map((_, i) => ({
      id: i,
      // Randomly select a column and multiply by grid size to snap to grid
      x: Math.floor(Math.random() * cols) * gridSize,
      y: Math.floor(Math.random() * rows) * gridSize,
      delay: Math.random() * 5,
    }));
    
    setSquares(newSquares);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Lines Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundPosition: "0 0",
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Animated Squares */}
      {squares.map((sq) => (
        <motion.div
          key={sq.id}
          className="absolute bg-indigo-400/20 border border-indigo-400/30 shadow-[0_0_15px_rgba(129,140,248,0.3)]"
          style={{
            width: 40,
            height: 40,
            top: sq.y,
            left: sq.x,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.9, 1, 0.9],
          }}
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

export default FlickeringGrid;