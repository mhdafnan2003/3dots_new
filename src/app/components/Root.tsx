import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { AnimatePresence } from "motion/react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import ScrollToTop from "./ScrollToTop";
import Preloader from "./Preloader";

export default function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {loading && <Preloader />}
      </AnimatePresence>
      <ScrollToTop />
      <Navigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
