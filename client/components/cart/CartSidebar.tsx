import { Fragment } from "react";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, updateQuantity, removeFromCart, getTotalItems } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-ui-gray-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
              <h2 className="text-lg font-semibold">
                Shopping Cart ({getTotalItems()})
              </h2>
            </div>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                <ShoppingBag className="w-16 h-16 text-ui-gray-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>
                <p className="text-ui-gray-600 mb-6">
                  Add some products to get started
                </p>
                <Button onClick={onClose} asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 border border-ui-gray-200 rounded-lg"
                  >
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-ui-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 mb-1">
                        {item.product.name}
                      </h4>

                      {/* Variants */}
                      {item.selectedVariants && (
                        <div className="text-xs text-ui-gray-500 mb-2">
                          {Object.entries(item.selectedVariants).map(
                            ([key, value]) => (
                              <span key={key}>
                                {key}: {value}
                              </span>
                            ),
                          )}
                        </div>
                      )}

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-brand-primary">
                          ${item.product.price.toFixed(2)}
                        </span>
                        {item.product.originalPrice && (
                          <span className="text-xs text-ui-gray-500 line-through">
                            ${item.product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            variant="outline"
                            size="sm"
                            className="w-8 h-8 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          onClick={() => removeFromCart(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="border-t border-ui-gray-200 p-4 space-y-4">
              {/* Order Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>
                    {cart.shipping === 0
                      ? "Free"
                      : `$${cart.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-ui-gray-200 pt-2">
                  <span>Total:</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button className="w-full" size="lg" asChild>
                  <Link to="/checkout" onClick={onClose}>
                    Checkout
                  </Link>
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>

              {/* Free Shipping Notice */}
              {cart.subtotal < 50 && cart.subtotal > 0 && (
                <div className="text-center text-sm text-ui-gray-600 bg-ui-gray-50 p-3 rounded-lg">
                  Add ${(50 - cart.subtotal).toFixed(2)} more for free shipping!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
