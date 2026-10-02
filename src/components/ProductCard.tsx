"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { Heart, ShoppingBag, Eye, Star, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-stone-900/60 rounded-2xl border border-stone-800/80 overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-950">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className={`object-cover transition-opacity duration-500 absolute inset-0 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-stone-950 rounded-md shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-stone-100 text-stone-900 rounded-md shadow-sm">
              New Arrival
            </span>
          )}
          {product.discountPercentage && (
            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white rounded-md shadow-sm">
              -{product.discountPercentage}%
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleToggleWishlist}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 ${
              inWishlist
                ? "bg-rose-500 text-white shadow-lg shadow-rose-900/40"
                : "bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
          </button>
          
          <button
            onClick={handleQuickView}
            className="w-9 h-9 rounded-full bg-stone-900/80 text-stone-300 hover:text-white hover:bg-stone-800 backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Quick preview"
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Add To Bag Bar (slides up on hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg backdrop-blur-md transition-all ${
              addedAnim
                ? "bg-emerald-600 text-white"
                : "bg-stone-950/90 hover:bg-amber-400 text-white hover:text-stone-950 border border-stone-800"
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Details info */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-amber-400/90 font-medium tracking-wider uppercase text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-stone-400 text-[11px]">
              <Star className="w-3 h-3 text-amber-400 fill-current" />
              <span>{product.rating}</span>
              <span className="text-stone-600">({product.reviewCount})</span>
            </div>
          </div>

          <Link href={`/product/${product.id}`}>
            <h3 className="text-stone-100 font-medium text-sm hover:text-amber-300 transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-stone-400 text-xs line-clamp-1 font-light mb-3">
            {product.tagline}
          </p>
        </div>

        {/* Footer info: price and swatches */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
          <div className="flex items-baseline gap-2">
            <span className="text-stone-100 font-semibold text-base font-serif">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-stone-500 text-xs line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-stone-700/60"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-stone-500">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
