"use client";

import { useAuth } from "@/context/AuthContext";
import { CoinbaseAuthModal } from "./CoinbaseAuthModal";

export function AuthModalWrapper() {
  const { showAuthModal, setShowAuthModal } = useAuth();

  return (
    <CoinbaseAuthModal 
      isOpen={showAuthModal} 
      onClose={() => setShowAuthModal(false)} 
    />
  );
} 