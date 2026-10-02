"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, CartItem, Order, Coupon, Review } from "@/types";
import { initialProducts } from "@/data/products";
import { sampleCoupons } from "@/data/reviews";

interface ToastNotification {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
}

interface Address {
  id: string;
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  tier: string;
  phone: string;
  memberSince: string;
  addresses: Address[];
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  appliedCoupon: Coupon | null;
  orders: Order[];
  user: UserProfile;
  toasts: ToastNotification[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  quickViewProduct: Product | null;
  setIsCartOpen: (open: boolean) => void;
  setIsSearchOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;
  cartItemCount: number;
  showToast: (message: string, type?: "success" | "info" | "error") => void;
  placeOrder: (shippingDetails: any, paymentMethod: string, shippingMethodRate: number) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  seedDemoCart: () => void;
}

const initialOrders: Order[] = [
  {
    id: "LUM-94281",
    date: "March 28, 2026",
    status: "Delivered",
    items: [
      {
        productId: "lum-01",
        name: "Lumière Horizon Acoustic Studio Headphones",
        price: 489,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
        color: "Obsidian Black"
      },
      {
        productId: "lum-04",
        name: "Atelier No. 07 Santal & Smoked Cardamom",
        price: 260,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
        size: "100ml"
      }
    ],
    subtotal: 749,
    discount: 112.35,
    shipping: 0,
    total: 636.65,
    shippingAddress: {
      fullName: "Alexander Wright",
      street: "740 Park Avenue, Penthouse B",
      city: "New York",
      state: "NY",
      zip: "10021",
      country: "United States"
    },
    trackingNumber: "FDX-9938472910US",
    carrier: "FedEx Priority Overnight",
    estimatedDelivery: "Delivered on March 30, 2026",
    paymentMethod: "Apple Pay (Mastercard •••• 8821)"
  },
  {
    id: "LUM-88319",
    date: "March 10, 2026",
    status: "Shipped",
    items: [
      {
        productId: "lum-03",
        name: "Palermo Full-Grain Leather Weekender Duffel",
        price: 680,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
        color: "Bourbon Tan",
        size: "45L Standard"
      }
    ],
    subtotal: 680,
    discount: 0,
    shipping: 15,
    total: 695,
    shippingAddress: {
      fullName: "Alexander Wright",
      street: "740 Park Avenue, Penthouse B",
      city: "New York",
      state: "NY",
      zip: "10021",
      country: "United States"
    },
    trackingNumber: "DHL-483928172X",
    carrier: "DHL Express World",
    estimatedDelivery: "April 05, 2026",
    paymentMethod: "Visa Signature •••• 4092"
  }
];

const initialUser: UserProfile = {
  name: "Alexander Wright",
  email: "a.wright@manhattan-capital.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
  tier: "VIP Platinum Connoisseur",
  phone: "+1 (212) 555-0198",
  memberSince: "November 2024",
  addresses: [
    {
      id: "addr-1",
      isDefault: true,
      name: "Alexander Wright (Primary Residence)",
      street: "740 Park Avenue, Penthouse B",
      city: "New York",
      state: "NY",
      zip: "10021",
      country: "United States"
    },
    {
      id: "addr-2",
      isDefault: false,
      name: "Alexander Wright (Hamptons Villa)",
      street: "42 Dune Road",
      city: "East Hampton",
      state: "NY",
      zip: "11937",
      country: "United States"
    }
  ]
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(["lum-02", "lum-07"]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Load persisted state from localStorage if available
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("lumiere_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("lumiere_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedOrders = localStorage.getItem("lumiere_orders");
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {
      // ignore SSR or storage exceptions
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("lumiere_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("lumiere_wishlist", JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("lumiere_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const selectedColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : undefined);
    const selectedSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor,
          selectedSize
        }
      ];
    });

