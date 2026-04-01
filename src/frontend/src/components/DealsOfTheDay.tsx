import { useEffect, useState } from "react";
import { getDealProducts } from "../data/products";
import { ProductCard } from "./ProductCard";

function getSecondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - now.getTime()) / 1000);
}

const TIMER_LABELS = ["HH", "MM", "SS"];

export function DealsOfTheDay() {
  const [seconds, setSeconds] = useState(getSecondsUntilMidnight());
  const deals = getDealProducts();

  useEffect(() => {
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) return getSecondsUntilMidnight();
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const parts = [hh, mm, ss];

  return (
    <section className="fade-in">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="text-xl font-bold uppercase tracking-wide text-foreground">
          Deals of the Day
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Ends in:</span>
          {parts.map((val, i) => (
            <span key={TIMER_LABELS[i]} className="flex items-center">
              <span className="bg-[#1B7A2E] text-white font-bold text-sm px-2.5 py-1 rounded-md min-w-[2.5rem] text-center font-mono">
                {val}
              </span>
              {i < 2 && (
                <span className="text-[#1B7A2E] font-bold mx-1">:</span>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
