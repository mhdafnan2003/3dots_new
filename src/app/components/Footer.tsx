import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-8 md:pt-24 pb-12 px-6 md:px-12 border-t border-gray-100">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="space-y-8 flex flex-col items-start text-left">
            <div className="flex items-center justify-start w-full">
              <img 
                src="/images/3Dotfooter.png" 
                alt="3Dot's Advertising" 
                className="h-8 md:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm text-left">
              3Dots Advertising is a Printing Press in Abu Dhabi specializing in corporate gifts, crystal awards, signage, and branding solutions across UAE including Dubai, Sharjah, Ajman, Alain and Abu Dhabi.
            </p>
            <div className="flex gap-4 justify-start w-full">
              {[
                { src: "/images/instagram_icon.png", href: "https://www.instagram.com/3dots_adv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", alt: "Instagram" },
                { src: "/images/Whatsapp_icon.png", href: "https://wa.me/971562599155?text=Hi%203Dots%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20your%20services.", alt: "WhatsApp" }
              ].map((item: { src: string; href: string; alt: string; icon?: any }, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-[#3D7B89] hover:bg-[#3D7B89] hover:scale-105 transition-all duration-300 group"
                >
                  {item.icon ? (
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-all duration-300" />
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-5 h-5 object-contain brightness-50 group-hover:brightness-0 group-hover:invert transition-all" 
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-8 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li><Link to="/services/printing-press-services-abu-dhabi" className="hover:text-[#3D7B89] transition-colors">Printing Press Services</Link></li>
              <li><Link to="/services/corporate-gifts-promotional-items-uae" className="hover:text-[#3D7B89] transition-colors">Corporate Gifts</Link></li>
              <li><Link to="/services/crystal-awards-mementos-abu-dhabi" className="hover:text-[#3D7B89] transition-colors">Crystal Awards</Link></li>
              <li><Link to="/services/signage-large-format-printing-uae" className="hover:text-[#3D7B89] transition-colors">Signage & Large Format</Link></li>
              <li><Link to="/services/exhibition-branding-solutions-uae" className="hover:text-[#3D7B89] transition-colors">Exhibition Branding</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-8 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Contact</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px] block mb-1">Office Phone</span>
                <a href="tel:+97125175916" className="hover:text-[#3D7B89] transition-colors block">+971 2 517 5916</a>
                <a href="tel:+971562599155" className="hover:text-[#3D7B89] transition-colors block">+971 56 259 9155</a>
              </li>
              <li>
                <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px] block mb-1">Email</span>
                <a href="mailto:info@3dotsadv.com" className="hover:text-[#3D7B89] transition-colors block">info@3dotsadv.com</a>
                <a href="mailto:3dotsadv@gmail.com" className="hover:text-[#3D7B89] transition-colors block">3dotsadv@gmail.com</a>
              </li>
            </ul>
          </div>

          {/* Timing Column */}
          <div className="space-y-8 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Shop Timings</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li>
                <span className="text-gray-500 font-bold uppercase tracking-wider text-[10px] block mb-1">Working Hours</span>
                <span className="text-[#0A0A0A] block">Monday to Sunday</span>
                <span className="text-[#0A0A0A] block text-xs">9:30am to 9:30pm</span>
              </li>
              <li className="pt-2">
                <Link to="/contact" className="text-xs font-bold uppercase tracking-[0.1em] text-[#3D7B89] hover:underline">
                  Contact Us →
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 font-bold tracking-wider">
            © {currentYear} 3DOTS ADV.
          </p>
        </div>
      </div>
    </footer>
  );
}
