import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, ArrowRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";

type Category = "All" | "Digital & Printing" | "Screen & Offset" | "Laser & Acrylic" | "Outdoor & Indoor" | "Corporate Gifts";

interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
  client: string;
  year: string;
  imgId?: string;
  image?: string;
  w: number;
  h: number;
  span: string; // grid-row-span class
}

const items: GalleryItem[] = [
  {
    id: 1,
    title: "Corporate Brochure offset",
    category: "Digital & Printing",
    client: "Al Futtaim Group",
    year: "2026",
    image: "/images/Image (Corporate Brochure Suite — Offset).png",
    w: 1200,
    h: 800,
    span: "row-span-1",
  },
  {
    id: 2,
    title: "Outdoor signage Block",
    category: "Outdoor & Indoor",
    client: "GITEX Technology Week",
    year: "2025",
    image: "/images/outdoor.png",
    w: 800,
    h: 1000,
    span: "row-span-2",
  },
  {
    id: 3,
    title: "Indoor signage Block",
    category: "Outdoor & Indoor",
    client: "Expo City Dubai",
    year: "2025",
    image: "/images/indoor.png",
    w: 800,
    h: 1100,
    span: "row-span-2",
  },
  {
    id: 4,
    title: "Corporate Brochure offset",
    category: "Digital & Printing",
    client: "Al Futtaim Group",
    year: "2026",
    image: "/images/Image (Corporate Brochure Suite — Offset).png",
    w: 1200,
    h: 800,
    span: "row-span-1",
  },
  {
    id: 5,
    title: "Outdoor signage Block",
    category: "Outdoor & Indoor",
    client: "GITEX Technology Week",
    year: "2025",
    image: "/images/outdoor.png",
    w: 800,
    h: 1000,
    span: "row-span-2",
  },
  {
    id: 6,
    title: "Promotional merchandise",
    category: "Corporate Gifts",
    client: "Majid Al Futtaim",
    year: "2025",
    image: "/images/promo.png",
    w: 1200,
    h: 900,
    span: "row-span-2",
  },
];

const categories: Category[] = ["All", "Digital & Printing", "Screen & Offset", "Laser & Acrylic", "Outdoor & Indoor", "Corporate Gifts"];

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Inline zoom states & refs for the lightbox
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const zoomContainerRef = useRef<HTMLDivElement>(null);

  // Reset zoom on item switch or close
  useEffect(() => {
    setIsZoomed(false);
  }, [selected]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !zoomContainerRef.current) return;
    const { left, top, width, height } = zoomContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  useEffect(() => {
    fetch("/api/portfolio")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item: any, idx: number) => ({
            id: item._id || item.id || idx,
            title: item.title,
            category: item.category,
            client: item.client,
            year: item.year || "2026",
            image: item.image,
            w: 1200,
            h: 800,
            span: idx % 3 === 0 ? "row-span-1" : "row-span-2"
          }));
          setGalleryItems(formatted);
        } else {
          setGalleryItems(items);
        }
      })
      .catch(err => {
        console.warn("Failed to fetch portfolio from DB, using fallback", err);
        setGalleryItems(items);
      });
  }, []);

  const filtered = active === "All" ? galleryItems : galleryItems.filter((i) => i.category === active);

  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-28 md:pt-48 pb-12 md:pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12 mb-6 md:mb-16 text-center lg:text-left"
        >
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-black/30 mb-6 block">
              SELECTED WORKS — 2023-2026
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-medium tracking-tight leading-[0.95] text-[#3D7B89]">
              The Gallery
            </h1>
          </div>
          <div className="max-w-md lg:mb-2">
            <p className="text-base md:text-lg leading-relaxed text-[#8FA3A6]">
              Every piece a testament to craft. From Sheikh Zayed Road billboards to
              executive boardroom installs — our output speaks for itself.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Category Filters */}
      <section className="px-6 md:px-12 max-w-screen-2xl mx-auto mb-8 md:mb-16">
        <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border transition-all duration-300 ${
                active === cat 
                  ? "bg-[#3D7B89] text-white border-[#3D7B89] shadow-sm" 
                  : "bg-transparent text-black/35 border-black/10 hover:border-black/35 hover:text-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="px-6 md:px-12 max-w-screen-2xl mx-auto pb-12 md:pb-40">
        <motion.div
          layout
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="break-inside-avoid mb-4"
              >
                <button
                  onClick={() => setSelected(item)}
                  className="group relative w-full rounded-none overflow-hidden bg-gray-50 block text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D7B89]/50"
                >
                  <img
                    src={item.image || `https://images.unsplash.com/photo-${item.imgId}?w=${item.w}&h=${item.h}&fit=crop&auto=format`}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#3D7B89]/0 group-hover:bg-[#3D7B89]/90 transition-all duration-500 flex flex-col justify-end p-6">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-white/60 mb-2 font-bold">
                        {item.category} — {item.year}
                      </p>
                      <h3 className="text-white font-medium text-lg leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-xs">{item.client}</p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn size={18} className="text-white/80" />
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox */}
      <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 backdrop-blur-sm"
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-16"
            >
              {selected && (
                <div className="relative max-w-5xl w-full max-h-full flex flex-col md:flex-row gap-8">
                  <div 
                    ref={zoomContainerRef}
                    onMouseMove={handleMouseMove}
                    onClick={() => setIsZoomed(!isZoomed)}
                    className={`flex-1 overflow-hidden rounded-[2rem] shadow-2xl bg-zinc-950 flex items-center justify-center ${
                      isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                  >
                    <img
                      src={selected.image || `https://images.unsplash.com/photo-${selected.imgId}?w=1400&h=900&fit=crop&auto=format`}
                      alt={selected.title}
                      className="w-full h-full object-cover max-h-[70vh] md:max-h-[80vh] transition-transform duration-200 select-none"
                      style={{
                        transform: isZoomed ? "scale(2.5)" : "scale(1)",
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        pointerEvents: "none"
                      }}
                    />
                  </div>
                  <div className="md:w-64 flex flex-col justify-end shrink-0">
                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 mb-4 font-bold">
                      {selected.category} — {selected.year}
                    </p>
                    <h2 className="text-2xl font-medium text-white leading-tight mb-4">
                      {selected.title}
                    </h2>
                    <p className="text-white/45 text-sm mb-8">Client: {selected.client}</p>
                    <a
                      href="https://wa.me/971563139733?text=Hi%2C%20I%27m%20interested%20in%20a%20similar%20project"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-3 bg-white text-[#0A0A0A] px-6 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors rounded-none"
                    >
                      Request Similar
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              )}
              <Dialog.Close asChild>
                <button
                  className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-10"
                  aria-label="Close lightbox"
                >
                  <X size={28} strokeWidth={1.5} />
                </button>
              </Dialog.Close>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Bottom CTA Banner (Full Bleed) */}
      <section className="w-full bg-[#3D7B89] py-12 md:py-20 px-6 md:px-24 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden mt-12 md:mt-24">
        <div className="text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/40 mb-4 block font-bold">
            START YOUR PROJECT
          </span>
          <h3 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-tight">
            Want your brand <br />
            <span className="text-white/40">in this gallery?</span>
          </h3>
        </div>
        <a
          href="https://wa.me/971563139733?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%203Dots"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 border border-white/20 text-white px-8 py-4 hover:bg-white hover:text-[#3D7B89] transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]"
        >
          TALK TO US ON WHATSAPP
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </section>
    </main>
  );
}
