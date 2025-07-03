"use client";

import { ProductCard } from './product-card';
import { sampleProducts } from '@/lib/products';

export function FeaturedProducts() {
  const featuredProducts = sampleProducts.slice(0, 4);

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
        <p className="text-muted-foreground">Discover our handpicked selection of premium products</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}