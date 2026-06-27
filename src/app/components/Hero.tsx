import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const isVideoUrl = (url: string) => {
  if (!url) return false;
  const cleanUrl = url.split("?")[0].toLowerCase();
  return (
    cleanUrl.endsWith(".mp4") ||
    cleanUrl.endsWith(".webm") ||
    cleanUrl.endsWith(".ogg") ||
    cleanUrl.endsWith(".mov") ||
    cleanUrl.includes("/video/") ||
    url.startsWith("data:video/")
  );
};

export function Hero() {
  const [heroBg, setHeroBg] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data && data.hero_bg) {
          setHeroBg(data.hero_bg);
        } else {
          setHeroBg("/images/hero-bg.png");
        }
      })
      .catch(err => {
        console.warn("Failed to fetch custom hero background from DB, using fallback", err);
        setHeroBg("/images/hero-bg.png");
      });
  }, []);

  const socialIcons: { src: string; href: string; alt: string; icon?: any }[] = [
    { src: "/images/instagram_icon.png", href: "https://www.instagram.com/3dots_adv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", alt: "Instagram" },
    { src: "/images/Whatsapp_icon.png", href: "https://wa.me/971563139733?text=Hi%203Dots%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20your%20services.", alt: "WhatsApp" },
    { src: "/images/Facebook_icon.png", href: "https://www.facebook.com/share/18jtsojQJV/?mibextid=wwXIfr", alt: "Facebook" }
  ];

  return (
    <section className="relative w-full min-h-screen flex items-end justify-center overflow-hidden pb-20 md:pb-16">
      {/* Background Media with Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        {heroBg && (
          isVideoUrl(heroBg) ? (
            <video
              key={heroBg}
              src={heroBg}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover animate-fade-in"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <img
              src={heroBg}
              alt="Printing Press"
              className="w-full h-full object-cover animate-fade-in"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/hero-bg.png'; }}
            />
          )
        )}
        <div className="absolute inset-0 w-full h-full bg-black/60"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-12 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span className="text-white/60 text-[9.5px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.25em] font-bold block max-w-none mx-auto leading-relaxed mb-6">
            Leading Printing Press in Abu Dhabi for Corporate Gifts, Crystal Awards, Signage & Branding Solutions across UAE
          </span>
          
          <p 
            className="max-w-4xl mx-auto mb-12 uppercase"
            style={{
              color: 'rgba(255, 255, 255, 0.60)',
              textAlign: 'center',
              fontFamily: '"Neue Regrade", sans-serif',
              fontSize: isMobile ? '13px' : '15.5px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: isMobile ? '20px' : '26px'
            }}
          >
            3Dots Advertising is a full-service printing press and branding company in Abu Dhabi <br className="hidden md:inline" /> offering corporate gifts, signage, large format printing, and promotional solutions across UAE.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full mt-4">
            <Link to="/contact" className="w-full max-w-[280px] sm:max-w-none sm:w-auto group flex items-center justify-center gap-2 bg-white text-black px-8 sm:px-10 py-4 sm:py-5 rounded-none hover:bg-white/90 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]">
              GET A QUOTE
              <ArrowRight size={16} />
            </Link>
            <Link to="/gallery" className="w-full max-w-[280px] sm:max-w-none sm:w-auto flex items-center justify-center gap-2 border border-white/40 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-none hover:bg-white/10 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]">
              EXPLORE WORK
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Social Icons - Bottom Left */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full flex justify-center md:left-12 md:w-auto md:justify-start z-20 items-center gap-4">
        {socialIcons.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/15 hover:scale-105 transition-all duration-300 group"
          >
            {item.icon ? (
              <item.icon className="w-5.5 h-5.5 text-white opacity-90 group-hover:opacity-100 transition-all" />
            ) : (
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-5.5 h-5.5 object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all" 
              />
            )}
          </motion.a>
        ))}
      </div>
    </section>
  );
}


