"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExpertPurchase } from "@/components/ExpertPurchase";
import { useAuth } from "@/context/AuthContext";
import { hasPurchasedExpert } from "@/lib/utils";
import { MessageSquare } from "lucide-react";

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
  const { user, isAuthenticated } = useAuth();
  const [hasPurchased, setHasPurchased] = useState(false);
  
  const expertSlug = expert.link.startsWith('/') ? expert.link.substring(1) : expert.link;
  
  // Check if the user has purchased this expert
  useEffect(() => {
    if (isAuthenticated && user?.address) {
      setHasPurchased(hasPurchasedExpert(user.address, expertSlug));
    }
  }, [isAuthenticated, user, expertSlug]);

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
            {hasPurchased ? (
              <Link href={expert.link}>
                <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-8 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Chat Now</span>
                </Button>
              </Link>
            ) : (
              <div onClick={(e) => {
                e.preventDefault();
                document.querySelector(`[data-expert-id="${expert.id}"]`)?.dispatchEvent(
                  new MouseEvent('click', { bubbles: true })
                );
              }}>
                <Button className="rounded-full bg-orange-500 hover:bg-orange-600 text-white px-8">
                  Purchase for $10
                </Button>
              </div>
            )}
          </div>
        )}
        
        {/* Show price pill only if not purchased and showPurchase is true */}
        {showPurchase && !hasPurchased && (
          <div data-expert-id={expert.id}>
            <ExpertPurchase
              expertSlug={expertSlug}
              expertId={String(expert.id)}
              expertName={expert.name}
              expertImage={expert.image}
              onPurchaseComplete={() => setHasPurchased(true)}
            />
          </div>
        )}
        
        {/* Show "Purchased" indicator if already purchased */}
        {showPurchase && hasPurchased && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full py-1 px-3 font-medium text-sm cursor-pointer">
            Purchased
          </div>
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