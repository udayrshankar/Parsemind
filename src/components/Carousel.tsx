import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
  /** Array of exactly 3 image URLs */
  images: [string, string, string];
  /** Time in milliseconds between transitions */
  interval: number;
}

export const Carousel = ({ images, interval }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, images.length]);

  return (
    <div className="relative w-full h-full min-h-[300px] overflow-hidden bg-gray-900 shadow-card">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`Slide ${activeIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          
          // Animation: Fade in with slight scale down
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Optional: Gradient overlay for text legibility if you place text over it */}
      <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`
              h-2 rounded-full transition-all duration-500 ease-out
              ${i === activeIndex ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"}
            `}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};