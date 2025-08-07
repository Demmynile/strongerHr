"use client";

import { useState } from "react";
import { MousePointer, TrendingUp, Menu } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

export default function Dashboard() {
  const [filter, setFilter] = useState("Monthly");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

        <div className="flex items-center justify-between w-full md:w-auto">
          <div
            className={`flex gap-2 transition-all duration-200 ${
              showFilters ? "flex" : "hidden"
            } md:flex`}
          >
            {["Weekly", "Monthly"].map((label) => (
              <button
                key={label}
                onClick={() => setFilter(label)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors duration-200 ${
                  filter === label
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 ml-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {["Revenue", "Users", "Sessions", "Orders"].map((title, i) => (
          <div
            key={title}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500 rounded-xl">
                <MousePointer className="w-6 h-6 text-white" />
              </div>
              <div className="text-blue-500">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-blue-600 mb-1">{title}</p>
              <p className="text-3xl font-bold text-blue-600">
                ${(i + 1) * 1234}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Monthly Performance (Bar)
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="uv" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Trend Line (Line Chart)
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#3b82f6"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="rounded-2xl bg-white p-6 shadow-md xl:col-span-2">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Area Chart Overview
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
