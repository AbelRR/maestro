"use client";

import { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useAccount, useConnect } from "wagmi";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login } = useAuth();
  const { address } = useAccount();
  const { connect, isPending, connectors } = useConnect();
  const [error, setError] = useState("");

  const handleConnect = useCallback(async () => {
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
  }, [connect, connectors, address, login, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Connect Wallet to Sign In
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-center py-6">
          <Button
            onClick={handleConnect}
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center gap-2 px-6 py-5 text-base"
            disabled={isPending}
          >
            <Wallet className="h-5 w-5" />
            {isPending ? "Connecting..." : "Connect Wallet"}
          </Button>
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-2">
          Your wallet serves as your identity on the platform.
        </p>
      </DialogContent>
    </Dialog>
  );
}
