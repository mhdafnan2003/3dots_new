import { Printer, Palette, Award, Megaphone, CheckCircle2, ArrowRight, Layers, ExternalLink, Box } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router";

export default function Services() {
  const services = [
    {
      slug: "banners-sticker-printing",
      icon: Printer,
      title: "Banners & Sticker Printing",
      description: "High-impact visual communication for indoor and outdoor use. We specialize in high-resolution vinyl banners, custom die-cut stickers, and large-format wall graphics with UV-resistant inks.",
      image: "https://images.unsplash.com/photo-1762888244708-3ac199a33a59?q=80&w=800",
      category: "Production"
    },
    {
      slug: "screen-offset-printing",
      icon: Layers,
      title: "Screen & Offset Printing",
      description: "Traditional precision meets modern speed. From high-volume corporate stationery and brochures to custom-screened apparel and packaging, we ensure color consistency and sharp details.",
      image: "https://images.unsplash.com/photo-1693031630189-a39e6d70bf22?q=80&w=800",
      category: "Publishing"
    },
    {
      slug: "outdoor-signages",
      icon: ExternalLink,
      title: "Outdoor Signages",
      description: "Command attention from afar. Our architectural outdoor signage solutions include 3D channel letters, pylon signs, and illuminated building facades engineered to withstand the UAE climate.",
      image: "/images/outdoor.png",
      category: "Fabrication"
    },
    {
      slug: "indoor-signages",
      icon: Award,
      title: "Indoor Signages",
      description: "Elevate your internal environment. We provide sophisticated wayfinding systems, reception logos, and glass frosting that combine aesthetics with functional navigation.",
      image: "/images/indoor.png",
      category: "Identity"
    },
    {
      slug: "promotional-items",
      icon: Box,
      title: "Promotional Items",
      description: "Put your brand in their hands. A vast catalog of customizable corporate gifts, from premium executive sets to high-volume event giveaways, branded with precision.",
      image: "/images/promo.png",
      category: "Branding"
    },
  ];

  const renderTitle = (title: string) => {
    if (title.includes(" & ")) {
      const parts = title.split(" & ");
      return (
        <>
          <span className="text-[#3D7B89]">{parts[0]}</span> <span className="text-gray-300 font-light">&</span> <br />
          <span className="text-[#3D7B89]">{parts[1]}</span>
        </>
      );
    }
    const firstSpace = title.indexOf(" ");
    if (firstSpace !== -1) {
      return (
        <>
          <span className="text-[#3D7B89]">{title.substring(0, firstSpace)}</span> <br />
          <span className="text-gray-300">{title.substring(firstSpace + 1)}</span>
        </>
      );
    }
    return <span className="text-[#3D7B89]">{title}</span>;
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-48 pb-32 px-6 md:px-12 bg-[#3D7B89] text-white overflow-hidden relative">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-8 block">Our Expertise</span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.9] tracking-tight mb-12">
              BEYOND <br />
              <span className="text-white/35">CAPABILITIES.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/75 max-w-3xl leading-relaxed mx-auto md:mx-0">
              3Dots Advertising delivers premium advertising and printing solutions across the UAE. We combine engineering precision with creative vision.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto space-y-24 md:space-y-48">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
              className="grid lg:grid-cols-12 gap-8 md:gap-16 lg:gap-24 items-center"
            >
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2 lg:pl-12' : 'lg:pr-12'}`}>
                <div className="mb-4 lg:mb-12 text-center lg:text-left">
                   <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#3D7B89]/40 mb-6 block leading-none">
                     Service 0{idx + 1} // {service.category}
                   </span>
                   <h2 className="text-5xl md:text-6xl lg:text-[70px] font-medium tracking-tight mb-8 leading-[1.05]">
                     {renderTitle(service.title)}
                   </h2>
                   <p className="text-lg md:text-[20px] text-black/60 leading-relaxed mb-12 font-normal max-w-xl mx-auto lg:mx-0">
                     {service.description}
                   </p>
                   
                   <div className="flex flex-wrap gap-8 items-center">
                     <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#3D7B89] text-white flex items-center justify-center shadow-sm">
                          <service.icon size={18} />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3D7B89]">Premium Quality</span>
                     </div>
                     <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-[#3D7B89]">
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3D7B89]">UAE Wide Delivery</span>
                     </div>
                   </div>
                </div>
              </div>

              <div className={`lg:col-span-7 relative ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative w-full h-[450px] md:h-[600px] lg:h-[780px] rounded-[3.5rem] overflow-hidden group shadow-sm">
                  <ImageWithFallback 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-48 px-6 text-center bg-[#3D7B89]">
        <h2 className="text-5xl md:text-7xl lg:text-[84px] font-medium tracking-wide uppercase text-white/35 mb-12 leading-[0.95]">
          LET'S TALK PRODUCTION.
        </h2>
        <a 
          href="https://wa.me/971563139733?text=Hi%203Dots%2C%20I%27d%20like%20to%20inquire%20about%20your%20services."
          className="inline-flex items-center gap-4 bg-transparent border border-white/40 hover:border-white/60 hover:bg-white/5 text-white px-12 py-4 rounded-none text-lg font-medium transition-all"
        >
          WhatsApp Us
          <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}
