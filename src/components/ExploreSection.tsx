"use client";

import { useState } from "react";
import { ExpertCard } from "@/components/ExpertCard";

interface Expert {
  id: number;
  name: string;
  title: string;
  image: string;
  link: string;
  description: string;
}

const experts: Expert[] = [
  {
    id: 1,
    name: "Brendon Burchard",
    title: "High Performance Coach",
    image: "https://ext.same-assets.com/2705240281/1000014443.jpeg",
    link: "/brendon-burchard",
    description: "The world's leading high performance coach and one of the most-watched, quoted, and followed personal development trainers of our time.",
  },
  {
    id: 2,
    name: "Lewis Howes",
    title: "The School of Greatness",
    image: "https://ext.same-assets.com/2109823954/849522504.png",
    link: "/lewis-howes",
    description: "Former pro athlete turned bestselling author and podcast host, focusing on business, relationships, and personal development.",
  },
  {
    id: 3,
    name: "Joe Polish",
    title: "Marketing Guru",
    image: "https://ext.same-assets.com/912308905/4211144141.jpeg",
    link: "/joe-polish",
    description: "Founder of Genius Network, one of the highest-level marketing masterminds in the world, focusing on business growth strategies.",
  },
  {
    id: 4,
    name: "Marie Forleo",
    title: "Entrepreneur, Writer, and Life Coach",
    image: "https://ext.same-assets.com/1923499456/3590525356.jpeg",
    link: "/marie-forleo",
    description: "Named by Oprah as a thought leader for the next generation, Marie helps entrepreneurs build businesses and lives they love.",
  },
  {
    id: 5,
    name: "Tom Bilyeu",
    title: "Co-Founder of Impact Theory",
    image: "https://ext.same-assets.com/1122016266/3530258868.jpeg",
    link: "/tom-bilyeu",
    description: "After co-founding the billion-dollar brand Quest Nutrition, Tom now focuses on helping people develop the skills they need to improve themselves and the world.",
  },
  {
    id: 6,
    name: "Gary Vaynerchuk",
    title: "CEO of VaynerMedia",
    image: "https://ext.same-assets.com/1801423781/2486219231.jpeg",
    link: "/gary-vaynerchuk",
    description: "Serial entrepreneur and chairman of VaynerX, a modern-day media and communications holding company, focusing on digital marketing and entrepreneurship.",
  },
  {
    id: 7,
    name: "Mel Robbins",
    title: "Motivational Speaker",
    image: "https://ext.same-assets.com/4132804743/1043940026.png",
    link: "/mel-robbins",
    description: "Creator of the '5 Second Rule' and renowned for her practical, no-nonsense approach to personal development and overcoming anxiety.",
  },
  {
    id: 8,
    name: "Jay Shetty",
    title: "Former Monk, Purpose Coach",
    image: "https://ext.same-assets.com/1210758745/849522504.png",
    link: "/jay-shetty",
    description: "Former monk turned award-winning host, storyteller, and purpose coach, helping people find and pursue their purpose in life.",
  },
  {
    id: 9,
    name: "Tim Ferriss",
    title: "Author, Entrepreneur, Angel Investor",
    image: "https://ext.same-assets.com/1210758745/1043940026.png",
    link: "/tim-ferriss",
    description: "Author of 'The 4-Hour Workweek' and host of The Tim Ferriss Show podcast, focusing on deconstructing world-class performers across various fields.",
  },
];

const displayExperts: Expert[] = [
  ...experts.slice(0, 3),
  ...experts.slice(3, 6),
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
            <ExpertCard 
              key={`${expert.id}-${index}`} 
              expert={expert}
              showPurchase={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
