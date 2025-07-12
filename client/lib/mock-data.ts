import { Product, Category } from "@shared/types";

export const mockCategories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and electronic devices",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
    productCount: 15,
    subcategories: [
      {
        id: "smartphones",
        name: "Smartphones",
        slug: "smartphones",
        description: "Latest smartphones and accessories",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
        parentId: "electronics",
        productCount: 8,
      },
      {
        id: "laptops",
        name: "Laptops",
        slug: "laptops",
        description: "Powerful laptops for work and gaming",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
        parentId: "electronics",
        productCount: 5,
      },
      {
        id: "audio",
        name: "Audio",
        slug: "audio",
        description: "Headphones, speakers, and audio equipment",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
        parentId: "electronics",
        productCount: 6,
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
    productCount: 12,
    subcategories: [
      {
        id: "mens",
        name: "Men's Clothing",
        slug: "mens",
        description: "Stylish clothing for men",
        image:
          "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=300&h=200&fit=crop",
        parentId: "fashion",
        productCount: 4,
      },
      {
        id: "womens",
        name: "Women's Clothing",
        slug: "womens",
        description: "Fashion-forward clothing for women",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=200&fit=crop",
        parentId: "fashion",
        productCount: 3,
      },
      {
        id: "accessories",
        name: "Accessories",
        slug: "accessories",
        description: "Bags, jewelry, and fashion accessories",
        image:
          "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=300&h=200&fit=crop",
        parentId: "fashion",
        productCount: 5,
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
    productCount: 6,
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    slug: "sports",
    description: "Sports equipment and fitness gear",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    productCount: 4,
  },
  {
    id: "toys",
    name: "Toys & Games",
    slug: "toys",
    description: "Educational toys and games for all ages",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
    productCount: 1,
  },
  {
    id: "beauty",
    name: "Beauty & Personal Care",
    slug: "beauty",
    description: "Skincare, makeup, and personal care products",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=200&fit=crop",
    productCount: 1,
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
  // ELECTRONICS - Smartphones
  {
    id: "12",
    name: "iPhone 15 Pro Max",
    description:
      "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system. The most advanced iPhone ever built.",
    price: 1199.99,
    category: "electronics",
    subcategory: "smartphones",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.8,
    reviewCount: 892,
    tags: ["smartphone", "apple", "premium", "camera"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    specifications: {
      Display: "6.7-inch Super Retina XDR",
      Chip: "A17 Pro",
      Storage: "256GB",
      Camera: "48MP Main, 12MP Ultra Wide",
    },
  },
  {
    id: "13",
    name: "Samsung Galaxy S24 Ultra",
    description:
      "Flagship Android phone with S Pen, 200MP camera, and AI features. Ultimate productivity and creativity device.",
    price: 1299.99,
    category: "electronics",
    subcategory: "smartphones",
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 32,
    rating: 4.7,
    reviewCount: 567,
    tags: ["smartphone", "samsung", "android", "s-pen"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    specifications: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      Storage: "512GB",
      Camera: "200MP Main + 50MP Periscope",
    },
  },
  {
    id: "14",
    name: "Google Pixel 8 Pro",
    description:
      "AI-powered photography, pure Android experience, and incredible computational photography capabilities.",
    price: 999.99,
    originalPrice: 1099.99,
    category: "electronics",
    subcategory: "smartphones",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 28,
    rating: 4.6,
    reviewCount: 423,
    tags: ["smartphone", "google", "pixel", "ai-camera"],
    featured: false,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    specifications: {
      Display: "6.7-inch LTPO OLED",
      Chip: "Google Tensor G3",
      Storage: "128GB",
      Camera: "50MP Main + 48MP Telephoto",
    },
  },

  // ELECTRONICS - Laptops
  {
    id: "15",
    name: "MacBook Pro 16-inch M3 Max",
    description:
      "Most powerful MacBook Pro ever with M3 Max chip, 18-hour battery life, and stunning Liquid Retina XDR display.",
    price: 3499.99,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.9,
    reviewCount: 234,
    tags: ["laptop", "apple", "macbook", "professional"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-19T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    specifications: {
      Processor: "M3 Max",
      Memory: "36GB Unified Memory",
      Storage: "1TB SSD",
      Display: "16.2-inch Liquid Retina XDR",
    },
  },
  {
    id: "16",
    name: "Dell XPS 13 Plus",
    description:
      "Premium ultrabook with 13th Gen Intel processors, stunning InfinityEdge display, and all-day battery life.",
    price: 1299.99,
    originalPrice: 1499.99,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1541807084-5b52b6ee5d1f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.5,
    reviewCount: 189,
    tags: ["laptop", "dell", "ultrabook", "windows"],
    featured: false,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    specifications: {
      Processor: "13th Gen Intel Core i7",
      Memory: "16GB LPDDR5",
      Storage: "512GB SSD",
      Display: "13.4-inch 3.5K OLED",
    },
  },
  {
    id: "17",
    name: "ASUS ROG Strix G15",
    description:
      "High-performance gaming laptop with RTX 4070, AMD Ryzen 9, and advanced cooling for ultimate gaming experience.",
    price: 1899.99,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.7,
    reviewCount: 345,
    tags: ["laptop", "gaming", "asus", "rtx"],
    featured: true,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-17T00:00:00Z",
    specifications: {
      Processor: "AMD Ryzen 9 7940HX",
      Graphics: "NVIDIA RTX 4070",
      Memory: "16GB DDR5",
      Display: "15.6-inch 240Hz",
    },
  },

  // ELECTRONICS - Audio
  {
    id: "18",
    name: "Sony WH-1000XM5",
    description:
      "Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.",
    price: 399.99,
    originalPrice: 449.99,
    category: "electronics",
    subcategory: "audio",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 67,
    rating: 4.8,
    reviewCount: 1234,
    tags: ["headphones", "sony", "noise-canceling", "wireless"],
    featured: true,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
    specifications: {
      "Battery Life": "30 hours",
      "Noise Canceling": "V1 Processor",
      Connectivity: "Bluetooth 5.2",
      Weight: "250g",
    },
  },
  {
    id: "19",
    name: "Apple AirPods Pro (2nd Gen)",
    description:
      "Next-generation AirPods Pro with H2 chip, adaptive transparency, and personalized spatial audio.",
    price: 249.99,
    category: "electronics",
    subcategory: "audio",
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 89,
    rating: 4.7,
    reviewCount: 892,
    tags: ["earbuds", "apple", "airpods", "wireless"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-16T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    specifications: {
      Chip: "H2",
      "Battery Life": "6 hours + 24 hours case",
      Features: "Active Noise Cancellation",
      Compatibility: "iPhone, iPad, Mac",
    },
  },
  {
    id: "20",
    name: "Bose QuietComfort Earbuds",
    description:
      "Premium true wireless earbuds with world-class noise cancellation and exceptional comfort.",
    price: 279.99,
    category: "electronics",
    subcategory: "audio",
    images: [
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 34,
    rating: 4.6,
    reviewCount: 567,
    tags: ["earbuds", "bose", "noise-canceling", "premium"],
    featured: false,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    specifications: {
      "Noise Cancellation": "11 levels",
      "Battery Life": "6 hours + 12 hours case",
      "Water Resistance": "IPX4",
      Fit: "3 ear tip sizes",
    },
  },

  // FASHION - Men's Clothing
  {
    id: "21",
    name: "Premium Wool Suit",
    description:
      "Hand-tailored wool suit with modern slim fit. Perfect for business meetings and formal occasions.",
    price: 899.99,
    originalPrice: 1199.99,
    category: "fashion",
    subcategory: "mens",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 12,
    rating: 4.8,
    reviewCount: 156,
    tags: ["suit", "wool", "formal", "business"],
    featured: true,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    variants: [
      { id: "21-38r", name: "Size", value: "38R", stockCount: 3 },
      { id: "21-40r", name: "Size", value: "40R", stockCount: 4 },
      { id: "21-42r", name: "Size", value: "42R", stockCount: 5 },
    ],
    specifications: {
      Material: "100% Merino Wool",
      Fit: "Slim Fit",
      Style: "Two-button, notch lapel",
      Care: "Dry clean only",
    },
  },
  {
    id: "22",
    name: "Casual Button-Down Shirt",
    description:
      "Versatile cotton button-down shirt perfect for both casual and business casual settings.",
    price: 79.99,
    category: "fashion",
    subcategory: "mens",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441640e3?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.4,
    reviewCount: 234,
    tags: ["shirt", "cotton", "casual", "versatile"],
    featured: false,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-14T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    variants: [
      { id: "22-s", name: "Size", value: "Small", stockCount: 12 },
      { id: "22-m", name: "Size", value: "Medium", stockCount: 18 },
      { id: "22-l", name: "Size", value: "Large", stockCount: 15 },
    ],
    specifications: {
      Material: "100% Cotton",
      Fit: "Regular Fit",
      Collar: "Button-down",
      Care: "Machine washable",
    },
  },
  {
    id: "23",
    name: "Designer Jeans",
    description:
      "Premium denim jeans with modern fit and superior comfort. Made from sustainable materials.",
    price: 149.99,
    category: "fashion",
    subcategory: "mens",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 38,
    rating: 4.6,
    reviewCount: 345,
    tags: ["jeans", "denim", "sustainable", "comfortable"],
    featured: true,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-17T00:00:00Z",
    variants: [
      { id: "23-30", name: "Waist", value: "30", stockCount: 8 },
      { id: "23-32", name: "Waist", value: "32", stockCount: 15 },
      { id: "23-34", name: "Waist", value: "34", stockCount: 15 },
    ],
    specifications: {
      Material: "98% Cotton, 2% Elastane",
      Fit: "Slim Straight",
      Rise: "Mid-rise",
      Origin: "Sustainably sourced",
    },
  },

  // FASHION - Women's Clothing
  {
    id: "24",
    name: "Elegant Evening Dress",
    description:
      "Sophisticated evening dress perfect for special occasions. Features flowing silhouette and luxurious fabric.",
    price: 299.99,
    originalPrice: 399.99,
    category: "fashion",
    subcategory: "womens",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-bb1b681f5b88?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 123,
    tags: ["dress", "evening", "elegant", "formal"],
    featured: true,
    isNew: true,
    onSale: true,
    createdAt: "2024-01-17T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    variants: [
      { id: "24-xs", name: "Size", value: "XS", stockCount: 4 },
      { id: "24-s", name: "Size", value: "S", stockCount: 6 },
      { id: "24-m", name: "Size", value: "M", stockCount: 8 },
    ],
    specifications: {
      Material: "Silk blend",
      Style: "A-line",
      Length: "Midi",
      Care: "Dry clean recommended",
    },
  },
  {
    id: "25",
    name: "Cashmere Sweater",
    description:
      "Luxurious 100% cashmere sweater with timeless design. Incredibly soft and warm for chilly days.",
    price: 199.99,
    category: "fashion",
    subcategory: "womens",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 25,
    rating: 4.7,
    reviewCount: 189,
    tags: ["sweater", "cashmere", "luxury", "cozy"],
    featured: true,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
    variants: [
      { id: "25-s", name: "Size", value: "Small", stockCount: 8 },
      { id: "25-m", name: "Size", value: "Medium", stockCount: 10 },
      { id: "25-l", name: "Size", value: "Large", stockCount: 7 },
    ],
    specifications: {
      Material: "100% Cashmere",
      Style: "Crew neck",
      Fit: "Relaxed",
      Care: "Hand wash or dry clean",
    },
  },
  {
    id: "26",
    name: "Professional Blazer",
    description:
      "Sharp, tailored blazer perfect for the modern professional woman. Versatile piece for work and beyond.",
    price: 179.99,
    category: "fashion",
    subcategory: "womens",
    images: [
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 32,
    rating: 4.5,
    reviewCount: 276,
    tags: ["blazer", "professional", "tailored", "versatile"],
    featured: false,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-14T00:00:00Z",
    variants: [
      { id: "26-xs", name: "Size", value: "XS", stockCount: 8 },
      { id: "26-s", name: "Size", value: "S", stockCount: 12 },
      { id: "26-m", name: "Size", value: "M", stockCount: 12 },
    ],
    specifications: {
      Material: "Wool blend",
      Style: "Single-breasted",
      Fit: "Tailored",
      Lining: "Fully lined",
    },
  },

  // HOME & GARDEN
  {
    id: "27",
    name: "Smart Home Hub",
    description:
      "Central control hub for all your smart home devices. Voice control, app integration, and seamless automation.",
    price: 149.99,
    originalPrice: 199.99,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518364538800-6bae3c2ea0f2?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.6,
    reviewCount: 389,
    tags: ["smart-home", "automation", "voice-control", "hub"],
    featured: true,
    isNew: true,
    onSale: true,
    createdAt: "2024-01-18T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    specifications: {
      Connectivity: "Wi-Fi, Zigbee, Z-Wave",
      "Voice Assistant": "Alexa, Google Assistant",
      Compatibility: "1000+ devices",
      Power: "12V DC adapter",
    },
  },
  {
    id: "28",
    name: "Luxury Bedding Set",
    description:
      "Egyptian cotton bedding set with 800 thread count. Includes fitted sheet, flat sheet, and pillowcases.",
    price: 199.99,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 28,
    rating: 4.8,
    reviewCount: 234,
    tags: ["bedding", "egyptian-cotton", "luxury", "comfortable"],
    featured: true,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    variants: [
      { id: "28-queen", name: "Size", value: "Queen", stockCount: 15 },
      { id: "28-king", name: "Size", value: "King", stockCount: 13 },
    ],
    specifications: {
      Material: "100% Egyptian Cotton",
      "Thread Count": "800",
      Weave: "Percale",
      Care: "Machine washable",
    },
  },
  {
    id: "29",
    name: "Indoor Plant Collection",
    description:
      "Curated collection of low-maintenance indoor plants perfect for beginners. Includes care instructions.",
    price: 89.99,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 67,
    rating: 4.4,
    reviewCount: 456,
    tags: ["plants", "indoor", "air-purifying", "beginner-friendly"],
    featured: false,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-13T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
    specifications: {
      "Plant Count": "5 plants",
      Difficulty: "Easy care",
      "Pot Size": "4-6 inch pots included",
      Benefits: "Air purifying",
    },
  },

  // SPORTS & FITNESS
  {
    id: "30",
    name: "Professional Dumbbells Set",
    description:
      "Adjustable dumbbell set with quick-change system. Perfect for home gym and strength training.",
    price: 299.99,
    originalPrice: 399.99,
    category: "sports",
    images: [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 22,
    rating: 4.7,
    reviewCount: 345,
    tags: ["dumbbells", "strength-training", "adjustable", "home-gym"],
    featured: true,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
    specifications: {
      "Weight Range": "5-50 lbs per dumbbell",
      Material: "Cast iron with rubber coating",
      "Quick Change": "2-second weight adjustment",
      "Space Saving": "Replaces 15 sets of weights",
    },
  },
  {
    id: "31",
    name: "Exercise Bike Pro",
    description:
      "High-tech stationary bike with interactive training programs and performance tracking.",
    price: 899.99,
    category: "sports",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571088401756-56318ad95e49?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    reviewCount: 189,
    tags: ["exercise-bike", "cardio", "interactive", "fitness"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-19T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    specifications: {
      Display: "22-inch HD touchscreen",
      Resistance: "Magnetic, 100 levels",
      Programs: "Live and on-demand classes",
      Connectivity: "Wi-Fi, Bluetooth",
    },
  },
  {
    id: "32",
    name: "Running Shoes - Performance",
    description:
      "Professional running shoes with advanced cushioning and energy return technology.",
    price: 159.99,
    category: "sports",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.8,
    reviewCount: 672,
    tags: ["running-shoes", "performance", "cushioning", "lightweight"],
    featured: false,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-08T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    variants: [
      { id: "32-8", name: "Size", value: "8", stockCount: 12 },
      { id: "32-9", name: "Size", value: "9", stockCount: 15 },
      { id: "32-10", name: "Size", value: "10", stockCount: 18 },
    ],
    specifications: {
      Material: "Engineered mesh upper",
      Midsole: "React foam",
      "Energy Return": "85%",
      Weight: "9.1 oz",
    },
  },

  // Additional ELECTRONICS
  {
    id: "33",
    name: "4K Smart TV 65-inch",
    description:
      "Premium 4K OLED smart TV with HDR, Dolby Vision, and built-in streaming apps.",
    price: 1899.99,
    originalPrice: 2299.99,
    category: "electronics",
    subcategory: "audio",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 12,
    rating: 4.9,
    reviewCount: 456,
    tags: ["tv", "4k", "oled", "smart"],
    featured: true,
    isNew: true,
    onSale: true,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    specifications: {
      "Screen Size": "65 inches",
      Resolution: "4K Ultra HD (3840x2160)",
      Technology: "OLED",
      "Smart Features": "Built-in Wi-Fi, Netflix, Amazon Prime",
    },
  },
  {
    id: "34",
    name: "Wireless Gaming Mouse",
    description:
      "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
    price: 79.99,
    category: "electronics",
    subcategory: "laptops",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 89,
    rating: 4.5,
    reviewCount: 234,
    tags: ["gaming", "mouse", "wireless", "rgb"],
    featured: false,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-11T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    specifications: {
      DPI: "Up to 25,600",
      Buttons: "11 programmable",
      Battery: "70 hours wireless",
      Connectivity: "2.4GHz wireless + USB-C",
    },
  },

  // FASHION - Accessories
  {
    id: "35",
    name: "Luxury Watch - Automatic",
    description:
      "Swiss-made automatic watch with sapphire crystal and premium leather strap. Timeless elegance.",
    price: 1299.99,
    category: "fashion",
    subcategory: "accessories",
    images: [
      "https://images.unsplash.com/photo-1594576662728-95aca6a11cf5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=600&fit=crop",
    ],
    inStock: false,
    stockCount: 0,
    rating: 4.9,
    reviewCount: 89,
    tags: ["watch", "luxury", "automatic", "swiss"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-21T00:00:00Z",
    updatedAt: "2024-01-21T00:00:00Z",
    specifications: {
      Movement: "Swiss automatic",
      Crystal: "Sapphire",
      "Water Resistance": "100m",
      Strap: "Genuine leather",
    },
  },
  {
    id: "36",
    name: "Designer Handbag",
    description:
      "Premium leather handbag with timeless design. Perfect for work or special occasions.",
    price: 449.99,
    originalPrice: 599.99,
    category: "fashion",
    subcategory: "accessories",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 15,
    rating: 4.7,
    reviewCount: 167,
    tags: ["handbag", "leather", "designer", "luxury"],
    featured: true,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-12T00:00:00Z",
    updatedAt: "2024-01-19T00:00:00Z",
    specifications: {
      Material: "Genuine Italian leather",
      Dimensions: "32cm x 25cm x 12cm",
      Features: "Multiple compartments",
      Hardware: "Gold-tone",
    },
  },

  // HOME - Kitchen & Appliances
  {
    id: "37",
    name: "Professional Chef Knife Set",
    description:
      "High-carbon stainless steel knife set with ergonomic handles. Essential for serious cooking.",
    price: 199.99,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1484659619207-9165d119dafe?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 34,
    rating: 4.8,
    reviewCount: 456,
    tags: ["knives", "kitchen", "chef", "stainless-steel"],
    featured: false,
    isNew: false,
    onSale: false,
    createdAt: "2024-01-09T00:00:00Z",
    updatedAt: "2024-01-17T00:00:00Z",
    specifications: {
      Material: "High-carbon stainless steel",
      "Set Includes": "8 knives + block",
      Handle: "Ergonomic polymer",
      Maintenance: "Hand wash recommended",
    },
  },
  {
    id: "38",
    name: "Stand Mixer - Professional",
    description:
      "Heavy-duty stand mixer with multiple attachments. Perfect for baking and food preparation.",
    price: 349.99,
    originalPrice: 399.99,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1586040325191-89e40be7741c?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571506165871-ce2ded0e2396?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 18,
    rating: 4.9,
    reviewCount: 234,
    tags: ["mixer", "kitchen", "baking", "professional"],
    featured: true,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-16T00:00:00Z",
    specifications: {
      Capacity: "6 quart stainless steel bowl",
      Power: "575 watts",
      Speeds: "10 speeds",
      Attachments: "Dough hook, flat beater, wire whip",
    },
  },

  // NEW CATEGORIES
  {
    id: "39",
    name: "Educational STEM Kit",
    description:
      "Interactive robotics kit for kids to learn coding and engineering. Ages 8-14.",
    price: 129.99,
    category: "toys",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 67,
    rating: 4.6,
    reviewCount: 234,
    tags: ["toys", "educational", "stem", "robotics"],
    featured: true,
    isNew: true,
    onSale: false,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    specifications: {
      "Age Range": "8-14 years",
      Components: "200+ pieces",
      Learning: "Coding, Engineering, Problem-solving",
      Platform: "Compatible with tablets/computers",
    },
  },
  {
    id: "40",
    name: "Skincare Routine Set",
    description:
      "Complete skincare routine with cleanser, serum, moisturizer, and sunscreen. For all skin types.",
    price: 89.99,
    originalPrice: 119.99,
    category: "beauty",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&h=600&fit=crop",
    ],
    inStock: true,
    stockCount: 45,
    rating: 4.7,
    reviewCount: 567,
    tags: ["skincare", "beauty", "routine", "moisturizer"],
    featured: true,
    isNew: false,
    onSale: true,
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-18T00:00:00Z",
    specifications: {
      "Set Includes": "4 products",
      "Skin Type": "All skin types",
      Benefits: "Hydrating, Anti-aging",
      "Cruelty Free": "Yes",
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
