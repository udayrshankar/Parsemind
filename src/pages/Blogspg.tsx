import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Tag, Clock, ChevronRight, X, Send, PenTool } from 'lucide-react';

// Mock components
const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Footer = () => (
  <footer className="border-t border-gray-200 py-12 px-6">
    <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
      © 2025 Company. All rights reserved.
    </div>
  </footer>
);

const Navbar = () => (
  <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-40 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="font-bold text-xl">Company</div>
      <div className="flex gap-6 text-sm">
        <a href="#" className="hover:text-gray-600">Home</a>
        <a href="#" className="hover:text-gray-600">Blog</a>
        <a href="#" className="hover:text-gray-600">Partners</a>
      </div>
    </div>
  </nav>
);

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

// --- Submit Modal ---
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
            <div className="bg-white border border-gray-200 shadow-2xl overflow-hidden relative">
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

                <h3 className="text-2xl font-bold mb-2">Submit your Newsletter</h3>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed">
                  Join our network of AI thought leaders. We feature high-quality technical deep dives and strategic analysis.
                </p>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Newsletter URL / Pitch</label>
                    <textarea 
                      rows={3}
                      placeholder="Link to your substack or a brief pitch..."
                      className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-gray-300 resize-none"
                    />
                  </div>

                  <button className="w-full bg-black text-white font-bold uppercase tracking-widest text-xs py-4 flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-300">
                    Submit Application <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600" />
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
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

      <SubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* =========================
          HERO / LANDING CTA (New Design - Partners Style)
      ========================= */}
      <section className="px-6 pt-32 pb-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

          {/* Left */}
          <div>
            <Reveal>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">
                The Journal
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[0.95] tracking-tight">
                Insights and <br /> Perspectives.
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                Thoughts on building the future of autonomous software and intelligent infrastructure.
              </p>
            </Reveal>
          </div>

          {/* Right CTA */}
          <Reveal delay={0.3}>
            <div className="border border-gray-200 p-10 bg-white flex flex-col gap-6">
              <h3 className="text-3xl font-bold">
                Submit Newsletter
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join our network of AI thought leaders. We feature high-quality technical deep dives and strategic analysis.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 text-lg font-medium
                           border border-black px-6 py-4 bg-black text-white
                           hover:bg-white hover:text-black transition-colors"
              >
                Become a Contributor
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </Reveal>

        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-32">

        {/* --- FEATURED: Original Design --- */}
        <section className="mb-32">
          <Reveal>
            <div className="group relative border border-gray-200 bg-white overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-2 cursor-pointer transition-all duration-500 hover:shadow-2xl">
              
              {/* Image Side */}
              <div className="relative h-[400px] lg:h-[550px] overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-200">
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
                    <div className="flex items-center gap-4 mb-8 text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-400">
                      <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> {FEATURED.category}</span>
                      <span className="w-px h-3 bg-current opacity-30"></span>
                      <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {FEATURED.readTime}</span>
                    </div>
                    
                    <h2 className="text-4xl font-serif font-medium mb-6 leading-[1.1] group-hover:text-white transition-colors duration-500">
                     {FEATURED.title}
                    </h2>
                    
                    <p className="text-base text-gray-600 leading-relaxed group-hover:text-gray-300 transition-colors duration-500">
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

        {/* --- GRID: Original Design --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.filter(p => activeCat === "All" || p.category === activeCat).map((post, index) => (
            <Reveal key={index} delay={index * 0.05}>
              <article 
                className="group relative h-full bg-white border border-gray-100 p-8 
                           hover:bg-black transition-all duration-500 ease-out 
                           hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col justify-between min-h-[360px]"
              >
                 {/* --- Background Number --- */}
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

                    <h3 className="text-2xl font-serif font-medium mb-4 leading-tight group-hover:text-white transition-colors duration-500">
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