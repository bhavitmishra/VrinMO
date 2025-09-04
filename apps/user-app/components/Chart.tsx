"use client";
import Sidebar from "@repo/ui/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
const data = [
  { date: "Aug 1", balance: 500 },
  { date: "Aug 5", balance: 750 },
  { date: "Aug 10", balance: 300 },
  { date: "Aug 15", balance: 1200 },
  { date: "Aug 20", balance: 900 },
  { date: "Aug 25", balance: 1500 },
];

export default function TransactionsPage() {
  const { data: session, status } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar full height */}
      <div className="h-screen  text-black">
        <Sidebar onToggle={setCollapsed} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-screen bg-gray-50">
        {/* Top bar */}
        <header className="h-16 border-b border-gray-200 flex items-center px-6 bg-white shadow-sm">
          <h1 className="text-xl font-semibold">
            {status === "loading"
              ? "Loading..."
              : //@ts-ignore
                `Hello, ${session?.user?.number ?? "stranger"}`}
          </h1>
        </header>

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-2xl shadow-md p-4 h-[400px]">
            <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#4f46e5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}
