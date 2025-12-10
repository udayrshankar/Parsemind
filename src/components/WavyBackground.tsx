// src/components/WavyBackground.tsx
import { useEffect, useRef } from "react";

export const WavyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let time = 0;
    
    // Mouse interaction variables
    const mouse = { x: 0, y: 0 };
    
    // Resize handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Configuration for lines
    const lines = 30; // Number of lines
    const gap = height / lines;

    const draw = () => {
      ctx.fillStyle = "#050505"; // Very dark background
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 1;
      // Fade out lines slightly
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"; 

      time += 0.005; // Speed of animation

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        const yBase = i * gap;
        
        for (let x = 0; x < width; x += 10) {
          // Calculate distance from mouse for interaction
          const dx = x - mouse.x;
          const dy = yBase - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200; // Interaction radius
          
          // Interaction effect: waves get bigger near mouse
          let mouseEffect = 0;
          if (dist < maxDist) {
             mouseEffect = (1 - dist / maxDist) * 30;
          }

          // The Wave Math
          // y = base + sin(x + time) * amplitude
          const y = yBase + 
                    Math.sin(x * 0.01 + time + i * 0.5) * (20 + mouseEffect) + 
                    Math.sin(x * 0.03 + time) * 10;

          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};