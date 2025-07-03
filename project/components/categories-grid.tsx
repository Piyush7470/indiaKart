"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { categories } from '@/lib/products';

const categoryImages = {
  'Electronics': 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
  'Fashion': 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
  'Home & Kitchen': 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
  'Beauty & Personal Care': 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg',
  'Sports & Fitness': 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg',
  'Books & Media': 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg',
  'Automotive': 'https://images.pexels.com/photos/241316/pexels-photo-241316.jpeg',
  'Health & Wellness': 'https://images.pexels.com/photos/40751/running-runner-long-distance-fitness-40751.jpeg'
};

export function CategoriesGrid() {
  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
        <p className="text-muted-foreground">Explore our wide range of product categories</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category} href={`/products?category=${encodeURIComponent(category)}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={categoryImages[category as keyof typeof categoryImages]}
                    alt={category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-center group-hover:text-blue-600 transition-colors">
                    {category}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}