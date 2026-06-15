import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function AcrylicMiniMe() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Background text parallax movement
  const textLeftX = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const textRightX = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // General character scroll metrics (enters/scales as section comes into view)
  const charScale = useTransform(scrollYProgress, [0.1, 0.45], [0.8, 1]);
  const charOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);

  const characters = [
    {
      name: "Boss Baby",
      src: "/images/boss_baby.png",
      zIndex: 10,
      rotate: -8,
      hoverRotate: -2,
      style: {
        left: "12%",
        bottom: "10px",
        width: "25%",
        transformOrigin: "bottom center",
      }
    },
    {
      name: "Snow White",
      src: "/images/snow_white.png",
      zIndex: 30,
      rotate: 0,
      hoverRotate: 4,
      style: {
        left: "35%",
        bottom: "20px",
        width: "30%",
        transformOrigin: "bottom center",
      }
    },
    {
      name: "Superman",
      src: "/images/superman.png",
      zIndex: 20,
      rotate: -3,
      hoverRotate: 2,
      style: {
        left: "58%",
        bottom: "15px",
        width: "27%",
        transformOrigin: "bottom center",
      }
    },
    {
      name: "Spider-Man",
      src: "/images/spiderman.png",
      zIndex: 15,
      rotate: 6,
      hoverRotate: 10,
      style: {
        left: "76%",
        bottom: "8px",
        width: "23%",
        transformOrigin: "bottom center",
      }
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-gradient-to-br from-[#d49e31] via-[#be8624] to-[#a1701a] py-16 md:py-24 overflow-hidden z-10 border-y border-white/10"
    >
      {/* Background Big Text Parallax */}
      <div className="absolute inset-0 flex items-center justify-between px-[6vw] pointer-events-none select-none z-0">
        <motion.div 
          style={{ x: textLeftX }}
          className="text-[12vw] font-black text-white/5 tracking-widest"
        >
          MINI
        </motion.div>
        <motion.div 
          style={{ x: textRightX }}
          className="text-[12vw] font-black text-white/5 tracking-widest"
        >
          ME
        </motion.div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side: Description Text */}
        <div className="w-full md:w-[30%] text-left order-2 md:order-1 flex flex-col justify-end md:min-h-[300px]">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[13px] md:text-[14px] text-white/85 leading-relaxed font-medium max-w-md"
          >
            Acrylic Mini Me brings your personality to life through unique, custom-made acrylic characters designed just for you. Whether it's for gifts, branding, or personal keepsakes, we transform your photos and ideas into high-quality, detailed mini versions that stand out. With a focus on creativity, precision, and premium finishing, we create memorable pieces that capture your style in a fun and artistic way.
          </motion.p>
        </div>

        {/* Center: Dynamic Character Stage */}
        <div className="w-full md:w-[40%] flex flex-col items-center justify-center relative min-h-[350px] md:min-h-[420px] order-1 md:order-2 overflow-visible">
          {/* Stage Shadow */}
          <motion.div 
            style={{ opacity: charOpacity, scale: charScale }}
            className="absolute bottom-6 w-[85%] h-8 bg-black/40 rounded-full blur-md z-0" 
          />

          {/* Character Standees */}
          <div className="relative w-full h-[320px] md:h-[380px] overflow-visible">
            {characters.map((char, idx) => {
              // Stagger the slide-up movement slightly for each character
              const staggerY = useTransform(scrollYProgress, [0.1, 0.45], [200 + idx * 30, 0]);
              
              return (
                <motion.div
                  key={char.name}
                  style={{
                    position: "absolute",
                    zIndex: char.zIndex,
                    ...char.style,
                    y: staggerY,
                    scale: charScale,
                    opacity: charOpacity,
                  }}
                  className="cursor-pointer group/char drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] filter transition-all duration-300"
                  whileHover={{ 
                    scale: char.name === "Snow White" ? 1.15 : 1.05, 
                    y: -15, 
                    rotate: char.hoverRotate,
                    zIndex: 50,
                  }}
                >
                  <img
                    src={char.src}
                    alt={char.name}
                    className="w-full h-auto object-contain select-none"
                  />
                  {/* Subtle 3D Reflection Glare Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover/char:opacity-100 rounded-[20%] transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Header and CTA Button */}
        <div className="w-full md:w-[30%] flex flex-col items-start md:items-end justify-between order-3 md:min-h-[300px] gap-8 md:text-right">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <span className="text-[10px] md:text-xs tracking-[0.25em] text-white/70 uppercase font-bold block mb-2">
              EXQUISITE CUSTOM WORK
            </span>
            <h2 
              className="text-white uppercase"
              style={{
                fontSize: '32px',
                fontWeight: 800,
                lineHeight: '36px',
                letterSpacing: '-1px',
              }}
            >
              ACRYLIC MINI ME
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/products?category=laser-acrylic"
              className="group flex items-center gap-3 border border-white/40 hover:border-white text-white px-7 py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-[0.15em] backdrop-blur-sm bg-white/5"
            >
              ORDER NOW
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
