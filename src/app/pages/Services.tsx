import { Printer, Award, CheckCircle2, ArrowRight, Layers, ExternalLink, Box } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Services() {
  const services = [
    {
      slug: "printing-press-services-abu-dhabi",
      icon: Layers,
      title: "Printing Press Services in Abu Dhabi",
      description: "Printing Press Abu Dhabi – UAE. We offer professional screen printing and offset printing services in Abu Dhabi for business cards, brochures, flyers, and bulk printing requirements with sharp quality and accurate color output.",
      image: "/images/printing_press_services_hero.jpeg",
      category: "Publishing"
    },
    {
      slug: "corporate-gifts-promotional-items-uae",
      icon: Box,
      title: "Corporate Gifts & Promotional Items UAE",
      description: "Corporate Gifts UAE. We are a leading corporate gifts supplier in Abu Dhabi offering customized promotional gifts, branded items, and premium corporate giveaways across UAE. Ideal for branding, events, and corporate identity enhancement.",
      image: "/images/corporate_gifts_hero.jpeg",
      category: "Branding"
    },
    {
      slug: "crystal-awards-mementos-abu-dhabi",
      icon: Award,
      title: "Crystal Awards & Mementos Abu Dhabi",
      description: "We design and manufacture premium custom crystal awards, acrylic trophies, wooden plaques, and custom mementos in Abu Dhabi and across the UAE. Suitable for corporate recognition, academic honors, and special events with high-precision engraving.",
      image: "/images/crystal_awards_hero.jpeg",
      category: "Identity"
    },
    {
      slug: "signage-large-format-printing-uae",
      icon: Printer,
      title: "Signage & Large Format Printing UAE",
      description: "Printing Press Abu Dhabi – UAE. We provide high-quality banner printing, sticker printing, and custom branding solutions in Abu Dhabi and across the UAE. Suitable for indoor and outdoor advertising needs with premium finishing and fast delivery. Signages Abu Dhabi – UAE. We design and manufacture outdoor and indoor signage solutions in Abu Dhabi and UAE including shop signs, 3D signs, LED signs, and branding boards with durable materials and premium finishing.",
      image: "/images/signage_large_format_hero.jpeg",
      category: "Production"
    },
    {
      slug: "exhibition-branding-solutions-uae",
      icon: ExternalLink,
      title: "Exhibition Branding Solutions UAE",
      description: "We provide high-impact exhibition branding solutions in Abu Dhabi and across the UAE, including custom exhibition stands, backdrop banners, pop-up displays, and roll-up stands for trade shows, pavilions, and events.",
      image: "/images/exhibition_branding_hero.jpeg",
      category: "Fabrication"
    },
  ];

  const renderTitle = (title: string) => {
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
            <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-white/40 mb-8 block max-w-4xl leading-relaxed">
              Printing Press in Abu Dhabi | Corporate Gifts | Crystal Awards | Signage & Branding Solutions in UAE
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.9] tracking-tight mb-12 uppercase">
              BEYOND <br />
              <span className="text-gray-400">SOLUTIONS.</span>
            </h1>
            <div className="space-y-4 max-w-3xl">
              <p className="text-xl md:text-2xl text-white/75 leading-relaxed">
                3Dots Advertising delivers premium advertising and printing solutions across the UAE. We combine engineering precision with creative vision.
              </p>
              <p className="text-sm md:text-base text-white/60 leading-relaxed font-normal">
                We provide high-quality printing press services in Abu Dhabi and across the UAE including Dubai, Al Ain, Ajman and Sharjah.
              </p>
            </div>
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
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#3D7B89]/40 mb-6 block leading-none">
                     Service 0{idx + 1} // {service.category}
                   </span>
                   <h2 className="text-5xl md:text-6xl lg:text-[70px] font-bold tracking-tight mb-8 leading-[1.05]">
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
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 bg-transparent border border-white/40 hover:border-white/60 hover:bg-white/5 text-white px-12 py-4 rounded-none text-lg font-medium transition-all"
        >
          WhatsApp Us
          <ArrowRight size={18} />
        </a>
      </section>
    </div>
  );
}
