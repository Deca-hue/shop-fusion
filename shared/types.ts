// Shared types for ecommerce application

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  isNew: boolean;
  onSale: boolean;
  createdAt: string;
  updatedAt: string;
  variants?: ProductVariant[];
  specifications?: Record<string, string>;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stockCount: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  subcategories?: Category[];
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discounts: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: "customer" | "admin";
  addresses: Address[];
  createdAt: string;
  emailVerified: boolean;
}

export interface Address {
  id: string;
  type: "billing" | "shipping";
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: CartItem[];
  shipping: Address;
  billing: Address;
  payment: PaymentInfo;
  total: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  discounts: number;
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
}

export interface PaymentInfo {
  method: "card" | "paypal" | "apple_pay" | "google_pay";
  status: "pending" | "processing" | "completed" | "failed";
  transactionId?: string;
  cardLast4?: string;
  cardBrand?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SearchFilters {
  category?: string;
  priceRange?: [number, number];
  rating?: number;
  inStock?: boolean;
  onSale?: boolean;
  tags?: string[];
  sortBy?: "name" | "price" | "rating" | "newest" | "popularity";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  filters: SearchFilters;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
}
