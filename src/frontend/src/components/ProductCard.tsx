import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `\u20b9${product.discountedPrice} \u00d7 1`,
    });
  }

  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 flex flex-col"
      data-ocid="product.card"
    >
      <div className="relative">
        <ProductImage
          emoji={product.emoji}
          bgColor={product.bgColor}
          name={product.name}
          className="w-full h-40"
        />
        {product.discountPercent > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {product.discountPercent}% OFF
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setWishlisted(!wishlisted);
          }}
          className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow hover:scale-110 transition-transform"
          data-ocid="product.toggle"
        >
          <Heart
            size={14}
            fill={wishlisted ? "#D32F2F" : "none"}
            stroke={wishlisted ? "#D32F2F" : "currentColor"}
          />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <p className="text-[11px] text-muted-foreground mb-0.5">
          {product.brand}
        </p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground mb-2">{product.unit}</p>
        <div className="flex items-center gap-2 mb-3 mt-auto">
          <span className="text-base font-bold text-[#1B7A2E]">
            ₹{product.discountedPrice}
          </span>
          {product.discountPercent > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              ₹{product.price}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="w-full bg-[#1B7A2E] hover:bg-[#166A28] text-white text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          data-ocid="product.primary_button"
        >
          <ShoppingCart size={13} /> Add to Cart
        </button>
      </div>
    </Link>
  );
}
