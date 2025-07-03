"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import { useStore } from '@/lib/store';
import { sampleProducts, formatPrice, getDiscountPercentage } from '@/lib/products';
import { toast } from 'sonner';
import Image from 'next/image';

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addToCart = useStore((state) => state.addToCart);
  
  const product = sampleProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground">The product you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const discountPercent = product.originalPrice 
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const productImages = [product.image, product.image, product.image]; // Simulate multiple images

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.brand}
              </Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive">
                      {discountPercent}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Key Features:</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleWishlist}
                    className={isWishlisted ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Delivery & Services */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Delivery & Services</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-sm">Free delivery on orders above ₹499</span>
                  </div>
                  <div className="flex items-center">
                    <RotateCcw className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-sm">7 days easy return policy</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-purple-600 mr-3" />
                    <span className="text-sm">1 year warranty included</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="text-sm">Genuine product guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Brand:</span>
                        <span className="text-muted-foreground">{product.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Category:</span>
                        <span className="text-muted-foreground">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Weight:</span>
                        <span className="text-muted-foreground">1.2 kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Dimensions:</span>
                        <span className="text-muted-foreground">15 x 10 x 5 cm</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Color:</span>
                        <span className="text-muted-foreground">Black</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Material:</span>
                        <span className="text-muted-foreground">Premium Plastic</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Warranty:</span>
                        <span className="text-muted-foreground">1 Year</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Origin:</span>
                        <span className="text-muted-foreground">Made in India</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 font-medium">Customer {review}</span>
                          <span className="ml-auto text-sm text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Great product! Highly recommended. The quality is excellent and delivery was fast.
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}