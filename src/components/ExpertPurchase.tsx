"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { AccessPurchaseDetails } from '@/config/payment';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Wallet, MessageSquare } from 'lucide-react';
import { savePurchase } from '@/lib/utils';

interface ExpertPurchaseProps {
  expertSlug: string;
  expertId: string;
  expertName: string;
  expertImage: string;
  onPurchaseComplete?: () => void;
  buttonStyle?: 'price-pill' | 'chat-button';
}

export function ExpertPurchase({ 
  expertSlug, 
  expertId, 
  expertName, 
  expertImage,
  onPurchaseComplete,
  buttonStyle = 'price-pill'
}: ExpertPurchaseProps) {
  const { isConnected, address, connect } = useWallet();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fixed price of $10
  const price = 10;
  const currency = 'USD';

  const handleOpenPurchaseModal = () => {
    setShowPurchaseModal(true);
  };

  const handleClosePurchaseModal = () => {
    if (!isPurchasing) {
      setShowPurchaseModal(false);
      if (purchaseComplete) {
        setPurchaseComplete(false);
      }
      if (error) {
        setError(null);
      }
    }
  };

  const handlePurchase = async () => {
    if (!isConnected || !address) {
      // Need to connect wallet first
      return;
    }

    setIsPurchasing(true);
    setError(null);
    
    try {
      // In a real implementation, this would connect to OnchainKit and process the transaction
      // For now, we'll simulate a purchase process
      const purchaseDetails: AccessPurchaseDetails = {
        expertId,
        expertName,
        price,
        currency,
      };

      console.log('Processing purchase:', purchaseDetails);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save purchase to localStorage - use expertSlug for consistent ID
      savePurchase(address, expertSlug);
      
      // Simulate successful purchase
      setPurchaseComplete(true);
      
      // Notify parent component if callback provided
      if (onPurchaseComplete) {
        onPurchaseComplete();
      }
      
      console.log('Purchase complete!');
    } catch (err) {
      console.error('Purchase error:', err);
      setError(typeof err === 'string' ? err : 'An error occurred during the purchase process.');
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <>
      {buttonStyle === 'price-pill' ? (
        <div 
          onClick={handleOpenPurchaseModal}
          className="absolute top-2 right-2 bg-orange-500 text-white rounded-full py-1 px-3 font-medium text-sm cursor-pointer hover:bg-orange-600 transition-colors"
        >
          ${price}
        </div>
      ) : (
        <Button
          onClick={handleOpenPurchaseModal}
          className="w-full rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 flex items-center gap-2 justify-center"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Purchase Access (${price})</span>
        </Button>
      )}

      <Dialog open={showPurchaseModal} onOpenChange={handleClosePurchaseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {purchaseComplete 
                ? "Purchase Complete!" 
                : `Purchase Access to ${expertName}`}
            </DialogTitle>
            <DialogDescription>
              {purchaseComplete 
                ? "You now have access to this expert. Start chatting now!" 
                : `Connect your wallet to purchase access for $${price}.`}
            </DialogDescription>
          </DialogHeader>

          {!purchaseComplete ? (
            <>
              <div className="py-4 flex flex-col items-center">
                <img 
                  src={expertImage} 
                  alt={expertName}
                  className="w-20 h-20 rounded-full mb-4 object-cover border border-gray-200"
                  crossOrigin="anonymous"
                />
                <h3 className="text-lg font-medium">{expertName}</h3>
                <div className="mt-2 bg-orange-100 text-orange-800 py-1 px-3 rounded-full text-sm font-medium">
                  ${price} {currency}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              <DialogFooter>
                {!isConnected ? (
                  <Button 
                    onClick={() => connect()} 
                    className="w-full flex items-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
                ) : (
                  <Button 
                    onClick={handlePurchase} 
                    disabled={isPurchasing}
                    className="w-full"
                  >
                    {isPurchasing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Purchase for $${price}`
                    )}
                  </Button>
                )}
              </DialogFooter>
            </>
          ) : (
            <DialogFooter>
              <Button 
                onClick={() => {
                  handleClosePurchaseModal();
                  // In a real implementation, we'd redirect to the expert's page
                  window.location.href = `/${expertSlug}`;
                }}
                className="w-full"
              >
                Start Chatting
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 