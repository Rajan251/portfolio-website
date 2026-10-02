"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";
import { customerReviews } from "@/data/reviews";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronRight,
  Sparkles,
  Share2,
  Clock,
  Layers,
  HelpCircle
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const { products, addToCart, toggleWishlist, isInWishlist, showToast } = useStore();

  const product = products.find((p) => p.id === productId) || products[0];

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ""
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ""
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "features" | "shipping" | "reviews">("specs");
  const [isCopied, setIsCopied] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.tagline,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setIsCopied(true);
      showToast("Direct product link copied to clipboard!", "success");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Related products from same or adjacent categories
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen">
      {/* Breadcrumb Navigation */}
      <nav className="border-b border-stone-800/80 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center text-xs text-stone-400 gap-2 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-amber-300 transition">Maison</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
          <Link href="/shop" className="hover:text-amber-300 transition">Collection</Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-amber-300 transition">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-600 shrink-0" />
          <span className="text-stone-200 font-medium truncate max-w-xs">{product.name}</span>
        </div>
      </nav>

      {/* Main Product Presentation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-3xl overflow-hidden bg-stone-900 border border-stone-800/90 shadow-2xl group">
              <Image
                src={product.images[activeImgIdx] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {product.discountPercentage && (
                <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-rose-600/90 backdrop-blur-md text-white font-bold text-xs shadow-md">
                  Privilege -{product.discountPercentage}%
                </div>
              )}

              {/* Share button */}
              <button
                onClick={handleShare}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white backdrop-blur-md transition shadow-md"
                title="Share piece"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImgIdx === idx
                        ? "border-amber-400 scale-[1.02] shadow-lg shadow-amber-950/40"
                        : "border-stone-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurances Under Gallery */}
            <div className="mt-4 grid grid-cols-3 gap-4 p-4 rounded-2xl bg-stone-900/40 border border-stone-800/60 text-center">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-semibold text-stone-200">Express Transit</span>
                <span className="text-[10px] text-stone-500">Ships in 24 hours</span>
              </div>
              <div className="flex flex-col items-center border-x border-stone-800">
                <ShieldCheck className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-semibold text-stone-200">5-Yr Atelier Guarantee</span>
                <span className="text-[10px] text-stone-500">Global warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-amber-400 mb-1" />
                <span className="text-[11px] font-semibold text-stone-200">30-Day Returns</span>
                <span className="text-[10px] text-stone-500">Complimentary courier</span>
              </div>
            </div>
          </div>

          {/* Right Column: Purchasing & Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-amber-400 uppercase tracking-widest font-semibold mb-2">
                <span>{product.category}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {product.inStock ? `In Stock (${product.stockCount} units)` : "Made to order"}
                </span>
              </div>

              {/* Title & Tagline */}
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                {product.name}
              </h1>
              <p className="text-stone-400 text-sm font-light mt-2 leading-relaxed">
                {product.tagline}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4 text-xs text-stone-400">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-current" : "text-stone-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-white">{product.rating}</span>
                <span>•</span>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className="hover:text-amber-300 underline underline-offset-4"
                >
                  {product.reviewCount} Connoisseur Reviews
                </button>
              </div>

              {/* Pricing Section */}
              <div className="mt-6 p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl font-semibold text-amber-300">
                    ${product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-stone-500 text-lg line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="text-xs px-2.5 py-1 rounded-md bg-rose-900/60 border border-rose-700/50 text-rose-300 font-semibold">
                      Save ${(product.originalPrice! - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Klarna / Installment preview */}
                <p className="text-xs text-stone-400 mt-2 font-light">
                  Or 4 interest-free payments of{" "}
                  <strong className="text-stone-200">${(product.price / 4).toFixed(2)}</strong> with{" "}
                  <span className="text-stone-300 font-semibold">Klarna</span>.
                </p>
              </div>

              {/* Color Swatch Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="uppercase tracking-wider text-stone-300 font-semibold">
                      Atelier Colorway: <span className="text-amber-300 font-normal">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`relative w-9 h-9 rounded-full border-2 transition-all p-0.5 ${
                          selectedColor === c.name
                            ? "border-amber-400 scale-110 shadow-lg shadow-amber-950/50"
                            : "border-stone-700 hover:border-stone-500"
                        }`}
                        title={c.name}
                      >
                        <span
                          className="block w-full h-full rounded-full"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes / Dimensions Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="uppercase tracking-wider text-stone-300 font-semibold">
                      Case / Dimension: <span className="text-amber-300 font-normal">{selectedSize}</span>
                    </span>
                    <button className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1">
                      <HelpCircle className="w-3 h-3" />
                      <span>Sizing Guide</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                          selectedSize === s
                            ? "bg-amber-400 text-stone-950 border-amber-400 shadow-md"
                            : "border-stone-800 text-stone-300 hover:border-stone-600 bg-stone-900/60"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & CTAs */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-800 bg-stone-900/80 rounded-2xl p-1 shrink-0">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-stone-400 hover:text-white text-base font-semibold"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-stone-100">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-2 text-stone-400 hover:text-white text-base font-semibold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-xl shadow-amber-950/40"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Shopping Bag</span>
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3.5 rounded-2xl border transition ${
                      inWishlist
                        ? "bg-rose-500/20 text-rose-400 border-rose-500/50"
                        : "bg-stone-900 border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800"
                    }`}
                    title="Save to wishlist"
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 rounded-2xl bg-stone-900 hover:bg-stone-800 text-amber-300 border border-stone-700 font-semibold text-sm flex items-center justify-center gap-2 transition"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Instant Express Checkout</span>
                </button>
              </div>
            </div>

            {/* SKU and Dispatch info */}
            <div className="pt-6 border-t border-stone-800/80 text-xs text-stone-500 flex justify-between items-center">
              <span>Maison SKU: {product.sku}</span>
              <span className="flex items-center gap-1 text-stone-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Next dispatch in 3 hrs 40 mins</span>
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Specifications, Features, Shipping, Reviews */}
        <div className="mt-20 pt-10 border-t border-stone-800">
          <div className="flex items-center gap-4 sm:gap-8 border-b border-stone-800 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("specs")}
              className={`py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
                activeTab === "specs"
                  ? "text-amber-400 border-amber-400"
                  : "text-stone-400 border-transparent hover:text-white"
              }`}
            >
              Atelier Specifications
            </button>
            <button
              onClick={() => setActiveTab("features")}
              className={`py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
                activeTab === "features"
                  ? "text-amber-400 border-amber-400"
                  : "text-stone-400 border-transparent hover:text-white"
              }`}
            >
              Key Innovations
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
                activeTab === "shipping"
                  ? "text-amber-400 border-amber-400"
                  : "text-stone-400 border-transparent hover:text-white"
              }`}
            >
              Delivery & White-Glove Care
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition border-b-2 whitespace-nowrap ${
                activeTab === "reviews"
                  ? "text-amber-400 border-amber-400"
                  : "text-stone-400 border-transparent hover:text-white"
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-8">
            {/* 1. Specifications Tab */}
            {activeTab === "specs" && (
              <div className="max-w-3xl">
                <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                  {product.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([label, val]) => (
                    <div
                      key={label}
                      className="p-4 rounded-xl bg-stone-900/50 border border-stone-800/80 flex flex-col"
                    >
                      <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                        {label}
                      </span>
                      <span className="text-sm font-medium text-stone-200 mt-1">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Key Innovations Tab */}
            {activeTab === "features" && (
              <div className="max-w-3xl space-y-4">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-stone-900/40 border border-stone-800/80 flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-200 font-medium">{feat}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 3. Delivery Tab */}
            {activeTab === "shipping" && (
              <div className="max-w-2xl space-y-4 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                <div className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-3">
                  <h4 className="font-semibold text-white uppercase tracking-wider text-xs">
                    Insured International Courier Delivery
                  </h4>
                  <p>
                    Every Lumière creation is individually inspected, registered in our atelier archive, and packaged in protective archival presentation boxes.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-stone-400">
                    <li>FedEx Express Priority: 2–3 business days</li>
                    <li>Complimentary White-Glove signature delivery for orders above $250</li>
                    <li>Full transit insurance with real-time GPS tracking</li>
                  </ul>
                </div>
              </div>
            )}

            {/* 4. Customer Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {customerReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-stone-500 text-xs">{rev.date}</span>
                      </div>
                      <h4 className="font-serif text-base text-white font-medium">
                        &ldquo;{rev.title}&rdquo;
                      </h4>
                      <p className="text-xs text-stone-300 leading-relaxed font-light">
                        {rev.comment}
                      </p>
                      <div className="pt-2 text-xs font-semibold text-amber-300">
                        {rev.author} • Verified Patron
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Creations Carousel / Grid */}
        <div className="mt-20 pt-10 border-t border-stone-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Harmonious Pairings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                You May Also Appreciate
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-white"
            >
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
