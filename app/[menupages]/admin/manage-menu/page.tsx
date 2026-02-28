"use client";

import { useState, useRef } from "react";
import { UtensilsCrossed, ImageIcon, Pencil, Trash2, X, ChevronDown } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  editing?: boolean;
  editName?: string;
  editPrice?: number;
  editCategory?: string;
};

const CATEGORIES = ["Pizza", "Burger", "Pasta", "Drinks", "Desserts"];

const SEED: MenuItem[] = [
  { id: 1, name: "Pizza Marinara",   price: 199, category: "Pizza"  },
  { id: 2, name: "Pizza Margherita", price: 200, category: "Pizza"  },
  { id: 3, name: "Chicago Pizza",    price: 399, category: "Pizza"  },
  { id: 4, name: "Veggie burger",    price: 159, category: "Burger" },
  { id: 5, name: "Turkey burger",    price: 299, category: "Burger" },
  { id: 6, name: "Cheeseburger",     price: 149, category: "Burger" },
];

export default function ManageMenuPage() {
  const [menu, setMenu]             = useState<MenuItem[]>(SEED);
  const [itemName, setItemName]     = useState("");
  const [price, setPrice]           = useState("");
  const [category, setCategory]     = useState("");
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const fileRef                     = useRef<HTMLInputElement>(null);

  /* ── helpers ── */
  const updateItem = (id: number, patch: Partial<MenuItem>) =>
    setMenu((p) => p.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const handleAdd = () => {
    if (!itemName.trim() || !price || !category) return;
    setMenu((p) => [
      ...p,
      { id: Date.now(), name: itemName.trim(), price: Number(price), category },
    ]);
    setItemName(""); setPrice(""); setCategory(""); setImgPreview(null);
  };

  const startEdit = (id: number) => {
    const item = menu.find((m) => m.id === id)!;
    updateItem(id, { editing: true, editName: item.name, editPrice: item.price, editCategory: item.category });
  };

  const saveEdit = (id: number) => {
    const item = menu.find((m) => m.id === id)!;
    updateItem(id, {
      editing: false,
      name: item.editName || item.name,
      price: item.editPrice ?? item.price,
      category: item.editCategory || item.category,
    });
  };

  const cancelEdit = (id: number) => updateItem(id, { editing: false });
  const deleteItem  = (id: number) => setMenu((p) => p.filter((m) => m.id !== id));

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-bold text-[hsl(0,0%,13%)] mb-5">
        Menu Management
      </h2>

      {/* ── Add Menu ── */}
      <section className="mb-7">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[hsl(355,72%,93%)] flex items-center justify-center">
            <UtensilsCrossed size={16} className="text-[hsl(355,72%,46%)]" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-[hsl(0,0%,13%)]">Add Menu</h3>
        </div>

        <div className="bg-[hsl(0,0%,96%)] rounded-2xl p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Image drop zone */}
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full sm:w-40 h-36 border-2 border-dashed border-[hsl(355,72%,68%)] rounded-xl flex flex-col items-center justify-center cursor-pointer bg-white hover:bg-[hsl(355,72%,98%)] transition-colors flex-shrink-0 overflow-hidden"
            >
              {imgPreview ? (
                <img src={imgPreview} alt="preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[hsl(355,72%,93%)] flex items-center justify-center mb-2">
                    <ImageIcon size={20} className="text-[hsl(355,72%,55%)]" />
                  </div>
                  <p className="text-xs text-[hsl(0,0%,40%)] text-center leading-tight px-2">
                    Click to upload image
                  </p>
                  <p className="text-[11px] text-[hsl(0,0%,60%)] mt-0.5">PNG, JPG upto 10 MB</p>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setImgPreview(URL.createObjectURL(f));
                }}
              />
            </div>

            {/* Form */}
            <div className="flex-1 flex flex-col gap-3">
              <div>
                <label className="block text-xs font-medium text-[hsl(0,0%,30%)] mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  placeholder="eg.: margherita pizza"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full border border-[hsl(0,0%,84%)] rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-[hsl(355,72%,46%)] focus:ring-1 focus:ring-[hsl(355,72%,46%)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[hsl(0,0%,30%)] mb-1">
                  Price ₹
                </label>
                <input
                  type="number"
                  placeholder="eg.: 149"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-[hsl(0,0%,84%)] rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-[hsl(355,72%,46%)] focus:ring-1 focus:ring-[hsl(355,72%,46%)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[hsl(0,0%,30%)] mb-1">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-[hsl(0,0%,84%)] rounded-lg px-3 py-2 text-sm bg-white appearance-none outline-none focus:border-[hsl(355,72%,46%)] focus:ring-1 focus:ring-[hsl(355,72%,46%)] text-[hsl(0,0%,50%)]"
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(0,0%,50%)] pointer-events-none" />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleAdd}
                  className="bg-[hsl(151,100%,37%)] text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-[hsl(151,100%,31%)] transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Manage Menu table ── */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[hsl(355,72%,93%)] flex items-center justify-center">
            <UtensilsCrossed size={16} className="text-[hsl(355,72%,46%)]" />
          </div>
          <h3 className="font-bold text-sm sm:text-base text-[hsl(0,0%,13%)]">Manage Menu</h3>
        </div>

        {/* Scrollable on small screens */}
        <div className="overflow-x-auto rounded-2xl">
          <div className="min-w-[480px]">
            {/* Table header */}
            <div className="grid grid-cols-4 bg-[hsl(355,72%,46%)] text-white text-sm font-semibold rounded-t-2xl">
              <div className="px-4 py-3">Item Name</div>
              <div className="px-4 py-3 text-center">Price ₹</div>
              <div className="px-4 py-3 text-center">Category</div>
              <div className="px-4 py-3 text-center">Action</div>
            </div>

            {/* Rows */}
            <div className="rounded-b-2xl overflow-hidden border border-t-0 border-[hsl(0,3%,65%)]">
              {menu.map((item, idx) => (
                <div
                  key={item.id}
                  className={[
                    "grid grid-cols-4 items-center text-sm border-b border-[hsl(0,0%,58%)] last:border-0",
                    item.editing
                      ? "bg-[hsl(355,72%,98%)]"
                      : idx % 2 === 0 ? "bg-white" : "bg-[hsl(0,0%,97%)]",
                  ].join(" ")}
                >
                  {item.editing ? (
                    <>
                      {/* Editing row */}
                      <div className="px-3 py-2">
                        <input
                          value={item.editName}
                          onChange={(e) => updateItem(item.id, { editName: e.target.value })}
                          className="w-full border border-[hsl(355,72%,60%)] rounded px-2 py-1 text-xs text-[hsl(355,72%,46%)] outline-none"
                        />
                      </div>
                      <div className="px-3 py-2">
                        <input
                          type="number"
                          value={item.editPrice}
                          onChange={(e) => updateItem(item.id, { editPrice: Number(e.target.value) })}
                          className="w-full border border-[hsl(355,72%,60%)] rounded px-2 py-1 text-xs text-center text-[hsl(355,72%,46%)] outline-none"
                        />
                      </div>
                      <div className="px-3 py-2">
                        <div className="relative">
                          <select
                            value={item.editCategory}
                            onChange={(e) => updateItem(item.id, { editCategory: e.target.value })}
                            className="w-full border border-[hsl(355,72%,60%)] rounded px-2 py-1 text-xs text-[hsl(355,72%,46%)] appearance-none outline-none"
                          >
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <ChevronDown size={10} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-[hsl(355,72%,46%)]" />
                        </div>
                      </div>
                      <div className="px-3 py-2 flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="bg-[hsl(151,100%,37%)] text-white text-xs font-semibold px-2.5 py-1 rounded-md hover:bg-[hsl(151,100%,31%)] transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => cancelEdit(item.id)}
                          className="bg-[hsl(355,72%,46%)] text-white text-xs font-semibold px-2.5 py-1 rounded-md hover:bg-[hsl(355,72%,40%)] transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Normal row */}
                      <div className="px-4 py-3 font-medium text-[hsl(0,0%,18%)]">{item.name}</div>
                      <div className="px-4 py-3 text-center text-[hsl(0,0%,30%)]">{item.price}</div>
                      <div className="px-4 py-3 text-center text-[hsl(0,0%,30%)]">{item.category}</div>
                      <div className="px-4 py-3 flex items-center justify-center gap-2">
                        <button
                          onClick={() => startEdit(item.id)}
                          className="w-7 h-7 bg-[hsl(151,60%,90%)] rounded-full flex items-center justify-center hover:bg-[hsl(151,60%,82%)] transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil size={13} className="text-[hsl(151,100%,28%)]" />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="w-7 h-7 bg-[hsl(355,72%,92%)] rounded-full flex items-center justify-center hover:bg-[hsl(355,72%,85%)] transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={13} className="text-[hsl(355,72%,46%)]" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
