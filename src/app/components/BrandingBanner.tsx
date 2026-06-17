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

export function BrandingBanner() {
  const getBorderClasses = (idx: number) => {
    // 18 logos total (0 to 17)
    const isLastColMobile = idx % 2 === 1;
    const isLastColDesktop = idx % 4 === 3 || idx === 17;
    const isLastRowMobile = idx >= 16;
    // Desktop: Row 4 is centered (cols 1 & 2). Row 3 cols 0 & 3 (indices 12 & 15) have no items below them.
    const isLastRowDesktop = idx === 12 || idx === 15 || idx >= 16;

    return `
      ${isLastColMobile ? "border-r-0" : "border-r border-gray-100"} 
      ${isLastColDesktop ? "md:border-r-0" : "md:border-r md:border-gray-100"} 
      ${isLastRowMobile ? "border-b-0" : "border-b border-gray-100"} 
      ${isLastRowDesktop ? "md:border-b-0" : "md:border-b md:border-gray-100"}
    `.trim().replace(/\s+/g, " ");
  };

  return (
    <section className="relative w-full py-20 md:py-24 bg-white overflow-hidden border-t border-gray-100 z-0">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
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

        {/* Flex-Wrap Grid Container for centered last row */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center">
          {clientLogos.map((logo, idx) => (
            <div
              key={idx}
              className={`w-1/2 md:w-1/4 flex items-center justify-center p-8 h-32 md:h-40 bg-white transition-all duration-300 ${getBorderClasses(idx)}`}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full max-w-full object-contain transition-all duration-300 ease-in-out hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



