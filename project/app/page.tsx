import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { CategoriesGrid } from '@/components/categories-grid';
import { FeaturedProducts } from '@/components/featured-products';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-12">
        <HeroSection />
        <CategoriesGrid />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}