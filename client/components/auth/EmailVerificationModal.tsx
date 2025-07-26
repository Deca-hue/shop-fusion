import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Mail, Shield, Clock, CheckCircle2 } from "lucide-react";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function EmailVerificationModal({
  isOpen,
  onClose,
  email,
}: EmailVerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);

  const { verifyEmail, resendVerificationCode } = useAuth();

  // Countdown timer
  useEffect(() => {
    if (!isOpen || isVerified) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isVerified]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setVerificationCode("");
      setError("");
      setIsVerified(false);
      setTimeLeft(600);
      setCanResend(false);
    }
  }, [isOpen]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (verificationCode.length !== 6) {
      setError("Please enter the 6-digit verification code");
      setIsLoading(false);
      return;
    }

    try {
      const success = await verifyEmail(email, verificationCode);
      
      if (success) {
        setIsVerified(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError("Invalid or expired verification code. Please try again.");
      }
    } catch (err) {
      setError("Failed to verify email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    setError("");

    try {
      const success = await resendVerificationCode(email);
      if (success) {
        setTimeLeft(600);
        setCanResend(false);
      } else {
        setError("Failed to resend verification code. Please try again.");
      }
    } catch (err) {
      setError("Failed to resend verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-ui-gray-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Mail className="w-5 h-5 text-brand-primary" />
              Verify Your Email
            </h2>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isVerified ? (
              <>
                {/* Instructions */}
                <div className="mb-6 text-center">
                  <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 justify-center">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Security Verification</span>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">
                      Protecting your account with email verification
                    </p>
                  </div>
                  
                  <p className="text-sm text-ui-gray-600 mb-2">
                    We've sent a 6-digit verification code to:
                  </p>
                  <p className="font-medium text-brand-primary break-all">{email}</p>
                  
                  {timeLeft > 0 && (
                    <div className="flex items-center gap-1 justify-center mt-3 text-sm text-ui-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Code expires in {formatTime(timeLeft)}</span>
                    </div>
                  )}
                </div>

                {/* Verification Form */}
                <form onSubmit={handleVerify} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => {
                        // Only allow numbers and limit to 6 digits
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setVerificationCode(value);
                        setError("");
                      }}
                      className={cn(
                        "input-field text-center text-lg font-mono tracking-widest",
                        error && "border-red-500",
                      )}
                      placeholder="000000"
                      maxLength={6}
                      autoComplete="off"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isLoading || verificationCode.length !== 6}
                  >
                    {isLoading ? "Verifying..." : "Verify Email"}
                  </Button>
                </form>

                {/* Resend Section */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-ui-gray-600 mb-2">
                    Didn't receive the code?
                  </p>
                  {canResend || timeLeft === 0 ? (
                    <Button
                      onClick={handleResend}
                      variant="outline"
                      size="sm"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Resend Code"}
                    </Button>
                  ) : (
                    <p className="text-xs text-ui-gray-500">
                      You can resend in {formatTime(timeLeft)}
                    </p>
                  )}
                </div>
              </>
            ) : (
              /* Success State */
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Email Verified!
                </h3>
                <p className="text-sm text-ui-gray-600 mb-4">
                  Your email address has been successfully verified. You can now access all features of your account.
                </p>
                <div className="text-xs text-ui-gray-500">
                  This window will close automatically...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
