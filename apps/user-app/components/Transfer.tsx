"use client";
import Sidebar from "@repo/ui/Sidebar";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CreditCard,
  Landmark,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function Transfer() {
  const router = useRouter();
  const methods = [
    { name: "UPI Options", icon: Landmark },
    { name: "NetBanking", icon: CreditCard },
  ];
  const [active, setActive] = useState("NetBanking");
  const [activeTab, setActiveTab] = useState("deposit");
  const [amt, setAmt] = useState(0);
  const handlePay = async () => {
    const res = await axios.post("/api/lib/actions/createOnRampTransactions", {
      amt,
    });
    const { onRampTransactionId } = res.data;
    window.location.href = `http://localhost:4444/login?id=${onRampTransactionId}`;
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="h-screen text-black border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col mt-6 mx-8">
        {/* Page Header */}
        <h1 className="text-blue-600 font-extrabold text-4xl px-2">Transfer</h1>

        {/* Deposit / Withdraw Toggle */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition shadow-sm 
            ${
              activeTab === "deposit"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ArrowDownToLine className="w-5 h-5" /> Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition shadow-sm 
            ${
              activeTab === "withdraw"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <ArrowUpFromLine className="w-5 h-5" /> Withdraw
          </button>
        </div>

        {/* Payment Section */}
        <div className="flex flex-1 mt-8 bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Payment Methods Sidebar */}
          {activeTab === "deposit" ? (
            <div className="flex flex-col-2">
              <div className="w-64  bg-blue-50">
                <ul className="space-y-2 p-4">
                  {methods.map((m) => (
                    <li key={m.name}>
                      <button
                        onClick={() => setActive(m.name)}
                        className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg font-medium transition 
                      ${
                        active === m.name
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                      >
                        <m.icon className="w-5 h-5" />
                        {m.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Form */}
              <div className="space-y-4 max-w-md">
                {/* Bank Selection */}
                <select
                  className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) =>
                    console.log("Selected Bank:", e.target.value)
                  }
                >
                  <option value="">Select your bank</option>
                  <option value="hdfc">HDFC</option>
                  <option value="sbi">SBI</option>
                  <option value="icici">ICICI</option>
                  <option value="axis">Axis</option>
                </select>

                {/* Amount + CTA */}
                <div className="flex items-center justify-between mt-6">
                  <input
                    type="number"
                    placeholder="Rs 2000"
                    className="flex-1 border rounded-xl p-3 mr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onChange={(e) => {
                      setAmt(Number(e.target.value));
                    }}
                  />
                  <button
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:scale-105 transition"
                    onClick={handlePay}
                  >
                    PAY NOW
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/3 bg-gray-50 py-40 space-y-6">
        {/* INR Balance */}
        <div className="bg-white shadow-sm rounded-xl p-5">
          <h2 className="font-semibold text-lg mb-2">INR Balance</h2>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>Total balance: 0 BTC</li>
            <li>Order balance: 0 BTC</li>
            <li>Staking balance: 0 BTC</li>
            <li>Available balance: 0 BTC</li>
          </ul>
        </div>

        {/* Funding limits */}
        <div className="bg-white shadow-sm rounded-xl p-5">
          <h2 className="font-semibold text-lg mb-2">Funding limits</h2>
          <p className="text-sm text-gray-500">
            Daily deposits: $0.00 of Unlimited USD
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
            <div className="bg-blue-500 h-2 w-1/6 rounded-full"></div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white shadow-sm rounded-xl p-5">
          <h2 className="font-semibold text-lg mb-2">Recent transactions</h2>
          <div></div>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-600 transition"
            onClick={() => router.push("/transactions")}
          >
            View all transactions
          </button>
        </div>
      </div>
    </div>
  );
}
