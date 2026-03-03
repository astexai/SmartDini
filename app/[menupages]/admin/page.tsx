"use client";

import { useState, useEffect, useRef } from "react";
import { ClipboardList, Clock, CheckCircle, ChevronDown, Calendar } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data for different time periods
const generateData = (period: string, customDate?: Date) => {
  // This is sample data - in a real app, you'd fetch based on the date range
  const baseData = [
    { name: "Item 1", orders: 18 },
    { name: "Item 2", orders: 25 },
    { name: "Item 3", orders: 22 },
    { name: "Item 4", orders: 34 },
    { name: "Item 5", orders: 36 },
  ];

  // Modify data based on period to simulate different views
  if (period === "7d") {
    return baseData.map(item => ({ ...item, orders: Math.floor(item.orders * 2.5) }));
  } else if (period === "30d") {
    return baseData.map(item => ({ ...item, orders: Math.floor(item.orders * 5) }));
  } else if (period === "yesterday") {
    return baseData.map(item => ({ ...item, orders: Math.floor(item.orders * 0.8) }));
  } else if (period === "custom" && customDate) {
    return baseData.map(item => ({ ...item, orders: Math.floor(item.orders * 1.2) }));
  }
  return baseData; // today
};

// Metrics data generator based on period
const generateMetrics = (period: string) => {
  const baseMetrics = {
    total: 50,
    pending: 20,
    completed: 30,
  };

  if (period === "7d") {
    return {
      total: 350,
      pending: 140,
      completed: 210,
    };
  } else if (period === "30d") {
    return {
      total: 1500,
      pending: 600,
      completed: 900,
    };
  } else if (period === "yesterday") {
    return {
      total: 42,
      pending: 15,
      completed: 27,
    };
  } else if (period === "custom") {
    return {
      total: 75,
      pending: 30,
      completed: 45,
    };
  }
  return baseMetrics; // today
};

const metricsConfig = [
  {
    label: "Total Orders",
    icon: ClipboardList,
    bgIcon: "bg-red-100",
    colorIcon: "text-red-600",
    key: "total",
  },
  {
    label: "Pending Orders",
    icon: Clock,
    bgIcon: "bg-red-100",
    colorIcon: "text-red-600",
    key: "pending",
  },
  {
    label: "Completed Orders",
    icon: CheckCircle,
    bgIcon: "bg-red-100",
    colorIcon: "text-red-600",
    key: "completed",
  },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState("today");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [chartData, setChartData] = useState(generateData("today"));
  const [metrics, setMetrics] = useState(generateMetrics("today"));
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update data when period or date changes
  useEffect(() => {
    setChartData(generateData(period, period === "custom" ? selectedDate : undefined));
    setMetrics(generateMetrics(period));
  }, [period, selectedDate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePeriodSelect = (value: string) => {
    setPeriod(value);
    setShowDropdown(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setSelectedDate(new Date(e.target.value));
      setPeriod("custom");
    }
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getPeriodDisplay = () => {
    if (period === "today") return "Today";
    if (period === "yesterday") return "Yesterday";
    if (period === "7d") return "Last 7 Days";
    if (period === "30d") return "Last 30 Days";
    if (period === "custom") {
      return selectedDate ? formatDate(selectedDate) : "Custom Range";
    }
    return "Today";
  };

  // Get metrics values
  const metricsValues = metricsConfig.map(config => ({
    ...config,
    value: metrics[config.key as keyof typeof metrics]
  }));

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 border border-gray-100 h-full">
      
      {/* ─── Dashboard Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          Dashboard Overview
        </h2>
        
        {/* Date Filter Section */}
        <div className="flex items-center gap-2">
          {/* Simple Date Input - Direct picker */}
          <div className="relative">
            <input
              type="date"
              value={formatDate(selectedDate)}
              onChange={handleDateChange}
              className="pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm font-bold focus:outline-none focus:border-[#D92632] focus:ring-1 focus:ring-[#D92632]"
              max={formatDate(new Date())}
            />
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
          </div>

          {/* Period Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-[#FFEFEF] text-[#D92632] px-5 py-2 rounded-lg text-sm font-bold border border-[#FECACA] hover:bg-[#FEE2E2] transition-colors min-w-[140px] justify-between"
            >
              <span>{getPeriodDisplay()}</span>
              <ChevronDown size={16} strokeWidth={3} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white border rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
                {[
                  { value: "today", label: "Today" },
                  { value: "yesterday", label: "Yesterday" },
                  { value: "7d", label: "Last 7 Days" },
                  { value: "30d", label: "Last 30 Days" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handlePeriodSelect(option.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                      period === option.value ? 'bg-[#FFEFEF] text-[#D92632] font-medium' : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Metrics Cards ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metricsValues.map((item) => (
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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            Orders Overview
          </h3>
          <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">
            {getPeriodDisplay()}
          </span>
        </div>
        
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#E5E7EB" 
                strokeDasharray="0"
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