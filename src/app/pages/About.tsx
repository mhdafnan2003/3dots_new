import { motion } from "motion/react";
import { ArrowRight, MapPin, Award, Users, Layers } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface CounterProps {
  value: string;
}

function Counter({ value }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const numericMatch = value.match(/^(\d+)(.*)$/);
  const targetNumber = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const suffix = numericMatch ? numericMatch[2] : "";

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const duration = 2000; // 2 seconds

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // easeOutQuad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.floor(easeProgress * targetNumber);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetNumber);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [targetNumber, hasAnimated]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: "5+", label: "Years In UAE" },
  { value: "2400+", label: "Projects Delivered" },
  { value: "650+", label: "Active Clients" },
  { value: "2", label: "Awards" },
];

const values = [
  {
    index: "01",
    title: "Quality Over Quantity",
    body:
      "We believe great work deserves complete attention. Every project receives dedicated oversight from experienced professionals, ensuring consistency, precision, and excellence from concept to installation.",
  },
  {
    index: "02",
    title: "Built for the UAE",
    body:
      "We carefully select materials, finishes, and production methods designed to withstand the UAE's climate and environmental conditions. Every solution is chosen for durability, performance, and long-term value.",
  },
  {
    index: "03",
    title: "Fast. Reliable. Precise.",
    body:
      "Business moves quickly, and so do we. Our streamlined production process and trusted supplier network enable us to deliver projects efficiently without compromising quality or attention to detail.",
  },
  {
    index: "04",
    title: "Transparency & Trust",
    body:
      "Clear communication, honest pricing, and realistic timelines are at the heart of every client relationship. We believe lasting partnerships are built through reliability, accountability, and mutual trust.",
  },
];

const milestones = [
  { year: "2022", event: "Founded in Hamdan Street, Abu Dhabi with a single machine and a small team." },
  { year: "2023", event: "Expanded client base and strengthened production capabilities across Abu Dhabi & the UAE." },
  { year: "2024", event: "Scaled to an 18,000 sq. ft. production facility with advanced machinery and faster workflows." },
  { year: "2025", event: "Launched premium corporate gifting and promotional solutions division." },
  { year: "2026", event: "Opened Salam Street branch in Abu Dhabi, expanded services, and received an Excellence Award." },
];

const team = [
  {
    name: "Navaf Muhammed",
    role: "Business Development Manager",
    imgId: "/images/navaf.jpeg",
    bio: "Focused on building strong client relationships and identifying new business opportunities. Navaf works closely with customers to understand their needs and deliver tailored advertising and printing solutions that help businesses grow.",
  },
  {
    name: "Shihab Anorammal",
    role: "Sales Executive",
    imgId: "/images/shihab.jpeg",
    bio: "Dedicated to providing excellent customer service and guiding clients through every stage of their project. Shihab ensures smooth communication, timely responses, and successful project execution from inquiry to delivery.",
  },
  {
    name: "Rajab Navunda",
    role: "Creative Director",
    imgId: "/images/rajab2.jpg",
    bio: "A passionate creative leader with extensive experience in branding, visual communication, and print production. Rajab oversees design strategy, ensuring every project reflects creativity, quality, and strong brand identity while meeting client expectations.",
  },
  {
    name: "Fayis Muhammed",
    role: "Graphic Designer",
    imgId: "/images/fayis.jpeg",
    bio: "A creative designer specializing in print and digital artwork. Fayis transforms ideas into visually engaging designs, delivering innovative concepts that help brands stand out and communicate effectively.",
  },
  {
    name: "Nufail Muhammed",
    role: "Site Supervisor",
    imgId: "/images/nufail.jpeg",
    bio: "Responsible for managing on-site installations and project coordination. Nufail ensures that every signage, branding, and advertising project is completed safely, efficiently, and to the highest professional standards.",
  },
  {
    name: "Kavya Vinod K",
    role: "Accounts & Finance Executive",
    imgId: "/images/kavya.jpeg",
    bio: "Manages financial operations, invoicing, and account administration with accuracy and efficiency. Kavya plays a key role in maintaining smooth business processes and ensuring excellent financial organization.",
  },
  {
    name: "Usman Navunda",
    role: "Graphics Installer",
    imgId: "/images/usman navunda.jpeg",
    bio: "Specializing in vinyl application, vehicle branding, signage installation, and finishing works, ensuring precision and quality in every project.",
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
      <section className="relative bg-[#3D7B89] pt-28 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto relative z-10">
          <motion.p
            {...fadeUp(0)}
            className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-6 md:mb-8 font-bold text-center md:text-left"
          >
            About 3Dots Advertising
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start items-end text-center md:text-left">
            <motion.div {...fadeUp(0.1)} className="lg:col-span-8">
              <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal leading-[1.05] tracking-tight text-white uppercase">
                Built to Make Brands<br />
                <span className="text-white/60">Impossible to Ignore.</span>
              </h1>
            </motion.div>
            <motion.div {...fadeUp(0.25)} className="lg:col-span-4 text-center md:text-left">
              <div className="text-white/70 text-sm md:text-base leading-relaxed font-normal mx-auto md:mx-0 space-y-4">
                <p>Established in Abu Dhabi in 2022, 3Dots Advertising is a full-service advertising and production company dedicated to transforming ideas into powerful brand experiences. From concept and design to production and installation, we deliver innovative signage, premium printing, exhibition displays, promotional products, custom fabrication, and branding solutions that help businesses stand out in a competitive market.</p>
                <p>Driven by creativity, craftsmanship, and commitment, we combine quality, precision, and speed to bring every project to life—on time, on brand, and beyond expectations.</p>
                <p className="text-white font-bold block uppercase tracking-wider text-xs mt-4">Your Vision. Our Expertise. Exceptional Results.</p>
              </div>
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
                  <Counter value={s.value} />
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
                  src="/images/story section.jpeg"
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
          <motion.div {...fadeUp()} className="mb-20 text-center md:text-left space-y-6 max-w-2xl">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mb-2 font-bold">
              How We Work
            </p>
            <h2 className="text-5xl md:text-6xl font-medium tracking-tight leading-[1.15]">
              <span className="text-[#3D7B89]">Four principles.</span><br />
              <span className="text-gray-400">Non-negotiable.</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Every project we undertake is guided by four core principles that define our standards, shape our process, and ensure exceptional results for every client.
            </p>
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
              <motion.p
                {...fadeUp(milestones.length * 0.08)}
                className="text-xs uppercase tracking-[0.2em] text-[#3D7B89] font-bold mt-12 text-left"
              >
                Built step by step. Trusted project by project. Still just getting started.
              </motion.p>
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
            {team.map((member, i) => (
              <motion.div key={member.name} {...fadeUp(i * 0.12)} className="group">
                <div className="overflow-hidden mb-4 bg-white/5 aspect-[3/4] rounded-sm">
                  <img
                    src={member.imgId}
                    alt={member.name}
                    className="w-full h-full transition-all duration-700 group-hover:scale-105 object-cover object-center"
                  />
                </div>
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/40 mb-1.5 font-bold">
                  {member.role}
                </p>
                <h3 className="text-base sm:text-lg font-medium text-white mb-2 leading-tight">{member.name}</h3>
                <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed">{member.bio}</p>
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
