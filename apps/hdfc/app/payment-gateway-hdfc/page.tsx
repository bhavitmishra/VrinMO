"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import axios from "axios";

interface TransactionData {
  token: string;
  amount: number;
  userId: string;
}

function TransactionContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const [data, setData] = useState<TransactionData | null>(null);
  const [error, setError] = useState(false);

  const handlePay = async () => {
    if (!data) return;
    await axios.post("http://localhost:6969/hdfcWebhook", {
      token: data.token,
      amount: data.amount,
      userId: data.userId,
    });
    window.location.href = "http://localhost:3000/home";
  };

  useEffect(() => {
    if (!search) return;

    axios
      .get("http://localhost:3000/api/lib/actions/createOnRampTransactions", {
        params: { id: search },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setError(true);
      });
  }, [search]);

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-600 text-lg">
        Transaction already done.
      </div>
    );

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-lg">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm py-6">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Gateway
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Confirm Your Payment
          </h2>

          <div className="space-y-4 text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Amount:</span>
              <span className="text-lg font-semibold text-green-600">
                ₹{data.amount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">User ID:</span>
              <span>{data.userId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Token:</span>
              <span className="truncate max-w-[150px]">{data.token}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition"
          >
            Pay Now
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-4">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          © Demo Bank Portal – All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default function TransactionPage() {
  return (
    <Suspense fallback={<div>Loading search params...</div>}>
      <TransactionContent />
    </Suspense>
  );
}
