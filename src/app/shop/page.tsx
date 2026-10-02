"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Star,
  Check,
  LayoutGrid,
  Grid3X3,
  ListFilter,
  RotateCcw,
  Sparkles
} from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const { products } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<number>(1500);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [columns, setColumns] = useState<3 | 4>(4);

  // Sync category if URL parameter changes
  React.useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const categories = ["All", "Audio & Tech", "Timepieces", "Leather Goods", "Fragrance", "Home Living", "Apparel"];

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "All" && p.category !== selectedCategory) {
          return false;
        }
        // Search query filter
        if (
          searchQuery.trim() !== "" &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        // Price filter
        if (p.price > priceRange) {
          return false;
        }
        // Rating filter
        if (minRating > 0 && p.rating < minRating) {
          return false;
        }
        // In-stock filter
        if (inStockOnly && !p.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, priceRange, minRating, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setPriceRange(1500);
    setMinRating(0);
    setInStockOnly(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    searchQuery.trim() !== "" ||
    priceRange < 1500 ||
    minRating > 0 ||
    inStockOnly;

  return (
    <div className="bg-stone-950 min-h-screen text-stone-100">
      {/* Catalog Header Banner */}
      <div className="border-b border-stone-800/80 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                <span>The Permanent Atelier</span>
                <span>•</span>
                <span>Direct From Craftsmen</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                {selectedCategory === "All" ? "Complete Collection" : selectedCategory}
              </h1>
              <p className="text-stone-400 text-xs sm:text-sm font-light mt-1">
                Showing {filteredProducts.length} pieces of acoustic engineering and bespoke horology.
              </p>
            </div>

            {/* Quick Search in Header */}
            <div className="w-full md:w-72 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-full pl-9 pr-8 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar: Mobile filter button, view toggles, sort dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-800/60">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-semibold text-stone-200 hover:border-amber-500/50"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Filter Catalog</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-amber-400" />
              )}
            </button>

            {/* Active category pill tabs on desktop */}
            <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto pb-1 max-w-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-amber-400 text-stone-950 font-semibold shadow-sm"
                      : "bg-stone-900/60 text-stone-400 hover:text-white border border-stone-800/80 hover:border-stone-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            {/* Grid column selector (3 vs 4 columns) */}
            <div className="hidden sm:flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800">
              <button
                onClick={() => setColumns(3)}
                className={`p-1.5 rounded ${columns === 3 ? "bg-stone-800 text-amber-400" : "text-stone-400 hover:text-white"}`}
                title="3 columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setColumns(4)}
                className={`p-1.5 rounded ${columns === 4 ? "bg-stone-800 text-amber-400" : "text-stone-400 hover:text-white"}`}
                title="4 columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-900 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="featured">Curated & Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated (★)</option>
                <option value="newest">Latest Drops</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content: Left Filter Sidebar + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 pr-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Refine Selection
              </span>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Disciplines
              </h4>
              <div className="space-y-1.5 text-xs text-stone-400">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition text-left ${
                      selectedCategory === cat
                        ? "bg-amber-400/10 text-amber-300 font-medium border border-amber-400/20"
                        : "hover:bg-stone-900 hover:text-stone-200"
                    }`}
                  >
                    <span>{cat}</span>
                    <span className="text-[11px] text-stone-600 font-mono">
                      {cat === "All"
                        ? products.length
                        : products.filter((p) => p.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-stone-800">
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="font-semibold text-white uppercase tracking-wider">Max Price</span>
                <span className="text-amber-300 font-semibold font-serif">${priceRange}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>$100</span>
                <span>$1,500+</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="pt-4 border-t border-stone-800">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Minimum Rating
              </h4>
              <div className="space-y-1.5">
                {[0, 4.5, 4.8, 5.0].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setMinRating(rate)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition ${
                      minRating === rate
                        ? "bg-amber-400/10 text-amber-300 border border-amber-400/20"
                        : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Star className={`w-3.5 h-3.5 ${rate > 0 ? "text-amber-400 fill-current" : "text-stone-500"}`} />
                      <span>{rate === 0 ? "All Ratings" : `${rate}★ & Above`}</span>
                    </div>
                    {minRating === rate && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="pt-4 border-t border-stone-800">
              <label className="flex items-center justify-between cursor-pointer py-1">
                <span className="text-xs font-medium text-stone-300">Ready to Ship (In Stock)</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded accent-amber-400 cursor-pointer"
                />
              </label>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 px-4 text-center bg-stone-900/40 rounded-3xl border border-stone-800/80 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-stone-800/60 flex items-center justify-center text-amber-400 mb-4">
                  <Search className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">No matching pieces located</h3>
                <p className="text-stone-400 text-xs sm:text-sm max-w-sm mb-6 font-light">
                  Try adjusting your price ceiling, removing filters, or searching for other horological and acoustic terms.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-amber-400 text-stone-950 text-xs font-semibold hover:bg-amber-300 transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  columns === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Slide-in Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-stone-900 border-l border-stone-800 p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="font-serif text-lg text-white">Filter Catalog</span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile categories */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
                  Category
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs ${
                        selectedCategory === cat
                          ? "bg-amber-400 text-stone-950 font-semibold"
                          : "bg-stone-800 text-stone-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile price */}
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-stone-300">Max Price</span>
                  <span className="text-amber-300 font-serif">${priceRange}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Mobile in stock */}
              <label className="flex items-center justify-between text-xs text-stone-300">
                <span>In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 accent-amber-400"
                />
              </label>
            </div>

            <div className="pt-6 border-t border-stone-800 flex gap-2">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-stone-700 text-xs font-medium text-stone-300"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-amber-400 text-stone-950 text-xs font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-400">
          Loading catalog...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
