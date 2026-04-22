"use client";
import { useState } from "react";
import Sidebar from "@repo/ui/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  CreditCard, 
  Landmark, 
  Lock 
} from "lucide-react";

export default function Transfer() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");
  const [method, setMethod] = useState("NetBanking");
  const [amt, setAmt] = useState(0);
  const [loading, setLoading] = useState(false);

  const methods = [
    { name: "NetBanking", icon: CreditCard },
    { name: "UPI Options", icon: Landmark },
  ];

  const handlePay = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/lib/actions/createOnRampTransactions", { amt });
      const { onRampTransactionId } = res.data;
      window.location.href = `https://hdfc.bhavit.xyz/login?id=${onRampTransactionId}`;
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

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
          --radius: 1.5rem;
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

        .vr-container {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2.5rem;
          padding: 3.5rem 2.5rem;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .vr-page-header { margin-bottom: 2.5rem; }
        .vr-eyebrow { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.15em; color: var(--amber); margin-bottom: 0.5rem; font-weight: 600; }
        .vr-title { font-family: 'Playfair Display', serif; font-size: 2.5rem; color: var(--ink); }

        /* Tabs */
        .vr-tabs { display: flex; gap: 0.75rem; margin-bottom: 2rem; }
        .vr-tab {
          padding: 0.6rem 1.5rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border: 1px solid var(--border);
          background: #fff;
          color: var(--muted);
        }
        .vr-tab.active { background: var(--ink); color: #fff; border-color: var(--ink); }

        /* Main Card */
        .vr-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0,0,0,0.03);
          display: flex;
        }

        .vr-card-aside { width: 240px; background: var(--faint); border-right: 1px solid var(--border); padding: 1.5rem 1rem; }
        .vr-card-main { flex: 1; padding: 3rem; }

        .vr-method-btn {
          width: 100%;
          text-align: left;
          padding: 0.8rem 1rem;
          border-radius: 0.75rem;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--muted);
          transition: 0.2s;
        }
        .vr-method-btn.active { background: #fff; color: var(--ink); font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }

        .vr-input-group { margin-bottom: 1.5rem; }
        .vr-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--muted); margin-bottom: 0.5rem; display: block; font-weight: 600; }
        
        .vr-select, .vr-input {
          width: 100%;
          padding: 0.9rem 1.25rem;
          border-radius: 0.875rem;
          border: 1.5px solid var(--border);
          background: var(--faint);
          font-size: 0.95rem;
          outline: none;
          transition: 0.2s;
        }
        .vr-select:focus, .vr-input:focus { border-color: var(--amber); background: #fff; }

        .vr-btn-primary {
          background: var(--ink);
          color: #fff;
          width: 100%;
          padding: 1rem;
          border-radius: 999px;
          font-weight: 500;
          cursor: pointer;
          border: 1.5px solid var(--ink);
          transition: 0.2s;
          margin-top: 1rem;
        }
        .vr-btn-primary:hover { background: transparent; color: var(--ink); }

        /* Side Panel */
        .vr-side-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.75rem;
          margin-bottom: 1.5rem;
        }
        .vr-side-title { font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem; color: var(--ink); border-bottom: 1px solid var(--faint); padding-bottom: 0.75rem;}
        .vr-balance-item { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 0.6rem; color: var(--muted); }
        .vr-balance-val { color: var(--ink); font-weight: 500; }
        
        .vr-progress-bg { height: 6px; background: var(--faint); border-radius: 10px; margin: 1rem 0; overflow: hidden; }
        .vr-progress-fill { height: 100%; background: var(--amber); width: 15%; }
      `}</style>

      <div className="vr-shell">
        <div className="vr-sidebar-wrap">
          <Sidebar />
        </div>

        <main className="vr-container">
          {/* Left Column */}
          <section>
            <header className="vr-page-header">
              <p className="vr-eyebrow">Financial Services</p>
              <h1 className="vr-title">Transfer Funds</h1>
            </header>

            <div className="vr-tabs">
              <button 
                onClick={() => setActiveTab("deposit")}
                className={`vr-tab ${activeTab === "deposit" ? "active" : ""}`}
              >
                <ArrowDownToLine size={16} /> Deposit
              </button>
              <button 
                onClick={() => setActiveTab("withdraw")}
                className={`vr-tab ${activeTab === "withdraw" ? "active" : ""}`}
              >
                <ArrowUpFromLine size={16} /> Withdraw
              </button>
            </div>

            <div className="vr-card">
              <aside className="vr-card-aside">
                <p className="vr-label" style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>Method</p>
                {methods.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setMethod(m.name)}
                    className={`vr-method-btn ${method === m.name ? "active" : ""}`}
                  >
                    <m.icon size={18} /> {m.name}
                  </button>
                ))}
              </aside>

              <div className="vr-card-main">
                {activeTab === "deposit" ? (
                  <div style={{ maxWidth: '400px' }}>
                    <div className="vr-input-group">
                      <label className="vr-label">Select Institution</label>
                      <select className="vr-select">
                        <option>HDFC Bank</option>
                        <option>State Bank of India</option>
                        <option>ICICI Bank</option>
                        <option>Axis Bank</option>
                      </select>
                    </div>

                    <div className="vr-input-group">
                      <label className="vr-label">Amount (INR)</label>
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        className="vr-input" 
                        onChange={(e) => setAmt(Number(e.target.value))}
                      />
                    </div>

                    <button 
                      className="vr-btn-primary" 
                      onClick={handlePay}
                      disabled={loading}
                    >
                      {loading ? "Processing..." : "Initiate Deposit"}
                    </button>

                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', color: '#999' }}>
                      <Lock size={12} /> Secure encrypted transaction
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', color: 'var(--muted)', paddingTop: '2rem' }}>
                    Withdrawal interface is currently being optimized.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column */}
          <aside>
            <div className="vr-side-card" style={{ marginTop: '6.5rem' }}>
              <h2 className="vr-side-title">Portfolio Balance</h2>
              <div className="vr-balance-item">
                <span>Total balance</span>
                <span className="vr-balance-val">0.00 BTC</span>
              </div>
              <div className="vr-balance-item">
                <span>Staking</span>
                <span className="vr-balance-val">0.00 BTC</span>
              </div>
              <div className="vr-balance-item">
                <span>Available</span>
                <span className="vr-balance-val">0.00 BTC</span>
              </div>
            </div>

            <div className="vr-side-card">
              <h2 className="vr-side-title">Funding Limits</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                Daily limit: <span style={{ color: 'var(--ink)' }}>Unlimited</span>
              </p>
              <div className="vr-progress-bg">
                <div className="vr-progress-fill"></div>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#999' }}>You have used 15% of your verification tier limit.</p>
            </div>

            <button 
              className="vr-btn-primary" 
              style={{ background: 'transparent', color: 'var(--ink)' }}
              onClick={() => router.push("/transactions")}
            >
              View Transaction History
            </button>
          </aside>
        </main>
      </div>
    </>
  );
}