import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { CATEGORIES } from "../data/products";

export function Navbar() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItems);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    if (totalItems !== prevCount) {
      setBouncing(true);
      setPrevCount(totalItems);
      const t = setTimeout(() => setBouncing(false), 400);
      return () => clearTimeout(t);
    }
  }, [totalItems, prevCount]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate({ to: "/products", search: { search: search } });
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-md">
      {/* Top utility bar */}
      <div className="bg-[#166A28] text-white text-xs py-1.5 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span>
            🚚 Free delivery on orders above ₹500 | Use code{" "}
            <strong>FRESH10</strong> for 10% off
          </span>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1">⭐ 4.8/5 Rated</span>
            <a href="tel:+918001234567" className="hover:underline">
              📞 Contact
            </a>
          </div>
        </div>
      </div>

      {/* Main nav row */}
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
            data-ocid="nav.link"
          >
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold text-[#1B7A2E]">FreshMart</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-xl">
            <input
              data-ocid="nav.search_input"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for groceries, brands..."
              className="flex-1 border border-border rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="bg-[#1B7A2E] text-white px-4 rounded-r-lg hover:bg-[#166A28] transition-colors"
              data-ocid="nav.button"
            >
              <Search size={18} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-[#1B7A2E] transition-colors"
              data-ocid="nav.link"
            >
              <User size={18} />
              <span>Account</span>
            </Link>
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 text-sm font-medium hover:text-[#1B7A2E] transition-colors"
              data-ocid="nav.link"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span
                  className={`absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ${
                    bouncing ? "badge-bounce" : ""
                  }`}
                >
                  {totalItems}
                </span>
              )}
              <span className="hidden sm:inline">Cart</span>
            </Link>
            <button
              type="button"
              className="sm:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-ocid="nav.toggle"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary nav */}
      <div className="bg-white border-b border-border hidden sm:block">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2.5 text-sm font-semibold text-[#1B7A2E] border-b-2 border-[#1B7A2E]"
              data-ocid="nav.link"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="px-4 py-2.5 text-sm font-medium text-foreground hover:text-[#1B7A2E] transition-colors"
              data-ocid="nav.link"
            >
              Products
            </Link>
            <Link
              to="/products"
              search={{ deal: "true" }}
              className="px-4 py-2.5 text-sm font-medium text-foreground hover:text-[#1B7A2E] transition-colors"
              data-ocid="nav.link"
            >
              Offers
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-foreground hover:text-[#1B7A2E] transition-colors"
                data-ocid="nav.dropdown_menu"
              >
                Shop by Category <ChevronDown size={14} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-border rounded-lg shadow-lg z-50">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat}
                      to="/products"
                      search={{ category: cat }}
                      className="block px-4 py-2.5 text-sm hover:bg-accent hover:text-[#1B7A2E] transition-colors"
                      onClick={() => setCatOpen(false)}
                      data-ocid="nav.link"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-white border-b border-border">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              className="block py-2 text-sm font-semibold text-[#1B7A2E]"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-sm"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              Products
            </Link>
            <Link
              to="/products"
              search={{ deal: "true" }}
              className="block py-2 text-sm"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              Offers
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                to="/products"
                search={{ category: cat }}
                className="block py-2 text-sm text-muted-foreground pl-4"
                onClick={() => setMobileOpen(false)}
                data-ocid="nav.link"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
