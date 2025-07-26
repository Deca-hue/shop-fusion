// Comprehensive validation utilities for security and data integrity

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Enhanced email validation with strict requirements for real emails
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Common valid email domains to check against
const VALID_EMAIL_DOMAINS = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'msn.com',
  'aol.com', 'icloud.com', 'me.com', 'mac.com', 'protonmail.com', 'mail.com',
  'yandex.com', 'zoho.com', 'fastmail.com', 'tutanota.com', 'gmx.com',
  'mail.ru', 'qq.com', '163.com', 'sina.com', 'naver.com', 'daum.net',
  // Business/Educational domains
  'company.com', 'business.com', 'corp.com', 'org.com', 'edu', 'gov',
  // Add more common domains as needed
];

// Suspicious patterns that might indicate fake emails
const SUSPICIOUS_PATTERNS = [
  /test/i, /fake/i, /example/i, /demo/i, /temp/i, /throwaway/i, /mailinator/i,
  /10minutemail/i, /guerrillamail/i, /sharklasers/i, /grr\.la/i,
  /asdf/i, /qwerty/i, /123/i, /abc/i, /xyz/i
];

// Check if email domain exists in our valid list or follows common patterns
function isValidEmailDomain(domain: string): boolean {
  const lowerDomain = domain.toLowerCase();

  // Check against known valid domains
  if (VALID_EMAIL_DOMAINS.includes(lowerDomain)) {
    return true;
  }

  // Allow common business domain patterns
  if (lowerDomain.endsWith('.com') || lowerDomain.endsWith('.org') ||
      lowerDomain.endsWith('.net') || lowerDomain.endsWith('.edu') ||
      lowerDomain.endsWith('.gov') || lowerDomain.endsWith('.mil')) {
    // Must have at least 4 chars before TLD (e.g., test.com)
    const baseDomain = lowerDomain.split('.')[0];
    return baseDomain.length >= 3;
  }

  // Allow country code domains
  if (lowerDomain.match(/\.[a-z]{2}$/)) {
    return true;
  }

  return false;
}

// Password strength validation
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

// Phone number validation (US format)
export const PHONE_REGEX =
  /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;

// Credit card validation patterns
export const CREDIT_CARD_PATTERNS = {
  visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
  mastercard: /^5[1-5][0-9]{14}$/,
  amex: /^3[47][0-9]{13}$/,
  discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
};

// Postal code patterns by country
export const POSTAL_CODE_PATTERNS = {
  US: /^\d{5}(-\d{4})?$/,
  CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/,
  UK: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/,
};

/**
 * Sanitize input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>'"]/g, "") // Remove potentially dangerous characters
    .trim()
    .slice(0, 1000); // Limit length
}

/**
 * Validate email format with enhanced real email checking
 */
export function validateEmail(email: string): string | null {
  const sanitized = sanitizeInput(email);

  if (!sanitized) return "Email is required";

  // Basic format validation
  if (!EMAIL_REGEX.test(sanitized)) return "Please enter a valid email address";
  if (sanitized.length > 254) return "Email address is too long";
  if (sanitized.length < 5) return "Email address is too short";

  // Split email into local and domain parts
  const parts = sanitized.split('@');
  if (parts.length !== 2) return "Please enter a valid email address";

  const [localPart, domain] = parts;

  // Validate local part (before @)
  if (localPart.length < 1 || localPart.length > 64) {
    return "Email address format is invalid";
  }

  // Check for suspicious patterns in local part
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(localPart)) {
      return "Please use a real email address";
    }
  }

  // Validate domain part
  if (domain.length < 3 || domain.length > 253) {
    return "Email domain is invalid";
  }

  // Check if domain looks real
  if (!isValidEmailDomain(domain)) {
    return "Please use a valid email domain (e.g., gmail.com, company.com)";
  }

  // Additional checks for realistic emails
  if (localPart.includes('..') || localPart.startsWith('.') || localPart.endsWith('.')) {
    return "Email address format is invalid";
  }

  // Check for too many consecutive numbers or letters (likely fake)
  if (/(.)\1{4,}/.test(localPart)) {
    return "Please use a real email address";
  }

  // Check for random-looking patterns
  if (localPart.length > 10 && /^[a-z]{10,}$|^[0-9]{10,}$/.test(localPart)) {
    return "Please use a real email address";
  }

  return null;
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): string | null {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (password.length > 128) return "Password is too long";

  if (!/(?=.*[a-z])/.test(password))
    return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password))
    return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password))
    return "Password must contain at least one number";
  if (!/(?=.*[@$!%*?&])/.test(password))
    return "Password must contain at least one special character";

  // Check for common weak passwords
  const commonPasswords = ["password", "123456", "qwerty", "admin", "letmein"];
  if (commonPasswords.includes(password.toLowerCase())) {
    return "Please choose a stronger password";
  }

  return null;
}

/**
 * Validate phone number
 */
export function validatePhone(phone: string): string | null {
  if (!phone) return null; // Phone is optional in most cases

  const sanitized = sanitizeInput(phone);
  if (!PHONE_REGEX.test(sanitized)) {
    return "Please enter a valid phone number";
  }

  return null;
}

/**
 * Validate credit card number using Luhn algorithm
 */
