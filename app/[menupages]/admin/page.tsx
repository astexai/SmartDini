"use client";

import { useState } from "react";
import { ClipboardList, Clock, CheckCircle, ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const weeklyData = [
  { name: "Item 1", orders: 19 },
  { name: "Item 2", orders: 25 },
  { name: "Item 3", orders: 23 },
  { name: "Item 4", orders: 36 },
  { name: "Item 5", orders: 36 },
];

const metrics = [
  {
    label: "Total Orders",
    value: 50,
    icon: ClipboardList,
  },
  {
    label: "Pending Orders",
    value: 20,
    icon: Clock,
  },
  {
    label: "Completed Orders",
    value: 30,
    icon: CheckCircle,
  },
];

export default function DashboardPage() {
  const [period] = useState("Today");

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base sm:text-lg font-bold text-[hsl(0,0%,13%)]">
          Dashboard Overview
        </h2>
        <button className="flex items-center gap-1.5 bg-[hsl(355,72%,95%)] text-[hsl(355,72%,46%)] text-sm font-semibold px-4 py-1.5 rounded-full border border-[hsl(355,72%,78%)]">
          {period}
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="bg-[hsl(0,0%,96%)] rounded-2xl p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-[hsl(0,0%,50%)] mb-1 leading-tight">{label}</p>
              <p className="text-2xl sm:text-3xl font-bold text-[hsl(0,0%,10%)]">{value}</p>
            </div>
            <div className="w-11 h-11 rounded-full bg-[hsl(355,72%,93%)] flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-[hsl(355,72%,46%)]" />
            </div>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <div className="bg-[hsl(0,0%,96%)] rounded-2xl p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-bold text-[hsl(0,0%,13%)] mb-4">
          Weekly orders
        </h3>
        <ResponsiveContainer width="100%" height={230}>
          <LineChart
            data={weeklyData}
            margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(0,0%,87%)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "hsl(0,0%,55%)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 40]}
              ticks={[0, 10, 20, 30, 40]}
              tick={{ fontSize: 11, fill: "hsl(0,0%,55%)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                fontSize: "12px",
                padding: "8px 12px",
              }}
              cursor={{ stroke: "hsl(355,72%,80%)", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="hsl(355,72%,46%)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: "hsl(355,72%,46%)", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
