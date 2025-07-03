"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/products';
import { toast } from 'sonner';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 499 ? 0 : 50;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      toast.success('Proceeding to checkout...');
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/products">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Brand: {item.brand}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} each
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-600">{formatPrice(total)}</span>
                </div>

                {shipping > 0 && (
                  <div className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-lg">
                    Add {formatPrice(499 - subtotal)} more to get FREE delivery!
                  </div>
                )}
                
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Secure Checkout Info */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div className="text-sm font-medium">Secure Checkout</div>
                  <div className="text-xs text-muted-foreground">
                    Your payment information is secure and encrypted
                  </div>
                  <div className="flex justify-center space-x-2 mt-2">
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">Visa</div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">Mastercard</div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">UPI</div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">Razorpay</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}