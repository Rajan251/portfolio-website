"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  Sparkles,
  ShoppingBag,
  Home,
  Compass,
  FileText,
  CreditCard,
  User,
  LayoutDashboard,
  ChevronUp,
  ChevronDown,
  Layers
} from "lucide-react";

export const DemoBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { seedDemoCart, cart } = useStore();

  const demoPages = [
    { name: "1. Home Page", href: "/", icon: Home },
    { name: "2. Shop Catalog", href: "/shop", icon: Compass },
    { name: "3. Product Details", href: "/product/lum-01", icon: FileText },
    { name: "4. Cart Page", href: "/cart", icon: ShoppingBag },
    { name: "5. Checkout & Success", href: "/checkout", icon: CreditCard },
    { name: "6. Customer Account & Tracking", href: "/account", icon: User },
    { name: "7. Admin Dashboard", href: "/admin", icon: LayoutDashboard },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {isOpen ? (
        <div className="bg-stone-900/95 border border-amber-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-stone-200 w-72 sm:w-80 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-white tracking-wide">
                Client Demo Quick-Switcher
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 transition"
              title="Collapse"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Jump List */}
          <div className="py-2 space-y-1 text-xs">
            {demoPages.map((page) => {
              const Icon = page.icon;
              const isActive = pathname === page.href;
              return (
                <Link
                  key={page.name}
                  href={page.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-amber-400 text-stone-950 font-semibold"
                      : "text-stone-300 hover:bg-stone-800 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{page.name}</span>
                </Link>
              );
            })}
          </div>

          {/* One-click Demo Bag Populator */}
          <div className="pt-2 border-t border-stone-800">
            <button
              onClick={seedDemoCart}
              className="w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Pre-fill Bag with Demo Items ({cart.length} items)</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-800 border border-amber-500/40 text-stone-200 hover:text-white shadow-xl backdrop-blur-md transition group"
          title="Open Client Demo Guide"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold tracking-wide">Client Demo Tour</span>
          <ChevronUp className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition" />
        </button>
      )}
    </div>
  );
};
