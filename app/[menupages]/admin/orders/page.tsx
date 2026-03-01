
"use client";

import { Package, Clock, Armchair, CheckCircle, ChevronDown } from "lucide-react";

// ─── Types ───
type OrderItem = {
  id: number; // The quantity badge number (1, 2, 4)
  name: string;
  price: number;
};

type Order = {
  id: string;
  number: number;
  time: string;
  table: string;
  total: number;
  status: "pending" | "completed";
  items: OrderItem[];
};

// ─── Data ───
const PENDING_ORDERS: Order[] = [
  {
    id: "6", number: 6, time: "10:30 PM", table: "Table 001", total: 497, status: "pending",
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
  {
    id: "5", number: 5, time: "10:30 PM", table: "Table 001", total: 497, status: "pending",
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
  {
    id: "4", number: 4, time: "10:30 PM", table: "Table 001", total: 497, status: "pending",
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
];

const COMPLETED_ORDERS: Order[] = [
  {
    id: "3", number: 3, time: "10:30 PM", table: "Table 001", total: 497, status: "completed",
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
  {
    id: "2", number: 2, time: "10:30 PM", table: "Table 001", total: 497, status: "completed",
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
  {
    id: "1", number: 1, time: "10:30 PM", table: "Table 001", total: 497, status: "completed",
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
];

// ─── Component for Individual Card ───
function OrderCard({ order }: { order: Order }) {
  const isPending = order.status === "pending";

  return (
    <div className="bg-[#F3F4F6] rounded-2xl p-4 mb-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Icon Circle */}
          <div className="w-10 h-10 rounded-full bg-[#FEE2E2] flex items-center justify-center flex-shrink-0">
            <Package size={18} className="text-[#D92632]" strokeWidth={2} />
          </div>
          
          {/* Text Details */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
              Order #{order.number}
            </h4>
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-500 font-medium mt-0.5">
              <Clock size={12} />
              <span>{order.time}</span>
              <span className="text-gray-300">•</span>
              <Armchair size={12} />
              <span>{order.table}</span>
            </div>
          </div>
        </div>

        {/* Price & Status */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <span className="font-extrabold text-gray-900 text-sm sm:text-base">
            ₹{order.total}
          </span>
          <div
            className={`
              flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold
              ${isPending 
                ? "bg-[#FFEDD5] text-[#EA580C]" // Light Orange/Peach for Pending
                : "bg-[#D1FAE5] text-[#059669]" // Light Green for Completed
              }
            `}
          >
            {isPending ? "Pending" : "Completed"}
            <ChevronDown size={12} strokeWidth={3} />
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {order.items.map((item, idx) => (
          <div
            key={`${order.id}-${idx}`}
            className="bg-white rounded-xl px-3 py-2.5 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#FEE2E2] text-[#D92632] text-[10px] font-bold flex items-center justify-center">
                {item.id}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-800">
                {item.name}
              </span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-600">
              ₹{item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page Component ───
export default function OrdersPage() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 min-h-[600px]">
      
      {/* ─── Top Header ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h2 className="text-xl font-extrabold text-gray-900">
          Orders Management
        </h2>
        
        {/* Summary Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#D1FAE5] text-[#059669] px-4 py-2 rounded-lg text-sm font-bold">
            <CheckCircle size={16} />
            {COMPLETED_ORDERS.length} Completed
          </div>
          <div className="flex items-center gap-1.5 bg-[#FFEDD5] text-[#EA580C] px-4 py-2 rounded-lg text-sm font-bold">
            <Clock size={16} />
            {PENDING_ORDERS.length} Pending
          </div>
        </div>
      </div>

      {/* ─── Two Column Layout ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Column 1: Pending */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-[#EA580C]" />
            <h3 className="font-bold text-base text-gray-900">Pending Orders</h3>
          </div>
          <div className="flex flex-col">
            {PENDING_ORDERS.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

        {/* Column 2: Completed */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle size={18} className="text-[#059669]" />
            <h3 className="font-bold text-base text-gray-900">Completed Orders</h3>
          </div>
          <div className="flex flex-col">
            {COMPLETED_ORDERS.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}