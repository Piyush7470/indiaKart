"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { Product, formatPrice, getDiscountPercentage } from '@/lib/products';
import { toast } from 'sonner';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const discountPercent = product.originalPrice 
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/product/${product.id}`}>
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
          
          {discountPercent > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              {discountPercent}% OFF
            </Badge>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
              isWishlisted ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={handleWishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-2">
            <Badge variant="secondary" className="text-xs">
              {product.brand}
            </Badge>
          </div>
          
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center mb-3">
            <span className="text-lg font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}