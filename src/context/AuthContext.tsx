"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useAccount } from "wagmi";

type UserType = {
  address: string;
  name: string;
} | null;

interface AuthContextType {
  user: UserType;
  setUser: (user: UserType) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  login: (address: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("delphi-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("delphi-user");
      }
    }
    setIsLoading(false);
  }, []);

  // Memoized login function to prevent recreation on each render
  const login = useCallback((address: string) => {
    // Check if we already have this user logged in to prevent unnecessary updates
    if (user?.address === address) return;
    
    const userData = {
      address,
      name: `User_${address.substring(2, 6)}`,
    };
    setUser(userData);
    localStorage.setItem("delphi-user", JSON.stringify(userData));
  }, [user]);

  // Memoized logout function
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("delphi-user");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        isLoading,
        showAuthModal,
        setShowAuthModal,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
