"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Product, Order } from "@/types";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Plus,
  CheckCircle2,
  AlertCircle,
  Truck,
  Eye,
  Filter,
  Search,
  X,
  Sparkles,
  BarChart3,
  Layers
} from "lucide-react";

export default function AdminDashboardPage() {
  const { products, orders, updateOrderStatus, addProduct, updateProduct, showToast } = useStore();

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "inventory">("overview");
  const [orderFilter, setOrderFilter] = useState<string>("All");
  const [productSearch, setProductSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newProd, setNewProd] = useState({
    name: "",
    tagline: "",
    description: "",
    price: 350,
    category: "Audio & Tech",
    stockCount: 25,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name) return;

    addProduct({
      name: newProd.name,
      tagline: newProd.tagline || "Handcrafted luxury design creation",
      description: newProd.description || "Masterpiece precision with bespoke materials.",
      price: Number(newProd.price),
      category: newProd.category,
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockCount: Number(newProd.stockCount),
      sku: `LUM-${newProd.category.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      images: [newProd.imageUrl],
      colors: [{ name: "Obsidian", hex: "#1c1c1e" }],
      specs: { Origin: "Atelier Handcrafted", Guarantee: "5-Year Manufacturer" },
      features: ["Precision crafted with premium materials", "Individually numbered in the atelier ledger"]
    });

    setIsAddModalOpen(false);
    setNewProd({
      name: "",
      tagline: "",
      description: "",
      price: 350,
      category: "Audio & Tech",
      stockCount: 25,
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"
    });
  };

  const filteredOrders =
    orderFilter === "All" ? orders : orders.filter((o) => o.status === orderFilter);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-stone-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Merchant Master Console • Live Operations</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              LUMIÈRE Atelier Executive Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <span>View Live Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </Link>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-semibold flex items-center gap-1.5 transition shadow-lg shadow-amber-950/40"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Creation</span>
            </button>
          </div>
        </div>

        {/* Executive KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 pb-10">
          <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs">
              <span className="uppercase tracking-wider font-semibold">Total Net Revenue</span>
              <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-semibold text-white">$128,450.00</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs previous 30 days</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs">
              <span className="uppercase tracking-wider font-semibold">Processed Orders</span>
              <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-semibold text-white">{1420 + orders.length}</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+12.1% fulfillment velocity</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs">
              <span className="uppercase tracking-wider font-semibold">Average Order Value</span>
              <div className="p-2 rounded-lg bg-sky-400/10 text-sky-400">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-semibold text-white">$564.20</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+6.8% premium conversion</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-2">
            <div className="flex items-center justify-between text-stone-400 text-xs">
              <span className="uppercase tracking-wider font-semibold">Registered Connoisseurs</span>
              <div className="p-2 rounded-lg bg-purple-400/10 text-purple-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="font-serif text-3xl font-semibold text-white">3,842</div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+22.5% VIP retention</span>
            </div>
          </div>
        </div>

        {/* Interactive SVG Sales Chart & Best Sellers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Sales Chart (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-stone-900/60 border border-stone-800 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                  Revenue Velocity
                </span>
                <h3 className="font-serif text-xl text-white font-normal mt-0.5">
                  Quarterly Trajectory Analysis
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300">Last 6 Months</span>
              </div>
            </div>

            {/* SVG Area & Bar Graph Visual */}
            <div className="relative h-64 w-full flex items-end justify-between gap-4 pt-6 px-4">
              {[
                { month: "Nov", val: 55, rev: "$68k" },
                { month: "Dec", val: 88, rev: "$112k" },
                { month: "Jan", val: 65, rev: "$82k" },
                { month: "Feb", val: 78, rev: "$98k" },
                { month: "Mar", val: 92, rev: "$119k" },
                { month: "Apr", val: 98, rev: "$128k" }
              ].map((bar, i) => (
                <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-amber-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.rev}
                  </span>
                  <div
                    className="w-full bg-gradient-to-t from-amber-600 via-amber-400 to-amber-300 rounded-t-xl transition-all duration-500 group-hover:brightness-125 group-hover:shadow-lg group-hover:shadow-amber-950/40"
                    style={{ height: `${bar.val}%` }}
                  />
                  <span className="text-xs text-stone-400 font-medium">{bar.month}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-800 flex justify-between items-center text-xs text-stone-400">
              <span>Peak Month: <strong>April 2026 ($128.4k)</strong></span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" /> Steady Growth Trajectory
              </span>
            </div>
          </div>

          {/* Best-Selling Creations (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                Leaderboard
              </span>
              <h3 className="font-serif text-xl text-white font-normal mt-0.5">
                Top Atelier Acquisitions
              </h3>
            </div>

            <div className="divide-y divide-stone-800/80">
              {products.slice(0, 4).map((p, idx) => (
                <div key={p.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-amber-400/90 w-4">
                      #{idx + 1}
                    </span>
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-950 shrink-0">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs text-white font-medium truncate">{p.name}</h4>
                      <span className="text-[11px] text-stone-400 font-mono">${p.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-stone-200 block">
                      ${(p.price * (24 - idx * 4)).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-500">{24 - idx * 4} acquisitions</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs for Tables: Orders vs Inventory */}
        <div className="flex items-center gap-3 border-b border-stone-800 pb-px mb-6">
          <button
            onClick={() => setActiveTab("orders")}
            className={`py-3 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "orders"
                ? "bg-amber-400 text-stone-950 shadow-md"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Live Order Management ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("inventory")}
            className={`py-3 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider transition ${
              activeTab === "inventory"
                ? "bg-amber-400 text-stone-950 shadow-md"
                : "text-stone-400 hover:text-white"
            }`}
          >
            Atelier Product Inventory ({products.length})
          </button>
        </div>

        {/* 1. Orders Management Table */}
        {activeTab === "orders" && (
          <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Real-Time Acquisition Ledger
              </span>

              {/* Status Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-stone-400">Filter Status:</span>
                {["All", "Processing", "Shipped", "Delivered"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1 rounded-lg transition ${
                      orderFilter === st
                        ? "bg-stone-800 text-amber-300 font-semibold border border-stone-700"
                        : "text-stone-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="border-b border-stone-800 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Patron & Destination</th>
                    <th className="py-3 px-4">Pieces</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-stone-800/30 transition">
                      <td className="py-4 px-4 font-mono font-bold text-amber-400">
                        {ord.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-white">{ord.shippingAddress.fullName}</div>
                        <span className="text-[11px] text-stone-400">
                          {ord.shippingAddress.city}, {ord.shippingAddress.state}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span>{ord.items.length} piece(s)</span>
                      </td>
                      <td className="py-4 px-4 text-stone-400">{ord.date}</td>
                      <td className="py-4 px-4 font-serif text-white font-semibold">
                        ${ord.total.toFixed(2)}
                      </td>
                      <td className="py-4 px-4">
                        {/* Status Updater Dropdown */}
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                          className={`text-xs rounded-lg px-2.5 py-1 font-semibold border bg-stone-950 cursor-pointer ${
                            ord.status === "Delivered"
                              ? "text-emerald-400 border-emerald-800/60"
                              : ord.status === "Shipped"
                              ? "text-sky-400 border-sky-800/60"
                              : "text-amber-400 border-amber-800/60"
                          }`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 2. Product Inventory Table */}
        {activeTab === "inventory" && (
          <div className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                Catalog & Stock Allocation
              </span>

              {/* Search filter */}
              <div className="w-full sm:w-64 relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter inventory..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-300">
                <thead className="border-b border-stone-800 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Creation</th>
                    <th className="py-3 px-4">Discipline</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Retail Price</th>
                    <th className="py-3 px-4">Stock Count</th>
                    <th className="py-3 px-4">Availability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-800/30 transition">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-950 shrink-0">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <Link href={`/product/${p.id}`} className="font-semibold text-white hover:text-amber-300 transition line-clamp-1">
                            {p.name}
                          </Link>
                          <span className="text-[11px] text-stone-500 font-light line-clamp-1">{p.tagline}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-amber-300/90">{p.category}</td>
                      <td className="py-3 px-4 font-mono text-stone-400">{p.sku}</td>
                      <td className="py-3 px-4 font-serif text-white font-semibold">
                        ${p.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-mono text-stone-200">{p.stockCount} units</span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition ${
                            p.inStock
                              ? "bg-emerald-950/60 text-emerald-400 border-emerald-800"
                              : "bg-rose-950/60 text-rose-400 border-rose-800"
                          }`}
                        >
                          {p.inStock ? "Active Stock" : "Backorder"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <div
              className="w-full max-w-lg bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-serif text-xl text-white">Add New Atelier Creation</h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-stone-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                    Creation Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Chronograph GMT"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                      Discipline / Category
                    </label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    >
                      <option value="Audio & Tech">Audio & Tech</option>
                      <option value="Timepieces">Timepieces</option>
                      <option value="Leather Goods">Leather Goods</option>
                      <option value="Fragrance">Fragrance</option>
                      <option value="Home Living">Home Living</option>
                      <option value="Apparel">Apparel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                      Price ($ USD)
                    </label>
                    <input
                      type="number"
                      required
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    placeholder="Brief architectural subtitle"
                    value={newProd.tagline}
                    onChange={(e) => setNewProd({ ...newProd, tagline: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1">
                    Image URL (Unsplash)
                  </label>
                  <input
                    type="url"
                    required
                    value={newProd.imageUrl}
                    onChange={(e) => setNewProd({ ...newProd, imageUrl: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs transition"
                  >
                    Catalog Piece
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="py-3 px-4 rounded-xl text-stone-400 hover:text-white text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
