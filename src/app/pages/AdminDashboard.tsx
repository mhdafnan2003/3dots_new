import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  PackageOpen, 
  Image as ImageIcon, 
  Settings as SettingsIcon, 
  LogOut, 
  Plus, 
  Trash2, 
  Globe, 
  Eye,
  FileText,
  Lock,
  Edit2,
  Menu,
  X
} from "lucide-react";
import { toast, Toaster } from "sonner";

interface Product {
  _id?: string;
  id?: number | string;
  title: string;
  titleLine2?: string;
  image: string;
  images?: string[];
  category: string;
  categoryDisplay?: string;
  subcategory?: string;
  year?: string;
  client?: string;
  description?: string;
  specs?: any[];
  features?: string[];
}

const SUB_CATEGORIES_MAPPING = {
  "Digital & Printing Solutions": {
    mainCategory: "printing",
    subs: [
      "Business Cards",
      "Flyers & Brochures",
      "Letterheads",
      "Invoice Books",
      "Menu Printing",
      "Sticker Printing",
      "Poster Printing",
      "Catalogue Printing"
    ]
  },
  "Screen & Offset Printing": {
    mainCategory: "printing",
    subs: [
      "T-Shirt Printing",
      "Fabric Printing",
      "PVC Card Printing",
      "Envelope Printing",
      "Magazine Printing",
      "Packaging Printing",
      "Multi-Color Offset Printing",
      "Bulk Printing Services"
    ]
  },
  "Laser Etching & Acrylic Works": {
    mainCategory: "signage",
    subs: [
      "Acrylic Sign Boards",
      "Acrylic Display Stands",
      "Name Plates",
      "Laser Cutting",
      "Laser Engraving",
      "Acrylic Boxes",
      "LED Acrylic Signs",
      "Trophy & Award Works"
    ]
  },
  "Outdoor & Indoor Signages": {
    mainCategory: "signage",
    subs: [
      "Flex Banners",
      "Roll-Up Stands",
      "3D Sign Boards",
      "Backlit Signage",
      "Wayfinding Signs",
      "Vehicle Branding",
      "Wall Graphics",
      "Window Frosting"
    ]
  },
  "Customized Corporate Gifts": {
    mainCategory: "branding",
    subs: [
      "Customized Mugs",
      "Pen Printing",
      "Corporate Gift Sets",
      "ID Cards & Lanyards",
      "Keychains",
      "Caps Printing",
      "USB Gift Items",
      "Promotional Giveaways"
    ]
  }
};

