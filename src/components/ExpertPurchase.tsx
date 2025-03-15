"use client";

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useAccount } from 'wagmi';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Wallet } from 'lucide-react';
import { Checkout, CheckoutButton, CheckoutStatus } from '@coinbase/onchainkit/checkout';
import type { LifecycleStatus } from '@coinbase/onchainkit/checkout';

interface ExpertPurchaseProps {
  expertSlug: string;
  expertId: string;
  expertName: string;
  expertImage: string;
  price: number;
  currency?: string;
  productId?: string; // Coinbase Commerce product ID
}

export function ExpertPurchase({ 
  expertSlug, 
  expertId, 
  expertName, 
  expertImage, 
  price, 
  currency = 'USD',
  productId, // Get this from your Coinbase Commerce dashboard
}: ExpertPurchaseProps) {
  const { isConnected, address } = useAccount();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleOpenPurchaseModal = () => {
    setShowPurchaseModal(true);
  };

  const handleClosePurchaseModal = () => {
    if (!isPurchasing && !isVerifying) {
      setShowPurchaseModal(false);
      if (purchaseComplete) {
        setPurchaseComplete(false);
      }
      if (error) {
        setError(null);
      }
    }
  };

  // This function is used to either:
  // 1. Return the productId if provided directly
  // 2. Create a charge dynamically using our API
  const chargeHandler = useCallback(async (): Promise<string> => {
    try {
      // Create a charge dynamically using our API
      const response = await fetch('/api/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expertId,
          expertName,
          price,
          currency,
          customerAddress: address,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create charge');
      }
      
      const data = await response.json();
      
      // Coinbase Commerce API returns the charge data with an 'id' field
      if (data && data.data && data.data.id) {
        console.log('Created charge:', data.data.id);
        return data.data.id;
      }
      
      throw new Error('Invalid response from charge creation API');
    } catch (err) {
      console.error('Error creating charge:', err);
      setError(err instanceof Error ? err.message : 'Failed to create charge. Please try again.');
      throw err;
    }
  }, [expertId, expertName, price, currency, address]);

  // Function to use a productId directly
  const productHandler = useCallback(async (): Promise<string> => {
    if (!productId) {
      throw new Error('No product ID provided');
    }
    
    try {
      // For demo purposes, we'll create a charge from the productId
      // In a real implementation, you'd handle this differently
      console.log('Using product ID:', productId);
      return productId;
    } catch (err) {
      console.error('Error with product ID:', err);
      setError(err instanceof Error ? err.message : 'Failed to use product. Please try again.');
      throw err;
    }
  }, [productId]);

  // Verify payment on the backend
  const verifyPayment = useCallback(async (chargeId: string) => {
    if (!address) return;
    
    setIsVerifying(true);
    
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chargeId,
          expertId,
          address,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 202) {
          // Payment is still pending, but that's okay
          console.log('Payment verification pending:', data);
          return;
        }
        
        throw new Error(data.error || 'Failed to verify payment');
      }
      
      // Payment verification successful
      console.log('Payment verified:', data);
      
      // In a real app, you might:
      // 1. Update local state with the access details
      // 2. Store access token in localStorage
      // 3. Update user permissions in your auth context
      
      // For demo purposes, we just set purchaseComplete
      setPurchaseComplete(true);
    } catch (err) {
      console.error('Payment verification error:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify payment. Please contact support.');
    } finally {
      setIsVerifying(false);
    }
  }, [expertId, address]);

  // Handle checkout status changes
  const handleStatus = useCallback((status: LifecycleStatus) => {
    try {
      const { statusName, statusData } = status;
      
      console.log('Checkout status:', statusName, statusData || {});
      
      switch (statusName) {
        case 'init':
          // Initial state
          setIsPurchasing(false);
          break;
        case 'ready':
          // Ready to process the transaction
          setIsPurchasing(true);
          setError(null);
          break;
        case 'fetchingData':
          // Fetching data
          setIsPurchasing(true);
          break;
        case 'pending':
          // Transaction pending
          setIsPurchasing(true);
          break;
        case 'success':
          // Transaction successful
          setIsPurchasing(false);
          
          // Verify the payment on our backend
          if (statusData?.chargeId) {
            verifyPayment(statusData.chargeId);
          } else {
            setPurchaseComplete(true);
            console.warn('No chargeId in success status data');
          }
          break;
        case 'error':
          // Transaction failed
          setIsPurchasing(false);
          
          // Safely extract error message from statusData if it exists
          let errorMessage = 'Unknown error occurred during payment';
          if (statusData) {
            if (typeof statusData === 'object' && statusData !== null) {
              if ('message' in statusData && typeof statusData.message === 'string') {
                errorMessage = statusData.message;
              } else if ('error' in statusData && typeof statusData.error === 'string') {
                errorMessage = statusData.error;
              }
            } else if (typeof statusData === 'string') {
              errorMessage = statusData;
            }
          }
          
          setError(`Payment error: ${errorMessage}`);
          console.error('Payment error occurred:', errorMessage);
          break;
        default:
          break;
      }
    } catch (err) {
      // Handle any unexpected errors in the status handling
      console.error('Error processing checkout status:', err);
      setIsPurchasing(false);
      setError('An unexpected error occurred. Please try again.');
    }
  }, [verifyPayment]);

  return (
    <>
      <div 
        onClick={handleOpenPurchaseModal}
        className="absolute top-2 right-2 bg-orange-500 text-white rounded-full py-1 px-3 font-medium text-sm cursor-pointer hover:bg-orange-600 transition-colors"
      >
        ${price}
      </div>

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
                    onClick={() => setIsPurchasing(true)}
                    className="w-full flex items-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
                ) : (
                  <div className="w-full">
                    {productId ? (
                      <Checkout productId={productId} onStatus={handleStatus}>
                        <CheckoutButton text={`Purchase for $${price}`} />
                        <CheckoutStatus />
                      </Checkout>
                    ) : (
                      <Checkout chargeHandler={chargeHandler} onStatus={handleStatus}>
                        <CheckoutButton text={`Purchase for $${price}`} />
                        <CheckoutStatus />
                      </Checkout>
                    )}
                    
                    {(isPurchasing || isVerifying) && (
                      <div className="mt-4 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        <span>{isVerifying ? "Verifying payment..." : "Processing payment..."}</span>
                      </div>
                    )}
                  </div>
                )}
              </DialogFooter>
            </>
          ) : (
            <DialogFooter>
              <Button 
                onClick={() => {
                  handleClosePurchaseModal();
                  // Redirect to the expert's page
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