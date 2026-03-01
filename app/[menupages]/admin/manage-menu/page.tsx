"use client";

import { useState, useRef, ChangeEvent } from "react";
import { UtensilsCrossed, Image as ImageIcon, Pencil, Trash2, Check, X, ChevronDown, UploadCloud } from "lucide-react";

// ─── Types ───
type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  // UI States for editing
  editing?: boolean;
  editName?: string;
  editPrice?: number;
  editCategory?: string;
};

const CATEGORIES = ["Pizza", "Burger", "Pasta", "Drinks", "Desserts"];

const SEED: MenuItem[] = [
  { id: 1, name: "Pizza Marinara", price: 199, category: "Pizza" },
  { id: 2, name: "Pizza Margherita", price: 200, category: "Pizza" },
  { id: 3, name: "Chicago Pizza", price: 399, category: "Pizza" },
  { id: 4, name: "Veggie burger", price: 159, category: "Burger" },
  { id: 5, name: "Turkey burger", price: 299, category: "Burger" },
  { id: 6, name: "Cheeseburger", price: 149, category: "Burger" },
];

export default function ManageMenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>(SEED);
  
  // Form State
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // ─── Handlers ───
  
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleAdd = () => {
    if (!itemName.trim() || !price || !category) return;
    const newItem: MenuItem = {
      id: Date.now(),
      name: itemName.trim(),
      price: Number(price),
      category,
    };
    setMenu([...menu, newItem]);
    // Reset Form
    setItemName("");
    setPrice("");
    setCategory("");
    setImgPreview(null);
  };

  const deleteItem = (id: number) => {
    setMenu(menu.filter((m) => m.id !== id));
  };

  // ─── Edit Logic ───
  const startEdit = (id: number) => {
    setMenu(menu.map(m => m.id === id ? { 
      ...m, 
      editing: true, 
      editName: m.name, 
      editPrice: m.price, 
      editCategory: m.category 
    } : m));
  };

  const cancelEdit = (id: number) => {
    setMenu(menu.map(m => m.id === id ? { ...m, editing: false } : m));
  };

  const saveEdit = (id: number) => {
    setMenu(menu.map(m => {
      if (m.id === id) {
        return {
          ...m,
          editing: false,
          name: m.editName || m.name,
          price: m.editPrice || m.price,
          category: m.editCategory || m.category
        };
      }
      return m;
    }));
  };

  const updateEditField = (id: number, field: keyof MenuItem, value: string | number) => {
    setMenu(menu.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[800px]">
      <h2 className="text-xl font-extrabold text-gray-900 mb-8">
        Menu Management
      </h2>

      {/* ─── ADD MENU SECTION ─── */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center">
            <UtensilsCrossed size={20} className="text-[#D92632]" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Add Menu</h3>
        </div>

        <div className="bg-[#F3F4F6] rounded-2xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Image Upload Area */}
            <div 
              onClick={() => fileRef.current?.click()}
              className="w-full md:w-56 h-48 bg-white border-2 border-dashed border-[#FCA5A5] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group relative overflow-hidden"
            >
              {imgPreview ? (
                <img src={imgPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <ImageIcon size={24} className="text-[#D92632]" />
                  </div>
                  <p className="text-sm font-bold text-gray-700">Click to upload image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG upto 10 MB</p>
                </>
              )}
              <input 
                type="file" 
                ref={fileRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {/* Inputs Area */}
            <div className="flex-1 space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="eg.: Margherita Pizza"
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-[#D92632] focus:ring-1 focus:ring-[#D92632] transition-all"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Price ₹</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setItemName(e.target.value)} // Fixed bug from original code
                  onChangeCapture={(e: any) => setPrice(e.target.value)}
                  placeholder="eg.: 149"
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-[#D92632] focus:ring-1 focus:ring-[#D92632] transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none focus:border-[#D92632] focus:ring-1 focus:ring-[#D92632] appearance-none text-gray-700"
                  >
                    <option value="">Select Category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleAdd}
                  className="bg-[#10B981] hover:bg-[#059669] text-white px-8 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANAGE MENU TABLE ─── */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center">
            <UtensilsCrossed size={20} className="text-[#D92632]" />
          </div>
          <h3 className="font-bold text-lg text-gray-900">Manage Menu</h3>
        </div>

        <div className="bg-[#F3F4F6] rounded-2xl p-1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              {/* Table Header - Pinkish Red Background */}
              <thead>
                <tr className="bg-[#EFA5AA]"> 
                  <th className="py-3 px-6 text-left text-sm font-bold text-[#7f1d1d]">Item Name</th>
                  <th className="py-3 px-6 text-center text-sm font-bold text-[#7f1d1d]">Price ₹</th>
                  <th className="py-3 px-6 text-center text-sm font-bold text-[#7f1d1d]">Category</th>
                  <th className="py-3 px-6 text-center text-sm font-bold text-[#7f1d1d]">Action</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="bg-white">
                {menu.map((item, index) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-gray-100 last:border-0 ${item.editing ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                  >
                    
                    {/* Name Column */}
                    <td className="py-3 px-6">
                      {item.editing ? (
                        <input 
                          value={item.editName}
                          onChange={(e) => updateEditField(item.id, 'editName', e.target.value)}
                          className="w-full border border-red-300 rounded px-2 py-1 text-sm outline-none text-[#D92632]"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-gray-800">{item.name}</span>
                      )}
                    </td>

                    {/* Price Column */}
                    <td className="py-3 px-6 text-center">
                      {item.editing ? (
                        <input 
                          type="number"
                          value={item.editPrice}
                          onChange={(e) => updateEditField(item.id, 'editPrice', Number(e.target.value))}
                          className="w-20 mx-auto border border-red-300 rounded px-2 py-1 text-sm text-center outline-none text-[#D92632]"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-600">{item.price}</span>
                      )}
                    </td>

                    {/* Category Column */}
                    <td className="py-3 px-6 text-center">
                      {item.editing ? (
                         <div className="relative w-32 mx-auto">
                           <select
                             value={item.editCategory}
                             onChange={(e) => updateEditField(item.id, 'editCategory', e.target.value)}
                             className="w-full border border-red-300 rounded px-2 py-1 text-sm outline-none text-[#D92632] appearance-none"
                           >
                             {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                         </div>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                          {item.category}
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="py-3 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {item.editing ? (
                          <>
                            <button 
                              onClick={() => saveEdit(item.id)}
                              className="bg-[#10B981] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#059669]"
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => cancelEdit(item.id)}
                              className="bg-[#EF4444] text-white px-3 py-1 rounded text-xs font-bold hover:bg-[#DC2626]"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => startEdit(item.id)}
                              className="w-8 h-8 rounded-full bg-[#D1FAE5] text-[#10B981] flex items-center justify-center hover:bg-[#A7F3D0] transition-colors"
                            >
                              <Pencil size={14} strokeWidth={2.5} />
                            </button>
                            <button 
                              onClick={() => deleteItem(item.id)}
                              className="w-8 h-8 rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center hover:bg-[#FECACA] transition-colors"
                            >
                              <Trash2 size={14} strokeWidth={2.5} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}