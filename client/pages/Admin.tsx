import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { updateAdminCredentials } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { mockProducts, mockCategories } from "@/lib/mock-data";
import { Product, Category } from "@shared/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/BackButton";
import {
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  BarChart3,
  DollarSign,
  Star,
  Zap,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function Admin() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");

  // Security form states
  const [adminCredentials, setAdminCredentials] = useState({
    email: "admin@shopfusion.com",
    password: "@Shop254",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [emailForm, setEmailForm] = useState({
    currentEmail: "",
    newEmail: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Calculate live analytics from real data
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stockCount,
    0,
  );
  const inStockProducts = products.filter((p) => p.inStock).length;
  const outOfStockProducts = products.filter((p) => !p.inStock).length;
  const onSaleProducts = products.filter((p) => p.onSale).length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const newProducts = products.filter((p) => p.isNew).length;
  const lowStockProducts = products.filter(
    (p) => p.stockCount < 10 && p.inStock,
  ).length;

  // Calculate category distribution
  const categoryStats = products.reduce(
    (acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Generate revenue data based on product ratings and stock
  const generateRevenueData = () => {
    const now = new Date();
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const baseRevenue = products.reduce((sum, p) => {
        const dailySales = Math.floor(p.rating * p.reviewCount * 0.001); // Sales based on popularity
        return sum + p.price * dailySales;
      }, 0);
      const variance = 0.3; // 30% variance
      const dailyRevenue = baseRevenue * (1 + (Math.random() - 0.5) * variance);
      data.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        revenue: Math.round(dailyRevenue),
      });
    }
    return data;
  };

  const revenueData = generateRevenueData();
  const weeklyRevenue = revenueData.reduce((sum, day) => sum + day.revenue, 0);
  const totalSales = products.reduce((sum, p) => sum + p.reviewCount, 0); // Use review count as sales proxy

  const stats = {
    totalProducts,
    totalCategories: mockCategories.length,
    totalSales,
    totalRevenue: Math.round(weeklyRevenue * 4.33), // Monthly revenue
    weeklyRevenue,
    lowStockProducts,
    outOfStockProducts,
    inStockProducts,
    onSaleProducts,
    featuredProducts,
    newProducts,
    averageProductValue: Math.round(totalValue / totalProducts),
    inventoryValue: Math.round(totalValue),
    conversionRate: 2.4 + Math.random() * 0.8, // 2.4-3.2%
  };

  // Password change handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    // Validate current password
    if (passwordForm.currentPassword !== adminCredentials.password) {
      alert("Current password is incorrect");
      setIsUpdating(false);
      return;
    }

    // Validate new passwords match
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords don't match");
      setIsUpdating(false);
      return;
    }

    // Validate password length
    if (passwordForm.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      setIsUpdating(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update credentials in context and local state
    updateAdminCredentials(adminCredentials.email, passwordForm.newPassword);
    setAdminCredentials((prev) => ({
      ...prev,
      password: passwordForm.newPassword,
    }));

    // Clear form
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setIsUpdating(false);
    alert(
      "Password updated successfully! Please use the new password for future logins.",
    );
  };

  // Email change handler
  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    // Validate current email
    if (emailForm.currentEmail !== adminCredentials.email) {
      alert("Current email is incorrect");
      setIsUpdating(false);
      return;
    }

    // Validate new email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailForm.newEmail)) {
      alert("Please enter a valid email address");
      setIsUpdating(false);
      return;
    }

    // Check if new email is different from current
    if (emailForm.newEmail === adminCredentials.email) {
      alert("New email must be different from current email");
      setIsUpdating(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update credentials in context and local state
    updateAdminCredentials(emailForm.newEmail, adminCredentials.password);
    setAdminCredentials((prev) => ({
      ...prev,
      email: emailForm.newEmail,
    }));

    // Clear form
    setEmailForm({
      currentEmail: "",
      newEmail: "",
    });

    setIsUpdating(false);
    alert(
      "Email updated successfully! Please use the new email for future logins.",
    );
  };

  return (
    <div className="min-h-screen bg-ui-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-ui-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-brand-primary">
                Admin Panel
              </h1>
              <span className="text-sm text-ui-gray-500">
                Welcome back, {user.firstName}!
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/settings")}
                variant="outline"
                size="sm"
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button onClick={() => navigate("/")} variant="ghost" size="sm">
                View Store
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <BackButton to="/" />
        </div>
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-4">
              <ul className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                  { id: "products", label: "Products", icon: Package },
                  { id: "categories", label: "Categories", icon: Filter },
                  { id: "orders", label: "Orders", icon: ShoppingCart },
                  { id: "customers", label: "Customers", icon: Users },
                  { id: "analytics", label: "Analytics", icon: TrendingUp },
                  { id: "security", label: "Security", icon: Settings },
                ].map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors",
                        activeTab === tab.id
                          ? "bg-brand-primary text-white"
                          : "text-ui-gray-700 hover:bg-ui-gray-100",
                      )}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Dashboard Overview
                  </h2>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-ui-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-ui-gray-600">
                            Total Products
                          </p>
                          <p className="text-2xl font-bold text-brand-primary">
                            {stats.totalProducts}
                          </p>
                          <p className="text-xs text-ui-gray-500 mt-1">
                            {stats.inStockProducts} in stock,{" "}
                            {stats.outOfStockProducts} out
                          </p>
                        </div>
                        <Package className="w-8 h-8 text-brand-primary" />
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-ui-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-ui-gray-600">
                            Monthly Revenue
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            ${stats.totalRevenue.toLocaleString()}
                          </p>
                          <p className="text-xs text-green-600 mt-1">
                            +{((stats.conversionRate - 2) * 10).toFixed(1)}%
                            this month
                          </p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-ui-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-ui-gray-600">
                            Total Sales
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            {stats.totalSales.toLocaleString()}
                          </p>
                          <p className="text-xs text-ui-gray-500 mt-1">
                            Avg: ${stats.averageProductValue}
                          </p>
                        </div>
                        <ShoppingCart className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border border-ui-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-ui-gray-600">
                            Inventory Value
                          </p>
                          <p className="text-2xl font-bold text-purple-600">
                            ${stats.inventoryValue.toLocaleString()}
                          </p>
                          <p className="text-xs text-orange-600 mt-1">
                            {stats.lowStockProducts} low stock alerts
                          </p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-600" />
                      </div>
                    </div>
                  </div>

                  {/* Additional Analytics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-gold text-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/80">
                            Featured Products
                          </p>
                          <p className="text-2xl font-bold">
                            {stats.featuredProducts}
                          </p>
                          <p className="text-xs text-white/70 mt-1">
                            {(
                              (stats.featuredProducts / stats.totalProducts) *
                              100
                            ).toFixed(1)}
                            % of catalog
                          </p>
                        </div>
                        <Star className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="bg-gradient-navy text-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/80">New Products</p>
                          <p className="text-2xl font-bold">
                            {stats.newProducts}
                          </p>
                          <p className="text-xs text-white/70 mt-1">
                            Added this month
                          </p>
                        </div>
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="bg-gradient-purple text-white p-6 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-white/80">On Sale</p>
                          <p className="text-2xl font-bold">
                            {stats.onSaleProducts}
                          </p>
                          <p className="text-xs text-white/70 mt-1">
                            Active promotions
                          </p>
                        </div>
                        <TrendingDown className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Category Performance */}
                  <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Category Performance
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {Object.entries(categoryStats).map(
                        ([category, count]) => (
                          <div
                            key={category}
                            className="text-center p-3 bg-ui-gray-50 rounded-lg hover:bg-ui-gray-100 transition-colors"
                          >
                            <div className="text-2xl font-bold text-brand-primary">
                              {count}
                            </div>
                            <div className="text-sm text-ui-gray-600 capitalize">
                              {category}
                            </div>
                            <div className="text-xs text-ui-gray-500">
                              {((count / stats.totalProducts) * 100).toFixed(1)}
                              %
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Revenue Trend */}
                  <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4">
                      Weekly Revenue Trend
                    </h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {revenueData.map((day, index) => {
                        const maxRevenue = Math.max(
                          ...revenueData.map((d) => d.revenue),
                        );
                        const height = (day.revenue / maxRevenue) * 100;
                        return (
                          <div
                            key={index}
                            className="flex-1 flex flex-col items-center"
                          >
                            <div
                              className="w-full bg-gradient-to-t from-brand-primary to-brand-accent rounded-t-md mb-2 min-h-[20px] relative group"
                              style={{ height: `${height}%` }}
                            >
                              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                ${day.revenue.toLocaleString()}
                              </div>
                            </div>
                            <div className="text-xs text-ui-gray-600">
                              {day.date}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 text-center">
                      <div className="text-sm text-ui-gray-600">
                        Weekly Total:{" "}
                        <span className="font-semibold text-green-600">
                          ${stats.weeklyRevenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          action: "New order placed",
                          details: "Order #12345 - $89.99",
                          time: "2 minutes ago",
                        },
                        {
                          action: "Product updated",
                          details: "Wireless Headphones - Price changed",
                          time: "15 minutes ago",
                        },
                        {
                          action: "Low stock alert",
                          details: "Smart Watch - Only 3 items left",
                          time: "1 hour ago",
                        },
                        {
                          action: "New customer registered",
                          details: "john.doe@example.com",
                          time: "2 hours ago",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 border-b border-ui-gray-100 last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {activity.action}
                            </p>
                            <p className="text-sm text-ui-gray-600">
                              {activity.details}
                            </p>
                          </div>
                          <span className="text-xs text-ui-gray-500">
                            {activity.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Products Management */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Products Management</h2>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Import
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Product
                    </Button>
                  </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-ui-gray-200">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ui-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-ui-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-ui-gray-50 border-b border-ui-gray-200">
                        <tr>
                          <th className="text-left py-3 px-4 font-medium text-sm text-ui-gray-700">
                            Product
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-sm text-ui-gray-700">
                            Category
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-sm text-ui-gray-700">
                            Price
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-sm text-ui-gray-700">
                            Stock
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-sm text-ui-gray-700">
                            Status
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-sm text-ui-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr
                            key={product.id}
                            className="border-b border-ui-gray-100 hover:bg-ui-gray-50"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.images[0]}
                                  alt={product.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-sm">
                                    {product.name}
                                  </p>
                                  <p className="text-xs text-ui-gray-600">
                                    ID: {product.id}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm capitalize">
                              {product.category}
                            </td>
                            <td className="py-3 px-4 text-sm font-medium">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <span
                                className={cn(
                                  "font-medium",
                                  product.stockCount < 10
                                    ? "text-orange-600"
                                    : product.stockCount === 0
                                      ? "text-red-600"
                                      : "text-green-600",
                                )}
                              >
                                {product.stockCount}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              <span
                                className={cn(
                                  "px-2 py-1 rounded-full text-xs font-medium",
                                  product.inStock
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800",
                                )}
                              >
                                {product.inStock ? "In Stock" : "Out of Stock"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center gap-2 justify-end">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Categories Management */}
            {activeTab === "categories" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Categories Management</h2>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockCategories.map((category) => (
                    <div
                      key={category.id}
                      className="bg-white p-6 rounded-lg shadow-sm border border-ui-gray-200"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-lg mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-ui-gray-600 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-ui-gray-500">
                          {category.productCount} products
                        </span>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Management */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-6">
                    Security Management
                  </h2>
                  <p className="text-ui-gray-600 mb-8">
                    Manage admin access credentials and security settings
                  </p>
                </div>

                {/* Admin Credentials */}
                <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Admin Login Credentials
                  </h3>
                  <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-brand-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-brand-primary mb-1">
                          Current Admin Credentials
                        </h4>
                        <p className="text-sm text-ui-gray-700 mb-2">
                          These credentials are required for admin access. Keep
                          them secure and change them regularly.
                        </p>
                        <div className="bg-ui-gray-50 rounded p-3 font-mono text-sm">
                          <div className="mb-1">
                            <span className="text-ui-gray-600">Email:</span>{" "}
                            <span className="font-medium">
                              {adminCredentials.email}
                            </span>
                          </div>
                          <div>
                            <span className="text-ui-gray-600">Password:</span>{" "}
                            <span className="font-medium">
                              {adminCredentials.password}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-4">Change Admin Email</h4>
                      <form onSubmit={handleEmailChange} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                            Current Admin Email
                          </label>
                          <input
                            type="email"
                            value={emailForm.currentEmail}
                            onChange={(e) =>
                              setEmailForm((prev) => ({
                                ...prev,
                                currentEmail: e.target.value,
                              }))
                            }
                            className="input-field"
                            placeholder="Enter current email"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                            New Admin Email
                          </label>
                          <input
                            type="email"
                            value={emailForm.newEmail}
                            onChange={(e) =>
                              setEmailForm((prev) => ({
                                ...prev,
                                newEmail: e.target.value,
                              }))
                            }
                            className="input-field"
                            placeholder="Enter new email"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Update Email"}
                        </Button>
                      </form>
                    </div>

                    <div>
                      <h4 className="font-medium mb-4">
                        Change Admin Password
                      </h4>
                      <form
                        onSubmit={handlePasswordChange}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(e) =>
                              setPasswordForm((prev) => ({
                                ...prev,
                                currentPassword: e.target.value,
                              }))
                            }
                            className="input-field"
                            placeholder="Current password"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) =>
                              setPasswordForm((prev) => ({
                                ...prev,
                                newPassword: e.target.value,
                              }))
                            }
                            className="input-field"
                            placeholder="New password (min 8 characters)"
                            required
                            minLength={8}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) =>
                              setPasswordForm((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                              }))
                            }
                            className="input-field"
                            placeholder="Confirm new password"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Update Password"}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Security Settings
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-ui-gray-700">
                            Two-Factor Authentication
                          </label>
                          <p className="text-sm text-ui-gray-500">
                            Add extra security to admin access
                          </p>
                        </div>
                        <input type="checkbox" className="filter-checkbox" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-ui-gray-700">
                            Login Notifications
                          </label>
                          <p className="text-sm text-ui-gray-500">
                            Get notified of admin logins
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="filter-checkbox"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-sm font-medium text-ui-gray-700">
                            Session Timeout
                          </label>
                          <p className="text-sm text-ui-gray-500">
                            Auto-logout after inactivity
                          </p>
                        </div>
                        <select className="px-3 py-1 border border-ui-gray-300 rounded text-sm">
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="480">8 hours</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-ui-gray-700 mb-2">
                          Allowed IP Addresses
                        </label>
                        <textarea
                          className="input-field resize-none"
                          rows={3}
                          placeholder="Enter IP addresses (one per line)&#10;Leave empty to allow all IPs"
                        />
                      </div>
                      <Button variant="outline" className="w-full">
                        Update IP Restrictions
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Access Logs */}
                <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Recent Admin Access
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        time: "2 minutes ago",
                        action: "Admin login",
                        ip: "192.168.1.100",
                        location: "San Francisco, CA",
                        success: true,
                      },
                      {
                        time: "1 hour ago",
                        action: "Password change attempt",
                        ip: "192.168.1.100",
                        location: "San Francisco, CA",
                        success: true,
                      },
                      {
                        time: "3 hours ago",
                        action: "Failed login attempt",
                        ip: "203.45.67.89",
                        location: "Unknown",
                        success: false,
                      },
                      {
                        time: "1 day ago",
                        action: "Admin logout",
                        ip: "192.168.1.100",
                        location: "San Francisco, CA",
                        success: true,
                      },
                    ].map((log, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 px-4 bg-ui-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              log.success ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium">{log.action}</p>
                            <p className="text-xs text-ui-gray-500">
                              {log.ip} • {log.location}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-ui-gray-500">
                          {log.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm">
                      View All Logs
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {["orders", "customers", "analytics"].includes(activeTab) && (
              <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-ui-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Package className="w-8 h-8 text-ui-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 capitalize">
                  {activeTab} Management
                </h3>
                <p className="text-ui-gray-600 mb-4">
                  This section is coming soon. Full {activeTab} management
                  features will be available in the next update.
                </p>
                <Button variant="outline">Learn More</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
