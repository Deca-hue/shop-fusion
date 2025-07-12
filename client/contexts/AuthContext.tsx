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

// Mock users for demo
const mockUsers: User[] = [
  {
    id: "1",
    email: "demo@shopfusion.com",
    firstName: "Demo",
    lastName: "User",
    role: "customer",
    addresses: [],
    createdAt: "2024-01-01T00:00:00Z",
    emailVerified: true,
  },
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

    // Mock authentication - in real app, this would be an API call
    const user = mockUsers.find((u) => u.email === email);

    if (user && (password === "password" || password === "admin123")) {
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
    const existingUser = mockUsers.find((u) => u.email === email);
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

    mockUsers.push(newUser);
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
