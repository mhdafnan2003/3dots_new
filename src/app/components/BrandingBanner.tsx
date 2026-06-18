import { motion } from "motion/react";

const clientLogos = [
  { name: "ADCOOP", src: "/clients_logo/ADCOOP 1.png" },
  { name: "Trojan", src: "/clients_logo/Trojan.png" },
  { name: "Adeeb Group", src: "/clients_logo/ajeeb.png" },
  { name: "Al Bairaq", src: "/clients_logo/al.png" },
  { name: "Alphamed", src: "/clients_logo/alphamed.png" },
  { name: "ADNOC", src: "/clients_logo/adnoc'.png" },
  { name: "Royal Rose", src: "/clients_logo/royal rose.png" },
  { name: "MRO", src: "/clients_logo/mro.png" },
  { name: "Tevera", src: "/clients_logo/tevera.png" },
  { name: "Parrot", src: "/clients_logo/parrot.png" },
  { name: "Luminers", src: "/clients_logo/luminers.png" },
  { name: "Murugan", src: "/clients_logo/murugan.png" },
  { name: "RR", src: "/clients_logo/RR.png" },
  { name: "Pro", src: "/clients_logo/pro.png" },
  { name: "Asia", src: "/clients_logo/asia.png" },
  { name: "UAE Wrestling Federation", src: "/clients_logo/uae_wrestling.png" },
  { name: "Vertex Holidays", src: "/clients_logo/vertex.png" },
  { name: "Systems Equipment", src: "/clients_logo/systems_equipment.png" },
];

const topRowLogos = clientLogos.slice(0, 9);
const bottomRowLogos = clientLogos.slice(9);

// Triple each array to build a seamless infinite marquee scroll buffer
const topInfiniteLogos = [...topRowLogos, ...topRowLogos, ...topRowLogos];
const bottomInfiniteLogos = [...bottomRowLogos, ...bottomRowLogos, ...bottomRowLogos];

export function BrandingBanner() {
  return (
    <section className="relative w-full py-20 md:py-24 bg-gray-50/50 overflow-hidden border-t border-gray-100 z-0">
      <style>{`
        @keyframes marquee-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.3333%);
          }
        }
        @keyframes marquee-ltr {
          0% {
            transform: translateX(-33.3333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marquee-rtl 40s linear infinite;
        }
        .animate-marquee-ltr {
          display: flex;
          width: max-content;
          animation: marquee-ltr 40s linear infinite;
        }
        .animate-marquee-rtl:hover,
        .animate-marquee-ltr:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-2xl md:text-4xl uppercase tracking-[0.2em] font-medium text-gray-900">
              Our Clients
            </h2>
            <div className="h-[1px] w-16 bg-gray-200 mx-auto my-4" />
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
              We have experience working with clients in Government, Contracting, Retail, Healthcare, Hospitality, Corporate sectors, and more.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Marquee Rows Container */}
      <div className="space-y-8 relative w-full select-none">
        {/* Left & Right Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10" />

        {/* Row 1: Left to Right */}
        <div className="overflow-hidden w-full flex">
          <div className="animate-marquee-ltr gap-6 flex flex-row px-3">
            {topInfiniteLogos.map((logo, idx) => (
              <div
                key={`top-${idx}`}
                className="w-36 h-20 sm:w-44 sm:h-24 md:w-52 md:h-28 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex items-center justify-center p-5 sm:p-7 shrink-0 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="overflow-hidden w-full flex">
          <div className="animate-marquee-rtl gap-6 flex flex-row px-3">
            {bottomInfiniteLogos.map((logo, idx) => (
              <div
                key={`bottom-${idx}`}
                className="w-36 h-20 sm:w-44 sm:h-24 md:w-52 md:h-28 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.01)] flex items-center justify-center p-5 sm:p-7 shrink-0 transition-all duration-300 hover:shadow-md hover:scale-[1.02] group"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="max-h-full max-w-full object-contain transition-all duration-300 ease-in-out"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



