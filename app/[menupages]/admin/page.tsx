
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
  { name: "Item 1", orders: 18 },
  { name: "Item 2", orders: 25 },
  { name: "Item 3", orders: 22 },
  { name: "Item 4", orders: 34 },
  { name: "Item 5", orders: 36 },
];

const metrics = [
  {
    label: "Total Orders",
    value: 50,
    icon: ClipboardList,
    bgIcon: "bg-red-100", // Light pink circle
    colorIcon: "text-red-600",
  },
  {
    label: "Pending Orders",
    value: 20,
    icon: Clock,
    bgIcon: "bg-red-100",
    colorIcon: "text-red-600",
  },
  {
    label: "Completed Orders",
    value: 30,
    icon: CheckCircle,
    bgIcon: "bg-red-100",
    colorIcon: "text-red-600",
  },
];

export default function DashboardPage() {
  const [period] = useState("Today");

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 h-full">
      
      {/* ─── Dashboard Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          Dashboard Overview
        </h2>
        
        {/* Date Filter Button - Matches the Image style */}
        <button className="flex items-center gap-2 bg-[#FFEFEF] text-[#D92632] px-5 py-2 rounded-lg text-sm font-bold border border-[#FECACA] hover:bg-[#FEE2E2] transition-colors">
          {period}
          <ChevronDown size={16} strokeWidth={3} />
        </button>
      </div>

      {/* ─── Metrics Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((item) => (
          <div
            key={item.label}
            className="bg-[#F3F4F6] rounded-2xl p-5 flex items-center justify-between"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-600">
                {item.label}
              </span>
              <span className="text-3xl font-extrabold text-gray-900">
                {item.value}
              </span>
            </div>
            
            {/* Icon in Circle */}
            <div className={`w-12 h-12 rounded-full ${item.bgIcon} flex items-center justify-center`}>
              <item.icon className={item.colorIcon} size={22} strokeWidth={2.5} />
            </div>
          </div>
        ))}
      </div>

      {/* ─── Weekly Orders Chart ─── */}
      <div className="bg-[#F3F4F6] rounded-2xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Weekly orders
        </h3>
        
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={weeklyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#E5E7EB" 
                strokeDasharray="0" /* Solid lines matching simple designs */
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12, dy: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                ticks={[0, 10, 20, 30, 40]}
                domain={[0, 40]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#D92632", fontWeight: "bold" }}
                cursor={{ stroke: "#D92632", strokeWidth: 1, strokeDasharray: "4 4" }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#D92632"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#D92632", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}