import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Purchase management functions
export function getUserPurchases(userAddress: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const purchasesJson = localStorage.getItem(`delphi-purchases-${userAddress}`);
    return purchasesJson ? JSON.parse(purchasesJson) : [];
  } catch (error) {
    console.error('Error loading purchases:', error);
    return [];
  }
}

export function savePurchase(userAddress: string, expertId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const purchases = getUserPurchases(userAddress);
    if (!purchases.includes(expertId)) {
      purchases.push(expertId);
      localStorage.setItem(`delphi-purchases-${userAddress}`, JSON.stringify(purchases));
    }
  } catch (error) {
    console.error('Error saving purchase:', error);
  }
}

export function hasPurchasedExpert(userAddress: string, expertId: string): boolean {
  if (typeof window === 'undefined') return false;
  const purchases = getUserPurchases(userAddress);
  return purchases.includes(expertId);
}
