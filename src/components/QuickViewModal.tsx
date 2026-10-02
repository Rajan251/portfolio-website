"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Heart, ShoppingBag, ArrowRight, Check, ShieldCheck, Truck } from "lucide-react";

export const QuickViewModal = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors?.[0]?.name || "");
      setSelectedSize(quickViewProduct.sizes?.[0] || "");
      setQuantity(1);
      setActiveImageIdx(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-3xl overflow-hidden shadow-2xl text-stone-100 flex flex-col md:flex-row max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="w-full md:w-1/2 bg-stone-950 p-6 flex flex-col justify-between">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-stone-800/80">
            <Image
              src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                    activeImageIdx === idx ? "border-amber-400" : "border-stone-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Product Details & Controls */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-amber-400 uppercase tracking-widest font-medium mb-1">
              <span>{quickViewProduct.category}</span>
              <span className="text-stone-500 font-mono">SKU: {quickViewProduct.sku}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-serif text-white font-normal mb-2">
              {quickViewProduct.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4 text-xs text-stone-400">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(quickViewProduct.rating) ? "fill-current" : "text-stone-700"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-stone-200">{quickViewProduct.rating}</span>
              <span>({quickViewProduct.reviewCount} connoisseur reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl md:text-3xl font-serif font-semibold text-amber-300">
                ${quickViewProduct.price.toLocaleString()}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-stone-500 text-base line-through">
                  ${quickViewProduct.originalPrice.toLocaleString()}
                </span>
              )}
              {quickViewProduct.discountPercentage && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-rose-900/60 text-rose-300 border border-rose-700/50">
                  Save {quickViewProduct.discountPercentage}%
                </span>
              )}
            </div>

            <p className="text-xs md:text-sm text-stone-300 font-light leading-relaxed mb-5">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Select Palette: <span className="text-stone-200">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all p-0.5 ${
                        selectedColor === c.name ? "border-amber-400 scale-110" : "border-stone-700 hover:border-stone-500"
                      }`}
                      title={c.name}
                    >
                      <span className="block w-full h-full rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Options */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div className="mb-5">
                <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Select Dimension / Size: <span className="text-stone-200">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                        selectedSize === s
                          ? "bg-amber-400 text-stone-950 border-amber-400 font-semibold"
                          : "border-stone-800 text-stone-300 hover:border-stone-600 bg-stone-950/40"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="space-y-3 pt-3 border-t border-stone-800">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-stone-800 rounded-xl bg-stone-950 px-2 py-1.5">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-1 text-stone-400 hover:text-white"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-1 text-stone-400 hover:text-white"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-900/30"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border border-stone-800 transition ${
                  inWishlist
                    ? "bg-rose-500/20 text-rose-400 border-rose-500/50"
                    : "bg-stone-950 text-stone-400 hover:text-white hover:bg-stone-800"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>Express Worldwide Shipping</span>
              </div>
              <Link
                href={`/product/${quickViewProduct.id}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 underline underline-offset-4"
              >
                Full Details & Specs &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
