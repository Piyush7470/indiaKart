"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, User, Menu, Mic, MicOff, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useStore } from '@/lib/store';
import { categories } from '@/lib/products';
import { toast } from 'sonner';

export function Header() {
  const router = useRouter();
  const { 
    cart, 
    user, 
    isAuthenticated,
    logout,
    searchQuery, 
    setSearchQuery, 
    isListening, 
    setIsListening 
  } = useStore();
  
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    router.push('/products');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setLocalSearch(transcript);
        setSearchQuery(transcript);
        router.push('/products');
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error('Voice search failed. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast.error('Voice search is not supported in your browser.');
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">IK</span>
            </div>
            <span className="font-bold text-xl text-blue-600">IndiaKart</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands and more..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={startVoiceSearch}
                  className={`h-8 w-8 p-0 ${isListening ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button type="submit" size="sm" className="h-8 w-8 p-0">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Wishlist */}
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  {isAuthenticated && user ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.name}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register">Sign Up</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4">
                  <form onSubmit={handleSearch} className="md:hidden">
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className="pr-16"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={startVoiceSearch}
                          className={`h-8 w-8 p-0 ${isListening ? 'text-red-500' : 'text-gray-500'}`}
                        >
                          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                        </Button>
                        <Button type="submit" size="sm" className="h-8 w-8 p-0">
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </form>
                  
                  {isAuthenticated && user && (
                    <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Categories</h3>
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className="block text-sm text-muted-foreground hover:text-foreground"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Category Navigation - Desktop */}
        <div className="hidden md:flex h-12 items-center space-x-6 text-sm">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}