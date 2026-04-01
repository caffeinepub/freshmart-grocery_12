import { Link } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { ProductImage } from "../components/ProductImage";
import { useCart } from "../context/CartContext";

interface FormData {
  name: string;
  address: string;
  phone: string;
  pincode: string;
  email: string;
  payment: string;
}

export function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<FormData>({
    name: "",
    address: "",
    phone: "",
    pincode: "",
    email: "",
    payment: "cod",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [orderId] = useState(`FM${Date.now().toString().slice(-6)}`);

  const deliveryFee = totalPrice >= 500 ? 0 : 40;
  const finalTotal = totalPrice + deliveryFee;

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.address.trim()) errs.address = "Address is required";
    if (!/^[0-9]{10}$/.test(form.phone))
      errs.phone = "Enter a valid 10-digit phone number";
    if (!/^[0-9]{6}$/.test(form.pincode))
      errs.pincode = "Enter a valid 6-digit pincode";
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setConfirmed(true);
    clearCart();
  }

  if (confirmed) {
    return (
      <main
        className="max-w-lg mx-auto px-4 py-20 text-center fade-in"
        data-ocid="checkout.success_state"
      >
        <CheckCircle size={64} className="mx-auto text-[#1B7A2E] mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-4">
          Thank you, <strong>{form.name}</strong>! Your order has been
          confirmed.
        </p>
        <div className="bg-card border border-border rounded-xl p-5 text-left space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-semibold">#{orderId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Estimated Delivery</span>
            <span className="font-semibold">3–5 Business Days</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Paid</span>
            <span className="font-semibold">₹{finalTotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-semibold">Cash on Delivery</span>
          </div>
        </div>
        <Link
          to="/"
          className="bg-[#1B7A2E] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#166A28] transition-colors"
          data-ocid="checkout.primary_button"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  function Field({
    label,
    fieldId,
    name,
    type = "text",
    placeholder,
    as,
  }: {
    label: string;
    fieldId: string;
    name: keyof FormData;
    type?: string;
    placeholder: string;
    as?: "textarea";
  }) {
    const val = form[name];
    const err = errors[name];
    return (
      <div>
        <label htmlFor={fieldId} className="block text-sm font-medium mb-1">
          {label}
        </label>
        {as === "textarea" ? (
          <textarea
            id={fieldId}
            value={val}
            onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
            placeholder={placeholder}
            rows={3}
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none ${err ? "border-red-400" : "border-border"}`}
            data-ocid="checkout.textarea"
          />
        ) : (
          <input
            id={fieldId}
            type={type}
            value={val}
            onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
            placeholder={placeholder}
            className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary ${err ? "border-red-400" : "border-border"}`}
            data-ocid="checkout.input"
          />
        )}
        {err && (
          <p
            className="text-xs text-red-600 mt-1"
            data-ocid="checkout.error_state"
          >
            {err}
          </p>
        )}
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 fade-in">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
            data-ocid="checkout.modal"
          >
            <h2 className="font-bold text-base uppercase tracking-wide pb-3 border-b border-border">
              Delivery Details
            </h2>
            <Field
              label="Full Name"
              fieldId="checkout-name"
              name="name"
              placeholder="Rahul Sharma"
            />
            <Field
              label="Delivery Address"
              fieldId="checkout-address"
              name="address"
              placeholder="123, MG Road, Koramangala"
              as="textarea"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field
                label="Phone Number"
                fieldId="checkout-phone"
                name="phone"
                type="tel"
                placeholder="9876543210"
              />
              <Field
                label="Pincode"
                fieldId="checkout-pincode"
                name="pincode"
                placeholder="560001"
              />
            </div>
            <Field
              label="Email"
              fieldId="checkout-email"
              name="email"
              type="email"
              placeholder="rahul@example.com"
            />

            <div className="pt-2">
              <h2 className="font-bold text-sm uppercase tracking-wide mb-3">
                Payment Method
              </h2>
              <label
                htmlFor="cod-radio"
                className="flex items-center gap-3 border border-[#1B7A2E] rounded-xl p-4 cursor-pointer bg-green-50"
              >
                <input
                  id="cod-radio"
                  type="radio"
                  name="payment"
                  value="cod"
                  checked
                  readOnly
                  className="accent-[#1B7A2E]"
                  data-ocid="checkout.radio"
                />
                <div>
                  <p className="font-semibold text-sm">💵 Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">
                    Pay when your order arrives
                  </p>
                </div>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1B7A2E] hover:bg-[#166A28] text-white font-bold py-3 rounded-xl transition-colors"
              data-ocid="checkout.submit_button"
            >
              Place Order — ₹{finalTotal}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-xl p-5 sticky top-32">
            <h2 className="font-bold text-base uppercase tracking-wide mb-4 pb-3 border-b border-border">
              Order Summary
            </h2>
            <div className="space-y-3 max-h-72 overflow-y-auto mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center">
                  <ProductImage
                    emoji={item.product.emoji}
                    bgColor={item.product.bgColor}
                    name={item.product.name}
                    className="w-12 h-12 rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ×{item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold">
                    ₹{item.product.discountedPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? "text-green-700" : ""}>
                  {deliveryFee === 0 ? "FREE" : `\u20b9${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-base pt-1 border-t border-border">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
