import { motion } from "motion/react";
import { ArrowRight, MapPin, Award, Users, Layers } from "lucide-react";

const stats = [
  { value: "12+", label: "Years in the UAE" },
  { value: "1,400+", label: "Projects Delivered" },
  { value: "380+", label: "Active Clients" },
  { value: "48h", label: "Avg. Turnaround" },
];

const values = [
  {
    index: "01",
    title: "Craft Over Volume",
    body:
      "We run lean on purpose. Every project is handled by senior hands — no hand-offs to juniors mid-job. The quality you see in the brief is the quality that ships.",
  },
  {
    index: "02",
    title: "Material Honesty",
    body:
      "We don't spec materials we wouldn't stake our name on. Every substrate, ink system, and finish is selected for real-world performance in the UAE's climate — not just for the quote.",
  },
  {
    index: "03",
    title: "Speed Without Compromise",
    body:
      "Dubai moves fast. We've built workflows and supplier relationships specifically to compress lead times on large-format and complex signage without compromising output quality.",
  },
  {
    index: "04",
    title: "Radical Transparency",
    body:
      "Pricing is itemised, timelines are honest, and we'll tell you if a competitor can do it better. Long-term trust with clients like DAMAC and Emirates NBD is worth more than a single inflated job.",
  },
];

const milestones = [
  { year: "2013", event: "Founded in Al Quoz, Dubai — two machines, one team" },
  { year: "2016", event: "First government tender win: Dubai Municipality wayfinding" },
  { year: "2019", event: "Expanded to 18,000 sq ft production facility, Sharjah" },
  { year: "2021", event: "Delivered Expo 2020 Dubai official partner signage" },
  { year: "2023", event: "Launched premium promotional and corporate gifting division" },
  { year: "2026", event: "500+ active brand partnerships across UAE & GCC" },
];

const team = [
  {
    name: "Omar Al Rashidi",
    role: "Founder & Creative Director",
    imgId: "1507003211169-0a1dd7228f2d",
    bio: "15 years in UAE visual communications. Former head of production at JWT MENA.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Client Strategy",
    imgId: "1494790108377-be9c29b29330",
    bio: "Managed landmark campaigns for Emirates Group and Majid Al Futtaim.",
  },
  {
    name: "Hassan Darwish",
    role: "Production Manager",
    imgId: "1472099645785-5658abf4ff4e",
    bio: "20+ years on press. Certified master printer — HP Latex and Durst Rho systems.",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
  };
}

