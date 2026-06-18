import { useState, useEffect } from "react";
import { Hero } from "../components/Hero";
import { ProductSection } from "../components/ProductSection";
import { AboutPreview } from "../components/AboutPreview";
import { AcrylicMiniMe } from "../components/AcrylicMiniMe";
import { BrandingBanner } from "../components/BrandingBanner";
import { PromotionalBanner } from "../components/PromotionalBanner";
import { CTASection } from "../components/CTASection";
import { InstagramPanel, InstagramSection } from "../components/InstagramPanel";
import { motion } from "motion/react";


const subcategoryFallbackImages: Record<string, string> = {
  // Digital & Printing Solutions
  "Business Cards": "/images/business_card_fallback.jpg",
  "Flyers & Brochures": "/images/flyers_brochures_fallback.jpg",
  "Letterheads": "/images/letterheads_fallback.png",
  "Invoice Books": "/images/invoice_books_fallback.jpg",
  "Menu Printing": "/images/menu_printing_fallback.jpg",
  "Sticker Printing": "/images/sticker_printing_fallback.jpg",
  "Poster Printing": "/images/poster_printing_fallback.jpg",
  "Catalogue Printing": "/images/catalogue_printing_fallback.jpg",

  // Screen & Offset Printing
  "T-Shirt Printing": "/images/tshirt_printing_fallback.jpg",
  "Fabric Printing": "/images/fabric_printing_fallback.jpg",
  "PVC Card Printing": "/images/pvc_card_printing_fallback.png",
  "Envelope Printing": "/images/envelope_printing_fallback.jpg",
  "Magazine Printing": "/images/magazine_printing_fallback.jpg",
  "Packaging Printing": "/images/packaging_printing_fallback.jpg",
  "Multi-Color Offset Printing": "/images/multicolor_offset_fallback.jpg",
  "Bulk Printing Services": "/images/bulk_printing_fallback.jpg",

  // Laser Etching & Acrylic Works
  "Acrylic Sign Boards": "/images/acrylic_signboard_fallback.jpg",
  "Acrylic Display Stands": "/images/acrylic_stands_fallback.jpg",
  "Name Plates": "/images/name_plates_fallback.jpg",
  "Laser Cutting": "/images/laser_cutting_fallback.jpg",
  "Laser Engraving": "/images/laser_engraving_fallback.jpg",
  "Acrylic Boxes": "/images/acrylic_boxes_fallback.jpg",
  "LED Acrylic Signs": "/images/led_acrylic_signs_fallback.jpg",
  "Trophy & Award Works": "/images/trophies_fallback.jpg",

  // Outdoor & Indoor Signages
  "Flex Banners": "/images/flex_banners_fallback.jpg",
  "Roll-Up Stands": "/images/rollup_stands_fallback.jpg",
  "3D Sign Boards": "/images/3d_signboards_fallback.jpg",
  "Backlit Signage": "/images/backlit_signage_fallback.jpg",
  "Wayfinding Signs": "/images/wayfinding_fallback.jpg",
  "Vehicle Branding": "/images/vehicle_branding_fallback.jpg",
  "Wall Graphics": "/images/wall_graphics_fallback.jpg",
  "Window Frosting": "/images/window_frosting_fallback.jpg",

  // Customized Corporate Gifts
  "Customized Mugs": "/images/custom_mugs_fallback.jpg",
  "Pen Printing": "/images/pen_printing_fallback.jpg",
  "Corporate Gift Sets": "/images/corporate_gift_sets_fallback.jpg",
  "ID Cards & Lanyards": "/images/id_lanyards_fallback.jpg",
  "Keychains": "/images/keychains_fallback.jpg",
  "Caps Printing": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800",
  "USB Gift Items": "/images/usb_gift_items_fallback.jpg",
  "Promotional Giveaways": "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800"
};

