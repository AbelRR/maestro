"use client";

import { useEffect, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function LoginContent() {
  const router = useRouter();
  const { setShowAuthModal, isAuthenticated } = useAuth();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  // Use useEffect with proper dependency tracking to prevent infinite loops
  useEffect(() => {
    // Create a flag to track if component is mounted to avoid state updates after unmount
    let isMounted = true;

    if (isAuthenticated && isMounted) {
      router.push(next);
    } else if (isMounted) {
      setShowAuthModal(true);
    }

    // Cleanup function to set isMounted to false when component unmounts
    return () => {
      isMounted = false;
    };
  }, [router, setShowAuthModal, next, isAuthenticated]);

  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold mb-2">Sign in to continue</h1>
      <p className="text-gray-600">Please authenticate to access this content</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <LoginContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
