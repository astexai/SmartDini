"use client";

import { useState } from "react";

type Item = { name: string; price: number; cat: "Pizza" | "Burger" };

export default function ManageMenuPage() {
  const [items, setItems] = useState<Item[]>([
    { name: "Pizza Margherita", price: 250, cat: "Pizza" },
    { name: "Pizza Maggiato", price: 280, cat: "Pizza" },
    { name: "Chicago Pizza", price: 320, cat: "Pizza" },
    { name: "Veggie Burger", price: 180, cat: "Burger" },
    { name: "Turkey Burger", price: 200, cat: "Burger" },
    { name: "Cheeseburger", price: 240, cat: "Burger" },
  ]);

  const [add, setAdd] = useState<Item>({ name: "", price: 0, cat: "Pizza" });
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<Item | null>(null);

  const onSaveNew = () => {
    if (!add.name || !add.price) return;
    setItems((l) => [{ ...add }, ...l]);
    setAdd({ name: "", price: 0, cat: "Pizza" });
  };
  const onDelete = (i: number) => setItems((l) => l.filter((_, idx) => idx !== i));
  const onEdit = (i: number) => {
    setEditing(i);
    setDraft({ ...items[i] });
  };
  const onCancel = () => {
    setEditing(null);
    setDraft(null);
  };
  const onSave = (i: number) => {
    if (!draft) return;
    setItems((l) => l.map((it, idx) => (idx === i ? draft : it)));
    onCancel();
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-4">
        <div className="font-semibold mb-4">Menu Management</div>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-4">
          <div className="bg-white rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3">Add Menu</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="h-32 rounded-lg border bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
                Click to upload image
              </div>
              <div className="space-y-3">
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  placeholder="Item Name"
                  value={add.name}
                  onChange={(e) => setAdd((p) => ({ ...p, name: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className="px-3 py-2 rounded-lg border"
                    placeholder="Price ₹"
                    value={add.price || ""}
                    onChange={(e) => setAdd((p) => ({ ...p, price: Number(e.target.value || 0) }))}
                  />
                  <select
                    className="px-3 py-2 rounded-lg border"
                    value={add.cat}
                    onChange={(e) => setAdd((p) => ({ ...p, cat: e.target.value as Item["cat"] }))}
                  >
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                  </select>
                </div>
                <button onClick={onSaveNew} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground">
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-4">
            <div className="text-sm font-semibold mb-3">Manage Menu</div>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium">Item Name</th>
                    <th className="text-left px-3 py-2 font-medium">Price ₹</th>
                    <th className="text-left px-3 py-2 font-medium">Category</th>
                    <th className="text-left px-3 py-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((r, i) => {
                    const isEditing = editing === i;
                    return (
                      <tr key={i} className="border-t">
                        <td className="px-3 py-2">{isEditing ? <input className="px-2 py-1 rounded border w-full" value={draft?.name || ""} onChange={(e) => setDraft((d) => ({ ...(d as Item), name: e.target.value }))} /> : r.name}</td>
                        <td className="px-3 py-2">{isEditing ? <input className="px-2 py-1 rounded border w-28" value={draft?.price ?? 0} onChange={(e) => setDraft((d) => ({ ...(d as Item), price: Number(e.target.value || 0) }))} /> : r.price}</td>
                        <td className="px-3 py-2">
                          {isEditing ? (
                            <select className="px-2 py-1 rounded border" value={draft?.cat || "Pizza"} onChange={(e) => setDraft((d) => ({ ...(d as Item), cat: e.target.value as Item["cat"] }))}>
                              <option value="Pizza">Pizza</option>
                              <option value="Burger">Burger</option>
                            </select>
                          ) : (
                            r.cat
                          )}
                        </td>
                        <td className="px-3 py-2 space-x-2">
                          {!isEditing ? (
                            <>
                              <button className="px-3 py-1 rounded-lg bg-gray-200" onClick={() => onEdit(i)}>
                                Edit
                              </button>
                              <button className="px-3 py-1 rounded-lg bg-red-500 text-white" onClick={() => onDelete(i)}>
                                Delete
                              </button>
                            </>
                          ) : (
                            <>
                              <button className="px-3 py-1 rounded-lg bg-primary text-white" onClick={() => onSave(i)}>
                                Save
                              </button>
                              <button className="px-3 py-1 rounded-lg bg-gray-200" onClick={onCancel}>
                                Cancel
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
