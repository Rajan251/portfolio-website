"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  LayoutDashboard,
  Sparkles,
  ChevronDown
} from "lucide-react";

export const Header = () => {
  const pathname = usePathname();
  const { cartItemCount, wishlist, setIsCartOpen, setIsSearchOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Collection", href: "/shop" },
    { label: "Audio & Tech", href: "/shop?category=Audio%20%26%20Tech" },
    { label: "Timepieces", href: "/shop?category=Timepieces" },
    { label: "Leather Goods", href: "/shop?category=Leather%20Goods" },
    { label: "Fragrance", href: "/shop?category=Fragrance" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-stone-950 text-stone-300 text-xs py-2 px-4 border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-light tracking-wider text-[11px] sm:text-xs">
              Complimentary Worldwide Express Delivery on orders over $250 • Code:{" "}
              <strong className="text-amber-300 font-semibold tracking-normal underline decoration-amber-400/50">
                LUXE20
              </strong>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] text-stone-400">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-amber-300 hover:text-amber-200 transition"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Merchant Admin</span>
            </Link>
            <span>USD ($)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? "bg-stone-950/90 backdrop-blur-xl border-b border-stone-800/90 shadow-xl shadow-black/40 py-3.5"
            : "bg-stone-950/70 backdrop-blur-md border-b border-stone-800/50 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-300 hover:text-white"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-white font-medium group-hover:text-amber-200 transition-colors">
                LUMIÈRE
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.35em] text-amber-400/90 uppercase font-light -mt-0.5">
                Maison d&apos;Artisanat
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs uppercase tracking-widest transition-all duration-200 py-1 border-b-2 ${
                      isActive
                        ? "text-amber-400 border-amber-400 font-medium"
                        : "text-stone-300 border-transparent hover:text-white hover:border-stone-500 font-light"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition"
              title="Search (Cmd+K)"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline text-xs text-stone-400 font-light">
                Search <kbd className="text-[10px] bg-stone-800 px-1.5 py-0.5 rounded text-stone-400">⌘K</kbd>
              </span>
            </button>

            {/* Wishlist */}
            <Link
              href="/account?tab=wishlist"
              className="relative p-2 text-stone-300 hover:text-white transition"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="p-2 text-stone-300 hover:text-white transition hidden sm:flex items-center"
              aria-label="Account"
              title="My VIP Account"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </Link>

            {/* Shopping Bag / Cart Drawer Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium transition shadow-md shadow-amber-900/20"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-bold">{cartItemCount}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-800 bg-stone-950 px-6 py-5 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-stone-300 hover:text-amber-400 text-sm font-medium py-1 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-800 flex flex-col gap-2.5 text-sm">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-stone-300 hover:text-white py-1"
              >
                <User className="w-4 h-4 text-amber-400" />
                <span>Customer Account & Orders</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 py-1"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
