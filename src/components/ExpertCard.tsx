"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExpertPurchase } from "@/components/ExpertPurchase";

interface Expert {
  id: string | number;
  name: string;
  title?: string;
  image: string;
  link: string;
  description?: string;
}

interface ExpertCardProps {
  expert: Expert;
  showPurchase?: boolean;
}

export function ExpertCard({ expert, showPurchase = true }: ExpertCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a price between $20 and $250
  const getExpertPrice = (expertId: string | number): number => {
    // Use the expert ID to create a deterministic price
    // This ensures the same expert always has the same price
    const idString = String(expertId);
    let hashValue = 0;
    for (let i = 0; i < idString.length; i++) {
      hashValue += idString.charCodeAt(i);
    }
    
    // Map the hash to a range between 20 and 250
    const price = 20 + (hashValue % 230);
    // Round to nearest $5
    return Math.round(price / 5) * 5;
  };
  
  const price = getExpertPrice(expert.id);
  const expertSlug = expert.link.startsWith('/') ? expert.link.substring(1) : expert.link;

  return (
    <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div
        className="aspect-w-3 aspect-h-2 relative h-[240px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={expert.image}
          alt={expert.name}
          fill
          className="object-cover"
          crossOrigin="anonymous"
        />
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Link href={expert.link}>
              <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-8">
                Chat
              </Button>
            </Link>
          </div>
        )}
        
        {/* Price pill */}
        {showPurchase && (
          <ExpertPurchase
            expertSlug={expertSlug}
            expertId={String(expert.id)}
            expertName={expert.name}
            expertImage={expert.image}
            price={price}
          />
        )}
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold">{expert.name}</h3>
        {expert.title && (
          <p className="text-gray-600 text-sm mt-1">{expert.title}</p>
        )}
      </div>
    </div>
  );
} 