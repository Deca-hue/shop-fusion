import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthButtonProps {
  className?: string;
}

export function AuthButton({ className }: AuthButtonProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={cn(
            "flex items-center gap-2 text-foreground hover:text-brand-primary transition-colors",
            className,
          )}
        >
          <User className="w-5 h-5" />
          <span className="hidden sm:inline">Hi, {user.firstName}!</span>
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-ui-gray-200 rounded-lg shadow-lg z-50 min-w-48">
            <div className="p-3 border-b border-ui-gray-200">
              <p className="font-medium text-sm">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-ui-gray-500">{user.email}</p>
            </div>
            <div className="p-1">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-ui-gray-50 rounded">
                Profile
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-ui-gray-50 rounded">
                Orders
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-ui-gray-50 rounded">
                Settings
              </button>
              {user.role === "admin" && (
                <button className="w-full text-left px-3 py-2 text-sm hover:bg-ui-gray-50 rounded text-brand-primary">
                  Admin Panel
                </button>
              )}
              <hr className="my-1" />
              <button
                onClick={() => {
                  logout();
                  setShowDropdown(false);
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-ui-gray-50 rounded text-red-600 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Close dropdown when clicking outside */}
        {showDropdown && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="ghost"
        className={cn("gap-2", className)}
      >
        <User className="w-5 h-5" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultMode="login"
      />
    </>
  );
}
