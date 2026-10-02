"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Clock, Sparkles, CheckCircle2 } from "lucide-react";

export const Footer = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
    showToast("Thank you for joining the Maison Lumière circle. Check your inbox for your 10% welcome invitation.", "success");
    setEmail("");
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-900 text-stone-300">
      {/* Brand Trust Assurances Bar */}
      <div className="border-b border-stone-800/80 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-800/70 border border-stone-700/60 flex items-center justify-center shrink-0 text-amber-400">
              <Truck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide uppercase">Global Insured Transit</h5>
              <p className="text-[11px] text-stone-400 font-light mt-0.5">Complimentary over $250</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-800/70 border border-stone-700/60 flex items-center justify-center shrink-0 text-amber-400">
              <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide uppercase">Certified Authenticity</h5>
              <p className="text-[11px] text-stone-400 font-light mt-0.5">Direct from master ateliers</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-800/70 border border-stone-700/60 flex items-center justify-center shrink-0 text-amber-400">
              <RotateCcw className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide uppercase">30-Day Bespoke Returns</h5>
              <p className="text-[11px] text-stone-400 font-light mt-0.5">Complimentary courier pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-stone-800/70 border border-stone-700/60 flex items-center justify-center shrink-0 text-amber-400">
              <Clock className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-white tracking-wide uppercase">Private Concierge</h5>
              <p className="text-[11px] text-stone-400 font-light mt-0.5">24/7 dedicated horologist & stylist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Manifesto & Newsletter */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-[0.25em] text-white font-medium">
                LUMIÈRE
              </span>
              <span className="text-[9px] tracking-[0.35em] text-amber-400 uppercase font-light -mt-0.5">
                Maison d&apos;Artisanat
              </span>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed font-light max-w-md">
              A private design house dedicated to the preservation of enduring craftsmanship. 
              We harmonize modern acoustic engineering, Swiss calibres, and Tuscan leatherwork 
              for those who value depth above noise.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider text-amber-300 font-semibold mb-2">
                Join the Private Salon
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-stone-900 border border-amber-500/40 rounded-xl text-xs text-amber-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Welcome. Your exclusive private invitation code has been dispatched.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your VIP email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-stone-500 mt-2 font-light">
                Receive confidential drop alerts, private lookbooks, and invitations to salon exhibitions.
              </p>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              The Catalog
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <Link href="/shop" className="hover:text-amber-300 transition">All Creations</Link>
              </li>
              <li>
                <Link href="/shop?category=Audio%20%26%20Tech" className="hover:text-amber-300 transition">Acoustics & Docks</Link>
              </li>
              <li>
                <Link href="/shop?category=Timepieces" className="hover:text-amber-300 transition">Swiss Chronographs</Link>
              </li>
              <li>
                <Link href="/shop?category=Leather%20Goods" className="hover:text-amber-300 transition">Tuscan Leather</Link>
              </li>
              <li>
                <Link href="/shop?category=Fragrance" className="hover:text-amber-300 transition">Artisanal Scents</Link>
              </li>
              <li>
                <Link href="/shop?category=Apparel" className="hover:text-amber-300 transition">Inner Mongolian Cashmere</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <Link href="/account" className="hover:text-amber-300 transition">Customer Account</Link>
              </li>
              <li>
                <Link href="/account?tab=orders" className="hover:text-amber-300 transition">Order History</Link>
              </li>
              <li>
                <Link href="/account?tab=tracking" className="hover:text-amber-300 transition">Track Parcel</Link>
              </li>
              <li>
                <Link href="/account?tab=wishlist" className="hover:text-amber-300 transition">Private Wishlist</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-amber-300 transition">Shopping Bag</Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-400 hover:text-amber-300 transition">Merchant Portal</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              The Maison
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li>
                <span className="text-stone-300">Flagship Salon:</span> 740 Madison Avenue, New York, NY
              </li>
              <li>
                <span className="text-stone-300">Atelier:</span> Via de&apos; Tornabuoni, Florence, Italy
              </li>
              <li>
                <span className="text-stone-300">Concierge:</span> concierge@lumiere-maison.com
              </li>
              <li>
                <span className="text-stone-300">Phone:</span> +1 (800) 482-9018
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium block mb-1">
                Accepted Currencies & Payment
              </span>
              <div className="flex flex-wrap gap-2 text-[10px] text-stone-400">
                <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">Apple Pay</span>
                <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">Visa</span>
                <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">Mastercard</span>
                <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">Amex</span>
                <span className="px-2 py-0.5 rounded bg-stone-900 border border-stone-800">Klarna</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="mt-14 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
          <p>© 2026 LUMIÈRE Maison d&apos;Artisanat S.A. All rights reserved. Commercial Prototype for Client Demonstration.</p>
          <div className="flex gap-6 mt-4 sm:mt-0 font-light">
            <a href="#" className="hover:text-stone-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition">Terms of Sale</a>
            <a href="#" className="hover:text-stone-300 transition">Ethical Sourcing</a>
            <a href="#" className="hover:text-stone-300 transition">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
