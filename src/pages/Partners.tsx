import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Footer } from '../components/Footer';
import { PartnerFormModal } from '../components/PartnerForModal';

type Partner = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoColor: string;
  category: string;
};

const partners: Partner[] = [
  { id: 'atlas', name: 'Atlas Labs', tagline: 'Enterprise Data', category: 'Infrastructure', description: 'Integration partner for secure data pipelines.', logoColor: '#F59E0B' },
  { id: 'northstar', name: 'Northstar', tagline: 'Strategic Investor', category: 'Growth', description: 'Go-to-market and growth partner focused on AI products.', logoColor: '#3B82F6' },
  { id: 'canvasworks', name: 'CanvasWorks', tagline: 'Design Systems', category: 'Creative', description: 'Design partner for product and brand systems.', logoColor: '#EF4444' },
  { id: 'lumina', name: 'Lumina', tagline: 'Cloud Architecture', category: 'Infrastructure', description: 'Cloud-native architectures and SRE expertise.', logoColor: '#10B981' },
  { id: 'zenith', name: 'Zenith AI', tagline: 'ML Operations', category: 'Intelligence', description: 'Model deployment, monitoring and governance.', logoColor: '#4F46E5' },
  { id: 'quartz', name: 'Quartz', tagline: 'Knowledge Automation', category: 'Intelligence', description: 'Automating knowledge workflows at scale.', logoColor: '#D4AF37' },
];

export default function PartnersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-main text-black font-sans antialiased selection:bg-black selection:text-white">
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        
        {/* --- Header Section --- */}
        <section className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-gray-200 pb-12">
          <div className="max-w-3xl">
            <Reveal>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                Our Ecosystem
              </span>
              <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[0.9] tracking-tight">
                Global <br /> Alliances.
              </h1>
            </Reveal>
          </div>
          <div className="flex flex-col gap-4">
             <Reveal delay={0.2}>
               <p className="text-lg text-gray-600 max-w-xs leading-relaxed">
                 We orchestrate a network of design shops, platform teams, and cloud providers to accelerate innovation.
               </p>
             </Reveal>
          </div>
        </section>

        {/* --- Partners Grid --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {partners.map((p, index) => (
            <Reveal key={p.id} delay={index * 0.1}>
              <a href="#" className="group relative block h-full bg-bg-card border border-gray-100 p-8 
                                   hover:bg-black transition-all duration-500 ease-out 
                                   hover:shadow-2xl cursor-pointer overflow-hidden min-h-[340px] flex flex-col justify-between">
                
                {/* --- Watermark Number --- */}
                <span className="absolute -bottom-6 -right-2 text-[8rem] font-bold leading-none 
                               text-black opacity-[0.03] 
                               group-hover:text-white group-hover:opacity-[0.1] 
                               transition-all duration-500 pointer-events-none select-none z-0">
                  0{index + 1}
                </span>

                {/* --- Top: Category & Icon --- */}
                <div className="relative z-10 flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                     {/* Logo Chip */}
                     <div className="w-10 h-10 flex items-center justify-center bg-gray-50 border border-gray-200 group-hover:bg-gray-900 group-hover:border-gray-700 transition-colors duration-500">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: p.logoColor }}></div>
                     </div>
                     <div>
                       <span className="block text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">
                         {p.category}
                       </span>
                     </div>
                  </div>
                  
                  <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500" />
                </div>

                {/* --- Middle: Main Content --- */}
                <div className="relative z-10 mb-8">
                  <h3 className="text-3xl font-serif font-medium mb-2 group-hover:text-white transition-colors duration-500">
                    {p.name}
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-blue-600 group-hover:text-blue-400 transition-colors duration-500">
                    {p.tagline}
                  </p>
                </div>

                {/* --- Bottom: Description --- */}
                <div className="relative z-10">
                  <p className="text-base text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors duration-500 border-t border-gray-100/50 group-hover:border-white/10 pt-6">
                    {p.description}
                  </p>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500" />

              </a>
            </Reveal>
          ))}
        </section>

        {/* --- Join CTA --- */}
        <section className="bg-black text-white rounded-2xl p-12 md:p-16 relative overflow-hidden text-center">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <Reveal>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Join the Alliance</h2>
                <p className="text-gray-400 text-lg mb-8">
                  We are always looking for visionary partners to expand our ecosystem. If you are building the future of AI infrastructure, let's talk.
                </p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-black px-8 py-4 text-lg font-medium rounded-full hover:scale-105 transition-transform cursor-pointer"
                >
                  Become a Partner
                </button>
             </Reveal>
           </div>
        </section>

      </main>
      <Footer />

      {/* --- Form Modal --- */}
      <PartnerFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}