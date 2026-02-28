"use client";

import { Package, Clock, ShoppingCart, CheckCircle, ChevronDown } from "lucide-react";

type OrderItem = { id: number; name: string; price: number };
type Order = {
  id: string;
  number: number;
  time: string;
  table: string;
  total: number;
  status: "pending" | "completed";
  items: OrderItem[];
};

const ORDERS: Order[] = [
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

function OrderCard({ order }: { order: Order }) {
  const isPending = order.status === "pending";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-3 border border-[hsl(0,0%,93%)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-[hsl(0,0%,95%)] rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[hsl(355,60%,80%)] flex items-center justify-center flex-shrink-0">
            <Package size={15} className="text-[hsl(355,72%,46%)]" />
          </div>
          <div>
            <p className="font-semibold text-sm text-[hsl(0,0%,13%)]">
              Order #{order.number}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-[hsl(0,0%,55%)] mt-0.5">
              <Clock size={9} />
              <span>{order.time}</span>
              <span>•</span>
              <ShoppingCart size={9} />
              <span>{order.table}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-bold text-sm text-[hsl(0,0%,13%)]">₹{order.total}</span>
          <button
            className={[
              "flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border",
              isPending
                ? "bg-[hsl(40,100%,93%)] text-[hsl(35,90%,38%)] border-[hsl(40,80%,78%)]"
                : "bg-[hsl(151,60%,91%)] text-[hsl(151,100%,28%)] border-[hsl(151,50%,70%)]",
            ].join(" ")}
          >
            {isPending ? <Clock size={10} /> : <CheckCircle size={10} />}
            {isPending ? "Pending" : "Completed"}
            <ChevronDown size={10} />
          </button>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-[hsl(0,1%,74%)]">
        {order.items.map((item) => (
          <div
            key={`${order.id}-${item.id}`}
            className="flex items-center justify-between px-4 py-2"
          >
            <span className="text-sm text-[hsl(0,0%,22%)]">{item.name}</span>
            <span className="text-sm text-[hsl(0,0%,45%)]">₹{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const pending = ORDERS.filter((o) => o.status === "pending");
  const completed = ORDERS.filter((o) => o.status === "completed");

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      {/* Title row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h2 className="text-base sm:text-lg font-bold text-[hsl(0,0%,13%)]">
          Orders Management
        </h2>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[hsl(151,60%,91%)] text-[hsl(151,100%,28%)] border border-[hsl(151,50%,70%)]">
            <CheckCircle size={11} />
            {completed.length} Completed
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[hsl(40,100%,93%)] text-[hsl(35,90%,38%)] border border-[hsl(40,80%,78%)]">
            <Clock size={11} />
            {pending.length} Pending
          </span>
        </div>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Pending column */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} className="text-[hsl(355,72%,46%)]" />
            <h3 className="font-bold text-sm text-[hsl(0,0%,13%)]">Pending Orders</h3>
          </div>
          {pending.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Completed column */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={15} className="text-[hsl(151,100%,37%)]" />
            <h3 className="font-bold text-sm text-[hsl(0,0%,13%)]">Completed Orders</h3>
          </div>
          {completed.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
