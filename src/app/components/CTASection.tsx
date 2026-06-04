import { motion } from "motion/react";
import { Link } from "react-router";

export function CTASection() {
  return (
    <section className="bg-[#3D7B89] py-24 md:py-32 px-6 md:px-20 relative z-10 overflow-hidden">
      <div className="w-full relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12">
          
          {/* Heading */}
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl lg:text-[84px] font-medium tracking-tight leading-[0.95] text-white text-center lg:text-left">
              Ready to see what <br />
              <span className="opacity-60">we can build?</span>
            </h2>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center lg:justify-start w-full lg:w-auto mt-8 lg:mt-0">
            <Link to="/contact" className="w-full md:w-auto text-center bg-white text-[#3D7B89] px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-all">
              GET A QUOTE
            </Link>
            <Link to="/gallery" className="w-full md:w-auto text-center border border-white/30 text-white px-10 py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
              VIEW GALLERY
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
