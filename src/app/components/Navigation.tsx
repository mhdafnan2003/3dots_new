import { Link, useLocation } from "react-router";
import { Menu, X, ArrowRight, ChevronDown, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  // Search Bar States
  const [searchHovered, setSearchHovered] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setSearchQuery("");
    setSearchFocused(false);
  }, [location]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Portfolio", path: "/gallery" },
    { name: "Contact", path: "/contact" }
  ];

  const megaMenuData = [
    {
      id: "digital-printing",
      name: "Digital & Printing",
      subcategories: [
        "Business Cards", "Flyers & Brochures", "Letterheads", "Invoice Books",
        "Menu Printing", "Sticker Printing", "Poster Printing", "Catalogue Printing"
      ]
    },
    {
      id: "screen-offset",
      name: "Screen & Offset",
      subcategories: [
        "T-Shirt Printing", "Fabric Printing", "PVC Card Printing", "Envelope Printing",
        "Magazine Printing", "Packaging Printing", "Multi-Color Offset Printing", "Bulk Printing Services"
      ]
    },
    {
      id: "laser-acrylic",
      name: "Laser & Acrylic",
      subcategories: [
        "Acrylic Sign Boards", "Acrylic Display Stands", "Name Plates", "Laser Cutting",
        "Laser Engraving", "Acrylic Boxes", "LED Acrylic Signs", "Trophy & Award Works"
      ]
    },
    {
      id: "outdoor-indoor",
      name: "Outdoor & Indoor",
      subcategories: [
        "Flex Banners", "Roll-Up Stands", "3D Sign Boards", "Backlit Signage",
        "Wayfinding Signs", "Vehicle Branding", "Wall Graphics", "Window Frosting"
      ]
    },
    {
      id: "corporate-gifts",
      name: "Corporate Gifts",
      subcategories: [
        "Customized Mugs", "Pen Printing", "Corporate Gift Sets", "ID Cards & Lanyards",
        "Keychains", "Caps Printing", "USB Gift Items", "Promotional Giveaways"
      ]
    }
  ];

  // Fetch products for search on mount
  useEffect(() => {
    fetch("/api/products")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setAllProducts(data);
        }
      })
      .catch(err => {
        console.warn("Failed to fetch products for search bar", err);
      });
  }, []);

  // Update search results on query change
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Helper to check if any word in the text starts with the query
    const matchesQuery = (text: string) => {
      const words = text.toLowerCase().split(/[\s&,\-\/\(\)]+/);
      return words.some(word => word.startsWith(query));
    };

    // 1. Match Categories
    const matchedCategories = megaMenuData
      .filter(cat => matchesQuery(cat.name))
      .map(cat => ({
        type: "category" as const,
        name: cat.name,
        id: cat.id
      }));

    // 2. Match Subcategories
    const matchedSubcategories = [];
    const seenSub = new Set();
    for (const cat of megaMenuData) {
      for (const sub of cat.subcategories) {
        if (matchesQuery(sub) && !seenSub.has(sub)) {
          seenSub.add(sub);
          matchedSubcategories.push({
            type: "subcategory" as const,
            name: sub,
            id: cat.id
          });
        }
      }
    }

    // 3. Match Products
    const matchedProducts = allProducts
      .filter(prod => prod.title && matchesQuery(prod.title))
      .map(prod => ({
        type: "product" as const,
        name: prod.title,
        id: prod._id || prod.id
      }));

    setSearchResults([
      ...matchedCategories,
      ...matchedSubcategories,
      ...matchedProducts
    ].slice(0, 8));
  }, [searchQuery, allProducts]);

  const isWhiteNavbar = location.pathname.startsWith("/products") || location.pathname === "/gallery";

  // Dynamic styling based on the active page and scroll position
  const navBgClass = scrolled
    ? "bg-[#3D7B89] backdrop-blur-xl border-b border-white/10 py-2.5 shadow-md"
    : (isWhiteNavbar
      ? "bg-white/95 border-b border-black/5 py-4"
      : "bg-transparent py-4");

  const logoSrc = scrolled ? "/images/3Dot.png" : (isWhiteNavbar ? "/images/3Dotfooter.png" : "/images/3Dot.png");
  const logoHeightClass = scrolled ? "h-6 md:h-10" : (isWhiteNavbar ? "h-5 md:h-8" : "h-6 md:h-10");

  const linkColorClass = scrolled
    ? "text-white/85 hover:text-white"
    : (isWhiteNavbar
      ? "text-black/70 hover:text-black"
      : "text-white/80 hover:text-white");

  const ctaClass = scrolled
    ? "bg-white text-[#3D7B89] hover:bg-white/90"
    : (isWhiteNavbar
      ? "bg-black text-white hover:bg-black/90"
      : "bg-white text-black hover:bg-white/95");

  const mobileToggleClass = scrolled ? "text-white" : (isWhiteNavbar ? "text-black" : "text-white");
  const mobileOverlayBg = "bg-black text-white";
  const mobileLinkColor = "text-white hover:text-white/60";
  
  const mobileCtaClass = "bg-white text-black hover:bg-white/95";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass}`}>
        <div className="w-full px-6 md:px-12">
          <div className="flex justify-between items-center">
            <Link to="/" className="group flex items-center">
              <img 
                src={logoSrc} 
                alt="3Dot's Advertising" 
                className={`${logoHeightClass} w-auto object-contain`}
              />
            </Link>
  
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10 flex-1 justify-center">
              {navLinks.map((link) => {
                if (link.name === "Products") {
                  const productsButtonClass = scrolled
                    ? `inline-flex items-center gap-1.5 text-[14px] font-bold tracking-wider uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
                        dropdownOpen
                          ? "bg-white text-[#3D7B89] border-white shadow-md shadow-black/10"
                          : "bg-white/15 text-white border-white/20 hover:bg-white hover:text-[#3D7B89] hover:border-white"
                      }`
                    : (isWhiteNavbar
                      ? `inline-flex items-center gap-1.5 text-[14px] font-bold tracking-wider uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
                          dropdownOpen
                            ? "bg-[#3D7B89] text-white border-[#3D7B89] shadow-md shadow-[#3D7B89]/25"
                            : "bg-[#3D7B89]/5 text-[#3D7B89] border-[#3D7B89]/20 hover:bg-[#3D7B89] hover:text-white hover:border-[#3D7B89]"
                        }`
                      : `inline-flex items-center gap-1.5 text-[14px] font-bold tracking-wider uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
                          dropdownOpen
                            ? "bg-[#3D7B89] text-white border-[#3D7B89] shadow-md shadow-[#3D7B89]/25"
                            : "bg-white/10 text-white/95 border-white/20 hover:bg-[#3D7B89] hover:text-white hover:border-[#3D7B89]"
                        }`);

                  return (
                    <div
                      key={link.name}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="py-1 cursor-pointer flex items-center"
                    >
                      <Link 
                        to={link.path} 
                        className={productsButtonClass}
                        onClick={() => setDropdownOpen(false)}
                      >
                        {link.name}
                        <ChevronDown size={13} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
                      </Link>
                    </div>
                  );
                }
                return (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className={`text-[17px] font-medium tracking-wide transition-colors ${linkColorClass}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
  
            {/* Right Group: Search Bar + CTA Button */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Expandable Search Bar */}
              <div 
                className="relative"
                onMouseEnter={() => setSearchHovered(true)}
                onMouseLeave={() => setSearchHovered(false)}
              >
                <div className="relative flex items-center">
                  <motion.div
                    animate={{ width: (searchHovered || searchFocused || searchQuery) ? 200 : 40 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-center rounded-full border px-3 py-1.5 overflow-hidden transition-all duration-300 ${
                      scrolled
                        ? "border-white/20 bg-white/10 hover:bg-white/20 text-white"
                        : (isWhiteNavbar
                          ? "border-black/10 bg-black/5 hover:bg-black/10 text-black"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-white")
                    }`}
                  >
                    <Search size={16} className="shrink-0 cursor-pointer" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => {
                        setTimeout(() => setSearchFocused(false), 200);
                      }}
                      placeholder="Search archive..."
                      className={`ml-2 bg-transparent border-none outline-none text-xs w-full transition-opacity duration-300 ${
                        (searchHovered || searchFocused || searchQuery) ? "opacity-100" : "opacity-0 pointer-events-none"
                      } ${scrolled ? "placeholder-white/50 text-white" : (isWhiteNavbar ? "placeholder-black/45 text-black" : "placeholder-white/45 text-white")}`}
                    />
                  </motion.div>
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {(searchFocused && searchResults.length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full right-0 mt-2 w-72 rounded-2xl p-4 shadow-2xl z-50 border ${
                        scrolled
                          ? "bg-white border-black/5 shadow-black/10 text-black"
                          : (isWhiteNavbar
                            ? "bg-white border-black/5 shadow-black/10 text-black"
                            : "bg-black border-white/5 shadow-white/5 text-white")
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-2.5 px-2">
                        Search Results
                      </div>
                      <ul className="space-y-1">
                        {searchResults.map((res) => {
                          let path = "/products";
                          if (res.type === "product") {
                            path = `/products/${res.id}`;
                          } else if (res.type === "category") {
                            path = `/products?category=${res.id}`;
                          } else if (res.type === "subcategory") {
                            path = `/products?subcategory=${encodeURIComponent(res.name)}`;
                          }

                          return (
                            <li key={`${res.type}-${res.id}-${res.name}`}>
                              <Link
                                to={path}
                                onClick={() => {
                                  setSearchQuery("");
                                  setSearchFocused(false);
                                }}
                                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                                  (scrolled || isWhiteNavbar)
                                    ? "hover:bg-gray-50 text-gray-900"
                                    : "hover:bg-white/10 text-gray-100"
                                }`}
                              >
                                <span className="font-medium truncate max-w-[180px]">{res.name}</span>
                                <span className="text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-full font-bold bg-[#3D7B89]/10 text-[#3D7B89]">
                                  {res.type}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop CTA Button */}
              <Link
                to="/contact"
                className={`flex items-center gap-3 px-8 py-4 rounded-none transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] shadow-sm ${ctaClass} group`}
              >
                GET A QUOTE
                <ArrowRight size={14} className="shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
  
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${mobileToggleClass}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Dropdown */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute top-full left-0 right-0 w-full z-40 py-10 px-12 grid grid-cols-5 gap-8 select-none border-t ${
                scrolled
                  ? "bg-[#3D7B89]/98 border-white/10 border-b shadow-2xl"
                  : (isWhiteNavbar
                    ? "bg-white/98 border-black/5 border-b border-black/10 shadow-2xl"
                    : "bg-black/95 border-white/5 border-b border-white/10 shadow-2xl")
              }`}
            >
              {megaMenuData.map((cat) => (
                <div key={cat.id} className="space-y-4">
                  <Link 
                    to={`/products?category=${cat.id}`}
                    onClick={() => setDropdownOpen(false)}
                    className={`block text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                      scrolled ? "text-white hover:text-white/80" : "text-[#3D7B89] hover:text-[#347689]"
                    }`}
                  >
                    {cat.name}
                  </Link>
                  <ul className="space-y-2">
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link 
                          to={`/products?subcategory=${encodeURIComponent(sub)}`}
                          onClick={() => setDropdownOpen(false)}
                          className={`block text-[13px] font-normal transition-all hover:translate-x-1 duration-200 ${
                            scrolled
                              ? "text-white/70 hover:text-white"
                              : (isWhiteNavbar ? "text-black/55 hover:text-[#3D7B89]" : "text-white/60 hover:text-[#3D7B89]")
                          }`}
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
  
      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`lg:hidden fixed inset-0 z-[99] p-8 flex flex-col overflow-y-auto ${mobileOverlayBg}`}
          >
            <div className="flex justify-between items-center mb-16">
              <Link to="/" className="flex items-center">
                <img 
                  src="/images/3Dot.png" 
                  alt="3Dot's Advertising" 
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={32} />
              </button>
            </div>
  
            <div className="space-y-6 flex-grow mb-12">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block text-4xl font-bold transition-colors ${mobileLinkColor}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pb-24"
            >
              <Link
                to="/contact"
                className={`flex items-center justify-between p-6 w-full text-lg font-bold uppercase tracking-widest transition-all ${mobileCtaClass}`}
              >
                Get a Quote
                <ArrowRight size={24} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
