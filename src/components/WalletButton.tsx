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

  // Handle wallet connection/disconnection with proper dependency tracking
  useEffect(() => {
    // Only attempt to login if connected and we have an address
    if (isConnected && address) {
      login(address);
    }
    // Intentionally only depend on isConnected and address to prevent loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);

  const handleConnectWallet = useCallback(async () => {
    try {
      // Find the first available connector
      const connector = connectors[0];
      if (connector) {
        await connect({ connector });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, [connect, connectors]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    logout();
    setShowDropdown(false);
  }, [disconnect, logout]);

  const formatAddress = useCallback((addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  }, []);

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