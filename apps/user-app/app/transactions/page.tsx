import Sidebar from "@repo/ui/Sidebar";
import { getServerSession } from "next-auth";
import { Auth } from "../api/lib/auth";
import { prisma } from "@repo/db";
import { redirect } from "next/navigation";

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

  // Normalize date field for sorting
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
      <div className="h-screen text-black border-r bg-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col mt-6 mx-8">
        <h1 className="text-blue-600 font-extrabold text-4xl px-2">
          Transactions
        </h1>

        <div className="mt-6 space-y-4">
          {allTransactions.length === 0 ? (
            <p className="text-gray-500">No transactions yet.</p>
          ) : (
            allTransactions.map((t) => (
              <div
                key={t.id}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <p>
                  <span className="font-semibold">Type:</span> {t.type}
                </p>
                <p>
                  <span className="font-semibold">Amount:</span> {t.amount}
                </p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {t.date.toLocaleString()}
                </p>

                {t.type === "onramp" && (
                  <>
                    <p>
                      <span className="font-semibold">Provider:</span>{" "}
                      {t.provider}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span> {t.status}
                    </p>
                  </>
                )}

                {t.type.startsWith("p2p") && (
                  <>
                    <p>
                      <span className="font-semibold">From:</span>{" "}
                      {
                        //@ts-ignore
                        t.fromUserId
                      }
                    </p>
                    <p>
                      <span className="font-semibold">To:</span>{" "}
                      {
                        //@ts-ignore
                        t.toUserId
                      }
                    </p>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
