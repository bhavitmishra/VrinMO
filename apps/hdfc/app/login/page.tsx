"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function BankLogin() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="py-6 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome to Demo Bank Portal
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white shadow rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Login to NetBanking
          </h2>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-black mb-1">
                Customer ID / User ID
              </label>
              <input
                type="text"
                placeholder="Enter your ID"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm text-black mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <button
              onClick={() => router.push(`/payment-gateway-hdfc?id=${id}`)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition"
            >
              Continue
            </button>
          </div>

          {/* Info box */}
          <div className="mt-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
            <strong>Dear Customer,</strong>
            <p className="mt-2">
              Welcome to the demo login page. Please continue to login using
              your customer ID and password.
            </p>
          </div>

          {/* Links */}
          <div className="mt-6 text-sm text-blue-600 space-y-2 text-center">
            <a className="hover:underline cursor-pointer">
              Credit Card only? Login here
            </a>
            <br />
            <a className="hover:underline cursor-pointer">
              Prepaid Card only? Login here
            </a>
            <br />
            <a className="hover:underline cursor-pointer">
              Retail Loan only? Login here
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-4">
        <div className="max-w-4xl mx-auto px-6 flex justify-between text-sm">
          <div>© Demo Bank Portal</div>
          <div className="space-x-4">
            <a className="hover:underline cursor-pointer">
              Terms and Conditions
            </a>
            <a className="hover:underline cursor-pointer">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
