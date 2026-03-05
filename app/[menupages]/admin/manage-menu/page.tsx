"use client";

import { useState, useRef, ChangeEvent, useEffect } from "react";
import { UtensilsCrossed, Image as ImageIcon, Pencil, Trash2, Check, X, ChevronDown, UploadCloud, Plus, Tag } from "lucide-react";

// ─── Types ───
type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string; // Now required with Unsplash images
  // UI States for editing
  editing?: boolean;
  editName?: string;
  editPrice?: number;
  editCategory?: string;
  editImageUrl?: string;
};

const DEFAULT_CATEGORIES = ["Pizza", "Burger", "Pasta", "Drinks", "Desserts"];

// Function to get Unsplash image based on item name
const getUnsplashImage = (name: string): string => {
  const query = encodeURIComponent(name.toLowerCase());
  
  // Pizza images
  if (name.toLowerCase().includes('pizza')) {
    if (name.includes('Marinara')) return "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop&auto=format";
    if (name.includes('Margherita')) return "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop&auto=format";
    if (name.includes('Chicago')) return "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=200&h=200&fit=crop&auto=format";
    return "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop&auto=format";
  }
  
  // Burger images
  if (name.toLowerCase().includes('burger')) {
    if (name.includes('Veggie')) return "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=200&h=200&fit=crop&auto=format";
    if (name.includes('Turkey')) return "https://images.unsplash.com/photo-1550317138-10000687a72b?w=200&h=200&fit=crop&auto=format";
    if (name.includes('Cheese')) return "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&auto=format";
    return "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=200&h=200&fit=crop&auto=format";
  }
  
  // Default food image
  return "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=200&fit=crop&auto=format";
};

const SEED: MenuItem[] = [
  { id: 1, name: "Pizza Marinara", price: 199, category: "Pizza", imageUrl: getUnsplashImage("Pizza Marinara") },
  { id: 2, name: "Pizza Margherita", price: 200, category: "Pizza", imageUrl: getUnsplashImage("Pizza Margherita") },
  { id: 3, name: "Chicago Pizza", price: 399, category: "Pizza", imageUrl: getUnsplashImage("Chicago Pizza") },
  { id: 4, name: "Veggie burger", price: 159, category: "Burger", imageUrl: getUnsplashImage("Veggie burger") },
  { id: 5, name: "Turkey burger", price: 299, category: "Burger", imageUrl: getUnsplashImage("Turkey burger") },
  { id: 6, name: "Cheeseburger", price: 149, category: "Burger", imageUrl: getUnsplashImage("Cheeseburger") },
];

