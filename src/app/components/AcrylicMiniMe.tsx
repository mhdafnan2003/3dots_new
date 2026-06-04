import { motion } from "motion/react";

export function AcrylicMiniMe() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full relative"
      >
        <img
          src="/images/Page 1 1.png"
          alt="Acrylic Mini Me"
          className="w-full h-auto object-cover"
        />
        
        {/* Hotspot overlay link to WhatsApp */}
        <a
          href="https://wa.me/971563139733?text=Hi,%20I'm%20interested%20in%20Acrylic%20Mini%20Me"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-[18%] right-[7.8%] w-[8%] h-[8%] cursor-pointer z-20"
          aria-label="Order Acrylic Mini Me on WhatsApp"
        />
      </motion.div>
    </section>
  );
}
