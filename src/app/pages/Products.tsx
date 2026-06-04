import { useState, useEffect } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link, useSearchParams } from "react-router";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const subcategoryParam = searchParams.get("subcategory");
  const categoryParam = searchParams.get("category");

  const categories = [
    { id: "all", name: "Archive" },
    { id: "digital-printing", name: "Digital & Printing" },
    { id: "screen-offset", name: "Screen & Offset" },
    { id: "laser-acrylic", name: "Laser & Acrylic" },
    { id: "outdoor-indoor", name: "Outdoor & Indoor" },
    { id: "corporate-gifts", name: "Corporate Gifts" },
  ];

  const digitalPrintingList = [
    "Business Cards", "Flyers & Brochures", "Letterheads", "Invoice Books",
    "Menu Printing", "Sticker Printing", "Poster Printing", "Catalogue Printing"
  ];
  const screenOffsetList = [
    "T-Shirt Printing", "Fabric Printing", "PVC Card Printing", "Envelope Printing",
    "Magazine Printing", "Packaging Printing", "Multi-Color Offset Printing", "Bulk Printing Services"
  ];
  const laserAcrylicList = [
    "Acrylic Sign Boards", "Acrylic Display Stands", "Name Plates", "Laser Cutting",
    "Laser Engraving", "Acrylic Boxes", "LED Acrylic Signs", "Trophy & Award Works"
  ];
  const outdoorIndoorList = [
    "Flex Banners", "Roll-Up Stands", "3D Sign Boards", "Backlit Signage",
    "Wayfinding Signs", "Vehicle Branding", "Wall Graphics", "Window Frosting"
  ];
  const corporateGiftsList = [
    "Customized Mugs", "Pen Printing", "Corporate Gift Sets", "ID Cards & Lanyards",
    "Keychains", "Caps Printing", "USB Gift Items", "Promotional Giveaways"
  ];

  useEffect(() => {
    fetch("/api/products")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((p, idx) => ({
            id: p._id || p.id || idx,
            category: p.category,
            subcategory: p.subcategory || '',
            name: p.title,
            titleLine2: p.titleLine2,
            image: p.image,
            year: p.year || "2026"
          }));
          setAllProducts(formatted);
        } else {
          setAllProducts([]);
        }
      })
      .catch(err => {
        console.warn("Failed to fetch products from DB", err);
        setAllProducts([]);
      });
  }, []);

  useEffect(() => {
    if (subcategoryParam) {
      if (digitalPrintingList.includes(subcategoryParam)) {
        setSelectedCategory("digital-printing");
      } else if (screenOffsetList.includes(subcategoryParam)) {
        setSelectedCategory("screen-offset");
      } else if (laserAcrylicList.includes(subcategoryParam)) {
        setSelectedCategory("laser-acrylic");
      } else if (outdoorIndoorList.includes(subcategoryParam)) {
        setSelectedCategory("outdoor-indoor");
      } else if (corporateGiftsList.includes(subcategoryParam)) {
        setSelectedCategory("corporate-gifts");
      }
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [subcategoryParam, categoryParam]);

  const filteredProducts = allProducts.filter((product) => {
    if (subcategoryParam && product.subcategory !== subcategoryParam) {
      return false;
    }
    if (selectedCategory === "all") return true;
    if (selectedCategory === "digital-printing") {
      return product.category === "printing" && digitalPrintingList.includes(product.subcategory);
    }
    if (selectedCategory === "screen-offset") {
      return product.category === "printing" && screenOffsetList.includes(product.subcategory);
    }
    if (selectedCategory === "laser-acrylic") {
      return product.category === "signage" && laserAcrylicList.includes(product.subcategory);
    }
    if (selectedCategory === "outdoor-indoor") {
      return product.category === "signage" && outdoorIndoorList.includes(product.subcategory);
    }
    if (selectedCategory === "corporate-gifts") {
      return product.category === "branding" && corporateGiftsList.includes(product.subcategory);
    }
    return false;
  });

  return (
    <div className="bg-white min-h-screen pt-28 md:pt-48 pb-12 md:pb-32 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col gap-12 mb-20">
          <div className="max-w-3xl text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-black/30 block mb-4">Our Work</span>
            <h1 className="text-5xl md:text-7xl lg:text-[90px] font-medium tracking-tight uppercase leading-[0.95]">
              <span className="text-[#3D7B89]">PROJECT</span> <br />
              <span className="text-gray-300">ARCHIVE.</span>
            </h1>
          </div>
          
          <div className="flex flex-nowrap overflow-x-auto no-scrollbar whitespace-nowrap gap-2 sm:gap-6 border-b border-black/5 pb-2 w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (subcategoryParam) {
                    const newParams = new URLSearchParams(searchParams);
                    newParams.delete("subcategory");
                    setSearchParams(newParams);
                  }
                }}
                className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-3 sm:px-4 py-2.5 transition-all shrink-0 focus:outline-none border-b-2 ${
                  selectedCategory === cat.id 
                    ? "text-[#3D7B89] border-[#3D7B89]" 
                    : "text-black/30 hover:text-black border-transparent"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory filter indicator */}
        {subcategoryParam && (
          <div className="flex items-center justify-start gap-3 mb-10 -mt-10 px-1">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-black/40">Filtered By:</span>
            <span className="inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] bg-[#3D7B89]/10 text-[#3D7B89] px-4 py-2 rounded-full border border-[#3D7B89]/20 shadow-sm">
              {subcategoryParam}
              <button
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  newParams.delete("subcategory");
                  setSearchParams(newParams);
                }}
                className="hover:text-black font-semibold text-sm transition-colors ml-1 focus:outline-none flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </span>
          </div>
        )}

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-12 gap-y-8 sm:gap-y-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group cursor-pointer block"
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="aspect-[4/5] rounded-[1.5rem] sm:rounded-[3rem] overflow-hidden bg-gray-50 mb-3 sm:mb-6 relative shadow-sm">
                    <ImageWithFallback 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-all duration-[1200ms] ease-out"
                    />
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2 px-2">
                    <div className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.25em] text-[#8E8E8E]">
                      <span>{product.subcategory || product.category}</span>
                    </div>
                    <h3 className="text-base sm:text-[21px] font-medium tracking-tight text-[#0A0A0A] group-hover:text-[#3D7B89] transition-colors leading-tight flex flex-col">
                      <span>{product.name}</span>
                    </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-48 text-center border-t border-black/5 pt-12 md:pt-24">
          <span className="text-[#8E8E8E] text-[15px] block mb-4 font-normal tracking-wide">
            Looking for a specific execution?
          </span>
          <a 
            href="https://wa.me/971563139733?text=Hi%203Dots%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
            className="group inline-flex items-center gap-3.5 text-3xl md:text-4xl font-medium text-[#0A0A0A] hover:text-[#3D7B89] transition-colors uppercase tracking-tight"
          >
            START A PROJECT
            <MessageCircle size={32} className="text-[#0A0A0A] group-hover:text-[#3D7B89] transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}