export default function ManageMenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>(SEED);
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  
  // Form State
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // New Category State
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // ─── Handlers ───
  
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImgPreview(imageUrl);
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setCategory(newCategory.trim());
      setNewCategory("");
      setShowAddCategory(false);
    }
  };

  const handleAdd = () => {
    if (!itemName.trim() || !price || !category) return;
    const newItem: MenuItem = {
      id: Date.now(),
      name: itemName.trim(),
      price: Number(price),
      category,
      imageUrl: imgPreview || getUnsplashImage(itemName), // Use Unsplash if no custom image
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
    const item = menu.find(m => m.id === id);
    setMenu(menu.map(m => m.id === id ? { 
      ...m, 
      editing: true, 
      editName: m.name, 
      editPrice: m.price, 
      editCategory: m.category,
      editImageUrl: m.imageUrl || ""
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
          category: m.editCategory || m.category,
          imageUrl: m.editImageUrl || m.imageUrl
        };
      }
      return m;
    }));
  };

  const updateEditField = (id: number, field: string, value: string | number) => {
    setMenu(menu.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleEditImageUpload = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updateEditField(id, 'editImageUrl', imageUrl);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100 min-h-[800px] w-full overflow-x-hidden">
      
      {/* Industry Standard Heading with Proper Hierarchy */}
      <div className="mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Menu Management
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2 font-medium">
          Manage your restaurant menu items, prices, and categories
        </p>
      </div>

      {/* ─── ADD MENU SECTION ─── */}
      <section className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed size={16} className="text-[#D92632]" />
          </div>
          <h2 className="font-bold text-lg sm:text-xl text-gray-900">Add New Menu Item</h2>
        </div>

        <div className="bg-[#F3F4F6] rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            
            {/* Image Upload Area */}
            <div 
              onClick={() => fileRef.current?.click()}
              className="w-full lg:w-56 h-40 sm:h-48 bg-white border-2 border-dashed border-[#FCA5A5] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group relative overflow-hidden"
            >
              {imgPreview ? (
                <img src={imgPreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    <ImageIcon size={20} className="text-[#D92632]" />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-700 px-2 text-center">Click to upload image</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-1 px-2 text-center">PNG, JPG upto 10 MB</p>
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
            <div className="flex-1 space-y-3 sm:space-y-4">
              {/* Item Name */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-500 mb-1 ml-1">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="eg.: Margherita Pizza"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium outline-none focus:border-[#D92632] focus:ring-1 focus:ring-[#D92632] transition-all"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-500 mb-1 ml-1">Price ₹</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="eg.: 149"
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium outline-none focus:border-[#D92632] focus:ring-1 focus:ring-[#D92632] transition-all"
                />
              </div>

              {/* Category with Add Option */}
              <div>
                <label className="block text-[10px] sm:text-xs font-bold text-gray-500 mb-1 ml-1">Category</label>
                <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3">
                  {/* Select Category */}
                  <div className="relative w-full sm:flex-1">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium outline-none focus:border-[#D92632] focus:ring-1 focus:ring-[#D92632] appearance-none text-gray-700"
                    >
                      <option value="">Select Category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  {/* Add Category Button */}
                  {!showAddCategory ? (
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(true)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm font-medium text-gray-600 hover:text-[#D92632] hover:border-[#D92632] hover:bg-red-50 transition-all whitespace-nowrap"
                    >
                      <Plus size={16} className="text-gray-400 group-hover:text-[#D92632]" />
                      <span>New Category</span>
                    </button>
                  ) : (
                    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-2 animate-fadeIn">
                      <div className="relative flex-1">
                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="Enter category name"
                          className="w-full bg-white border border-gray-200 rounded-lg pl-8 pr-3 py-2 sm:py-3 text-xs sm:text-sm font-medium outline-none focus:border-[#D92632] focus:ring-1 focus:ring-[#D92632] transition-all"
                          autoFocus
                          onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleAddCategory}
                          disabled={!newCategory.trim()}
                          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg text-xs sm:text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowAddCategory(false);
                            setNewCategory("");
                          }}
                          className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleAdd}
                  disabled={!itemName.trim() || !price || !category}
                  className="w-full sm:w-auto bg-[#10B981] hover:bg-[#059669] text-white px-6 sm:px-8 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MANAGE MENU TABLE ─── */}
      <section>
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed size={16} className="text-[#D92632]" />
          </div>
          <h2 className="font-bold text-lg sm:text-xl text-gray-900">Current Menu Items</h2>
        </div>

        <div className="bg-[#F3F4F6] rounded-xl sm:rounded-2xl p-1 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              {/* Table Header - Adjusted column headers to match your image */}
              <thead>
                <tr className="bg-[#EFA5AA]"> 
                  <th className="py-2 sm:py-3 px-3 sm:px-6 text-left text-xs sm:text-sm font-bold text-[#7f1d1d]">Item</th>
                  <th className="py-2 sm:py-3 px-3 sm:px-6 text-center text-xs sm:text-sm font-bold text-[#7f1d1d]">Price</th>
                  <th className="py-2 sm:py-3 px-3 sm:px-6 text-center text-xs sm:text-sm font-bold text-[#7f1d1d]">Category</th>
                  <th className="py-2 sm:py-3 px-3 sm:px-6 text-center text-xs sm:text-sm font-bold text-[#7f1d1d]">Actions</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="bg-white">
                {menu.map((item) => (
                  <tr 
                    key={item.id} 
                    className={`border-b border-gray-100 last:border-0 ${item.editing ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                  >
                    
                    {/* Item Column with Image - Aligned left */}
                    <td className="py-2 sm:py-3 px-3 sm:px-6">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* Image Circle with Real Unsplash Photo */}
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 overflow-hidden ring-2 ring-offset-2 ring-[#FEE2E2]">
                          {item.editing ? (
                            item.editImageUrl ? (
                              <img 
                                src={item.editImageUrl} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = getUnsplashImage(item.name);
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-[#FEE2E2] flex items-center justify-center relative group cursor-pointer">
                                <ImageIcon size={14} className="text-[#D92632]" />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  onChange={(e) => handleEditImageUpload(item.id, e)}
                                />
                              </div>
                            )
                          ) : (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = getUnsplashImage(item.name);
                              }}
                            />
                          )}
                        </div>
                        
                        {/* Item Name */}
                        {item.editing ? (
                          <input 
                            value={item.editName}
                            onChange={(e) => updateEditField(item.id, 'editName', e.target.value)}
                            className="w-full border border-red-300 rounded px-2 py-1 text-xs outline-none text-[#D92632]"
                            placeholder="Item name"
                          />
                        ) : (
                          <span className="text-xs sm:text-sm font-semibold text-gray-800">
                            {item.name}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Price Column - Centered */}
                    <td className="py-2 sm:py-3 px-3 sm:px-6 text-center">
                      {item.editing ? (
                        <input 
                          type="number"
                          value={item.editPrice}
                          onChange={(e) => updateEditField(item.id, 'editPrice', Number(e.target.value))}
                          className="w-16 sm:w-20 mx-auto border border-red-300 rounded px-2 py-1 text-xs text-center outline-none text-[#D92632]"
                          placeholder="Price"
                        />
                      ) : (
                        <span className="text-xs sm:text-sm font-medium text-gray-600">₹{item.price}</span>
                      )}
                    </td>

                    {/* Category Column - Centered with pill style */}
                    <td className="py-2 sm:py-3 px-3 sm:px-6 text-center">
                      {item.editing ? (
                         <div className="relative w-24 sm:w-32 mx-auto">
                           <select
                             value={item.editCategory}
                             onChange={(e) => updateEditField(item.id, 'editCategory', e.target.value)}
                             className="w-full border border-red-300 rounded px-2 py-1 text-xs outline-none text-[#D92632] appearance-none"
                           >
                             {categories.map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                           <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                         </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-gray-100 text-[10px] sm:text-xs font-bold text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                          {item.category}
                        </span>
                      )}
                    </td>

                    {/* Actions Column - Centered */}
                    <td className="py-2 sm:py-3 px-3 sm:px-6">
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        {item.editing ? (
                          <>
                            <button 
                              onClick={() => saveEdit(item.id)}
                              className="bg-[#10B981] text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-bold hover:bg-[#059669] transition-colors whitespace-nowrap"
                              title="Save changes"
                            >
                              Save
                            </button>
                            <button 
                              onClick={() => cancelEdit(item.id)}
                              className="bg-[#EF4444] text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-xs font-bold hover:bg-[#DC2626] transition-colors whitespace-nowrap"
                              title="Cancel editing"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => startEdit(item.id)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D1FAE5] text-[#10B981] flex items-center justify-center hover:bg-[#A7F3D0] transition-colors"
                              title="Edit item"
                            >
                              <Pencil size={12} strokeWidth={2.5} />
                            </button>
                            <button 
                              onClick={() => deleteItem(item.id)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FEE2E2] text-[#EF4444] flex items-center justify-center hover:bg-[#FECACA] transition-colors"
                              title="Delete item"
                            >
                              <Trash2 size={12} strokeWidth={2.5} />
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

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}