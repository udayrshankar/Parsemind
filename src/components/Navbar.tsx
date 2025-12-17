// src/components/Navbar.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePageTransition } from './TransitionContext';
import { Link } from 'react-router-dom';


const links = [
  { name: "Home", href: "/" },
  { name: "Our Products", href: "#solutions" }, // This href acts as a fallback
  { name: "About", href: "/about" },
  { name: "Partners", href: "/partners" },
  { name: "Blogs", href: "/blogs" },
];

export const Navbar = () => {
  // 1. Get the trigger function from your Context
  const { triggerTransition } = usePageTransition();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 2. The Logic to intercept the click
  const handleNavClick = (e: React.MouseEvent, linkName: string) => {
    // Always close mobile menu on click
    setIsMobileMenuOpen(false);

    if (linkName === "Our Products") {
      // Stop the browser from jumping to "#solutions"
      e.preventDefault(); 
      // Trigger the Apple-style curtain
      triggerTransition("https://anseru.ai");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // 1. Load Calendly CSS
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. Load Calendly JS
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const openCalendly = () => {
    if (!isScriptLoaded || !window.Calendly) return;
    window.Calendly.initPopupWidget({
      url: 'https://calendly.com/kg-goutham-anseru/30min',
    });
  };


  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black backdrop-blur-xl py-4 shadow-md' 
          : 'bg-black py-6'
      }`}
    >
      <div className="px-29 mx-auto flex justify-between items-center">
        
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
              onClick={(e) => handleNavClick(e, link.name)} // Added Click Handler
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- CTA Button --- */}
        <div className="hidden lg:block">
          <button
            onClick={openCalendly}
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
                  onClick={(e) => handleNavClick(e, link.name)} // Added Click Handler
                  className="text-lg font-medium text-gray-300 hover:text-white cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
              <button className="w-full bg-white text-black py-3 font-semibold mt-4">
                Book a Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </nav>
  );
};