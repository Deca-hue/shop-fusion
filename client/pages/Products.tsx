import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Product, SearchFilters } from "@shared/types";
import {
  mockProducts,
  searchProducts,
  filterByCategory,
  filterByPriceRange,
  sortProducts,
} from "@/lib/mock-data";
import { ProductGrid } from "@/components/products/ProductGrid";
import { BackButton } from "@/components/ui/BackButton";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get("category") || undefined,
    sortBy: "name",
    sortOrder: "asc",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();

    if (searchQuery) newParams.set("q", searchQuery);
    if (filters.category) newParams.set("category", filters.category);
    if (filters.sortBy) newParams.set("sort", filters.sortBy);
    if (filters.sortOrder) newParams.set("order", filters.sortOrder);

    setSearchParams(newParams);
  }, [searchQuery, filters, setSearchParams]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filters, searchQuery]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Apply search query
    if (searchQuery) {
      products = searchProducts(searchQuery, products);
    }

    // Apply category filter
    if (filters.category) {
      products = filterByCategory(filters.category, products);
    }

    // Apply price range filter
    if (filters.priceRange) {
      products = filterByPriceRange(
        filters.priceRange[0],
        filters.priceRange[1],
        products,
      );
    }

    // Apply rating filter
    if (filters.rating) {
      products = products.filter(
        (product) => product.rating >= filters.rating!,
      );
    }

    // Apply availability filter
    if (filters.inStock !== undefined) {
      products = products.filter(
        (product) => product.inStock === filters.inStock,
      );
    }

    // Apply sale filter
    if (filters.onSale) {
      products = products.filter((product) => product.onSale);
    }

    // Sort products
    return sortProducts(
      products,
      filters.sortBy || "name",
      filters.sortOrder || "asc",
    );
  }, [searchQuery, filters]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-ui-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-ui-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-4">
            <BackButton to="/" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">
                All Products
              </h1>
              <p className="text-ui-gray-600 mt-2">
                Discover our complete collection of products
              </p>
            </div>

            {/* Search Bar */}
            <div className="lg:max-w-md lg:flex-1">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ui-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input pl-10 pr-10"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-ui-gray-400 hover:text-ui-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery ||
            Object.keys(filters).some(
              (key) => filters[key as keyof SearchFilters] !== undefined,
            )) && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-ui-gray-700">
                Active filters:
              </span>

              {searchQuery && (
                <div className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm">
                  Search: "{searchQuery}"
                  <button
                    onClick={clearSearch}
                    className="ml-1 hover:text-brand-primary/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.category && (
                <div className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm">
                  Category: {filters.category}
                  <button
                    onClick={() =>
                      setFilters({ ...filters, category: undefined })
                    }
                    className="ml-1 hover:text-brand-primary/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.priceRange && (
                <div className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm">
                  Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  <button
                    onClick={() =>
                      setFilters({ ...filters, priceRange: undefined })
                    }
                    className="ml-1 hover:text-brand-primary/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {filters.rating && (
                <div className="inline-flex items-center gap-1 bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm">
                  Rating: {filters.rating}+ stars
                  <button
                    onClick={() =>
                      setFilters({ ...filters, rating: undefined })
                    }
                    className="ml-1 hover:text-brand-primary/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              {(searchQuery ||
                Object.keys(filters).some(
                  (key) => filters[key as keyof SearchFilters] !== undefined,
                )) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({ sortBy: "name", sortOrder: "asc" });
                  }}
                  className="text-sm text-ui-gray-500 hover:text-ui-gray-700 underline"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid
          products={filteredProducts}
          filters={filters}
          onFiltersChange={setFilters}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
