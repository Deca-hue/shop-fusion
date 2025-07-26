import React, { createContext, useContext, useReducer, useEffect } from "react";
import { User, AuthState } from "@shared/types";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  sendVerificationEmail: (email: string) => Promise<boolean>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  resendVerificationCode: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR" }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: Partial<User> };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, isLoading: true };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case "LOGIN_ERROR":
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case "UPDATE_USER":
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };

    default:
      return state;
  }
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

// Dynamic admin credentials storage
let adminCredentials = {
  email: "admin@shopfusion.com",
  password: "@Shop254",
};

// Registered users storage (only admin exists by default)
const registeredUsers: User[] = [
  {
    id: "2",
    email: "admin@shopfusion.com",
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    addresses: [],
    createdAt: "2024-01-01T00:00:00Z",
    emailVerified: true,
  },
];

// User passwords storage (separate from user data for security)
const userPasswords: Record<string, string> = {};

// Email verification codes storage (in real app, this would be in backend)
const verificationCodes: Record<string, { code: string; expires: number; attempts: number }> = {};

// Function to update admin credentials
export function updateAdminCredentials(newEmail: string, newPassword: string) {
  adminCredentials.email = newEmail;
  adminCredentials.password = newPassword;

  // Update the user in registeredUsers array
  const adminUser = registeredUsers.find((u) => u.role === "admin");
  if (adminUser) {
    adminUser.email = newEmail;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("shopfusion_user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: "LOGIN_SUCCESS", payload: user });
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("shopfusion_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Authentication - check registered users
    const user = registeredUsers.find((u) => u.email === email);

    if (
      user &&
      ((user.role === "customer" && userPasswords[email] === password) ||
        (user.role === "admin" &&
          email === adminCredentials.email &&
          password === adminCredentials.password))
    ) {
      localStorage.setItem("shopfusion_user", JSON.stringify(user));
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return true;
    } else {
      dispatch({ type: "LOGIN_ERROR" });
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<boolean> => {
    dispatch({ type: "LOGIN_START" });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = registeredUsers.find((u) => u.email === email);
    if (existingUser) {
      dispatch({ type: "LOGIN_ERROR" });
      return false;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      firstName,
      lastName,
      role: "customer",
      addresses: [],
      createdAt: new Date().toISOString(),
      emailVerified: false,
    };

    // Store user and password securely
    registeredUsers.push(newUser);
    userPasswords[email] = password;

    localStorage.setItem("shopfusion_user", JSON.stringify(newUser));
    dispatch({ type: "LOGIN_SUCCESS", payload: newUser });
    return true;
  };

  const logout = () => {
    localStorage.removeItem("shopfusion_user");
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (userData: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...userData };
      localStorage.setItem("shopfusion_user", JSON.stringify(updatedUser));
      dispatch({ type: "UPDATE_USER", payload: userData });
    }
  };

  const sendVerificationEmail = async (email: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes

    verificationCodes[email] = { code, expires, attempts: 0 };

    // In real app, send email here
    console.log(`Verification code for ${email}: ${code}`);

    // For demo, show the code in an alert
    alert(`Verification code sent to ${email}: ${code}\n\nThis is demo mode - in production, this would be sent via email.`);

    return true;
  };

  const verifyEmail = async (email: string, inputCode: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const verification = verificationCodes[email];
    if (!verification) {
      return false;
    }

    verification.attempts++;

    // Check if code is expired
    if (Date.now() > verification.expires) {
      delete verificationCodes[email];
      return false;
    }

    // Check if too many attempts
    if (verification.attempts > 3) {
      delete verificationCodes[email];
      return false;
    }

    // Check if code matches
    if (verification.code === inputCode) {
      // Mark user as verified
      const user = registeredUsers.find((u) => u.email === email);
      if (user) {
        user.emailVerified = true;

        // Update current user if logged in
        if (state.user && state.user.email === email) {
          const updatedUser = { ...state.user, emailVerified: true };
          localStorage.setItem("shopfusion_user", JSON.stringify(updatedUser));
          dispatch({ type: "UPDATE_USER", payload: { emailVerified: true } });
        }
      }

      delete verificationCodes[email];
      return true;
    }

    return false;
  };

  const resendVerificationCode = async (email: string): Promise<boolean> => {
    // Reset attempts
    if (verificationCodes[email]) {
      verificationCodes[email].attempts = 0;
    }

    return await sendVerificationEmail(email);
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
