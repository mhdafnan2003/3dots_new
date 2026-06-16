import { Link } from "react-router";

export function BrandingBanner() {
  return (
    <section className="relative w-full h-[200px] sm:h-[300px] md:h-[520px] bg-white overflow-hidden z-0">
      <Link to="/products?category=corporate-gifts" className="block w-full h-full cursor-pointer">
        <img
          src="/images/yellow.png"
          alt="Branding Portfolio"
          className="w-full h-full object-cover"
        />
      </Link>
    </section>
  );
}
