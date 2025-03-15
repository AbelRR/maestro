"use client";

export const paymentConfig = {
  coinbaseCommerceApiKey: process.env.NEXT_PUBLIC_COINBASE_COMMERCE_API_KEY || "",
  onchainKitApiKey: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || "",
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",
  supportedCurrencies: ["ETH", "USDC", "BTC"],
  defaultCurrency: "USDC",
  networkFee: 0.01, // 1% network fee
};

export type ExpertAccessProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  expertSlug: string;
};

export type AccessPurchaseDetails = {
  expertId: string;
  expertName: string;
  price: number;
  currency: string;
  customerEmail?: string;
}; 