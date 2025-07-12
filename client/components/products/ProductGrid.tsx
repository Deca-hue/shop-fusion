import { useState } from "react";
import { Product, SearchFilters } from "@shared/types";
import { ProductCard } from "./ProductCard";
import { ProductFilters } from "./ProductFilters";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Grid, List, ArrowUpDown } from "lucide-react";

interface ProductGridProps {
  products: Product[];
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  isLoading?: boolean;
  className?: string;
}

export function ProductGrid({
  products,
  filters,
  onFiltersChange,
  isLoading = false,
  className,
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortOptions = [
    { value: "name:asc", label: "Name A-Z" },
    { value: "name:desc", label: "Name Z-A" },
    { value: "price:asc", label: "Price Low to High" },
    { value: "price:desc", label: "Price High to Low" },
    { value: "rating:desc", label: "Highest Rated" },
    { value: "newest:desc", label: "Newest First" },
    { value: "popularity:desc", label: "Most Popular" },
  ];

  const handleSortChange = (sortValue: string) => {
    const [sortBy, sortOrder] = sortValue.split(":");
    onFiltersChange({
      ...filters,
      sortBy: sortBy as any,
      sortOrder: sortOrder as "asc" | "desc",
    });
    setShowSortMenu(false);
  };

  const currentSort = filters.sortBy
    ? `${filters.sortBy}:${filters.sortOrder || "asc"}`
    : "name:asc";

  const currentSortLabel =
    sortOptions.find((option) => option.value === currentSort)?.label ||
    "Name A-Z";

  if (isLoading) {
    return (
      <div className={cn("flex flex-col lg:flex-row gap-8", className)}>
        {/* Filters Skeleton */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-ui-gray-200 animate-pulse h-96 rounded-lg"></div>
        </div>

        {/* Products Skeleton */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-ui-gray-200 animate-pulse h-96 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col lg:flex-row gap-8", className)}>
      {/* Filters Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        <ProductFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          className="sticky top-4"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 p-4 bg-white border border-ui-gray-200 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm text-ui-gray-600">
              {products.length} product{products.length !== 1 ? "s" : ""} found
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <Button
                onClick={() => setShowSortMenu(!showSortMenu)}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <ArrowUpDown className="w-4 h-4" />
                {currentSortLabel}
              </Button>

              {showSortMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-ui-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className={cn(
                        "w-full text-left px-4 py-2 text-sm hover:bg-ui-gray-50",
                        "first:rounded-t-lg last:rounded-b-lg",
                        currentSort === option.value &&
                          "bg-brand-primary/10 text-brand-primary",
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center border border-ui-gray-200 rounded-lg">
              <Button
                onClick={() => setViewMode("grid")}
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => setViewMode("list")}
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-ui-gray-400 mb-4">
              <Grid className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-ui-gray-600 mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button onClick={() => onFiltersChange({})} variant="outline">
              Clear all filters
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4",
            )}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className={
                  viewMode === "list"
                    ? "flex flex-row items-center max-w-none"
                    : ""
                }
              />
            ))}
          </div>
        )}

        {/* Load More Button (for pagination) */}
        {products.length > 0 && products.length % 12 === 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
