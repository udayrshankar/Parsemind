// src/pages/Partners.tsx
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { PartnerFormModal } from '../components/PartnerForModal';

// --------------------
// Types
// --------------------
type Partner = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoColor: string;
  category: string;
};

// --------------------
// Data
// --------------------
const partners: Partner[] = [
  { id: 'atlas', name: 'Atlas Labs', tagline: 'Enterprise Data', category: 'Infrastructure', description: 'Integration partner for secure data pipelines.', logoColor: '#F59E0B' },
  { id: 'northstar', name: 'Northstar', tagline: 'Strategic Investor', category: 'Growth', description: 'Go-to-market and growth partner focused on AI products.', logoColor: '#3B82F6' },
  { id: 'canvasworks', name: 'CanvasWorks', tagline: 'Design Systems', category: 'Creative', description: 'Design partner for product and brand systems.', logoColor: '#EF4444' },
  { id: 'lumina', name: 'Lumina', tagline: 'Cloud Architecture', category: 'Infrastructure', description: 'Cloud-native architectures and SRE expertise.', logoColor: '#10B981' },
  { id: 'zenith', name: 'Zenith AI', tagline: 'ML Operations', category: 'Intelligence', description: 'Model deployment, monitoring and governance.', logoColor: '#4F46E5' },
  { id: 'quartz', name: 'Quartz', tagline: 'Knowledge Automation', category: 'Intelligence', description: 'Automating knowledge workflows at scale.', logoColor: '#D4AF37' },
];

// --------------------
// Page
// --------------------
export default function PartnersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // UPDATED: Changed font-sans to font-inter
  return (
    <div className="min-h-screen bg-bg-main text-black font-inter selection:bg-black selection:text-white">

      {/* =========================
          HERO / LANDING CTA
      ========================= */}
      <section className="px-6 pt-32 pb-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

          {/* Left */}
          <div>
            <Reveal>
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3 block">
                Our Ecosystem
              </span>
              {/* UPDATED: Changed font-serif to font-fraunces */}
              <h1 className="text-6xl md:text-8xl font-fraunces font-medium leading-[0.95] tracking-tight">
                Global <br /> Alliances
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
                We collaborate with infrastructure leaders, design studios,
                and AI pioneers to build dependable systems at scale.
              </p>
            </Reveal>
          </div>

          {/* Right CTA */}
          <Reveal delay={0.3}>
            <div className="border border-gray-200 p-10 bg-card flex flex-col gap-6">
              {/* UPDATED: Changed font-serif to font-fraunces */}
              <h3 className="text-3xl font-bold">
                Join the Alliance
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Partner with us to shape the next generation of enterprise AI.
                We work deeply with a small group of trusted collaborators.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 text-lg font-medium
                           border border-black px-6 py-4 bg-black text-white
                           hover:bg-white hover:text-black transition-colors"
              >
                Become a Partner
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </Reveal>

        </div>
      </section>

      {/* =========================
          PARTNERS GRID
      ========================= */}
      <main className="max-w-7xl mx-auto px-6">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((p, index) => (
            <Reveal key={p.id} delay={index * 0.1}>
              <div
                className="group relative h-full bg-bg-card border border-gray-100 p-8
                           hover:bg-black transition-all duration-500 ease-out
                           hover:shadow-2xl cursor-default overflow-hidden min-h-80 flex flex-col justify-between"
              >
                <span className="absolute -bottom-8 -right-2 text-[8rem] font-bold leading-none
                                 text-black opacity-[0.03]
                                 group-hover:text-white group-hover:opacity-[0.1]
                                 transition-all duration-500 pointer-events-none select-none z-0">
                  {index + 1}
                </span>

                <div className="relative z-10 flex justify-between items-start mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center border border-gray-200 group-hover:border-gray-700">
                      <div className="w-3 h-3" style={{ backgroundColor: p.logoColor }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-500 transition-colors">
                      {p.category}
                    </span>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-white transition-all duration-500" />
                </div>

                <div className="relative z-10 mb-8">
                  {/* UPDATED: Changed font-serif to font-fraunces */}
                  <h3 className="text-3xl font-fraunces font-medium mb-2 group-hover:text-white transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-widest text-black group-hover:text-gray-500 transition-colors">
                    {p.tagline}
                  </p>
                </div>

                <p className="relative z-10 text-base text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors border-t border-gray-100/50 group-hover:border-white/10 pt-6">
                  {p.description}
                </p>

                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </Reveal>
          ))}
        </section>
      </main>

      {/* =========================
          FINAL CTA (UPDATED)
      ========================= */}
      <section className="relative max-w-7xl mx-auto py-32 bg-black text-white overflow-hidden m-15 flex justify-center">
        
        {/* Background Dot Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Reveal>
            {/* UPDATED: Changed font-serif to font-fraunces */}
            <h2 className="text-4xl md:text-6xl font-fraunces font-medium mb-6 tracking-tight">
              Join the Alliance
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              We’re always looking to collaborate with teams building meaningful,
              scalable AI infrastructure. Let’s explore what we can build together.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-3 text-lg font-medium
                         border border-white bg-white text-black px-8 py-4
                         hover:bg-transparent hover:text-white transition-all duration-300"
            >
              Become a Partner
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </Reveal>
        </div>
      </section>


      {/* =========================
          PARTNER FORM MODAL
      ========================= */}
      <PartnerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}