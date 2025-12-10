// src/components/GridDebug.tsx
import { useState, useEffect } from 'react';

export const GridDebug = () => {
  // Hide by default
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle grid when user presses 'Shift + G'
      if (e.shiftKey && e.key.toLowerCase() === 'g') {
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex justify-center px-6">
      {/* This container matches your website's main container:
        max-w-7xl (1280px) 
      */}
      <div className="w-full max-w-7xl h-full grid grid-cols-4 md:grid-cols-12 gap-4">
        {/* Render 12 columns */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className={`
              h-full bg-red-500/10 border-x border-red-500/20
              /* On mobile, only show 4 columns (hide the rest) */
              ${i >= 4 ? 'hidden md:block' : ''}
            `}
          />
        ))}
      </div>
    </div>
  );
};