"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Plus, Minus, Pizza, Coffee, Beef, Soup, CupSoda, Cookie } from "lucide-react";

type Params = {
  menupages: string;
};

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  image?: string;
  popular?: boolean;
};

const categories = [
  { id: 1, name: "Pizza", icon: Pizza, color: "bg-orange-100 text-orange-600" },
  { id: 2, name: "French Fries", icon: Cookie, color: "bg-yellow-100 text-yellow-600" },
  { id: 3, name: "Burger", icon: Beef, color: "bg-amber-100 text-amber-600" },
  { id: 4, name: "Maggie", icon: Soup, color: "bg-red-100 text-red-600" },
  { id: 5, name: "Cold Coffee", icon: CupSoda, color: "bg-brown-100 text-brown-600" },
  { id: 6, name: "Momos", icon: Coffee, color: "bg-purple-100 text-purple-600" },
];

const menuItems: MenuItem[] = [
  { id: 1, name: "Pizza Categories 1", price: 149, category: "Pizza", popular: true },
  { id: 2, name: "Pizza Categories 2", price: 149, category: "Pizza", popular: true },
  { id: 3, name: "Pizza Categories 3", price: 149, category: "Pizza" },
  { id: 4, name: "Pizza Categories 4", price: 149, category: "Pizza" },
  { id: 5, name: "Pizza Categories 5", price: 149, category: "Pizza" },
  { id: 6, name: "Pizza Categories 6", price: 149, category: "Pizza" },
  { id: 7, name: "Pizza Categories 7", price: 149, category: "Pizza" },
];

export default function MenuPage({ params }: { params: Params }) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState("Pizza");

  const updateQuantity = (id: number, change: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const newQty = current + change;
      
      if (newQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [id]: newQty };
    });
  };

  const getQuantity = (id: number) => quantities[id] || 0;

  const cartItems = Object.entries(quantities)
    .map(([id, qty]) => {
      const item = menuItems.find(i => i.id === Number(id));
      return item ? { ...item, qty } : null;
    })
    .filter(Boolean);

  const totalItems = cartItems.reduce((sum, item) => sum + (item?.qty || 0), 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item?.price || 0) * (item?.qty || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-primary">Smart</span>Dini
                </h1>
                <p className="text-xs text-gray-500">Scan. Order. Enjoy.</p>
              </div>
            </div>
            <Link href={`/${params.menupages}/menu/checkout`} className="relative">
              <div className="p-2 bg-gray-100 rounded-full">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="px-4 py-3">
          <div className="bg-primary rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">Where Menus Go Digital.</p>
            <p className="text-xs opacity-75 mt-1">Scan QR code to order</p>
          </div>
        </div>

        {/* Categories Scroll */}
        <div className="px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex flex-col items-center gap-1 min-w-[70px] transition-all ${
                    activeCategory === cat.name ? 'opacity-100' : 'opacity-60'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-3">{activeCategory} Categories</h2>
          <div className="space-y-3">
            {menuItems.map((item) => {
              const qty = getQuantity(item.id);
              
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white border rounded-xl p-3"
                >
                  <div className="flex items-center gap-3">
                    {/* Item Image Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <Pizza className="w-8 h-8 text-gray-400" />
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Classic taste</p>
                      <p className="text-sm font-bold text-primary mt-1">₹{item.price}</p>
                    </div>
                  </div>

                  <div>
                    {qty === 0 ? (
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm"
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </button>
                        <span className="w-8 text-center font-semibold">{qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-sm"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cart Bottom Bar */}
        {totalItems > 0 && (
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t shadow-lg">
            <div className="max-w-md mx-auto p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{totalItems} Items in cart</p>
                  <p className="text-lg font-bold text-primary">₹{totalPrice}</p>
                </div>
                <Link
                  href={`/${params.menupages}/menu/checkout`}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Checkout →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}