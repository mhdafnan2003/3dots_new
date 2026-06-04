import { Mail, Phone, MapPin, Clock, MessageCircle, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hi, I'm ${formData.name}. I'm interested in ${formData.service}. ${formData.message}`;
    const whatsappUrl = `https://wa.me/971563139733?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  const services = [
    "Digital Printing",
    "Signage Systems",
    "Branding Collateral",
    "Exhibition Stands",
    "Fleet Branding",
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-28 md:pt-48 pb-16 md:pb-32 px-6 md:px-12 bg-[#3D7B89] text-white relative overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-8 block">Connect</span>
            <h1 className="text-6xl md:text-9xl font-medium tracking-tighter leading-[0.9] mb-12">
              LET'S START <br />
              <span className="text-white/30">A DIALOGUE.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-2 gap-32">
          
          {/* Info */}
          <div className="space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 block">EMAIL</span>
                <a 
                  href="mailto:hello@3dots.ae" 
                  className="text-2xl font-normal text-[#0A0A0A] hover:text-[#3D7B89] transition-colors"
                >
                  hello@3dots.ae
                </a>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 block">PHONE</span>
                <a 
                  href="tel:+971563139733" 
                  className="text-2xl font-normal text-[#0A0A0A] hover:text-[#3D7B89] transition-colors"
                >
                  +971 56 313 9733
                </a>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 block">LOCATION</span>
                <p className="text-2xl font-normal text-[#0A0A0A] leading-relaxed">
                  Sheikh Zayed Bin Sultan St <br />
                  behind Lulu Center, Al Danah <br />
                  Abu Dhabi, UAE
                </p>
              </div>
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 block">HOURS</span>
                <p className="text-2xl font-normal text-[#0A0A0A] leading-relaxed">
                  Sat — Thu <br /> 09:00 — 18:00
                </p>
              </div>
            </div>

            <div className="aspect-video rounded-[3rem] overflow-hidden shadow-sm border border-black/5 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3630.645459066761!2d54.36691357618431!3d24.497738278167958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e67d640a5b689%3A0x490aaa8febee5231!2s3Dots%20Advertising!5e0!3m2!1sen!2sin!4v1779019826781!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#F9F9F9] p-12 md:p-16 rounded-[3.5rem] shadow-sm">
            <h2 className="text-3xl font-medium tracking-tight mb-12 uppercase text-[#0A0A0A]">SEND A BRIEF</h2>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 block">YOUR NAME</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#3D7B89] outline-none transition-all text-xl font-normal placeholder:text-black/20"
                  placeholder="Full Name"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 block">EMAIL ADDRESS</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#3D7B89] outline-none transition-all text-xl font-normal placeholder:text-black/20"
                  placeholder="email@company.com"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 block">CAPABILITY</label>
                <div className="relative">
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#3D7B89] outline-none transition-all text-xl font-normal appearance-none cursor-pointer"
                  >
                    <option value="">Select Service</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/30 block">MESSAGE</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#3D7B89] outline-none transition-all text-xl font-normal min-h-[150px] resize-none placeholder:text-black/20"
                  placeholder="Tell us about your project..."
                />
              </div>

               <button
                type="submit"
                className="group w-full bg-[#3D7B89] hover:bg-[#2D5F6A] text-white py-5 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 mt-12 shadow-sm"
              >
                REQUEST A QUOTE
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
