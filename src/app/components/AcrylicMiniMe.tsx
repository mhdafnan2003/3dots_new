import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";

export function AcrylicMiniMe() {
  const containerRef = useRef<HTMLElement>(null);

  // Responsive layout state to adjust orbital spacing
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Define rising Y offsets for the banner edge crop animation (scaled up for even larger character sizes)
  const centerY = isMobile ? 135 : 180;
  const sideY = isMobile ? 160 : 220;
  const backY = isMobile ? 450 : 620;


  // Track scroll position of the section relative to the viewport
  // Offset ["start start", "end end"] pins the container during the full progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Clamp the scroll progress between 0.0 and 1.0 to prevent scroll extrapolation bugs
  const clampedProgress = useTransform(scrollYProgress, (val) => Math.max(0, Math.min(1, val)));

  const characters = [
    {
      name: "Boss Baby",
      src: "/images/boss_baby.png",
      width: "37%",
    },
    {
      name: "Snow White",
      src: "/images/snow_white.png",
      width: "45%",
    },
    {
      name: "Superman",
      src: "/images/superman.png",
      width: "40%",
    },
    {
      name: "Spider-Man",
      src: "/images/spiderman.png",
      width: "34%",
    }
  ];

  // Carousel relative positions (using clampedProgress): 
  // 0 = Center (heavy projection front)
  // -1 = Left (tilted, smaller side)
  // 1 = Right (tilted, smaller side)
  // 2 / -2 = Back (invisible, behind center)

  // Character 0 (Boss Baby) scroll-bound relative position
  const c0XRelative = useTransform(
    clampedProgress,
    [0, 0.15, 0.40, 0.50, 0.55, 0.65, 0.80, 0.90, 1.0],
    [0, 0, -1, -0.5, 0, 0, 0.5, 1, 1]
  );
  const c0X = useTransform(c0XRelative, (val) => `${val * (isMobile ? 22 : 13)}vw`);

  // Character 1 (Snow White) scroll-bound relative position
  const c1XRelative = useTransform(
    clampedProgress,
    [0, 0.15, 0.40, 0.65, 0.75, 0.80, 0.90, 1.0],
    [1, 1, 0, -1, -0.5, 0, 0, 0]
  );
  const c1X = useTransform(c1XRelative, (val) => `${val * (isMobile ? 22 : 13)}vw`);

  // Character 2 (Superman) scroll-bound relative position
  const c2XRelative = useTransform(
    clampedProgress,
    [0, 0.15, 0.30, 0.40, 0.65, 0.90, 1.0],
    [0, 0, 0.5, 1, 0, -1, -1]
  );
  const c2X = useTransform(c2XRelative, (val) => `${val * (isMobile ? 22 : 13)}vw`);

  // Character 3 (Spider-Man) scroll-bound relative position
  const c3XRelative = useTransform(
    clampedProgress,
    [0, 0.15, 0.25, 0.30, 0.40, 0.55, 0.65, 0.90, 1.0],
    [-1, -1, -0.5, 0, 0, 0.5, 1, 0, 0]
  );
  const c3X = useTransform(c3XRelative, (val) => `${val * (isMobile ? 22 : 13)}vw`);

  // Scroll-bound scales (Center: 2.4x, Left/Right: 1.5x, Back: 0.65x)
  const c0Scale = useTransform(clampedProgress, [0, 0.15, 0.40, 0.50, 0.55, 0.65, 0.80, 0.90, 1.0], [2.4, 2.4, 1.5, 0.9, 0.65, 0.65, 0.9, 1.5, 1.5]);
  const c1Scale = useTransform(clampedProgress, [0, 0.15, 0.40, 0.65, 0.75, 0.80, 0.90, 1.0], [1.5, 1.5, 2.4, 1.5, 0.9, 0.65, 0.65, 0.65]);
  const c2Scale = useTransform(clampedProgress, [0, 0.15, 0.30, 0.40, 0.65, 0.90, 1.0], [0.65, 0.65, 0.9, 1.5, 2.4, 1.5, 1.5]);
  const c3Scale = useTransform(clampedProgress, [0, 0.15, 0.25, 0.30, 0.40, 0.55, 0.65, 0.90, 1.0], [1.5, 1.5, 0.9, 0.65, 0.65, 0.9, 1.5, 2.4, 2.4]);

  // Scroll-bound opacities (Center: 1.0, Left/Right: 0.8, Back: 0.0)
  // Implementing early fade-out and late fade-in to ensure the fourth character is never visible
  const c0Opacity = useTransform(clampedProgress, [0, 0.15, 0.40, 0.50, 0.55, 0.65, 0.80, 0.90, 1.0], [1.0, 1.0, 0.8, 0.0, 0.0, 0.0, 0.0, 0.8, 0.8]);
  const c1Opacity = useTransform(clampedProgress, [0, 0.15, 0.40, 0.65, 0.75, 0.80, 0.90, 1.0], [0.8, 0.8, 1.0, 0.8, 0.0, 0.0, 0.0, 0.0]);
  const c2Opacity = useTransform(clampedProgress, [0, 0.15, 0.30, 0.40, 0.65, 0.90, 1.0], [0.0, 0.0, 0.0, 0.8, 1.0, 0.8, 0.8]);
  const c3Opacity = useTransform(clampedProgress, [0, 0.15, 0.25, 0.30, 0.40, 0.55, 0.65, 0.90, 1.0], [0.8, 0.8, 0.0, 0.0, 0.0, 0.0, 0.8, 1.0, 1.0]);

  // Scroll-bound rotations (Center: 0, Left: -12, Right: 12, Back: -20/20)
  const c0Rotate = useTransform(clampedProgress, [0, 0.15, 0.40, 0.50, 0.55, 0.65, 0.80, 0.90, 1.0], [0, 0, -12, -16, 0, 0, 6, 12, 12]);
  const c1Rotate = useTransform(clampedProgress, [0, 0.15, 0.40, 0.65, 0.75, 0.80, 0.90, 1.0], [12, 12, 0, -12, -16, 0, 0, 0]);
  const c2Rotate = useTransform(clampedProgress, [0, 0.15, 0.30, 0.40, 0.65, 0.90, 1.0], [0, 0, 6, 12, 0, -12, -12]);
  const c3Rotate = useTransform(clampedProgress, [0, 0.15, 0.25, 0.30, 0.40, 0.55, 0.65, 0.90, 1.0], [-12, -12, -16, 0, 0, 6, 12, 0, 0]);

  // Character 0 (Boss Baby) scroll-bound Y translation
  const c0Y = useTransform(
    clampedProgress,
    [0, 0.15, 0.40, 0.50, 0.55, 0.65, 0.80, 0.90, 1.0],
    [centerY, centerY, sideY, backY, backY, backY, backY, sideY, sideY]
  );

  // Character 1 (Snow White) scroll-bound Y translation
  const c1Y = useTransform(
    clampedProgress,
    [0, 0.15, 0.40, 0.65, 0.75, 0.80, 0.90, 1.0],
    [sideY, sideY, centerY, sideY, backY, backY, backY, backY]
  );

  // Character 2 (Superman) scroll-bound Y translation
  const c2Y = useTransform(
    clampedProgress,
    [0, 0.15, 0.30, 0.40, 0.65, 0.90, 1.0],
    [backY, backY, backY, sideY, centerY, sideY, sideY]
  );

  // Character 3 (Spider-Man) scroll-bound Y translation
  const c3Y = useTransform(
    clampedProgress,
    [0, 0.15, 0.25, 0.30, 0.40, 0.55, 0.65, 0.90, 1.0],
    [sideY, sideY, backY, backY, backY, backY, sideY, centerY, centerY]
  );

  // Z-Index transitions: 50 when active/center, 20 when left/right, 10 when invisible/back (behind center)
  const c0ZIndex = useTransform(clampedProgress, [0, 0.25, 0.26, 0.50, 0.51, 0.75, 0.76, 1.0], [50, 50, 20, 20, 10, 10, 20, 20]);
  const c1ZIndex = useTransform(clampedProgress, [0, 0.25, 0.26, 0.50, 0.51, 0.75, 0.76, 1.0], [20, 20, 50, 50, 20, 20, 10, 10]);
  const c2ZIndex = useTransform(clampedProgress, [0, 0.25, 0.26, 0.50, 0.51, 0.75, 0.76, 1.0], [10, 10, 20, 20, 50, 50, 20, 20]);
  const c3ZIndex = useTransform(clampedProgress, [0, 0.25, 0.26, 0.50, 0.51, 0.75, 0.76, 1.0], [20, 20, 10, 10, 20, 20, 50, 50]);

  // Floating name badge opacity
  const c0BadgeOpacity = useTransform(clampedProgress, [0, 0.10, 0.15, 0.25, 0.26], [1.0, 1.0, 1.0, 0.0, 0.0]);
  const c1BadgeOpacity = useTransform(clampedProgress, [0.25, 0.35, 0.40, 0.45, 0.55], [0.0, 0.0, 1.0, 0.0, 0.0]);
  const c2BadgeOpacity = useTransform(clampedProgress, [0.50, 0.60, 0.65, 0.70, 0.80], [0.0, 0.0, 1.0, 0.0, 0.0]);
  const c3BadgeOpacity = useTransform(clampedProgress, [0.75, 0.85, 0.90, 0.95, 1.0], [0.0, 0.0, 1.0, 1.0, 1.0]);

  // Color-changing drop-shadow and blur filter combined for each character
  const c0Filter = useTransform(
    clampedProgress,
    [0, 0.15, 0.40, 0.50, 0.55, 0.65, 0.80, 0.90, 1.0],
    [
      "blur(0px) drop-shadow(0 20px 30px rgba(212, 158, 49, 0.75))",
      "blur(0px) drop-shadow(0 20px 30px rgba(212, 158, 49, 0.75))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))"
    ]
  );

  const c1Filter = useTransform(
    clampedProgress,
    [0, 0.15, 0.40, 0.65, 0.75, 0.80, 0.90, 1.0],
    [
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(0px) drop-shadow(0 20px 30px rgba(61, 123, 137, 0.85))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))"
    ]
  );

  const c2Filter = useTransform(
    clampedProgress,
    [0, 0.15, 0.30, 0.40, 0.65, 0.90, 1.0],
    [
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(0px) drop-shadow(0 20px 30px rgba(30, 58, 138, 0.85))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))"
    ]
  );

  const c3Filter = useTransform(
    clampedProgress,
    [0, 0.15, 0.25, 0.30, 0.40, 0.55, 0.65, 0.90, 1.0],
    [
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(10px) drop-shadow(0 0px 0px rgba(0, 0, 0, 0))",
      "blur(4px) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.3))",
      "blur(0px) drop-shadow(0 20px 30px rgba(185, 28, 28, 0.85))",
      "blur(0px) drop-shadow(0 20px 30px rgba(185, 28, 28, 0.85))"
    ]
  );

  // Glare sweep opacity
  const c0Glare = useTransform(clampedProgress, [0, 0.15, 0.25], [0.4, 0.4, 0.0]);
  const c1Glare = useTransform(clampedProgress, [0.25, 0.40, 0.55], [0.0, 0.4, 0.0]);
  const c2Glare = useTransform(clampedProgress, [0.50, 0.65, 0.80], [0.0, 0.4, 0.0]);
  const c3Glare = useTransform(clampedProgress, [0.75, 0.90, 1.0], [0.0, 0.4, 0.4]);

  // Group animated props
  const animatedChars = [
    { ...characters[0], x: c0X, y: c0Y, scale: c0Scale, opacity: c0Opacity, rotate: c0Rotate, zIndex: c0ZIndex, badgeOpacity: c0BadgeOpacity, glare: c0Glare, filter: c0Filter },
    { ...characters[1], x: c1X, y: c1Y, scale: c1Scale, opacity: c1Opacity, rotate: c1Rotate, zIndex: c1ZIndex, badgeOpacity: c1BadgeOpacity, glare: c1Glare, filter: c1Filter },
    { ...characters[2], x: c2X, y: c2Y, scale: c2Scale, opacity: c2Opacity, rotate: c2Rotate, zIndex: c2ZIndex, badgeOpacity: c2BadgeOpacity, glare: c2Glare, filter: c2Filter },
    { ...characters[3], x: c3X, y: c3Y, scale: c3Scale, opacity: c3Opacity, rotate: c3Rotate, zIndex: c3ZIndex, badgeOpacity: c3BadgeOpacity, glare: c3Glare, filter: c3Filter },
  ];

  // Timeline indicator dots
  const dot0Scale = useTransform(clampedProgress, [0, 0.10, 0.15, 0.25, 1.0], [1, 1, 1.5, 1, 1]);
  const dot0Opacity = useTransform(clampedProgress, [0, 0.10, 0.15, 0.25, 1.0], [0.4, 0.4, 1.0, 0.4, 0.4]);

  const dot1Scale = useTransform(clampedProgress, [0, 0.35, 0.40, 0.45, 1.0], [1, 1, 1.5, 1, 1]);
  const dot1Opacity = useTransform(clampedProgress, [0, 0.35, 0.40, 0.45, 1.0], [0.4, 0.4, 1.0, 0.4, 0.4]);

  const dot2Scale = useTransform(clampedProgress, [0, 0.60, 0.65, 0.70, 1.0], [1, 1, 1.5, 1, 1]);
  const dot2Opacity = useTransform(clampedProgress, [0, 0.60, 0.65, 0.70, 1.0], [0.4, 0.4, 1.0, 0.4, 0.4]);

  const dot3Scale = useTransform(clampedProgress, [0, 0.85, 0.90, 0.95, 1.0], [1, 1, 1.5, 1, 1]);
  const dot3Opacity = useTransform(clampedProgress, [0, 0.85, 0.90, 0.95, 1.0], [0.4, 0.4, 1.0, 0.4, 0.4]);

  const dots = [
    { scale: dot0Scale, opacity: dot0Opacity },
    { scale: dot1Scale, opacity: dot1Opacity },
    { scale: dot2Scale, opacity: dot2Opacity },
    { scale: dot3Scale, opacity: dot3Opacity },
  ];

  // Active background color overlay and timeline indicator variables
  const activeBgColor = useTransform(
    clampedProgress,
    [0.15, 0.40, 0.65, 0.90],
    ["rgba(212, 158, 49, 0.45)", "rgba(61, 123, 137, 0.45)", "rgba(30, 58, 138, 0.45)", "rgba(185, 28, 28, 0.45)"]
  );

  const highlightX = useTransform(clampedProgress, [0.15, 0.40, 0.65, 0.90], [-33, -11, 11, 33]);
  const highlightColor = useTransform(clampedProgress, [0.15, 0.40, 0.65, 0.90], ["#d49e31", "#3D7B89", "#1e3a8a", "#b91c1c"]);
  const highlightShadow = useTransform(clampedProgress, [0.15, 0.40, 0.65, 0.90], [
    "0 0 12px rgba(212, 158, 49, 0.9)",
    "0 0 12px rgba(61, 123, 137, 0.9)",
    "0 0 12px rgba(30, 58, 138, 0.9)",
    "0 0 12px rgba(185, 28, 28, 0.9)"
  ]);

  const backdropShadow = useTransform(clampedProgress, [0.15, 0.40, 0.65, 0.90], [
    "0 0 120px 45px rgba(212, 158, 49, 0.5)",
    "0 0 120px 45px rgba(61, 123, 137, 0.5)",
    "0 0 120px 45px rgba(30, 58, 138, 0.5)",
    "0 0 120px 45px rgba(185, 28, 28, 0.5)"
  ]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[200vh] md:h-[250vh] overflow-visible bg-transparent z-10"
    >
      {/* Sticky container that keeps the section pinned during the scroll progression */}
      <div className="sticky top-[15vh] h-[380px] md:h-[500px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#d49e31] via-[#be8624] to-[#a1701a] border-y border-white/10 shadow-lg">
        {/* Color changing background overlay */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none mix-blend-overlay"
          style={{ backgroundColor: activeBgColor }}
        />

        {/* Background Image Wrapper spanning full width */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none select-none z-0"
          style={{ 
            backgroundImage: "url('/images/acrylic_bg.png')",
            backgroundSize: isMobile ? "cover" : "100% 100%",
            backgroundPosition: isMobile ? "center" : "bottom",
          }}
        />


        {/* Desktop-only transparent clickable overlay that tracks the full-width background image's button */}
        <Link
          to="/products?category=laser-acrylic"
          className="hidden md:block absolute right-0 top-0 bottom-0 w-[30%] cursor-pointer z-30 opacity-0"
          aria-label="Order Now"
        />

        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-around md:justify-between gap-6 md:gap-12 h-full md:h-auto py-8 md:py-0">
          {/* Left Side: Spaced placeholder to align with background layout */}
          <div className="w-full md:w-[30%] hidden md:flex" />

          {/* Center: Dynamic Character Stage (middle-aligned) */}
          <div className="w-full md:w-[40%] flex flex-col items-center justify-end relative h-full min-h-[320px] md:min-h-[460px] order-2 md:order-2 overflow-visible pb-0">

            {/* Glowing active character back drop aura */}
            <motion.div
              style={{
                backgroundColor: highlightColor,
                boxShadow: backdropShadow
              }}
              className="absolute w-40 h-40 rounded-full blur-[80px] opacity-70 z-0 pointer-events-none top-1/4"
            />

            {/* Character Standees */}
            <div className="relative w-full h-[260px] md:h-[350px] overflow-visible">
              {animatedChars.map((char) => {
                return (
                  <motion.div
                    key={char.name}
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "0px",
                      width: char.width,
                      x: "-50%", // Center character horizontally as base layout
                      zIndex: char.zIndex,
                    }}
                    className="pointer-events-none overflow-visible origin-bottom"
                  >
                    {/* Inner motion container that handles scroll-bound translation */}
                    <motion.div
                      style={{
                        x: char.x,
                        y: char.y,
                        scale: char.scale,
                        opacity: char.opacity,
                        rotate: char.rotate,
                        filter: char.filter,
                      }}
                      className="cursor-pointer pointer-events-auto group/char drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] filter origin-bottom"
                    >
                      <img
                        src={char.src}
                        alt={char.name}
                        className="w-full h-auto object-contain select-none"
                      />
                      


                      {/* Subtle 3D Reflection Glare Overlay on Active scroll projection */}
                      <motion.div 
                        style={{ opacity: char.glare }}
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/30 rounded-[20%] pointer-events-none transition-opacity duration-150" 
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Timeline / Dots Indicator */}
            <div className="absolute -bottom-10 flex justify-center items-center gap-3 w-full z-20 h-3">
              {/* Sliding Highlight Pill */}
              <motion.div
                style={{
                  x: highlightX,
                  backgroundColor: highlightColor,
                  boxShadow: highlightShadow,
                }}
                className="absolute w-4 h-4 rounded-full -translate-x-1/2 z-10"
              />

              {dots.map((dot, idx) => (
                <motion.div
                  key={idx}
                  style={{
                    scale: dot.scale,
                    opacity: dot.opacity,
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-white/80 cursor-pointer z-20"
                />
              ))}
            </div>
          </div>

          {/* Right Side: CTA Button and brand logo box (visible on mobile only, since desktop has full-width image background button) */}
          <div className="w-full md:w-[30%] flex flex-row items-center md:items-end justify-center md:justify-end order-1 md:order-3 md:min-h-[260px] pb-6 md:pb-10 gap-4 z-10">
            {/* Mobile-only interactive elements */}
            <div className="flex flex-row items-center gap-4 md:hidden">
              {/* Brand Logo outline box */}
              <div className="w-11 h-11 border border-white/30 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm shadow-md">
                <svg className="w-5.5 h-5.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21L21 3" />
                  <path d="M9 3h12v12" />
                  <circle cx="7" cy="17" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </div>

              <Link
                to="/products?category=laser-acrylic"
                className="group flex items-center gap-3 border border-white/40 hover:border-white text-white px-7 py-3.5 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-sm bg-white/5 shadow-md"
              >
                ORDER NOW
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
