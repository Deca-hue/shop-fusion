import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Address, PaymentInfo } from "@shared/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CreditCard,
  MapPin,
  User,
  Mail,
  Phone,
  Lock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface CheckoutFormProps {
  onOrderComplete: (orderId: string) => void;
}

interface FormData {
  shipping: Omit<Address, "id" | "isDefault">;
  billing: Omit<Address, "id" | "isDefault">;
  payment: {
    method: "card" | "paypal" | "apple_pay" | "google_pay";
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
  };
  sameAsBilling: boolean;
  saveAddress: boolean;
}

export function CheckoutForm({ onOrderComplete }: CheckoutFormProps) {
  const { cart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    shipping: {
      type: "shipping",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      phone: "",
    },
    billing: {
      type: "billing",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      company: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      phone: "",
    },
    payment: {
      method: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
    },
    sameAsBilling: true,
    saveAddress: false,
  });

  const updateFormData = (
    section: keyof FormData,
    field: string,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors((prev) => ({ ...prev, [`${section}.${field}`]: "" }));
    }
  };

  const validateStep = (stepNumber: number) => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      // Validate shipping address
      if (!formData.shipping.firstName)
        newErrors["shipping.firstName"] = "First name is required";
      if (!formData.shipping.lastName)
        newErrors["shipping.lastName"] = "Last name is required";
      if (!formData.shipping.address1)
        newErrors["shipping.address1"] = "Address is required";
      if (!formData.shipping.city)
        newErrors["shipping.city"] = "City is required";
      if (!formData.shipping.state)
        newErrors["shipping.state"] = "State is required";
      if (!formData.shipping.postalCode)
        newErrors["shipping.postalCode"] = "Postal code is required";

      // Validate billing address if different
      if (!formData.sameAsBilling) {
        if (!formData.billing.firstName)
          newErrors["billing.firstName"] = "First name is required";
        if (!formData.billing.lastName)
          newErrors["billing.lastName"] = "Last name is required";
        if (!formData.billing.address1)
          newErrors["billing.address1"] = "Address is required";
        if (!formData.billing.city)
          newErrors["billing.city"] = "City is required";
        if (!formData.billing.state)
          newErrors["billing.state"] = "State is required";
        if (!formData.billing.postalCode)
          newErrors["billing.postalCode"] = "Postal code is required";
      }
    } else if (stepNumber === 2) {
      // Validate payment
      if (formData.payment.method === "card") {
        if (!formData.payment.cardNumber)
          newErrors["payment.cardNumber"] = "Card number is required";
        if (!formData.payment.expiryDate)
          newErrors["payment.expiryDate"] = "Expiry date is required";
        if (!formData.payment.cvv) newErrors["payment.cvv"] = "CVV is required";
        if (!formData.payment.cardName)
          newErrors["payment.cardName"] = "Cardholder name is required";

        // Validate card number format (basic)
        const cardNumber = formData.payment.cardNumber.replace(/\s/g, "");
        if (cardNumber.length < 13 || cardNumber.length > 19) {
          newErrors["payment.cardNumber"] = "Invalid card number";
        }

        // Validate expiry date format (MM/YY)
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryRegex.test(formData.payment.expiryDate)) {
          newErrors["payment.expiryDate"] = "Invalid expiry date (MM/YY)";
        }

        // Validate CVV
        if (!/^\d{3,4}$/.test(formData.payment.cvv)) {
          newErrors["payment.cvv"] = "Invalid CVV";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(2)) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order
      const orderId = `ORDER-${Date.now()}`;

      // Clear cart
      clearCart();

      // Complete order
      onOrderComplete(orderId);
    } catch (error) {
      setErrors({ submit: "Payment failed. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiryDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .substr(0, 5);
  };

  if (cart.items.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-ui-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-ui-gray-600">Add some products to checkout</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { number: 1, title: "Shipping & Billing" },
            { number: 2, title: "Payment" },
            { number: 3, title: "Review & Place Order" },
          ].map((s, index) => (
            <div
              key={s.number}
              className={cn("flex items-center", index < 2 && "flex-1")}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= s.number
                    ? "bg-brand-primary text-white"
                    : "bg-ui-gray-200 text-ui-gray-600",
                )}
              >
                {step > s.number ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  s.number
                )}
              </div>
              <span
                className={cn(
                  "ml-2 text-sm font-medium",
                  step >= s.number ? "text-brand-primary" : "text-ui-gray-600",
                )}
              >
                {s.title}
              </span>
              {index < 2 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-4",
                    step > s.number ? "bg-brand-primary" : "bg-ui-gray-200",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          {/* Step 1: Shipping & Billing */}
          {step === 1 && (
            <div className="space-y-8">
              {/* Shipping Address */}
              <div className="bg-white border border-ui-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                  Shipping Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.firstName}
                      onChange={(e) =>
                        updateFormData("shipping", "firstName", e.target.value)
                      }
                      className={cn(
                        "input-field",
                        errors["shipping.firstName"] && "border-red-500",
                      )}
                    />
                    {errors["shipping.firstName"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["shipping.firstName"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.lastName}
                      onChange={(e) =>
                        updateFormData("shipping", "lastName", e.target.value)
                      }
                      className={cn(
                        "input-field",
                        errors["shipping.lastName"] && "border-red-500",
                      )}
                    />
                    {errors["shipping.lastName"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["shipping.lastName"]}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.company}
                      onChange={(e) =>
                        updateFormData("shipping", "company", e.target.value)
                      }
                      className="input-field"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.address1}
                      onChange={(e) =>
                        updateFormData("shipping", "address1", e.target.value)
                      }
                      className={cn(
                        "input-field",
                        errors["shipping.address1"] && "border-red-500",
                      )}
                      placeholder="Street address"
                    />
                    {errors["shipping.address1"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["shipping.address1"]}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={formData.shipping.address2}
                      onChange={(e) =>
                        updateFormData("shipping", "address2", e.target.value)
                      }
                      className="input-field"
                      placeholder="Apartment, suite, etc. (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.city}
                      onChange={(e) =>
                        updateFormData("shipping", "city", e.target.value)
                      }
                      className={cn(
                        "input-field",
                        errors["shipping.city"] && "border-red-500",
                      )}
                    />
                    {errors["shipping.city"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["shipping.city"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.state}
                      onChange={(e) =>
                        updateFormData("shipping", "state", e.target.value)
                      }
                      className={cn(
                        "input-field",
                        errors["shipping.state"] && "border-red-500",
                      )}
                    />
                    {errors["shipping.state"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["shipping.state"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={formData.shipping.postalCode}
                      onChange={(e) =>
                        updateFormData("shipping", "postalCode", e.target.value)
                      }
                      className={cn(
                        "input-field",
                        errors["shipping.postalCode"] && "border-red-500",
                      )}
                    />
                    {errors["shipping.postalCode"] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors["shipping.postalCode"]}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.shipping.phone}
                      onChange={(e) =>
                        updateFormData("shipping", "phone", e.target.value)
                      }
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white border border-ui-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-primary" />
                    Billing Address
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="same-as-shipping"
                      checked={formData.sameAsBilling}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          sameAsBilling: !!checked,
                        }))
                      }
                    />
                    <label htmlFor="same-as-shipping" className="text-sm">
                      Same as shipping address
                    </label>
                  </div>
                </div>

                {!formData.sameAsBilling && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Similar billing fields as shipping */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.billing.firstName}
                        onChange={(e) =>
                          updateFormData("billing", "firstName", e.target.value)
                        }
                        className={cn(
                          "input-field",
                          errors["billing.firstName"] && "border-red-500",
                        )}
                      />
                      {errors["billing.firstName"] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["billing.firstName"]}
                        </p>
                      )}
                    </div>
                    {/* Add other billing fields similar to shipping */}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button onClick={handleNext} size="lg">
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="bg-white border border-ui-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-brand-primary" />
                  Payment Information
                </h3>

                {/* Payment Methods */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { id: "card", label: "Credit Card", icon: "💳" },
                    { id: "paypal", label: "PayPal", icon: "🅿️" },
                    { id: "apple_pay", label: "Apple Pay", icon: "🍎" },
                    { id: "google_pay", label: "Google Pay", icon: "🅖" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() =>
                        updateFormData("payment", "method", method.id)
                      }
                      className={cn(
                        "p-4 border-2 rounded-lg text-center transition-colors",
                        formData.payment.method === method.id
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-ui-gray-200 hover:border-ui-gray-300",
                      )}
                    >
                      <div className="text-2xl mb-2">{method.icon}</div>
                      <div className="text-sm font-medium">{method.label}</div>
                    </button>
                  ))}
                </div>

                {/* Card Details */}
                {formData.payment.method === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={formData.payment.cardNumber}
                        onChange={(e) =>
                          updateFormData(
                            "payment",
                            "cardNumber",
                            formatCardNumber(e.target.value),
                          )
                        }
                        className={cn(
                          "input-field",
                          errors["payment.cardNumber"] && "border-red-500",
                        )}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      {errors["payment.cardNumber"] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["payment.cardNumber"]}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={formData.payment.expiryDate}
                          onChange={(e) =>
                            updateFormData(
                              "payment",
                              "expiryDate",
                              formatExpiryDate(e.target.value),
                            )
                          }
                          className={cn(
                            "input-field",
                            errors["payment.expiryDate"] && "border-red-500",
                          )}
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                        {errors["payment.expiryDate"] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors["payment.expiryDate"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          value={formData.payment.cvv}
                          onChange={(e) =>
                            updateFormData(
                              "payment",
                              "cvv",
                              e.target.value.replace(/\D/g, ""),
                            )
                          }
                          className={cn(
                            "input-field",
                            errors["payment.cvv"] && "border-red-500",
                          )}
                          placeholder="123"
                          maxLength={4}
                        />
                        {errors["payment.cvv"] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors["payment.cvv"]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={formData.payment.cardName}
                        onChange={(e) =>
                          updateFormData("payment", "cardName", e.target.value)
                        }
                        className={cn(
                          "input-field",
                          errors["payment.cardName"] && "border-red-500",
                        )}
                        placeholder="John Doe"
                      />
                      {errors["payment.cardName"] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors["payment.cardName"]}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Other payment methods */}
                {formData.payment.method !== "card" && (
                  <div className="text-center py-8">
                    <p className="text-ui-gray-600 mb-4">
                      You will be redirected to{" "}
                      {formData.payment.method === "paypal"
                        ? "PayPal"
                        : formData.payment.method === "apple_pay"
                          ? "Apple Pay"
                          : "Google Pay"}{" "}
                      to complete your payment.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-between">
                <Button onClick={handleBack} variant="outline" size="lg">
                  Back
                </Button>
                <Button onClick={handleNext} size="lg">
                  Review Order
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Place Order */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="bg-white border border-ui-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Review Your Order
                </h3>

                {/* Order Summary */}
                <div className="space-y-4">
                  {cart.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 py-4 border-b border-ui-gray-200 last:border-b-0"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-ui-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-600">{errors.submit}</p>
                </div>
              )}

              <div className="flex justify-between">
                <Button onClick={handleBack} variant="outline" size="lg">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={isProcessing}
                  className="min-w-[200px]"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    `Place Order - $${cart.total.toFixed(2)}`
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-ui-gray-200 rounded-lg p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({cart.items.length} items):</span>
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
              <div className="border-t border-ui-gray-200 pt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {cart.subtotal < 50 && cart.subtotal > 0 && (
              <div className="mt-4 p-3 bg-brand-primary/10 rounded-lg">
                <p className="text-sm text-brand-primary">
                  Add ${(50 - cart.subtotal).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
