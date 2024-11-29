import { HeroCarousel } from "@/components/ui/carousel-custom";
import { FeaturedProducts } from "@/components/featured-products";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <section className="py-8">
          <HeroCarousel />
        </section>
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}