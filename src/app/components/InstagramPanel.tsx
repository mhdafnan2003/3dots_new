import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Instagram, ExternalLink, ArrowUpRight, Play } from "lucide-react";

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

export const reelsData: Reel[] = [];

// Static metadata for 3Dots Advertising showcase cards
const reelsMeta = [
  {
    category: "Laser Precision",
    title: "Laser Cutting & Acrylic Works",
    image: "/images/laser_cutting_fallback.jpg",
  },
  {
    category: "Branding Apparel",
    title: "Screen & Fabric Printing",
    image: "/images/fabric_printing_fallback.jpg",
  },
  {
    category: "Illuminated Signs",
    title: "LED Acrylic Installation",
    image: "/images/led_acrylic_signs_fallback.jpg",
  },
  {
    category: "Large Format",
    title: "Digital Banner Printing",
    image: "/images/poster_printing_fallback.jpg",
  },
  {
    category: "Corporate Gifts",
    title: "Customized & Corporate Gifts",
    image: "/images/corporate_gift_sets_fallback.jpg",
  }
];

interface InstagramPanelProps {
  instagramReels: string[];
  isOpen: boolean;
  onClose: () => void;
  activeReel?: any;
  setActiveReel?: (reel: any) => void;
}

export function InstagramPanel({ instagramReels, isOpen, onClose }: InstagramPanelProps) {
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

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
                  <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 flex items-center justify-center">
                    <img
                      src="/images/3dotfav.png"
                      alt="3Dots Advertising"
                      className="w-full h-full rounded-full border-2 border-slate-900 bg-white object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#3D7B89] text-white rounded-full p-0.5 border border-slate-900">
                    <Instagram size={10} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm tracking-tight">3dots_adv</h3>
                    <span className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[8px] font-extrabold text-white">✓</span>
                  </div>
                  <p className="text-xs text-white/50">Instagram Work Showcase</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Profile Metrics Row */}
            <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center justify-around text-center text-xs">
              <div>
                <span className="block font-bold text-base text-white">{activeReels.length}</span>
                <span className="text-white/40 text-[10px] uppercase tracking-wider">Reels</span>
              </div>
              <div>
                <span className="block font-bold text-base text-white">12.5K</span>
                <span className="text-white/40 text-[10px] uppercase tracking-wider">Followers</span>
              </div>
              <a
                href="https://www.instagram.com/3dots_adv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-[#3D7B89] hover:bg-[#347689] text-white px-4 py-2 rounded-full font-bold tracking-wide transition-all hover:scale-105"
              >
                Follow
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Reels List (Vertical Scroll) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D7B89]">Work In Action</h4>
              
              <div className="space-y-6">
                {activeReels.map((shortcode) => (
                  <div
                    key={shortcode}
                    className="relative w-full rounded-2xl overflow-hidden bg-slate-900 border border-white/5 shadow-lg flex flex-col justify-between"
                    style={{ minHeight: "450px" }}
                  >
                    {isLoading[shortcode] !== false && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-10 space-y-3">
                        <div className="w-8 h-8 rounded-full border-2 border-[#3D7B89]/20 border-t-[#3D7B89] animate-spin" />
                        <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Loading Reel...</span>
                      </div>
                    )}
                    <iframe
                      src={`https://www.instagram.com/p/${shortcode}/embed`}
                      className="w-full h-full border-0 rounded-2xl"
                      style={{ minHeight: "450px" }}
                      scrolling="no"
                      allowTransparency
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      onLoad={() => setIsLoading(prev => ({ ...prev, [shortcode]: false }))}
                      loading="lazy"
                    ></iframe>
                  </div>
                ))}
                {activeReels.length === 0 && (
                  <div className="text-center py-12 text-white/40 text-xs">
                    No Instagram reels configured. Configure them in site settings!
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer brand link */}
            <div className="p-6 border-t border-white/10 bg-slate-950/50 text-center">
              <a
                href="https://www.instagram.com/3dots_adv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#3D7B89] hover:text-[#4a93a4] transition-colors"
              >
                Visit Official Instagram Page
                <Instagram size={14} />
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface InstagramSectionProps {
  instagramReels: string[];
  onOpenDrawer: () => void;
  onPlayReel?: (reel: any) => void;
}

export function InstagramSection({ instagramReels, onOpenDrawer }: InstagramSectionProps) {
  const activeReels = instagramReels.filter(code => !!code);
  const [activeIndex, setActiveIndex] = useState(2);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
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

  // Auto-play sliding loop with visibility and hover check
  useEffect(() => {
    if (!isIntersecting || activeReels.length === 0 || playingIndex !== null || isHovered) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % activeReels.length);
    }, 4000); // Shift slide every 4 seconds

    return () => clearInterval(interval);
  }, [isIntersecting, activeReels.length, playingIndex, isHovered]);

  // Reset play state if active index shifts
  useEffect(() => {
    setPlayingIndex(null);
  }, [activeIndex]);

  const handleCardClick = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };

  const handlePlayClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); // Avoid triggering slide navigation
    setPlayingIndex(index);
  };

  return (
    <section ref={sectionRef} className="bg-[#F8FAFC] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden z-10 border-t border-b border-gray-100">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Side: Branding and details */}
        <div className="lg:col-span-5 space-y-8 text-center lg:text-left z-20">
          <div className="space-y-4">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">Social Craft</span>
            <h2 className="text-4xl md:text-5xl font-normal tracking-tight leading-[1.05] uppercase">
              <span style={{ color: '#3D7B89' }}>Watch our craft</span>
              <br />
              <span className="text-gray-400">in motion.</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
              From high-precision laser cutting and LED sign assembly to custom screen printing, watch our team bring designs to life behind the scenes on our official Instagram feed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
            <a
              href="https://www.instagram.com/3dots_adv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#3D7B89] hover:bg-[#347689] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all hover:scale-105 shadow-md shadow-[#3D7B89]/10"
            >
              Follow @3dots_adv
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                <ArrowUpRight size={16} />
              </div>
            </a>

            <button
              onClick={onOpenDrawer}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-black/10 hover:border-black text-xs font-bold uppercase tracking-[0.15em] transition-all"
            >
              Open Gallery Drawer
              <Instagram size={14} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Right Side: 3D Cover Flow Stack Carousel */}
        <div 
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="lg:col-span-7 flex items-center justify-center min-h-[520px] relative w-full overflow-hidden select-none"
        >
          <div className="relative w-full max-w-[500px] h-[500px] flex items-center justify-center">
            {activeReels.map((shortcode, index) => {
              const total = activeReels.length;
              let offset = index - activeIndex;
              if (offset < -total / 2) offset += total;
              else if (offset > total / 2) offset -= total;

              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 1.5;

              if (!isVisible) return null;

              // 3D placement math
              const stepX = isMobile ? 90 : 170;
              const xValue = offset * stepX;
              const scaleValue = isCenter ? 1.05 : 0.85 - Math.abs(offset) * 0.05;
              const zIndexValue = 30 - Math.abs(offset) * 10;
              const opacityValue = isCenter ? 1 : 0.6 - Math.abs(offset) * 0.15;
              const blurValue = isCenter ? "blur(0px)" : `blur(${Math.abs(offset) * 1.5}px)`;

              const meta = reelsMeta[index % reelsMeta.length];

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
                  className={`absolute w-[240px] md:w-[280px] h-[440px] md:h-[480px] rounded-[32px] shadow-2xl overflow-hidden border border-black/5 bg-black cursor-pointer group origin-center ${
                    isCenter ? "pointer-events-auto" : "pointer-events-auto hover:opacity-80"
                  }`}
                >
                  {/* If center and clicked play, load iframe */}
                  {isCenter && playingIndex === index ? (
                    <iframe
                      src={`https://www.instagram.com/p/${shortcode}/embed`}
                      className="w-full h-full border-0 rounded-[32px] bg-white"
                      scrolling="no"
                      allowTransparency
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <>
                      {/* Card Cover Poster */}
                      <img
                        src={meta.image}
                        alt={meta.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 opacity-70 group-hover:opacity-85 transition-opacity" />

                      {/* Top Brand Logo */}
                      <div className="absolute top-6 right-6 z-10 flex items-center gap-1 bg-black/35 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/10 text-white">
                        <img
                          src="/images/3dotfav.png"
                          alt="3Dots"
                          className="w-4 h-4 rounded-full bg-white object-contain"
                        />
                        <span className="text-[9px] uppercase tracking-wider font-extrabold">3Dots</span>
                      </div>

                      {/* Pulsing Live Demo Badge */}
                      {isCenter && (
                        <div className="absolute bottom-28 left-6 z-10 flex items-center gap-1.5 bg-red-600/90 text-white text-[8px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg shadow-red-600/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Live Showcase
                        </div>
                      )}

                      {/* Text details (Bottom) */}
                      <div className="absolute bottom-6 left-6 right-6 z-10 text-left space-y-1">
                        <span className="text-[10px] text-[#3D7B89] uppercase tracking-wider font-bold">
                          {meta.category}
                        </span>
                        <h4 className="text-white text-base font-bold leading-tight line-clamp-1 uppercase tracking-tight">
                          {meta.title}
                        </h4>
                        <p className="text-white/50 text-[10px] leading-relaxed line-clamp-2">
                          Behind the scenes of our premium branding and signage production workflow.
                        </p>
                      </div>

                      {/* Play Action button overlay (for active card) */}
                      {isCenter && (
                        <button
                          onClick={(e) => handlePlayClick(e, index)}
                          className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all z-10 cursor-pointer group"
                        >
                          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-all duration-300 shadow-xl">
                            <Play size={26} className="fill-white translate-x-[2px]" />
                          </div>
                        </button>
                      )}
                    </>
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
