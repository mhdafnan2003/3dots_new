import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, MessageCircle, Share2, Sparkles, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";



export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  // Quote form state hooks
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/products")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const found = data.find(p => String(p._id || p.id) === String(id));
          if (found) {
            const categoryLabel = found.subcategory || (found.category === 'printing' ? 'Print Production' : (found.category === 'signage' ? 'Signage & Displays' : 'Brand Identity & Promo'));
            
            const specsList = [];
            if (found.specs && found.specs.length > 0) {
              specsList.push(...found.specs);
            } else if (found.specMaterial || found.specFinishing || found.specProduction || found.specFacility) {
              if (found.specMaterial) specsList.push({ label: "Material", value: found.specMaterial });
              if (found.specFinishing) specsList.push({ label: "Finishing", value: found.specFinishing });
              if (found.specProduction) specsList.push({ label: "Production", value: found.specProduction });
              if (found.specFacility) specsList.push({ label: "Facility", value: found.specFacility });
            } else {
              specsList.push(...(found.category === 'signage' ? [
                { label: "Material", value: "Grade 304 Stainless Steel + Acrylic" },
                { label: "Finishing", value: "Satin Powdercoat + Laser CNC Cut" },
                { label: "Illumination", value: "IP67 Samsung LED High-CRI" },
                { label: "Facility", value: "3Dots Dubai Production Studio" }
              ] : found.category === 'printing' ? [
                { label: "Material", value: "400gsm Premium Matte Cardboard" },
                { label: "Finishing", value: "Spot UV + Gold Embossed Stamp" },
                { label: "Production", value: "Heidelberg Speedmaster XL 5-Color" },
                { label: "Facility", value: "3Dots High-Speed Print Hub" }
              ] : [
                { label: "Category", value: "Bespoke Branding & Identity" },
                { label: "Material", value: "Eco-friendly Organic Cotton & Paper" },
                { label: "Finishing", value: "Debossed Logo Seal" },
                { label: "Facility", value: "3Dots Premium Gift Crafting" }
              ]));
            }

            const featuresList = (found.features && found.features.length > 0) 
              ? found.features.filter(Boolean)
              : (found.category === 'signage' ? [
                  "IP67 Dust & Weatherproof Electronics",
                  "Premium Grade CNC Laser Cuts",
                  "Low energy LED illumination",
                  "Rust-resistant framing guarantee"
                ] : found.category === 'printing' ? [
                  "Vegetable-based organic ink prints",
                  "Heavy-duty debossing stamp alignment",
                  "Matte-lamination water resistance",
                  "Certified biodegradable cardboards"
                ] : [
                  "Handcrafted luxury structural builds",
                  "High quality screen imprint fidelity",
                  "Custom tailor-fit dimensions",
                  "Eco-friendly materials priority"
                ]);

            const richProduct = {
              name: found.title || found.name,
              category: categoryLabel,
              year: found.year || "2026",
              client: found.client || "VIP Client Dubai",
              description: found.description || `A masterclass in bespoke structural design. We developed this custom solution using premium substrates, precision manufacturing, and refined finishes to ensure a striking visual impact that perfectly aligns with high-end luxury standards.`,
              mainImage: found.image || found.mainImage || "https://images.unsplash.com/photo-1580680849668-45d32df32e67?q=80&w=1200",
              gallery: (found.images && found.images.length > 0) ? found.images : [
                found.image || "https://images.unsplash.com/photo-1580680849668-45d32df32e67?q=80&w=800",
                "https://images.unsplash.com/photo-1693031630177-b897fb9d7154?q=80&w=800",
                "https://images.unsplash.com/photo-1629492070154-587601fb59af?q=80&w=800"
              ],
              specs: specsList,
              features: featuresList
            };
            setProduct(richProduct);
            setActiveImage(richProduct.mainImage);
          } else {
            setProduct(null);
          }
        } else {
          setProduct(null);
        }
      })
      .catch(err => {
        console.warn("Failed to retrieve live product", err);
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseMessage = `Hi 3Dots, I would like to request a quote for:
*Product*: ${product?.name}
*Category*: ${product?.category}
*Company*: ${companyName || 'Not specified'}
*Email*: ${emailAddress || 'Not specified'}
*Phone*: ${phoneNumber || 'Not specified'}
*Quantity*: ${quantity || 'Not specified'}`;

    const encodedText = encodeURIComponent(baseMessage);
    const whatsappUrl = `https://wa.me/971563139733?text=${encodedText}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsQuoteModalOpen(false);
    
    // Clear form
    setCompanyName("");
    setEmailAddress("");
    setPhoneNumber("");
    setQuantity("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#3D7B89] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <h2 className="text-2xl font-bold text-gray-800 uppercase tracking-wider">Product Not Found</h2>
        <Link 
          to="/products"
          className="bg-[#3D7B89] text-white px-6 py-3 text-xs font-bold uppercase tracking-[0.2em]"
        >
          Return to Products
        </Link>
      </div>
    );
  }

  const allImages = Array.from(new Set([product.mainImage, ...product.gallery].filter(Boolean)));

  return (
    <div className="bg-white min-h-screen">
      {/* Dynamic Header Back Button */}
      <div className="fixed top-24 left-6 md:left-12 z-50 flex gap-4">
        <Link 
          to="/products"
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-xl border border-black/5 flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Back to Products"
        >
          <ArrowLeft size={20} className="text-[#0A0A0A]" />
        </Link>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-40 pb-32">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Imagery */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden bg-gray-50 relative shadow-lg w-full aspect-[4/5]"
            >
              <ImageWithFallback 
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="grid grid-cols-3 gap-6">
              {allImages.slice(0, 3).map((img: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-gray-50 cursor-pointer transition-all duration-300 ${
                    activeImage === img ? 'ring-4 ring-[#3D7B89]' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback src={img} alt="Detail" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-5">
            <div className="sticky top-40">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#8E8E8E] mb-4 block font-bold">
                    PROJECT {product.year}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-6 flex flex-col">
                    <span className="text-[#0A0A0A]">{product.name}</span>
                    {product.titleLine2 && <span className="text-[#C4C4C4] font-normal">{product.titleLine2}</span>}
                  </h1>
                  <div className="flex items-center gap-6">
                    <span 
                      className="px-5 py-1.5 rounded-full border border-black/10 bg-white"
                      style={{
                        color: "#0A0A0A",
                        fontFamily: '"Neue Regrade", sans-serif',
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0.617px",
                        textTransform: "uppercase"
                      }}
                    >
                      {product.category}
                    </span>
                    <span style={{
                      color: "#0A0A0A",
                      fontFamily: '"Neue Regrade", sans-serif',
                      fontSize: "10px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "15px",
                      letterSpacing: "0.617px",
                      textTransform: "uppercase"
                    }}>
                      CLIENT: {product.client}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-16">
                <span 
                  className="mb-4 block"
                  style={{
                    color: "#0A0A0A",
                    fontFamily: '"Neue Regrade", sans-serif',
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "15px",
                    letterSpacing: "0.617px",
                    textTransform: "uppercase"
                  }}
                >
                  THE CHALLENGE
                </span>
                <p style={{
                  color: "rgba(0, 0, 0, 0.70)",
                  fontFamily: '"Neue Regrade", sans-serif',
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "32.5px"
                }}>
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="bg-[#F9F9F9] p-10 rounded-[2.5rem] mb-12 shadow-sm">
                <span className="mb-8 block" style={{
                  color: "#0A0A0A",
                  fontFamily: '"Neue Regrade", sans-serif',
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "16px",
                  letterSpacing: "3.6px",
                  textTransform: "uppercase"
                }}>TECHNICAL SPECS</span>
                <div className="space-y-6">
                  {product.specs.map((spec: any, i: number) => (
                    <div key={i} className="flex justify-between items-center border-b border-black/5 pb-4">
                      <span style={{
                        color: "rgba(0, 0, 0, 0.30)",
                        fontFamily: '"Neue Regrade", sans-serif',
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "15px",
                        letterSpacing: "0.117px",
                        textTransform: "uppercase"
                      }}>
                        {spec.label}
                      </span>
                      <span className="text-xs font-semibold text-[#0A0A0A]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-16">
                {product.features.map((feature: string, i: number) => (
                  <div key={i} className="flex items-center gap-3">
                    <Sparkles size={12} className="text-[#3D7B89] shrink-0" />
                    <span style={{
                      color: "#0A0A0A",
                      fontFamily: '"Neue Regrade", sans-serif',
                      fontSize: "10px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "15px",
                      letterSpacing: "0.617px",
                      textTransform: "uppercase"
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Actions */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2.5 bg-[#3D7B89] hover:bg-[#2D5F6A] text-white py-4 rounded-full text-[15px] font-normal transition-all shadow-sm cursor-pointer"
                  style={{ fontFamily: '"Neue Regrade", sans-serif' }}
                >
                  <MessageCircle size={18} strokeWidth={1.5} />
                  Request Quote
                </button>
                <button className="w-14 h-14 rounded-full border border-black/10 bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all group shadow-sm shrink-0">
                  <Share2 size={18} strokeWidth={1.5} className="text-[#0A0A0A] group-hover:text-white group-hover:scale-110 transition-all" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Promise Section */}
        <section className="mt-48 pt-32 border-t border-black/5 grid md:grid-cols-3 gap-16">
          <div className="flex flex-col gap-6">
            <img src="/images/flash.png" alt="Precision" className="w-10 h-10 object-contain" />
            <div className="space-y-3">
              <h4 style={{
                color: "#0A0A0A",
                fontFamily: '"Neue Regrade", sans-serif',
                fontSize: "32.155px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "45.018px"
              }}>PRECISION ENGINEERING</h4>
              <p className="max-w-sm" style={{
                color: "rgba(0, 0, 0, 0.50)",
                fontFamily: '"Neue Regrade", sans-serif',
                fontSize: "22.509px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "36.577px",
                letterSpacing: "-0.242px"
              }}>
                From CNC cutting to digital offset registration, we use industry-leading technology to achieve micron-level accuracy.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <img src="/images/sheald.png" alt="Durability" className="w-10 h-10 object-contain" />
            <div className="space-y-3">
              <h4 style={{
                color: "#0A0A0A",
                fontFamily: '"Neue Regrade", sans-serif',
                fontSize: "32.155px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "45.018px"
              }}>DURABILITY GUARANTEED</h4>
              <p className="max-w-sm" style={{
                color: "rgba(0, 0, 0, 0.50)",
                fontFamily: '"Neue Regrade", sans-serif',
                fontSize: "22.509px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "36.577px",
                letterSpacing: "-0.242px"
              }}>
                We select materials specifically engineered for the Gulf climate, ensuring UV resistance and heat stability for long-term use.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <img src="/images/badge.png" alt="Quality" className="w-10 h-10 object-contain" />
            <div className="space-y-3">
              <h4 style={{
                color: "#0A0A0A",
                fontFamily: '"Neue Regrade", sans-serif',
                fontSize: "32.155px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "45.018px"
              }}>UNCOMPROMISED QUALITY</h4>
              <p className="max-w-sm" style={{
                color: "rgba(0, 0, 0, 0.50)",
                fontFamily: '"Neue Regrade", sans-serif',
                fontSize: "22.509px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "36.577px",
                letterSpacing: "-0.242px"
              }}>
                Every project undergoes a 12-point quality check at our Dubai facility to ensure color accuracy and structural integrity.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="py-24 px-6 md:px-12 bg-[#3D7B89] text-white text-center mt-32 w-full">
        <span className="text-[9px] uppercase tracking-[0.45em] text-white/60 mb-6 block font-bold">NEXT MASTERPIECE</span>
        <Link 
          to="/products"
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white hover:opacity-80 transition-opacity uppercase block"
        >
          VIEW MORE PROJECTS
        </Link>
      </div>

      {/* Dynamic Request Quote Form Modal */}
      <AnimatePresence>
        {isQuoteModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-white border border-gray-200 rounded-[2.5rem] p-8 space-y-6 relative shadow-2xl overflow-y-auto max-h-[90vh] text-gray-900"
            >
              <button 
                onClick={() => setIsQuoteModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                title="Close"
              >
                <X size={20} />
              </button>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#3D7B89]">REQUEST QUOTE</span>
                <h3 className="font-bold text-xl uppercase tracking-tight text-gray-900 mt-1">{product?.name}</h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">
                  Provide your business contact details and required volume. We'll direct you to WhatsApp to instantly format your quote dispatch.
                </p>
              </div>

              <form onSubmit={handleQuoteSubmit} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Company Name</label>
                  <input 
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. VIP Branding Dubai"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Email Address</label>
                  <input 
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Phone Number</label>
                  <input 
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+971 50 123 4567"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-[0.2em] font-bold text-gray-500 block">Quantity / Volume</label>
                  <input 
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 500 units"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 text-xs focus:outline-none focus:border-[#3D7B89] focus:bg-white transition-all"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#3D7B89] hover:bg-[#2D5F6A] text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#3D7B89]/15 mt-6"
                >
                  <MessageCircle size={15} />
                  Submit to WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
