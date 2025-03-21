"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModalWrapper } from "@/components/auth/AuthModalWrapper";
import { WalletProvider } from "@/context/WalletContext";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { base } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { coinbaseWallet, injected } from "wagmi/connectors";

// Create a client for React Query
const queryClient = new QueryClient();

// Create a Wagmi config
const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: "Maestro AI",
    }),
    injected(),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
  },
});

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <OnchainKitProvider
          chain={base}
          config={{
            appearance: {
              name: "Maestro AI",
              logo: "/favicon.svg",
              mode: "auto",
              theme: "default",
            },
            wallet: {
              display: "modal",
            },
          }}
        >
          <AuthProvider>
            <WalletProvider>
              <AuthModalWrapper />
              {children}
            </WalletProvider>
          </AuthProvider>
        </OnchainKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
