import { Facebook } from "lucide-react";

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
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs text-left">
              Precision in every dot. Bringing luxury tactile experiences to the modern brand.
            </p>
            <div className="flex gap-4 justify-start w-full">
              {[
                { src: "/images/instagram_icon.png", href: "https://www.instagram.com/3dots_adv?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==", alt: "Instagram" },
                { src: "/images/Whatsapp_icon.png", href: "https://wa.me/971563139733?text=Hi%203Dots%2C%20I%20would%20like%20to%20make%20an%20inquiry%20regarding%20your%20services.", alt: "WhatsApp" },
                { src: "/images/BE.png", href: "#", alt: "Behance" },
                { icon: Facebook, href: "#", alt: "Facebook" }
              ].map((item, i) => (
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
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Bespoke Packaging</a></li>
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Editorial Design</a></li>
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Brand Identity</a></li>
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Material Sourcing</a></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-8 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Resources</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Print Guide</a></li>
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Process Overview</a></li>
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Sustainability</a></li>
            </ul>
          </div>

          {/* Inquiries Column */}
          <div className="space-y-8 text-left">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-black">Inquiries</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#3D7B89] transition-colors">WhatsApp Inquiry</a></li>
              <li className="pt-2 text-gray-300">Mon - Fri: 9:00 - 18:00</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-gray-400 font-bold tracking-wider">
            © {currentYear} 3DOTS ADV.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] text-gray-400 font-bold tracking-wider hover:text-black transition-colors uppercase">Privacy Policy</a>
            <a href="#" className="text-[10px] text-gray-400 font-bold tracking-wider hover:text-black transition-colors uppercase">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
