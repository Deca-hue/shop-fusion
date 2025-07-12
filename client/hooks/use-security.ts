import { useState, useEffect, useCallback } from "react";
import {
  generateCSRFToken,
  validateCSRFToken,
  rateLimiter,
  encodeHtml,
} from "@/lib/validation";

interface SecurityState {
  csrfToken: string;
  isRateLimited: boolean;
  isSecure: boolean;
}

interface SecurityOptions {
  enableCSRF?: boolean;
  enableRateLimit?: boolean;
  maxAttempts?: number;
  windowMs?: number;
}

export function useSecurity(
  userIdentifier?: string,
  options: SecurityOptions = {},
) {
  const {
    enableCSRF = true,
    enableRateLimit = true,
    maxAttempts = 5,
    windowMs = 60000,
  } = options;

  const [securityState, setSecurityState] = useState<SecurityState>({
    csrfToken: "",
    isRateLimited: false,
    isSecure:
      typeof window !== "undefined" && window.location.protocol === "https:",
  });

  // Generate CSRF token on mount
  useEffect(() => {
    if (enableCSRF) {
      const token = generateCSRFToken();
      setSecurityState((prev) => ({ ...prev, csrfToken: token }));

      // Store in session storage for validation
      sessionStorage.setItem("csrf_token", token);
    }
  }, [enableCSRF]);

  // Check if request is rate limited
  const checkRateLimit = useCallback(
    (identifier: string = userIdentifier || "anonymous"): boolean => {
      if (!enableRateLimit) return true;

      const allowed = rateLimiter.check(identifier, maxAttempts, windowMs);
      setSecurityState((prev) => ({ ...prev, isRateLimited: !allowed }));
      return allowed;
    },
    [enableRateLimit, maxAttempts, windowMs, userIdentifier],
  );

  // Validate CSRF token
  const validateCSRF = useCallback(
    (token: string): boolean => {
      if (!enableCSRF) return true;

      const storedToken = sessionStorage.getItem("csrf_token");
      return validateCSRFToken(token, storedToken || "");
    },
    [enableCSRF],
  );

  // Secure form submission
  const secureSubmit = useCallback(
    async <T>(
      submitFn: () => Promise<T>,
      identifier?: string,
    ): Promise<{ success: boolean; data?: T; error?: string }> => {
      try {
        // Rate limiting check
        if (!checkRateLimit(identifier)) {
          return {
            success: false,
            error: "Too many attempts. Please try again later.",
          };
        }

        // CSRF validation for sensitive operations
        if (enableCSRF) {
          const isValid = validateCSRF(securityState.csrfToken);
          if (!isValid) {
            return { success: false, error: "Invalid security token." };
          }
        }

        // Execute the submission
        const data = await submitFn();
        return { success: true, data };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "An error occurred",
        };
      }
    },
    [checkRateLimit, validateCSRF, enableCSRF, securityState.csrfToken],
  );

  // Reset rate limit for a user
  const resetRateLimit = useCallback(
    (identifier: string = userIdentifier || "anonymous") => {
      rateLimiter.reset(identifier);
      setSecurityState((prev) => ({ ...prev, isRateLimited: false }));
    },
    [userIdentifier],
  );

  // Generate new CSRF token
  const refreshCSRF = useCallback(() => {
    if (enableCSRF) {
      const token = generateCSRFToken();
      setSecurityState((prev) => ({ ...prev, csrfToken: token }));
      sessionStorage.setItem("csrf_token", token);
    }
  }, [enableCSRF]);

  // Secure input handler that prevents XSS
  const secureInput = useCallback((value: string): string => {
    return encodeHtml(value.trim().slice(0, 1000)); // Limit length and encode
  }, []);

  // Check if environment is secure
  const isSecureEnvironment = useCallback((): boolean => {
    return (
      typeof window !== "undefined" &&
      (window.location.protocol === "https:" ||
        window.location.hostname === "localhost")
    );
  }, []);

  // Security headers for API requests
  const getSecurityHeaders = useCallback((): Record<string, string> => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (enableCSRF && securityState.csrfToken) {
      headers["X-CSRF-Token"] = securityState.csrfToken;
    }

    return headers;
  }, [enableCSRF, securityState.csrfToken]);

  return {
    securityState,
    checkRateLimit,
    validateCSRF,
    secureSubmit,
    resetRateLimit,
    refreshCSRF,
    secureInput,
    isSecureEnvironment,
    getSecurityHeaders,
  };
}

// Hook for monitoring security events
export function useSecurityMonitor() {
  const [securityEvents, setSecurityEvents] = useState<
    Array<{
      type: string;
      timestamp: number;
      details: string;
    }>
  >([]);

  const logSecurityEvent = useCallback((type: string, details: string) => {
    const event = {
      type,
      timestamp: Date.now(),
      details,
    };

    setSecurityEvents((prev) => [...prev.slice(-9), event]); // Keep last 10 events

    // In production, you would send this to your security monitoring service
    console.warn(`Security Event [${type}]:`, details);
  }, []);

  const detectSuspiciousActivity = useCallback(
    (activity: {
      rapidRequests?: boolean;
      invalidTokens?: boolean;
      unusualPatterns?: boolean;
    }) => {
      if (activity.rapidRequests) {
        logSecurityEvent(
          "RAPID_REQUESTS",
          "Unusually fast request pattern detected",
        );
      }

      if (activity.invalidTokens) {
        logSecurityEvent(
          "INVALID_TOKENS",
          "Multiple invalid CSRF tokens submitted",
        );
      }

      if (activity.unusualPatterns) {
        logSecurityEvent("UNUSUAL_PATTERNS", "Unusual user behavior detected");
      }
    },
    [logSecurityEvent],
  );

  return {
    securityEvents,
    logSecurityEvent,
    detectSuspiciousActivity,
  };
}

// Content Security Policy helper
export function useContentSecurityPolicy() {
  useEffect(() => {
    // Set CSP meta tag if not already present
    if (
      typeof document !== "undefined" &&
      !document.querySelector('meta[http-equiv="Content-Security-Policy"]')
    ) {
      const meta = document.createElement("meta");
      meta.httpEquiv = "Content-Security-Policy";
      meta.content =
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "style-src 'self' 'unsafe-inline' fonts.googleapis.com; " +
        "font-src 'self' fonts.gstatic.com; " +
        "img-src 'self' data: https:; " +
        "connect-src 'self' https:; " +
        "frame-src 'none'; " +
        "object-src 'none';";

      document.head.appendChild(meta);
    }
  }, []);
}

// Input sanitization hook
export function useSanitizedInput(initialValue: string = "") {
  const [value, setValue] = useState(initialValue);
  const [sanitizedValue, setSanitizedValue] = useState(initialValue);

  const updateValue = useCallback((newValue: string) => {
    setValue(newValue);

    // Sanitize input
    const sanitized = newValue
      .replace(/[<>'"]/g, "") // Remove potentially dangerous characters
      .trim()
      .slice(0, 1000); // Limit length

    setSanitizedValue(sanitized);
  }, []);

  return {
    value,
    sanitizedValue,
    updateValue,
    setValue: updateValue,
  };
}
