import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { getFeaturedProducts } from "../data/products";
import { ProductCard } from "./ProductCard";

export function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProducts();

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -220 : 220,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold uppercase tracking-wide text-foreground">
          Featured Products
        </h2>
        <div className="flex items-center gap-2">
          <Link
            to="/products"
            className="text-sm font-semibold text-[#1B7A2E] hover:underline mr-2"
          >
            VIEW ALL →
          </Link>
          <button
            type="button"
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full border border-border hover:bg-accent transition-colors"
            data-ocid="featured.secondary_button"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full border border-border hover:bg-accent transition-colors"
            data-ocid="featured.secondary_button"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {featured.map((p) => (
          <div key={p.id} className="flex-shrink-0 w-44">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
