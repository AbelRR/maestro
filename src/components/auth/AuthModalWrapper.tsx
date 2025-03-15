"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useConnect } from "wagmi";
import { useCallback } from "react";

export function AuthModalWrapper() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const { connect, isPending, connectors } = useConnect();

  const handleConnect = useCallback(async () => {
    const connector = connectors[0];
    if (connector) {
      await connect({ connector });
      setShowAuthModal(false);
    }
  }, [connect, connectors, setShowAuthModal]);

  return (
    <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>
            Connect your wallet to access this content. Your wallet acts as your identity across the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6 flex justify-center">
          <Button 
            onClick={handleConnect}
            disabled={isPending}
            className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center gap-2 px-6"
          >
            <Wallet className="h-5 w-5" />
            {isPending ? "Connecting..." : "Connect Wallet"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 