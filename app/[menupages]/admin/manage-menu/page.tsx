"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Save, X, Upload } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: "Pizza" | "Burger" | "Beverages" | "Sides";
  image?: string;
};

export default function ManageMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([
    { id: 1, name: "Pizza Marinara", price: 199, category: "Pizza" },
    { id: 2, name: "Pizza Margherita", price: 250, category: "Pizza" },
    { id: 3, name: "Chicago Pizza", price: 399, category: "Pizza" },
    { id: 4, name: "Veggie Burger", price: 159, category: "Burger" },
    { id: 5, name: "Turkey Burger", price: 299, category: "Burger" },
    { id: 6, name: "Cheeseburger", price: 149, category: "Burger" },
  ]);

  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    price: 0,
    category: "Pizza",
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<MenuItem>>({});

  const handleAddItem = () => {
    if (!newItem.name || !newItem.price) return;
    
    setItems([
      { ...newItem as MenuItem, id: Date.now() },
      ...items
    ]);
    
    setNewItem({ name: "", price: 0, category: "Pizza" });
  };

  const handleDelete = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const saveEdit = () => {
    if (!editingId || !editForm.name || !editForm.price) return;
    
    setItems(items.map(item => 
      item.id === editingId ? { ...item, ...editForm } : item
    ));
    
    setEditingId(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <p className="text-sm text-muted-foreground mt-1">Add, edit, or remove menu items</p>
      </div>

      {/* Add Menu Section */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add New Item
        </h3>
        
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Image Upload Placeholder */}
          <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center bg-muted/20">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">Click to upload image</p>
            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Item Name</label>
              <input
                type="text"
                placeholder="eg. margherita pizza"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1 block">Price (₹)</label>
                <input
                  type="number"
                  placeholder="eg. 1.49"
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={newItem.price || ""}
                  onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value as MenuItem["category"] })}
                >
                  <option value="Pizza">Pizza</option>
                  <option value="Burger">Burger</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Sides">Sides</option>
                </select>
              </div>
            </div>
            
            <button
              onClick={handleAddItem}
              className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Save Item
            </button>
          </div>
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="p-4 border-b bg-muted/5">
          <h3 className="font-semibold">Current Menu Items</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium">Item Name</th>
                <th className="text-left px-6 py-3 text-sm font-medium">Price (₹)</th>
                <th className="text-left px-6 py-3 text-sm font-medium">Category</th>
                <th className="text-left px-6 py-3 text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/10">
                  {editingId === item.id ? (
                    <>
                      <td className="px-6 py-3">
                        <input
                          type="text"
                          className="w-full px-2 py-1 border rounded"
                          value={editForm.name || ""}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </td>
                      <td className="px-6 py-3">
                        <input
                          type="number"
                          className="w-24 px-2 py-1 border rounded"
                          value={editForm.price || 0}
                          onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        />
                      </td>
                      <td className="px-6 py-3">
                        <select
                          className="px-2 py-1 border rounded"
                          value={editForm.category}
                          onChange={(e) => setEditForm({ ...editForm, category: e.target.value as MenuItem["category"] })}
                        >
                          <option value="Pizza">Pizza</option>
                          <option value="Burger">Burger</option>
                          <option value="Beverages">Beverages</option>
                          <option value="Sides">Sides</option>
                        </select>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary/90"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-3 font-medium">{item.name}</td>
                      <td className="px-6 py-3">₹{item.price}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.category === 'Pizza' ? 'bg-orange-100 text-orange-700' :
                          item.category === 'Burger' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(item)}
                            className="p-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}