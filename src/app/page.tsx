import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { ExploreSection } from "@/components/ExploreSection";
import { FeaturedCollections } from "@/components/FeaturedCollections";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-6">
          <div className="container">
            <HeroSlider />
          </div>
        </section>
        <ExploreSection />
        <FeaturedCollections />
      </main>
      <Footer />
    </div>
  );
}
