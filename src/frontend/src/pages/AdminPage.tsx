import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  CATEGORIES,
  type Category,
  type Product,
  products as initialProducts,
} from "../data/products";

type AdminProduct = Omit<Product, "emoji" | "bgColor" | "featured" | "deal"> & {
  id: string;
};

const EMPTY_FORM: Omit<AdminProduct, "id"> = {
  name: "",
  brand: "",
  category: "Fruits & Vegetables",
  price: 0,
  discountedPrice: 0,
  discountPercent: 0,
  description: "",
  unit: "",
};

export function AdminPage() {
  const [catalog, setCatalog] = useState<Product[]>(initialProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<AdminProduct, "id">>(EMPTY_FORM);
  const [search, setSearch] = useState("");

  const filtered = catalog.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()),
  );

  function openAdd() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      discountedPrice: p.discountedPrice,
      discountPercent: p.discountPercent,
      description: p.description,
      unit: p.unit,
    });
    setModalOpen(true);
  }

  function handleDelete(id: string) {
    setCatalog((prev) => prev.filter((p) => p.id !== id));
    toast.error("Product deleted");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editing) {
      setCatalog((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...form } : p)),
      );
      toast.success("Product updated");
    } else {
      const newP: Product = {
        ...form,
        id: `admin_${Date.now()}`,
        emoji: "📦",
        bgColor: "#9E9E9E",
      };
      setCatalog((prev) => [...prev, newP]);
      toast.success("Product added");
    }
    setModalOpen(false);
  }

  function setField<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            {catalog.length} products in catalog
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#1B7A2E] hover:bg-[#166A28] text-white font-semibold px-4 py-2.5 rounded-xl transition-colors"
          data-ocid="admin.open_modal_button"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="border border-border rounded-lg px-4 py-2 text-sm w-full max-w-sm mb-4 focus:outline-none focus:border-primary"
        data-ocid="admin.search_input"
      />

      <div className="bg-card border border-border rounded-xl overflow-x-auto">
        <table className="w-full text-sm" data-ocid="admin.table">
          <thead className="bg-accent text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                Product
              </th>
              <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                Brand
              </th>
              <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                Category
              </th>
              <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                Price
              </th>
              <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                Discount
              </th>
              <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wide">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((p, i) => (
              <tr
                key={p.id}
                className="hover:bg-accent/50 transition-colors"
                data-ocid={`admin.row.${i + 1}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{p.emoji}</span>
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.unit}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.brand}</td>
                <td className="px-4 py-3">
                  <span className="bg-accent rounded-full px-2 py-0.5 text-xs">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-semibold text-[#1B7A2E]">
                    ₹{p.discountedPrice}
                  </span>
                  <span className="text-xs text-muted-foreground line-through ml-1">
                    ₹{p.price}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">
                    {p.discountPercent}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(p)}
                      className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                      data-ocid={`admin.edit_button.${i + 1}`}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                      data-ocid={`admin.delete_button.${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          data-ocid="admin.dialog"
        >
          <div className="bg-card rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">
                {editing ? "Edit Product" : "Add Product"}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
                data-ocid="admin.close_button"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="admin-name"
                  className="text-sm font-medium block mb-1"
                >
                  Product Name
                </label>
                <input
                  id="admin-name"
                  required
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                  data-ocid="admin.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="admin-brand"
                    className="text-sm font-medium block mb-1"
                  >
                    Brand
                  </label>
                  <input
                    id="admin-brand"
                    required
                    value={form.brand}
                    onChange={(e) => setField("brand", e.target.value)}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                    data-ocid="admin.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="admin-unit"
                    className="text-sm font-medium block mb-1"
                  >
                    Unit
                  </label>
                  <input
                    id="admin-unit"
                    required
                    value={form.unit}
                    onChange={(e) => setField("unit", e.target.value)}
                    placeholder="e.g. 500g, 1L"
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                    data-ocid="admin.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="admin-category"
                  className="text-sm font-medium block mb-1"
                >
                  Category
                </label>
                <select
                  id="admin-category"
                  value={form.category}
                  onChange={(e) =>
                    setField("category", e.target.value as Category)
                  }
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-card"
                  data-ocid="admin.select"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label
                    htmlFor="admin-price"
                    className="text-sm font-medium block mb-1"
                  >
                    MRP (₹)
                  </label>
                  <input
                    id="admin-price"
                    required
                    type="number"
                    min={0}
                    value={form.price}
                    onChange={(e) => setField("price", Number(e.target.value))}
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                    data-ocid="admin.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="admin-sale"
                    className="text-sm font-medium block mb-1"
                  >
                    Sale Price
                  </label>
                  <input
                    id="admin-sale"
                    required
                    type="number"
                    min={0}
                    value={form.discountedPrice}
                    onChange={(e) =>
                      setField("discountedPrice", Number(e.target.value))
                    }
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                    data-ocid="admin.input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="admin-discount"
                    className="text-sm font-medium block mb-1"
                  >
                    Discount %
                  </label>
                  <input
                    id="admin-discount"
                    required
                    type="number"
                    min={0}
                    max={100}
                    value={form.discountPercent}
                    onChange={(e) =>
                      setField("discountPercent", Number(e.target.value))
                    }
                    className="w-full border border-border rounded-lg px-3 py-2 text-sm"
                    data-ocid="admin.input"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="admin-desc"
                  className="text-sm font-medium block mb-1"
                >
                  Description
                </label>
                <textarea
                  id="admin-desc"
                  required
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  rows={3}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm resize-none"
                  data-ocid="admin.textarea"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border border-border rounded-xl py-2.5 text-sm font-medium hover:bg-accent transition-colors"
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1B7A2E] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#166A28] transition-colors"
                  data-ocid="admin.confirm_button"
                >
                  {editing ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
