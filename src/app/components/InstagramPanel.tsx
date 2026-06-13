import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";

export interface Reel {
  id: string;
  videoUrl: string;
  poster: string;
  caption: string;
  views: string;
  likes: string;
  comments: string;
  instagramUrl: string;
}

// Custom titles and status tags for overlays based on index (retained for types but not rendered)
export const getVideoMetadata = (index: number) => {
  const metadata = [
    { tag: "• LIVE DEMO", title: "Precision Laser Cutting", site: "www.3dotsadv.com" },
    { tag: "• FABRICATION", title: "LED Signboard Assembly", site: "www.3dotsadv.com" },
    { tag: "• DESIGN STUDIO", title: "Creative Brand Design", site: "www.3dotsadv.com" },
    { tag: "• PRINTING HUB", title: "High-Speed Offset Press", site: "www.3dotsadv.com" },
    { tag: "• CNC ROUTING", title: "3D Acrylic Signage", site: "www.3dotsadv.com" }
  ];
  return metadata[index % metadata.length];
};

interface InstagramPanelProps {
  instagramReels: string[];
  isOpen: boolean;
  onClose: () => void;
  activeReel?: any;
  setActiveReel?: (reel: any) => void;
}

export function InstagramPanel({ instagramReels, isOpen, onClose }: InstagramPanelProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeReels = instagramReels.filter(code => !!code);

  return (
    <>
      <style>{`
        .insta-iframe-crop {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border: 0 !important;
        }
      `}</style>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
            />

            {/* Slide-out Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0F172A]/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-2xl text-white overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full p-[2px] bg-[#3D7B89] flex items-center justify-center">
                      <img
                        src="/images/3dotfav.png"
                        alt="3Dots Advertising"
                        className="w-full h-full rounded-full border-2 border-slate-900 bg-white object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm tracking-tight">3Dots Advertising</h3>
                    </div>
                    <p className="text-xs text-white/50">Premium Work Showcase</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/80 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Video List (Vertical Scroll) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D7B89]">Work In Action</h4>
                
                <div className="space-y-6">
                  {activeReels.map((shortcode) => {
                    return (
                      <div
                        key={shortcode}
                        className="relative w-full rounded-[32px] overflow-hidden bg-[#0F172A] border border-white/5 shadow-lg flex flex-col justify-between"
                        style={{ aspectRatio: "9/16" }}
                      >
                        {shortcode.startsWith('video:') ? (
                          <video
                            src={shortcode.replace('video:', '')}
                            className="insta-iframe-crop"
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <iframe
                            src={`https://www.instagram.com/p/${shortcode}/embed`}
                            className="insta-iframe-crop"
                            scrolling="no"
                            allowTransparency
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            sandbox="allow-scripts allow-same-origin allow-presentation"
                            loading="lazy"
                          />
                        )}
                      </div>
                    );
                  })}
                  {activeReels.length === 0 && (
                    <div className="text-center py-12 text-white/40 text-xs">
                      No work videos configured. Configure them in site settings!
                    </div>
                  )}
                </div>
              </div>
              
              {/* Footer brand link */}
              <div className="p-6 border-t border-white/10 bg-slate-950/50 text-center">
                <a
                  href="#contact"
                  onClick={(e) => {
                    onClose();
                    const el = document.getElementById("contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3D7B89] hover:text-[#4a93a4] transition-colors"
                >
                  Get In Touch For Custom Signage
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface InstagramSectionProps {
  instagramReels: string[];
  onOpenDrawer: () => void;
  onPlayReel?: (reel: any) => void;
}

export function InstagramSection({ instagramReels, onOpenDrawer }: InstagramSectionProps) {
  const activeReels = instagramReels.filter(code => !!code);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Responsive device check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Intersection Observer to run autoplay only when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play sliding loop with visibility and hover check (slides every 8 seconds)
  useEffect(() => {
    if (!isIntersecting || activeReels.length === 0 || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % activeReels.length);
    }, 8000); // Shift slide every 8 seconds

    return () => clearInterval(interval);
  }, [isIntersecting, activeReels.length, isHovered]);

  const handleCardClick = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  return (
    <section ref={sectionRef} className="bg-[#F8FAFC] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden z-10 border-t border-b border-gray-100">
      <style>{`
        .insta-iframe-crop {
          position: absolute !important;
          inset: 0 !important;
          width: 100% !important;
          height: 100% !important;
          border: 0 !important;
        }
      `}</style>
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Branding and details */}
        <div className="lg:col-span-5 space-y-8 text-center lg:text-left z-20">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">Craft Showcase</span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight leading-[1.05] uppercase">
              <span style={{ color: '#3D7B89' }}>Watch our craft</span>
              <br />
              <span className="text-gray-400">in action.</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
              Watch our high-precision fabrication team bring designs to life. From laser cutting and LED signage to custom acrylic craftsmanship, see the precision details in every product.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            <a
              href="#contact"
              onClick={(e) => {
                const el = document.getElementById("contact");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="inline-flex items-center gap-3 bg-[#3D7B89] hover:bg-[#347689] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all hover:scale-105 shadow-md shadow-[#3D7B89]/10"
            >
              Get a Free Quote
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </a>

            <button
              onClick={onOpenDrawer}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-black/10 hover:border-black text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer bg-white"
            >
              Open Gallery Drawer
              <ArrowUpRight size={14} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Right Side: 3D Cover Flow Stack Carousel */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="lg:col-span-7 flex items-center justify-center min-h-[620px] relative w-full overflow-hidden select-none"
        >
          <div className="relative w-full max-w-[500px] h-[600px] flex items-center justify-center">
            {activeReels.map((shortcode, index) => {
              const total = activeReels.length;
              let offset = index - activeIndex;
              if (offset < -total / 2) offset += total;
              else if (offset > total / 2) offset -= total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 1.5;

              if (!isVisible) return null;

              // 3D placement math
              const stepX = isMobile ? 100 : 180;
              const xValue = offset * stepX;
              const scaleValue = isCenter ? 1.05 : 0.85 - Math.abs(offset) * 0.05;
              const zIndexValue = 30 - Math.abs(offset) * 10;
              const opacityValue = isCenter ? 1 : 0.6 - Math.abs(offset) * 0.15;
              const blurValue = isCenter ? "blur(0px)" : `blur(${Math.abs(offset) * 1.5}px)`;

              return (
                <motion.div
                  key={shortcode}
                  onClick={() => handleCardClick(index)}
                  animate={{
                    x: xValue,
                    scale: scaleValue,
                    zIndex: zIndexValue,
                    opacity: opacityValue,
                    filter: blurValue,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className={`absolute w-[328px] rounded-[32px] shadow-2xl overflow-hidden border border-black/5 bg-[#0F172A] cursor-pointer group origin-center ${
                    isCenter ? "pointer-events-auto" : "pointer-events-auto hover:opacity-80"
                  }`}
                  style={{ aspectRatio: "9/16" }}
                >
                  {/* Cropped Sandboxed Instagram Embed */}
                   {shortcode.startsWith('video:') ? (
                     <video
                       src={shortcode.replace('video:', '')}
                       className="insta-iframe-crop"
                       autoPlay
                       muted
                       loop
                       playsInline
                       style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                     />
                   ) : (
                     <iframe
                       src={`https://www.instagram.com/p/${shortcode}/embed`}
                       className={`insta-iframe-crop transition-all duration-300 ${
                         isCenter ? "pointer-events-auto" : "pointer-events-none"
                       }`}
                       scrolling="no"
                       allowTransparency
                       allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                       sandbox="allow-scripts allow-same-origin allow-presentation"
                       loading="lazy"
                     ></iframe>
                   )}

                  {/* Transparent overlay on non-centered cards to capture carousel clicks */}
                  {!isCenter && (
                    <div className="absolute inset-0 z-10 bg-transparent cursor-pointer" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
