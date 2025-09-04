"use client";
import AppBar from "@repo/ui/Appbar";
import Sidebar from "@repo/ui/Sidebar";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  CreditCard,
  Landmark,
} from "lucide-react";
import { useState } from "react";

export default function TransferPage() {
  const methods = [
    { name: "UPI Options", icon: Landmark },
    { name: "Credit/Debit/ATM Card", icon: CreditCard },
  ];
  const [active, setActive] = useState("Credit/Debit/ATM Card");
  const [activeTab, setActiveTab] = useState("deposit");
  const [amt, setAmt] = useState(0);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="h-screen text-black border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col mt-6 mx-8">
        {/* Page Header */}
        <h1 className="text-blue-600 font-extrabold text-4xl px-2">
          Transaction
        </h1>

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
            <ArrowDownToLine className="w-5 h-5" /> Recent Payments
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
            <ArrowUpFromLine className="w-5 h-5" /> Scheduled Payments
          </button>
        </div>

        {/* Payment Section */}
        <div className="flex flex-1 mt-8 bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Payment Methods Sidebar */}

          {/* Payment Form */}
          <div className="flex-1 p-8 bg-white">
            <ul>
              <li>Starbucks --------{">"} $1500 </li>
              <li>Krozzon --------{">"} $1500</li>
              <li>Bake n Shake --------{">"} $1500</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
