"use client";

import { useState } from "react";

type Row = { id: number; title: string; item: string; price: string };

export default function OrdersPage() {
  const [pending, setPending] = useState<Row[]>(
    Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      title: `Order #${i + 1}`,
      item: "Chicken Burger",
      price: "₹497",
    }))
  );
  const [completed, setCompleted] = useState<Row[]>(
    Array.from({ length: 3 }, (_, i) => ({
      id: i + 7,
      title: `Order #${i + 7}`,
      item: "Chicken Burger",
      price: "₹497",
    }))
  );

  const markComplete = (id: number) => {
    const r = pending.find((x) => x.id === id);
    if (!r) return;
    setPending((l) => l.filter((x) => x.id !== id));
    setCompleted((l) => [r, ...l]);
  };
  const reopen = (id: number) => {
    const r = completed.find((x) => x.id === id);
    if (!r) return;
    setCompleted((l) => l.filter((x) => x.id !== id));
    setPending((l) => [r, ...l]);
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="font-semibold">Orders Management</div>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">
              {completed.length} Completed
            </span>
            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md">
              {pending.length} Pending
            </span>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Pending Orders</div>
              <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-md">
                In Progress
              </div>
            </div>
            <div className="space-y-3">
              {pending.map((r) => (
                <div key={r.id} className="flex items-center justify-between border rounded-lg px-3 py-2">
                  <div>
                    <div className="text-sm font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.item}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{r.price}</div>
                    <button
                      className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-xs"
                      onClick={() => markComplete(r.id)}
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-xl border p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Completed Orders</div>
              <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">
                Completed
              </div>
            </div>
            <div className="space-y-3">
              {completed.map((r) => (
                <div key={r.id} className="flex items-center justify-between border rounded-lg px-3 py-2">
                  <div>
                    <div className="text-sm font-medium">{r.title}</div>
                    <div className="text-xs text-muted-foreground">{r.item}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold">{r.price}</div>
                    <button
                      className="px-2.5 py-1 rounded-lg bg-amber-500 text-white text-xs"
                      onClick={() => reopen(r.id)}
                    >
                      Reopen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
