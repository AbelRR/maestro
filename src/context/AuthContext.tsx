"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type UserType = {
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: UserType;
  isAuthenticated: boolean;
  isLoading: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  login: (email: string, code: string) => Promise<boolean>;
  requestCode: (email: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

  const requestCode = async (email: string): Promise<boolean> => {
    // Simulate sending auth code
    console.log(`Auth code would be sent to ${email}`);
    return true;
  };

  const login = async (email: string, code: string): Promise<boolean> => {
    // For this demo, we'll always accept code "123456"
    if (code === "123456") {
      const userData = {
        email,
        name: email.split("@")[0],
      };
      setUser(userData);
      localStorage.setItem("delphi-user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("delphi-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        showAuthModal,
        setShowAuthModal,
        login,
        requestCode,
        logout,
      }}
    >
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
