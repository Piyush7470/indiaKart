"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const heroSlides = [
  {
    id: 1,
    title: "Mega Electronics Sale",
    subtitle: "Up to 70% Off on Top Brands",
    description: "Latest smartphones, laptops, and gadgets at unbeatable prices",
    image: "https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg",
    cta: "Shop Electronics",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Fashion Forward",
    subtitle: "New Collection Arrived",
    description: "Trendy clothes and accessories for every occasion",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg",
    cta: "Explore Fashion",
    category: "Fashion"
  },
  {
    id: 3,
    title: "Home & Kitchen Essentials",
    subtitle: "Transform Your Living Space",
    description: "Premium appliances and decor items for modern homes",
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg",
    cta: "Shop Home",
    category: "Home & Kitchen"
  }
];

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders above ₹499"
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round the clock assistance"
  },
  {
    icon: ShoppingBag,
    title: "Easy Returns",
    description: "7 days return policy"
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="space-y-8">
      {/* Hero Carousel */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-yellow-300">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg mb-8 opacity-90">
                      {slide.description}
                    </p>
                    <Link href={`/products?category=${encodeURIComponent(slide.category)}`}>
                      <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3">
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <feature.icon className="h-8 w-8 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}