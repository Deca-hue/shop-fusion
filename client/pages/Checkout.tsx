import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { AuthModal } from "@/components/auth/AuthModal";
import { BackButton } from "@/components/ui/BackButton";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Shield, Lock } from "lucide-react";

export default function Checkout() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleOrderComplete = (newOrderId: string) => {
    setOrderId(newOrderId);
    setOrderComplete(true);
  };

  const handleContinueAsGuest = () => {
    // Allow guest checkout - in production you'd collect email
    setShowAuthModal(false);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-ui-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-ui-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>

          <div className="bg-ui-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-ui-gray-800 mb-1">
              Order Number
            </p>
            <p className="text-lg font-mono text-brand-primary">{orderId}</p>
          </div>

          <div className="space-y-3 text-sm text-ui-gray-600 mb-8">
            <p>📧 A confirmation email has been sent to your email address.</p>
            <p>
              📦 You'll receive shipping updates as your order is processed.
            </p>
            <p>🔍 Track your order status in your account dashboard.</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate("/")}
              className="w-full btn-primary"
            >
              Continue Shopping
            </button>
            <Link
              to="/orders"
              className="w-full btn-secondary block text-center"
            >
              View Order Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ui-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-ui-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <h1 className="text-xl font-serif font-bold text-brand-primary">
                ShopFusion
              </h1>
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-ui-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-ui-gray-600">
                <Lock className="w-4 h-4 text-green-600" />
                <span>SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-ui-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-ui-gray-500 hover:text-brand-primary">
              Home
            </Link>
            <span className="text-ui-gray-300">/</span>
            <Link
              to="/cart"
              className="text-ui-gray-500 hover:text-brand-primary"
            >
              Cart
            </Link>
            <span className="text-ui-gray-300">/</span>
            <span className="text-brand-primary font-medium">Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Checkout</h1>
          <p className="text-ui-gray-600">
            Complete your order with secure payment processing
          </p>
        </div>

        {/* Guest Checkout Warning */}
        {!isAuthenticated && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-blue-900 mb-1">
                  Sign in for a better experience
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Create an account or sign in to save your addresses, track
                  orders, and checkout faster.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Sign In / Register
                  </button>
                  <button
                    onClick={handleContinueAsGuest}
                    className="text-sm font-medium text-blue-600 hover:underline"
                  >
                    Continue as Guest
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Form */}
        <CheckoutForm onOrderComplete={handleOrderComplete} />
      </main>

      {/* Security Footer */}
      <footer className="bg-ui-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm">256-bit SSL Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-400" />
                <span className="text-sm">PCI DSS Compliant</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-ui-gray-400">
              <span>Accepted Payment Methods:</span>
              <div className="flex gap-2">
                <span>💳</span>
                <span>🅿️</span>
                <span>🍎</span>
                <span>🅖</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="login"
      />
    </div>
  );
}
