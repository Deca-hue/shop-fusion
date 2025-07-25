import { useState } from "react";
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
  Menu,
  X,
  Search,
} from "lucide-react";

export default function Index() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-brand-primary">
                  ShopFusion
                </h1>
              </Link>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="search-input"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-5 w-5 text-ui-gray-400" />
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/products"
                className="text-foreground hover:text-brand-primary transition-colors"
              >
                Products
              </Link>
              <AuthButton />
              <CartButton />
            </nav>

            {/* Mobile Menu Button & Cart */}
            <div className="md:hidden flex items-center space-x-2">
              <CartButton />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground hover:text-brand-primary transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-ui-gray-200 py-4">
              <div className="px-4 space-y-4">
                {/* Mobile Search */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="search-input"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search className="h-5 w-5 text-ui-gray-400" />
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2">
                  <Link
                    to="/products"
                    className="block px-3 py-2 text-foreground hover:text-brand-primary hover:bg-ui-gray-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <div className="px-3 py-2">
                    <AuthButton className="w-full" />
                  </div>
                </div>
              </div>
            </div>
          )}
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
            <div>
              <h2 className="text-3xl font-serif font-bold">
                Featured Products
              </h2>
              <p className="text-ui-gray-600 mt-2">
                Hand-picked items just for you
              </p>
            </div>
            <Link
              to="/products"
              className="text-brand-primary hover:underline font-medium"
            >
              View All Products →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-16 bg-ui-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-serif font-bold flex items-center gap-3">
                <TrendingUp className="w-8 h-8 text-brand-primary" />
                Trending Now
              </h2>
              <p className="text-ui-gray-600 mt-2">
                Most popular items this week
              </p>
            </div>
            <Link
              to="/products?sort=popularity"
              className="text-brand-primary hover:underline font-medium"
            >
              See All Trending →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-ui-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "Verified Buyer",
                image:
                  "https://images.unsplash.com/photo-1494790108755-2616b612b812?w=100&h=100&fit=crop&crop=face",
                rating: 5,
                text: "Amazing quality products and lightning-fast delivery! ShopFusion has become my go-to for all online shopping.",
              },
              {
                name: "David Chen",
                role: "Premium Member",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                rating: 5,
                text: "The customer service is exceptional. They went above and beyond to help me find exactly what I needed.",
              },
              {
                name: "Emma Rodriguez",
                role: "Frequent Shopper",
                image:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                rating: 5,
                text: "Love the variety and competitive prices. The user experience is so smooth and intuitive.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-ui-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-ui-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-ui-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gradient-to-r from-luxury-purple to-luxury-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Zap className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Limited Time Offer!
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Get 25% off your first order when you sign up for our newsletter.
              Plus, enjoy free shipping on all orders over $50!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                <div className="text-2xl font-bold">25% OFF</div>
                <div className="text-sm">First Order</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30">
                <div className="text-2xl font-bold">FREE</div>
                <div className="text-sm">Shipping $50+</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/30 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <div>
                  <div className="text-lg font-bold">48H</div>
                  <div className="text-xs">Delivery</div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                to="/products"
                className="btn-primary bg-white text-luxury-purple hover:bg-ui-gray-100 text-lg px-8 py-4"
              >
                Shop Now & Save
              </Link>
            </div>
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
              <h3 className="text-xl font-serif font-bold mb-4 text-luxury-gold">
                ShopFusion
              </h3>
              <p className="text-ui-gray-300 mb-4">
                Your trusted online marketplace for quality products at
                affordable prices since 2009.
              </p>
              <div className="flex items-center gap-2 text-ui-gray-300">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Secure & Trusted</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-ui-gray-300">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?category=electronics"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?category=fashion"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    Fashion
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">
                Customer Service
              </h4>
              <ul className="space-y-2 text-ui-gray-300">
                <li>
                  <a
                    href="mailto:support@shopfusion.com"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    Contact Support
                  </a>
                </li>
                <li>
                  <Link
                    to="/checkout"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    Returns & Refunds
                  </a>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="hover:text-luxury-gold transition-colors"
                  >
                    Track Your Order
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="https://facebook.com/shopfusion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ui-gray-300 hover:text-luxury-gold transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  📘
                </a>
                <a
                  href="https://twitter.com/shopfusion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ui-gray-300 hover:text-luxury-gold transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  🐦
                </a>
                <a
                  href="https://instagram.com/shopfusion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ui-gray-300 hover:text-luxury-gold transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  📷
                </a>
              </div>
              <div className="text-ui-gray-300 text-sm">
                <p>📞 1-800-SHOPFUSION</p>
                <p>📧 support@shopfusion.com</p>
                <p>🕒 24/7 Customer Support</p>
              </div>
            </div>
          </div>
          <div className="border-t border-ui-gray-700 mt-8 pt-8 text-center text-ui-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p>&copy; 2024 ShopFusion. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
