import { Product } from "@/types";

export const initialProducts: Product[] = [
  {
    id: "lum-01",
    name: "Lumière Horizon Acoustic Studio Headphones",
    tagline: "Unrivaled planar magnetic drivers wrapped in hand-stitched leather",
    description: "Engineered for pure audiophile precision. Featuring custom 50mm planar magnetic transducers, aerospace-grade aluminum chassis, and breathable memory foam earcups wrapped in supple Tuscan lambskin leather. Adaptive hybrid ANC isolates ambient chatter while preserving warm, transparent acoustics.",
    price: 489,
    originalPrice: 599,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 142,
    category: "Audio & Tech",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Obsidian Black", hex: "#1c1c1e" },
      { name: "Champagne Silver", hex: "#d8d3c5" },
      { name: "Cognac Amber", hex: "#8c532b" }
    ],
    inStock: true,
    stockCount: 28,
    sku: "LUM-AUD-01",
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    specs: {
      "Frequency Response": "5Hz – 50,000Hz",
      "Driver Unit": "50mm Planar Magnetic",
      "Battery Life": "42 Hours (ANC Enabled)",
      "Connectivity": "Bluetooth 5.3 + 3.5mm OFC Cable",
      "Weight": "298g"
    },
    features: [
      "Lossless Hi-Res Audio certification with LDAC support",
      "Adaptive Active Noise Cancellation with Transparency Mode",
      "Multipoint pairing for seamless switching between laptop and phone",
      "Precision aluminum volume wheel with haptic feedback"
    ]
  },
  {
    id: "lum-02",
    name: "Vanguard Automatic Chronograph 41mm",
    tagline: "Swiss mechanical movement with sapphire crystal and exhibition caseback",
    description: "An homage to timeless horology. Powered by a high-beat self-winding Swiss mechanical movement with 48-hour power reserve. Encased in 316L brushed stainless steel with anti-reflective double-domed sapphire glass and water resistance up to 100 meters.",
    price: 1250,
    originalPrice: 1490,
    discountPercentage: 16,
    rating: 5.0,
    reviewCount: 89,
    category: "Timepieces",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Midnight Navy", hex: "#14213d" },
      { name: "Emerald Sunburst", hex: "#1e3f20" },
      { name: "Slate Anthracite", hex: "#2f3e46" }
    ],
    sizes: ["40mm", "42mm"],
    inStock: true,
    stockCount: 14,
    sku: "LUM-WAT-02",
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    specs: {
      "Calibre": "Calibre L-880 Automatic 28,800 vph",
      "Case Material": "316L Surgical Stainless Steel",
      "Glass": "Anti-Reflective Double Sapphire",
      "Water Resistance": "10 ATM / 100m",
      "Strap": "Horween Leather Quick-Release"
    },
    features: [
      "Exhibition caseback revealing decorated rotor and perlage",
      "Super-LumiNova BGW9 indices for luminous nighttime readability",
      "Hand-polished chamfered lugs with brushed case body",
      "5-Year International Manufacturer Warranty"
    ]
  },
  {
    id: "lum-03",
    name: "Palermo Full-Grain Leather Weekender Duffel",
    tagline: "Handcrafted in Florence from vegetable-tanned Tuscan saddle leather",
    description: "The quintessential travel companion for discerning travelers. Cut from hand-selected vegetable-tanned hides that develop an exquisite golden patina with age. Features solid brass YKK Excella zippers, reinforced riveted handles, and a dedicated padded shoe compartment.",
    price: 680,
    originalPrice: 850,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 112,
    category: "Leather Goods",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Bourbon Tan", hex: "#964b00" },
      { name: "Espresso Dark Brown", hex: "#3d2314" },
      { name: "Nero Black", hex: "#111111" }
    ],
    sizes: ["45L Standard", "55L Extended"],
    inStock: true,
    stockCount: 19,
    sku: "LUM-LEA-03",
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    specs: {
      "Dimensions": "52cm x 28cm x 26cm",
      "Capacity": "45 Liters (Carry-on approved)",
      "Hardware": "Antique Solid Brushed Brass",
      "Lining": "Water-resistant Japanese Cotton Twill",
      "Laptop Sleeve": "Fits up to 16\" MacBook Pro"
    },
    features: [
      "TSA carry-on compliant across all major international airlines",
      "Ventilated side compartment for footwear or laundry",
      "Detachable ergonomic shoulder strap with dense wool padding",
      "Protective metal feet on base to prevent surface abrasions"
    ]
  },
  {
    id: "lum-04",
    name: "Atelier No. 07 Santal & Smoked Cardamom",
    tagline: "Handcrafted pure extrait de parfum with rare botanical resins",
    description: "An evocative olfactory signature blending creamy Mysore sandalwood, cracked green cardamom, iris root, and warm amber resin. Concentrated at 28% pure parfum oil for exceptional 14+ hour longevity and a magnetic sillage.",
    price: 260,
    originalPrice: 295,
    discountPercentage: 12,
    rating: 4.9,
    reviewCount: 76,
    category: "Fragrance",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Amber Crystal Flacon", hex: "#d4a373" }
    ],
    sizes: ["50ml", "100ml"],
    inStock: true,
    stockCount: 45,
    sku: "LUM-FRG-04",
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNew: true,
    specs: {
      "Concentration": "Extrait de Parfum (28% Oil)",
      "Top Notes": "Cardamom, Bergamot, Pink Peppercorn",
      "Heart Notes": "Mysore Sandalwood, Papyrus, Orris Concrete",
      "Base Notes": "Smoked Cedar, Golden Amber, Cashmeran",
      "Origin": "Grasse, France"
    },
    features: [
      "100% cruelty-free, vegan, phthalate-free formulation",
      "Heavy weighted magnetic metal cap with engraved monogram",
      "Macerated for 90 days in small artisan batches",
      "Includes 2ml travel vial for on-the-go refresh"
    ]
  },
  {
    id: "lum-05",
    name: "Architectural Ceramic Arc Table Lamp",
    tagline: "Sculptural textured stoneware with warm dimmable ambient glow",
    description: "Blurring the line between functional illumination and modern sculpture. Hand-thrown terracotta clay coated in a matte chalk-white glaze. Integrated OLED light source provides flicker-free 2700K sunset warmth with rotary brass dimmer switch.",
    price: 340,
    originalPrice: 420,
    discountPercentage: 19,
    rating: 4.7,
    reviewCount: 54,
    category: "Home Living",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Chalk Matte White", hex: "#f4f1ea" },
      { name: "Warm Terracotta", hex: "#c97a63" },
      { name: "Charcoal Basalt", hex: "#2b2b2b" }
    ],
    inStock: true,
    stockCount: 16,
    sku: "LUM-HOM-05",
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    specs: {
      "Light Source": "Warm Dimmable OLED 2700K (CRI 95+)",
      "Height": "38cm",
      "Base Diameter": "22cm",
      "Cable": "2.5m Braided Linen Cord",
      "Energy Rating": "A++ High Efficiency"
    },
    features: [
      "Handcrafted tactile finish where no two pieces are identical",
      "Stepless brass tactile touch-dimming control",
      "Even 360-degree ambient diffusion without harsh hotspots",
      "Integrated felt padding on base to protect fine wood surfaces"
    ]
  },
  {
    id: "lum-06",
    name: "Mongolian Cashmere Relaxed Mockneck Sweater",
    tagline: "Ultra-fine 100% Grade-A cashmere knit with seamless comfort",
    description: "Sourced from the high plateaus of Inner Mongolia. Spun from 15.5-micron combed underfleece hairs for unmatched cloud-like softness that resists pilling. Tailored with a relaxed modern drape and micro-ribbed cuffs.",
    price: 320,
    originalPrice: 380,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 98,
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Oatmeal Melange", hex: "#d8cfc4" },
      { name: "Charcoal Heather", hex: "#3b3e40" },
      { name: "Sage Green", hex: "#7a8b7b" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    stockCount: 32,
    sku: "LUM-APP-06",
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    specs: {
      "Fiber": "100% Grade-A Mongolian Cashmere",
      "Micron Count": "15.5 Microns (Superfine)",
      "Gauge": "12-Gauge Double Ply",
      "Care": "Dry Clean or Gentle Hand Wash Cold",
      "Origin": "Knit in Biella, Italy"
    },
    features: [
      "Naturally thermo-regulating: warm in winter, breathable in spring",
      "Seamless round-knitting technology avoids restrictive seams",
      "Pre-washed with Alpine water for immediate velvet drape",
      "Comes in an organic cedar preservation dustbag"
    ]
  },
  {
    id: "lum-07",
    name: "Solid Walnut & Brushed Brass MagSafe Dock",
    tagline: "Weighted desktop charging sanctuary with dual fast inductive coils",
    description: "CNC milled from a single block of certified sustainably-harvested American black walnut, finished with hand-rubbed Danish oil. Heavy brass counterweight keeps the dock anchored when detaching your smartphone.",
    price: 165,
    originalPrice: 195,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 63,
    category: "Audio & Tech",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "American Walnut", hex: "#5c4033" },
      { name: "Smoked Oak", hex: "#3d322a" }
    ],
    inStock: true,
    stockCount: 52,
    sku: "LUM-TEC-07",
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    specs: {
      "Charging Power": "15W MagSafe Phone + 5W AirPods Pad",
      "Base Weight": "850g (Solid Anti-Slip Brass Core)",
      "Materials": "FSC Walnut Wood & Solid Brass",
      "Included Cable": "2m Nylon Braided USB-C to USB-C",
      "Compatibility": "iPhone 12 through 17 + Qi2 Devices"
    },
    features: [
      "Micro-suction silicone base ensures single-hand phone removal",
      "Simultaneous charging for phone and wireless earbuds",
      "Smart thermal protection prevents device battery overheating",
      "Hidden cable-routing channel keeps desk clutter-free"
    ]
  },
  {
    id: "lum-08",
    name: "Aviator Titanium Polarized Sunglasses",
    tagline: "Ultra-lightweight Japanese beta-titanium with Barberini mineral glass lenses",
    description: "Crafted in Sabae, Japan by master opticians. Weighing a mere 18 grams, the ultra-resilient beta-titanium frame flexes naturally to contour any face. Barberini mineral crystal polarized lenses deliver crystal-clear definition and 100% UV protection.",
    price: 390,
    originalPrice: 460,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 41,
    category: "Timepieces",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: [
      { name: "Brushed Gunmetal", hex: "#4a4e51" },
      { name: "24K Gold Plated", hex: "#d4af37" },
      { name: "Matte Black", hex: "#1f1f1f" }
    ],
    inStock: true,
    stockCount: 22,
    sku: "LUM-ACC-08",
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    specs: {
      "Frame Material": "Japanese Beta-Titanium",
      "Lens Material": "Barberini Tempered Mineral Glass",
      "Weight": "18.4 grams",
      "Protection": "UV400 + Polarized Anti-Glare Coating",
      "Hinges": "Screwless Monobloc Barrel"
    },
    features: [
      "Ultra-durable titanium memory alloy resists bending out of shape",
      "Oleophobic and hydrophobic lens coatings resist fingerprints and rain",
      "Hypoallergenic medical-grade titanium nose pads",
      "Includes structured leather folding case and microfiber cloth"
    ]
  }
];
