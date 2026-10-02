"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  User,
  Package,
  Heart,
  MapPin,
  Compass,
  Award,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  Truck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  ShieldCheck,
  ShoppingBag
} from "lucide-react";

function AccountContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as any) || "orders";

  const {
    user,
    orders,
    wishlist,
    products,
    addToCart,
    toggleWishlist,
    addAddress,
    deleteAddress
  } = useStore();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "tracking" | "wishlist" | "addresses">("orders");
  const [selectedOrderTracking, setSelectedOrderTracking] = useState(orders[0]?.id || "LUM-94281");
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // New address form state
  const [newAddr, setNewAddr] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
    isDefault: false
  });

  React.useEffect(() => {
    const t = searchParams.get("tab");
    if (t && ["overview", "orders", "tracking", "wishlist", "addresses"].includes(t)) {
      setActiveTab(t as any);
    }
  }, [searchParams]);

  const activeTrackingOrder = orders.find((o) => o.id === selectedOrderTracking) || orders[0];

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.street) return;
    addAddress(newAddr);
    setIsAddingAddress(false);
    setNewAddr({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      isDefault: false
    });
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* VIP Account Header Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900/80 to-stone-950 border border-amber-500/30 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg">
              <Image src={user.avatar} alt={user.name} fill className="object-cover" />
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>{user.tier}</span>
              </div>
              <h1 className="font-serif text-3xl text-white font-normal">{user.name}</h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  {user.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-stone-500" />
                  Patron since {user.memberSince}
                </span>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 border-t sm:border-t-0 sm:border-l border-stone-800 pt-4 sm:pt-0 sm:pl-6 text-center sm:text-left">
              <div>
                <span className="text-stone-500 uppercase tracking-wider text-[10px] block font-semibold">Total Orders</span>
                <span className="font-serif text-2xl text-white font-semibold">{orders.length}</span>
              </div>
              <div>
                <span className="text-stone-500 uppercase tracking-wider text-[10px] block font-semibold">Saved Pieces</span>
                <span className="font-serif text-2xl text-amber-400 font-semibold">{wishlist.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-px mb-8 overflow-x-auto">
          {[
            { id: "orders", label: "Acquisition History", icon: Package },
            { id: "tracking", label: "Live Order Tracking", icon: Compass },
            { id: "wishlist", label: "Private Wishlist", icon: Heart },
            { id: "addresses", label: "Saved Residences", icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap ${
                  isActive
                    ? "bg-amber-400 text-stone-950 shadow-md"
                    : "text-stone-400 hover:text-white hover:bg-stone-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === "wishlist" && wishlist.length > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-stone-950 text-amber-300" : "bg-stone-800 text-stone-300"}`}>
                    {wishlist.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div>
          {/* 1. Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="py-16 text-center bg-stone-900/30 rounded-2xl border border-stone-800">
                  <p className="text-stone-400 text-sm">No acquisitions registered yet.</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 shadow-xl space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800/80 gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-amber-400 tracking-wider">
                            {ord.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              ord.status === "Delivered"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                                : ord.status === "Shipped"
                                ? "bg-sky-950 text-sky-400 border border-sky-800"
                                : "bg-amber-950 text-amber-400 border border-amber-800"
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                        <span className="text-xs text-stone-400 block mt-1">Acquired on {ord.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setSelectedOrderTracking(ord.id);
                            setActiveTab("tracking");
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium flex items-center gap-1.5 transition"
                        >
                          <Compass className="w-3.5 h-3.5 text-amber-400" />
                          <span>Track Parcel</span>
                        </button>
                        <span className="font-serif text-lg font-semibold text-white">
                          ${ord.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {ord.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-2xl bg-stone-950/60 border border-stone-800/60"
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                            <Image src={it.image} alt={it.name} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs text-stone-200 font-medium truncate">{it.name}</h4>
                            <span className="text-[11px] text-stone-400">Qty: {it.quantity}</span>
                            <span className="block font-serif text-xs font-semibold text-amber-300 mt-0.5">
                              ${it.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-stone-800 text-xs text-stone-400 gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Dispatched to {ord.shippingAddress.street}, {ord.shippingAddress.city}</span>
                      </div>
                      <span className="font-mono text-[11px] text-stone-500">Carrier: {ord.carrier}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 2. Order Tracking Tab */}
          {activeTab === "tracking" && activeTrackingOrder && (
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-800 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                      Real-Time GPS Waypoint
                    </span>
                    <h2 className="font-serif text-2xl text-white font-normal mt-1">
                      Tracking Order {activeTrackingOrder.id}
                    </h2>
                    <p className="text-xs text-stone-400 mt-1">
                      Carrier: <strong className="text-stone-200">{activeTrackingOrder.carrier}</strong> • Tracking #{activeTrackingOrder.trackingNumber}
                    </p>
                  </div>

                  {/* Order Selector */}
                  {orders.length > 1 && (
                    <select
                      value={selectedOrderTracking}
                      onChange={(e) => setSelectedOrderTracking(e.target.value)}
                      className="bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2"
                    >
                      {orders.map((o) => (
                        <option key={o.id} value={o.id}>
                          Order {o.id} ({o.status})
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Visual Progress Stepper */}
                <div className="py-6">
                  <div className="relative flex items-center justify-between max-w-3xl mx-auto">
                    {/* Connecting Bar */}
                    <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-stone-800 z-0" />
                    <div
                      className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-amber-400 z-0 transition-all duration-700"
                      style={{
                        width:
                          activeTrackingOrder.status === "Delivered"
                            ? "100%"
                            : activeTrackingOrder.status === "Shipped"
                            ? "66%"
                            : "33%"
                      }}
                    />

                    {/* Step 1: Placed */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-xs shadow-lg">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-white mt-2">Order Confirmed</span>
                      <span className="text-[10px] text-stone-400">Atelier Registrar</span>
                    </div>

                    {/* Step 2: Packaging */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center font-bold text-xs shadow-lg">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-white mt-2">Bespoke Boxing</span>
                      <span className="text-[10px] text-stone-400">Inspected & Sealed</span>
                    </div>

                    {/* Step 3: In Transit */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-lg ${
                          activeTrackingOrder.status === "Shipped" || activeTrackingOrder.status === "Delivered"
                            ? "bg-amber-400 text-stone-950"
                            : "bg-stone-800 text-stone-500"
                        }`}
                      >
                        <Truck className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-white mt-2">In Transit</span>
                      <span className="text-[10px] text-stone-400">FedEx Air Hub</span>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-lg ${
                          activeTrackingOrder.status === "Delivered"
                            ? "bg-emerald-500 text-stone-950"
                            : "bg-stone-800 text-stone-500"
                        }`}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-white mt-2">Delivered</span>
                      <span className="text-[10px] text-stone-400">Signed & Received</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Carrier Log */}
                <div className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 space-y-3">
                  <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                    Recent Transit Milestones
                  </h4>
                  <div className="space-y-3 text-xs divide-y divide-stone-800/80">
                    <div className="pt-2 flex justify-between items-center text-stone-300">
                      <span>Departed sorting facility — JFK International Airport</span>
                      <span className="text-stone-500 font-mono text-[11px]">Today, 08:42 AM</span>
                    </div>
                    <div className="pt-2 flex justify-between items-center text-stone-300">
                      <span>Customs clearance confirmed & authenticated</span>
                      <span className="text-stone-500 font-mono text-[11px]">Yesterday, 04:15 PM</span>
                    </div>
                    <div className="pt-2 flex justify-between items-center text-stone-300">
                      <span>Dispatched from Florence Atelier</span>
                      <span className="text-stone-500 font-mono text-[11px]">April 01, 11:20 AM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. Wishlist Tab */}
          {activeTab === "wishlist" && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="py-20 text-center bg-stone-900/40 rounded-3xl border border-stone-800 flex flex-col items-center">
                  <Heart className="w-12 h-12 text-stone-600 mb-3 stroke-[1.5]" />
                  <h3 className="font-serif text-xl text-white mb-1">Your wishlist is currently clear</h3>
                  <p className="text-stone-400 text-xs sm:text-sm mb-6 font-light max-w-sm">
                    Tap the heart icon on any piece across the catalog to save it to your private portfolio.
                  </p>
                  <Link
                    href="/shop"
                    className="px-6 py-2.5 bg-amber-400 text-stone-950 rounded-full text-xs font-semibold hover:bg-amber-300"
                  >
                    Explore Atelier Catalog
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-950 mb-4">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">
                          {p.category}
                        </span>
                        <h4 className="font-serif text-base text-white font-medium mt-0.5 line-clamp-1">
                          {p.name}
                        </h4>
                        <span className="font-serif text-lg font-semibold text-amber-300 block mt-1">
                          ${p.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-stone-800 mt-4">
                        <button
                          onClick={() => addToCart(p, 1)}
                          className="flex-1 py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          className="p-2.5 bg-stone-950 hover:bg-stone-800 text-stone-400 hover:text-rose-400 rounded-xl border border-stone-800 transition"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 4. Saved Residences Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  Registered Delivery Destinations
                </span>
                <button
                  onClick={() => setIsAddingAddress(true)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add New Residence</span>
                </button>
              </div>

              {isAddingAddress && (
                <form
                  onSubmit={handleCreateAddress}
                  className="p-6 rounded-3xl bg-stone-900/90 border border-amber-500/40 space-y-4 max-w-xl"
                >
                  <h3 className="font-serif text-lg text-white">Add Delivery Address</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Address Label (e.g. Tribeca Loft)"
                      required
                      value={newAddr.name}
                      onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                    <input
                      type="text"
                      placeholder="Street Address & Apt"
                      required
                      value={newAddr.street}
                      onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={newAddr.city}
                        onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                      />
                      <input
                        type="text"
                        placeholder="State / Province"
                        required
                        value={newAddr.state}
                        onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                        className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-amber-400 text-stone-950 font-semibold text-xs rounded-xl"
                    >
                      Save Residence
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2.5 text-stone-400 hover:text-white text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {user.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm text-white">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
                            Primary
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 leading-relaxed font-light">
                        {addr.street}
                        <br />
                        {addr.city}, {addr.state} {addr.zip}
                        <br />
                        {addr.country}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-stone-800 mt-4 text-xs">
                      <span className="text-stone-500">Secure Courier Verified</span>
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-stone-500 hover:text-rose-400 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-400">
          Loading VIP Account...
        </div>
      }
    >
      <AccountContent />
    </Suspense>
  );
}
