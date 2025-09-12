"use client";
import { useState } from "react";
import Sidebar from "@repo/ui/Sidebar";
import axios from "axios";

export default function SendCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("/api/p2ptransfers", { to: phone, amount: amount });
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="h-screen text-black border-r bg-white">
        <Sidebar />
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-2xl shadow-md"
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter Amount"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
