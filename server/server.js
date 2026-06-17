const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const os = require('os');
const serverEnvPath = path.join(__dirname, '.env');
const rootEnvPath = path.join(__dirname, '../.env');
if (fs.existsSync(serverEnvPath)) {
  require('dotenv').config({ path: serverEnvPath });
} else {
  require('dotenv').config({ path: rootEnvPath });
}
const cloudinary = require('cloudinary').v2;

const Product = require('./models/Product');
const Portfolio = require('./models/Portfolio');
const Settings = require('./models/Settings');

const app = express();
const PORT = process.env.PORT || 5000;

// Cloudinary config
const cloudinaryEnabled = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (cloudinaryEnabled) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('✅ Cloudinary initialized successfully.');
} else {
  console.warn('⚠️ Cloudinary environment variables missing. Defaulting to local uploads.');
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection middleware for APIs
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api')) {
    try {
      await connectDB();
      next();
    } catch (err) {
      console.error('Database connection middleware error:', err);
      return res.status(500).json({ error: 'Database connection failed: ' + err.message });
    }
  } else {
    next();
  }
});

// ================= LOCAL JSON DATABASE ENGINE (FAIL-SAFE FALLBACK) =================
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial seed data structure for local JSON database
const defaultJSONDb = {
  settings: { hero_bg: '/images/hero-bg.png' },
  products: [
    {
      _id: "prod_1",
      title: "Satin Premium Business Cards",
      titleLine2: "Spot UV & Gold Foil",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800"],
      category: "printing",
      subcategory: "Business Cards",
      year: "2026",
      client: "Emaar Properties PJSC",
      description: "Superb spot UV and gold foil stamped business cards presenting a smooth satin touch and crisp precision vector printing.",
      specMaterial: "450 GSM Premium Velvet Cardstock",
      specFinishing: "Matte Lamination & Spot UV & Hot Gold Foil",
      specProduction: "Heidelberg Offset Printing",
      specFacility: "Dubai Production Hub",
      specs: [
        { "label": "Material", "value": "450 GSM Velvet Stock" },
        { "label": "Finishing", "value": "Spot UV & Gold Foil" },
        { "label": "Facility", "value": "Dubai Hub" }
      ],
      features: [
        "Unmatched luxury texture and sensory feel",
        "Deep metallic shine from high-quality hot gold foil",
        "Extra-thick professional heft with velvet laminating"
      ]
    },
    {
      _id: "prod_2",
      title: "Al Futtaim Annual Report",
      titleLine2: "Perfect Bound Brochure",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800"],
      category: "printing",
      subcategory: "Flyers & Brochures",
      year: "2026",
      client: "Al Futtaim Group",
      description: "Sleek perfect-bound brochures designed with thick textured covers, rich inner spreads, and custom matte coating.",
      specMaterial: "Cover: 300 GSM Textured; Inner: 150 GSM Matte",
      specFinishing: "Perfect Spine Binding & Matte Coated Cover",
      specProduction: "Digital Offset Press",
      specFacility: "Al Qouz Offset Plant",
      specs: [
        { "label": "Cover Stock", "value": "300 GSM Art Card" },
        { "label": "Binding", "value": "Perfect Bound Spine" },
        { "label": "Page Count", "value": "64 Full-Color Pages" }
      ],
      features: [
        "Seamless perfect bound spine for executive feel",
        "Vibrant, accurate brand color consistency",
        "Ultra-crisp typography rendering"
      ]
    },
    {
      _id: "prod_3",
      title: "The Ritz-Carlton Dining Menu",
      titleLine2: "Leather-Bound Fine Print",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800"],
      category: "printing",
      subcategory: "Menu Printing",
      year: "2026",
      client: "The Ritz-Carlton JBR",
      description: "Water-resistant luxury menu booklets featuring premium leather stitching, warm debossed accents, and gold metal corners.",
      specMaterial: "Premium Faux Leather Wrap & 250 GSM Synthetic Inner",
      specFinishing: "Hand-stitched Edges & Gold Metal Corners",
      specProduction: "High-Definition Digital Press",
      specFacility: "Fine Press Atelier Dubai",
      specs: [
        { "label": "Material", "value": "Genuine Premium Faux Leather" },
        { "label": "Edges", "value": "Stitched Borders & Gold Guards" },
        { "label": "Protection", "value": "Waterproof Clear-Coat Overlays" }
      ],
      features: [
        "Water and stain resistant pages for dining longevity",
        "Tactile leather texture that exudes luxurious hospitality",
        "Easily swappable internal screw-post mechanism"
      ]
    },
    {
      _id: "prod_4",
      title: "Holographic Brand Label Suite",
      titleLine2: "Die-Cut Vinyl Stickers",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800"],
      category: "printing",
      subcategory: "Sticker Printing",
      year: "2026",
      client: "Natura Cosmetics UAE",
      description: "Waterproof vinyl labels with eye-catching holographic reflection patterns, precise custom die-cutting, and permanent adhesive backing.",
      specMaterial: "Premium Holographic Pet Vinyl",
      specFinishing: "Anti-UV Gloss Lamination & Precise Custom Die-cut",
      specProduction: "UV Inkjet Rotary Printing",
      specFacility: "Label Craft Dubai",
      specs: [
        { "label": "Material", "value": "120 Micron Holographic Vinyl" },
        { "label": "Adhesive", "value": "Permanent Ultra-Tack Acrylic" },
        { "label": "Lamination", "value": "Outdoor Rated Gloss UV Guard" }
      ],
      features: [
        "Rainbow holographic sheen shifting under sunlight",
        "Water, chemical, and scratch proof execution",
        "Precision laser die-cutting matches custom contours"
      ]
    },
    {
      _id: "prod_5",
      title: "Premium Branded Cotton Wear",
      titleLine2: "Water-Based Screen Print",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800"],
      category: "printing",
      subcategory: "T-Shirt Printing",
      year: "2025",
      client: "Nike Middle East Office",
      description: "Premium combed-cotton shirts featuring soft-hand water-based ink print that breathes perfectly and stands up to hundreds of washes.",
      specMaterial: "100% Organic Combed Cotton 220 GSM",
      specFinishing: "Pre-shrunk, Silicone Washed Soft Finish",
      specProduction: "Manual Carousel Screen Printing",
      specFacility: "Apparel Factory Sharjah",
      specs: [
        { "label": "Fabric Weight", "value": "220 GSM Premium Cotton" },
        { "label": "Ink Type", "value": "Eco-Friendly Water-Based Ink" },
        { "label": "Wash Durability", "value": "Tested up to 100 industrial washes" }
      ],
      features: [
        "Ultra soft ink integration (zero plastic feel)",
        "Premium heavy combed cotton providing retail drape",
        "Certified organic fabric with non-toxic color pigments"
      ]
    },
    {
      _id: "prod_6",
      title: "Luxury Perfume Box Suite",
      titleLine2: "Debossed Cardboard Box",
      image: "https://images.unsplash.com/photo-1580680849668-45d32df32e67?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1580680849668-45d32df32e67?q=80&w=800"],
      category: "printing",
      subcategory: "Packaging Printing",
      year: "2026",
      client: "Oud & Musk Perfumeries",
      description: "Bespoke high-rigidity cosmetic gift packaging showing deep debossed floral lettering, elegant magnetic closures, and velvet lining.",
      specMaterial: "1200 GSM Heavy Greyboard & 150 GSM Linen Face Paper",
      specFinishing: "Deep Debossing & Matte Metallic Foil Stamping",
      specProduction: "Semi-Automatic Packaging Line",
      specFacility: "Luxury Pack Sharjah",
      specs: [
        { "label": "Core Material", "value": "1200 GSM Premium Rigid Greyboard" },
        { "label": "Lining", "value": "Black High-Density Velvet Insert" },
        { "label": "Lock System", "value": "Dual Hidden Neodymium Magnets" }
      ],
      features: [
        "Heavyweight, structural feel built for luxury products",
        "Deep tactile debossing creates custom visual depth",
        "Precise laser-cut foam insert holds bottles securely"
      ]
    },
    {
      _id: "prod_7",
      title: "Matte-Finished Fashion Digest",
      titleLine2: "High-Volume Catalog Print",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800"],
      category: "printing",
      subcategory: "Magazine Printing",
      year: "2026",
      client: "Vogue Arabia Agency",
      description: "High-grade offset catalog featuring vibrant high-fidelity color matching, premium matte coated paper stock, and durable spine bindings.",
      specMaterial: "170 GSM Matte-Coated Internal Pages & 350 GSM Cover",
      specFinishing: "Anti-glare Matte Coating & Soft Touch Cover",
      specProduction: "Speedmaster Offset Press",
      specFacility: "Dubai Media City Press",
      specs: [
        { "label": "Paper Class", "value": "Premium Triple-Coated Matte Art Paper" },
        { "label": "Ink Tech", "value": "Offset Litho CMYK + Spot Pantone" },
        { "label": "Binding", "value": "Durable PUR Adhesive Bound" }
      ],
      features: [
        "Flawless color matching representing real fabrics",
        "Silky anti-glare finish allows premium readability",
        "Very high-volume capacity with extreme quality assurance"
      ]
    },
    {
      _id: "prod_8",
      title: "Textured Corporate Envelopes",
      titleLine2: "Premium Hot Stamp Envelope",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"],
      category: "printing",
      subcategory: "Envelope Printing",
      year: "2026",
      client: "Dubai Islamic Bank",
      description: "Fine linen textured executive envelopes decorated with elegant silver-foil stamped logos, window cut-outs, and peel-and-seal strips.",
      specMaterial: "120 GSM Pure Linen Fine Paper Stock",
      specFinishing: "Metallic Silver Foil Stamp & Crystal-Clear Window",
      specProduction: "Envelope Converting Machinery",
      specFacility: "Classic Mail Dubai",
      specs: [
        { "label": "Paper Type", "value": "120 GSM Linen-Textured Off-White" },
        { "label": "Foil Mark", "value": "Silver Foil Thermal Press" },
        { "label": "Seal Type", "value": "Premium Peel & Seal Tape" }
      ],
      features: [
        "Rich hand-feel texture conveying high prestige",
        "High opacity stock hides confidential content",
        "Standard DL size matches professional letterheads"
      ]
    },
    {
      _id: "prod_9",
      title: "Edge-Lit Acrylic Logo Panel",
      titleLine2: "Laser Cut & Engraved LED",
      image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800"],
      category: "signage",
      subcategory: "LED Acrylic Signs",
      year: "2026",
      client: "Nakheel Mall Recess",
      description: "A futuristic custom-shaped edge-lit sign combining precision CNC laser etching with high-efficiency RGB LED controllers for vibrant mood lighting.",
      specMaterial: "10mm Optically Pure Cast Acrylic Panel & Walnut Wood Base",
      specFinishing: "Diamond Polished Edges & Fine Line Engraving",
      specProduction: "Precision CO2 Laser Cutting & CNC Etch",
      specFacility: "3Dots Signage Labs",
      specs: [
        { "label": "Acrylic Type", "value": "10mm Grade-A Cast PMMA" },
        { "label": "Illumination", "value": "Edge-Lit OSRAM RGB LEDs" },
        { "label": "Controller", "value": "Smart WiFi App Integration" }
      ],
      features: [
        "Engraved vectors glow brilliantly while panel stays clear",
        "Solid timber base provides stability and modern design",
        "Energy efficient low-voltage power supply"
      ]
    },
    {
      _id: "prod_10",
      title: "Premium Retail Acrylic Podiums",
      titleLine2: "Diamond Polished Finish",
      image: "https://images.unsplash.com/photo-1695048168808-4bbfa1efdfa7?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1695048168808-4bbfa1efdfa7?q=80&w=800"],
      category: "signage",
      subcategory: "Acrylic Display Stands",
      year: "2026",
      client: "Samsung Flagship Store",
      description: "Highly durable showcase pillars hand-polished to diamond clarity, perfectly balanced to exhibit luxury electronics and accessories.",
      specMaterial: "15mm & 20mm High-Strength Clear Acrylic Boards",
      specFinishing: "Diamond Buffing & Solvent Weld Jointing",
      specProduction: "Heavy CNC Router Cutting & Manual Polishing",
      specFacility: "Acrylic Fab Atelier Dubai",
      specs: [
        { "label": "Material Thickness", "value": "20mm Structural Acrylic Plates" },
        { "label": "Joint Tech", "value": "Zero-Bubble UV Adhesives" },
        { "label": "Base Detail", "value": "Heavyweighted Satin Black Acrylic Plinth" }
      ],
      features: [
        "Unbelievable crystal clarity mimicking glass without the weight",
        "Virtually indestructible chemical welding seams",
        "Includes internal cable routing slots for display electronics"
      ]
    },
    {
      _id: "prod_11",
      title: "Engraved Wooden Corporate Award",
      titleLine2: "Laser Burn & Brass Accent",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800"],
      category: "signage",
      subcategory: "Trophy & Award Works",
      year: "2026",
      client: "Gulf Business Awards",
      description: "Luxury solid walnut base paired with custom cut brass plaque, showcasing precision micro-engraving and smooth oil finishing.",
      specMaterial: "American Walnut Wood & Satin Gold Brass Shield",
      specFinishing: "Organic Wax Oil Rubbing & Laser Metal Etching",
      specProduction: "Laser Marking & Artisan Wood Working",
      specFacility: "3Dots Gift Refinery",
      specs: [
        { "label": "Wood Base", "value": "Solid Aged American Walnut" },
        { "label": "Metal Shield", "value": "0.8mm Brushed Brass Plate" },
        { "label": "Detailing", "value": "Ultra-Fine 1000 DPI Laser Mark" }
      ],
      features: [
        "Heavy solid wood base with beautiful natural graining",
        "High-contrast permanent laser marking",
        "Individually hand-sanded and polished for a custom premium touch"
      ]
    },
    {
      _id: "prod_12",
      title: "Museum-Grade Acrylic Cases",
      titleLine2: "UV-Resistant Protective Box",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800"],
      category: "signage",
      subcategory: "Acrylic Boxes",
      year: "2026",
      client: "Louvre Abu Dhabi Exhibitions",
      description: "Optically clear, shatter-resistant acrylic showcase boxes, bonded seamlessly with custom solvent welding to ensure absolute dust-proofing.",
      specMaterial: "6mm Plexiglas® Gallery UV-Block Acrylic",
      specFinishing: "Mitered Jointing & Beveled Clear Seams",
      specProduction: "Precision Table-Saw & Hand-Fused Chemistry",
      specFacility: "Exhibit Specialties Dubai",
      specs: [
        { "label": "Acrylic Brand", "value": "Evonik Plexiglas® UV99" },
        { "label": "Joint Method", "value": "45-Degree Mitered Solvent Bonding" },
        { "label": "Base Seal", "value": "Silicone Gasket Dust Protection" }
      ],
      features: [
        "Blocks 99% of harmful UV rays to protect delicate artifacts",
        "Perfect 90-degree corner joints with zero visible glue run",
        "Includes reinforced structure for high-traffic environments"
      ]
    },
    {
      _id: "prod_13",
      title: "3D Steel Channel Signage",
      titleLine2: "Emirates NBD Building Facade",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800"],
      category: "signage",
      subcategory: "3D Sign Boards",
      year: "2025",
      client: "Emirates NBD HQ",
      description: "Massive outdoor architectural building letters manufactured from weather-proof marine steel, backlit with energy-efficient modules.",
      specMaterial: "316 Marine Grade Stainless Steel & Acrylic Face Diffusers",
      specFinishing: "Electroplated Gold Titanium Finish & Backlit LED Glow",
      specProduction: "Laser Sheet Cutting & Manual Channel Weld",
      specFacility: "Large Signs Heavy Fab",
      specs: [
        { "label": "Steel Class", "value": "316 Outdoor Anti-Corrosive Stainless Steel" },
        { "label": "Illumination", "value": "Samsung IP68 Waterproof LED Modules" },
        { "label": "Mounting", "value": "Heavy-Duty Expansion Anchor Bolts" }
      ],
      features: [
        "Engineered to withstand extreme Gulf summer temperatures",
        "Titanium electroplating ensures no fading for 10+ years",
        "Stunning ambient rear-halo illumination effect"
      ]
    },
    {
      _id: "prod_14",
      title: "Wayfinding Glass Signage",
      titleLine2: "Dubai City Walk Center",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?q=80&w=800"],
      category: "signage",
      subcategory: "Wayfinding Signs",
      year: "2025",
      client: "Dubai City Walk Hub",
      description: "Frosted-glass directional panels paired with sleek minimalist aluminum fixtures, ensuring intuitive and elegant guest navigation.",
      specMaterial: "12mm Tempered Safety Glass & Anodized Aluminum Fixings",
      specFinishing: "Satin Acid Etching & Ceramic Color Screen Print",
      specProduction: "Glass Tempering & Precision Hardware Milling",
      specFacility: "Interior Signs Dubai",
      specs: [
        { "label": "Glass Grade", "value": "12mm High-Iron Toughened Glass" },
        { "label": "Text Tech", "value": "Scratch-Proof Fused Glass Ceramic Inks" },
        { "label": "Clamps", "value": "Brushed Silver Anodized Aluminum Pegs" }
      ],
      features: [
        "Clean, elegant transparency that integrates with modern lobbies",
        "Tempered safety glass provides high impact resistance",
        "Extremely easy to clean and sanitize without wear"
      ]
    },
    {
      _id: "prod_15",
      title: "Large-Format Building Banner",
      titleLine2: "Heavy-Duty Vinyl Backdrop",
      image: "https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1516216628859-9bccecab13ca?q=80&w=800"],
      category: "signage",
      subcategory: "Flex Banners",
      year: "2026",
      client: "Expo City Dubai Events",
      description: "UV-resistant windproof blockout flex banner featuring vivid high-density outdoor inks and heavy brass eyelets for large-scale outdoor displays.",
      specMaterial: "680 GSM Premium Mesh Blockout Flex Vinyl",
      specFinishing: "Double Welded Hems & Reinforced Corner Patches",
      specProduction: "5-Meter Superwide Solvent Printer",
      specFacility: "Expo Print Station Dubai",
      specs: [
        { "label": "Weight class", "value": "680 GSM Ultra-Tough Scrim Vinyl" },
        { "label": "Ink System", "value": "UV-Curable Pigments (Fade Resistant)" },
        { "label": "Grommets", "value": "Nickel-plated Solid Brass Eyelets every 50cm" }
      ],
      features: [
        "100% blockout center layer prevents background light bleedthrough",
        "Woven fabric core provides extreme wind load tear resistance",
        "Gigantic seamless width options available up to 5 meters"
      ]
    },
    {
      _id: "prod_16",
      title: "Sleek Exhibition Roll-Up Stand",
      titleLine2: "Anodized Aluminum Cassette",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800"],
      category: "signage",
      subcategory: "Roll-Up Stands",
      year: "2026",
      client: "GITEX Technology Pavilion",
      description: "Premium teardrop-base retractor banners showing matte scratch-free graphics, self-tensioning springs, and custom canvas transport covers.",
      specMaterial: "Heavy Chrome-plated Teardrop Base & 200 Micron Matte PET film",
      specFinishing: "Anti-Curl Lamination & Silver Metallic Sides",
      specProduction: "1440 DPI Eco-Solvent Fine Art Print",
      specFacility: "Digital Expo Hub Dubai",
      specs: [
        { "label": "Base Material", "value": "Cast Anodized Aluminum with Chrome End-caps" },
        { "label": "Media Film", "value": "200 Micron No-curl Anti-glare Polyester" },
        { "label": "Transport Bag", "value": "Dual-Layer Padded Oxford Carry Case" }
      ],
      features: [
        "Luxurious teardrop design without protruding swing-out feet",
        "Perfect flat-lay material avoids curling at visual boundaries",
        "Durable internal spring ensures tight, smooth rollups every time"
      ]
    },
    {
      _id: "prod_17",
      title: "Luxury Executive Welcome Set",
      titleLine2: "Debossed Leather Set",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800"],
      category: "branding",
      subcategory: "Corporate Gift Sets",
      year: "2026",
      client: "Jumeirah Luxury Resorts",
      description: "Exquisite client onboarding chests containing genuine textured leather organizers, steel thermo-flasks, and custom engraved rollerballs.",
      specMaterial: "Saffiano Genuine Leather & Premium Double-Wall Steel",
      specFinishing: "Gold Foil Hot Debossing & Satin Inner Lining",
      specProduction: "Handcrafted Box Construction & Laser Engraving",
      specFacility: "3Dots Gift Refinery",
      specs: [
        { "label": "Box Core", "value": "Custom Rigid Board with Leatherette Cover" },
        { "label": "Flask Tech", "value": "500ml Vacuum Insulated Copper Core Steel" },
        { "label": "Organizer", "value": "A5 Saffiano Leather Refillable Notebook" }
      ],
      features: [
        "Beautifully color-coordinated luxury components",
        "Custom hot stamp foil debossing creates elegant relief mark",
        "Prestige gift packaging raises corporate brand value"
      ]
    },
    {
      _id: "prod_18",
      title: "Matte Ceramic Laser Mugs",
      titleLine2: "Dual-Tone Insulated Cup",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800"],
      category: "branding",
      subcategory: "Customized Mugs",
      year: "2026",
      client: "Starbucks Partner UAE",
      description: "Double-walled ceramic travel tumblers featuring matte black powder coating, splash-resistant lids, and subtle silver laser-engraved logos.",
      specMaterial: "Fine Stoneware Ceramic & Recycled Polycarbonate Lids",
      specFinishing: "Matte Satin Baked Glaze & Laser Coating Ablation",
      specProduction: "Rotary YAG Laser Marking",
      specFacility: "3Dots Gift Refinery",
      specs: [
        { "label": "Material", "value": "High-fired Stoneware Ceramic" },
        { "label": "Exterior", "value": "Velvet-Touch Matte Black Coating" },
        { "label": "Capacity", "value": "380 ml Comfort Grip size" }
      ],
      features: [
        "Double walls protect hands from hot tea or coffee",
        "Laser ablation creates extremely fine, metallic silver detail",
        "Dishwasher-safe and scratch-resistant industrial glaze"
      ]
    },
    {
      _id: "prod_19",
      title: "Matte Black Engraved Pen",
      titleLine2: "Precision Laser Mark",
      image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800"],
      category: "branding",
      subcategory: "Pen Printing",
      year: "2026",
      client: "Majid Al Futtaim Group",
      description: "Ergonomically weighted brass writing instruments adorned with gold-plated accents and high-contrast precision fiber laser engraving.",
      specMaterial: "Weighted Solid Brass Body & Gold-Plated Trim",
      specFinishing: "Electroplated Matte Black Shell & Gold Laser Mark",
      specProduction: "High-Speed Fiber Laser Etching",
      specFacility: "Fine Pen Workshop Dubai",
      specs: [
        { "label": "Pen Weight", "value": "32g Balanced Professional Hand" },
        { "label": "Ink Cartridge", "value": "Schmidt Liquid Ink Ballpoint (Germany)" },
        { "label": "Marking Type", "value": "Under-surface Brass Exposure Gold Glow" }
      ],
      features: [
        "Unbelievable precision laser lines that never fade or rub off",
        "Perfect ergonomic balance avoids hand strain during contracts",
        "Delivered in custom magnetic black gift sheath"
      ]
    },
    {
      _id: "prod_20",
      title: "Swivel Wooden USB Presentation",
      titleLine2: "Maple wood with Engraving",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800",
      images: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"],
      category: "branding",
      subcategory: "USB Gift Items",
      year: "2026",
      client: "Dubai Opera Media Suite",
      description: "Bespoke polished maple timber USB flash memories nestled in matching magnetic wood cases, perfect for executive multimedia sharing.",
      specMaterial: "Sustainable Harvested Soft Maple Wood",
      specFinishing: "Smooth Sanding & Tung Oil Treatment",
      specProduction: "CNC Wood Shaping & Precision Fiber Laser Burn",
      specFacility: "Artisan Wood Lab Sharjah",
      specs: [
        { "label": "Wood Species", "value": "100% Sustainably Sourced Maple Wood" },
        { "label": "Storage Chip", "value": "64GB High-Speed USB 3.0 Samsung Flash" },
        { "label": "Closure", "value": "Hidden Micro-magnets on Cap and Box" }
      ],
      features: [
        "Organic woody aroma and sensory appeal",
        "High-speed reading/writing suitable for corporate files and videos",
        "Matching solid wood storage boxes printed with executive branding"
      ]
    }
  ],
  portfolio: [
    {
      _id: "port_1",
      title: "Corporate Brochure offset",
      category: "Printing",
      client: "Al Futtaim Group",
      year: "2026",
      image: "/images/Image (Corporate Brochure Suite — Offset).png"
    },
    {
      _id: "port_2",
      title: "Outdoor signage Block",
      category: "Signage",
      client: "GITEX Technology Week",
      year: "2025",
      image: "/images/outdoor.png"
    },
    {
      _id: "port_3",
      title: "Indoor signage Block",
      category: "Signage",
      client: "Expo City Dubai",
      year: "2025",
      image: "/images/indoor.png"
    },
    {
      _id: "port_4",
      title: "Promotional merchandise",
      category: "Promotional",
      client: "Majid Al Futtaim",
      year: "2025",
      image: "/images/promo.png"
    }
  ]
};

function readLocalDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultJSONDb, null, 2));
    return defaultJSONDb;
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return defaultJSONDb;
  }
}

function writeLocalDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Global active database state toggle and connection flags
let useLocalJSON = true;
let isConnected = false;
let isConnecting = false;
let connectionPromise = null;
let seededAndMigrated = false;

async function connectDB() {
  // If already connected, ensure useLocalJSON is false and return
  if (isConnected && mongoose.connection.readyState >= 1) {
    useLocalJSON = false;
    return;
  }

  // If already connecting, await the existing connection promise
  if (isConnecting && connectionPromise) {
    await connectionPromise;
    return;
  }

  // If connection is already open via mongoose
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    useLocalJSON = false;
    if (!seededAndMigrated) {
      seededAndMigrated = true;
      await seedDatabase().catch(err => console.error('Seeding error:', err));
      await migrateSeedImagesToCloudinary().catch(err => console.error('Migration error:', err));
    }
    return;
  }

  // Start new connection attempt
  isConnecting = true;
  connectionPromise = (async () => {
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
      if (isProduction) {
        throw new Error('MONGODB_URI environment variable is missing in production environment.');
      }
      console.warn('⚠️ MONGODB_URI not set. Falling back to local JSON database engine.');
      useLocalJSON = true;
      readLocalDB(); // Initialize local file if not present
      await migrateSeedImagesToCloudinary().catch(err => console.error('Migration error:', err));
      isConnected = true;
      isConnecting = false;
      return;
    }

    try {
      console.log('🔄 Connecting to MongoDB...');
      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000 // 5 seconds timeout before throwing error
      });
      isConnected = true;
      useLocalJSON = false;
      console.log('✅ Successfully connected to MongoDB.');

      if (!seededAndMigrated) {
        seededAndMigrated = true;
        await seedDatabase();
        await migrateSeedImagesToCloudinary();
      }
    } catch (err) {
      console.error('❌ MongoDB connection failed:', err.message);
      if (isProduction) {
        // In production, we MUST fail the request instead of silently fallbacking to read-only local JSON
        throw err;
      } else {
        console.warn('⚠️ MongoDB not running locally. Seamlessly activated local JSON database engine.');
        useLocalJSON = true;
        readLocalDB(); // Initialize local file if not present
        await migrateSeedImagesToCloudinary().catch(e => console.error('Migration error:', e));
        isConnected = true; // Mark as "connected" (initialized) for JSON fallback
      }
    } finally {
      isConnecting = false;
      connectionPromise = null;
    }
  })();

  await connectionPromise;
}

