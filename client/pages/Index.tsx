import { getFeaturedProducts, mockCategories } from "@/lib/mock-data";
import { ProductCard } from "@/components/products/ProductCard";
import { CartButton } from "@/components/cart/CartButton";
import { AuthButton } from "@/components/auth/AuthButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Shield,
  Truck,
  Heart,
  Award,
  Star,
  Zap,
  Users,
  TrendingUp,
  ShoppingBag,
  Clock,
} from "lucide-react";

export default function Index() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="header-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-2xl font-serif font-bold text-brand-primary">
                  ShopFusion
                </h1>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    className="h-5 w-5 text-ui-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link
                to="/products"
                className="text-foreground hover:text-brand-primary"
              >
                Products
              </Link>
              <AuthButton />
              <CartButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-primary to-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Welcome to ShopFusion
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices. Your one-stop shop
              for everything you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn-primary bg-white text-brand-primary hover:bg-ui-gray-100 text-center"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-brand-primary text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Why Choose ShopFusion?
            </h2>
            <p className="text-ui-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best online shopping experience
              with unmatched quality, service, and value.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Shopping",
                description: "Bank-level SSL encryption and secure payments",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description: "Free shipping on orders over $50 worldwide",
              },
              {
                icon: Heart,
                title: "24/7 Support",
                description: "Round-the-clock customer service and assistance",
              },
              {
                icon: Award,
                title: "Quality Guaranteed",
                description: "Premium products with satisfaction guarantee",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-gold rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-ui-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-ui-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-ui-gray-600">
              Explore our wide range of premium products across multiple
              categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mockCategories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.slug}`}
                className="product-card text-center p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-sm text-ui-gray-500">
                  {category.productCount} items
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Happy Customers", value: "100K+", icon: Users },
              { label: "Products Sold", value: "500K+", icon: ShoppingBag },
              { label: "5-Star Reviews", value: "50K+", icon: Star },
              { label: "Years of Excellence", value: "15+", icon: Award },
            ].map((stat, index) => (
              <div key={index} className="group">
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-luxury-gold group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif font-bold">Featured Products</h2>
            <Link to="/products" className="text-brand-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-ui-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Stay Updated</h2>
          <p className="text-ui-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new
            products, exclusive deals, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1 bg-white text-black"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">ShopFusion</h3>
              <p className="text-ui-gray-300">
                Your trusted online marketplace for quality products at
                affordable prices.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-ui-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-ui-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Size Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-ui-gray-300 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a href="#" className="text-ui-gray-300 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a href="#" className="text-ui-gray-300 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-ui-gray-700 mt-8 pt-8 text-center text-ui-gray-300">
            <p>&copy; 2024 ShopFusion. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
