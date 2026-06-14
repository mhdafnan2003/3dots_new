import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="pt-12 pb-12 md:pt-16 md:pb-20 bg-gray-50 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Side: Image with Location Tag */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto lg:mx-0"
            style={{ width: '100%', maxWidth: '597.49px', aspectRatio: '597.49 / 746.862' }}
          >
            <div className="w-full h-full rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"
                alt="Our Studio"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Location Tag */}
            <div className="absolute bottom-0 right-0 md:-bottom-12 md:-right-12 bg-[#3D7B89] text-white p-8 w-56 md:w-64 shadow-xl z-20">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={14} className="text-white/60 shrink-0" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-bold">Location</span>
              </div>
              <p className="text-lg font-medium leading-relaxed">
                Al Danah,<br />
                Abu Dhabi — UAE
              </p>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">Our Story</span>

            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium leading-[1.1] tracking-tight">
              <span className="text-[#3D7B89]">Three dots.</span>{' '}
              <span className="text-gray-400">One</span>
              <br />
              <span className="text-gray-400">signal.</span>
            </h2>

            <div className="space-y-6 text-gray-500 text-[15px] leading-relaxed max-w-xl">
              <p>
                We are an Emirates-based company licensed by the Abu Dhabi Media Council. Our team is made up of creative thinkers and passionate designers who believe in understanding your brand first—because meaningful advertising begins with insight, not assumptions.
              </p>
              <p>
                We are genuine in our approach and deeply committed to delivering exceptional results. This dedication comes from a true love for our craft and the privilege of enjoying every stage of the creative journey.
              </p>
              <p>
                Above all, we stay true to our values and proudly collaborate with responsible companies that strive to make the world a better place.
              </p>
            </div>

            <div className="pt-4">
              <button className="group flex items-center gap-3 bg-[#3D7B89] text-white px-8 py-4 rounded-none hover:bg-[#2F616D] transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]">
                START A CONVERSATION
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