// Seed Database helper for MongoDB
async function seedDatabase() {
  try {
    // 1. Seed Background Image Setting
    const bgSetting = await Settings.findOne({ key: 'hero_bg' });
    if (!bgSetting) {
      await Settings.create({
        key: 'hero_bg',
        value: '/images/hero-bg.png'
      });
      console.log('Seeded default hero background image setting in MongoDB.');
    }

    // 2. Seed Products with all rich metadata
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      const dbData = readLocalDB();
      const initialProducts = dbData.products.map(p => ({
        title: p.title,
        titleLine2: p.titleLine2 || '',
        image: p.image,
        images: p.images || [p.image],
        category: p.category,
        subcategory: p.subcategory || '',
        year: p.year || new Date().getFullYear().toString(),
        client: p.client || 'VIP Client Dubai',
        description: p.description || '',
        specMaterial: p.specMaterial || '',
        specFinishing: p.specFinishing || '',
        specProduction: p.specProduction || '',
        specFacility: p.specFacility || '',
        specs: p.specs || [],
        features: p.features || []
      }));
      await Product.insertMany(initialProducts);
      console.log('Seeded initial products with full specifications into MongoDB.');
    }

    // 3. Seed Portfolio Gallery Items
    const portfolioCount = await Portfolio.countDocuments();
    if (portfolioCount === 0) {
      const dbData = readLocalDB();
      const initialPortfolio = dbData.portfolio.map(p => ({
        title: p.title,
        category: p.category,
        client: p.client,
        year: p.year,
        image: p.image
      }));
      await Portfolio.insertMany(initialPortfolio);
      console.log('Seeded initial portfolio gallery items into MongoDB.');
    }
  } catch (error) {
    console.error('Error seeding MongoDB database:', error);
  }
}

