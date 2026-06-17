
import { Link } from "react-router";

export function FinalBanner() {
  return (
    <section className="relative w-full h-[200px] sm:h-[300px] md:h-[520px] bg-white overflow-hidden z-0">
      <Link to="/products?category=digital-printing" className="block w-full h-full cursor-pointer">
        <img
          src="/images/yellow.png"
          alt="Print with Purpose"
          className="w-full h-full object-cover"
        />
      </Link>
    </section>
  );
}