    showToast(`Added "${product.name}" to bag`);
  };

  const removeFromCart = (productId: string, color?: string, size?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedSize === size)
      )
    );
    showToast("Item removed from bag", "info");
  };

  const updateQuantity = (productId: string, quantity: number, color?: string, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === color &&
          item.selectedSize === size
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    const targetProduct = products.find((p) => p.id === productId);
    const name = targetProduct?.name || "Product";

    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed "${name}" from wishlist`, "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved "${name}" to wishlist`, "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = sampleCoupons.find((c) => c.code === clean);
    if (found) {
      setAppliedCoupon(found);
      showToast(`Privilege code "${clean}" applied (-${found.discountPercent}%)`, "success");
      return { success: true, message: `Applied ${found.discountPercent}% off!` };
    }
    showToast(`Invalid promotion code "${clean}"`, "error");
    return { success: false, message: "Invalid promotional code" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Promotion code removed", "info");
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = appliedCoupon ? (cartSubtotal * appliedCoupon.discountPercent) / 100 : 0;
  const cartShipping = cartSubtotal >= 250 || cartSubtotal === 0 ? 0 : 25;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + (cartSubtotal > 0 ? cartShipping : 0));
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (shippingDetails: any, paymentMethod: string, shippingMethodRate: number): Order => {
    const orderNumber = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: orderNumber,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      status: "Processing",
      items: cart.map((c) => ({
        productId: c.product.id,
        name: c.product.name,
        price: c.product.price,
        quantity: c.quantity,
        image: c.product.images[0],
        color: c.selectedColor,
        size: c.selectedSize
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: shippingMethodRate,
      total: cartSubtotal - cartDiscount + shippingMethodRate,
      shippingAddress: {
        fullName: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
        street: shippingDetails.street,
        city: shippingDetails.city,
        state: shippingDetails.state,
        zip: shippingDetails.zip,
        country: shippingDetails.country || "United States"
      },
      trackingNumber: `FDX-${Math.floor(1000000000 + Math.random() * 9000000000)}US`,
      carrier: "FedEx Express Worldwide",
      estimatedDelivery: "3 business days",
      paymentMethod
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order ${orderId} status updated to "${status}"`, "info");
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast("Product updated successfully", "success");
  };

  const addProduct = (newProd: Omit<Product, "id">) => {
    const id = `lum-${Math.floor(10 + Math.random() * 90)}`;
    const created: Product = { ...newProd, id };
    setProducts((prev) => [created, ...prev]);
    showToast(`Added product "${created.name}"`, "success");
  };

  const addAddress = (address: Omit<Address, "id">) => {
    const newId = `addr-${Date.now()}`;
    const nextAddresses = address.isDefault
      ? user.addresses.map((a) => ({ ...a, isDefault: false }))
      : [...user.addresses];
    setUser((prev) => ({
      ...prev,
      addresses: [...nextAddresses, { ...address, id: newId }]
    }));
    showToast("New delivery address added", "success");
  };

  const updateAddress = (id: string, address: Partial<Address>) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.map((a) => {
        if (a.id === id) {
          return { ...a, ...address };
        }
        if (address.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    }));
    showToast("Address updated", "success");
  };

  const deleteAddress = (id: string) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== id)
    }));
    showToast("Address deleted", "info");
  };

  const seedDemoCart = () => {
    setCart([
      {
        product: initialProducts[0],
        quantity: 1,
        selectedColor: "Obsidian Black"
      },
      {
        product: initialProducts[2],
        quantity: 1,
        selectedColor: "Bourbon Tan",
        selectedSize: "45L Standard"
      }
    ]);
    setAppliedCoupon({ code: "LUXE20", discountPercent: 20, description: "20% VIP privilege discount" });
    showToast("Demo bag pre-populated with luxury goods & 20% coupon!", "success");
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        appliedCoupon,
        orders,
        user,
        toasts,
        isCartOpen,
        isSearchOpen,
        quickViewProduct,
        setIsCartOpen,
        setIsSearchOpen,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartItemCount,
        showToast,
        placeOrder,
        getOrderById,
        updateOrderStatus,
        updateProduct,
        addProduct,
        addAddress,
        updateAddress,
        deleteAddress,
        seedDemoCart
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
