import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  CreditCard,
  Download,
  RefreshCw,
  Filter,
  Search,
  Eye,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shipping: {
    address: string;
    method: string;
    tracking?: string;
  };
  payment: {
    method: string;
    last4: string;
  };
}

export default function Orders() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  // Mock orders data - in a real app, this would come from an API
  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: "SF-2024-001",
      date: "2024-01-20T10:30:00Z",
      status: "delivered",
      total: 299.97,
      items: [
        {
          id: "1",
          name: "Wireless Bluetooth Headphones",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
          price: 99.99,
          quantity: 1,
        },
        {
          id: "2",
          name: "Smart Fitness Watch",
          image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
          price: 199.99,
          quantity: 1,
        },
      ],
      shipping: {
        address: "123 Main St, San Francisco, CA 94105",
        method: "Standard Shipping",
        tracking: "1Z999AA1234567890",
      },
      payment: {
        method: "Credit Card",
        last4: "1234",
      },
    },
    {
      id: "2",
      orderNumber: "SF-2024-002",
      date: "2024-01-18T14:15:00Z",
      status: "shipped",
      total: 149.99,
      items: [
        {
          id: "3",
          name: "Premium Coffee Maker",
          image:
            "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop",
          price: 149.99,
          quantity: 1,
        },
      ],
      shipping: {
        address: "456 Oak Ave, Los Angeles, CA 90210",
        method: "Express Shipping",
        tracking: "1Z999AA1987654321",
      },
      payment: {
        method: "PayPal",
        last4: "5678",
      },
    },
    {
      id: "3",
      orderNumber: "SF-2024-003",
      date: "2024-01-15T09:45:00Z",
      status: "processing",
      total: 79.99,
      items: [
        {
          id: "4",
          name: "Ergonomic Laptop Stand",
          image:
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop",
          price: 79.99,
          quantity: 1,
        },
      ],
      shipping: {
        address: "789 Pine St, Seattle, WA 98101",
        method: "Standard Shipping",
      },
      payment: {
        method: "Credit Card",
        last4: "9012",
      },
    },
  ];

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesDate =
      dateFilter === "all" ||
      (() => {
        const orderDate = new Date(order.date);
        const now = new Date();
        switch (dateFilter) {
          case "last30":
            return (
              now.getTime() - orderDate.getTime() <= 30 * 24 * 60 * 60 * 1000
            );
          case "last90":
            return (
              now.getTime() - orderDate.getTime() <= 90 * 24 * 60 * 60 * 1000
            );
          case "last365":
            return (
              now.getTime() - orderDate.getTime() <= 365 * 24 * 60 * 60 * 1000
            );
          default:
            return true;
        }
      })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "processing":
        return <RefreshCw className="w-4 h-4 text-blue-500" />;
      case "shipped":
        return <Truck className="w-4 h-4 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "cancelled":
        return <Package className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "shipped":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      case "cancelled":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-ui-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-ui-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <BackButton to="/" />
          <div className="mt-4">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-foreground">
              My Orders
            </h1>
            <p className="text-ui-gray-600 mt-2 text-sm md:text-base">
              Track and manage your order history
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-4 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ui-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders or products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-ui-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm md:text-base"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="min-w-0 sm:w-40">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-ui-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm md:text-base"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="min-w-0 sm:w-40">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-ui-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary text-sm md:text-base"
                >
                  <option value="all">All Time</option>
                  <option value="last30">Last 30 days</option>
                  <option value="last90">Last 90 days</option>
                  <option value="last365">Last year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-ui-gray-200 p-8 md:p-12 text-center">
            <ShoppingBag className="w-12 h-12 md:w-16 md:h-16 text-ui-gray-400 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-semibold text-ui-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-ui-gray-600 mb-6 text-sm md:text-base">
              {searchQuery || statusFilter !== "all" || dateFilter !== "all"
                ? "Try adjusting your search or filters"
                : "You haven't placed any orders yet"}
            </p>
            <Link
              to="/products"
              className="btn-primary inline-flex items-center gap-2 text-sm md:text-base"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-ui-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="border-b border-ui-gray-200 p-4 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div>
                        <h3 className="font-semibold text-base md:text-lg">
                          Order {order.orderNumber}
                        </h3>
                        <p className="text-sm text-ui-gray-600 flex items-center gap-1 mt-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span
                          className={`px-3 py-1 text-xs md:text-sm font-medium rounded-full border capitalize ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="text-right">
                        <p className="text-lg md:text-xl font-bold text-brand-primary">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-ui-gray-600">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs md:text-sm"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {order.status === "delivered" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs md:text-sm"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            Invoice
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 md:p-6">
                  <div className="grid gap-3 md:gap-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 md:gap-4"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm md:text-base line-clamp-1">
                            {item.name}
                          </h4>
                          <p className="text-xs md:text-sm text-ui-gray-600">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm md:text-base">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment Info */}
                <div className="border-t border-ui-gray-200 p-4 md:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <h5 className="font-medium text-sm md:text-base mb-2 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Shipping Information
                      </h5>
                      <p className="text-sm text-ui-gray-600 mb-1">
                        {order.shipping.address}
                      </p>
                      <p className="text-sm text-ui-gray-600 mb-1">
                        {order.shipping.method}
                      </p>
                      {order.shipping.tracking && (
                        <p className="text-sm text-brand-primary font-medium">
                          Tracking: {order.shipping.tracking}
                        </p>
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium text-sm md:text-base mb-2 flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Payment Information
                      </h5>
                      <p className="text-sm text-ui-gray-600">
                        {order.payment.method}
                      </p>
                      <p className="text-sm text-ui-gray-600">
                        **** **** **** {order.payment.last4}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
