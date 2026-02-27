"use client";

import { useState } from "react";
import { Clock, CheckCircle, XCircle } from "lucide-react";

type NewOrder = {
  id: number;
  orderNumber: string;
  items: string[];
  total: number;
  status: "new" | "accepted" | "rejected";
  tableId: string;
  time: string;
};

export default function NewOrdersPage() {
  const [orders, setOrders] = useState<NewOrder[]>([
    {
      id: 1,
      orderNumber: "#1001",
      items: ["Chicken Burger", "French Fries", "Coke"],
      total: 497,
      status: "new",
      tableId: "T5",
      time: "2 mins ago"
    },
    {
      id: 2,
      orderNumber: "#1002",
      items: ["Margherita Pizza", "Garlic Bread"],
      total: 399,
      status: "new",
      tableId: "T3",
      time: "5 mins ago"
    },
    {
      id: 3,
      orderNumber: "#1003",
      items: ["Veggie Burger", "Onion Rings"],
      total: 259,
      status: "new",
      tableId: "T8",
      time: "8 mins ago"
    },
    {
      id: 4,
      orderNumber: "#1004",
      items: ["Chicago Pizza", "Coke"],
      total: 549,
      status: "accepted",
      tableId: "T2",
      time: "15 mins ago"
    },
    {
      id: 5,
      orderNumber: "#1005",
      items: ["Cheeseburger", "Milkshake"],
      total: 329,
      status: "rejected",
      tableId: "T6",
      time: "20 mins ago"
    }
  ]);

  const handleAccept = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: "accepted" } : order
    ));
  };

  const handleReject = (id: number) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: "rejected" } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'accepted': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">New Orders</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage incoming orders</p>
        </div>
        <div className="flex gap-2">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {orders.filter(o => o.status === 'new').length} New
          </span>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
            {orders.filter(o => o.status === 'accepted').length} Accepted
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Order Info */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-bold">{order.tableId}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold">{order.orderNumber}</h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {order.time}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.items.join(" • ")}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Table {order.tableId}
                  </p>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center gap-4 sm:flex-row flex-row-reverse justify-between sm:justify-end">
                <div className="text-right">
                  <p className="font-bold text-lg">₹{order.total}</p>
                  <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                </div>
                
                {order.status === "new" ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(order.id)}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors flex items-center gap-1"
                    >
                      <CheckCircle className="h-4 w-4" /> Accept
                    </button>
                    <button
                      onClick={() => handleReject(order.id)}
                      className="px-4 py-2 bg-rose-500 text-white rounded-lg text-sm font-medium hover:bg-rose-600 transition-colors flex items-center gap-1"
                    >
                      <XCircle className="h-4 w-4" /> Reject
                    </button>
                  </div>
                ) : (
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    order.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {order.status === 'accepted' ? '✓ Accepted' : '✗ Rejected'}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}