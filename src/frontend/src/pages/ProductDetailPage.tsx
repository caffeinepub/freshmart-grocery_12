import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";
import { ProductImage } from "../components/ProductImage";
import { useCart } from "../context/CartContext";
import { getProductById, getProductsByCategory } from "../data/products";

export function ProductDetailPage() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const maybeProduct = getProductById(id ?? "");
  const [qty, setQty] = useState(1);

  if (!maybeProduct) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl">🔍</span>
        <h2 className="text-xl font-bold mt-4">Product not found</h2>
        <button
          type="button"
          onClick={() => navigate({ to: "/products" })}
          className="mt-4 text-[#1B7A2E] underline"
        >
          Back to products
        </button>
      </main>
    );
  }

  const product = maybeProduct;
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);
  const savings = product.price - product.discountedPrice;
  const cartItem = items.find((i) => i.product.id === product.id);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `${qty} \u00d7 \u20b9${product.discountedPrice}`,
    });
  }

  function handleBuyNow() {
    handleAddToCart();
    navigate({ to: "/cart" });
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 fade-in">
      <button
        type="button"
        onClick={() => navigate({ to: "/products" })}
        className="flex items-center gap-1 text-sm text-muted-foreground mb-5 hover:text-[#1B7A2E] transition-colors"
        data-ocid="detail.link"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8 bg-card border border-border rounded-2xl p-6 mb-10">
        <div className="flex items-center justify-center">
          <ProductImage
            emoji={product.emoji}
            bgColor={product.bgColor}
            name={product.name}
            className="w-full max-w-xs h-72 rounded-xl"
          />
        </div>

        <div>
          <span className="text-xs font-semibold text-[#1B7A2E] uppercase tracking-wider">
            {product.category}
          </span>
          <h1 className="text-2xl font-bold mt-1 mb-1">{product.name}</h1>
          <p className="text-sm text-muted-foreground mb-1">
            {product.brand} · {product.unit}
          </p>

          {product.discountPercent > 0 && (
            <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded mb-3">
              {product.discountPercent}% OFF — Save ₹{savings}
            </span>
          )}

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-[#1B7A2E]">
              ₹{product.discountedPrice}
            </span>
            <span className="text-base text-muted-foreground line-through">
              ₹{product.price}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-5">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-2 hover:bg-accent transition-colors"
                data-ocid="detail.secondary_button"
              >
                <Minus size={14} />
              </button>
              <span className="px-4 py-2 text-sm font-semibold border-x border-border">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-2 hover:bg-accent transition-colors"
                data-ocid="detail.secondary_button"
              >
                <Plus size={14} />
              </button>
            </div>
            {cartItem && (
              <span className="text-xs text-muted-foreground">
                {cartItem.quantity} already in cart
              </span>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-[#1B7A2E] hover:bg-[#166A28] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              data-ocid="detail.primary_button"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center gap-2 border-2 border-[#1B7A2E] text-[#1B7A2E] font-semibold px-6 py-3 rounded-xl hover:bg-[#1B7A2E] hover:text-white transition-all"
              data-ocid="detail.secondary_button"
            >
              <Zap size={18} /> Buy Now
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              "🚚 Free delivery above ₹500",
              "↩️ Easy returns",
              "✅ 100% genuine",
            ].map((txt) => (
              <div
                key={txt}
                className="bg-accent rounded-lg p-2 text-center text-xs text-muted-foreground"
              >
                {txt}
              </div>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-4">
            Related Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
