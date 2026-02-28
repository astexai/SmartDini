"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Plus, Minus } from "lucide-react";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
};

// Real food images from Unsplash - using reliable, working URLs
const menuItems: MenuItem[] = [
  { 
    id: 1, 
    name: "Classic Margherita", 
    price: 149, 
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop",
    description: "Classic Margherita"
  },
  { 
    id: 2, 
    name: "Farm Fresh", 
    price: 149, 
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop",
    description: "Farm Fresh"
  },
  { 
    id: 3, 
    name: "Pepperoni Delight", 
    price: 149, 
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=300&h=300&fit=crop",
    description: "Pepperoni Delight"
  },
  { 
    id: 4, 
    name: "Cheese Burst", 
    price: 149, 
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=300&h=300&fit=crop",
    description: "Cheese Burst"
  },
  { 
    id: 5, 
    name: "Spicy Treat", 
    price: 149, 
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=300&fit=crop",
    description: "Spicy Treat"
  },
  { 
    id: 6, 
    name: "Veg Supreme", 
    price: 149, 
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1555072956-7758afb20e8f?w=300&h=300&fit=crop",
    description: "Veg Supreme"
  },
  { 
    id: 7, 
    name: "Paneer Delight", 
    price: 149, 
    category: "Pizza",
    image: "https://images.unsplash.com/photo-1588315029755-f79012d5fb4a?w=300&h=300&fit=crop",
    description: "Paneer Delight"
  },
  // Add items for other categories
  { 
    id: 8, 
    name: "French Fries", 
    price: 99, 
    category: "French Fries",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=300&h=300&fit=crop",
    description: "Crispy & Golden"
  },
  { 
    id: 9, 
    name: "Classic Burger", 
    price: 129, 
    category: "Burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop",
    description: "With crispy fries"
  },
  { 
    id: 10, 
    name: "Masala Maggie", 
    price: 89, 
    category: "Maggie",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop",
    description: "Spicy & Tasty"
  },
  { 
    id: 11, 
    name: "Cold Coffee", 
    price: 119, 
    category: "Cold Coffee",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop",
    description: "With ice cream"
  },
  { 
    id: 12, 
    name: "Steam Momos", 
    price: 109, 
    category: "Momos",
    image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=300&h=300&fit=crop",
    description: "8 pcs with chutney"
  },
];

const categories = [
  { id: 1, name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop" },
  { id: 2, name: "French Fries", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=100&h=100&fit=crop" },
  { id: 3, name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop" },
  { id: 4, name: "Maggie", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=100&h=100&fit=crop" },
  { id: 5, name: "Cold Coffee", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=100&h=100&fit=crop" },
  { id: 6, name: "Momos", image: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=100&h=100&fit=crop" },
];

// For Next.js 15, we need to handle params as a Promise
type PageProps = {
  params: Promise<{ menupages: string }>
}

export default async function MenuPage({ params }: PageProps) {
  // Unwrap the params Promise
  const { menupages } = await params;
  
  return <MenuPageContent menupages={menupages} />;
}

// Client component for the interactive parts
function MenuPageContent({ menupages }: { menupages: string }) {
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [activeCategory, setActiveCategory] = useState("Pizza");
  const [uniqueItemsCount, setUniqueItemsCount] = useState(0);

  // Calculate unique items count (number of different items with quantity > 0)
  useEffect(() => {
    const count = Object.values(quantities).filter(qty => qty > 0).length;
    setUniqueItemsCount(count);
  }, [quantities]);

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

  // Total price
  const totalPrice = cartItems.reduce((sum, item) => sum + (item?.price || 0) * (item?.qty || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D32F2F] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <span className="text-[#D32F2F]">Smart</span>Dini
                </h1>
                <p className="text-xs text-gray-500">Scan. Order. Enjoy.</p>
              </div>
            </div>
            <Link href={`/${menupages}/menu/checkout`} className="relative">
              <div className="p-2 bg-gray-100 rounded-full">
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </div>
              {uniqueItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D32F2F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {uniqueItemsCount}
                </span>
              )}
            </Link>
          </div>
        </header>

        {/* Hero Banner */}
        <div className="px-4 py-3">
          <div className="bg-[#D32F2F] rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">Where Menus Go Digital.</p>
            <p className="text-xs opacity-75 mt-1">Scan QR code to order</p>
          </div>
        </div>

        {/* Categories Scroll - with hidden scrollbar */}
        <div className="px-4">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex flex-col items-center gap-1 min-w-[70px] transition-all ${
                  activeCategory === cat.name ? 'opacity-100 scale-105' : 'opacity-70'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-transparent transition-all" style={{
                  borderColor: activeCategory === cat.name ? '#D32F2F' : 'transparent'
                }}>
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback image if the original fails to load
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop";
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-4">
          <h2 className="text-lg font-bold mb-3">{activeCategory}</h2>
          <div className="space-y-3">
            {menuItems
              .filter(item => item.category === activeCategory)
              .map((item) => {
                const qty = getQuantity(item.id);
                
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-white border rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      {/* Item Image */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback image if the original fails to load
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop";
                          }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</p>
                        <p className="text-sm font-bold text-[#D32F2F] mt-1">₹{item.price}</p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-2">
                      {qty === 0 ? (
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-6 py-2 bg-[#D32F2F] text-white rounded-lg text-sm font-medium hover:bg-[#B71C1C] transition-colors"
                        >
                          ADD
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-gray-50"
                          >
                            <Minus className="w-4 h-4 text-gray-600" />
                          </button>
                          <span className="w-8 text-center font-semibold">{qty}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 bg-[#D32F2F] text-white rounded-lg flex items-center justify-center shadow-sm hover:bg-[#B71C1C]"
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

        {/* Cart Bottom Bar - Shows only when there are items */}
        {uniqueItemsCount > 0 && (
          <div className="sticky bottom-0 left-0 right-0 bg-white border-t shadow-lg">
            <div className="max-w-md mx-auto p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {uniqueItemsCount} {uniqueItemsCount === 1 ? 'Item' : 'Items'}
                  </p>
                  <p className="text-lg font-bold text-[#D32F2F]">₹{totalPrice}</p>
                </div>
                <Link
                  href={`/${menupages}/menu/checkout`}
                  className="bg-[#D32F2F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors"
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