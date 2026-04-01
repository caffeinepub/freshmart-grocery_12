import { useNavigate } from "@tanstack/react-router";
import { CATEGORIES, CATEGORY_CONFIG } from "../data/products";

export function CategoryGrid() {
  const navigate = useNavigate();
  return (
    <section className="fade-in">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold uppercase tracking-wide text-foreground">
          Shop by Category
        </h2>
        <button
          type="button"
          onClick={() => navigate({ to: "/products" })}
          className="text-sm font-semibold text-[#1B7A2E] hover:underline"
          data-ocid="categories.link"
        >
          VIEW ALL →
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {CATEGORIES.map((cat) => {
          const cfg = CATEGORY_CONFIG[cat];
          return (
            <button
              type="button"
              key={cat}
              onClick={() =>
                navigate({ to: "/products", search: { category: cat } })
              }
              className="flex flex-col items-center gap-2 bg-card rounded-xl p-4 border border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 group"
              data-ocid="categories.button"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${cfg.color}33` }}
              >
                {cfg.emoji}
              </div>
              <span className="text-xs font-semibold text-center text-foreground leading-tight">
                {cat}
              </span>
              <span className="text-[11px] text-[#1B7A2E] font-medium">
                View More
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
