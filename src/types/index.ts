export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  inStock: boolean;
  stockCount: number;
  sku: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  specs: { [key: string]: string };
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  paymentMethod: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  minSpend?: number;
}
