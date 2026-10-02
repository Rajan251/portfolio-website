import { Review } from "@/types";

export const customerReviews: Review[] = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    date: "March 18, 2026",
    title: "The acoustic presence is astonishing",
    comment: "The Horizon studio headphones easily surpass my Sennheiser HD800s in tonal warmth and isolation. The Italian lambskin earcups breathe effortlessly during 6-hour studio sessions. Truly museum-grade craftsmanship.",
    verified: true,
    productName: "Lumière Horizon Acoustic Studio Headphones"
  },
  {
    id: "rev-2",
    author: "Julian Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    date: "March 24, 2026",
    title: "Horological perfection under $2,000",
    comment: "The double-domed sapphire crystal on the Vanguard Chronograph creates unbelievable depth. I've received compliments in London, Geneva, and Tokyo. The exhibition caseback finishing rivals pieces three times the price.",
    verified: true,
    productName: "Vanguard Automatic Chronograph 41mm"
  },
  {
    id: "rev-3",
    author: "Marcus Aurelius Thorne",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    date: "April 02, 2026",
    title: "Leather that tells an evolving story",
    comment: "Took the Palermo Weekender on four international flights this month. The vegetable-tanned leather has already begun developing a deep amber patina. The brass hardware is hefty and smooth.",
    verified: true,
    productName: "Palermo Full-Grain Leather Weekender Duffel"
  },
  {
    id: "rev-4",
    author: "Sophie Laurent",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    date: "April 07, 2026",
    title: "Santal 07 is my new signature scent",
    comment: "Remarkable longevity. A single spray behind the collar lasted through a formal dinner and into the next morning. Warm, subtly smoky, and universally captivating.",
    verified: true,
    productName: "Atelier No. 07 Santal & Smoked Cardamom"
  }
];

export const sampleCoupons = [
  { code: "WELCOME15", discountPercent: 15, description: "15% off first order" },
  { code: "LUXE20", discountPercent: 20, description: "20% VIP privilege discount" },
  { code: "SPRING10", discountPercent: 10, description: "10% Spring Seasonal Drop" }
];
