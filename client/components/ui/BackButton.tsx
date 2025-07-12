import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  to?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "ghost" | "outline";
}

export function BackButton({
  to,
  className,
  children = "Back",
  variant = "ghost",
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      onClick={handleBack}
      variant={variant}
      className={cn(
        "gap-2 text-ui-gray-600 hover:text-brand-primary",
        className,
      )}
    >
      <ArrowLeft className="w-4 h-4" />
      {children}
    </Button>
  );
}
