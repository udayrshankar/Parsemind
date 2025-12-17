// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePageTransition } from './TransitionContext';
import { Link } from 'react-router-dom';
import { useCalendly } from './hooks/useCalendly'; // Import the new hook

const links = [
  { name: "Home", href: "/" },
  { name: "Our Products", href: "#solutions" }, 
  { name: "About", href: "/about" },
  { name: "Partners", href: "/partners" },
  { name: "Blogs", href: "/blogs" },
];

export const Navbar = () => {
  const { triggerTransition } = usePageTransition();
  const { loadScript, openPopup } = useCalendly(); // Use the hook
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, linkName: string) => {
    setIsMobileMenuOpen(false);

    if (linkName === "Our Products") {
      e.preventDefault(); 
      triggerTransition("https://anseru.ai");
    }
  };

  // Optimized Scroll Listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black backdrop-blur-xl py-4 shadow-md' 
          : 'bg-black py-6'
      }`}
    >
      <div className="px-6 md:px-12 lg:px-29 mx-auto flex justify-between items-center">
        
        {/* --- Logo --- */}
        <div className="text-2xl font-bold text-white tracking-tight cursor-pointer">
          Parsemind
        </div>

        {/* --- Desktop Links --- */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              onClick={(e) => handleNavClick(e, link.name)}
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- CTA Button (Optimized) --- */}
        <div className="hidden lg:block">
          <button
            onMouseEnter={loadScript} // Load heavy script only on hover
            onClick={openPopup}
            className="bg-white text-black font-bold text-xs px-5 py-2 md:py-2 hover:bg-black hover:text-white hover:scale-105 cursor-pointer transition-all duration-300 border border-black inline-flex items-center justify-center"
          >
            Book a Strategy Call
          </button>
        </div>

        {/* --- Mobile Toggle --- */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link.name)}
                  className="text-lg font-medium text-gray-300 hover:text-white cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <button 
                onMouseEnter={loadScript}
                onClick={openPopup}
                className="w-full bg-white text-black py-3 font-semibold mt-4"
              >
                Book a Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};