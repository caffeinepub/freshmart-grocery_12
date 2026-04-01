import { BannerSlider } from "../components/BannerSlider";
import { CategoryGrid } from "../components/CategoryGrid";
import { DealsOfTheDay } from "../components/DealsOfTheDay";
import { FeaturedProducts } from "../components/FeaturedProducts";

export function HomePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-10 fade-in">
      <BannerSlider />
      <CategoryGrid />
      <FeaturedProducts />
      <DealsOfTheDay />
    </main>
  );
}
