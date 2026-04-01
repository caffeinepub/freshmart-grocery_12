import { Slider } from "@/components/ui/slider";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES, type Category, products } from "../data/products";

const ALL_BRANDS = Array.from(new Set(products.map((p) => p.brand))).sort();

export function ProductListingPage() {
  const navigate = useNavigate();
  const rawSearch = useSearch({ strict: false }) as Record<string, string>;
  const categoryParam = (rawSearch.category ?? "") as Category | "";
  const searchParam = rawSearch.search ?? "";
  const dealParam = rawSearch.deal ?? "";

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    categoryParam ? [categoryParam as Category] : [],
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [localSearch, setLocalSearch] = useState(searchParam);
  const [sort, setSort] = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products;
    if (dealParam) list = list.filter((p) => p.deal);
    if (selectedCategories.length)
      list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedBrands.length)
      list = list.filter((p) => selectedBrands.includes(p.brand));
    list = list.filter(
      (p) =>
        p.discountedPrice >= priceRange[0] &&
        p.discountedPrice <= priceRange[1],
    );
    if (localSearch) {
      const q = localSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      );
    }
    if (sort === "price-asc")
      list = [...list].sort((a, b) => a.discountedPrice - b.discountedPrice);
    if (sort === "price-desc")
      list = [...list].sort((a, b) => b.discountedPrice - a.discountedPrice);
    if (sort === "discount")
      list = [...list].sort((a, b) => b.discountPercent - a.discountPercent);
    return list;
  }, [
    selectedCategories,
    selectedBrands,
    priceRange,
    localSearch,
    sort,
    dealParam,
  ]);

  function toggleCategory(cat: Category) {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }

  function toggleBrand(b: string) {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b],
    );
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/products", search: { search: localSearch } });
  }

  const Sidebar = () => (
    <aside className="w-full space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-3 uppercase tracking-wide">
          Price Range
        </h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-2"
          data-ocid="filters.toggle"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3 uppercase tracking-wide">
          Category
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="accent-[#1B7A2E]"
                data-ocid="filters.checkbox"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-3 uppercase tracking-wide">
          Brand
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {ALL_BRANDS.map((b) => (
            <label
              key={b}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="accent-[#1B7A2E]"
                data-ocid="filters.checkbox"
              />
              {b}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setSelectedCategories([]);
          setSelectedBrands([]);
          setPriceRange([0, 1000]);
          setLocalSearch("");
        }}
        className="w-full text-sm text-red-600 border border-red-200 rounded-lg py-2 hover:bg-red-50 transition-colors"
        data-ocid="filters.button"
      >
        Clear Filters
      </button>
    </aside>
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 fade-in">
      <div className="flex gap-6">
        <div className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-card border border-border rounded-xl p-4 sticky top-32">
            <Sidebar />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex gap-3 mb-5 flex-wrap">
            <form onSubmit={handleSearch} className="flex flex-1 min-w-48">
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search products..."
                className="flex-1 border border-border rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                data-ocid="products.search_input"
              />
              <button
                type="submit"
                className="bg-[#1B7A2E] text-white px-3 rounded-r-lg text-sm"
                data-ocid="products.submit_button"
              >
                Search
              </button>
            </form>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-border rounded-lg px-3 py-2 text-sm bg-card focus:outline-none"
              data-ocid="products.select"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
            <button
              type="button"
              className="lg:hidden flex items-center gap-1 border border-border rounded-lg px-3 py-2 text-sm bg-card"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              data-ocid="products.toggle"
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>

          {sidebarOpen && (
            <div className="lg:hidden bg-card border border-border rounded-xl p-4 mb-5">
              <Sidebar />
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-4">
            {filtered.length} products found
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20" data-ocid="products.empty_state">
              <span className="text-5xl">🛒</span>
              <p className="mt-4 text-muted-foreground">
                No products match your filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p, i) => (
                <div key={p.id} data-ocid={`products.item.${i + 1}`}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
