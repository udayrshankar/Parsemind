import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Tag, Clock, ChevronRight, X, Send, PenTool } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import { TransitionProvider } from '../components/TransitionContext';

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

// --- Submit Modal (Kept functionality, matched style) ---
const SubmitModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 m-auto z-50 w-full max-w-lg h-fit p-6 md:p-0"
          >
            <div className="bg-bg-card border border-border shadow-2xl overflow-hidden relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-black/5 rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6 text-blue-600">
                   <PenTool className="w-6 h-6" />
                   <span className="text-xs font-bold uppercase tracking-widest">Writer's Program</span>
                </div>

                <h3 className="type-h3 text-2xl mb-2">Submit your Newsletter</h3>
                <p className="text-text-body/80 mb-8 text-sm leading-relaxed">
                  Join our network of AI thought leaders. We feature high-quality technical deep dives and strategic analysis.
                </p>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full bg-bg-main border border-border p-3 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full bg-bg-main border border-border p-3 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Newsletter URL / Pitch</label>
                    <textarea 
                      rows={3}
                      placeholder="Link to your substack or a brief pitch..."
                      className="w-full bg-bg-main border border-border p-3 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 resize-none"
                    />
                  </div>

                  <button className="w-full bg-black text-white font-bold uppercase tracking-widest text-xs py-4 flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-300">
                    Submit Application <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
              <div className="h-1.5 w-full bg-linear-to-r from-blue-600 via-purple-600 to-indigo-600" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};


export default function BlogsPage() {
  const [activeCat, setActiveCat] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-main text-text-main font-inter selection:bg-black selection:text-white">
      <TransitionProvider>
        <Navbar />

        <SubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <main className="max-w-7xl mx-auto px-6 pt-32 pb-32">
          
          {/* --- HEADER: Clean Layout (New) + Original Fonts (Old) --- */}
          <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-border pb-16">
            <div className="max-w-4xl">
              <Reveal>
                <span className="text-text-body uppercase tracking-[0.2em] mb-4 block font-medium">
                  The Journal
                </span>
                <h1 className="type-h1 text-text-main">
                  Insights and <br /> Perspectives.
                </h1>
              </Reveal>
            </div>
            
            {/* The Layout Change: Clean Text Link CTA on right (No Dashed Box) */}
            <div className="flex flex-col gap-6 max-w-md pb-2 items-start md:items-end md:text-right">
               <Reveal delay={0.2}>
                 <p className="type-body-main text-text-body/80 leading-relaxed">
                   Thoughts on building the future of autonomous software and intelligent infrastructure.
                 </p>
               </Reveal>

               <Reveal delay={0.3}>
                 <div className="flex flex-col md:items-end gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Do you love to write about AI?</span>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 hover:text-blue-600 hover:border-blue-600 transition-all"
                    >
                        Submit Newsletter 
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                 </div>
               </Reveal>
            </div>
          </section>

          {/* --- FEATURED: Original Design (Borders, Cards) --- */}
          <section className="mb-32">
            <Reveal>
              <div className="group relative border border-border bg-bg-card overflow-hidden shadow-card grid grid-cols-1 lg:grid-cols-2 cursor-pointer transition-all duration-500 hover:shadow-2xl">
                
                {/* Image Side */}
                <div className="relative h-[400px] lg:h-[550px] overflow-hidden border-b lg:border-b-0 lg:border-r border-border">
                  <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img 
                    src={FEATURED.image} 
                    alt={FEATURED.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                  />
                  <div className="absolute top-0 left-0 bg-black text-white px-4 py-2 text-xs font-bold uppercase tracking-widest z-20">
                    Featured Story
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-10 lg:p-16 flex flex-col justify-between group-hover:bg-black transition-colors duration-500 relative">
                  <div>
                      <div className="flex items-center gap-4 mb-8 text-xs font-bold uppercase tracking-widest text-text-body/60 group-hover:text-gray-400">
                        <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> {FEATURED.category}</span>
                        <span className="w-px h-3 bg-current opacity-30"></span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {FEATURED.readTime}</span>
                      </div>
                      
                      <h2 className="type-h2 mb-6 leading-[1.1] group-hover:text-white transition-colors duration-500">
                       {FEATURED.title}
                      </h2>
                      
                      <p className="type-body-main text-text-body/80 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
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

          {/* --- TABS: Original Design --- */}
          <section className="mb-12 border-b border-border">
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

          {/* --- GRID: Original Design (Watermarks + Black Hover) --- */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.filter(p => activeCat === "All" || p.category === activeCat).map((post, index) => (
              <Reveal key={index} delay={index * 0.05}>
                <article 
                  className="group relative h-full bg-bg-card border border-border p-8 
                             hover:bg-black transition-all duration-500 ease-out 
                             hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col justify-between min-h-[360px]"
                >
                   {/* --- Background Number (Watermark) --- */}
                   <span className="absolute -bottom-10 -right-4 text-[10rem] font-bold leading-none 
                                    text-black opacity-[0.03] 
                                    group-hover:text-white group-hover:opacity-[0.08] 
                                    transition-all duration-500 pointer-events-none select-none z-0">
                     0{index + 1}
                   </span>

                   <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-4 group-hover:border-white/10 transition-colors">
                         <span className="text-xs font-bold uppercase tracking-widest text-blue-600 group-hover:text-blue-400 transition-colors">
                           {post.category}
                         </span>
                         <span className="text-xs font-mono text-gray-400 group-hover:text-gray-500 transition-colors">
                           {post.date}
                         </span>
                      </div>

                      <h3 className="type-h3 text-2xl mb-4 leading-tight group-hover:text-white transition-colors duration-500">
                        {post.title}
                      </h3>

                      <p className="text-base text-text-body/80 leading-relaxed mb-8 group-hover:text-gray-400 transition-colors duration-500 line-clamp-3">
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
      </TransitionProvider>
    </div>
  );
}