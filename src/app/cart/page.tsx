"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowLeft
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    seedDemoCart
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setInputCoupon("");
    }
  };

  const freeShippingThreshold = 250;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb / Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-stone-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Review Your Selection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Your Shopping Bag
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs text-stone-400">
            <span>{cart.reduce((a, b) => a + b.quantity, 0)} Items in Bag</span>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-stone-500 hover:text-rose-400 transition underline underline-offset-4"
              >
                Clear Entire Bag
              </button>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty State */
          <div className="py-24 text-center max-w-md mx-auto flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mb-6 shadow-xl">
              <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl text-white mb-2">
              Your shopping bag is currently unoccupied
            </h2>
            <p className="text-stone-400 text-sm font-light mb-8 leading-relaxed">
              Explore our collection of fine acoustic monitors, Swiss horology, and Florentine leather accessories.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Link
                href="/shop"
                className="flex-1 py-3.5 px-6 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <span>Discover Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={seedDemoCart}
                className="flex-1 py-3.5 px-6 rounded-full bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Pre-load Demo Goods</span>
              </button>
            </div>
          </div>
        ) : (
          /* Populated Cart Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
            
            {/* Left 8 Cols: Item List */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free shipping banner */}
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-stone-300 font-medium">
                    {amountNeeded === 0 ? (
                      <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        You have unlocked Complimentary Insured Express Delivery!
                      </span>
                    ) : (
                      <>
                        Add <span className="text-amber-300 font-semibold">${amountNeeded.toFixed(2)}</span> more to unlock Free Express Delivery
                      </>
                    )}
                  </span>
                  <span className="text-stone-400 text-xs font-mono">{progressPercent}%</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items Table / Cards */}
              <div className="divide-y divide-stone-800/80 border-t border-b border-stone-800/80">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                    className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
                  >
                    {/* Thumbnail & Description */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <span className="text-[11px] uppercase tracking-wider text-amber-400 font-medium">
                          {item.product.category}
                        </span>
                        <Link
                          href={`/product/${item.product.id}`}
                          className="block text-base font-serif text-white hover:text-amber-300 transition truncate max-w-sm mt-0.5"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center gap-3 text-xs text-stone-400 mt-1">
                          {item.selectedColor && (
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400" />
                              {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                          <span className="text-stone-600">|</span>
                          <span className="font-mono text-stone-300">
                            ${item.product.price.toLocaleString()} each
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price & Remove */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                      <div className="flex items-center border border-stone-800 bg-stone-900 rounded-xl p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)
                          }
                          className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-stone-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)
                          }
                          className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-24">
                        <span className="font-serif text-lg font-semibold text-white">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-stone-500 hover:text-rose-400 transition p-2"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-amber-300 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right 4 Cols: Order Summary & Coupon */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-6">
                <h3 className="font-serif text-xl text-white font-normal pb-4 border-b border-stone-800">
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Privilege Code
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-amber-950/30 border border-amber-800/60 rounded-xl text-xs">
                      <div className="flex items-center gap-2 text-amber-300">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Code <strong>{appliedCoupon.code}</strong> (-{appliedCoupon.discountPercent}%)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-stone-400 hover:text-rose-400 underline text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. LUXE20 or WELCOME15"
                          value={inputCoupon}
                          onChange={(e) => setInputCoupon(e.target.value)}
                          className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 uppercase"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-xl transition"
                        >
                          Apply
                        </button>
                      </div>
                      {couponError && <p className="text-rose-400 text-xs">{couponError}</p>}
                      <div className="text-[11px] text-stone-500">
                        Try sample privilege codes: <span className="text-amber-400/80 font-mono font-bold">LUXE20</span> (20% off) or <span className="text-amber-400/80 font-mono font-bold">WELCOME15</span>
                      </div>
                    </form>
                  )}
                </div>

                {/* Calculations */}
                <div className="space-y-3 text-xs text-stone-300 border-t border-stone-800 pt-4">
                  <div className="flex justify-between">
                    <span>Atelier Subtotal</span>
                    <span className="font-semibold text-white">${cartSubtotal.toLocaleString()}</span>
                  </div>

                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-amber-400">
                      <span>Privilege Discount ({appliedCoupon?.code})</span>
                      <span>-${cartDiscount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Insured Transit</span>
                    <span>
                      {cartShipping === 0 ? (
                        <span className="text-amber-400 font-semibold">Complimentary</span>
                      ) : (
                        `$${cartShipping}.00`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Duties & Tax</span>
                    <span className="text-stone-400 font-light">Calculated at checkout</span>
                  </div>

                  <div className="flex justify-between items-baseline text-base font-semibold text-white pt-4 border-t border-stone-800">
                    <span className="font-serif">Estimated Total</span>
                    <span className="font-serif text-2xl text-amber-300">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-xl shadow-amber-950/40 group"
                >
                  <span>Proceed to Bespoke Checkout</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Trust Assurances */}
                <div className="pt-2 border-t border-stone-800/80 space-y-2 text-[11px] text-stone-400 font-light">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>256-bit Bank Grade SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Dispatched in tamper-evident archival presentation boxes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
