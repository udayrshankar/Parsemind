import React, { useState } from "react";
import { Users, Flag, CheckSquare, ArrowUpRight, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from '../components/Reveal';
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { TransitionProvider } from "../components/TransitionContext";

// Data Models
type Person = {
  id: number;
  name: string;
  role: string;
  bio: string;
  qualities: string[];
  image: string;
};

const team: Person[] = [
  {
    id: 0,
    name: "Sudharshan Bala",
    role: "Founder & CEO",
    bio: "Leads product strategy and design. 10+ years building delightful interfaces.",
    qualities: ["Product Vision", "Design Systems", "Strategy"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 1,
    name: "KG Goutham",
    role: "Head of Engineering",
    bio: "Scales systems and teams. Loves clean APIs and reliable infra.",
    qualities: ["System Architecture", "Cloud Native", "Leadership"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
  },
];

const values = [
  { icon: <Flag className="w-5 h-5" />, title: "Clarity", desc: "We obsess over clear outcomes and measurable impact." },
  { icon: <Users className="w-5 h-5" />, title: "Collaboration", desc: "Cross-discipline teams unlock better solutions." },
  { icon: <CheckSquare className="w-5 h-5" />, title: "Craft", desc: "We sweat the details that make products feel premium." },
  { icon: <Target className="w-5 h-5" />, title: "Impact", desc: "We focus on high-leverage work that moves the needle." },
];

export default function AboutPage() {
  const [activeLeaderIndex, setActiveLeaderIndex] = useState(0);

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-inter selection:bg-black selection:text-white">
      <TransitionProvider>
        <Navbar />
        
        <main className="w-full max-w-7xl mx-auto pt-32 pb-32 px-6">
          
          {/* --- Header Section --- */}
          <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-border pb-16">
            <div className="max-w-4xl">
              <Reveal>
                <span className="text-text-body uppercase tracking-[0.2em] mb-4 block font-medium">
                  Who We Are
                </span>
                <h1 className="type-h1 text-text-main">
                  Design bold.<br />
                  Build trust.
                </h1>
              </Reveal>
            </div>
            <div className="flex flex-col gap-4 max-w-md pb-2">
               <Reveal delay={0.2}>
                 <p className="type-body-main text-text-body/80 leading-relaxed">
                   We are an interdisciplinary team blending design, engineering, and strategy. Simplicity is our ultimate sophistication.
                 </p>
               </Reveal>
            </div>
          </section>
  
          {/* --- Mission Section --- */}
          <section className="mb-32">
            <Reveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-border bg-bg-card rounded-2xl overflow-hidden shadow-card">
                
                {/* Image Side */}
                <div className="relative h-[400px] lg:h-auto border-b lg:border-b-0 lg:border-r border-border overflow-hidden group">
                   <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                   <img 
                     src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2370&auto=format&fit=crop" 
                     alt="Corporate Architecture" 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                   />
                   <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest z-20">
                     Headquarters
                   </div>
                </div>
  
                {/* Content Side */}
                <div className="p-10 lg:p-16 flex flex-col justify-between">
                  <div>
                     <h2 className="type-h2 mb-6">Our Mission</h2>
                     <p className="type-body-main text-text-body/80 leading-relaxed mb-12">
                       To create reliable, human-centered software that simplifies complex problems. We don't just build features; we build infrastructure for the future economy.
                     </p>
                  </div>
                  
                  {/* Stats Nested */}
                  <div className="grid grid-cols-2 border-t border-border pt-8 gap-8">
                     <div>
                        <span className="block type-h3 mb-1">12+</span>
                        <span className="text-xs uppercase tracking-widest text-text-body">Years Experience</span>
                     </div>
                     <div>
                        <span className="block type-h3 mb-1">100%</span>
                        <span className="text-xs uppercase tracking-widest text-text-body">Client Retention</span>
                     </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
  
          {/* --- Values Grid --- */}
          <section className="mb-32">
            <div className="mb-12 border-b border-border pb-4 flex justify-between items-end">
               <Reveal>
                 <h2 className="type-h2">Core Principles</h2>
               </Reveal>
               <span className="text-sm font-bold uppercase tracking-widest text-gray-400">01 — 04</span>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group relative h-full bg-bg-card border border-gray-100 p-8 
                                hover:bg-black transition-all duration-500 ease-out 
                                hover:shadow-2xl cursor-default overflow-hidden flex flex-col justify-between min-h-[280px]">
                    
                    <span className="absolute -bottom-10 -right-4 text-[10rem] font-bold leading-none 
                                   text-black opacity-5 
                                   group-hover:text-white group-hover:opacity-10 
                                   transition-colors duration-500 pointer-events-none select-none z-0">
                      {i + 1}
                    </span>
  
                    <div className="relative z-10">
                      <div className="mb-6 w-12 h-12 flex items-center justify-center border border-border rounded-full text-black bg-white group-hover:bg-white/20 group-hover:border-white/20 group-hover:text-white transition-colors duration-500">
                        {v.icon}
                      </div>
                      <h3 className="type-h3 text-2xl mb-3 group-hover:text-white transition-colors duration-500">
                        {v.title}
                      </h3>
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-base text-text-body/80 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
  
          {/* --- Leadership Section (Features-Style) --- */}
          <section className="mb-24">
            {/* Header Aligned like Features */}
            <div className="text-center flex justify-center mb-10 md:mb-12">
              <Reveal>
                <span className="text-text-body uppercase mx-auto mb-2 block tracking-widest text-sm font-bold">
                  The Team
                </span>
                <h2 className="type-h2 text-text-main">Leadership</h2>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              
              {/* Left Column: Interactive List */}
              <div className="flex flex-col gap-3">
                {team.map((person, index) => {
                  const isActive = activeLeaderIndex === index;
                  return (
                    <Reveal key={person.id} delay={index * 0.1}>
                      <div
                        onMouseEnter={() => setActiveLeaderIndex(index)}
                        onClick={() => setActiveLeaderIndex(index)}
                        className={`
                          relative p-8 cursor-pointer transition-all duration-500 ease-out border rounded-xl
                          ${isActive 
                            ? 'bg-black border-black shadow-2xl scale-[1.02]' 
                            : 'bg-bg-card border-transparent hover:bg-gray-50 hover:border-gray-200'}
                        `}
                      >
                        <div className="flex gap-6 items-start relative z-10">
                          {/* Number Indicator */}
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 font-inter font-medium
                            ${isActive ? 'bg-white text-black border-white' : 'bg-white border-border text-gray-500'}
                          `}>
                            0{index + 1}
                          </div>

                          <div className="flex flex-col gap-2">
                            <h3 className={`text-2xl font-serif font-medium transition-colors duration-500 ${isActive ? 'text-white' : 'text-text-main'}`}>
                              {person.name}
                            </h3>
                            <span className={`text-xs font-bold uppercase tracking-widest mb-2 transition-colors duration-500 ${isActive ? 'text-gray-400' : 'text-blue-600'}`}>
                              {person.role}
                            </span>
                            <p className={`text-base leading-relaxed transition-colors duration-500 ${isActive ? 'text-gray-400' : 'text-gray-600'}`}>
                              {person.bio}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              {/* Right Column: Sticky Visual */}
              <div className="hidden lg:block lg:sticky lg:top-32 w-full h-[500px] overflow-hidden bg-bg-card border border-gray-100 shadow-xl rounded-2xl relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLeaderIndex}
                    initial={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: 'circOut' }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={team[activeLeaderIndex].image} 
                      alt={team[activeLeaderIndex].name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Bottom Info (Superpowers) */}
                    <div className="absolute bottom-0 left-0 p-8 w-full">
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Superpowers</p>
                      <div className="flex flex-wrap gap-2">
                        {team[activeLeaderIndex].qualities.map((q) => (
                          <span key={q} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-full">
                            {q}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </section>
  
        </main>
        
        <Footer />
      </TransitionProvider>
    </div>
  );
}