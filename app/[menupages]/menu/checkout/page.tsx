"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Minus, Plus, Trash2, Pizza } from "lucide-react";

type Params = {
  menupages: string;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  prepTime: string;
};

export default function CheckoutPage({ params }: { params: Params }) {
  const router = useRouter();
  const [tableNumber, setTableNumber] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Pizza Categories 1", price: 149, quantity: 3, prepTime: "10 minutes" },
    { id: 2, name: "Pizza Categories 2", price: 149, quantity: 2, prepTime: "10 minutes" },
    { id: 3, name: "Pizza Categories 3", price: 149, quantity: 1, prepTime: "10 minutes" },
    { id: 4, name: "Pizza Categories 4", price: 149, quantity: 1, prepTime: "10 minutes" },
  ]);

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
              href={`/${params.menupages}/menu`}
              className="inline-block bg-primary text-white px-6 py-3 rounded-xl font-semibold"
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
            <div className="w-10 h-10" /> {/* Spacer */}
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Order Summary</h2>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-white rounded-lg p-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Pizza className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">Prepare in {item.prepTime}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="font-semibold text-primary">₹{item.price * item.quantity}</p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center"
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
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%)</span>
                <span className="font-medium">₹{Math.round(tax)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">₹{Math.round(total)}</span>
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
                className="w-full px-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-gray-500">eg. 01, 02, 03...</p>
            </div>
          </div>
        </div>

        {/* Proceed to Payment */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <Link
            href={`/${params.menupages}/menu/checkout/payment`}
            className="block w-full bg-primary text-white text-center py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          >
            Make Payment · ₹{Math.round(total)}
          </Link>
        </div>
      </div>
    </div>
  );
}