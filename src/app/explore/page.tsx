"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Hero slider data
const heroSlides = [
  {
    id: 1,
    title: "How to Stay Motivated",
    expert: "Brendon Burchard",
    subtitle: "High Performance Habits",
    image: "https://ext.same-assets.com/2705240281/1000014443.jpeg",
    link: "/brendon-burchard"
  },
  {
    id: 2,
    title: "Create Meaningful Connections",
    expert: "Lewis Howes",
    subtitle: "The School of Greatness",
    image: "https://ext.same-assets.com/2109823954/849522504.png",
    link: "/lewis-howes"
  },
  {
    id: 3,
    title: "Master Your Health",
    expert: "Ben Greenfield",
    subtitle: "Optimal Wellness Expert",
    image: "https://ext.same-assets.com/1811528513/849522504.png",
    link: "/ben-greenfield"
  }
];

// Category data
const categories = [
  { id: "highlighted", label: "Highlighted", active: true },
  { id: "music", label: "Music", active: false },
  { id: "personal-development", label: "Personal Development", active: false },
  { id: "marketing", label: "Marketing", active: false },
  { id: "tech", label: "Tech", active: false },
  { id: "health-wellness", label: "Health & Wellness", active: false },
  { id: "entrepreneurship", label: "Entrepreneurship", active: false },
  { id: "all", label: "All", active: false },
];

// Experts data
const marketingExperts = [
  {
    id: 1,
    name: "Joe Polish",
    title: "Marketing Guru, President of Piranha Marketing and Founder of Genius Network",
    image: "https://ext.same-assets.com/3429033241/430660474.jpeg",
    link: "/joe-polish"
  },
  {
    id: 2,
    name: "Guy Kawasaki",
    title: "Chief evangelist of Canva and host of Remarkable People podcast",
    image: "https://ext.same-assets.com/2456019862/1914371527.png",
    link: "/guy-kawasaki"
  },
  {
    id: 3,
    name: "James Buckhouse",
    title: "24-Hour Hotline for Story, Art & Design",
    image: "https://ext.same-assets.com/3127339064/1913972723.png",
    link: "/james-buckhouse"
  },
];

const personalDevelopmentExperts = [
  {
    id: 1,
    name: "Brendon Burchard",
    title: "3-time NYT bestselling author",
    image: "https://ext.same-assets.com/2705240281/1000014443.jpeg",
    link: "/brendon-burchard"
  },
  {
    id: 2,
    name: "Lewis Howes",
    title: "Your Personal 24/7 Greatness Coach",
    image: "https://ext.same-assets.com/2109823954/849522504.png",
    link: "/lewis-howes"
  },
];

const ExpertCard = ({ expert }: { expert: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-w-3 aspect-h-2 relative h-[240px]">
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
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold">{expert.name}</h3>
        {expert.title && (
          <p className="text-gray-600 text-sm mt-1">{expert.title}</p>
        )}
      </div>
    </div>
  );
};

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("highlighted");
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  // Determine which experts to display based on active category
  let displayExperts;
  switch (activeCategory) {
    case "marketing":
      displayExperts = marketingExperts;
      break;
    case "personal-development":
      displayExperts = personalDevelopmentExperts;
      break;
    default:
      // For "highlighted" and other categories, show a mix
      displayExperts = [...marketingExperts.slice(0, 1), ...personalDevelopmentExperts];
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero Carousel */}
        <div className="relative w-full mx-auto px-4 md:px-0 max-w-7xl">
          <div className="relative h-[400px] mt-6 rounded-lg overflow-hidden">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                <div className="absolute bottom-[20%] left-12 max-w-xl text-white">
                  <div className="text-sm font-medium text-gray-300 mb-2">{slide.subtitle}</div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                  <div className="text-base mb-6">with {slide.expert}</div>
                  <Link href={slide.link}>
                    <Button className="rounded-full bg-white text-black hover:bg-white/90 font-medium px-6">
                      Talk with {slide.expert.split(" ")[0]}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {/* Navigation dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Slider arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="container py-12">
          <h2 className="text-2xl font-bold mb-6">Explore Delphi</h2>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 text-sm rounded-full whitespace-nowrap ${
                  activeCategory === category.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Expert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
