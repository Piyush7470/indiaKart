import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-gradient-to-r from-blue-600 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">IK</span>
              </div>
              <span className="font-bold text-xl">IndiaKart</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted partner for online shopping in India. Discover quality products at the best prices with fast delivery across the country.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/products" className="block text-gray-300 hover:text-white transition-colors">
                All Products
              </Link>
              <Link href="/offers" className="block text-gray-300 hover:text-white transition-colors">
                Today&apos;s Deals
              </Link>
              <Link href="/brands" className="block text-gray-300 hover:text-white transition-colors">
                Top Brands
              </Link>
              <Link href="/gift-cards" className="block text-gray-300 hover:text-white transition-colors">
                Gift Cards
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/help" className="block text-gray-300 hover:text-white transition-colors">
                Help Center
              </Link>
              <Link href="/returns" className="block text-gray-300 hover:text-white transition-colors">
                Returns & Refunds
              </Link>
              <Link href="/shipping" className="block text-gray-300 hover:text-white transition-colors">
                Shipping Info
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to get special offers, free giveaways, and deals.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>support@indiakart.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>1800-123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-gray-400">
            <p>&copy; 2024 IndiaKart. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}