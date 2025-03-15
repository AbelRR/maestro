"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, setShowAuthModal, user } = useAuth();

  const handleSignIn = () => {
    setShowAuthModal(true);
  };

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
                <span className="ml-2 text-xl font-semibold">Delphi</span>
              </div>
            </Link>
            <nav className="hidden md:flex ml-8 space-x-8">
              {/* Explore link removed */}
              {/* Pricing, About, and Docs links removed */}
            </nav>
          </div>

          <div className="flex items-center">
            <div className="hidden md:flex">
              {isAuthenticated ? (
                <div className="flex items-center">
                  {user && (
                    <div className="mr-4 text-sm">
                      <span className="text-gray-600">{user.name}</span>
                    </div>
                  )}
                  <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                    {user && 'profilePic' in user ? (
                      <Image
                        src={user.profilePic as string}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="object-cover"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        <span className="text-sm font-medium">{user ? user.name.charAt(0) : "U"}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Button
                  onClick={handleSignIn}
                  className="rounded-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Sign in with Coinbase
                </Button>
              )}
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
              {/* Explore link removed from mobile menu as well */}
              {/* Mobile Pricing, About, and Docs links removed */}
              {!isAuthenticated && (
                <Button
                  onClick={() => {
                    handleSignIn();
                    setMobileMenuOpen(false);
                  }}
                  className="rounded-full bg-orange-500 hover:bg-orange-600 text-white self-start"
                >
                  Sign in with Coinbase
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