interface PortfolioItem {
  _id?: string;
  id?: number | string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
}

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

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "portfolio" | "settings">("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [heroBg, setHeroBg] = useState("/images/hero-bg.png");
  const [instagramReels, setInstagramReels] = useState<string[]>(["", "", "", "", ""]);

  // Form States - Products
  const [prodTitle, setProdTitle] = useState("");
  const [prodTitleLine2, setProdTitleLine2] = useState("");
  const [prodImages, setProdImages] = useState<string[]>([]);
  const [prodCategory, setProdCategory] = useState("printing");
  const [prodCategoryDisplay, setProdCategoryDisplay] = useState("Digital & Printing Solutions");
  const [prodSubcategory, setProdSubcategory] = useState("Business Cards");
  const [prodYear, setProdYear] = useState(new Date().getFullYear().toString());
  const [prodClient, setProdClient] = useState("VIP Client Dubai");
  const [prodDescription, setProdDescription] = useState("");
  // Dynamic specs and features
  const [prodSpecs, setProdSpecs] = useState<{ label: string; value: string }[]>([]);
  const [newSpecLabel, setNewSpecLabel] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [prodFeatures, setProdFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState("");

  // Form States - Portfolio
  const [portTitle, setPortTitle] = useState("");
  const [portCategory, setPortCategory] = useState("Digital & Printing");
  const [portClient, setPortClient] = useState("");
  const [portYear, setPortYear] = useState(new Date().getFullYear().toString());
  const [portImage, setPortImage] = useState("");

  const [uploading, setUploading] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const handleFileUpload = async (file: File, targetSetter: (url: string) => void) => {
    if (!file) return;
    setUploading(true);
    const toastId = toast.loading("Uploading local file...");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Data = reader.result as string;
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: base64Data })
          });
          if (res.ok) {
            const data = await res.json();
            if (data.url) {
              targetSetter(data.url);
              toast.success("Image uploaded successfully!", { id: toastId });
            } else {
              toast.error("Failed to parse upload url.", { id: toastId });
            }
          } else {
            toast.error("Server rejected the upload.", { id: toastId });
          }
        } catch (e) {
          toast.error("Network error uploading file.", { id: toastId });
        } finally {
          setUploading(false);
        }
      };
    } catch (err) {
      toast.error("Failed to read local file.", { id: toastId });
      setUploading(false);
    }
  };

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("3dot_admin_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch Database Data
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchPortfolio();
      fetchSettings();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (e) {
      console.warn("Could not fetch products from server, using demo fallbacks", e);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("/api/portfolio");
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
      }
    } catch (e) {
      console.warn("Could not fetch portfolio from server, using demo fallbacks", e);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.hero_bg) setHeroBg(data.hero_bg);
        if (data.instagram_reels && Array.isArray(data.instagram_reels)) {
          setInstagramReels(data.instagram_reels);
        }
      }
    } catch (e) {
      console.warn("Could not fetch settings from server, using demo fallbacks", e);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("3dot_admin_token", data.token);
        setIsAuthenticated(true);
        toast.success("Welcome back! Authentication successful.");
      } else {
        toast.error(data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      // Offline / Local fallback if backend is not started yet
      if (usernameInput && usernameInput.toLowerCase() === "3dotadmin" && passwordInput === "admin@3dot") {
        localStorage.setItem("3dot_admin_token", "jwt_mock_token_fallback");
        setIsAuthenticated(true);
        toast.success("Logged in successfully (Local Mode).");
      } else {
        toast.error("Invalid username or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("3dot_admin_token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully.");
  };

  // Add Product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodTitle || prodImages.length === 0) {
      toast.error("Please fill in all product fields (Title and at least one Image).");
      return;
    }

    const payload = { 
      title: prodTitle, 
      titleLine2: prodTitleLine2,
      image: prodImages[0] || "", 
      images: prodImages,
      category: prodCategory, 
      subcategory: prodSubcategory,
      year: prodYear,
      client: prodClient,
      description: prodDescription,
      specs: prodSpecs,
      features: prodFeatures
    };

    try {
      if (editingProductId) {
        const res = await fetch(`/api/products/${editingProductId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          toast.success("Product successfully updated in MongoDB!");
          resetProductForm();
          fetchProducts();
          setIsProductModalOpen(false);
        } else {
          toast.error("Failed to update product in database.");
        }
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (res.ok) {
          toast.success("Product successfully added to MongoDB!");
          resetProductForm();
          fetchProducts();
          setIsProductModalOpen(false);
        } else {
          toast.error("Failed to add product to database.");
        }
      }
    } catch (e) {
      // Local fallback
      if (editingProductId) {
        setProducts(products.map(p => (p._id === editingProductId || p.id === editingProductId) ? { ...p, ...payload } as Product : p));
        toast.success("Product updated (Local Mode).");
      } else {
        const mockNewProduct = { _id: Math.random().toString(), ...payload } as Product;
        setProducts([mockNewProduct, ...products]);
        toast.success("Product added (Local Mode).");
      }
      resetProductForm();
      setIsProductModalOpen(false);
    }
  };

  const resetProductForm = () => {
    setEditingProductId(null);
    setProdTitle("");
    setProdTitleLine2("");
    setProdImages([]);
    setProdCategory("printing");
    setProdCategoryDisplay("Digital & Printing Solutions");
    setProdSubcategory("Business Cards");
    setProdClient("VIP Client Dubai");
    setProdDescription("");
    setProdSpecs([]);
    setProdFeatures([]);
  };

  const openEditModal = (p: Product) => {
    setEditingProductId(String(p._id || p.id));
    setProdTitle(p.title || "");
    setProdTitleLine2(p.titleLine2 || "");
    setProdImages(p.images?.length ? p.images : (p.image ? [p.image] : []));
    setProdCategory(p.category || "printing");

    // Find the correct categoryDisplay based on subcategory
    let matchedCategoryDisplay = "Digital & Printing Solutions";
    if (p.subcategory) {
      const foundEntry = Object.entries(SUB_CATEGORIES_MAPPING).find(([_, value]) =>
        value.subs.includes(p.subcategory!)
      );
      if (foundEntry) {
        matchedCategoryDisplay = foundEntry[0];
      } else {
        const foundMain = Object.entries(SUB_CATEGORIES_MAPPING).find(([_, value]) =>
          value.mainCategory === p.category
        );
        if (foundMain) {
          matchedCategoryDisplay = foundMain[0];
        }
      }
    } else if (p.category) {
      const foundMain = Object.entries(SUB_CATEGORIES_MAPPING).find(([_, value]) =>
        value.mainCategory === p.category
      );
      if (foundMain) {
        matchedCategoryDisplay = foundMain[0];
      }
    }

    setProdCategoryDisplay(matchedCategoryDisplay);
    setProdSubcategory(p.subcategory || "Business Cards");
    setProdYear(p.year?.toString() || new Date().getFullYear().toString());
    setProdClient(p.client || "VIP Client Dubai");
    setProdDescription(p.description || "");
    setProdSpecs(p.specs || []);
    setProdFeatures(p.features || []);
    setIsProductModalOpen(true);
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted successfully!");
        fetchProducts();
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (e) {
      setProducts(products.filter(p => p._id !== id && p.id !== id));
      toast.success("Product deleted (Local Mode).");
    }
  };

  // Add Portfolio item
  const handleAddPortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle || !portClient || !portImage) {
      toast.error("Please fill in all portfolio fields.");
      return;
    }

    const payload = { 
      title: portTitle, 
      category: portCategory, 
      client: portClient, 
      year: portYear, 
      image: portImage 
    };

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        toast.success("Portfolio image successfully added to MongoDB!");
        setPortTitle("");
        setPortClient("");
        setPortImage("");
        fetchPortfolio();
        setIsPortfolioModalOpen(false);
      } else {
        toast.error("Failed to add item to database.");
      }
    } catch (e) {
      // Local fallback
      const mockNewItem = { _id: Math.random().toString(), ...payload };
      setPortfolio([mockNewItem, ...portfolio]);
      setPortTitle("");
      setPortClient("");
      setPortImage("");
      toast.success("Portfolio item added (Local Mode).");
      setIsPortfolioModalOpen(false);
    }
  };

  // Delete Portfolio
  const handleDeletePortfolio = async (id: string) => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Portfolio item deleted successfully!");
        fetchPortfolio();
      } else {
        toast.error("Failed to delete portfolio item.");
      }
    } catch (e) {
      setPortfolio(portfolio.filter(item => item._id !== id && item.id !== id));
      toast.success("Portfolio item deleted (Local Mode).");
    }
  };

  // Update Hero Background
  const handleSaveBg = async (url: string) => {
    if (!url) {
      toast.error("Background Image URL cannot be empty.");
      return;
    }

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero_bg: url })
      });
      if (res.ok) {
        toast.success("Hero background image updated in MongoDB!");
        fetchSettings();
      } else {
        toast.error("Failed to save setting to database.");
      }
    } catch (e) {
      setHeroBg(url);
      toast.success("Hero background updated (Local Mode).");
    }
  };

  const handleSaveReels = async () => {
    const parsedReels = instagramReels.map(url => {
      if (!url) return "";
      const trimmed = url.trim();
      if (!trimmed.includes("/") && !trimmed.includes(".")) {
        return trimmed;
      }
      const regex = /\/(?:p|reel)\/([A-Za-z0-9_-]+)/;
      const match = trimmed.match(regex);
      return match && match[1] ? match[1] : trimmed;
    });

    const cleanedReels = Array.from({ length: 5 }, (_, i) => parsedReels[i] || "");

    const toastId = toast.loading("Saving Instagram feed settings...");
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instagram_reels: cleanedReels })
      });
      if (res.ok) {
        toast.success("Instagram reels feed updated successfully!", { id: toastId });
        fetchSettings();
      } else {
        toast.error("Failed to save settings to server.", { id: toastId });
      }
    } catch (e) {
      setInstagramReels(cleanedReels);
      toast.success("Instagram feed saved locally.", { id: toastId });
    }
  };

  // ================= RENDER LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative overflow-hidden font-sans select-none">
        {/* Glow decorative overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3D7B89]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#347689]/5 rounded-full blur-3xl pointer-events-none"></div>

        <Toaster position="top-right" richColors />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white border border-gray-200/80 p-8 rounded-3xl shadow-xl relative z-10"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src="/images/3Dotfooter.png" 
              alt="3Dots Advertising Logo" 
              className="h-10 w-auto mb-4 object-contain brightness-100 hover:scale-105 transition-transform" 
            />
            <h2 className="text-xl font-bold uppercase tracking-[0.25em] text-gray-900">Administration</h2>
            <p className="text-xs text-gray-500 mt-1 font-medium">3Dots Advertising Portal</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 block">Username</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter username"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-950 placeholder-gray-400 text-sm focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 block">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-gray-950 placeholder-gray-400 text-sm focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#3D7B89] hover:bg-[#347689] disabled:opacity-50 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-[#3D7B89]/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {loading ? "Authenticating..." : (
                <>
                  <Lock size={14} />
                  Authorize Access
                </>
              )}
            </button>
          </form>


        </motion.div>
      </div>
    );
  }

  // ================= RENDER ADMIN DASHBOARD LAYOUT =================
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-900 font-sans overflow-x-hidden selection:bg-[#3D7B89] selection:text-white">
      <Toaster position="top-right" richColors />

      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm select-none z-30">
        <div className="flex items-center gap-3">
          <img 
            src="/images/3Dotfooter.png" 
            alt="3Dots Advertising Logo" 
            className="h-6 w-auto object-contain" 
          />
          <span className="text-[9px] text-[#3D7B89] uppercase tracking-[0.15em] font-black">Admin Panel</span>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2.5 text-gray-600 hover:text-gray-950 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
        ></div>
      )}

      {/* 1. SIDEBAR PANEL */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white p-8 flex flex-col justify-between select-none shadow-xl border-r border-gray-200 transition-transform duration-300
        md:static md:w-80 md:translate-x-0 md:shadow-sm
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="space-y-12">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <img 
                src="/images/3Dotfooter.png" 
                alt="3Dots Advertising Logo" 
                className="h-7 w-auto object-contain brightness-100 mb-1" 
              />
              <div>
                <h3 className="font-bold text-xs uppercase tracking-[0.15em] text-gray-900 leading-none">Admin Panel</h3>
                <span className="text-[8px] text-[#3D7B89] uppercase tracking-[0.1em] font-bold mt-1 block">Live Database Console</span>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Nav items */}
          <nav className="space-y-1.5">
            <button
              onClick={() => { setActiveTab("overview"); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                activeTab === "overview" 
                  ? "bg-[#3D7B89]/10 text-[#3D7B89] border-l-2 border-[#3D7B89]" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard size={16} />
              Overview
            </button>

            <button
              onClick={() => { setActiveTab("products"); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                activeTab === "products" 
                  ? "bg-[#3D7B89]/10 text-[#3D7B89] border-l-2 border-[#3D7B89]" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <PackageOpen size={16} />
              Products List
            </button>

            <button
              onClick={() => { setActiveTab("portfolio"); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                activeTab === "portfolio" 
                  ? "bg-[#3D7B89]/10 text-[#3D7B89] border-l-2 border-[#3D7B89]" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <ImageIcon size={16} />
              Portfolio Grid
            </button>

            <button
              onClick={() => { setActiveTab("settings"); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                activeTab === "settings" 
                  ? "bg-[#3D7B89]/10 text-[#3D7B89] border-l-2 border-[#3D7B89]" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <SettingsIcon size={16} />
              Site Settings
            </button>
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200/80 p-4 rounded-xl text-center">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold block">Active Operator</span>
            <span className="text-[11px] text-emerald-600 font-bold uppercase tracking-[0.1em] mt-1 block flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              3dotadmin
            </span>
          </div>

          <button
            onClick={() => { handleLogout(); setIsSidebarOpen(false); }}
            className="w-full flex items-center justify-center gap-2 border border-red-500/20 text-red-500 py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* 2. MAIN DISPLAY WINDOW */}
      <main className="flex-1 min-h-screen p-6 md:p-12 bg-gray-50/50 flex flex-col overflow-y-auto">
        
        {/* Dynamic header title */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 md:mb-12 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.15em] text-gray-900">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "products" && "Product Manager"}
              {activeTab === "portfolio" && "Portfolio Manager"}
              {activeTab === "settings" && "Custom Settings"}
            </h1>
            <p className="text-[10px] md:text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">
              {activeTab === "overview" && "System telemetry and database health"}
              {activeTab === "products" && "Manage items in project archive"}
              {activeTab === "portfolio" && "Manage visual gallery elements"}
              {activeTab === "settings" && "Customize homepage graphics"}
            </p>
          </div>
          
          <a
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 border border-gray-200 hover:border-gray-300 bg-white text-gray-600 hover:text-gray-900 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all rounded-lg shadow-sm w-full sm:w-auto"
          >
            <Globe size={14} />
            View Live Website
          </a>
        </div>

        {/* Tab content view switch */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {/* OVERVIEW PANEL */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >


                {/* Database Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Products metric */}
                  <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold block">Total Products</span>
                      <span className="text-3xl font-black text-gray-900">{products.length}</span>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center">
                      <PackageOpen size={24} />
                    </div>
                  </div>

                  {/* Portfolio metric */}
                  <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                    <div className="space-y-1">
                      <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold block">Portfolio Images</span>
                      <span className="text-3xl font-black text-gray-900">{portfolio.length}</span>
                    </div>
                    <div className="w-12 h-12 bg-sky-500/10 text-sky-600 rounded-xl flex items-center justify-center">
                      <ImageIcon size={24} />
                    </div>
                  </div>
                </div>


              </motion.div>
            )}

            {/* PRODUCTS MANAGER VIEW */}
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="bg-white border border-gray-200/80 rounded-3xl p-8 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-[0.15em] text-gray-900">Active Products List ({products.length})</h3>
                      <p className="text-[11px] text-gray-500 mt-1">Manage offset printing, signage and promotional campaign items displayed on the live website.</p>
                    </div>
                    <button 
                      onClick={() => { resetProductForm(); setIsProductModalOpen(true); }}
                      className="bg-[#3D7B89] hover:bg-[#347689] text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#3D7B89]/10 w-full sm:w-auto"
                    >
                      <Plus size={14} />
                      Add Product
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {products.length === 0 ? (
                      <div className="text-center py-20 text-gray-400 text-xs uppercase tracking-wider font-bold">No Products found in DB.</div>
                    ) : (
                      products.map((p) => (
                        <div 
                          key={p._id || p.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <img 
                              src={p.image} 
                              alt={p.title} 
                              className="w-12 h-12 rounded-xl object-cover shrink-0" 
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580680849668-45d32df32e67?q=80&w=200'; }}
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 truncate">{p.title}</h4>
                              <div className="flex flex-wrap gap-2 text-[9px] uppercase tracking-wider font-semibold text-gray-500 mt-1">
                                <span className="text-[#3D7B89]">{p.subcategory || p.category}</span>
                                <span>&bull;</span>
                                <span>{p.year || "2026"}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto">
                            <button 
                              onClick={() => openEditModal(p)}
                              className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 rounded-xl transition-all cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(String(p._id || p.id))}
                              className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* PORTFOLIO GALLERY MANAGER VIEW */}
            {activeTab === "portfolio" && (
              <motion.div
                key="portfolio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <div className="bg-white border border-gray-200/80 rounded-3xl p-8 space-y-6 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
                    <div>
                      <h3 className="font-bold text-sm uppercase tracking-[0.15em] text-gray-900">Active Gallery Items ({portfolio.length})</h3>
                      <p className="text-[11px] text-gray-500 mt-1">Manage banner, signage and promotional campaign images in the portfolio section.</p>
                    </div>
                    <button 
                      onClick={() => setIsPortfolioModalOpen(true)}
                      className="bg-[#3D7B89] hover:bg-[#347689] text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#3D7B89]/10 w-full sm:w-auto"
                    >
                      <Plus size={14} />
                      Add Gallery Image
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {portfolio.length === 0 ? (
                      <div className="text-center py-20 text-gray-400 text-xs uppercase tracking-wider font-bold">No Gallery items found in DB.</div>
                    ) : (
                      portfolio.map((item) => (
                        <div 
                          key={item._id || item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-12 h-12 rounded-xl object-cover shrink-0"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1580680849668-45d32df32e67?q=80&w=200'; }}
                            />
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 truncate">{item.title}</h4>
                              <div className="flex flex-wrap gap-2 text-[9px] uppercase tracking-wider font-semibold text-gray-500 mt-1">
                                <span className="text-[#3D7B89]">{item.category}</span>
                                <span>&bull;</span>
                                <span className="text-gray-600">{item.client}</span>
                                <span>&bull;</span>
                                <span>{item.year}</span>
                              </div>
                            </div>
                          </div>

                          <button 
                            onClick={() => handleDeletePortfolio(String(item._id || item.id))}
                            className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all cursor-pointer self-end sm:self-auto"
                            title="Delete Gallery Item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* SITE CUSTOMIZER & HERO BACKGROUND VIEW */}
            {activeTab === "settings" && (
              <>
                <motion.div
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl bg-white border border-gray-200/80 rounded-3xl p-8 space-y-8 shadow-sm"
              >
                <div className="space-y-2">
                  <h3 className="font-bold text-sm uppercase tracking-[0.15em] text-gray-900">Homepage Background Media</h3>
                </div>

                {/* Preview window */}
                <div className="aspect-video relative rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-inner flex items-center justify-center">
                  {isVideoUrl(heroBg) ? (
                    <video
                      key={heroBg}
                      src={heroBg}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                  ) : (
                    <img 
                      src={heroBg} 
                      alt="Homepage Hero Background Preview" 
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/hero-bg.png'; }}
                    />
                  )}
                  <div className="relative z-10 text-center space-y-2 select-none pointer-events-none p-6">
                    <h4 className="text-xl md:text-3xl font-black uppercase tracking-wider text-white drop-shadow-md">DRIVEN DESIGN RESULTS.</h4>
                    <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold drop-shadow-md">LIVE BACKGROUND PREVIEW</p>
                  </div>
                  <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
                </div>

                {/* Link input with Local File Upload */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Local File Uploader */}
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Local Media Uploader (Image/Video)</label>
                      <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100/70 transition-colors relative flex flex-col justify-center items-center h-[96px]">
                        <input 
                          type="file"
                          accept="image/*,video/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, (url) => {
                              setHeroBg(url);
                              handleSaveBg(url);
                            });
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="text-[10px] uppercase tracking-wider text-[#3D7B89] font-bold">
                          {heroBg.startsWith("/uploads/") ? "✓ Custom Background Active" : "↑ Upload Media Locally"}
                        </span>
                        <p className="text-[8px] text-gray-400 mt-1 uppercase tracking-wider">Supports PNG, JPG, WEBP, MP4, WEBM, MOV, OGG</p>
                      </div>
                    </div>

                    {/* Manual Image URL Paste */}
                    <div className="space-y-2 flex flex-col justify-between">
                      <div>
                        <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Paste Media URL (Image or Video)</label>
                        <input 
                          type="text"
                          value={heroBg}
                          onChange={(e) => setHeroBg(e.target.value)}
                          placeholder="https://... or video.mp4"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-xs font-semibold focus:outline-none focus:border-[#3D7B89] transition-colors"
                        />
                      </div>
                      
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
                        Uploaded background assets are saved directly in your backend directory and rendered statically.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => handleSaveBg(heroBg)}
                      className="bg-[#3D7B89] hover:bg-[#347689] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#3D7B89]/10"
                    >
                      <Plus size={14} />
                      Save Background
                    </button>
                    
                    <button
                      onClick={() => {
                        setHeroBg("/images/hero-bg.png");
                        handleSaveBg("/images/hero-bg.png");
                      }}
                      className="border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer bg-white shadow-sm"
                    >
                      Reset to Default
                    </button>
                  </div>
                </div>

              </motion.div>

              <motion.div
                key="settings-instagram"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-3xl bg-white border border-gray-200/80 rounded-3xl p-8 space-y-6 shadow-sm mt-8"
              >
                <div className="space-y-1">
                  <h3 className="font-bold text-sm uppercase tracking-[0.15em] text-gray-900">Instagram Feed Integration</h3>
                  <p className="text-[11px] text-gray-500 font-medium">Configure up to 5 public Instagram Reels or posts to showcase on the homepage.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {instagramReels.map((reel, index) => (
                    <div key={index} className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">
                        Showcase Item {index + 1} (URL or Shortcode)
                      </label>
                      <input 
                        type="text"
                        value={reel}
                        onChange={(e) => {
                          const updated = [...instagramReels];
                          updated[index] = e.target.value;
                          setInstagramReels(updated);
                        }}
                        placeholder="e.g., https://www.instagram.com/reel/C-c3G2yO1gA/"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-xs font-semibold focus:outline-none focus:border-[#3D7B89] transition-colors"
                      />
                      {reel && (
                        <p className="text-[9px] text-gray-400">
                          Shortcode: <span className="font-bold font-mono text-[#3D7B89]">
                            {(() => {
                              const trimmed = reel.trim();
                              if (!trimmed.includes("/") && !trimmed.includes(".")) return trimmed;
                              const match = trimmed.match(/\/(?:p|reel)\/([A-Za-z0-9_-]+)/);
                              return match && match[1] ? match[1] : "Extracting...";
                            })()}
                          </span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={handleSaveReels}
                    className="bg-[#3D7B89] hover:bg-[#347689] text-white px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-[#3D7B89]/10"
                  >
                    <Plus size={14} />
                    Save Instagram Feed
                  </button>
                  
                  <button
                    onClick={() => {
                      const defaultReels = ["DQey2odkuvN", "C_BBpyty3B6", "DWZJtnwCCYE", "DVf8obXkZpJ", "DBY4ciBMcls"];
                      setInstagramReels(defaultReels);
                      const toastId = toast.loading("Resetting Instagram feed...");
                      fetch("/api/settings", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ instagram_reels: defaultReels })
                      })
                      .then(res => {
                        if (res.ok) {
                          toast.success("Instagram feed reset to defaults!", { id: toastId });
                          fetchSettings();
                        } else {
                          toast.error("Failed to reset settings.", { id: toastId });
                        }
                      })
                      .catch(() => {
                        toast.success("Instagram feed reset locally.", { id: toastId });
                      });
                    }}
                    className="border border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all cursor-pointer bg-white shadow-sm"
                  >
                    Reset to Default
                  </button>
                </div>
              </motion.div>
            </>
          )}
          </AnimatePresence>
        </div>

      </main>

      {/* MODAL - ADD PRODUCT */}
      <AnimatePresence>
        {isProductModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl p-8 space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh] text-gray-900"
            >
              <button 
                onClick={() => { resetProductForm(); setIsProductModalOpen(false); }}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                title="Close"
              >
                <Plus size={20} className="rotate-45" />
              </button>

              <div className="space-y-1.5">
                <h3 className="font-bold text-base uppercase tracking-[0.15em] text-gray-900">{editingProductId ? "Edit Product" : "Add New Product"}</h3>
                <p className="text-[11px] text-gray-500 font-medium">Create a new item in your physical showcase archive.</p>
              </div>

              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Product Title</label>
                  <input 
                    type="text"
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    placeholder="Acrylic Display Box"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Secondary Title Line (Optional)</label>
                  <input 
                    type="text"
                    value={prodTitleLine2}
                    onChange={(e) => setProdTitleLine2(e.target.value)}
                    placeholder="e.g. Custom fabrication"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Category</label>
                  <select 
                    value={prodCategoryDisplay}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setProdCategoryDisplay(newVal);
                      const mapping = SUB_CATEGORIES_MAPPING[newVal as keyof typeof SUB_CATEGORIES_MAPPING];
                      setProdCategory(mapping.mainCategory);
                      setProdSubcategory(mapping.subs[0]);
                    }}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 text-xs focus:outline-none focus:border-[#3D7B89] transition-colors"
                  >
                    {Object.keys(SUB_CATEGORIES_MAPPING).map((catName) => (
                      <option key={catName} value={catName}>{catName}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Subcategory</label>
                  <select 
                    value={prodSubcategory}
                    onChange={(e) => setProdSubcategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 text-xs focus:outline-none focus:border-[#3D7B89] transition-colors"
                  >
                    {SUB_CATEGORIES_MAPPING[prodCategoryDisplay as keyof typeof SUB_CATEGORIES_MAPPING].subs.map((subName) => (
                      <option key={subName} value={subName}>{subName}</option>
                    ))}
                  </select>
                </div>


                <div className="space-y-2 md:col-span-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">The Challenge (Description)</label>
                  <textarea 
                    value={prodDescription}
                    onChange={(e) => setProdDescription(e.target.value)}
                    placeholder="Describe the project specs, challenges, materials chosen..."
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all resize-none"
                  />
                </div>

                {/* Technical Specs */}
                <div className="space-y-3 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#3D7B89] block">Technical Specs (No Limit)</span>
                  
                  {prodSpecs.length > 0 && (
                    <div className="space-y-1.5 mb-2 max-h-40 overflow-y-auto pr-1">
                      {prodSpecs.map((spec, index) => (
                        <div key={index} className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[10px]">
                          <span className="text-gray-500 uppercase tracking-wider font-semibold">{spec.label}:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-800 font-medium">{spec.value}</span>
                            <button
                              type="button"
                              onClick={() => setProdSpecs(prodSpecs.filter((_, i) => i !== index))}
                              className="text-red-500/60 hover:text-red-500 text-xs font-bold px-1.5 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={newSpecLabel}
                      onChange={(e) => setNewSpecLabel(e.target.value)}
                      placeholder="Label (e.g. Material)"
                      className="w-1/3 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-950 placeholder-gray-400 text-[10px] focus:outline-none focus:border-[#3D7B89] transition-all"
                    />
                    <input 
                      type="text"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      placeholder="Value (e.g. 400gsm Ivory Card)"
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-950 placeholder-gray-400 text-[10px] focus:outline-none focus:border-[#3D7B89] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newSpecLabel.trim() && newSpecValue.trim()) {
                          setProdSpecs([...prodSpecs, { label: newSpecLabel.trim(), value: newSpecValue.trim() }]);
                          setNewSpecLabel("");
                          setNewSpecValue("");
                        }
                      }}
                      className="bg-[#3D7B89]/20 hover:bg-[#3D7B89]/40 text-[#3D7B89] px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {/* Features Highlight */}
                <div className="space-y-3 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#3D7B89] block">Key Features (No Limit)</span>
                  
                  {prodFeatures.length > 0 && (
                    <div className="space-y-1.5 mb-2 max-h-40 overflow-y-auto pr-1">
                      {prodFeatures.map((feat, index) => (
                        <div key={index} className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[10px]">
                          <span className="text-gray-800 font-medium">{feat}</span>
                          <button
                            type="button"
                            onClick={() => setProdFeatures(prodFeatures.filter((_, i) => i !== index))}
                            className="text-red-500/60 hover:text-red-500 text-xs font-bold px-1.5 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <input 
                      type="text"
                      value={newFeatureText}
                      onChange={(e) => setNewFeatureText(e.target.value)}
                      placeholder="Feature (e.g. Eco-friendly organic inks)"
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-950 placeholder-gray-400 text-[10px] focus:outline-none focus:border-[#3D7B89] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newFeatureText.trim()) {
                          setProdFeatures([...prodFeatures, newFeatureText.trim()]);
                          setNewFeatureText("");
                        }
                      }}
                      className="bg-[#3D7B89]/20 hover:bg-[#3D7B89]/40 text-[#3D7B89] px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                </div>

                {/* Product Images (Up to 4) */}
                <div className="space-y-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 col-span-1 md:col-span-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-600 block">Product Images (Select up to 4)</label>
                    <span className="text-[9px] text-[#3D7B89] font-medium">{prodImages.length} / 4 Selected</span>
                  </div>
                  
                  {/* Selected Images Grid */}
                  {prodImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {prodImages.map((imgUrl, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100 group shadow-sm">
                          <img src={imgUrl} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setProdImages(prodImages.filter((_, i) => i !== idx));
                            }}
                            className="absolute top-1.5 right-1.5 bg-black/70 hover:bg-red-600/90 text-white rounded-full p-1 transition-colors cursor-pointer"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          {idx === 0 && (
                            <span className="absolute bottom-1.5 left-1.5 bg-[#3D7B89] text-white text-[8px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded-md">
                              Primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Uploader (Only visible if < 4 images selected) */}
                  {prodImages.length < 4 && (
                    <div className="space-y-3">
                      {/* Local File Uploader */}
                      <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center bg-white hover:bg-gray-50 transition-colors relative cursor-pointer shadow-sm">
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => {
                                setProdImages([...prodImages, url]);
                              });
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="text-[10px] uppercase tracking-wider text-[#3D7B89] font-bold block">
                          ↑ Upload Image #{prodImages.length + 1} Locally
                        </span>
                        <span className="text-[9px] text-gray-500 mt-1 block">Supports PNG, JPG, JPEG, WEBP</span>
                      </div>

                      {/* Manual Image URL Paste */}
                      <div className="flex gap-2">
                        <input 
                          id="manual-url-input"
                          type="text"
                          placeholder="Or paste image URL..."
                          className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              if (input.value.trim()) {
                                setProdImages([...prodImages, input.value.trim()]);
                                input.value = "";
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('manual-url-input') as HTMLInputElement;
                            if (input && input.value.trim()) {
                              setProdImages([...prodImages, input.value.trim()]);
                              input.value = "";
                            }
                          }}
                          className="bg-[#3D7B89]/20 hover:bg-[#3D7B89]/40 text-[#3D7B89] px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#3D7B89] hover:bg-[#347689] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4 md:col-span-2"
                >
                  <Plus size={14} />
                  {editingProductId ? "Update Product" : "Insert Product"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL - ADD PORTFOLIO ITEM */}
      <AnimatePresence>
        {isPortfolioModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl p-8 space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh] text-gray-900"
            >
              <button 
                onClick={() => setIsPortfolioModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                title="Close"
              >
                <Plus size={20} className="rotate-45" />
              </button>

              <div className="space-y-1.5">
                <h3 className="font-bold text-base uppercase tracking-[0.15em] text-gray-900">Add Portfolio Image</h3>
                <p className="text-[11px] text-gray-500 font-medium">Create a new entry in your digital gallery archives.</p>
              </div>

              <form onSubmit={handleAddPortfolio} className="space-y-5 pt-2">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Item Title</label>
                  <input 
                    type="text"
                    value={portTitle}
                    onChange={(e) => setPortTitle(e.target.value)}
                    placeholder="Exhibition Stand Branding"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Category</label>
                  <select 
                    value={portCategory}
                    onChange={(e) => setPortCategory(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 text-xs focus:outline-none focus:border-[#3D7B89] transition-colors"
                  >
                    <option value="Digital & Printing">Digital & Printing</option>
                    <option value="Screen & Offset">Screen & Offset</option>
                    <option value="Laser & Acrylic">Laser & Acrylic</option>
                    <option value="Outdoor & Indoor">Outdoor & Indoor</option>
                    <option value="Corporate Gifts">Corporate Gifts</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Client</label>
                  <input 
                    type="text"
                    value={portClient}
                    onChange={(e) => setPortClient(e.target.value)}
                    placeholder="Dubai World Trade Centre"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Year</label>
                  <input 
                    type="text"
                    value={portYear}
                    onChange={(e) => setPortYear(e.target.value)}
                    placeholder="2025"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Portfolio Image</label>
                  
                  {/* Local File Uploader */}
                  <div className="border border-dashed border-gray-300 rounded-xl p-4 text-center bg-white hover:bg-gray-50 transition-colors relative shadow-sm">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, setPortImage);
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="text-[10px] uppercase tracking-wider text-[#3D7B89] font-bold">
                      {portImage ? "✓ Image Selected" : "↑ Upload Image Locally"}
                    </span>
                    <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider">Drag & drop or click to choose</p>
                  </div>

                  {/* Manual Image URL Paste */}
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-gray-400 font-bold block text-center">— OR PASTE IMAGE URL —</span>
                    <input 
                      type="text"
                      value={portImage}
                      onChange={(e) => setPortImage(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#3D7B89] hover:bg-[#347689] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                >
                  <Plus size={14} />
                  Insert Gallery Image
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
