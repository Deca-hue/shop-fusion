import { Product, Category } from "@shared/types";

export const mockCategories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    productCount: 45,
    subcategories: [
      {
        id: "smartphones",
        name: "Smartphones",
        slug: "smartphones",
        description: "Latest smartphones and accessories",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
        parentId: "electronics",
        productCount: 15,
      },
      {
        id: "laptops",
        name: "Laptops",
        slug: "laptops",
        description: "Powerful laptops for work and gaming",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
        parentId: "electronics",
        productCount: 12,
      },
      {
        id: "audio",
        name: "Audio",
        slug: "audio",
        description: "Headphones, speakers, and audio equipment",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
        parentId: "electronics",
        productCount: 18,
      },
    ],
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    description: "Trendy clothing and accessories",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    productCount: 67,
    subcategories: [
      {
        id: "mens",
        name: "Men's Clothing",
        slug: "mens",
        description: "Stylish clothing for men",
        image:
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=300&h=200&fit=crop",
        parentId: "fashion",
        productCount: 25,
      },
      {
        id: "womens",
        name: "Women's Clothing",
        slug: "womens",
        description: "Fashion-forward clothing for women",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop",
        parentId: "fashion",
        productCount: 32,
      },
      {
        id: "accessories",
        name: "Accessories",
        slug: "accessories",
        description: "Bags, jewelry, and fashion accessories",
        image:
          "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=200&fit=crop",
        parentId: "fashion",
        productCount: 10,
      },
    ],
  },
  {
    id: "home",
    name: "Home & Garden",
    slug: "home",
    description: "Everything for your home and garden",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
    productCount: 34,
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    slug: "sports",
    description: "Sports equipment and fitness gear",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    productCount: 28,
  },
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description:
      "Premium noise-cancelling headphones with superior sound quality and 30-hour battery life. Perfect for music lovers and professionals.",
    price: 99.99,
    originalPrice: 149.99,
    category: "electronics",
    subcategory: "audio",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 25,
    rating: 4.5,
    reviewCount: 128,
    tags: ["wireless", "bluetooth", "noise-cancelling", "premium"],
    featured: true,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    variants: [
      { id: "1-black", name: "Color", value: "Black", stockCount: 15 },
      { id: "1-white", name: "Color", value: "White", stockCount: 10 },
    ],
    specifications: {
      "Battery Life": "30 hours",
      Connectivity: "Bluetooth 5.0",
      Weight: "250g",
      Warranty: "2 years",
    },
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    description:
      "Advanced fitness tracking with heart rate monitoring, GPS, and smart notifications. Track your health and stay connected.",
    price: 199.99,
    category: "electronics",
    subcategory: "smartphones",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.7,
    reviewCount: 89,
    tags: ["smartwatch", "fitness", "health", "GPS"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    variants: [
      { id: "2-black", name: "Color", value: "Black", stockCount: 8 },
      { id: "2-silver", name: "Color", value: "Silver", stockCount: 10 },
    ],
    specifications: {
      "Battery Life": "7 days",
      Display: "1.4 inch AMOLED",
      "Water Resistance": "50m",
      Sensors: "Heart rate, GPS, Accelerometer",
    },
  },
  {
    id: "3",
    name: "Premium Coffee Maker",
    description:
      "Professional-grade coffee maker with programmable settings and thermal carafe. Brew the perfect cup every time.",
    price: 79.99,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 12,
    rating: 4.3,
    reviewCount: 67,
    tags: ["coffee", "kitchen", "programmable", "thermal"],
    featured: true,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    specifications: {
      Capacity: "12 cups",
      Type: "Drip coffee maker",
      Material: "Stainless steel",
      Features: "Programmable, Auto shut-off",
    },
  },
  {
    id: "4",
    name: "Ergonomic Laptop Stand",
    description:
      "Adjustable aluminum laptop stand for improved posture and better airflow. Compatible with all laptop sizes.",
    price: 49.99,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 35,
    rating: 4.6,
    reviewCount: 156,
    tags: ["laptop", "stand", "ergonomic", "aluminum"],
    featured: false,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
    specifications: {
      Material: "Aluminum alloy",
      Compatibility: "11-17 inch laptops",
      Adjustability: "Height and angle",
      Weight: "1.2kg",
    },
  },
  {
    id: "5",
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    price: 24.99,
    originalPrice: 34.99,
    category: "electronics",
    subcategory: "smartphones",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.2,
    reviewCount: 203,
    tags: ["wireless", "charging", "qi", "fast"],
    featured: false,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    specifications: {
      "Charging Speed": "10W",
      Compatibility: "Qi-enabled devices",
      Indicators: "LED status light",
      Safety: "Over-temperature protection",
    },
  },
  {
    id: "6",
    name: "Cotton T-Shirt",
    description:
      "Comfortable 100% organic cotton t-shirt with modern fit. Available in multiple colors and sizes.",
    price: 19.99,
    category: "fashion",
    subcategory: "mens",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 67,
    rating: 4.4,
    reviewCount: 89,
    tags: ["cotton", "organic", "comfortable", "casual"],
    featured: false,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
    variants: [
      { id: "6-s-black", name: "Size", value: "Small", stockCount: 15 },
      { id: "6-m-black", name: "Size", value: "Medium", stockCount: 25 },
      { id: "6-l-black", name: "Size", value: "Large", stockCount: 20 },
      { id: "6-xl-black", name: "Size", value: "X-Large", stockCount: 7 },
    ],
    specifications: {
      Material: "100% Organic Cotton",
      Fit: "Regular",
      Care: "Machine washable",
      Origin: "Ethically sourced",
    },
  },
  {
    id: "7",
    name: "Gaming Mechanical Keyboard",
    description:
      "RGB mechanical gaming keyboard with tactile switches and programmable keys. Built for gaming performance.",
    price: 129.99,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1612198441493-d30b6b1a0b40?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.8,
    reviewCount: 145,
    tags: ["gaming", "mechanical", "RGB", "programmable"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
    specifications: {
      "Switch Type": "Mechanical Blue",
      Backlight: "RGB",
      Connectivity: "USB-C",
      Features: "Programmable keys, Media controls",
    },
  },
  {
    id: "8",
    name: "Yoga Mat",
    description:
      "Premium non-slip yoga mat with excellent grip and cushioning. Perfect for yoga, pilates, and fitness workouts.",
    price: 39.99,
    category: "sports",
    images: [
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506629905061-b154b274819c?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 28,
    rating: 4.5,
    reviewCount: 78,
    tags: ["yoga", "fitness", "non-slip", "eco-friendly"],
    featured: false,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-11T00:00:00Z",
    variants: [
      { id: "8-purple", name: "Color", value: "Purple", stockCount: 12 },
      { id: "8-blue", name: "Color", value: "Blue", stockCount: 16 },
    ],
    specifications: {
      Dimensions: "183cm x 61cm",
      Thickness: "6mm",
      Material: "Natural rubber",
      Features: "Non-slip, Eco-friendly",
    },
  },
  {
    id: "9",
    name: "Premium Gaming Headset",
    description:
      "Professional gaming headset with 7.1 surround sound and noise-canceling microphone. Currently out of stock due to high demand.",
    price: 179.99,
    originalPrice: 199.99,
    category: "electronics",
    subcategory: "audio",
    images: [
      "https://images.unsplash.com/photo-1599669454699-248893623440?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&h=600&fit=crop",
    ],
    inStock: false,
    stockCount: 0,
    rating: 4.9,
    reviewCount: 234,
    tags: ["gaming", "headset", "surround sound", "microphone"],
    featured: true,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    specifications: {
      "Audio Type": "7.1 Surround Sound",
      Connectivity: "USB + 3.5mm",
      Microphone: "Noise-canceling",
      Compatibility: "PC, PS5, Xbox, Switch",
    },
  },
  {
    id: "10",
    name: "Limited Edition Sneakers",
    description:
      "Exclusive limited edition sneakers with premium materials and unique design. Sold out - join waitlist for restock notifications.",
    price: 249.99,
    category: "fashion",
    subcategory: "accessories",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
    ],
    inStock: false,
    stockCount: 0,
    rating: 4.8,
    reviewCount: 167,
    tags: ["sneakers", "limited edition", "premium", "exclusive"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    variants: [
      { id: "10-8", name: "Size", value: "8", stockCount: 0 },
      { id: "10-9", name: "Size", value: "9", stockCount: 0 },
      { id: "10-10", name: "Size", value: "10", stockCount: 0 },
      { id: "10-11", name: "Size", value: "11", stockCount: 0 },
    ],
    specifications: {
      Material: "Premium leather & mesh",
      Sole: "Cushioned rubber",
      Style: "Limited Edition",
      Care: "Professional cleaning recommended",
    },
  },
  {
    id: "11",
    name: "Vintage Leather Jacket",
    description:
      "Handcrafted vintage-style leather jacket with premium finish. Temporarily unavailable while restocking premium materials.",
    price: 299.99,
    category: "fashion",
    subcategory: "mens",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=600&h=600&fit=crop",
    ],
    inStock: false,
    stockCount: 0,
    rating: 4.6,
    reviewCount: 89,
    tags: ["leather", "vintage", "jacket", "handcrafted"],
    featured: false,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
    variants: [
      { id: "11-s", name: "Size", value: "Small", stockCount: 0 },
      { id: "11-m", name: "Size", value: "Medium", stockCount: 0 },
      { id: "11-l", name: "Size", value: "Large", stockCount: 0 },
    ],
    specifications: {
      Material: "Genuine leather",
      Lining: "Silk",
      Style: "Vintage biker",
      Care: "Professional leather care",
    },
  },
];

