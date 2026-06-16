import { Link } from "react-router";

export function PromotionalBanner() {
  return (
    <section className="relative w-full h-[200px] sm:h-[300px] md:h-[447px] bg-white overflow-hidden z-0">
      <Link to="/products?category=outdoor-indoor" className="block w-full h-full cursor-pointer">
        <img
          src="/images/hand.png"
          alt="Promotional Portfolio"
          className="w-full h-full object-cover"
        />
      </Link>
    </section>
  );
}
