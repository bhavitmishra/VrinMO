"use client";
import { useState } from "react";
import Sidebar from "@repo/ui/Sidebar";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SendCard() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !amount || Number(amount) <= 0) {
      setStatus({ type: "error", message: "Please enter a valid phone and amount." });
      return;
    }

    try {
      setLoading(true);
      setStatus(null);
      await axios.post("/api/p2ptransfers", { to: phone, amount: Number(amount) });
      setStatus({ type: "success", message: "Transfer successful!" });
      setPhone("");
      setAmount("");
      router.refresh();
    } catch (error: any) {
      setStatus({
        type: "error",
        message: error.response?.data?.error || "Transfer failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --cream:  #fdfcfa;
          --ink:    #111;
          --muted:  #777;
          --faint:  #f4f1eb;
          --border: rgba(0,0,0,0.07);
          --amber:  #d4a843;
          --green:  #16a34a;
          --red:    #dc2626;
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
        .vr-main {
          flex: 1;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 3.5rem 2rem;
        }

        /* card */
        .vr-send-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2.5rem 2.25rem;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.05), 0 1px 8px rgba(0,0,0,0.04);
        }

        /* header */
        .vr-send-eyebrow {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 0.4rem;
        }
        .vr-send-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: -0.025em;
          line-height: 1.15;
          margin-bottom: 0.4rem;
        }
        .vr-send-sub {
          font-size: 0.875rem;
          color: var(--muted);
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        /* fields */
        .vr-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          margin-bottom: 1.1rem;
        }
        .vr-label {
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .vr-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .vr-input-icon {
          position: absolute;
          left: 1rem;
          color: #bbb;
          display: flex;
          align-items: center;
          pointer-events: none;
        }
        .vr-input {
          width: 100%;
          padding: 0.8rem 1rem 0.8rem 2.75rem;
          border-radius: 0.875rem;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: var(--faint);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.925rem;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .vr-input::placeholder { color: #bbb; }
        .vr-input:focus {
          border-color: var(--amber);
          box-shadow: 0 0 0 3px rgba(212,168,67,0.1);
          background: #fff;
        }

        /* amount prefix */
        .vr-amount-prefix {
          position: absolute;
          left: 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: #999;
          pointer-events: none;
        }
        .vr-input-amount {
          padding-left: 2rem;
        }

        /* submit */
        .vr-submit {
          width: 100%;
          margin-top: 0.5rem;
          padding: 0.875rem 1rem;
          border-radius: 999px;
          border: 1.5px solid var(--ink);
          background: var(--ink);
          color: var(--cream);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.925rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background 0.2s, color 0.2s, opacity 0.2s;
        }
        .vr-submit:hover:not(:disabled) {
          background: transparent;
          color: var(--ink);
        }
        .vr-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* spinner */
        @keyframes vr-spin { to { transform: rotate(360deg); } }
        .vr-spinner {
          width: 14px; height: 14px;
          border: 2px solid currentColor;
          border-top-color: transparent;
          border-radius: 50%;
          animation: vr-spin 0.7s linear infinite;
        }

        /* status */
        .vr-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1rem;
          padding: 0.7rem 1rem;
          border-radius: 0.875rem;
          font-size: 0.825rem;
          font-weight: 400;
          line-height: 1.4;
        }
        .vr-status.success {
          background: rgba(22,163,74,0.07);
          border: 1px solid rgba(22,163,74,0.18);
          color: var(--green);
        }
        .vr-status.error {
          background: rgba(220,38,38,0.06);
          border: 1px solid rgba(220,38,38,0.15);
          color: var(--red);
        }

        /* divider */
        .vr-divider {
          height: 1px;
          background: var(--border);
          margin: 1.75rem 0;
        }

        /* info note */
        .vr-note {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.78rem;
          color: var(--muted);
          line-height: 1.55;
        }
        .vr-note svg { flex-shrink: 0; margin-top: 1px; }
      `}</style>

      <div className="vr-shell">
        {/* Sidebar */}
        <div className="vr-sidebar-wrap">
          <Sidebar />
        </div>

        {/* Main */}
        <div className="vr-main">
          <div className="vr-send-card">

            <p className="vr-send-eyebrow">P2P Transfer</p>
            <h1 className="vr-send-title">Send Money</h1>
            <p className="vr-send-sub">Instant transfer to any Vrinmo account via phone number.</p>

            <form onSubmit={handleSubmit}>

              {/* Phone */}
              <div className="vr-field">
                <label className="vr-label">Recipient Phone</label>
                <div className="vr-input-wrap">
                  <span className="vr-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.5 2 2 0 0 1 3.59 1.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="vr-input"
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="vr-field">
                <label className="vr-label">Amount</label>
                <div className="vr-input-wrap">
                  <span className="vr-amount-prefix">₹</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    className="vr-input vr-input-amount"
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className="vr-submit">
                {loading ? (
                  <><span className="vr-spinner" /> Processing…</>
                ) : (
                  <>
                    Send
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </>
                )}
              </button>

              {status && (
                <div className={`vr-status ${status.type}`}>
                  {status.type === "success" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  )}
                  {status.message}
                </div>
              )}

            </form>

            <div className="vr-divider" />

            <div className="vr-note">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Transfers are instant and secured end-to-end. The recipient must have a Vrinmo account linked to this phone number.
            </div>

          </div>
        </div>
      </div>
    </>
  );
}