import Sidebar from "@repo/ui/Sidebar";
import { getServerSession } from "next-auth";
import { Auth } from "../api/lib/auth";
import { prisma } from "@repo/db";
import { redirect } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

function formatAmount(type: string, amount: number) {
  if (type === "p2p-sent") return `-₹${amount}`;
  return `+₹${amount}`;
}

function formatColor(type: string) {
  if (type === "p2p-sent") return "text-red-600";
  if (type === "p2p-received") return "text-green-600";
  return "text-blue-600";
}

export default async function TransactionPage() {
  const session = await getServerSession(Auth);
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const userId = Number(session.user.id);
  if (isNaN(userId)) {
    return <p className="text-red-500">Invalid user</p>;
  }

  // Run queries in parallel
  const [onramps, p2pFrom, p2pTo] = await Promise.all([
    prisma.onRampTransaction.findMany({
      where: { userId },
      orderBy: { startTime: "desc" },
    }),
    prisma.p2pTransfer.findMany({
      where: { fromUserId: userId },
      orderBy: { timestamp: "desc" },
    }),
    prisma.p2pTransfer.findMany({
      where: { toUserId: userId },
      orderBy: { timestamp: "desc" },
    }),
  ]);

  // Normalize
  const allTransactions = [
    ...onramps.map((t) => ({
      type: "onramp" as const,
      date: t.startTime,
      ...t,
    })),
    ...p2pFrom.map((t) => ({
      type: "p2p-sent" as const,
      date: t.timestamp,
      ...t,
    })),
    ...p2pTo.map((t) => ({
      type: "p2p-received" as const,
      date: t.timestamp,
      ...t,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="h-screen border-r bg-white">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col mt-6 mx-8">
        <h1 className="text-blue-600 font-extrabold text-4xl mb-6">
          Transactions
        </h1>

        {allTransactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet.</p>
        ) : (
          <ul className="space-y-4">
            {allTransactions.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white shadow hover:shadow-md transition-shadow"
              >
                {/* Left side */}
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-full bg-gray-100 ${
                      t.type === "onramp"
                        ? "text-blue-500"
                        : t.type === "p2p-sent"
                          ? "text-red-500"
                          : "text-green-600"
                    }`}
                  >
                    {t.type === "onramp" && <Wallet className="w-6 h-6" />}
                    {t.type === "p2p-sent" && (
                      <ArrowUpRight className="w-6 h-6" />
                    )}
                    {t.type === "p2p-received" && (
                      <ArrowDownRight className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold capitalize">{t.type}</p>
                    <p className="text-sm text-gray-500">
                      {t.date.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className={`font-semibold text-lg ${formatColor(t.type)}`}>
                  {formatAmount(t.type, t.amount)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
