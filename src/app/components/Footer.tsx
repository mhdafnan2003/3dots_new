import { Link } from "react-router";
import { Phone, Smartphone, Mail, Instagram, MessageCircle, MapPin, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 md:pt-24 pb-12 px-6 md:px-12 border-t border-white/5 relative overflow-hidden">
      {/* Background Subtle Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60"></div>
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-20">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6 flex flex-col items-start text-left">
            <div className="flex items-center justify-start w-full">
              <img 
                src="/images/3Dot.png" 
                alt="3Dot's Advertising" 
                className="h-8 md:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-xs leading-relaxed max-w-sm">
              3Dots Advertising is a full-service printing press and branding company in Abu Dhabi offering corporate gifts, signage, large format printing, and promotional solutions across UAE.
            </p>
            <div className="space-y-2 text-white/50 text-xs pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="shrink-0 text-[#3D7B89] mt-0.5" />
                <span>
                  Salam Street, Near Russian Embassy<br />
                  Al Danah - Zone 1<br />
                  Abu Dhabi City
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex flex-col">
            <div className="bg-[#3D7B89] py-3.5 px-6 text-center font-bold text-xs tracking-[0.2em] uppercase text-white rounded-t-[4px]">
              Services
            </div>
            <div className="border-x border-b border-white/5 bg-white/[0.01] flex-1">
              <ul className="divide-y divide-white/5 text-white/60 text-xs font-semibold">
                <li className="hover:bg-white/[0.02]">
                  <Link to="/services/printing-press-services-abu-dhabi" className="block py-3.5 px-6 hover:text-white transition-all">
                    + Printing Press Services
                  </Link>
                </li>
                <li className="hover:bg-white/[0.02]">
                  <Link to="/services/corporate-gifts-promotional-items-uae" className="block py-3.5 px-6 hover:text-white transition-all">
                    + Corporate Gifts
                  </Link>
                </li>
                <li className="hover:bg-white/[0.02]">
                  <Link to="/services/crystal-awards-mementos-abu-dhabi" className="block py-3.5 px-6 hover:text-white transition-all">
                    + Crystal Awards
                  </Link>
                </li>
                <li className="hover:bg-white/[0.02]">
                  <Link to="/services/signage-large-format-printing-uae" className="block py-3.5 px-6 hover:text-white transition-all">
                    + Signage & Large Format
                  </Link>
                </li>
                <li className="hover:bg-white/[0.02]">
                  <Link to="/services/exhibition-branding-solutions-uae" className="block py-3.5 px-6 hover:text-white transition-all">
                    + Exhibition Branding
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div className="flex flex-col">
            <div className="bg-[#3D7B89] py-3.5 px-6 text-center font-bold text-xs tracking-[0.2em] uppercase text-white rounded-t-[4px]">
              Contact Us
            </div>
            <div className="border-x border-b border-white/5 bg-white/[0.01] flex-1">
              <ul className="divide-y divide-white/5 text-white/60 text-xs font-semibold">
                <li className="flex items-center gap-3 py-3 px-6 hover:bg-white/[0.02]">
                  <Phone size={14} className="text-[#3D7B89] shrink-0" />
                  <a href="tel:+97125175916" className="hover:text-white transition-colors truncate">
                    +971 2 517 5916
                  </a>
                </li>
                <li className="flex items-center gap-3 py-3 px-6 hover:bg-white/[0.02]">
                  <Smartphone size={14} className="text-[#3D7B89] shrink-0" />
                  <a 
                    href="https://wa.me/971563139733" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors truncate"
                  >
                    +971 56 313 9733
                  </a>
                </li>
                <li className="flex items-center gap-3 py-3 px-6 hover:bg-white/[0.02]">
                  <Smartphone size={14} className="text-[#3D7B89] shrink-0" />
                  <a 
                    href="https://wa.me/971563138214" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors truncate"
                  >
                    +971 56 313 8214
                  </a>
                </li>
                <li className="flex items-center gap-3 py-3 px-6 hover:bg-white/[0.02]">
                  <Mail size={14} className="text-[#3D7B89] shrink-0" />
                  <a href="mailto:info@3dotsadv.com" className="hover:text-white transition-colors truncate">
                    info@3dotsadv.com
                  </a>
                </li>
                <li className="flex items-center gap-3 py-3 px-6 hover:bg-white/[0.02]">
                  <Mail size={14} className="text-[#3D7B89] shrink-0" />
                  <a href="mailto:3dotsadv@gmail.com" className="hover:text-white transition-colors truncate">
                    3dotsadv@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4: Working Hours */}
          <div className="flex flex-col">
            <div className="bg-white py-3.5 px-6 text-center font-bold text-xs tracking-[0.2em] uppercase text-black rounded-t-[4px]">
              Working Hours
            </div>
            <div className="border-x border-b border-white/5 bg-white/[0.01] flex-1">
              <ul className="divide-y divide-white/5 text-white/60 text-xs font-semibold">
                <li className="py-3.5 px-6 hover:bg-white/[0.02]">
                  <span className="block text-white/80 font-bold uppercase tracking-wider text-[9px] mb-1">Office Shift</span>
                  9:30 am to 9:30 pm
                </li>
                <li className="py-3.5 px-6 hover:bg-white/[0.02]">
                  <span className="block text-white/80 font-bold uppercase tracking-wider text-[9px] mb-1">Working Days</span>
                  Monday to Sunday
                </li>
                <li className="py-3.5 px-6 hover:bg-white/[0.02]">
                  <span className="block text-white/80 font-bold uppercase tracking-wider text-[9px] mb-1">Status</span>
                  Open 7 Days a Week
                </li>
                <li className="py-3.5 px-6 text-center">
                  <Link to="/contact" className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#3D7B89] hover:underline">
                    Contact Us →
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-white/40 font-bold tracking-wider">
            © {currentYear} 3DOTS ADV. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            {[
              { href: "https://www.instagram.com/3dots_adv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", alt: "Instagram", icon: Instagram },
              { href: "https://wa.me/971563139733?text=Hi%203Dots%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20your%20services.", alt: "WhatsApp", icon: MessageCircle },
              { href: "https://www.facebook.com/share/18jtsojQJV/?mibextid=wwXIfr", alt: "Facebook", icon: Facebook }
            ].map((item, i) => {
              const IconComponent = item.icon;
              return (
                <a 
                  key={i} 
                  href={item.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:border-white hover:text-white hover:bg-white/5 transition-all duration-300"
                  aria-label={item.alt}
                >
                  <IconComponent size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