export default function About() {
  return (
    <main className="bg-white min-h-screen overflow-hidden">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-[#3D7B89] pt-28 md:pt-40 pb-16 md:pb-32 px-6 md:px-12 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <motion.p
            {...fadeUp(0)}
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-12 font-bold text-center md:text-left"
          >
            About 3Dots Advertising
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end text-center md:text-left">
            <motion.div {...fadeUp(0.1)} className="lg:col-span-8">
              <h1 className="text-[clamp(3rem,9vw,8.5rem)] font-normal leading-[0.95] tracking-tight text-white">
                Built for<br />
                <span className="text-white/60">the UAE's</span>{' '}
                <br className="hidden md:block" />
                pace.
              </h1>
            </motion.div>
            <motion.div {...fadeUp(0.25)} className="lg:col-span-4 lg:pb-8">
              <p className="text-white/70 text-base md:text-lg leading-relaxed font-normal mx-auto md:mx-0">
                A Dubai-native production studio that has been turning briefs into
                built reality since 2013 — across every substrate, every scale, every
                deadline.
              </p>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            {...fadeUp(0.35)}
            className="mt-16 md:mt-32 grid grid-cols-2 md:grid-cols-4 border-t border-white/20 pt-12 gap-y-12"
          >
            {stats.map((s) => (
              <div key={s.label} className="md:pr-8 text-center md:text-left">
                <p className="text-5xl md:text-6xl font-normal text-white tracking-tight leading-none mb-4">
                  {s.value}
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Origin Story ─────────────────────────────────────── */}
      <section className="pt-12 pb-16 md:py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div {...fadeUp()} className="order-2 lg:order-1 mx-auto lg:mx-0 w-full" style={{ maxWidth: '597.49px' }}>
            <div className="relative" style={{ width: '100%', aspectRatio: '597.49 / 746.862' }}>
              <div className="w-full h-full rounded-sm overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200"
                  alt="Our Studio"
                  className="w-full h-full object-cover"
                />
              </div>
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
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.15)} className="order-1 lg:order-2 space-y-8">
            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">Our Story</span>

            <h2 className="text-4xl md:text-5xl lg:text-[64px] font-medium leading-[1.1] tracking-tight">
              <span className="text-[#3D7B89]">Three dots.</span>{' '}
              <span className="text-gray-400">One</span>
              <br />
              <span className="text-gray-400">signal.</span>
            </h2>

            <div className="space-y-6 text-gray-500 text-[15px] leading-relaxed max-w-xl">
              <p>
                The name comes from the ellipsis — that moment of pause before something impactful is said. We started in 2013 from a single 1,200 sq ft unit in Al Quoz with two wide-format printers and a belief that Dubai's booming market deserved a production partner with genuine craft values.
              </p>
              <p>
                Over a decade later we operate a 18,000 sq ft facility in Sharjah and a client relations studio in Business Bay, with production capabilities spanning large-format, screen, offset, CNC routing, LED fabrication, and branded merchandise — all under one quality-controlled roof.
              </p>
            </div>

            <div className="pt-4">
              <a
                href="https://wa.me/971563139733?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%203Dots"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#3D7B89] text-white px-8 py-4 rounded-none hover:bg-[#2F616D] transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em]"
              >
                START A CONVERSATION
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="bg-[#f5f4f0] py-12 md:py-32 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div {...fadeUp()} className="mb-20 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6 font-bold">
              How We Work
            </p>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-tight">
              <span className="text-[#3D7B89]">Four principles.</span><br />
              <span className="text-gray-400">Non-negotiable.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200">
            {values.map((v, i) => (
              <motion.div
                key={v.index}
                {...fadeUp(i * 0.1)}
                className="bg-[#f5f4f0] p-12 md:p-16"
              >
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-300 mb-8 font-bold">
                  {v.index}
                </p>
                <h3 className="text-2xl font-medium text-[#3D7B89] mb-5 tracking-tight">
                  {v.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {v.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
          <motion.div {...fadeUp()} className="text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-6 font-bold">
              Timeline
            </p>
            <h2 className="text-5xl font-medium tracking-tight leading-tight">
              <span className="text-[#3D7B89]">A decade</span><br />
              <span className="text-gray-400">of marks.</span>
            </h2>
          </motion.div>

          <div className="lg:col-span-2">
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  {...fadeUp(i * 0.08)}
                  className="flex gap-8 md:gap-16 py-8 border-b border-gray-100"
                >
                  <p className="text-sm font-bold text-gray-300 w-12 shrink-0 pt-1">
                    {m.year}
                  </p>
                  <p className="text-base md:text-lg text-gray-500 leading-snug">
                    {m.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section className="bg-[#3D7B89] py-16 md:py-32 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div {...fadeUp()} className="mb-20 text-center md:text-left">
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40 mb-6 font-bold">
              The People
            </p>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight">
              Senior hands<br />
              <span className="text-white/60">on every job.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div key={member.name} {...fadeUp(i * 0.12)} className="group">
                <div className="overflow-hidden mb-6 bg-white/5 aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3]">
                  <img
                    src={`https://images.unsplash.com/photo-${member.imgId}?w=800&h=600&fit=crop&crop=faces&auto=format`}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/40 mb-2 font-bold">
                  {member.role}
                </p>
                <h3 className="text-xl font-medium text-white mb-3">{member.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>

          {/* Capabilities strip */}
          <motion.div
            {...fadeUp(0.2)}
            className="mt-24 pt-16 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { Icon: Layers, label: "Large-Format Print", sub: "HP Latex · Durst Rho · Vutek" },
              { Icon: Award, label: "Offset & Screen", sub: "Heidelberg · Ryobi presses" },
              { Icon: MapPin, label: "Signage Fabrication", sub: "CNC · Laser · LED channel" },
              { Icon: Users, label: "Promo & Gifting", sub: "Full sourcing + decoration" },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex gap-4">
                <Icon size={20} className="text-white/40 shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <p className="text-white font-medium text-sm mb-1">{label}</p>
                  <p className="text-white/40 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-12 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            {...fadeUp()}
            className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12"
          >
            <h2 className="text-5xl md:text-7xl lg:text-[84px] font-medium tracking-tight leading-[0.95] text-center lg:text-left">
              <span className="text-[#3D7B89]">Ready to see what</span><br />
              <span className="text-gray-300">we can build?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="https://wa.me/971563139733?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote%20from%203Dots"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-[#3D7B89] text-white px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#2F616D] transition-colors"
              >
                Get a Quote
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/gallery"
                className="group flex items-center gap-3 border border-gray-200 text-[#3D7B89] bg-white px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors"
              >
                View Gallery
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
