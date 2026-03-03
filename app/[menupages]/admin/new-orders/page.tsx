"use client";

import { useState } from "react";
import { Package, Clock, Armchair, Check, X, Wallet, Smartphone } from "lucide-react";

// ─── Types ───
type OrderItem = {
  id: number;
  name: string;
  price: number;
};

type PaymentMethod = "cash" | "upi";

type Order = {
  id: string;
  number: number;
  time: string;
  table: string;
  total: number;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  upiId?: string; // Optional UPI ID if payment is UPI
};

// ─── Seed Data with Payment Methods ───
const seed: Order[] = [
  {
    id: "1",
    number: 1,
    time: "Just now",
    table: "Table 001",
    total: 497,
    paymentMethod: "upi",
    upiId: "john@okhdfcbank",
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
  {
    id: "2",
    number: 2,
    time: "2 mins ago",
    table: "Table 003",
    total: 299,
    paymentMethod: "cash",
    items: [
      { id: 1, name: "Margherita Pizza", price: 149 },
      { id: 2, name: "French Fries", price: 99 },
      { id: 4, name: "Cold Coffee", price: 51 },
    ],
  },
  {
    id: "3",
    number: 3,
    time: "5 mins ago",
    table: "Table 002",
    total: 598,
    paymentMethod: "upi",
    upiId: "jane@okhdfcbank",
    items: [
      { id: 1, name: "Pepperoni Pizza", price: 299 },
      { id: 2, name: "Garlic Bread", price: 149 },
      { id: 4, name: "Brownie", price: 150 },
    ],
  },
];

export default function NewOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(seed);

  const remove = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // Helper to get payment method badge styles
  const getPaymentBadge = (method: PaymentMethod) => {
    if (method === "upi") {
      return {
        icon: Smartphone,
        bgColor: "bg-purple-100",
        textColor: "text-purple-700",
        label: "UPI"
      };
    } else {
      return {
        icon: Wallet,
        bgColor: "bg-amber-100",
        textColor: "text-amber-700",
        label: "Cash"
      };
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[600px]">
      {/* ─── Page Title ─── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-extrabold text-gray-900">
          New Orders
        </h2>
        <span className="text-sm bg-[#FEE2E2] text-[#D92632] px-3 py-1 rounded-full font-semibold">
          {orders.length} New
        </span>
      </div>

      {/* ─── Orders List ─── */}
      <div className="flex flex-col gap-6">
        {orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Package size={48} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">No new orders at the moment</p>
          </div>
        )}

        {orders.map((order) => {
          const paymentBadge = getPaymentBadge(order.paymentMethod);
          const PaymentIcon = paymentBadge.icon;

          return (
            <div
              key={order.id}
              className="bg-[#F3F4F6] rounded-2xl p-4 sm:p-5 hover:shadow-md transition-shadow"
            >
              {/* ─── Order Header ─── */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
                
                {/* Left: Icon & Meta */}
                <div className="flex items-start sm:items-center gap-4">
                  {/* Icon Circle */}
                  <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
                    <Package size={22} className="text-[#D92632]" strokeWidth={2} />
                  </div>
                  
                  {/* Text Info */}
                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <h3 className="text-gray-900 font-bold text-base sm:text-lg">
                        New Order #{order.number}
                      </h3>
                      
                      {/* Payment Method Badge */}
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${paymentBadge.bgColor} ${paymentBadge.textColor} text-xs font-bold`}>
                        <PaymentIcon size={12} strokeWidth={2.5} />
                        <span>{paymentBadge.label}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 font-medium mt-1">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{order.time}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1">
                        <Armchair size={14} />
                        <span>{order.table}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto mt-2 lg:mt-0 border-t lg:border-t-0 border-gray-200 pt-3 lg:pt-0">
                  <span className="text-xl font-extrabold text-gray-900 mr-2">
                    ₹{order.total}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {/* Accept Button */}
                    <button
                      onClick={() => remove(order.id)}
                      className="flex items-center gap-1.5 bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                    >
                      <Check size={16} strokeWidth={3} />
                      Accept
                    </button>

                    {/* Reject Button */}
                    <button
                      onClick={() => remove(order.id)}
                      className="flex items-center gap-1.5 bg-white border border-[#EF4444] text-[#EF4444] hover:bg-[#FEF2F2] px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                    >
                      <X size={16} strokeWidth={3} />
                      Reject
                    </button>
                  </div>
                </div>
              </div>

              {/* ─── Order Items (White Cards) ─── */}
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={`${order.id}-${item.id}-${index}`}
                    className="bg-white rounded-xl px-4 py-3 flex items-center justify-between shadow-sm hover:shadow transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      {/* Pink Badge Number */}
                      <span className="w-6 h-6 rounded bg-[#FEE2E2] text-[#D92632] text-xs font-bold flex items-center justify-center">
                        {item.id}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-600">
                      ₹{item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}