import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ui-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-brand-primary mb-4 gradient-text">
            404
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground mb-2">
            Page Not Found
          </h1>
          <p className="text-ui-gray-600 mb-6">
            Sorry, the page you're looking for doesn't exist. It might have been
            moved, deleted, or the URL might be incorrect.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center">
            <BackButton
              to="/"
              variant="default"
              className="bg-brand-primary text-white hover:bg-brand-primary/90"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </BackButton>
          </div>

          <Button
            onClick={() => (window.location.href = "/products")}
            variant="outline"
            className="w-full"
          >
            <Search className="w-4 h-4 mr-2" />
            Browse Products
          </Button>
        </div>

        <div className="mt-8 text-sm text-ui-gray-500">
          If you believe this is an error, please contact our support team.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
