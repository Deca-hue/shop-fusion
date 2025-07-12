export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="header-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-serif font-bold text-brand-primary">
                ShopFusion
              </h1>
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
              <a href="#" className="text-foreground hover:text-brand-primary">
                Account
              </a>
              <a
                href="#"
                className="text-foreground hover:text-brand-primary relative"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </a>
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
              <button className="btn-primary bg-white text-brand-primary hover:bg-ui-gray-100">
                Shop Now
              </button>
              <button className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-brand-primary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-ui-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Electronics", icon: "📱" },
              { name: "Fashion", icon: "👕" },
              { name: "Home & Garden", icon: "🏠" },
              { name: "Sports", icon: "⚽" },
              { name: "Books", icon: "📚" },
              { name: "Beauty", icon: "💄" },
              { name: "Toys", icon: "🧸" },
              { name: "Food", icon: "🍕" },
            ].map((category, index) => (
              <div
                key={index}
                className="product-card text-center p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
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
            <button className="text-brand-primary hover:underline">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Wireless Headphones",
                price: 99.99,
                originalPrice: 149.99,
                image:
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
                badge: "SALE",
              },
              {
                name: "Smart Watch",
                price: 199.99,
                image:
                  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
                badge: "NEW",
              },
              {
                name: "Coffee Maker",
                price: 79.99,
                image:
                  "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
                badge: "FEATURED",
              },
              {
                name: "Laptop Stand",
                price: 49.99,
                image:
                  "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
              },
            ].map((product, index) => (
              <div key={index} className="product-card relative group">
                {product.badge && (
                  <div
                    className={`product-badge ${
                      product.badge === "SALE"
                        ? "badge-sale"
                        : product.badge === "NEW"
                          ? "badge-new"
                          : "badge-featured"
                    }`}
                  >
                    {product.badge}
                  </div>
                )}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="price-tag text-brand-primary">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="original-price">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="cart-button w-full">Add to Cart</button>
                </div>
              </div>
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
