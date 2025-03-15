"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Featured collections data
const featuredCollections = [
  {
    id: 1,
    title: "Philosophers",
    imageUrl: "https://ext.same-assets.com/3429637089/430660474.jpeg",
    link: "/explore/collections/philosophers",
  },
  {
    id: 2,
    title: "Iconic Historical Figures",
    imageUrl: "https://ext.same-assets.com/2497039062/1913972723.png",
    link: "/explore/collections/historical-figures",
  },
];

export function FeaturedCollections() {
  const [isClient, setIsClient] = useState(false);

  // Handle client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent rendering during SSR to avoid hydration issues
  }

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>

        <div className="grid grid-cols-1 gap-6">
          {featuredCollections.map((collection) => (
            <div key={collection.id} className="relative h-[300px] rounded-lg overflow-hidden">
              <Image
                src={collection.imageUrl}
                alt={collection.title}
                fill
                className="object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">{collection.title}</h3>
                  <Link href={collection.link}>
                    <Button
                      className="rounded-full bg-white text-black hover:bg-white/90"
                    >
                      Explore
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
