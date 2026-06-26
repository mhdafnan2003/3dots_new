import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";

export default function WhatsAppFloat() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // If we are on the home page, listen to scroll position
    if (location.pathname === "/") {
      const handleScroll = () => {
        const threshold = window.innerHeight * 0.8;
        const shouldBeVisible = window.scrollY > threshold;
        setIsVisible(prev => {
          if (prev !== shouldBeVisible) {
            return shouldBeVisible;
          }
          return prev;
        });
      };

      // Set initial state based on current scroll
      setIsVisible(window.scrollY > window.innerHeight * 0.8);

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      // On other pages, always show it immediately
      setIsVisible(true);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          href="https://wa.me/97156259915?text=Hi%203Dots%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20your%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-12 right-6 md:right-8 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center z-50 group border border-white/10"
          aria-label="Contact us on WhatsApp"
        >
          <div className="relative flex-shrink-0">
            <img 
              src="/images/whatsapp.png" 
              alt="WhatsApp" 
              className="w-6 h-6 object-contain relative z-10" 
            />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#25D366] rounded-full border-2 border-black z-20" />
          </div>
          
          {/* Expanded State on Hover */}
          <div className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap flex items-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] font-['Space_Grotesk'] ml-3">Inquiry</span>
            <span className="text-[10px] text-white/50 uppercase tracking-[0.1em] ml-2">Available Now</span>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
