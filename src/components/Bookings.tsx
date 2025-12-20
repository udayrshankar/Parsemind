import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCalendly } from "./hooks/useCalendly";
import { useState, useMemo } from "react";

// --- Helper: Generate Calendar Grid ---
const getCalendarDays = (year: number, month: number) => {
  const date = new Date(year, month, 1);
  const days = [];

  // 1. Calculate padding for days before the 1st
  // Mon=0, Sun=6
  const firstDayIndex = (date.getDay() + 6) % 7; 

  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }

  // 2. Fill in the days of the month
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
};

// --- Enterprise Calendar Component ---
const EnterpriseCalendar = ({ onDateClick }: { onDateClick: () => void }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const today = new Date();

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const calendarDays = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);
  
  const monthName = viewDate.toLocaleString('default', { month: 'long' });
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Navigation Handlers
  const nextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));
  const prevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const goToToday = () => setViewDate(new Date());

  return (
    // Added 'relative z-20' to ensure this sits above decorative blobs
    <div className="relative z-20 w-full max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden font-sans">
      {/* Header Bar */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
        <div>
           <button 
             type="button"
             onClick={goToToday}
             className="text-xs font-semibold tracking-wider text-slate-400 uppercase hover:text-slate-600 transition-colors mb-0.5"
           >
             {viewYear}
           </button>
           <h3 className="text-xl font-bold text-slate-900 tracking-tight">
             {monthName}
           </h3>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex gap-1">
          <button 
            type="button"
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <button 
            type="button"
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="p-4 sm:p-6">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 mb-4">
          {weekDays.map((day, i) => (
            <div 
              key={i} 
              className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-center ${
                i >= 5 ? "text-rose-500/80" : "text-slate-400"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-2 gap-x-1">
          {calendarDays.map((date, i) => {
            // Empty Slots
            if (!date) return <div key={`empty-${i}`} className="h-8 w-8 sm:h-9 sm:w-9" />;

            const dayOfWeek = (date.getDay() + 6) % 7; 
            const isWeekend = dayOfWeek >= 5;
            const isToday = 
                date.getDate() === today.getDate() && 
                date.getMonth() === today.getMonth() && 
                date.getFullYear() === today.getFullYear();

            return (
              <motion.button
                key={date.toISOString()}
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={onDateClick}
                className={`
                  group relative flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 mx-auto text-xs sm:text-sm font-medium rounded-full transition-all duration-200
                  ${isToday 
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20" 
                    : "hover:bg-slate-100 text-slate-700"
                  }
                `}
              >
                {/* Number */}
                <span className={`
                  relative z-10 
                  ${isToday ? "font-bold" : ""} 
                  ${!isToday && isWeekend ? "text-rose-500 font-semibold" : ""}
                `}>
                  {date.getDate()}
                </span>

                {/* Today Indicator Ring (Pulse) */}
                {isToday && (
                   <span className="absolute inset-0 rounded-full border border-slate-900/10 animate-pulse" />
                )}
                
                {/* Hover Tooltip/Label */}
                <span className="hidden sm:block absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                  Book Call
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Footer / Call to Action Hint */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-center gap-2">
         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
         <span className="text-xs font-medium text-slate-500">Available for new strategies</span>
      </div>
    </div>
  );
};


// --- Main Booking Section ---

const benefits = [
  "Strategic AI Consulting",
  "Custom, Solution-Driven Approach",
  "AI System Integration",
  "Ongoing Support & Optimization",
];

declare global {
  interface Window {
    Calendly: any;
  }
}

export const Booking = () => {
  const { loadScript, openPopup } = useCalendly();

  return (
    <section id="booking" className="bg-white px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Adjusted padding (p-6 -> md:p-12) and min-height logic for mobile */}
        <div className="bg-[#f7f8fa] border border-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl relative w-full z-10 min-h-auto lg:min-h-[550px] flex flex-col justify-center overflow-hidden">
          
          {/* Mac window controls - Hidden on small mobile to save space, or adjusted position */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex gap-2 z-20 opacity-50">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full pt-8 lg:pt-0">
              
              {/* Left Column (Text) */}
              {/* Changed order: Text is order-1 on mobile, order-1 on desktop. Keeps flow natural. */}
              <div className="flex flex-col justify-center order-1 relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-fraunces text-slate-900 mb-4 leading-[1.1] mt-6 lg:mt-0">
                  Let’s Talk About Your Enterprise AI Strategy
                </h2>

                <p className="text-base md:text-lg text-slate-600 font-inter leading-relaxed mb-6 md:mb-8 max-w-md">
                  Align business objectives, operating models, and technology with a clear,
                  execution-ready AI strategy built for real production environments.
                </p>

                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {benefits.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-white" strokeWidth={3} />
                      </div>
                      <p className="text-sm md:text-base text-slate-700 font-medium font-inter">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>

                <div>
                  <button
                    type="button"
                    onMouseEnter={loadScript}
                    onClick={openPopup}
                    className="group w-full md:w-auto bg-slate-900 text-white pl-8 pr-6 py-4 rounded-full font-medium font-inter hover:bg-slate-800 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center md:justify-start gap-3"
                  >
                    Talk to Our Strategy Experts
                    <div className="bg-white/20 p-1.5 rounded-full group-hover:translate-x-1 transition-transform">
                        <ChevronRight size={16} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Column (Enterprise Calendar) */}
              {/* Changed order: Calendar is order-2 on mobile. */}
              <div className="order-2 w-full h-full flex items-center justify-center">
                <div 
                    onMouseEnter={loadScript} 
                    className="relative w-full max-w-md"
                >
                  {/* Decorative Elements behind calendar */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-200/30 rounded-full blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
                  
                  <EnterpriseCalendar onDateClick={openPopup} />
                </div>
              </div>

            </div>
        </div>
      </div>
    </section>
  );
};