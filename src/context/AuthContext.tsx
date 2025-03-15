"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
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
  const [hasInitialized, setHasInitialized] = useState(false);
  const { address, isConnected } = useAccount();

  // Initialize from localStorage once
  useEffect(() => {
    if (hasInitialized) return;
    
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
    setHasInitialized(true);
  }, [hasInitialized]);

  // Memoize login and logout functions
  const login = useCallback((addressToLogin: string) => {
    const userData = {
      address: addressToLogin,
      name: `User_${addressToLogin.substring(2, 6)}`,
    };
    setUser(userData);
    localStorage.setItem("delphi-user", JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("delphi-user");
  }, []);

  // Memoize setShowAuthModal to stabilize its reference
  const memoizedSetShowAuthModal = useCallback((show: boolean) => {
    setShowAuthModal(show);
  }, []);

  // Auto-login when wallet is connected
  useEffect(() => {
    if (!hasInitialized) return;
    
    // Store the current connection state to avoid stale closures
    let currentIsConnected = isConnected;
    let currentAddress = address;
    let currentUser = user;
    
    if (currentIsConnected && currentAddress) {
      // Only login if not already logged in or logged in with a different address
      if (!currentUser || currentUser.address !== currentAddress) {
        login(currentAddress);
      }
    } else if (!currentIsConnected && currentUser) {
      logout();
    }
  }, [isConnected, address, user, login, logout, hasInitialized]);

  // Memoize the context value to prevent unnecessary rerenders
  const contextValue = useMemo(() => ({
    user,
    setUser,
    isAuthenticated: !!user,
    isLoading,
    showAuthModal,
    setShowAuthModal: memoizedSetShowAuthModal,
    login,
    logout,
  }), [user, isLoading, showAuthModal, memoizedSetShowAuthModal, login, logout]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
