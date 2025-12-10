// src/components/Booking.tsx
import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Reveal } from './Reveal';

// Replace this with the actual path to your uploaded image
import CalendarImage from '../assets/Calendar.png';

const benefits = [
  'Strategic AI Consulting',
  'Custom Solution Driven Approach',
  'AI System Integration',
  'Ongoing Support & Optimization',
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
    if (!isScriptLoaded || !window.Calendly) return;
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/udaymadavana40/30min',
    });
  };

  return (
    <section id="booking" className="bg-white px-4 md:px-6 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* --- Left Column: Image Trigger --- */}
          <Reveal>
            <div
              onClick={openCalendly}
              className="relative w-full max-w-md mx-auto group cursor-pointer mb-8 lg:mb-0"
            >
              <div className="overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl border border-gray-100">
                <img
                  src={CalendarImage}
                  alt="Book a strategy call"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* --- Right Column: Text Content --- */}
          <div>
            <Reveal delay={0.2}>
              <span className="text-text-main uppercase font-medium tracking-wider text-xs md:text-sm">
                Not the ordinary
              </span>
              <h2 className="type-h2 mb-5 text-text-main mt-2">
                Let&apos;s talk about your AI Strategy
              </h2>
            </Reveal>

            <div className="flex flex-col gap-5 md:gap-6 mt-6 md:mt-8">
              {benefits.map((item, index) => (
                <Reveal key={index} delay={0.3 + index * 0.1}>
                  <div className="flex items-center gap-4 group cursor-default">
                    <div className="w-8 h-8 rounded-full bg-functional flex items-center justify-center shrink-0 group-hover:bg-black transition-colors duration-300">
                      <Check size={16} className="text-white" strokeWidth={3} />
                    </div>

                    <span className="text-base md:text-lg text-text-body font-inter group-hover:text-black transition-colors duration-300">
                      {item}
                    </span>
                  </div>
                </Reveal>
              ))}

              <div className="mt-4 md:mt-6">
                <Reveal>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={openCalendly}
                      className="bg-black text-white px-8 py-3 md:py-3.5 hover:bg-white hover:text-black hover:scale-105 cursor-pointer transition-all duration-300 border border-black inline-flex items-center justify-center"
                    >
                      Book a Call
                    </button>

                    <button className="border-black border-2 px-8 py-3 md:py-3.5 hover:bg-black hover:text-white hover:scale-105 hover:border-black cursor-pointer transition-all duration-300 inline-flex items-center justify-center">
                      How we Work
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
