"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// expects data like: [{ date: "Sep 1", balance: 500 }, ...]
export default function BalanceChart({
  data,
}: {
  data: { date: string; balance: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="date" stroke="#374151" />
        <YAxis stroke="#374151" />
        <Tooltip />
        <Line
          type="natural"
          dataKey="balance"
          stroke="#4f46e5"
          strokeWidth={3}
          dot={{ r: 5, fill: "#4f46e5" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
