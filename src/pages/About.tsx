import React from "react";
import { Users, Flag, CheckSquare, ArrowUpRight, Target } from "lucide-react";
import { Reveal } from '../components/Reveal'; // Assuming you have this component
import { Footer } from "../components/Footer";

// Data Models
type Person = {
  name: string;
  role: string;
  bio: string;
};

const team: Person[] = [
  {
    name: "Sudharshan Bala",
    role: "Founder & CEO",
    bio: "Leads product strategy and design. 10+ years building delightful interfaces.",
  },
  {
    name: "KG Goutham",
    role: "Head of Engineering",
    bio: "Scales systems and teams. Loves clean APIs and reliable infra.",
  },
  {
    name: "Nisha Varma",
    role: "Head of Growth",
    bio: "Drives adoption and partnerships with creative GTM plays.",
  },
];

const values = [
  { icon: <Flag className="w-5 h-5" />, title: "Clarity", desc: "We obsess over clear outcomes and measurable impact." },
  { icon: <Users className="w-5 h-5" />, title: "Collaboration", desc: "Cross-discipline teams unlock better solutions." },
  { icon: <CheckSquare className="w-5 h-5" />, title: "Craft", desc: "We sweat the details that make products feel premium." },
  { icon: <Target className="w-5 h-5" />, title: "Impact", desc: "We focus on high-leverage work that moves the needle." },
];

export default function AboutPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-bg-main text-black font-sans antialiased selection:bg-black selection:text-white">
      
      <main className="w-full max-w-7xl mx-auto pt-32 pb-32 px-6">
        
        {/* --- Header Section --- */}
        <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-12">
          <div className="max-w-3xl">
            <Reveal>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                Who We Are
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] tracking-tight">
                Design bold.<br />
                Build trust.
              </h1>
            </Reveal>
          </div>
          <div className="flex flex-col gap-4">
             <Reveal delay={0.2}>
               <p className="text-lg text-gray-600 max-w-xs leading-relaxed">
                 We are an interdisciplinary team blending design, engineering, and strategy. Simplicity is our ultimate sophistication.
               </p>
             </Reveal>
          </div>
        </section>

        {/* --- Mission Section (Split Layout) --- */}
        <section className="mb-32">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-200">
              
              {/* Image Side */}
              <div className="relative h-[400px] lg:h-auto border-b lg:border-b-0 lg:border-r border-gray-200 overflow-hidden group">
                 <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2370&auto=format&fit=crop" 
                   alt="Corporate Architecture" 
                   className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                 />
                 <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest z-20">
                   Headquarters
                 </div>
              </div>

              {/* Content Side */}
              <div className="p-10 lg:p-16 flex flex-col justify-between bg-white">
                <div>
                   <h2 className="font-serif text-4xl md:text-5xl mb-6">Our Mission</h2>
                   <p className="text-lg text-gray-600 leading-relaxed mb-12">
                     To create reliable, human-centered software that simplifies complex problems. We don't just build features; we build infrastructure for the future economy.
                   </p>
                </div>
                
                {/* Stats Nested */}
                <div className="grid grid-cols-2 border-t border-gray-200 pt-8 gap-8">
                   <div>
                      <span className="block text-4xl md:text-5xl font-serif font-medium mb-1">12+</span>
                      <span className="text-xs uppercase tracking-widest text-gray-500">Years Experience</span>
                   </div>
                   <div>
                      <span className="block text-4xl md:text-5xl font-serif font-medium mb-1">100%</span>
                      <span className="text-xs uppercase tracking-widest text-gray-500">Client Retention</span>
                   </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* --- Values Grid (Cards Style) --- */}
        <section className="mb-32">
          <div className="mb-12 border-b border-gray-200 pb-4 flex justify-between items-end">
             <Reveal>
               <h2 className="font-serif text-4xl">Core Principles</h2>
             </Reveal>
             <span className="text-sm font-bold uppercase tracking-widest text-gray-400">01 — 04</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group relative h-full bg-white border border-gray-200 p-8 
                              hover:bg-black transition-all duration-500 ease-out 
                              hover:shadow-xl cursor-default overflow-hidden flex flex-col justify-between min-h-[280px]">
                  
                  {/* Watermark Number */}
                  <span className="absolute -bottom-6 -right-2 text-[8rem] font-bold leading-none 
                                 text-black opacity-[0.03] 
                                 group-hover:text-white group-hover:opacity-[0.08] 
                                 transition-all duration-500 pointer-events-none select-none z-0">
                    0{i + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="mb-6 w-10 h-10 flex items-center justify-center border border-gray-200 rounded-sm text-black bg-gray-50 group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white transition-colors duration-500">
                      {v.icon}
                    </div>
                    <h3 className="font-serif text-2xl mb-3 group-hover:text-white transition-colors duration-500">
                      {v.title}
                    </h3>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* --- Leadership Grid (Cards Style) --- */}
        <section>
          <div className="mb-12">
            <Reveal>
              <h2 className="font-serif text-4xl mb-4">Leadership</h2>
              <p className="text-gray-600 max-w-2xl text-lg">
                Strategic thinkers and technical experts dedicated to engineering excellence.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((p, index) => (
              <Reveal key={p.name} delay={index * 0.1}>
                <div className="group relative h-full bg-white border border-gray-200 p-8 
                              hover:bg-black transition-all duration-500 ease-out 
                              hover:shadow-xl cursor-pointer overflow-hidden min-h-[300px] flex flex-col justify-between">
                  
                  {/* Watermark Number */}
                  <span className="absolute -bottom-6 -right-2 text-[8rem] font-bold leading-none 
                                 text-black opacity-[0.03] 
                                 group-hover:text-white group-hover:opacity-[0.08] 
                                 transition-all duration-500 pointer-events-none select-none z-0">
                    0{index + 1}
                  </span>

                  <div className="relative z-10">
                     <div className="flex justify-between items-start mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest bg-gray-100 text-black px-2 py-1 group-hover:bg-white/20 group-hover:text-white transition-colors">
                           {p.role}
                        </span>
                        <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                     </div>

                     <h3 className="font-serif text-2xl mb-3 group-hover:text-white transition-colors duration-500">
                        {p.name}
                     </h3>
                     
                     <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                        {p.bio}
                     </p>
                  </div>
                  
                </div>
              </Reveal>
            ))}
          </div>
        </section>

      </main>
      
      <Footer/>
    </div>
  );
}