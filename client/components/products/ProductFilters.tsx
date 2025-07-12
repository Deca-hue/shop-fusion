import { useState } from "react";
import { SearchFilters } from "@shared/types";
import { mockCategories } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";

interface ProductFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  className?: string;
}

export function ProductFilters({
  filters,
  onFiltersChange,
  className,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    category: true,
    price: true,
    rating: true,
    availability: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [values[0], values[1]],
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : undefined,
    });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating,
    });
  };

  const handleAvailabilityChange = (inStock: boolean, checked: boolean) => {
    onFiltersChange({
      ...filters,
      inStock: checked ? inStock : undefined,
    });
  };

  const handleSaleChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      onSale: checked ? true : undefined,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof SearchFilters] !== undefined,
  );

  return (
    <div
      className={cn("bg-white border border-ui-gray-200 rounded-lg", className)}
    >
      {/* Mobile Toggle */}
      <div className="md:hidden p-4 border-b border-ui-gray-200">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="outline"
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-brand-primary text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Filter Content */}
      <div className={cn("md:block", isExpanded ? "block" : "hidden md:block")}>
        {/* Header */}
        <div className="p-4 border-b border-ui-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filters</h3>
            {hasActiveFilters && (
              <Button
                onClick={clearAllFilters}
                variant="ghost"
                size="sm"
                className="text-brand-primary hover:text-brand-primary/80"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <button
              onClick={() => toggleSection("category")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-medium">Categories</h4>
              {expandedSections.category ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.category && (
              <div className="space-y-2">
                {mockCategories.map((category) => (
                  <div key={category.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={filters.category === category.id}
                        onCheckedChange={(checked) =>
                          handleCategoryChange(category.id, !!checked)
                        }
                      />
                      <label
                        htmlFor={category.id}
                        className="text-sm cursor-pointer hover:text-brand-primary"
                      >
                        {category.name} ({category.productCount})
                      </label>
                    </div>
                    {/* Subcategories */}
                    {category.subcategories && (
                      <div className="ml-6 space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <div
                            key={subcategory.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={subcategory.id}
                              checked={filters.category === subcategory.id}
                              onCheckedChange={(checked) =>
                                handleCategoryChange(subcategory.id, !!checked)
                              }
                            />
                            <label
                              htmlFor={subcategory.id}
                              className="text-sm cursor-pointer hover:text-brand-primary"
                            >
                              {subcategory.name} ({subcategory.productCount})
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection("price")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-medium">Price Range</h4>
              {expandedSections.price ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.price && (
              <div className="space-y-4">
                <div className="px-2">
                  <Slider
                    value={filters.priceRange || [0, 500]}
                    onValueChange={handlePriceRangeChange}
                    max={500}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-ui-gray-600">
                  <span>${(filters.priceRange?.[0] || 0).toFixed(0)}</span>
                  <span>${(filters.priceRange?.[1] || 500).toFixed(0)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div>
            <button
              onClick={() => toggleSection("rating")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-medium">Rating</h4>
              {expandedSections.rating ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.rating && (
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className={cn(
                      "flex items-center w-full text-left p-2 rounded hover:bg-ui-gray-50",
                      filters.rating === rating && "bg-brand-primary/10",
                    )}
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "text-sm",
                            i < rating ? "text-yellow-400" : "text-ui-gray-300",
                          )}
                        >
                          ★
                        </span>
                      ))}
                      <span className="ml-2 text-sm">& Up</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Availability & Features */}
          <div>
            <button
              onClick={() => toggleSection("availability")}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-medium">Availability</h4>
              {expandedSections.availability ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {expandedSections.availability && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock === true}
                    onCheckedChange={(checked) =>
                      handleAvailabilityChange(true, !!checked)
                    }
                  />
                  <label
                    htmlFor="in-stock"
                    className="text-sm cursor-pointer hover:text-brand-primary"
                  >
                    In Stock Only
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="on-sale"
                    checked={filters.onSale === true}
                    onCheckedChange={(checked) => handleSaleChange(!!checked)}
                  />
                  <label
                    htmlFor="on-sale"
                    className="text-sm cursor-pointer hover:text-brand-primary"
                  >
                    On Sale
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
