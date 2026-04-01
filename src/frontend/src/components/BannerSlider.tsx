import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    id: "slide-veg",
    title: "50% OFF on Fresh Vegetables",
    subtitle: "Farm to table freshness, every single day",
    cta: "Shop Now",
    category: "Fruits & Vegetables",
    bg: "linear-gradient(135deg, #1B7A2E 0%, #4CAF50 60%, #81C784 100%)",
    emoji: "🥦🍅🥕",
  },
  {
    id: "slide-dairy",
    title: "Daily Essentials at Best Prices",
    subtitle: "Stock up on milk, bread, eggs and more",
    cta: "Explore Dairy",
    category: "Dairy",
    bg: "linear-gradient(135deg, #F57F17 0%, #FBC02D 60%, #FFF9C4 100%)",
    emoji: "🥛🧈🧀",
  },
  {
    id: "slide-snacks",
    title: "Buy 2 Get 1 Free on Snacks",
    subtitle: "Munchies for every mood — chips, biscuits & more",
    cta: "Grab Deals",
    category: "Snacks",
    bg: "linear-gradient(135deg, #E65100 0%, #FF8F00 60%, #FFB74D 100%)",
    emoji: "🍿🍪🌽",
  },
  {
    id: "slide-bev",
    title: "Stay Refreshed This Season",
    subtitle: "Juices, coffees, teas and energy drinks",
    cta: "Browse Beverages",
    category: "Beverages",
    bg: "linear-gradient(135deg, #0D47A1 0%, #1565C0 60%, #42A5F5 100%)",
    emoji: "🧃☕🍵",
  },
  {
    id: "slide-home",
    title: "Household Essentials Mega Sale",
    subtitle: "Detergents, cleaners, and personal care — all discounted",
    cta: "Shop Household",
    category: "Household Items",
    bg: "linear-gradient(135deg, #4527A0 0%, #5C6BC0 60%, #9FA8DA 100%)",
    emoji: "🧹🫧🧺",
  },
];

export function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const slide = slides[current];

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl"
      style={{ minHeight: 260 }}
    >
      <div
        className="w-full flex items-center transition-all duration-700 ease-in-out"
        style={{ background: slide.bg, minHeight: 260 }}
      >
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between w-full gap-6">
          <div className="text-white max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">
              Limited Time Offer
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3">
              {slide.title}
            </h1>
            <p className="text-white/85 text-sm sm:text-base mb-5">
              {slide.subtitle}
            </p>
            <button
              type="button"
              onClick={() =>
                navigate({
                  to: "/products",
                  search: { category: slide.category },
                })
              }
              className="bg-white text-[#1B7A2E] font-semibold px-6 py-2.5 rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5 text-sm"
              data-ocid="banner.primary_button"
            >
              {slide.cta} →
            </button>
          </div>
          <div className="text-6xl sm:text-8xl select-none flex-shrink-0">
            {slide.emoji}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 transition-all"
        data-ocid="banner.secondary_button"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 transition-all"
        data-ocid="banner.secondary_button"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((s) => (
          <button
            type="button"
            key={s.id}
            onClick={() => setCurrent(slides.indexOf(s))}
            className={`w-2 h-2 rounded-full transition-all ${slides[current].id === s.id ? "bg-white w-6" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
