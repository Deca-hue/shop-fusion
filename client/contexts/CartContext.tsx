import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Cart, CartItem, Product } from "@shared/types";

interface CartContextType {
  cart: Cart;
  addToCart: (
    product: Product,
    quantity?: number,
    variants?: Record<string, string>,
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | {
      type: "ADD_ITEM";
      payload: {
        product: Product;
        quantity: number;
        variants?: Record<string, string>;
      };
    }
  | { type: "REMOVE_ITEM"; payload: { itemId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { itemId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: Cart };

function cartReducer(state: Cart, action: CartAction): Cart {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity, variants } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === product.id &&
          JSON.stringify(item.selectedVariants) === JSON.stringify(variants),
      );

      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Update existing item
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          product,
          quantity,
          selectedVariants: variants,
          addedAt: new Date().toISOString(),
        };
        newItems = [...state.items, newItem];
      }

      return calculateCartTotals({ ...state, items: newItems });
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.itemId,
      );
      return calculateCartTotals({ ...state, items: newItems });
    }

    case "UPDATE_QUANTITY": {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { itemId } });
      }

      const newItems = state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item,
      );
      return calculateCartTotals({ ...state, items: newItems });
    }

    case "CLEAR_CART": {
      return {
        items: [],
        total: 0,
        subtotal: 0,
        tax: 0,
        shipping: 0,
        discounts: 0,
      };
    }

    case "LOAD_CART": {
      return action.payload;
    }

    default:
      return state;
  }
}

function calculateCartTotals(cart: Cart): Cart {
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const discounts = 0; // Could implement coupon logic here

  const total = subtotal + tax + shipping - discounts;

  return {
    ...cart,
    subtotal: Math.round(subtotal * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    discounts: Math.round(discounts * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

const initialCart: Cart = {
  items: [],
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discounts: 0,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("shopfusion_cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("shopfusion_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    variants?: Record<string, string>,
  ) => {
    if (quantity <= 0) return;
    dispatch({ type: "ADD_ITEM", payload: { product, quantity, variants } });
  };

  const removeFromCart = (itemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getTotalItems = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (productId: string) => {
    return cart.items.some((item) => item.productId === productId);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