// Automatic image migration function to Cloudinary for seeded/local products
async function migrateSeedImagesToCloudinary() {
  if (!cloudinaryEnabled) {
    console.log('⚠️ Cloudinary environment variables are missing. Skipping automatic image migration.');
    return;
  }

  console.log('🔄 Checking database product images for Cloudinary migration...');

  if (useLocalJSON) {
    try {
      const db = readLocalDB();
      let updated = false;

      for (let product of db.products) {
        if (product.image && !product.image.includes('res.cloudinary.com')) {
          console.log(`Uploading ${product.title} image to Cloudinary...`);
          try {
            const uploadRes = await cloudinary.uploader.upload(product.image, {
              folder: '3dotsadv_products'
            });
            product.image = uploadRes.secure_url;
            product.images = [uploadRes.secure_url];
            updated = true;
            console.log(`✅ Successfully uploaded to Cloudinary: ${uploadRes.secure_url}`);
          } catch (err) {
            console.error(`❌ Failed to upload image for ${product.title}:`, err.message);
          }
        }
      }

      if (updated) {
        writeLocalDB(db);
        console.log('💾 Local JSON db.json file updated with Cloudinary secure URLs.');
      } else {
        console.log('✅ All local JSON db.json products already use Cloudinary secure URLs.');
      }
    } catch (e) {
      console.error('Failed migrating JSON database images:', e);
    }
  } else {
    try {
      const products = await Product.find();
      let updatedCount = 0;

      for (let product of products) {
        if (product.image && !product.image.includes('res.cloudinary.com')) {
          console.log(`Uploading ${product.title} image to Cloudinary (MongoDB)...`);
          try {
            const uploadRes = await cloudinary.uploader.upload(product.image, {
              folder: '3dotsadv_products'
            });
            product.image = uploadRes.secure_url;
            product.images = [uploadRes.secure_url];
            await product.save();
            updatedCount++;
            console.log(`✅ Successfully uploaded in MongoDB: ${uploadRes.secure_url}`);
          } catch (err) {
            console.error(`❌ Failed to upload MongoDB image for ${product.title}:`, err.message);
          }
        }
      }

      if (updatedCount > 0) {
        console.log(`💾 MongoDB database updated with ${updatedCount} Cloudinary secure URLs.`);
      } else {
        console.log('✅ All MongoDB products already use Cloudinary secure URLs.');
      }
    } catch (e) {
      console.error('Failed migrating MongoDB database images:', e);
    }
  }
}

