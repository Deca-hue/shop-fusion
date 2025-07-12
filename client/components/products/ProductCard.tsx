import { useState } from "react";
import { Product } from "@shared/types";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export function ProductCard({
  product,
  onQuickView,
  className,
}: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <div
      className={cn(
        "product-card group cursor-pointer relative fade-in",
        className,
      )}
    >
      {/* Product Badges */}
      <div className="absolute top-2 left-2 z-10 space-y-1">
        {product.onSale && (
          <div className="badge-sale">-{discountPercentage}%</div>
        )}
        {product.isNew && <div className="badge-new">NEW</div>}
        {product.featured && <div className="badge-featured">FEATURED</div>}
        {!product.inStock && (
          <div className="bg-ui-gray-500 text-white px-2 py-1 text-xs font-medium rounded-full">
            OUT OF STOCK
          </div>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={cn(
          "absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-md",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          isWishlisted ? "text-red-500" : "text-ui-gray-400 hover:text-red-500",
        )}
      >
        <Heart className="w-4 h-4" fill={isWishlisted ? "currentColor" : ""} />
      </button>

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-ui-gray-100">
        <img
          src={product.images[imageIndex]}
          alt={product.name}
          className="product-image group-hover:scale-105 transition-transform duration-300"
        />

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <Button
            onClick={handleQuickView}
            size="sm"
            variant="secondary"
            className="bg-white text-black hover:bg-ui-gray-100"
          >
            <Eye className="w-4 h-4 mr-1" />
            Quick View
          </Button>
          {product.inStock && (
            <Button
              onClick={handleAddToCart}
              size="sm"
              className={cn(
                "bg-brand-primary text-white hover:bg-brand-primary/90",
                isInCart(product.id) && "bg-brand-success",
              )}
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              {isInCart(product.id) ? "In Cart" : "Add to Cart"}
            </Button>
          )}
        </div>

        {/* Image Navigation Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setImageIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === imageIndex ? "bg-white" : "bg-white/50",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        {/* Category */}
        <div className="text-xs text-ui-gray-500 uppercase tracking-wide">
          {product.category}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-brand-primary transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3",
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-ui-gray-300",
                )}
              />
            ))}
          </div>
          <span className="text-sm text-ui-gray-500">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="price-tag text-brand-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="original-price">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.inStock ? (
          <div className="text-sm text-brand-success">In Stock</div>
        ) : (
          <div className="text-sm text-ui-gray-500">Out of Stock</div>
        )}

        {/* Mobile Add to Cart Button */}
        <div className="md:hidden pt-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn("w-full", isInCart(product.id) && "bg-brand-success")}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {isInCart(product.id)
              ? "In Cart"
              : product.inStock
                ? "Add to Cart"
                : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
}
