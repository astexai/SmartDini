"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  category: string;
};

// This would normally come from a global state or context - using reliable image URLs
const mockMenuItems = [
  { id: 1, name: "Classic Margherita", price: 149, category: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop", description: "Classic Margherita" },
  { id: 2, name: "Farm Fresh", price: 149, category: "Pizza", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop", description: "Farm Fresh" },
  { id: 3, name: "Pepperoni Delight", price: 149, category: "Pizza", image: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=100&h=100&fit=crop", description: "Pepperoni Delight" },
];

// For Next.js 15, we need to handle params as a Promise
type PageProps = {
  params: Promise<{ menupages: string }>
}

export default async function CheckoutPage({ params }: PageProps) {
  // Unwrap the params Promise
  const { menupages } = await params;
  
  return <CheckoutPageContent menupages={menupages} />;
}

function CheckoutPageContent({ menupages }: { menupages: string }) {
  const router = useRouter();
  const [tableNumber, setTableNumber] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage or use mock data for demo
  useEffect(() => {
    // For demo purposes, using mock data with different quantities to show the functionality
    setCartItems([
      { ...mockMenuItems[0], quantity: 2 }, // Classic Margherita - 2 of the same item
      { ...mockMenuItems[1], quantity: 1 }, // Farm Fresh - 1 item
    ]);
  }, []);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + change;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculate unique items count (number of different items)
  const uniqueItemsCount = cartItems.length;
  
  // Calculate total quantity (sum of all quantities)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          <header className="sticky top-0 z-10 bg-white border-b">
            <div className="px-4 py-3 flex items-center gap-4">
              <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-lg font-semibold">Checkout</h1>
            </div>
          </header>
          
          <div className="p-8 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Your cart is empty</h2>
            <p className="text-sm text-gray-500 mb-6">Add items from the menu to get started</p>
            <Link
              href={`/${menupages}/menu`}
              className="inline-block bg-[#D32F2F] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#B71C1C]"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b">
          <div className="px-4 py-3 flex items-center justify-between">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold">Checkout</h1>
            <div className="w-10 h-10" />
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Item Count Summary */}
          <div className="bg-[#D32F2F]/5 rounded-xl p-3">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-[#D32F2F]">{uniqueItemsCount}</span> different items ·{' '}
              <span className="font-semibold text-[#D32F2F]">{totalQuantity}</span> total quantity
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white rounded-lg p-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
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
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{item.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <p className="font-semibold text-[#D32F2F]">₹{item.price * item.quantity}</p>
                        <p className="text-xs text-gray-500">₹{item.price} each</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 bg-[#D32F2F] text-white rounded-full flex items-center justify-center hover:bg-[#B71C1C]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-1 p-1.5 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Price Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-medium">₹{Math.round(tax)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-[#D32F2F]">₹{Math.round(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Number */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Table Number</h2>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter your table no."
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/20"
              />
              <p className="text-xs text-gray-500">eg. 01, 02, 03...</p>
            </div>
          </div>
        </div>

        {/* Proceed to Payment */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <Link
            href={`/${menupages}/menu/checkout/payment`}
            className="block w-full bg-[#D32F2F] text-white text-center py-3.5 rounded-xl font-semibold hover:bg-[#B71C1C] transition-colors"
          >
            Make Payment · ₹{Math.round(total)}
          </Link>
        </div>
      </div>
    </div>
  );
}