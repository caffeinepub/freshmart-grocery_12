import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-[#166A28] text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌿</span>
              <span className="text-xl font-bold">FreshMart</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              Your trusted online grocery store. Fresh produce, daily
              essentials, and more — delivered to your doorstep.
            </p>
            <div className="flex gap-3 mt-4">
              <Link to="/" className="hover:text-green-300 transition-colors">
                <Facebook size={18} />
              </Link>
              <Link to="/" className="hover:text-green-300 transition-colors">
                <Instagram size={18} />
              </Link>
              <Link to="/" className="hover:text-green-300 transition-colors">
                <Twitter size={18} />
              </Link>
              <Link to="/" className="hover:text-green-300 transition-colors">
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  search={{ deal: "true" }}
                  className="hover:text-white transition-colors"
                >
                  Today's Deals
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">
              Categories
            </h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li>
                <Link
                  to="/products"
                  search={{ category: "Fruits & Vegetables" }}
                  className="hover:text-white transition-colors"
                >
                  Fruits &amp; Vegetables
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  search={{ category: "Dairy" }}
                  className="hover:text-white transition-colors"
                >
                  Dairy
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  search={{ category: "Snacks" }}
                  className="hover:text-white transition-colors"
                >
                  Snacks
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  search={{ category: "Beverages" }}
                  className="hover:text-white transition-colors"
                >
                  Beverages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-sm uppercase tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li>📞 +91 800-123-4567</li>
              <li>✉️ support@freshmart.in</li>
              <li>🕐 Mon–Sat: 9AM – 8PM</li>
              <li>
                <Link
                  to="/admin"
                  className="hover:text-white transition-colors"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-6 text-center text-sm text-green-300">
          <p>
            © {year}. Built with ❤️ using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              caffeine.ai
            </a>
          </p>
          <p className="mt-1">
            <Link to="/" className="hover:text-white mx-2">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="/" className="hover:text-white mx-2">
              Terms of Service
            </Link>{" "}
            |
            <Link to="/" className="hover:text-white mx-2">
              About Us
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
