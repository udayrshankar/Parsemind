// src/components/Booking.tsx
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Reveal } from './Reveal';

// Replace this with the actual path to your uploaded image
import CalendarImage from '../assets/Calendar.png'; 
const benefits = [
  "Strategic AI Consulting",
  "Custom Solution Driven Approach",
  "AI System Integration",
  "Ongoing Support & Optimization"
];

declare global {
  interface Window {
    Calendly: any;
  }
}

export const Booking = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // 1. Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Load Calendly JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/udaymadavana40/30min'
      });
    }
  };

  return (
    <section id="booking" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* --- Left Column: Your Image Trigger --- */}
          <Reveal>
            <div 
              onClick={openCalendly}
              className="relative w-full max-w-md mx-auto group cursor-pointer"
            >
              <div className="overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl border border-gray-100">
                
                {/* PUT YOUR IMAGE PATH HERE */}
                <img 
                  src={CalendarImage}
                  alt="Book a strategy call" 
                  className="w-full h-auto object-cover"
                />

                {/* Optional: Hover Overlay Hint */}
              

              </div>
            </div>
          </Reveal>

          {/* --- Right Column: Text Content --- */}
          <div>
            <Reveal delay={0.2}>
              <span className="text-text-main uppercase font-medium tracking-wider text-sm">
                Not the ordinary
              </span>
              <h2 className="type-h2 mb-5 text-text-main mt-2">
                Let's talk about your AI Strategy
              </h2>
            </Reveal>

            <div className="flex flex-col gap-6 mt-8">
              {benefits.map((item, index) => (
                <Reveal key={index} delay={0.3 + (index * 0.1)}>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-functional flex items-center justify-center shrink-0 group-hover:bg-black transition-colors duration-300">
                      <Check size={16} className="text-white" strokeWidth={3} />
                    </div>
                    
                    <span className="text-xl text-text-body font-inter group-hover:text-black transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}
              <div className='translate-y-4'>
                <Reveal>
                <button className='bg-black text-white h-15 px-8 hover:bg-white hover:scale-105 cursor-pointer hover:text-black transition-all duration-300'>
                  Book a Call
                </button>
                
                <button className='border-black ml-2 border-2 h-15 px-8 hover:bg-white hover:scale-105 hover:border-0 cursor-pointer text-black transition-all duration-300'>
                  How we Work
                </button>
                </Reveal>
              </div>
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
};