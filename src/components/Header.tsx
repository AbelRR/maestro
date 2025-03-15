"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";
import { WalletButton } from "@/components/WalletButton";
import { useWallet } from "@/context/WalletContext";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { address, isConnected } = useWallet();
  
  // Use wallet connection as authentication
  const isAuthenticated = isConnected && address !== undefined;

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center mr-1">
                <div className="relative h-8 w-8 rounded">
                  <div className="absolute inset-0 bg-black rounded-md flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20M4 12H20M4 18H20" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <span className="ml-2 text-xl font-semibold">Maestro</span>
              </div>
            </Link>
            <nav className="hidden md:flex ml-8 space-x-8">
              {/* Navigation elements removed */}
            </nav>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-4">
              <WalletButton />
            </div>

            <div className="flex md:hidden ml-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <WalletButton />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
