"use client";

import { useState } from "react";

type Order = {
  id: number;
  title: string;
  item: string;
  price: string;
  status: "new" | "accepted" | "rejected";
};

export default function NewOrdersPage() {
  const [rows, setRows] = useState<Order[]>(
    Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      title: `New Order #${i + 1}`,
      item: "Chicken Burger",
      price: "₹497",
      status: "new",
    }))
  );

  const accept = (id: number) =>
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status: "accepted" } : r)));
  const reject = (id: number) =>
    setRows((list) => list.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)));

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-4">
        <div className="font-semibold mb-4">New Orders</div>
        <div className="space-y-3">
          {rows.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between bg-white border rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-md bg-muted" />
                <div>
                  <div className="text-sm font-medium">{r.title}</div>
                  <div className="text-xs text-muted-foreground">{r.item}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold">{r.price}</div>
                {r.status === "new" && (
                  <>
                    <button
                      className="px-3 py-1 rounded-lg bg-emerald-500 text-white text-sm"
                      onClick={() => accept(r.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
                      onClick={() => reject(r.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                {r.status !== "new" && (
                  <span
                    className={`px-2 py-1 rounded-md text-xs ${
                      r.status === "accepted"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {r.status === "accepted" ? "Accepted" : "Rejected"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
