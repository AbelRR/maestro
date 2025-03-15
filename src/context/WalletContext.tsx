"use client";

// This file is kept for backward compatibility but no longer needed
// We're now using Wagmi hooks directly from the OnchainKitProvider

import React, { createContext, useContext, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';

// Empty context for backward compatibility
const WalletContext = createContext<any>({});

export const useWallet = () => {
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting, connectors } = useConnect();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();
  
  const connectWallet = async () => {
    const connector = connectors[0];
    if (connector) {
      await connect({ connector });
    }
  };
  
  return {
    address,
    isConnected,
    connect: connectWallet,
    disconnect,
    isPending: isConnecting,
    error: null,
    lifecycle: {
      status: isConnected ? 'connected' : isConnecting ? 'connecting' : 'disconnected',
      isConnecting,
      isConnected,
      isDisconnecting,
    },
  };
};

// Empty provider for backward compatibility
export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
}; 