export function validateCreditCard(cardNumber: string): {
  isValid: boolean;
  type?: string;
  error?: string;
} {
  const sanitized = cardNumber.replace(/\D/g, "");

  if (!sanitized) {
    return { isValid: false, error: "Card number is required" };
  }

  if (sanitized.length < 13 || sanitized.length > 19) {
    return { isValid: false, error: "Invalid card number length" };
  }

  // Luhn algorithm validation
  let sum = 0;
  let alternate = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let n = parseInt(sanitized.charAt(i), 10);

    if (alternate) {
      n *= 2;
      if (n > 9) {
        n = (n % 10) + 1;
      }
    }

    sum += n;
    alternate = !alternate;
  }

  if (sum % 10 !== 0) {
    return { isValid: false, error: "Invalid card number" };
  }

  // Determine card type
  let cardType: string | undefined;
  for (const [type, pattern] of Object.entries(CREDIT_CARD_PATTERNS)) {
    if (pattern.test(sanitized)) {
      cardType = type;
      break;
    }
  }

  return { isValid: true, type: cardType };
}

/**
 * Validate expiry date (MM/YY format)
 */
export function validateExpiryDate(expiryDate: string): string | null {
  if (!expiryDate) return "Expiry date is required";

  const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!regex.test(expiryDate)) {
    return "Please enter a valid expiry date (MM/YY)";
  }

  const [month, year] = expiryDate.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);

  if (
    expYear < currentYear ||
    (expYear === currentYear && expMonth < currentMonth)
  ) {
    return "Card has expired";
  }

  if (expYear > currentYear + 20) {
    return "Invalid expiry date";
  }

  return null;
}

/**
 * Validate CVV
 */
export function validateCVV(cvv: string, cardType?: string): string | null {
  if (!cvv) return "CVV is required";

  const sanitized = cvv.replace(/\D/g, "");

  // AMEX uses 4 digits, others use 3
  const expectedLength = cardType === "amex" ? 4 : 3;

  if (sanitized.length !== expectedLength) {
    return `CVV must be ${expectedLength} digits`;
  }

  return null;
}

/**
 * Validate postal code based on country
 */
export function validatePostalCode(
  postalCode: string,
  country: string = "US",
): string | null {
  if (!postalCode) return "Postal code is required";

  const sanitized = sanitizeInput(postalCode.toUpperCase());
  const pattern =
    POSTAL_CODE_PATTERNS[country as keyof typeof POSTAL_CODE_PATTERNS];

  if (pattern && !pattern.test(sanitized)) {
    return `Please enter a valid ${country} postal code`;
  }

  return null;
}

/**
 * Validate required text field
 */
export function validateRequired(
  value: string,
  fieldName: string,
): string | null {
  const sanitized = sanitizeInput(value);

  if (!sanitized) {
    return `${fieldName} is required`;
  }

  if (sanitized.length > 255) {
    return `${fieldName} is too long`;
  }

  return null;
}

/**
 * Rate limiting check for sensitive operations
 */
class RateLimit {
  private attempts: Map<string, { count: number; resetTime: number }> =
    new Map();

  check(key: string, maxAttempts: number, windowMs: number): boolean {
    const now = Date.now();
    const record = this.attempts.get(key);

    if (!record || now > record.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxAttempts) {
      return false;
    }

    record.count++;
    return true;
  }

  reset(key: string): void {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimit();

/**
 * Generic form validation function
 */
export function validateForm<T extends Record<string, any>>(
  data: T,
  schema: ValidationSchema,
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    // Required validation
    if (
      rules.required &&
      (!value || (typeof value === "string" && !value.trim()))
    ) {
      errors[field] = `${field} is required`;
      continue;
    }

    // Skip further validation if field is empty and not required
    if (!value && !rules.required) continue;

    const stringValue = String(value);

    // Length validations
    if (rules.minLength && stringValue.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`;
      continue;
    }

    if (rules.maxLength && stringValue.length > rules.maxLength) {
      errors[field] =
        `${field} must be no more than ${rules.maxLength} characters`;
      continue;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(stringValue)) {
      errors[field] = `${field} format is invalid`;
      continue;
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        errors[field] = customError;
        continue;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validate form data with comprehensive security checks
 */
export function validateSecureForm<T extends Record<string, any>>(
  data: T,
  schema: ValidationSchema,
  userIdentifier?: string,
): ValidationResult & { rateLimited?: boolean } {
  // Rate limiting for sensitive operations
  if (userIdentifier && !rateLimiter.check(userIdentifier, 10, 60000)) {
    return {
      isValid: false,
      errors: { form: "Too many attempts. Please try again later." },
      rateLimited: true,
    };
  }

  // Sanitize all string inputs
  const sanitizedData = { ...data };
  for (const [key, value] of Object.entries(sanitizedData)) {
    if (typeof value === "string") {
      sanitizedData[key] = sanitizeInput(value);
    }
  }

  return validateForm(sanitizedData, schema);
}

/**
 * Security headers validation for API requests
 */
export function validateSecurityHeaders(
  headers: Record<string, string>,
): boolean {
  // Check for required security headers
  const requiredHeaders = ["content-type"];

  for (const header of requiredHeaders) {
    if (!headers[header.toLowerCase()]) {
      return false;
    }
  }

  // Validate content-type for POST requests
  if (
    headers["content-type"] &&
    !headers["content-type"].includes("application/json")
  ) {
    return false;
  }

  return true;
}

/**
 * XSS protection - encode HTML entities
 */
export function encodeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * CSRF token generation and validation
 */
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  return token === storedToken;
}
