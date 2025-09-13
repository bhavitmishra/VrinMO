import { getServerSession } from "next-auth";
import { Auth } from "../api/lib/auth";
import { prisma } from "@repo/db";
import Link from "next/link";
import Sidebar from "@repo/ui/Sidebar";

function getWeeklyTrend(
  transactions: {
    timestamp: Date;
    amount: number;
    fromUserId: number;
    toUserId: number;
  }[],
  userId: number
) {
  const today = new Date();
  const trend: number[] = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    day.setHours(0, 0, 0, 0); // Reset time for accurate date comparison

    const dayTotal = transactions
      .filter((t) => {
        const transactionDate = new Date(t.timestamp);
        transactionDate.setHours(0, 0, 0, 0);
        return (
          transactionDate.getTime() === day.getTime() &&
          (t.fromUserId === userId || t.toUserId === userId)
        );
      })
      .reduce((sum, t) => {
        return sum + (t.fromUserId === userId ? -t.amount : t.amount);
      }, 0);

    trend.push(dayTotal);
  }

  return trend;
}

export default async function Home() {
  const session = await getServerSession(Auth);

  if (!session?.user?.id) {
    return <p className="p-6 text-red-500">Not logged in</p>;
  }

  const userId = Number(session.user.id);

  try {
    const [balance, transactions] = await Promise.all([
      prisma.balance.findUnique({ where: { userId } }),
      prisma.p2pTransfer.findMany({
        where: { OR: [{ fromUserId: userId }, { toUserId: userId }] },
        orderBy: { timestamp: "desc" },
        take: 50, // Limit to prevent performance issues
      }),
    ]);

    const balanceAmount = balance?.amount ?? 0;

    const totalSent = transactions
      .filter((t) => t.fromUserId === userId)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalReceived = transactions
      .filter((t) => t.toUserId === userId)
      .reduce((sum, t) => sum + t.amount, 0);

    const lastTransaction = transactions[0];
    const recentTransactions = transactions.slice(0, 3);

    const weeklyTrend = getWeeklyTrend(transactions, userId);

    // Calculate max value for trend chart scaling
    const maxTrendValue = Math.max(...weeklyTrend.map(Math.abs), 1);

    return (
      <div className="flex min-h-screen bg-gray-50">
        <div className="h-screen text-black border-r bg-white sticky top-0">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col p-8 space-y-8 overflow-y-auto">
          {/* Wallet Balance */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-gray-500 font-semibold">Wallet Balance</h2>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              ₹ {balanceAmount.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/p2p"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl shadow transition-colors duration-200"
            >
              Send Money
            </Link>
            <Link
              href="/transfer"
              className="bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-xl shadow transition-colors duration-200"
            >
              Add Money
            </Link>
            <Link
              href="/transactions"
              className="bg-gray-800 hover:bg-gray-900 text-white text-center py-4 rounded-xl shadow transition-colors duration-200"
            >
              View Transactions
            </Link>
          </div>

          {/* Weekly Trend Bars */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Last 7 Days Activity</h2>
            <div className="flex items-end justify-center h-32 space-x-3 px-4">
              {weeklyTrend.map((amt, idx) => {
                const isPositive = amt >= 0;
                const height = Math.max(
                  (Math.abs(amt) / maxTrendValue) * 80,
                  4
                ); // Scale to max 80px

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      className={`${
                        isPositive ? "bg-green-500" : "bg-red-500"
                      } rounded-t-md transition-all duration-300 min-h-[4px] w-8`}
                      style={{ height: `${height}px` }}
                      title={`₹ ${amt.toLocaleString("en-IN")}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center space-x-3 mt-3 text-xs text-gray-500">
              {["6d", "5d", "4d", "3d", "2d", "1d", "Today"].map(
                (label, idx) => (
                  <span key={idx} className="w-8 text-center">
                    {label}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Summary / Stats */}
          <div className="bg-white rounded-2xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <h3 className="text-gray-500 font-medium">Total Sent</h3>
              <p className="text-xl font-bold text-blue-600 mt-2">
                ₹ {totalSent.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <h3 className="text-gray-500 font-medium">Total Received</h3>
              <p className="text-xl font-bold text-green-600 mt-2">
                ₹ {totalReceived.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h3 className="text-gray-500 font-medium">Last Transaction</h3>
              {lastTransaction ? (
                <div className="mt-2">
                  <p
                    className={`text-lg font-semibold ${
                      lastTransaction.fromUserId === userId
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {lastTransaction.fromUserId === userId
                      ? "Sent"
                      : "Received"}{" "}
                    ₹{lastTransaction.amount.toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {lastTransaction.timestamp.toLocaleDateString("en-IN")}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 mt-2">No transactions yet</p>
              )}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <Link
                href="/transactions"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
            {recentTransactions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No transactions yet.
              </p>
            ) : (
              <ul className="space-y-3">
                {recentTransactions.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col">
                      <span
                        className={`font-medium ${
                          t.fromUserId === userId
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {t.fromUserId === userId ? "Sent" : "Received"} ₹
                        {t.amount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        {t.timestamp.toLocaleDateString("en-IN")} at{" "}
                        {t.timestamp.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="flex min-h-screen bg-gray-50 items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }
}
