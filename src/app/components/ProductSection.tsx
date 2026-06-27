import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ProductCardProps {
  id?: string;
  title: string;
  image: string;
  category: string;
  titleLine2?: string;
  linkTo?: string;
  onCardClick?: (e: React.MouseEvent) => void;
}

function ProductCard({ id, title, image, category, linkTo, onCardClick }: ProductCardProps) {
  const content = (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <div className="aspect-[4/5] overflow-hidden rounded-xl sm:rounded-2xl bg-gray-50 mb-3 sm:mb-6 shadow-sm">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1 text-center">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 block mb-1">{category}</span>
        <h3 className="text-base sm:text-[20px] font-bold text-black tracking-tight leading-tight group-hover:text-[#3D7B89] transition-colors flex flex-col items-center">
          <span>{title}</span>
        </h3>
      </div>
    </motion.div>
  );

  if (linkTo) {
    return <Link to={linkTo} onClick={onCardClick} className="block cursor-pointer">{content}</Link>;
  }
  if (id) {
    return <Link to={`/products/${id}`} onClick={onCardClick} className="block cursor-pointer">{content}</Link>;
  }
  return content;
}

interface ProductSectionProps {
  title: string;
  products: ProductCardProps[];
  categoryKey?: string;
  reversed?: boolean;
  transparent?: boolean;
  className?: string;
  bgColor?: string;
}

export function ProductSection({ 
  title, 
  products, 
  categoryKey, 
  reversed = false, 
  transparent = false, 
  className = '', 
  bgColor = 'bg-white' 
}: ProductSectionProps) {
  const words = title.split(' ');
  const firstWord = words[0];
  const ampersandIndex = words.indexOf('&');
  let line1 = title;
  let line2 = '';

  if (ampersandIndex !== -1 && ampersandIndex + 1 < words.length) {
    line1 = words.slice(0, ampersandIndex + 2).join(' ');
    line2 = words.slice(ampersandIndex + 2).join(' ');
  } else if (words.length > 1) {
    line1 = words.slice(0, -1).join(' ');
    line2 = words[words.length - 1];
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const viewAllHref = categoryKey ? `/products?category=${categoryKey}` : "/products";

  const [imageHeight, setImageHeight] = useState<number | null>(null);

  // Desktop Drag to Scroll States & Handlers
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollLeftState(scrollRef.current.scrollLeft);
    setDragged(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5) {
      setDragged(true);
    }
    scrollRef.current.style.scrollSnapType = "none";
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging && scrollRef.current) {
      scrollRef.current.style.scrollSnapType = "x mandatory";
    }
    setIsDragging(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (scrollRef.current) {
        const imgEl = scrollRef.current.querySelector('.aspect-\\[4\\/5\\]');
        if (imgEl) {
          setImageHeight(imgEl.clientHeight);
        }
      }
    };

    updateHeight();
    
    // Add small delay to ensure rendering completes
    const timer = setTimeout(updateHeight, 100);

    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth; // Scroll by one full viewport width
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderTitle = (text: string, isLine2: boolean) => {
    const wordsArray = text.split(' ');
    return wordsArray.map((word, i) => {
      const isAmp = word === '&';
      
      let className = "font-bold";
      let style: React.CSSProperties = { color: '#3D7B89' };

      if (isAmp) {
        className = "text-gray-400 font-light";
        style = {};
      } else if (isLine2) {
        className = "text-gray-400 font-bold";
        style = {};
      }

      return (
        <span key={i}>
          <span className={className} style={style}>
            {word}
          </span>
          {i < wordsArray.length - 1 ? ' ' : ''}
        </span>
      );
    });
  };

  return (
    <section className={`relative z-10 py-12 md:py-28 ${transparent ? 'bg-transparent' : bgColor} ${className}`}>
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
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between items-center md:items-end gap-6 mb-12`}
        >
          <div className="max-w-3xl lg:max-w-4xl w-full text-center md:text-left">
            <h2 className="font-bold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-[50px] leading-tight lg:leading-[52px] tracking-[-1px] lg:tracking-[-2px] text-center md:text-left">
              {renderTitle(line1, false)}
              {line2 && (
                <>
                  <br />
                  {renderTitle(line2, true)}
                </>
              )}
            </h2>
          </div>
          
          <div className="flex items-center gap-6 self-end md:self-auto">
            <Link
              to={viewAllHref}
              className="hidden md:flex group items-center gap-2.5 bg-[#3D7B89] hover:bg-[#347689] text-white px-5 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all shadow-md shadow-[#3D7B89]/10"
            >
              VIEW ALL {firstWord}
              <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Carousel Container Wrapper with hover-trigger group */}
        <div className="relative group/carousel w-full">
          
          {/* Floating Left Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-6 lg:-left-8 z-20 w-12 h-12 rounded-full bg-[#3D7B89] hover:bg-[#347689] text-white flex items-center justify-center shadow-lg shadow-[#3D7B89]/25 transition-all duration-300 scale-100 hover:scale-105 cursor-pointer hidden md:flex border border-white/10 -translate-y-1/2"
            style={{ top: imageHeight ? `${imageHeight / 2}px` : '50%' }}
            aria-label="Scroll Left"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Floating Right Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute -right-6 lg:-right-8 z-20 w-12 h-12 rounded-full bg-[#3D7B89] hover:bg-[#347689] text-white flex items-center justify-center shadow-lg shadow-[#3D7B89]/25 transition-all duration-300 scale-100 hover:scale-105 cursor-pointer hidden md:flex border border-white/10 -translate-y-1/2"
            style={{ top: imageHeight ? `${imageHeight / 2}px` : '50%' }}
            aria-label="Scroll Right"
          >
            <ChevronRight size={22} />
          </button>

          {/* Slidable Carousel Container */}
          <div 
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex flex-row overflow-x-auto overflow-y-hidden no-scrollbar-forced scroll-smooth gap-4 sm:gap-8 md:gap-10 pt-2 pb-4 snap-x snap-mandatory ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1.33rem)] lg:w-[calc(25%-1.875rem)] shrink-0 snap-start"
              >
                <ProductCard {...product} onCardClick={handleCardClick} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 md:hidden flex justify-center w-full">
          <Link
            to={viewAllHref}
            className="group flex items-center justify-center gap-2.5 bg-[#3D7B89] hover:bg-[#347689] text-white px-6 py-4 w-full text-[11px] font-bold uppercase tracking-[0.15em] transition-all text-center rounded-xl shadow-md shadow-[#3D7B89]/10"
          >
            VIEW ALL {firstWord}
            <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
