"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Slides data
const slides = [
  {
    id: 1,
    title: "How to Stay Motivated",
    subtitle: "High Performance Habits",
    expert: "Brendon Burchard",
    image: "https://ext.same-assets.com/2705240281/1000014443.jpeg",
    link: "/brendon-burchard"
  },
  {
    id: 2,
    title: "Create Meaningful Connections",
    subtitle: "The School of Greatness",
    expert: "Lewis Howes",
    image: "https://ext.same-assets.com/2109823954/849522504.png",
    link: "/lewis-howes"
  },
  {
    id: 3,
    title: "Master Your Marketing",
    subtitle: "Marketing Expertise",
    expert: "Joe Polish",
    image: "https://ext.same-assets.com/912308905/4211144141.jpeg",
    link: "/joe-polish"
  },
  {
    id: 4,
    title: "Turn Your Passion into Business",
    subtitle: "Entrepreneurship",
    expert: "Marie Forleo",
    image: "https://ext.same-assets.com/1923499456/3590525356.jpeg",
    link: "/marie-forleo"
  },
  {
    id: 5,
    title: "Build an Unbreakable Mindset",
    subtitle: "Impact Theory",
    expert: "Tom Bilyeu",
    image: "https://ext.same-assets.com/1122016266/3530258868.jpeg",
    link: "/tom-bilyeu"
  },
  {
    id: 6,
    title: "The Entrepreneurial Hustle",
    subtitle: "Business & Marketing",
    expert: "Gary Vaynerchuk",
    image: "https://ext.same-assets.com/1801423781/2486219231.jpeg",
    link: "/gary-vaynerchuk"
  },
  {
    id: 7,
    title: "The 5-Second Rule for Change",
    subtitle: "Personal Development",
    expert: "Mel Robbins",
    image: "https://ext.same-assets.com/4132804743/1043940026.png",
    link: "/mel-robbins"
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Set up auto-rotation for slides
  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Don't render during SSR to avoid hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-full mx-auto px-4 md:px-0 max-w-7xl">
      <div className="relative h-[400px] mt-6 rounded-lg overflow-hidden">
        {slides.map((slide, index) => (
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
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
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
  );
}