// ================= FILE UPLOAD API =================
app.post('/api/upload', async (req, res) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ error: 'No image data provided.' });
  }

  let tempFilepath = null;
  try {
    const parts = image.split(';base64,');
    if (parts.length !== 2) {
      return res.status(400).json({ error: 'Invalid Base64 format.' });
    }

    const mimeType = parts[0].replace('data:', '');
    const ext = mimeType.split('/')[1]?.split(';')[0] || 'png';
    const buffer = Buffer.from(parts[1], 'base64');
    const filename = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${ext}`;

    // 1. Save file to OS temp directory first (always writable on both local and serverless/Vercel platforms)
    const tempDir = os.tmpdir();
    tempFilepath = path.join(tempDir, filename);
    fs.writeFileSync(tempFilepath, buffer);

    // 2. Try uploading to Cloudinary if enabled
    if (cloudinaryEnabled) {
      try {
        const isVideo = mimeType.startsWith('video/');
        let uploadResponse;

        if (isVideo) {
          console.log(`📤 Uploading large video to Cloudinary (${filename})...`);
          uploadResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_large(tempFilepath, {
              folder: '3dotsadv_products',
              resource_type: 'video',
              chunk_size: 6000000 // 6MB chunks
            }, (error, result) => {
              if (error) reject(error);
              else resolve(result);
            });
          });
        } else {
          console.log(`📤 Uploading image to Cloudinary (${filename})...`);
          uploadResponse = await cloudinary.uploader.upload(tempFilepath, {
            folder: '3dotsadv_products',
            resource_type: 'auto',
          });
        }

        console.log('✅ File uploaded successfully to Cloudinary:', uploadResponse.secure_url);

        // Delete the temporary file
        try {
          fs.unlinkSync(tempFilepath);
        } catch (unlinkError) {
          console.error('Error deleting temp file:', unlinkError);
        }

        return res.json({
          success: true,
          url: uploadResponse.secure_url
        });
      } catch (cloudinaryError) {
        console.error('⚠️ Cloudinary upload failed, checking local storage fallback option:', cloudinaryError);
      }
    }

    // 3. Fallback to Local Storage (only works if filesystem is writable, i.e., local development)
    try {
      const uploadsDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const destFilepath = path.join(uploadsDir, filename);
      fs.renameSync(tempFilepath, destFilepath);

      res.json({
        success: true,
        url: `/uploads/${filename}`
      });
    } catch (localError) {
      console.error('❌ Local fallback storage failed (read-only filesystem on serverless environment):', localError);
      
      // Cleanup the temp file in case of failure
      if (tempFilepath) {
        try {
          fs.unlinkSync(tempFilepath);
        } catch (e) {}
      }

      res.status(500).json({ 
        error: 'Cloudinary upload failed, and local file storage is unavailable on this platform.' 
      });
    }
  } catch (e) {
    console.error('File upload error:', e);
    
    // Cleanup the temp file in case of failure
    if (tempFilepath) {
      try {
        fs.unlinkSync(tempFilepath);
      } catch (unlinkErr) {}
    }

    res.status(500).json({ error: 'Failed to process file upload.' });
  }
});

// ================= AUTHENTICATION API =================
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username && username.toLowerCase() === '3dotadmin' && password === 'admin@3dot') {
    return res.json({
      success: true,
      token: 'jwt_mock_token_3dot_admin_authorized',
      user: {
        username: '3dotadmin',
        role: 'admin'
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password credentials.'
    });
  }
});

// ================= PRODUCTS API =================
app.get('/api/products', async (req, res) => {
  if (useLocalJSON) {
    const db = readLocalDB();
    return res.json(db.products);
  }

  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/products', async (req, res) => {
  const { 
    title, titleLine2, image, images, category, subcategory, year, 
    client, description, specMaterial, specFinishing, specProduction, specFacility, specs, features 
  } = req.body;
  
  if (!title || !image || !category) {
    return res.status(400).json({ error: 'Title, Image URL, and Category are required.' });
  }

  const finalImages = Array.isArray(images) && images.length > 0 ? images : [image];

  if (useLocalJSON) {
    const db = readLocalDB();
    const newProduct = {
      _id: 'prod_' + Math.random().toString(36).substr(2, 9),
      title,
      titleLine2: titleLine2 || '',
      image,
      images: finalImages,
      category,
      subcategory: subcategory || '',
      year: year || new Date().getFullYear().toString(),
      client: client || 'VIP Client Dubai',
      description: description || '',
      specMaterial: specMaterial || '',
      specFinishing: specFinishing || '',
      specProduction: specProduction || '',
      specFacility: specFacility || '',
      specs: specs || [],
      features: features || [],
      createdAt: new Date().toISOString()
    };
    db.products.unshift(newProduct);
    writeLocalDB(db);
    return res.status(201).json(newProduct);
  }

  try {
    const newProduct = await Product.create({ 
      title, titleLine2: titleLine2 || '', image, images: finalImages, category, subcategory: subcategory || '', year,
      client, description, specMaterial, specFinishing, specProduction, specFacility, specs, features
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  const targetId = req.params.id;
  const { 
    title, titleLine2, image, images, category, subcategory, year, 
    client, description, specMaterial, specFinishing, specProduction, specFacility, specs, features 
  } = req.body;
  
  if (!title || !image || !category) {
    return res.status(400).json({ error: 'Title, Image URL, and Category are required.' });
  }

  const finalImages = Array.isArray(images) && images.length > 0 ? images : [image];

  const updateData = {
    title, titleLine2: titleLine2 || '', image, images: finalImages, category, subcategory: subcategory || '', year,
    client, description, specMaterial, specFinishing, specProduction, specFacility, specs, features
  };

  if (useLocalJSON) {
    const db = readLocalDB();
    const index = db.products.findIndex(p => p._id === targetId);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found in local DB.' });
    }
    db.products[index] = { ...db.products[index], ...updateData, updatedAt: new Date().toISOString() };
    writeLocalDB(db);
    return res.json(db.products[index]);
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      targetId, 
      updateData,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  const targetId = req.params.id;

  if (useLocalJSON) {
    const db = readLocalDB();
    const originalLength = db.products.length;
    db.products = db.products.filter(p => p._id !== targetId);
    
    if (db.products.length === originalLength) {
      return res.status(404).json({ error: 'Product not found in local DB.' });
    }
    writeLocalDB(db);
    return res.json({ message: 'Product successfully deleted from local DB.', id: targetId });
  }

  try {
    const deleted = await Product.findByIdAndDelete(targetId);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json({ message: 'Product successfully deleted.', id: targetId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ================= PORTFOLIO API =================
app.get('/api/portfolio', async (req, res) => {
  if (useLocalJSON) {
    const db = readLocalDB();
    return res.json(db.portfolio);
  }

  try {
    const items = await Portfolio.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch portfolio gallery' });
  }
});

app.post('/api/portfolio', async (req, res) => {
  const { title, category, client, year, image } = req.body;
  if (!title || !category || !client || !image) {
    return res.status(400).json({ error: 'Title, Category, Client, and Image URL are required.' });
  }

  if (useLocalJSON) {
    const db = readLocalDB();
    const newItem = {
      _id: 'port_' + Math.random().toString(36).substr(2, 9),
      title,
      category,
      client,
      year: year || new Date().getFullYear().toString(),
      image,
      createdAt: new Date().toISOString()
    };
    db.portfolio.unshift(newItem);
    writeLocalDB(db);
    return res.status(201).json(newItem);
  }

  try {
    const newItem = await Portfolio.create({ title, category, client, year, image });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create portfolio item' });
  }
});

app.delete('/api/portfolio/:id', async (req, res) => {
  const targetId = req.params.id;

  if (useLocalJSON) {
    const db = readLocalDB();
    const originalLength = db.portfolio.length;
    db.portfolio = db.portfolio.filter(item => item._id !== targetId);

    if (db.portfolio.length === originalLength) {
      return res.status(404).json({ error: 'Portfolio item not found in local DB.' });
    }
    writeLocalDB(db);
    return res.json({ message: 'Portfolio item successfully deleted from local DB.', id: targetId });
  }

  try {
    const deleted = await Portfolio.findByIdAndDelete(targetId);
    if (!deleted) {
      return res.status(404).json({ error: 'Portfolio item not found.' });
    }
    res.json({ message: 'Portfolio item successfully deleted.', id: targetId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete portfolio item' });
  }
});

// ================= SETTINGS API =================
app.get('/api/settings', async (req, res) => {
  const defaultReels = [
    "video:/uploads/reel4.mp4",
    "video:/uploads/reel3.mp4",
    "video:/uploads/reel 1.mp4",
    "video:/uploads/reel2.mp4"
  ];
  if (useLocalJSON) {
    const db = readLocalDB();
    return res.json({
      hero_bg: db.settings.hero_bg || '/images/hero-bg.png',
      instagram_reels: db.settings.instagram_reels || defaultReels
    });
  }

  try {
    const bgSetting = await Settings.findOne({ key: 'hero_bg' });
    const reelsSetting = await Settings.findOne({ key: 'instagram_reels' });
    res.json({
      hero_bg: bgSetting ? bgSetting.value : '/images/hero-bg.png',
      instagram_reels: reelsSetting ? reelsSetting.value : defaultReels
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve settings' });
  }
});

app.put('/api/settings', async (req, res) => {
  const { hero_bg, instagram_reels } = req.body;

  if (useLocalJSON) {
    const db = readLocalDB();
    if (hero_bg !== undefined) {
      db.settings.hero_bg = hero_bg;
    }
    if (instagram_reels !== undefined) {
      db.settings.instagram_reels = instagram_reels;
    }
    writeLocalDB(db);
    return res.json({ 
      success: true, 
      hero_bg: db.settings.hero_bg || '/images/hero-bg.png',
      instagram_reels: db.settings.instagram_reels || []
    });
  }

  try {
    const result = { success: true };
    
    if (hero_bg !== undefined) {
      let bgSetting = await Settings.findOne({ key: 'hero_bg' });
      if (bgSetting) {
        bgSetting.value = hero_bg;
        await bgSetting.save();
      } else {
        bgSetting = await Settings.create({ key: 'hero_bg', value: hero_bg });
      }
      result.hero_bg = bgSetting.value;
    }

    if (instagram_reels !== undefined) {
      let reelsSetting = await Settings.findOne({ key: 'instagram_reels' });
      if (reelsSetting) {
        reelsSetting.value = instagram_reels;
        await reelsSetting.save();
      } else {
        reelsSetting = await Settings.create({ key: 'instagram_reels', value: instagram_reels });
      }
      result.instagram_reels = reelsSetting.value;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = app;

