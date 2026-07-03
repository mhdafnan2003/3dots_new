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
    // 1. Fetch settings and products in parallel, store on window
    const fetchSettings = fetch("/api/settings")
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => {
        (window as any).__initialSettings = data;
      })
      .catch(() => {
        (window as any).__initialSettings = {};
      });

    const fetchProducts = fetch("/api/products")
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => {
        (window as any).__initialProducts = data;
      })
      .catch(() => {
        (window as any).__initialProducts = [];
      });

    // 2. Keep the preloader delay exactly 4 seconds (no change)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    Promise.all([fetchSettings, fetchProducts]).then(() => {
      window.dispatchEvent(new CustomEvent("initialDataLoaded"));
    });

    return () => {
      clearTimeout(timer);
    };
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
