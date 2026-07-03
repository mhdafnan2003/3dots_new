import { motion } from "motion/react";

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center gap-8">
        {/* Pulsing Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.95, 1.05, 0.95],
            opacity: 1 
          }}
          transition={{
            scale: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
            opacity: { duration: 0.5 }
          }}
          className="relative"
        >
          <img
            src="/images/3Dot.png"
            alt="3Dots Logo"
            className="h-10 md:h-14 w-auto object-contain"
          />
        </motion.div>

        {/* Premium sleek progress bar */}
        <div className="w-40 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "0%" }}
            transition={{
              duration: 4,
              ease: "easeInOut"
            }}
            className="absolute top-0 bottom-0 w-full bg-[#3D7B89]"
          />
        </div>
      </div>
    </motion.div>
  );
}