const forceFallbackSubcategories = new Set([
  "Business Cards",
  "Menu Printing",
  "Sticker Printing",
  "Magazine Printing",
  "Acrylic Boxes",
  "LED Acrylic Signs",
  "Flex Banners",
  "Roll-Up Stands",
  "3D Sign Boards",
  "Wayfinding Signs",
  "Customized Mugs",
  "USB Gift Items",
  "T-Shirt Printing"
]);

export default function Home() {
  const [digitalPrinting, setDigitalPrinting] = useState<any[]>([]);
  const [screenOffset, setScreenOffset] = useState<any[]>([]);
  const [laserAcrylic, setLaserAcrylic] = useState<any[]>([]);
  const [corporateGifts, setCorporateGifts] = useState<any[]>([]);
  const [outdoorIndoor, setOutdoorIndoor] = useState<any[]>([]);
  const [instagramDrawerOpen, setInstagramDrawerOpen] = useState(false);
  const [activeReel, setActiveReel] = useState<any | null>(null);
  const [instagramReels, setInstagramReels] = useState<string[]>([
    "video:/uploads/reel4.mp4",
    "video:/uploads/reel3.mp4",
    "video:/uploads/reel 1.mp4",
    "video:/uploads/reel2.mp4"
  ]);

  useEffect(() => {
    fetch("/api/settings")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (data.instagram_reels && Array.isArray(data.instagram_reels)) {
          setInstagramReels(data.instagram_reels);
        }
      })
      .catch(() => {});
    fetch("/api/products")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (Array.isArray(data)) {
          // Precise subcategory lists to filter products into 5 distinct categories
          const digitalPrintingList = [
            "Business Cards", "Flyers & Brochures", "Letterheads", "Invoice Books",
            "Menu Printing", "Sticker Printing", "Poster Printing", "Catalogue Printing"
          ];
          const screenOffsetList = [
            "T-Shirt Printing", "Fabric Printing", "PVC Card Printing", "Envelope Printing",
            "Magazine Printing", "Packaging Printing", "Multi-Color Offset Printing", "Bulk Printing Services"
          ];
          const laserAcrylicList = [
            "Acrylic Sign Boards", "Acrylic Display Stands", "Name Plates", "Laser Cutting",
            "Laser Engraving", "Acrylic Boxes", "LED Acrylic Signs", "Trophy & Award Works"
          ];
          const outdoorIndoorList = [
            "Flex Banners", "Roll-Up Stands", "3D Sign Boards", "Backlit Signage",
            "Wayfinding Signs", "Vehicle Branding", "Wall Graphics", "Window Frosting"
          ];
          const corporateGiftsList = [
            "Customized Mugs", "Pen Printing", "Corporate Gift Sets", "ID Cards & Lanyards",
            "Keychains", "Caps Printing", "USB Gift Items", "Promotional Giveaways"
          ];

          // Helper to get image for subcategory: either force fallback or use first product image
          const getSubImage = (subName: string, category: string, defaultFallbackUrl: string) => {
            if (forceFallbackSubcategories.has(subName)) {
              return subcategoryFallbackImages[subName] || defaultFallbackUrl;
            }
            const dbCategory = (category === "Digital & Printing" || category === "Screen & Offset") ? "printing" :
                               (category === "Laser & Acrylic" || category === "Outdoor & Indoor") ? "signage" : "branding";
            const prod = data.find(p => p.category === dbCategory && p.subcategory === subName && p.image);
            return prod ? prod.image : (subcategoryFallbackImages[subName] || defaultFallbackUrl);
          };

          // 1. Digital & Printing Solutions
          const digitalPrintingFiltered = digitalPrintingList.map(subName => {
            const img = getSubImage(subName, "Digital & Printing", "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800");
            return {
              title: subName,
              category: "Digital & Printing",
              image: img,
              linkTo: `/products?subcategory=${encodeURIComponent(subName)}`
            };
          });

          // 2. Screen & Offset Printing
          const screenOffsetFiltered = screenOffsetList.map(subName => {
            const img = getSubImage(subName, "Screen & Offset", "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800");
            return {
              title: subName,
              category: "Screen & Offset",
              image: img,
              linkTo: `/products?subcategory=${encodeURIComponent(subName)}`
            };
          });

          // 3. Laser Etching & Acrylic Works
          const laserAcrylicFiltered = laserAcrylicList.map(subName => {
            const img = getSubImage(subName, "Laser & Acrylic", "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800");
            return {
              title: subName,
              category: "Laser & Acrylic",
              image: img,
              linkTo: `/products?subcategory=${encodeURIComponent(subName)}`
            };
          });

          // 4. Customized Corporate Gifts
          const corporateGiftsFiltered = corporateGiftsList.map(subName => {
            const img = getSubImage(subName, "Corporate Gifts", "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800");
            return {
              title: subName,
              category: "Corporate Gifts",
              image: img,
              linkTo: `/products?subcategory=${encodeURIComponent(subName)}`
            };
          });

          // 5. Outdoor & Indoor Signages
          const outdoorIndoorFiltered = outdoorIndoorList.map(subName => {
            const img = getSubImage(subName, "Outdoor & Indoor", "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800");
            return {
              title: subName,
              category: "Outdoor & Indoor",
              image: img,
              linkTo: `/products?subcategory=${encodeURIComponent(subName)}`
            };
          });

          setDigitalPrinting(digitalPrintingFiltered);
          setScreenOffset(screenOffsetFiltered);
          setLaserAcrylic(laserAcrylicFiltered);
          setCorporateGifts(corporateGiftsFiltered);
          setOutdoorIndoor(outdoorIndoorFiltered);
        }
      })
      .catch(err => console.warn("Failed to fetch products for Home page", err));
  }, []);

  return (
    <div className="bg-white selection:bg-black selection:text-white">
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {digitalPrinting.length > 0 && (
          <ProductSection 
            title="Digital & Printing Solutions" 
            products={digitalPrinting} 
            categoryKey="digital-printing"
            bgColor="bg-white"
          />
        )}
        
        <AboutPreview />
        
        {screenOffset.length > 0 && (
          <ProductSection 
            title="Screen & Offset Printing" 
            products={screenOffset} 
            categoryKey="screen-offset"
            bgColor="bg-white"
          />
        )}
        
        <AcrylicMiniMe />
        
        {laserAcrylic.length > 0 && (
          <ProductSection 
            title="Laser Etching & Acrylic Works" 
            products={laserAcrylic} 
            categoryKey="laser-acrylic"
            bgColor="bg-gray-50"
          />
        )}
        
        {outdoorIndoor.length > 0 && (
          <div className="relative bg-white z-0">
            <PromotionalBanner />
            <ProductSection 
              title="Outdoor & Indoor Signages" 
              products={outdoorIndoor} 
              categoryKey="outdoor-indoor"
              bgColor="bg-white"
            />
          </div>
        )}

        {corporateGifts.length > 0 && (
          <div className="relative bg-gray-50 z-0">
            <BrandingBanner />
            <ProductSection 
              title="Customized & Corporate Gifts" 
              products={corporateGifts} 
              transparent={true}
              className="-mt-12 md:-mt-20"
              categoryKey="corporate-gifts"
            />
          </div>
        )}

        <InstagramSection 
          instagramReels={instagramReels}
          onOpenDrawer={() => setInstagramDrawerOpen(true)} 
          onPlayReel={(reel) => setActiveReel(reel)}
        />
        
        <CTASection />
      </motion.div>
      <InstagramPanel 
        instagramReels={instagramReels}
        isOpen={instagramDrawerOpen} 
        onClose={() => setInstagramDrawerOpen(false)} 
        activeReel={activeReel}
        setActiveReel={setActiveReel}
      />
    </div>
  );
}
