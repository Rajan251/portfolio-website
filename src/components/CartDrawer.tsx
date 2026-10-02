"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isCartOpen) return null;

  const freeShippingThreshold = 250;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setCouponCode("");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 text-stone-100 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-serif tracking-wide text-white">Your Shopping Bag</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-6 py-3.5 bg-stone-950/70 border-b border-stone-800/80">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className="text-stone-300">
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-amber-400 font-semibold">✨ You have unlocked Complimentary Express Delivery!</span>
                ) : (
                  <>Add <span className="text-amber-300 font-semibold">${amountNeededForFreeShipping.toFixed(2)}</span> more for Free Delivery</>
                )}
              </span>
              <span className="text-stone-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-600 via-amber-400 to-amber-300 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-stone-800/60">
            {cart.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-stone-800/50 flex items-center justify-center mb-4 text-stone-500">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-serif text-white mb-1">Your bag is currently empty</h3>
                <p className="text-sm text-stone-400 max-w-xs mb-6 font-light">
                  Explore our curated catalog of horology, leather goods, and acoustic creations.
                </p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-amber-500 text-stone-950 text-sm font-semibold hover:bg-amber-400 transition shadow-lg shadow-amber-900/30"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="py-4 flex gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-sm font-medium text-stone-200 hover:text-amber-300 transition line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                          className="text-stone-500 hover:text-rose-400 transition p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                        {item.selectedColor && (
                          <span className="inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-stone-400" />
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-800 bg-stone-950/60 rounded-lg p-0.5">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)
                          }
                          className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-stone-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)
                          }
                          className="p-1 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-semibold text-stone-100">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="px-6 py-5 bg-stone-950 border-t border-stone-800 space-y-4">
              {/* Coupon Field */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between px-3 py-2 bg-amber-950/30 border border-amber-800/60 rounded-lg text-xs">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Code <strong>{appliedCoupon.code}</strong> applied (-{appliedCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-stone-400 hover:text-rose-400 text-xs font-medium underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Privilege code (try: LUXE20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-rose-400 text-xs">{couponError}</p>}

              {/* Order breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400 border-t border-stone-800/70 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 font-medium">${cartSubtotal.toLocaleString()}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Privilege Discount</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-stone-200">
                    {cartShipping === 0 ? <span className="text-amber-400 font-semibold">Free</span> : `$${cartShipping}.00`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-stone-800/80">
                  <span>Total</span>
                  <span className="text-amber-300 font-serif text-lg">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-amber-900/20 group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-between text-xs text-stone-400 pt-1">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="hover:text-amber-300 underline underline-offset-4 transition"
                  >
                    View Bag Full Details
                  </Link>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400/80" />
                    <span>256-bit Secure Encryption</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
