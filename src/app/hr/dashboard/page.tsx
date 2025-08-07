"use client";

import {
  Users,
  Clock3,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { useState } from "react";
// import MapSection from "../components/Map";

const employeeLineData = [
  { name: "Jan", total: 20 },
  { name: "Feb", total: 25 },
  { name: "Mar", total: 30 },
  { name: "Apr", total: 22 },
  { name: "May", total: 28 },
  { name: "Jun", total: 35 },
  { name: "Jul", total: 40 },
  { name: "Aug", total: 38 },
  { name: "Sep", total: 42 },
  { name: "Oct", total: 45 },
  { name: "Nov", total: 50 },
  { name: "Dec", total: 60 },
];

const countryData = [
  { country: "USA", count: 25 },
  { country: "India", count: 15 },
  { country: "Germany", count: 10 },
  { country: "Brazil", count: 5 },
  { country: "Nigeria", count: 8 },
];

const employeeTableData = Array.from({ length: 50 }, (_, i) => ({
  firstName: `First${i + 1}`,
  lastName: `Last${i + 1}`,
  age: 20 + (i % 10),
  country: ["USA", "India", "Germany", "Brazil", "Nigeria"][i % 5],
  volunteer: i % 2 === 0,
  boardMember: i % 3 === 0,
}));

export default function DashboardHome() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const paginatedData = employeeTableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(employeeTableData.length / itemsPerPage);

  return (
    <main className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { title: "Total Employees", icon: <Users />, value: 120 },
          { title: "Pending", icon: <Clock3 />, value: 18 },
          { title: "Denied", icon: <XCircle />, value: 7 },
          { title: "Accepted", icon: <CheckCircle2 />, value: 95 },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white p-6 rounded-xl shadow-md border flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-700">
                {card.title}
              </h3>
              <div className="text-blue-600">{card.icon}</div>
            </div>
            <p className="text-3xl font-bold text-blue-700">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Total Employees Over the Year
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={employeeLineData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Employees by Country
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countryData}>
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Employee List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-2 text-left">First Name</th>
                <th className="p-2 text-left">Last Name</th>
                <th className="p-2 text-left">Age</th>
                <th className="p-2 text-left">Country</th>
                <th className="p-2 text-left">Volunteer</th>
                <th className="p-2 text-left">Board of Trustees</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((person, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{person.firstName}</td>
                  <td className="p-2">{person.lastName}</td>
                  <td className="p-2">{person.age}</td>
                  <td className="p-2">{person.country}</td>
                  <td className="p-2">{person.volunteer ? "Yes" : "No"}</td>
                  <td className="p-2">{person.boardMember ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md border text-sm font-medium ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      {/* <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Map: Countries of Origin
        </h2>
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
         <MapSection />
        </div>
      </div> */}
    </main>
  );
}
