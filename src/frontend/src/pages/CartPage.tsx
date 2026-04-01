import { Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ProductImage } from "../components/ProductImage";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const totalDiscount = subtotal - totalPrice;
  const deliveryFee = totalPrice >= 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryFee;

  function handleRemove(id: string, name: string) {
    removeFromCart(id);
    toast.error(`${name} removed from cart`);
  }

  if (items.length === 0) {
    return (
      <main
        className="max-w-6xl mx-auto px-4 py-20 text-center fade-in"
        data-ocid="cart.empty_state"
      >
        <ShoppingBag size={64} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some delicious groceries to get started!
        </p>
        <Link
          to="/products"
          className="bg-[#1B7A2E] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#166A28] transition-colors"
          data-ocid="cart.primary_button"
        >
          Shop Now
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 fade-in">
      <h1 className="text-2xl font-bold mb-6">
        My Cart ({items.length} items)
      </h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, idx) => (
            <div
              key={item.product.id}
              className="bg-card border border-border rounded-xl p-4 flex gap-4"
              data-ocid={`cart.item.${idx + 1}`}
            >
              <ProductImage
                emoji={item.product.emoji}
                bgColor={item.product.bgColor}
                name={item.product.name}
                className="w-20 h-20 rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">
                  {item.product.brand}
                </p>
                <h3 className="font-semibold text-sm">{item.product.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {item.product.unit}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-[#1B7A2E]">
                    ₹{item.product.discountedPrice}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹{item.product.price}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button
                  type="button"
                  onClick={() =>
                    handleRemove(item.product.id, item.product.name)
                  }
                  className="text-red-500 hover:text-red-700 transition-colors"
                  data-ocid={`cart.delete_button.${idx + 1}`}
                >
                  <Trash2 size={16} />
                </button>
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                    className="px-2 py-1 hover:bg-accent transition-colors"
                    data-ocid={`cart.secondary_button.${idx + 1}`}
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-3 py-1 text-sm font-semibold border-x border-border">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                    className="px-2 py-1 hover:bg-accent transition-colors"
                    data-ocid={`cart.secondary_button.${idx + 1}`}
                  >
                    <Plus size={13} />
                  </button>
                </div>
                <span className="text-sm font-bold">
                  ₹{item.product.discountedPrice * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-32">
            <h2 className="font-bold text-base uppercase tracking-wide mb-4 pb-3 border-b border-border">
              Price Details
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({items.length} items)
                </span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span>− ₹{totalDiscount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span
                  className={
                    deliveryFee === 0 ? "text-green-700 font-medium" : ""
                  }
                >
                  {deliveryFee === 0 ? "FREE" : `\u20b9${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-muted-foreground bg-accent rounded p-2">
                  Add ₹{500 - totalPrice} more for free delivery
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                <span>Total Amount</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate({ to: "/checkout" })}
              className="w-full mt-5 bg-[#1B7A2E] hover:bg-[#166A28] text-white font-semibold py-3 rounded-xl transition-colors"
              data-ocid="cart.primary_button"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block text-center mt-3 text-sm text-[#1B7A2E] hover:underline"
              data-ocid="cart.link"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
