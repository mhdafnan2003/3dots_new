import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Clock, Award, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const serviceData: Record<string, any> = {
  "banners-sticker-printing": {
    title: "Banners & Sticker Printing",
    subtitle: "Vibrant. Durable. High-Impact.",
    description: "Our large-format printing capabilities produce stunning, high-resolution banners and stickers that command attention. Using UV-resistant inks and premium substrates, we ensure your message stays vibrant in the harshest UAE conditions.",
    heroImage: "https://images.unsplash.com/photo-1762888244708-3ac199a33a59?q=80&w=1200",
    features: [
      "High-resolution vinyl & mesh banners",
      "Custom die-cut stickers & labels",
      "UV-resistant and weatherproof inks",
      "Rapid turnaround for event branding"
    ],
    process: [
      { step: "01", title: "Material Selection", desc: "Choosing the right weight and finish for your specific application." },
      { step: "02", title: "Color Precision", desc: "Digital calibration to match your brand's exact color specifications." },
      { step: "03", title: "Large-Format Print", desc: "High-speed production using industrial-grade print heads." },
      { step: "04", title: "Finishing & Cut", desc: "Precision trimming, grommeting, or die-cutting as required." }
    ]
  },
  "screen-offset-printing": {
    title: "Screen & Offset Printing",
    subtitle: "Precision. Volume. Consistency.",
    description: "From high-volume corporate stationery to custom-branded apparel, our printing division handles complex orders with ease. We bridge the gap between traditional craft and modern efficiency to deliver sharp, consistent results every time.",
    heroImage: "https://images.unsplash.com/photo-1693031630189-a39e6d70bf22?q=80&w=1200",
    features: [
      "Bulk offset printing for brochures & flyers",
      "Premium business cards & corporate sets",
      "High-quality screen printing for apparel",
      "Spot UV, foil stamping, and custom finishes"
    ],
    process: [
      { step: "01", title: "Pre-press Setup", desc: "Meticulous plate making and screen tensioning for sharp output." },
      { step: "02", title: "Ink Mixing", desc: "Custom Pantone matching for absolute color fidelity." },
      { step: "03", title: "Production Run", desc: "High-speed offset or manual screen application depending on scale." },
      { step: "04", title: "Quality Audit", desc: "Rigorous inspection for alignment and color density." }
    ]
  },
  "outdoor-signages": {
    title: "Outdoor Signages",
    subtitle: "Architectural Grandeur.",
    description: "Build a landmark presence with our outdoor signage solutions. We specialize in large-scale installations that combine structural engineering with high-end aesthetic design, ensuring your brand stands out in the urban landscape.",
    heroImage: "https://images.unsplash.com/photo-1770688768146-dc52a6a19045?q=80&w=1200",
    features: [
      "3D Illuminated channel letters",
      "Pylon & monument signage fabrication",
      "Building wraps and facade branding",
      "Weather-resistant materials (Alucobond, Stainless Steel)"
    ],
    process: [
      { step: "01", title: "Site Survey", desc: "Technical assessment of mounting surfaces and visibility angles." },
      { step: "02", title: "Engineering", desc: "Structural CAD drawings and wind-load calculations for safety." },
      { step: "03", title: "Fabrication", desc: "CNC cutting, welding, and high-grade LED integration." },
      { step: "04", title: "Installation", desc: "Professional mounting with certified equipment and crew." }
    ]
  },
  "indoor-signages": {
    title: "Indoor Signages",
    subtitle: "Sophisticated Identity.",
    description: "Create an immersive brand experience within your space. Our indoor signage systems focus on fine details and premium finishes, providing clear wayfinding and a professional atmosphere for offices, retail, and hospitality.",
    heroImage: "https://images.unsplash.com/photo-1697125045982-0d703bc35e96?q=80&w=1200",
    features: [
      "Reception logos & acrylic features",
      "Modular wayfinding systems",
      "Digital signage & kiosks",
      "Glass frosting and wall graphics"
    ],
    process: [
      { step: "01", title: "Space Analysis", desc: "Mapping the flow of the environment for optimal placement." },
      { step: "02", title: "Design Selection", desc: "Choosing finishes that complement the interior architecture." },
      { step: "03", title: "Precision Fab", desc: "Laser cutting and assembly of delicate interior elements." },
      { step: "04", title: "Clean Install", desc: "Seamless integration into your finished environment." }
    ]
  },
  "promotional-items": {
    title: "Promotional Items",
    subtitle: "Brand Longevity.",
    description: "Stay top-of-mind with a curated selection of promotional products. From executive corporate gifts to high-volume event merchandise, we provide high-quality branding that reflects your company's excellence.",
    heroImage: "https://images.unsplash.com/photo-1625552186152-668cd2f0b707?q=80&w=1200",
    features: [
      "Curated corporate gift sets",
      "Custom branded tech accessories",
      "Event giveaways & merchandise",
      "Eco-friendly promotional options"
    ],
    process: [
      { step: "01", title: "Curation", desc: "Selecting the right products that align with your campaign goals." },
      { step: "02", title: "Mockup Design", desc: "Digital visualization of logo placement and branding." },
      { step: "03", title: "Mass Branding", desc: "Laser engraving, pad printing, or embroidery production." },
      { step: "04", title: "Packaging", desc: "Professional kitting and individual packing if required." }
    ]
  },
  // New slug mappings matching the services list and footer links:
  "printing-press-services-abu-dhabi": {
    title: "Printing Press Services in Abu Dhabi",
    subtitle: "Precision. Volume. Consistency.",
    description: "From high-volume corporate stationery to custom-branded apparel, our printing division handles complex orders with ease. We bridge the gap between traditional craft and modern efficiency to deliver sharp, consistent results every time.",
    heroImage: "/images/printing_press_services_hero.jpeg",
    features: [
      "Bulk offset printing for brochures & flyers",
      "Premium business cards & corporate sets",
      "High-quality screen printing for apparel",
      "Spot UV, foil stamping, and custom finishes"
    ],
    process: [
      { step: "01", title: "Pre-press Setup", desc: "Meticulous plate making and screen tensioning for sharp output." },
      { step: "02", title: "Ink Mixing", desc: "Custom Pantone matching for absolute color fidelity." },
      { step: "03", title: "Production Run", desc: "High-speed offset or manual screen application depending on scale." },
      { step: "04", title: "Quality Audit", desc: "Rigorous inspection for alignment and color density." }
    ]
  },
  "corporate-gifts-promotional-items-uae": {
    title: "Corporate Gifts & Promotional Items UAE",
    subtitle: "Brand Longevity.",
    description: "Stay top-of-mind with a curated selection of promotional products. From executive corporate gifts to high-volume event merchandise, we provide high-quality branding that reflects your company's excellence.",
    heroImage: "/images/corporate_gifts_hero.jpeg",
    features: [
      "Curated corporate gift sets",
      "Custom branded tech accessories",
      "Event giveaways & merchandise",
      "Eco-friendly promotional options"
    ],
    process: [
      { step: "01", title: "Curation", desc: "Selecting the right products that align with your campaign goals." },
      { step: "02", title: "Mockup Design", desc: "Digital visualization of logo placement and branding." },
      { step: "03", title: "Mass Branding", desc: "Laser engraving, pad printing, or embroidery production." },
      { step: "04", title: "Packaging", desc: "Professional kitting and individual packing if required." }
    ]
  },
  "crystal-awards-mementos-abu-dhabi": {
    title: "Crystal Awards & Mementos Abu Dhabi",
    subtitle: "Excellence Recognized.",
    description: "Honor outstanding achievements with our custom crystal awards, acrylic trophies, wooden plaques, and personalized mementos. Crafted with high-precision laser engraving and sandblasting, we create premium recognition pieces for corporate events, schools, and organizations in Abu Dhabi and across the UAE.",
    heroImage: "/images/crystal_awards_hero.jpeg",
    features: [
      "Custom-cut optical crystal and acrylic trophies",
      "High-precision laser engraving and color filling",
      "Premium wooden and metal plaque designs",
      "Luxury gift box packaging for awards presentation"
    ],
    process: [
      { step: "01", title: "Design Mockup", desc: "Creating digital artwork layout with your logo, text, and layout." },
      { step: "02", title: "Material Selection", desc: "Choosing crystal grade, base type, and dimensions." },
      { step: "03", title: "Precision Etching", desc: "Laser engraving or sandblasting for frosted and crisp detail." },
      { step: "04", title: "Inspection & Pack", desc: "Cleaning, polishing, and placing in luxury gift boxes." }
    ]
  },
  "signage-large-format-printing-uae": {
    title: "Signage & Large Format Printing UAE",
    subtitle: "Durable. Vibrant. Professional.",
    description: "Establish a prominent visual presence with our indoor/outdoor signage and large format printing. From 3D LED backlit signs, shop fronts, and building pylons, to high-resolution vinyl banner printing, canvas printing, and window graphics, we offer durable materials tailored to stand out in the UAE climate.",
    heroImage: "/images/signage_large_format_hero.jpeg",
    features: [
      "3D LED illuminated channel letters and lightboxes",
      "Wide-format high-resolution banner and vinyl sticker printing",
      "Facade branding, window frosting, and wall decals",
      "Professional site survey, engineering layout, and installation"
    ],
    process: [
      { step: "01", title: "Site Assessment", desc: "Measuring visibility, wind load requirements, and surface support." },
      { step: "02", title: "Design & Render", desc: "Providing 3D mockups and technical layout drawings." },
      { step: "03", title: "Production & Build", desc: "CNC route cutting, high-grade printing, and LED wiring." },
      { step: "04", title: "Certified Setup", desc: "Professional installation with high-reach equipment and safety compliance." }
    ]
  },
  "exhibition-branding-solutions-uae": {
    title: "Exhibition Branding Solutions UAE",
    subtitle: "High-Impact Presence.",
    description: "Make a powerful statement at your next trade show, exhibition, or event. We design, fabricate, and install custom exhibition stands, high-resolution backdrop banners, premium pop-up displays, and durable roll-up stands that attract traffic and elevate your brand's presence across the UAE.",
    heroImage: "/images/exhibition_branding_hero.jpeg",
    features: [
      "Custom fabrication and modular exhibition stands",
      "High-resolution backdrop banners & pop-up displays",
      "Sleek and durable roll-up & pop-up banners",
      "Professional trade show setup and installation"
    ],
    process: [
      { step: "01", title: "Concept & Planning", desc: "Collaborating on layout, brand assets, and structural specifications." },
      { step: "02", title: "Design & Fabricate", desc: "Crafting components, lighting, and printing high-impact graphics." },
      { step: "03", title: "Quality Check", desc: "Pre-assembling stands and banners to verify structural integrity." },
      { step: "04", title: "On-site Build", desc: "Seamless logistics, delivery, assembly, and handover at the venue." }
    ]
  }
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceData[slug || ""] || serviceData["signage-large-format-printing-uae"];

  return (
    <div className="bg-[#f8f8f8] min-h-screen">
      {/* Back Header */}
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <Link 
          to="/services"
          className="w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* Hero */}
      <section className="relative h-[80vh] overflow-hidden">
        <ImageWithFallback 
          src={service.heroImage}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-6 md:p-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-white/60 uppercase tracking-[0.5em] text-[10px] font-bold mb-4 block">{service.subtitle}</span>
            <h1 className="text-6xl md:text-9xl font-black font-['Space_Grotesk'] text-white tracking-tighter leading-none mb-8">
              {service.title.split(' ')[0]} <br />
              <span className="text-white/30 italic">{service.title.split(' ').slice(1).join(' ')}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-24 px-6 md:px-24">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-12 gap-16">
          {/* Left: Description */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-['Space_Grotesk'] font-bold mb-8">The Craftsmanship</h2>
            <p className="text-xl text-black/70 leading-relaxed mb-12 font-['Space_Grotesk']">
              {service.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {service.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                  <CheckCircle2 size={20} className="text-black shrink-0 mt-1" />
                  <span className="font-bold text-sm tracking-tight">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sidebar Meta */}
          <div className="lg:col-span-5">
            <div className="bg-black text-white p-12 rounded-[3rem] sticky top-32">
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold mb-8">Service Inquiries</h3>
              <div className="space-y-8 mb-12">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase opacity-40 font-bold">Standard Turnaround</div>
                    <div className="text-sm font-bold">24-72 Business Hours</div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase opacity-40 font-bold">Quality Standard</div>
                    <div className="text-sm font-bold">Premium Materials Guaranteed</div>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase opacity-40 font-bold">Warranty</div>
                    <div className="text-sm font-bold">UAE Weather-Durability Check</div>
                  </div>
                </div>
              </div>
              <a 
                href={`https://wa.me/971563139733?text=Hi 3Dots, I'm interested in your ${service.title} services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-white text-black py-5 rounded-none font-bold hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white px-6 md:px-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <h2 className="text-5xl md:text-7xl font-black font-['Space_Grotesk'] tracking-tighter">
              HOW WE <br /> <span className="opacity-20 italic">DELIVER.</span>
            </h2>
            <p className="max-w-md text-black/50 text-right font-['Space_Grotesk']">
              Our systematic approach ensures every project meets our rigorous standards for quality and precision.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {service.process.map((step: any, i: number) => (
              <div key={i} className="group">
                <div className="text-5xl font-black font-['Space_Grotesk'] text-black/5 mb-6 group-hover:text-black transition-colors duration-500">
                  {step.step}
                </div>
                <h4 className="text-xl font-bold mb-4 font-['Space_Grotesk']">{step.title}</h4>
                <p className="text-sm text-black/60 leading-relaxed font-['Space_Grotesk']">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Footer CTA */}
      <section className="py-32 px-6 bg-black text-white text-center">
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-8 block">Ready to start?</span>
        <h2 className="text-4xl md:text-6xl font-black font-['Space_Grotesk'] tracking-tighter mb-12">
          ELEVATE YOUR <span className="italic opacity-30">IDENTITY.</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Link 
            to="/contact"
            className="px-12 py-5 bg-white text-black rounded-none font-bold hover:scale-105 transition-transform"
          >
            Get a Quote
          </Link>
          <a 
            href={`https://wa.me/971563139733?text=Hi 3Dots, I'm interested in your ${service.title} services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 border border-white/20 rounded-none font-bold hover:bg-white/10 transition-colors flex items-center gap-2"
          >
            WhatsApp
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}
