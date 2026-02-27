"use client";

import { useState } from "react";
import { Clock, CheckCircle, RefreshCw } from "lucide-react";

type Order = {
  id: number;
  orderNumber: string;
  items: string[];
  total: number;
  status: "pending" | "completed";
  customer: string;
  time: string;
};

export default function OrdersPage() {
  const [pendingOrders, setPendingOrders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: "#1001",
      items: ["Chicken Burger", "French Fries"],
      total: 497,
      status: "pending",
      customer: "John Doe",
      time: "10:30 AM"
    },
    {
      id: 2,
      orderNumber: "#1002",
      items: ["Margherita Pizza"],
      total: 399,
      status: "pending",
      customer: "Jane Smith",
      time: "10:45 AM"
    },
    {
      id: 3,
      orderNumber: "#1003",
      items: ["Veggie Burger", "Coke"],
      total: 259,
      status: "pending",
      customer: "Mike Johnson",
      time: "11:00 AM"
    }
  ]);

  const [completedOrders, setCompletedOrders] = useState<Order[]>([
    {
      id: 4,
      orderNumber: "#998",
      items: ["Chicago Pizza", "Garlic Bread"],
      total: 549,
      status: "completed",
      customer: "Sarah Wilson",
      time: "09:15 AM"
    },
    {
      id: 5,
      orderNumber: "#999",
      items: ["Cheeseburger", "Onion Rings"],
      total: 329,
      status: "completed",
      customer: "Tom Brown",
      time: "09:30 AM"
    }
  ]);

  const markAsCompleted = (order: Order) => {
    setPendingOrders(pendingOrders.filter(o => o.id !== order.id));
    setCompletedOrders([{ ...order, status: "completed" }, ...completedOrders]);
  };

  const reopenOrder = (order: Order) => {
    setCompletedOrders(completedOrders.filter(o => o.id !== order.id));
    setPendingOrders([{ ...order, status: "pending" }, ...pendingOrders]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <p className="text-sm text-muted-foreground mt-1">Track and manage all orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
          <p className="text-sm text-amber-600 flex items-center gap-1">
            <Clock className="h-4 w-4" /> Pending Orders
          </p>
          <p className="text-2xl font-bold text-amber-700 mt-1">{pendingOrders.length}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
          <p className="text-sm text-emerald-600 flex items-center gap-1">
            <CheckCircle className="h-4 w-4" /> Completed
          </p>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{completedOrders.length}</p>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Orders */}
        <div className="bg-white rounded-xl border">
          <div className="p-4 border-b bg-amber-50/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                Pending Orders
              </h3>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                In Progress
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {pendingOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.orderNumber}</span>
                      <span className="text-xs text-muted-foreground">{order.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{order.items.join(" • ")}</p>
                    <p className="text-xs text-muted-foreground mt-1">Customer: {order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{order.total}</p>
                    <button
                      onClick={() => markAsCompleted(order)}
                      className="mt-2 px-3 py-1 bg-emerald-500 text-white rounded-lg text-xs hover:bg-emerald-600 transition-colors"
                    >
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {pendingOrders.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No pending orders</p>
            )}
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-white rounded-xl border">
          <div className="p-4 border-b bg-emerald-50/50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Completed Orders
              </h3>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                Completed
              </span>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {completedOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{order.orderNumber}</span>
                      <span className="text-xs text-muted-foreground">{order.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{order.items.join(" • ")}</p>
                    <p className="text-xs text-muted-foreground mt-1">Customer: {order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">₹{order.total}</p>
                    <button
                      onClick={() => reopenOrder(order)}
                      className="mt-2 px-3 py-1 bg-amber-500 text-white rounded-lg text-xs hover:bg-amber-600 transition-colors flex items-center gap-1"
                    >
                      <RefreshCw className="h-3 w-3" /> Reopen
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {completedOrders.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No completed orders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}