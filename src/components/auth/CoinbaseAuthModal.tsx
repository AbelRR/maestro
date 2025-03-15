"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, X } from "lucide-react";
import { useAccount, useConnect } from "wagmi";

// QR code component
const QRCode = () => (
  <div className="w-[220px] h-[220px] mx-auto my-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
    <div className="w-full h-full bg-white flex items-center justify-center relative">
      <div className="absolute inset-0 p-3">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M30,30 L30,40 L40,40 L40,30 Z M50,30 L50,40 L60,40 L60,30 Z M70,30 L70,40 L80,40 L80,30 Z M30,50 L30,60 L40,60 L40,50 Z M50,50 L50,60 L60,60 L60,50 Z M70,50 L70,60 L80,60 L80,50 Z M30,70 L30,80 L40,80 L40,70 Z M50,70 L50,80 L60,80 L60,70 Z M70,70 L70,80 L80,80 L80,70 Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="bg-white text-black p-2 z-10 text-sm font-medium border border-gray-200 rounded shadow-sm">
        Maestro
      </div>
    </div>
  </div>
);

type CoinbaseAuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CoinbaseAuthModal({ isOpen, onClose }: CoinbaseAuthModalProps) {
  const { login } = useAuth();
  const { address } = useAccount();
  const { connect, isPending, connectors } = useConnect();
  const [error, setError] = useState("");

  const handleConnect = async () => {
    setError("");
    try {
      const connector = connectors[0];
      if (connector) {
        await connect({ connector });
        if (address) {
          login(address);
          onClose();
        }
      }
    } catch (err) {
      setError("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white text-gray-900 rounded-lg border-0">
        <div className="flex justify-between items-center p-6 pb-2 border-b">
          <DialogTitle className="text-xl font-medium text-gray-900">Connect Wallet</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 rounded-full h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          <div className="text-center mb-4 text-sm text-gray-600">
            Connect your wallet to continue
          </div>
          
          <div className="flex justify-center mt-6 mb-6">
            <Button
              onClick={handleConnect}
              className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-md flex items-center justify-center gap-2"
              disabled={isPending}
            >
              <Wallet className="h-4 w-4" />
              {isPending ? "Connecting..." : "Connect Wallet"}
            </Button>
          </div>
          
          <div className="text-center">
            <div className="text-sm text-gray-500 mt-4">
              Or scan this QR code with your wallet app
            </div>
            <QRCode />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
