import { Link, useLocation } from "react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Portfolio", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ];

  const isWhiteNavbar = location.pathname.startsWith("/products") || location.pathname === "/gallery";

  // Dynamic styling based on the active page and scroll position
  const navBgClass = isWhiteNavbar
    ? (scrolled ? "bg-white/95 backdrop-blur-xl border-b border-black/10 py-2.5 shadow-sm" : "bg-white/95 border-b border-black/5 py-4")
    : (scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-2.5 shadow-sm" : "bg-transparent py-4");

  const logoSrc = isWhiteNavbar ? "/images/3Dotfooter.png" : "/images/3Dot.png";
  const logoHeightClass = isWhiteNavbar ? "h-5 md:h-8" : "h-6 md:h-10";

  const linkColorClass = isWhiteNavbar 
    ? "text-black/70 hover:text-black" 
    : "text-white/80 hover:text-white";

  const ctaClass = isWhiteNavbar 
    ? "bg-black text-white hover:bg-black/90" 
    : "bg-white text-black hover:bg-white/95";

  const mobileToggleClass = isWhiteNavbar ? "text-black" : "text-white";
  const mobileOverlayBg = "bg-black text-white";
  const mobileLinkColor = "text-white hover:text-white/60";
  
  const mobileCtaClass = "bg-white text-black hover:bg-white/95";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}>
        <div className="w-full px-6 md:px-12">
          <div className="flex justify-between items-center">
            <Link to="/" className="group flex items-center">
              <img 
                src={logoSrc} 
                alt="3Dot's Advertising" 
                className={`${logoHeightClass} w-auto object-contain`}
              />
            </Link>
  
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path} 
                  className={`text-[17px] font-medium tracking-wide transition-colors ${linkColorClass}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
  
            {/* Desktop CTA Button */}
            <Link
              to="/contact"
              className={`hidden lg:flex items-center gap-3 px-8 py-4 rounded-none transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] shadow-sm ${ctaClass} group`}
            >
              GET A QUOTE
              <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
  
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${mobileToggleClass}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>
  
      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`lg:hidden fixed inset-0 z-[99] p-8 flex flex-col overflow-y-auto ${mobileOverlayBg}`}
          >
            <div className="flex justify-between items-center mb-16">
              <Link to="/" className="flex items-center">
                <img 
                  src="/images/3Dot.png" 
                  alt="3Dot's Advertising" 
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>
  
            <div className="space-y-6 flex-grow mb-12">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-4xl font-bold transition-colors ${mobileLinkColor}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pb-24"
            >
              <Link
                to="/contact"
                className={`flex items-center justify-between p-6 w-full text-lg font-bold uppercase tracking-widest transition-all ${mobileCtaClass}`}
              >
                Get a Quote
                <ArrowRight size={24} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
