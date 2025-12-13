import { useEffect, useRef } from "react";

export const SignalBackground = () => {
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
    
    // Position of the "DualNodeNetwork" signal source
    let signalX = 0;
    let signalY = 0;
    let isMobile = false;
    
    // Mouse interaction variables
    const mouse = { x: 0, y: 0 };
    
    // Resize handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      isMobile = width < 768; // Standard md breakpoint

      // Calculate approximate center of DualNodeNetwork
      // It lives in the right 5 cols of a max-7xl (1280px) container centered on screen
      const containerWidth = Math.min(width, 1280);
      const centerOffset = containerWidth * 0.25; // Push to the right quarter
      signalX = (width / 2) + centerOffset;
      signalY = height / 2;
    };
    
    window.addEventListener("resize", resize);
    resize(); // Initial calc

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
      // 1. Clear & Background
      ctx.fillStyle = "#000000"; // Pure black to blend with Hero
      ctx.fillRect(0, 0, width, height);
      
      ctx.lineWidth = 1;
      
      time += 0.005; // Speed of animation

      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        // Base stroke color (faded white)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        
        const yBase = i * gap;
        
        for (let x = 0; x < width; x += 10) {
          // --- Mouse Interaction ---
          const dxMouse = x - mouse.x;
          const dyMouse = yBase - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          const maxDistMouse = 200;
          let mouseEffect = 0;
          if (distMouse < maxDistMouse) {
             mouseEffect = (1 - distMouse / maxDistMouse) * 30;
          }

          // --- Signal Interaction (DualNodeNetwork) ---
          let signalEffect = 0;
          if (!isMobile) {
            const dxSignal = x - signalX;
            const dySignal = yBase - signalY;
            const distSignal = Math.sqrt(dxSignal * dxSignal + dySignal * dySignal);
            const maxDistSignal = 550; // Larger radius for the network

            if (distSignal < maxDistSignal) {
              // Create a ripple effect emanating from the signal source
              const power = (1 - distSignal / maxDistSignal);
              // The pulse creates concentric waves
              const pulse = Math.sin(distSignal * 0.03 - time * 4); 
              signalEffect = power * pulse * 25; 
            }
          }

          // --- Wave Math ---
          // Combine Base Wave + Mouse Interaction + Signal Distortion
          const y = yBase + 
                    Math.sin(x * 0.01 + time + i * 0.5) * (20 + mouseEffect) + 
                    Math.sin(x * 0.03 + time) * 10 + 
                    signalEffect; // Add the signal distortion

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