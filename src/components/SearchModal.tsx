"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import { Search, X, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, products } = useStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = query.trim() === ""
    ? products.slice(0, 4)
    : products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-md transition-opacity">
      <div
        className="w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-stone-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-stone-800">
          <Search className="w-5 h-5 text-stone-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search luxury timepieces, audio, leather, cashmere..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-stone-100 placeholder-stone-500 text-base md:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-stone-400 hover:text-stone-200 text-xs px-2 py-1 rounded bg-stone-800 mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-5 py-2.5 bg-stone-950/60 border-b border-stone-800/80 flex items-center gap-2 overflow-x-auto text-xs text-stone-400">
          <span className="shrink-0 text-stone-500 font-medium">Trending:</span>
          {["Headphones", "Chronograph", "Duffel", "Cashmere", "Fragrance"].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 divide-y divide-stone-800/50">
          <div className="text-xs uppercase tracking-wider text-stone-500 font-semibold px-2 py-1">
            {query.trim() === "" ? "Curated Suggestions" : `Search Results (${filtered.length})`}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 px-4">
              <p className="text-stone-400 text-base">No pieces matched &ldquo;{query}&rdquo;</p>
              <p className="text-stone-500 text-sm mt-1">Try searching for &quot;Watches&quot;, &quot;Audio&quot;, or &quot;Leather&quot;</p>
            </div>
          ) : (
            filtered.map((prod) => (
              <Link
                key={prod.id}
                href={`/product/${prod.id}`}
                onClick={() => setIsSearchOpen(false)}
                className="group flex items-center justify-between p-3 rounded-xl hover:bg-stone-800/70 transition-colors pt-3"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-950 shrink-0 border border-stone-800">
                    <Image
                      src={prod.images[0]}
                      alt={prod.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">
                      {prod.category}
                    </span>
                    <h4 className="text-stone-100 font-medium text-sm md:text-base group-hover:text-amber-200 transition-colors line-clamp-1">
                      {prod.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {prod.rating}
                      </span>
                      <span>•</span>
                      <span>${prod.price.toLocaleString()}</span>
                      {prod.originalPrice && (
                        <span className="line-through text-stone-600">
                          ${prod.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-stone-500 group-hover:text-stone-200 transition text-sm pr-2">
                  <span className="hidden sm:inline text-xs font-light">View</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="px-5 py-3 bg-stone-950 border-t border-stone-800 text-xs text-stone-500 flex justify-between items-center">
          <span>Press <kbd className="px-1.5 py-0.5 bg-stone-800 rounded text-stone-300 text-[10px]">ESC</kbd> to close</span>
          <Link
            href="/shop"
            onClick={() => setIsSearchOpen(false)}
            className="text-amber-400 hover:text-amber-300 transition underline underline-offset-4"
          >
            Explore all catalog &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
