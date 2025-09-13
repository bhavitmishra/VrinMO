"use client";
import { useState } from "react";
import Sidebar from "@repo/ui/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SendCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !amount || Number(amount) <= 0) {
      setStatus({
        type: "error",
        message: "Please enter a valid phone and amount.",
      });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      await axios.post("/api/p2ptransfers", {
        to: phone,
        amount: Number(amount),
      });

      setStatus({ type: "success", message: "Transfer successful!" });
      setPhone("");
      setAmount("");

      // 🔄 Refresh data on Home (so chart updates instantly)
      router.refresh();
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.response?.data?.error || "Transfer failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="h-screen text-black border-r bg-white">
        <Sidebar />
      </div>

      {/* Main form */}
      <div className="flex-1 flex items-start justify-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-md p-6 bg-white rounded-2xl shadow-md"
        >
          <h1 className="text-2xl font-bold text-blue-600">Send Money</h1>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter recipient phone"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-gray-700">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Send"}
          </button>

          {status && (
            <p
              className={`text-sm font-medium ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
