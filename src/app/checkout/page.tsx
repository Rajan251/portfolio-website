"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useStore } from "@/context/StoreContext";
import { Order } from "@/types";
import {
  ShieldCheck,
  Lock,
  Truck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShoppingBag,
  Printer,
  Compass
} from "lucide-react";

export default function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    placeOrder,
    user,
    seedDemoCart
  } = useStore();

  // Form State
  const [formData, setFormData] = useState({
    email: user.email,
    firstName: "Alexander",
    lastName: "Wright",
    phone: user.phone,
    street: "740 Park Avenue, Penthouse B",
    city: "New York",
    state: "NY",
    zip: "10021",
    country: "United States",
    saveAddress: true
  });

  const [shippingMethod, setShippingMethod] = useState<{ id: string; name: string; rate: number; time: string }>({
    id: "standard",
    name: "Complimentary Insured Transit",
    rate: 0,
    time: "3–4 Business Days"
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "applepay" | "paypal">("card");
  const [cardDetails, setCardDetails] = useState({
    number: "4242 •••• •••• 8821",
    expiry: "09/28",
    cvc: "389",
    nameOnCard: "Alexander Wright"
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const shippingRate = shippingMethod.rate;
  const orderFinalTotal = Math.max(0, cartSubtotal - cartDiscount + shippingRate);

  const fillDemoAddress = () => {
    setFormData({
      email: "a.wright@manhattan-capital.com",
      firstName: "Alexander",
      lastName: "Wright",
      phone: "+1 (212) 555-0198",
      street: "740 Park Avenue, Penthouse B",
      city: "New York",
      state: "NY",
      zip: "10021",
      country: "United States",
      saveAddress: true
    });
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const order = placeOrder(
        formData,
        paymentMethod === "card"
          ? `Mastercard •••• ${cardDetails.number.slice(-4)}`
          : paymentMethod === "applepay"
          ? "Apple Pay (Express)"
          : "PayPal Connoisseur",
        shippingRate
      );

      setCompletedOrder(order);
      setIsProcessing(false);

      // Trigger celebratory confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#d4af37", "#f59e0b", "#10b981", "#ffffff"]
        });
      } catch {}
    }, 1400);
  };

  // If order was just placed, display Order Success Screen
  if (completedOrder) {
    return (
      <div className="bg-stone-950 text-stone-100 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-stone-900/80 border border-amber-500/40 rounded-3xl p-8 sm:p-12 shadow-2xl text-center space-y-6">
            
            {/* Animated Checkmark Badge */}
            <div className="w-20 h-20 rounded-full bg-amber-400/10 border-2 border-amber-400 text-amber-400 flex items-center justify-center mx-auto shadow-xl shadow-amber-950/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Bespoke Acquisition Confirmed
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                Thank You, {completedOrder.shippingAddress.fullName.split(" ")[0]}
              </h1>
              <p className="text-stone-300 text-sm font-light max-w-md mx-auto">
                Your acquisition has been cataloged in our atelier ledger under reference number:
              </p>
              <div className="inline-block bg-stone-950 border border-stone-800 px-5 py-2.5 rounded-xl font-mono text-amber-400 font-bold text-base tracking-wider mt-2">
                {completedOrder.id}
              </div>
            </div>

            {/* Order Dispatch Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-stone-950/80 border border-stone-800 text-left text-xs">
              <div>
                <span className="text-stone-500 uppercase tracking-wider block text-[10px] mb-1 font-semibold">
                  Carrier & Tracking
                </span>
                <span className="font-medium text-stone-200">{completedOrder.carrier}</span>
                <span className="block font-mono text-[11px] text-amber-400/90 mt-0.5">
                  {completedOrder.trackingNumber}
                </span>
              </div>
              <div>
                <span className="text-stone-500 uppercase tracking-wider block text-[10px] mb-1 font-semibold">
                  Estimated Dispatch
                </span>
                <span className="font-medium text-stone-200">{completedOrder.estimatedDelivery}</span>
                <span className="block text-[11px] text-stone-400 mt-0.5">Direct White-Glove</span>
              </div>
              <div>
                <span className="text-stone-500 uppercase tracking-wider block text-[10px] mb-1 font-semibold">
                  Destination
                </span>
                <span className="font-medium text-stone-200 truncate block">
                  {completedOrder.shippingAddress.street}
                </span>
                <span className="block text-[11px] text-stone-400 mt-0.5">
                  {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state} {completedOrder.shippingAddress.zip}
                </span>
              </div>
            </div>

            {/* Itemized Receipt */}
            <div className="border-t border-stone-800 pt-6 text-left">
              <h3 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-4">
                Purchased Pieces ({completedOrder.items.length})
              </h3>
              <div className="divide-y divide-stone-800/80">
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shrink-0">
                        <Image src={it.image} alt={it.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm text-stone-100 font-medium line-clamp-1">{it.name}</h4>
                        <span className="text-xs text-stone-400">Qty: {it.quantity} {it.color ? `• ${it.color}` : ""}</span>
                      </div>
                    </div>
                    <span className="font-serif text-sm font-semibold text-white">
                      ${(it.price * it.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-stone-800 space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${completedOrder.subtotal.toLocaleString()}</span>
                </div>
                {completedOrder.discount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount</span>
                    <span>-${completedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Transit</span>
                  <span>{completedOrder.shipping === 0 ? "Complimentary" : `$${completedOrder.shipping}.00`}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-stone-800">
                  <span className="font-serif">Total Paid</span>
                  <span className="font-serif text-amber-300 text-lg">${completedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions: Track order, print receipt, continue shopping */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <Link
                href="/account?tab=tracking"
                className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition"
              >
                <Compass className="w-4 h-4" />
                <span>Track Parcel Real-Time</span>
              </Link>
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <Link
                href="/shop"
                className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white text-xs font-semibold flex items-center justify-center transition"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If bag is empty before checkout
  if (cart.length === 0) {
    return (
      <div className="bg-stone-950 text-stone-100 min-h-screen py-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-400 mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl text-white mb-2">No items to checkout</h2>
          <p className="text-stone-400 text-xs sm:text-sm mb-6 font-light">
            Your shopping bag is empty. Pre-load our demo selection or browse the catalog.
          </p>
          <div className="flex flex-col gap-2.5">
            <button
              onClick={seedDemoCart}
              className="py-3 px-6 rounded-xl bg-amber-400 text-stone-950 font-semibold text-xs uppercase tracking-wider hover:bg-amber-300 transition"
            >
              Pre-load Demo Luxury Goods
            </button>
            <Link
              href="/shop"
              className="py-3 px-6 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-semibold hover:text-white"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title with Security Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-stone-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Encrypted Checkout Protocol</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Bespoke Acquisition
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fillDemoAddress}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-500/40 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fill Client Demo Address</span>
            </button>
            <Link
              href="/cart"
              className="text-xs text-stone-400 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bag</span>
            </Link>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
          
          {/* Left Column: Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Customer Information */}
            <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  1. Patron Contact
                </span>
                <span className="text-xs text-stone-500 font-mono">Step 1 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">
                    Telephone (For Courier Notification)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  2. Shipping Destination
                </span>
                <span className="text-xs text-stone-500 font-mono">Step 2 of 3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">Street Address & Suite</label>
                  <input
                    type="text"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">State</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method Options */}
              <div className="pt-4 border-t border-stone-800 space-y-2.5">
                <span className="block text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                  Select Transit Speed
                </span>
                
                {[
                  { id: "standard", name: "Complimentary Insured Courier", rate: 0, time: "3–4 Business Days" },
                  { id: "priority", name: "FedEx Priority Express", rate: 15, time: "1–2 Business Days" },
                  { id: "whiteglove", name: "Atelier White-Glove Concierge", rate: 35, time: "Next-Day Guaranteed" }
                ].map((meth) => (
                  <label
                    key={meth.id}
                    onClick={() => setShippingMethod(meth)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${
                      shippingMethod.id === meth.id
                        ? "bg-amber-400/10 border-amber-400 text-stone-100"
                        : "bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingOption"
                        checked={shippingMethod.id === meth.id}
                        onChange={() => setShippingMethod(meth)}
                        className="accent-amber-400"
                      />
                      <div>
                        <span className="text-xs font-semibold text-white block">{meth.name}</span>
                        <span className="text-[11px] text-stone-400">{meth.time}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold font-serif text-amber-300">
                      {meth.rate === 0 ? "Complimentary" : `$${meth.rate}.00`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Payment Method Simulation */}
            <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                  3. Payment Protocol
                </span>
                <span className="text-xs text-stone-500 font-mono">Step 3 of 3</span>
              </div>

              {/* Payment Selectors */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                    paymentMethod === "card"
                      ? "bg-amber-400 text-stone-950 border-amber-400"
                      : "bg-stone-950 text-stone-400 border-stone-800 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("applepay")}
                  className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                    paymentMethod === "applepay"
                      ? "bg-amber-400 text-stone-950 border-amber-400"
                      : "bg-stone-950 text-stone-400 border-stone-800 hover:text-white"
                  }`}
                >
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                    paymentMethod === "paypal"
                      ? "bg-amber-400 text-stone-950 border-amber-400"
                      : "bg-stone-950 text-stone-400 border-stone-800 hover:text-white"
                  }`}
                >
                  <span>PayPal</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === "card" ? (
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        required
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">CVC / CVV</label>
                      <input
                        type="text"
                        required
                        value={cardDetails.cvc}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5">Name On Card</label>
                    <input
                      type="text"
                      required
                      value={cardDetails.nameOnCard}
                      onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 text-center text-xs text-stone-400">
                  <span>
                    You will authenticate via <strong className="text-white">{paymentMethod === "applepay" ? "Apple Pay Touch/Face ID" : "PayPal One-Touch"}</strong> upon clicking Authorize.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-6 sticky top-28">
              <h3 className="font-serif text-xl text-white font-normal pb-4 border-b border-stone-800 flex items-center justify-between">
                <span>Acquisition Ledger</span>
                <span className="text-xs text-stone-400 font-sans font-normal">
                  {cart.reduce((a, b) => a + b.quantity, 0)} Items
                </span>
              </h3>

              {/* Items List */}
              <div className="divide-y divide-stone-800/80 max-h-72 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 shrink-0">
                        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs text-white font-medium truncate">{item.product.name}</h4>
                        <span className="text-[11px] text-stone-400">
                          Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ""}
                        </span>
                      </div>
                    </div>
                    <span className="font-serif text-sm font-semibold text-stone-200 shrink-0">
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals Breakdown */}
              <div className="space-y-2.5 text-xs text-stone-300 border-t border-stone-800 pt-4">
                <div className="flex justify-between">
                  <span>Atelier Subtotal</span>
                  <span className="font-medium text-white">${cartSubtotal.toLocaleString()}</span>
                </div>

                {cartDiscount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Privilege Coupon ({appliedCoupon?.code})</span>
                    <span>-${cartDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Transit Method</span>
                  <span>{shippingRate === 0 ? "Complimentary" : `$${shippingRate}.00`}</span>
                </div>

                <div className="flex justify-between items-baseline text-base font-semibold text-white pt-4 border-t border-stone-800">
                  <span className="font-serif">Grand Total</span>
                  <span className="font-serif text-2xl text-amber-300">${orderFinalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-sm flex items-center justify-center gap-2 transition duration-200 shadow-xl shadow-amber-950/40 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin" />
                    <span>Engraving Ledger Entry...</span>
                  </div>
                ) : (
                  <>
                    <span>Authorize & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 border-t border-stone-800/80 text-[11px] text-stone-500 text-center font-light">
                By confirming, you agree to our Maison Terms of Sale and authentic warranty registrar.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
