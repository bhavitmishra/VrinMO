import Sidebar from "@repo/ui/Sidebar";
import { getServerSession } from "next-auth";
import { Auth } from "../api/lib/auth";
import { prisma } from "@repo/db";
import { redirect } from "next/navigation";
import { ArrowDownRight, ArrowUpRight, Wallet, Calendar } from "lucide-react";

// Updated: Showing raw integer values as requested
function formatAmount(type: string, amount: number) {
  if (type === "p2p-sent") return `- ₹${amount}`;
  return `+ ₹${amount}`;
}

export default async function TransactionPage() {
  const session = await getServerSession(Auth);
  if (!session?.user?.id) {
    redirect("/signin");
  }

  const userId = Number(session.user.id);
  if (isNaN(userId)) {
    return <div className="vr-shell"><p className="vr-note">Invalid user session.</p></div>;
  }

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

  const allTransactions = [
    ...onramps.map((t) => ({ type: "Deposit", date: t.startTime, amount: t.amount, id: `on-${t.id}`, rawType: "onramp" })),
    ...p2pFrom.map((t) => ({ type: "Sent", date: t.timestamp, amount: t.amount, id: `p2ps-${t.id}`, rawType: "p2p-sent" })),
    ...p2pTo.map((t) => ({ type: "Received", date: t.timestamp, amount: t.amount, id: `p2pr-${t.id}`, rawType: "p2p-received" })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream:  #fdfcfa;
          --ink:    #111;
          --muted:  #777;
          --faint:  #f4f1eb;
          --border: rgba(0,0,0,0.07);
          --amber:  #d4a843;
          --green:  #16a34a;
          --red:    #dc2626;
        }

        .vr-shell {
          display: flex;
          min-height: 100vh;
          background: var(--cream);
          font-family: 'DM Sans', sans-serif;
        }

        .vr-sidebar-wrap {
          height: 100vh;
          position: sticky;
          top: 0;
          background: #fff;
          border-right: 1px solid var(--border);
          flex-shrink: 0;
        }

        .vr-main {
          flex: 1;
          padding: 3.5rem 4rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .vr-header { margin-bottom: 3rem; }
        .vr-eyebrow { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); margin-bottom: 0.5rem; }
        .vr-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--ink); letter-spacing: -0.02em; }

        .vr-list { list-style: none; padding: 0; }
        .vr-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 1.25rem;
          margin-bottom: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .vr-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.04);
          border-color: rgba(212,168,67,0.2);
        }

        .vr-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--faint);
          margin-right: 1.25rem;
        }
        
        .vr-details { flex: 1; }
        .vr-type-label { font-size: 1rem; font-weight: 500; color: var(--ink); margin-bottom: 0.15rem; }
        .vr-date-label { font-size: 0.8rem; color: var(--muted); display: flex; align-items: center; gap: 0.4rem; }

        .vr-amount { font-size: 1.15rem; font-weight: 600; }
        .vr-amount.positive { color: var(--green); }
        .vr-amount.negative { color: var(--red); }
        .vr-amount.neutral { color: var(--ink); }

        .vr-empty {
          text-align: center;
          padding: 4rem 2rem;
          background: #fff;
          border-radius: 1.5rem;
          border: 1px dashed var(--border);
          color: var(--muted);
        }
      `}</style>

      <div className="vr-shell">
        <div className="vr-sidebar-wrap">
          <Sidebar />
        </div>

        <main className="vr-main">
          <header className="vr-header">
            <p className="vr-eyebrow">Financial History</p>
            <h1 className="vr-title">Recent Activity</h1>
          </header>

          {allTransactions.length === 0 ? (
            <div className="vr-empty">
              <p>No transactions found.</p>
            </div>
          ) : (
            <ul className="vr-list">
              {allTransactions.map((t) => (
                <li key={t.id} className="vr-item">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="vr-icon-box">
                      {t.rawType === "onramp" && <Wallet size={20} style={{color: 'var(--amber)'}} />}
                      {t.rawType === "p2p-sent" && <ArrowUpRight size={20} style={{color: 'var(--red)'}} />}
                      {t.rawType === "p2p-received" && <ArrowDownRight size={20} style={{color: 'var(--green)'}} />}
                    </div>
                    <div className="vr-details">
                      <p className="vr-type-label">{t.type}</p>
                      <p className="vr-date-label">
                        <Calendar size={12} />
                        {t.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>

                  <div className={`vr-amount ${
                    t.rawType === "p2p-sent" ? "negative" : 
                    t.rawType === "p2p-received" ? "positive" : "neutral"
                  }`}>
                    {formatAmount(t.rawType, t.amount)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}