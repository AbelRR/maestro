"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function WalletButton() {
  const { logout, login } = useAuth();
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Use a ref to track if we've already logged in this connection session
  const [hasLoggedIn, setHasLoggedIn] = useState(false);

  // Handle wallet connection/disconnection with proper conditions
  useEffect(() => {
    if (isConnected && address && !hasLoggedIn) {
      setHasLoggedIn(true);
      login(address);
    } else if (!isConnected && hasLoggedIn) {
      setHasLoggedIn(false);
    }
  }, [isConnected, address, login, hasLoggedIn]);

  const handleConnectWallet = async () => {
    try {
      // Find the first available connector
      const connector = connectors[0];
      if (connector) {
        await connect({ connector });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    logout();
    setShowDropdown(false);
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="relative">
      {!isConnected ? (
        <Button
          onClick={handleConnectWallet}
          className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center gap-2"
          disabled={isConnecting}
        >
          <Wallet className="h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <>
          <Button
            onClick={() => setShowDropdown(!showDropdown)}
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            {formatAddress(address || '')}
          </Button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
} 