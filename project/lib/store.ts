import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  inStock: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // User
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Filters
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  
  // Voice search
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      
      // User state
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication - in real app, this would call your API
        if (email && password) {
          const mockUser: User = {
            id: '1',
            name: 'John Doe',
            email: email,
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            phone: '+91 9876543210',
            address: 'Mumbai, Maharashtra, India'
          };
          set({ user: mockUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      register: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock registration - in real app, this would call your API
        if (name && email && password) {
          const mockUser: User = {
            id: Date.now().toString(),
            name: name,
            email: email,
            avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            phone: '',
            address: ''
          };
          set({ user: mockUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      // Search state
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      // Filter state
      selectedCategory: '',
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      priceRange: [0, 200000],
      setPriceRange: (range) => set({ priceRange: range }),
      selectedBrands: [],
      setSelectedBrands: (brands) => set({ selectedBrands: brands }),
      
      // Voice search state
      isListening: false,
      setIsListening: (listening) => set({ isListening: listening }),
    }),
    {
      name: 'indiamart-store',
      partialize: (state) => ({ 
        cart: state.cart, 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);