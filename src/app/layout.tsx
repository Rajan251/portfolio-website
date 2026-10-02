import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchModal } from "@/components/SearchModal";
import { QuickViewModal } from "@/components/QuickViewModal";
import { ToastContainer } from "@/components/Toast";
import { DemoBar } from "@/components/DemoBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LUMIÈRE Maison d'Artisanat | Luxury Lifestyle & Tech Boutique",
  description: "Modern luxury e-commerce prototype featuring horology, acoustic engineering, Tuscan leathercraft, and cashmere tailoring.",
  keywords: ["luxury e-commerce", "bespoke timepieces", "acoustic headphones", "leather goods", "cashmere"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-400 selection:text-stone-950">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <SearchModal />
          <QuickViewModal />
          <ToastContainer />
          <DemoBar />
        </StoreProvider>
      </body>
    </html>
  );
}
