export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  tagline: string;
}

export const categories: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Audio & Tech",
    slug: "Audio & Tech",
    itemCount: 24,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop",
    tagline: "Audiophile transducers & precision tactile docks"
  },
  {
    id: "cat-2",
    name: "Timepieces",
    slug: "Timepieces",
    itemCount: 18,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
    tagline: "Mechanical Swiss calibres & titanium accessories"
  },
  {
    id: "cat-3",
    name: "Leather Goods",
    slug: "Leather Goods",
    itemCount: 31,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop",
    tagline: "Tuscan vegetable-tanned weekender bags & portfolios"
  },
  {
    id: "cat-4",
    name: "Fragrance",
    slug: "Fragrance",
    itemCount: 12,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
    tagline: "High-concentration artisanal extraits de parfum"
  },
  {
    id: "cat-5",
    name: "Home Living",
    slug: "Home Living",
    itemCount: 27,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
    tagline: "Architectural lighting & Scandinavian ceramic objects"
  },
  {
    id: "cat-6",
    name: "Apparel",
    slug: "Apparel",
    itemCount: 19,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    tagline: "Mongolian cashmere knits & relaxed tailoring"
  }
];
