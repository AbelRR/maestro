"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

interface Expert {
  id: number;
  name: string;
  title: string;
  image: string;
  link: string;
}

const experts: Expert[] = [
  {
    id: 1,
    name: "Brendon Burchard",
    title: "High Performance Coach",
    image: "https://ext.same-assets.com/2705240281/1000014443.jpeg",
    link: "/brendon-burchard",
  },
  {
    id: 2,
    name: "Lewis Howes",
    title: "The School of Greatness",
    image: "https://ext.same-assets.com/2109823954/849522504.png",
    link: "/lewis-howes",
  },
  {
    id: 3,
    name: "Joe Polish",
    title: "Marketing Guru",
    image: "https://ext.same-assets.com/912308905/4211144141.jpeg",
    link: "/joe-polish",
  },
  {
    id: 4,
    name: "Marie Forleo",
    title: "Entrepreneur, Writer, and Life Coach",
    image: "https://ext.same-assets.com/1923499456/3590525356.jpeg",
    link: "/marie-forleo",
  },
  {
    id: 5,
    name: "Tom Bilyeu",
    title: "Co-Founder of Impact Theory",
    image: "https://ext.same-assets.com/1122016266/3530258868.jpeg",
    link: "/tom-bilyeu",
  },
  {
    id: 6,
    name: "Gary Vaynerchuk",
    title: "CEO of VaynerMedia",
    image: "https://ext.same-assets.com/1801423781/2486219231.jpeg",
    link: "/gary-vaynerchuk",
  },
  {
    id: 7,
    name: "Mel Robbins",
    title: "Motivational Speaker",
    image: "https://ext.same-assets.com/4132804743/1043940026.png",
    link: "/mel-robbins",
  },
  {
    id: 8,
    name: "Jay Shetty",
    title: "Former Monk, Purpose Coach",
    image: "https://ext.same-assets.com/1210758745/849522504.png",
    link: "/jay-shetty",
  },
  {
    id: 9,
    name: "Tim Ferriss",
    title: "Author, Entrepreneur, Angel Investor",
    image: "https://ext.same-assets.com/1210758745/1043940026.png",
    link: "/tim-ferriss",
  },
];

const displayExperts: Expert[] = [
  ...experts.slice(0, 3),
  ...experts.slice(0, 3),
  ...experts.slice(0, 3),
];

const categories = [
  { id: "all", name: "All" },
  { id: "personal-development", name: "Personal Development" },
  { id: "marketing", name: "Marketing" },
  { id: "tech", name: "Tech" },
  { id: "health", name: "Health & Wellness" },
];

export function ExploreSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleChatClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push(link);
    } else {
      router.push(`/login?next=${link}`);
    }
  };

  const ExpertCard = ({ expert }: { expert: Expert }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Card className="overflow-hidden">
        <div
          className="relative h-64 w-full"
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
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full"
                onClick={(e) => handleChatClick(e, expert.link)}
              >
                Chat
              </Button>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg">{expert.name}</h3>
          <p className="text-gray-500">{expert.title}</p>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Explore Experts</h2>
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeCategory === category.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayExperts.map((expert, index) => (
            <ExpertCard key={`${expert.id}-${index}`} expert={expert} />
          ))}
        </div>
      </div>
    </section>
  );
}
