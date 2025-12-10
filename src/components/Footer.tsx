// src/components/Footer.tsx
import { Reveal } from './Reveal';
// Make sure this image exists
import { WavyBackground } from './WavyBackground'
const footerLinks = {
  main: [
    { name: "Home", href: "#" },
    { name: "Solutions", href: "#" },
    { name: "Industries", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "About", href: "#" },
    { name: "Partners", href: "#" },
  ],
  pages: [
    { name: "Pages", href: "#" },
    { name: "Legal", href: "#" },
  ]
};

export const Footer = () => {
  return (
    <footer className="relative h-screen w-screen p-30 overflow-hidden isolate bg-black">
      
      {/* --- Background Layer --- */}
      <WavyBackground/>
      {/* Gradient Overlay for better text contrast */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/60 to-transparent" />

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* 1. Top CTA Section */}
        <div className="max-w-3xl mb-24">
          <Reveal>
            <h2 className="type-h2 text-white mb-6 leading-tight">
              We build intelligent AI Solutions for your business.
            </h2>
          </Reveal>
          
          <Reveal delay={0.1}>
            <p className="text-lg text-gray-300 mb-10 max-w-xl leading-relaxed font-inter">
              We build fully managed automation pipelines designed for business growth. Safe, responsible, and powerful.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-4">
              {/* Reusing the white button from Hero */}
              <button className='bg-white px-8 hover:bg-black hover:scale-105 cursor-pointer hover:text-white transition-all duration-300'>
                Book a Call
              </button>
              
              <button className='border-white border-2 h-15 px-8 hover:bg-black hover:scale-105 hover:border-0 cursor-pointer text-white transition-all duration-300'>
                How we Work
              </button>
            </div>
          </Reveal>
        </div>

        {/* 2. Links Section */}
        <Reveal delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pb-12 border-b border-white/10">
            
            {/* Left Column (Pages/Legal) */}
            <div className="flex flex-col gap-4">
              {footerLinks.pages.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-base font-medium text-gray-300 hover:text-white transition-colors font-inter"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Column (Main Nav) */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end items-start">
              {footerLinks.main.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-base font-medium text-gray-300 hover:text-white transition-colors font-inter"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
          </div>
        </Reveal>

        {/* 3. Bottom Logo Section */}
        <Reveal delay={0.4}>
          <div className="pt-12">
            {/* Using the serif font for the logo, similar to the headline */}
            <h3 className="text-3xl font-fraunces font-bold text-white tracking-tight">
              Parsemind AI
            </h3>
          </div>
        </Reveal>

      </div>
    </footer>
  );
};