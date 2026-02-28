"use client";

import { useState } from "react";
import { Package, Clock, ShoppingCart, Check, X } from "lucide-react";

type OrderItem = { id: number; name: string; price: number };
type Order = {
  id: string;
  number: number;
  time: string;
  table: string;
  total: number;
  items: OrderItem[];
};

const seed: Order[] = [
  {
    id: "1", number: 1, time: "Just now", table: "Table 001", total: 497,
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
  {
    id: "2", number: 2, time: "Just now", table: "Table 001", total: 497,
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
  {
    id: "3", number: 3, time: "Just now", table: "Table 001", total: 497,
    items: [
      { id: 1, name: "Chicken Burger", price: 199 },
      { id: 2, name: "Chicken Burger", price: 199 },
      { id: 4, name: "Chicken Burger", price: 199 },
    ],
  },
];

export default function NewOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(seed);

  const remove = (id: string) => setOrders((p) => p.filter((o) => o.id !== id));

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-bold text-[hsl(0,0%,13%)] mb-5">
        New Orders
      </h2>

      <div className="space-y-4">
        {orders.length === 0 && (
          <p className="text-center text-[hsl(0,0%,55%)] py-16 text-sm">
            No new orders at the moment
          </p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[hsl(0,0%,96%)] rounded-2xl overflow-hidden"
          >
            {/* ── Order header ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[hsl(0,75%,89%)] rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[hsl(355,96%,90%)] flex items-center justify-center flex-shrink-0">
                  <Package size={17} className="text-[hsl(355,72%,46%)]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-[hsl(0,0%,13%)]">
                    New Order #{order.number}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-[hsl(0,7%,15%)] mt-0.5">
                    <Clock size={10} />
                    <span>{order.time}</span>
                    <span>•</span>
                    <ShoppingCart size={10} />
                    <span>{order.table}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="font-bold text-sm text-[hsl(0,0%,13%)]">
                  ₹{order.total}
                </span>
                <button
                  onClick={() => remove(order.id)}
                  className="flex items-center gap-1 bg-[hsl(151,100%,37%)] text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-[hsl(151,100%,32%)] transition-colors"
                >
                  <Check size={12} />
                  Accept
                </button>
                <button
                  onClick={() => remove(order.id)}
                  className="flex items-center gap-1 bg-white text-[hsl(355,72%,46%)] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[hsl(355,72%,60%)] hover:bg-[hsl(355,72%,97%)] transition-colors"
                >
                  <X size={12} />
                  Reject
                </button>
              </div>
            </div>

            {/* ── Items ── */}
            <div className="divide-y divide-[hsl(0,22%,70%)]">
              {order.items.map((item) => ( 
                <div
                  key={`${order.id}-${item.id}`}
                  className="flex items-center justify-between px-4 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[hsl(355,72%,46%)] text-white text-[11px] font-semibold flex items-center justify-center flex-shrink-0">
                      {item.id}
                    </span>
                    <span className="text-sm text-[hsl(0,0%,20%)]">{item.name}</span>
                  </div>
                  <span className="text-sm text-[hsl(0,0%,35%)]">₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