// Helper functions for filtering and searching
export function searchProducts(
  query: string,
  products: Product[] = mockProducts,
): Product[] {
  if (!query.trim()) return products;

  const searchTerm = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      product.category.toLowerCase().includes(searchTerm),
  );
}

export function filterByCategory(
  category: string,
  products: Product[] = mockProducts,
): Product[] {
  if (!category) return products;
  return products.filter(
    (product) =>
      product.category === category || product.subcategory === category,
  );
}

export function filterByPriceRange(
  minPrice: number,
  maxPrice: number,
  products: Product[] = mockProducts,
): Product[] {
  return products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice,
  );
}

export function sortProducts(
  products: Product[],
  sortBy: string = "name",
  sortOrder: "asc" | "desc" = "asc",
): Product[] {
  const sorted = [...products].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "price":
        aValue = a.price;
        bValue = b.price;
        break;
      case "rating":
        aValue = a.rating;
        bValue = b.rating;
        break;
      case "newest":
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
        break;
      case "popularity":
        aValue = a.reviewCount;
        bValue = b.reviewCount;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  return sorted;
}

export function getProductById(
  id: string,
  products: Product[] = mockProducts,
): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getFeaturedProducts(
  products: Product[] = mockProducts,
): Product[] {
  return products.filter((product) => product.featured);
}

export function getNewProducts(products: Product[] = mockProducts): Product[] {
  return products.filter((product) => product.isNew);
}

export function getSaleProducts(products: Product[] = mockProducts): Product[] {
  return products.filter((product) => product.onSale);
}
