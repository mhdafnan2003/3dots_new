import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  name: string;
  reviewsCount: number;
  initial: string;
  initialBg: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Khulood Al. Marzooqi",
    reviewsCount: 8,
    initial: "K",
    initialBg: "bg-gray-400",
    text: "Very professional, I make UV dtf stickers with them , high quality and fast in production.. thanks to Shihab.."
  },
  {
    name: "Jasmine Aboobaker",
    reviewsCount: 6,
    initial: "J",
    initialBg: "bg-purple-600",
    text: "Professional and quality work with very prompt delivery.."
  },
  {
    name: "Deepu Tomas Jacob",
    reviewsCount: 18,
    initial: "D",
    initialBg: "bg-orange-500",
    text: "The team at 3dots is a group of talented and visionary young individuals who are ready to take on any challenge, even if it's something they have never encountered before. They consistently keep their promises and deliver their services on time. ALL THE BEST TEM 3 DOTS. HIGHLY RECOMMENDED for all your printing works."
  },
  {
    name: "Thariq ak",
    reviewsCount: 12,
    initial: "T",
    initialBg: "bg-zinc-700",
    text: "Wonderful service at the most competitive prices in market, been doing all our company's work from here."
  },
  {
    name: "Sulfi bin Muhammed",
    reviewsCount: 4,
    initial: "S",
    initialBg: "bg-stone-800",
    text: "great work and very nice and professional service..highly recommended"
  },
  {
    name: "Ayisha Perne",
    reviewsCount: 10,
    initial: "A",
    initialBg: "bg-amber-800",
    text: "3Dots service is best service. They make me happy for their excellent and sharp work. Thanks 3Dots."
  },
  {
    name: "Muhammed Althaf",
    reviewsCount: 3,
    initial: "M",
    initialBg: "bg-yellow-700",
    text: "Very excellent and good designing point... customers are very thankful to their work and sincerity...Thanks 3Dots..."
  }
];

const infiniteReviews = [...reviews, ...reviews, ...reviews];

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

export function PromotionalBanner() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Use refs for drag state coordinates to handle instant wrap-around updates smoothly without React state lag
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftStateRef = useRef(0);

  // Initialize scroll position to the middle set on mount (with a small timeout to ensure cards are measured)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        const cardEls = scrollRef.current.querySelectorAll(".snap-start");
        const cardN = cardEls[reviews.length] as HTMLElement;
        if (cardN) {
          scrollRef.current.scrollLeft = cardN.offsetLeft - scrollRef.current.offsetLeft;
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true;
    setIsMouseDown(true);
    startXRef.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeftStateRef.current = scrollRef.current?.scrollLeft || 0;
  };

  const handleMouseLeaveOrUp = () => {
    isMouseDownRef.current = false;
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMouseDownRef.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftStateRef.current - walk;
  };

  const scrollToCardIndex = (targetCardIndex: number) => {
    if (scrollRef.current) {
      const cardEls = scrollRef.current.querySelectorAll(".snap-start");
      const targetCard = cardEls[targetCardIndex] as HTMLElement;
      if (targetCard) {
        const targetScrollLeft = targetCard.offsetLeft - scrollRef.current.offsetLeft;
        scrollRef.current.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      }
    }
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    let { scrollLeft } = scrollRef.current;
    const cardEls = scrollRef.current.querySelectorAll(".snap-start");
    if (cardEls.length < reviews.length * 3) return;

    const card0 = cardEls[0] as HTMLElement;
    const cardN = cardEls[reviews.length] as HTMLElement;
    if (!card0 || !cardN) return;

    const loopWidth = cardN.offsetLeft - card0.offsetLeft;

    // Boundary checks for infinite wrap-around
    if (scrollLeft < loopWidth) {
      // Jump forward by loopWidth
      scrollRef.current.scrollLeft = scrollLeft + loopWidth;
      if (isMouseDownRef.current) {
        scrollLeftStateRef.current += loopWidth;
      }
      return;
    } else if (scrollLeft >= 2 * loopWidth) {
      // Jump backward by loopWidth
      scrollRef.current.scrollLeft = scrollLeft - loopWidth;
      if (isMouseDownRef.current) {
        scrollLeftStateRef.current -= loopWidth;
      }
      return;
    }

    // Find closest index within the middle set (indices reviews.length to 2 * reviews.length - 1)
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = reviews.length; i < 2 * reviews.length; i++) {
      const cardEl = cardEls[i] as HTMLElement;
      if (cardEl) {
        const offsetLeft = cardEl.offsetLeft - scrollRef.current.offsetLeft;
        const distance = Math.abs(offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i - reviews.length;
        }
      }
    }

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      scrollToCardIndex(activeIndex + reviews.length - 1);
    } else {
      scrollToCardIndex(activeIndex + reviews.length + 1);
    }
  };

  useEffect(() => {
    if (isHovered || isMouseDown) return;

    const interval = setInterval(() => {
      scrollToCardIndex(activeIndex + reviews.length + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, isMouseDown, activeIndex]);

  return (
    <section className="relative w-full py-16 md:py-24 bg-gradient-to-br from-[#2E626D] to-[#3D7B89] overflow-hidden z-0">
      <style>{`
        .no-scrollbar-forced::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          background: transparent !important;
        }
        .no-scrollbar-forced {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>

      {/* Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <span className="text-[12vw] font-black uppercase text-white/5 tracking-[0.1em] whitespace-nowrap">
          FEEDBACK
        </span>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 flex flex-col items-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-medium tracking-tight text-white uppercase text-center"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/60 text-sm md:text-base font-normal max-w-xl text-center"
          >
            Honest feedback from our valued clients
          </motion.p>
        </div>

        {/* Carousel Container Wrapper */}
        <div 
          className="relative group/carousel w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Floating Left Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 lg:-left-8 z-20 w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-[#2E626D] flex items-center justify-center shadow-xl transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 scale-90 group-hover/carousel:scale-100 cursor-pointer hidden md:flex border border-black/5 top-1/2 -translate-y-1/2"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Floating Right Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 lg:-right-8 z-20 w-12 h-12 rounded-full bg-white hover:bg-gray-100 text-[#2E626D] flex items-center justify-center shadow-xl transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 scale-90 group-hover/carousel:scale-100 cursor-pointer hidden md:flex border border-black/5 top-1/2 -translate-y-1/2"
            aria-label="Scroll Right"
          >
            <ChevronRight size={22} />
          </button>

          {/* Sliding Carousel Track */}
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
            className={`flex flex-row overflow-x-auto overflow-y-hidden no-scrollbar-forced gap-6 py-4 w-full cursor-grab ${
              isMouseDown 
                ? "cursor-grabbing select-none scroll-auto" 
                : "snap-x snap-mandatory scroll-smooth"
            }`}
          >
            {infiniteReviews.map((rev, idx) => (
              <div 
                key={idx}
                className="w-[300px] sm:w-[350px] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] min-h-[200px] md:min-h-[220px] bg-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between shrink-0 border border-white/10 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 snap-start"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm ${rev.initialBg}`}>
                        {rev.initial}
                      </div>
                      <div className="text-left">
                        <h4 className="text-sm font-bold text-gray-900 leading-tight">{rev.name}</h4>
                        <span className="text-[10px] text-gray-400 font-medium">{rev.reviewsCount} reviews</span>
                      </div>
                    </div>
                    <GoogleIcon />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                  </div>
                </div>

                {/* Review Content */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal text-left line-clamp-4 md:line-clamp-5 flex-1">
                  {rev.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
