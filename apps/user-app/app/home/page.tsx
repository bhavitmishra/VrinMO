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
    day.setHours(0, 0, 0, 0);

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
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        `}</style>
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fdfcfa", fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{
            background: "#fff5f5", border: "1px solid rgba(220,38,38,0.12)",
            borderRadius: "1.25rem", padding: "2rem 2.5rem", textAlign: "center",
          }}>
            <p style={{ color: "#dc2626", fontSize: "0.95rem" }}>You're not logged in.</p>
          </div>
        </div>
      </>
    );
  }

  const userId = Number(session.user.id);

  try {
    const [balance, transactions] = await Promise.all([
      prisma.balance.findUnique({ where: { userId } }),
      prisma.p2pTransfer.findMany({
        where: { OR: [{ fromUserId: userId }, { toUserId: userId }] },
        orderBy: { timestamp: "desc" },
        take: 50,
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
    const maxTrendValue = Math.max(...weeklyTrend.map(Math.abs), 1);

    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

          * { box-sizing: border-box; margin: 0; padding: 0; }

          :root {
            --cream:  #fdfcfa;
            --ink:    #111;
            --muted:  #777;
            --faint:  #f4f1eb;
            --border: rgba(0,0,0,0.07);
            --amber:  #d4a843;
            --amber-light: rgba(212,168,67,0.1);
            --green:  #16a34a;
            --red:    #dc2626;
            --radius: 1.5rem;
          }

          body { background: var(--cream); }

          .vr-shell {
            display: flex;
            min-height: 100vh;
            background: var(--cream);
            font-family: 'DM Sans', sans-serif;
          }

          /* sidebar wrapper */
          .vr-sidebar-wrap {
            height: 100vh;
            position: sticky;
            top: 0;
            background: #fff;
            border-right: 1px solid var(--border);
            flex-shrink: 0;
          }

          /* main scroll area */
          .vr-main {
            flex: 1;
            overflow-y: auto;
            padding: 2.5rem 2.25rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            max-width: 960px;
          }

          /* page title */
          .vr-page-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--ink);
            letter-spacing: -0.025em;
            line-height: 1;
            margin-bottom: 0.25rem;
          }
          .vr-page-sub {
            font-size: 0.875rem;
            color: var(--muted);
          }

          /* card base */
          .vr-card {
            background: #fff;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 1.75rem;
          }

          /* balance card */
          .vr-balance-card {
            background: var(--ink);
            border: none;
            border-radius: var(--radius);
            padding: 2rem 2rem 1.75rem;
            position: relative;
            overflow: hidden;
          }
          .vr-balance-card::before {
            content: '';
            position: absolute;
            top: -40%;
            right: -10%;
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 65%);
            pointer-events: none;
          }
          .vr-balance-label {
            font-size: 0.72rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(253,252,250,0.45);
            margin-bottom: 0.6rem;
          }
          .vr-balance-amount {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.25rem, 4vw, 3rem);
            font-weight: 900;
            color: #fdfcfa;
            letter-spacing: -0.03em;
            line-height: 1;
          }
          .vr-balance-amount span {
            font-size: 0.55em;
            opacity: 0.5;
            margin-right: 0.2em;
            font-weight: 400;
          }
          .vr-balance-meta {
            margin-top: 1.5rem;
            display: flex;
            gap: 1.5rem;
          }
          .vr-balance-meta-item {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
          }
          .vr-balance-meta-label {
            font-size: 0.7rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: rgba(253,252,250,0.35);
          }
          .vr-balance-meta-value {
            font-size: 0.925rem;
            font-weight: 500;
            color: rgba(253,252,250,0.75);
          }

          /* quick actions */
          .vr-actions-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.875rem;
          }
          @media (max-width: 600px) { .vr-actions-grid { grid-template-columns: 1fr; } }

          .vr-action-link {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 1rem;
            border-radius: 1rem;
            font-size: 0.875rem;
            font-weight: 500;
            font-family: 'DM Sans', sans-serif;
            text-decoration: none;
            transition: opacity 0.2s, transform 0.15s;
            letter-spacing: 0.01em;
          }
          .vr-action-link:hover { opacity: 0.85; transform: translateY(-1px); }

          .vr-action-send {
            background: var(--ink);
            color: #fdfcfa;
            border: 1.5px solid var(--ink);
          }
          .vr-action-add {
            background: var(--amber-light);
            color: #9a7520;
            border: 1.5px solid rgba(212,168,67,0.25);
          }
          .vr-action-history {
            background: var(--faint);
            color: var(--ink);
            border: 1.5px solid var(--border);
          }

          /* section header */
          .vr-section-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 1.25rem;
          }
          .vr-section-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--ink);
            letter-spacing: -0.015em;
          }
          .vr-section-link {
            font-size: 0.8rem;
            color: var(--amber);
            text-decoration: none;
            font-weight: 500;
            transition: opacity 0.2s;
          }
          .vr-section-link:hover { opacity: 0.7; }

          /* trend chart */
          .vr-trend-bars {
            display: flex;
            align-items: flex-end;
            gap: 0.5rem;
            height: 80px;
          }
          .vr-trend-col {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.4rem;
            height: 100%;
            justify-content: flex-end;
          }
          .vr-trend-bar {
            width: 100%;
            border-radius: 4px 4px 0 0;
            min-height: 4px;
            transition: height 0.4s ease;
          }
          .vr-trend-label {
            font-size: 0.65rem;
            color: var(--muted);
            letter-spacing: 0.04em;
            white-space: nowrap;
          }

          /* stats grid */
          .vr-stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }
          @media (max-width: 600px) { .vr-stats-grid { grid-template-columns: 1fr; } }

          .vr-stat-tile {
            background: var(--faint);
            border: 1px solid var(--border);
            border-radius: 1.125rem;
            padding: 1.25rem 1rem;
            text-align: center;
          }
          .vr-stat-label {
            font-size: 0.72rem;
            font-weight: 500;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--muted);
            margin-bottom: 0.5rem;
          }
          .vr-stat-value {
            font-family: 'Playfair Display', serif;
            font-size: 1.35rem;
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1;
          }

          /* tx list */
          .vr-tx-list { display: flex; flex-direction: column; gap: 0.625rem; }

          .vr-tx-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.25rem;
            background: var(--faint);
            border: 1px solid var(--border);
            border-radius: 1rem;
            transition: border-color 0.2s;
          }
          .vr-tx-item:hover { border-color: rgba(212,168,67,0.3); }

          .vr-tx-icon {
            width: 36px; height: 36px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            margin-right: 0.875rem;
            font-size: 0.875rem;
          }
          .vr-tx-icon-sent { background: rgba(220,38,38,0.08); color: var(--red); }
          .vr-tx-icon-recv { background: rgba(22,163,74,0.08); color: var(--green); }

          .vr-tx-left { display: flex; align-items: center; }
          .vr-tx-type {
            font-size: 0.875rem;
            font-weight: 500;
            color: var(--ink);
          }
          .vr-tx-date {
            font-size: 0.75rem;
            color: var(--muted);
            margin-top: 0.15rem;
          }
          .vr-tx-amount {
            font-family: 'Playfair Display', serif;
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: -0.01em;
          }

          .vr-empty {
            text-align: center;
            padding: 2.5rem 1rem;
            font-size: 0.875rem;
            color: var(--muted);
          }
        `}</style>

        <div className="vr-shell">
          {/* Sidebar */}
          <div className="vr-sidebar-wrap">
            <Sidebar />
          </div>

          {/* Main */}
          <div className="vr-main">

            {/* Page header */}
            <div>
              <h1 className="vr-page-title">Dashboard</h1>
              <p className="vr-page-sub">Welcome back — here's your overview</p>
            </div>

            {/* Balance card */}
            <div className="vr-balance-card">
              <p className="vr-balance-label">Wallet Balance</p>
              <p className="vr-balance-amount">
                <span>₹</span>
                {balanceAmount.toLocaleString("en-IN")}
              </p>
              <div className="vr-balance-meta">
                <div className="vr-balance-meta-item">
                  <span className="vr-balance-meta-label">Total Sent</span>
                  <span className="vr-balance-meta-value">₹{totalSent.toLocaleString("en-IN")}</span>
                </div>
                <div className="vr-balance-meta-item">
                  <span className="vr-balance-meta-label">Total Received</span>
                  <span className="vr-balance-meta-value">₹{totalReceived.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="vr-actions-grid">
              <Link href="/p2p" className="vr-action-link vr-action-send">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send Money
              </Link>
              <Link href="/transfer" className="vr-action-link vr-action-add">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                Add Money
              </Link>
              <Link href="/transactions" className="vr-action-link vr-action-history">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                Transactions
              </Link>
            </div>

            {/* Weekly trend */}
            <div className="vr-card">
              <div className="vr-section-header">
                <h2 className="vr-section-title">7-Day Activity</h2>
              </div>
              <div className="vr-trend-bars">
                {weeklyTrend.map((amt, idx) => {
                  const isPositive = amt >= 0;
                  const height = Math.max((Math.abs(amt) / maxTrendValue) * 72, 4);
                  return (
                    <div key={idx} className="vr-trend-col">
                      <div
                        className="vr-trend-bar"
                        style={{
                          height: `${height}px`,
                          background: isPositive
                            ? "rgba(22,163,74,0.55)"
                            : "rgba(220,38,38,0.45)",
                        }}
                        title={`₹ ${amt.toLocaleString("en-IN")}`}
                      />
                      <span className="vr-trend-label">
                        {["6d","5d","4d","3d","2d","1d","Today"][idx]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="vr-stats-grid">
              <div className="vr-stat-tile">
                <p className="vr-stat-label">Total Sent</p>
                <p className="vr-stat-value" style={{ color: "var(--red)" }}>
                  ₹{totalSent.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="vr-stat-tile">
                <p className="vr-stat-label">Total Received</p>
                <p className="vr-stat-value" style={{ color: "var(--green)" }}>
                  ₹{totalReceived.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="vr-stat-tile">
                <p className="vr-stat-label">Last Transaction</p>
                {lastTransaction ? (
                  <>
                    <p className="vr-stat-value" style={{
                      color: lastTransaction.fromUserId === userId ? "var(--red)" : "var(--green)",
                    }}>
                      {lastTransaction.fromUserId === userId ? "−" : "+"}₹{lastTransaction.amount.toLocaleString("en-IN")}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.3rem" }}>
                      {lastTransaction.timestamp.toLocaleDateString("en-IN")}
                    </p>
                  </>
                ) : (
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", marginTop: "0.4rem" }}>None yet</p>
                )}
              </div>
            </div>

            {/* Recent transactions */}
            <div className="vr-card">
              <div className="vr-section-header">
                <h2 className="vr-section-title">Recent Transactions</h2>
                <Link href="/transactions" className="vr-section-link">View all →</Link>
              </div>

              {recentTransactions.length === 0 ? (
                <div className="vr-empty">No transactions yet.</div>
              ) : (
                <ul className="vr-tx-list">
                  {recentTransactions.map((t) => {
                    const isSent = t.fromUserId === userId;
                    return (
                      <li key={t.id} className="vr-tx-item">
                        <div className="vr-tx-left">
                          <div className={`vr-tx-icon ${isSent ? "vr-tx-icon-sent" : "vr-tx-icon-recv"}`}>
                            {isSent ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="17" y1="7" x2="7" y2="17" /><polyline points="17 17 7 17 7 7" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="vr-tx-type">{isSent ? "Sent" : "Received"}</p>
                            <p className="vr-tx-date">
                              {t.timestamp.toLocaleDateString("en-IN")} · {t.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                        <span className="vr-tx-amount" style={{ color: isSent ? "var(--red)" : "var(--green)" }}>
                          {isSent ? "−" : "+"}₹{t.amount.toLocaleString("en-IN")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');`}</style>
        <div style={{
          minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
          background: "#fdfcfa", fontFamily: "'DM Sans', sans-serif",
        }}>
          <div style={{
            background: "#fff", border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: "1.5rem", padding: "2.5rem 3rem", textAlign: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}>
            <p style={{ fontSize: "1rem", fontWeight: 500, color: "#dc2626", marginBottom: "0.5rem" }}>Error loading dashboard</p>
            <p style={{ fontSize: "0.875rem", color: "#888" }}>Please try refreshing the page.</p>
          </div>
        </div>
      </>
    );
  }
}