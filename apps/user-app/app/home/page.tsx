import TransactionsPage from "../../components/Chart";
import { getServerSession } from "next-auth";
import { Auth } from "../api/lib/auth";
import { prisma } from "@repo/db";

export default async function Home() {
  const session = await getServerSession(Auth);

  if (!session?.user?.id) {
    return (
      <div className="p-6">
        <p className="text-red-500">Not logged in</p>
      </div>
    );
  }

  const balance = await prisma.balance.findUnique({
    where: {
      userId: parseInt(session.user.id),
    },
  });

  const balanceAmount = balance?.amount ?? 0; // fallback to 0 if null

  return (
    <div>
      <TransactionsPage />
      <div className="flex flex-col gap-10">Balance: {balanceAmount}</div>
    </div>
  );
}
