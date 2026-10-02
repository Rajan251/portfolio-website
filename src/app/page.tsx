"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { customerReviews } from "@/data/reviews";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  Award,
  Clock,
  Copy,
  Check,
  ArrowUpRight,
  TrendingUp,
  Flame,
  Zap
} from "lucide-react";

export default function HomePage() {
  const { products, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<"trending" | "bestsellers" | "new">("trending");
  const [copiedCode, setCopiedCode] = useState(false);

  // Promotional countdown timer (mock 24h countdown)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    showToast(`Code "${code}" copied to clipboard!`, "success");
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const trendingProducts = products.filter((p) => p.isTrending);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNew || p.id === "lum-04" || p.id === "lum-05");

  const displayedProducts =
    activeTab === "trending"
      ? trendingProducts
      : activeTab === "bestsellers"
      ? bestSellers
      : newArrivals;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-stone-950">
        {/* Background Image with dramatic gradient vignette */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=2000&auto=format&fit=crop"
            alt="Lumière Atelier Heritage"
            fill
            priority
            className="object-cover object-center opacity-30 scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-stone-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Subtle top badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-300 text-xs font-medium uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg shadow-black/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Spring 2026 Private Collection • Drop 01</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white font-normal leading-[1.08] max-w-4xl">
            Where Modern Audio Meets{" "}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
              Timeless Form.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-stone-300 font-light max-w-2xl leading-relaxed">
            Curated horology, planar acoustics, and handcrafted Tuscan leather.
            Built for connoisseurs who demand uncompromising tactile excellence.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold rounded-full text-sm sm:text-base flex items-center justify-center gap-2 transition duration-200 shadow-xl shadow-amber-950/40 group"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/product/lum-01"
              className="w-full sm:w-auto px-8 py-4 bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700/80 font-medium rounded-full text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-md transition"
            >
              <span>Featured: Horizon Studio</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>

          {/* Trust stats pill bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-stone-800/80 pt-8 w-full max-w-3xl text-center">
            <div>
              <span className="font-serif text-2xl md:text-3xl font-semibold text-white">4.92★</span>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">Verified Reviews</p>
            </div>
            <div>
              <span className="font-serif text-2xl md:text-3xl font-semibold text-white">100%</span>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">Vegetable-Tanned</p>
            </div>
            <div>
              <span className="font-serif text-2xl md:text-3xl font-semibold text-white">Swiss</span>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">Mechanical Calibres</p>
            </div>
            <div>
              <span className="font-serif text-2xl md:text-3xl font-semibold text-white">Zero</span>
              <p className="text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">Carbon Footprint</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="py-20 bg-stone-950 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Curated Disciplines
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
                Explore by Category
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-stone-300 hover:text-amber-400 inline-flex items-center gap-1.5 transition group"
            >
              <span>View All 6 Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${encodeURIComponent(cat.slug)}`}
                className="group relative h-80 rounded-2xl overflow-hidden border border-stone-800/80 bg-stone-900 shadow-lg hover:border-amber-500/50 transition-all duration-500 flex flex-col justify-end p-6"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent group-hover:via-stone-950/50 transition-colors" />

                <div className="relative z-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                    {cat.itemCount} Creations Available
                  </span>
                  <h3 className="font-serif text-2xl text-white font-medium mt-1 group-hover:text-amber-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-300 font-light mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-stone-400 group-hover:text-white transition">
                    <span>Discover Category</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Catalog Highlights (Trending / Best Sellers / New Arrivals) */}
      <section className="py-20 bg-stone-900/30 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Masterpiece Gallery
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
                The Highlighted Roster
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mt-6 md:mt-0 p-1 bg-stone-950 rounded-xl border border-stone-800">
              <button
                onClick={() => setActiveTab("trending")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === "trending"
                    ? "bg-amber-400 text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Trending Now
              </button>
              <button
                onClick={() => setActiveTab("bestsellers")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === "bestsellers"
                    ? "bg-amber-400 text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Best Sellers
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  activeTab === "new"
                    ? "bg-amber-400 text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                New Arrivals
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-stone-700 bg-stone-900/60 hover:bg-stone-800 text-stone-200 hover:text-white text-xs uppercase tracking-widest font-semibold transition"
            >
              <span>Explore Complete Atelier Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Immersive Promotional Banner with Countdown */}
      <section className="py-16 bg-stone-950 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 p-8 md:p-14 shadow-2xl">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Limited Seasonal Allocation
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
                  Unlock 20% Off Your Curated Order
                </h3>

                <p className="text-stone-300 text-sm md:text-base font-light max-w-xl leading-relaxed">
                  Apply our seasonal patron privilege code at checkout. Includes complimentary carbon-neutral express delivery and tailored gift packaging.
                </p>

                {/* Promo Code Box */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex items-center gap-3 bg-stone-950/90 border border-stone-700/80 rounded-xl px-4 py-2.5">
                    <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">CODE:</span>
                    <span className="text-amber-400 font-mono font-bold text-sm tracking-wider">LUXE20</span>
                  </div>

                  <button
                    onClick={() => handleCopyCode("LUXE20")}
                    className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>
              </div>

              {/* Countdown Timer Block */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
                <div className="bg-stone-950/80 border border-stone-800 rounded-2xl p-6 text-center shadow-xl w-full max-w-sm">
                  <p className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-4">
                    Privilege Window Expires In:
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3">
                      <span className="block font-serif text-3xl font-semibold text-white">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500">Hours</span>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3">
                      <span className="block font-serif text-3xl font-semibold text-white">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500">Mins</span>
                    </div>
                    <div className="bg-stone-900 border border-stone-800 rounded-xl p-3">
                      <span className="block font-serif text-3xl font-semibold text-amber-400">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-stone-500">Secs</span>
                    </div>
                  </div>

                  <Link
                    href="/shop"
                    className="mt-6 w-full py-3 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition"
                  >
                    <span>Shop With Privilege Code</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials & Reviews */}
      <section className="py-20 bg-stone-950 border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Patron Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
              Endorsed by Discerning Connoisseurs
            </h2>
            <p className="text-stone-400 text-sm font-light mt-2">
              From world-touring audio engineers to Swiss collectors, hear their reflections on Lumière craft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-stone-900/50 border border-stone-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/30 transition shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <h4 className="text-white font-serif text-base font-medium mb-2">
                    &ldquo;{rev.title}&rdquo;
                  </h4>
                  <p className="text-stone-300 text-xs font-light leading-relaxed mb-4">
                    {rev.comment}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800/70 flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-stone-700 shrink-0">
                    <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-white">{rev.author}</h5>
                    <div className="flex items-center gap-1 text-[10px] text-amber-400/90">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified Collector</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
