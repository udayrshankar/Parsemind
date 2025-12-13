import { useState } from 'react';
import { motion } from 'framer-motion'; // Ensure framer-motion is installed
import { ArrowUpRight, Tag, Clock, ChevronRight } from 'lucide-react';
import { Reveal } from '../components/Reveal'; // Assuming you have this from previous components
import { Footer } from '../components/Footer';

// --- Dummy Data ---
const CATEGORIES = ["All", "Strategy", "Engineering", "Design", "Culture"];

const FEATURED = {
  id: 'feat-1',
  title: "The Agentic Future: Beyond Chatbots",
  excerpt: "Why the next generation of AI isn't about conversation—it's about autonomous execution. A deep dive into the architecture of agency.",
  category: "Strategy",
  readTime: "8 min read",
  date: "Oct 12, 2025",
  image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2500&auto=format&fit=crop"
};

const POSTS = [
  {
    title: "Building Reliable RAG Pipelines",
    excerpt: "Retrieval Augmented Generation is easy to prototype but hard to productionize. Here is our checklist for 99% reliability.",
    category: "Engineering",
    date: "Oct 08"
  },
  {
    title: "The Psychology of Human-AI Trust",
    excerpt: "How UI patterns influence user confidence in autonomous systems. Design principles for transparent agents.",
    category: "Design",
    date: "Oct 01"
  },
  {
    title: "Scaling Context Windows Efficiently",
    excerpt: "Managing cost and latency when dealing with million-token context windows in enterprise applications.",
    category: "Engineering",
    date: "Sep 28"
  },
  {
    title: "Zero-Shot vs Fine-Tuning",
    excerpt: "A decision framework for CTOs: When to prompt engineer and when to invest in custom model weights.",
    category: "Strategy",
    date: "Sep 22"
  },
  {
    title: "Designing for Indeterminacy",
    excerpt: "Traditional software is deterministic. AI is probabilistic. How our design systems accommodate the error margin.",
    category: "Design",
    date: "Sep 15"
  },
  {
    title: "The Economics of Self-Hosting",
    excerpt: "Comparing the TCO of OpenAI Enterprise vs. self-hosted Llama 3 on dedicated GPU clusters.",
    category: "Strategy",
    date: "Sep 10"
  }
];

export default function BlogsPage() {
  const [activeCat, setActiveCat] = useState("All");

  return (
    <div className="min-h-screen bg-bg-main text-black selection:bg-black selection:text-white">
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        
        {/* --- Page Header --- */}
        <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-12">
          <div className="max-w-3xl">
            <Reveal>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                The Journal
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] tracking-tight">
                Insights & <br /> Perspectives.
              </h1>
            </Reveal>
          </div>
          <div className="flex flex-col gap-4">
             <Reveal delay={0.2}>
               <p className="text-lg text-gray-600 max-w-xs leading-relaxed">
                 Thoughts on building the future of autonomous software and intelligent infrastructure.
               </p>
             </Reveal>
          </div>
        </section>

        {/* --- Featured Article --- */}
        <section className="mb-24">
          <Reveal>
            <div className="group relative border border-gray-200 bg-white grid grid-cols-1 lg:grid-cols-2 cursor-pointer hover:shadow-2xl transition-all duration-500">
              
              {/* Image Side */}
              <div className="relative h-[400px] lg:h-[550px] overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-200">
                <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src={FEATURED.image} 
                  alt={FEATURED.title} 
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                />
                <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest z-20">
                  Featured Story
                </div>
              </div>

              {/* Content Side */}
              <div className="p-10 lg:p-16 flex flex-col justify-between bg-bg-card group-hover:bg-black transition-colors duration-500">
                <div>
                   <div className="flex items-center gap-4 mb-8 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500">
                      <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> {FEATURED.category}</span>
                      <span className="w-px h-3 bg-gray-300/30"></span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {FEATURED.readTime}</span>
                   </div>
                   
                   <h2 className="text-4xl lg:text-5xl font-serif mb-6 leading-[1.1] group-hover:text-white transition-colors duration-500">
                     {FEATURED.title}
                   </h2>
                   
                   <p className="text-xl text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                     {FEATURED.excerpt}
                   </p>
                </div>

                <div className="mt-12 flex items-center gap-3 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-500">
                   Read Full Story 
                   <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>

            </div>
          </Reveal>
        </section>

        {/* --- Filter Tabs --- */}
        <section className="mb-12 border-b border-gray-200">
          <div className="flex flex-wrap gap-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`
                  pb-4 text-xs font-bold uppercase tracking-widest transition-all relative
                  ${activeCat === cat ? 'text-black' : 'text-gray-400 hover:text-black'}
                `}
              >
                {cat}
                {activeCat === cat && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" 
                  />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* --- Blog Grid (TeamRoles Style) --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.filter(p => activeCat === "All" || p.category === activeCat).map((post, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <article 
                className="group relative h-full bg-bg-card border border-gray-100 p-8 
                           hover:bg-black transition-all duration-500 ease-out 
                           hover:shadow-xl cursor-pointer overflow-hidden flex flex-col justify-between min-h-[320px]"
              >
                 {/* --- Background Number (Watermark) --- */}
                 <span className="absolute -bottom-8 -right-4 text-[8rem] font-bold leading-none 
                                text-black opacity-[0.03] 
                                group-hover:text-white group-hover:opacity-[0.08] 
                                transition-all duration-500 pointer-events-none select-none z-0">
                   0{index + 1}
                 </span>

                 <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100/10 pb-4 group-hover:border-white/10 transition-colors">
                       <span className="text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-blue-400 transition-colors">
                         {post.category}
                       </span>
                       <span className="text-xs font-mono text-gray-400 group-hover:text-gray-500 transition-colors">
                         {post.date}
                       </span>
                    </div>

                    <h3 className="text-2xl font-serif mb-4 leading-snug group-hover:text-white transition-colors duration-500">
                      {post.title}
                    </h3>

                    <p className="text-base text-gray-600 leading-relaxed mb-8 group-hover:text-gray-400 transition-colors duration-500 line-clamp-3">
                      {post.excerpt}
                    </p>
                 </div>

                 {/* Bottom Action */}
                 <div className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black group-hover:text-white transition-colors duration-500">
                    Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </div>

              </article>
            </Reveal>
          ))}
        </section>

       

      </main>
      <Footer />
    </div>
  );
}