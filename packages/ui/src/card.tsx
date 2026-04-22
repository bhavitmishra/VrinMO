"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.638 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

export function Card({
  Heading,
  Sign,
  i1,
  b1,
  b2,
}: {
  Heading: string;
  Sign: string;
  i1: boolean;
  b1: string;
  b2: string;
}) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [focusPhone, setFocusPhone] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  async function submitHandler(provider: string) {
    setWarning(false);
    if (provider === "credentials") {
      if (phone === "" || password === "") {
        setWarning(true);
        return;
      }
      signIn("credentials", { phone, password, callbackUrl: "/home" });
    } else {
      signIn(provider, { callbackUrl: "/home" });
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .vrinmo-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fdfcfa;
          padding: 1.5rem;
          font-family: 'DM Sans', sans-serif;
        }

        /* subtle background pattern */
        .vrinmo-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: radial-gradient(circle at 25% 20%, rgba(212,168,67,0.06) 0%, transparent 50%),
                            radial-gradient(circle at 75% 80%, rgba(212,168,67,0.04) 0%, transparent 50%);
          pointer-events: none;
          z-index: 0;
        }

        .vrinmo-card {
          position: relative;
          z-index: 1;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 1.75rem;
          padding: 2.75rem 2.5rem;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.06), 0 1px 8px rgba(0,0,0,0.04);
        }

        /* logo mark at top */
        .vrinmo-card-logo {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-bottom: 2rem;
        }
        .vrinmo-card-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #111;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .vrinmo-card-logo-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #d4a843;
          margin-bottom: -1px;
        }

        .vrinmo-card-heading {
          font-family: 'Playfair Display', serif;
          font-size: 1.65rem;
          font-weight: 700;
          color: #111;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin-bottom: 0.4rem;
        }
        .vrinmo-card-sub {
          font-size: 0.875rem;
          color: #888;
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }

        /* warning */
        .vrinmo-warning {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: #fff5f5;
          border: 1px solid rgba(220,38,38,0.15);
          border-radius: 0.75rem;
          padding: 0.6rem 0.875rem;
          font-size: 0.8rem;
          color: #dc2626;
          margin-bottom: 1rem;
        }

        /* inputs */
        .vrinmo-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          width: 100%;
        }
        .vrinmo-label {
          font-size: 0.75rem;
          font-weight: 500;
          color: #666;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .vrinmo-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.875rem;
          border: 1.5px solid rgba(0,0,0,0.1);
          background: #fdfcfa;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #111;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .vrinmo-input::placeholder { color: #bbb; }
        .vrinmo-input:focus {
          border-color: #d4a843;
          box-shadow: 0 0 0 3px rgba(212,168,67,0.1);
        }

        /* divider */
        .vrinmo-divider {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 1.25rem 0;
        }
        .vrinmo-divider-line {
          flex: 1;
          height: 1px;
          background: rgba(0,0,0,0.07);
        }
        .vrinmo-divider-text {
          font-size: 0.75rem;
          color: #bbb;
          letter-spacing: 0.06em;
        }

        /* primary button */
        .vrinmo-btn-primary {
          width: 100%;
          padding: 0.8rem 1rem;
          background: #111;
          color: #fdfcfa;
          border: 1.5px solid #111;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s, color 0.2s;
          margin-top: 0.25rem;
        }
        .vrinmo-btn-primary:hover {
          background: transparent;
          color: #111;
        }

        /* oauth buttons */
        .vrinmo-btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          background: #ffffff;
          color: #333;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .vrinmo-btn-google:hover {
          border-color: rgba(0,0,0,0.22);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .vrinmo-btn-github {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.75rem 1rem;
          background: #111;
          color: #fdfcfa;
          border: 1.5px solid #111;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .vrinmo-btn-github:hover { opacity: 0.82; }

        .vrinmo-btn-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        /* footer note */
        .vrinmo-card-footer {
          margin-top: 1.5rem;
          font-size: 0.75rem;
          color: #bbb;
          text-align: center;
          line-height: 1.6;
        }
        .vrinmo-card-footer a {
          color: #d4a843;
          text-decoration: none;
        }
        .vrinmo-card-footer a:hover { text-decoration: underline; }
      `}</style>

      <div className="vrinmo-page">
        <div className="vrinmo-card">

          {/* Logo */}
          <div className="vrinmo-card-logo">
            <span className="vrinmo-card-logo-text">Vrinmo</span>
            <span className="vrinmo-card-logo-dot" />
          </div>

          {/* Heading */}
          <h1 className="vrinmo-card-heading">{Heading}</h1>
          <h3 className="ui:text-red-500">If you don't have account just enter your phone number and the password you want to create</h3>
          <p className="vrinmo-card-sub">{Sign}</p>

          {/* Warning */}
          {warning && (
            <div className="vrinmo-warning">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Enter correct credentials
            </div>
          )}

          {/* Form or OAuth */}
          {i1 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", width: "100%" }}>
              <div className="vrinmo-field">
                <label className="vrinmo-label">Phone number</label>
                <input
                  type="tel"
                  className="vrinmo-input"
                  placeholder="e.g. 9876543210"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="vrinmo-field">
                <label className="vrinmo-label">Password</label>
                <input
                  type="password"
                  className="vrinmo-input"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="vrinmo-btn-primary"
                onClick={() => submitHandler("credentials")}
              >
                Sign in
              </button>

              <div className="vrinmo-divider">
                <span className="vrinmo-divider-line" />
                <span className="vrinmo-divider-text">or continue with</span>
                <span className="vrinmo-divider-line" />
              </div>
                     <h2 className="ui:text-red-500">Google and Github Login is only for merchants</h2>

              <div className="vrinmo-btn-group">
                <button className="vrinmo-btn-google" onClick={() => submitHandler(b1)}>
                  <GoogleIcon /> {b1}
                </button>
                <button className="vrinmo-btn-github" onClick={() => submitHandler(b2)}>
                  <GitHubIcon /> {b2}
                </button>
              </div>
            </div>
          ) : (
            <div className="vrinmo-btn-group">
              <button className="vrinmo-btn-google" onClick={() => submitHandler(b1)}>
                <GoogleIcon /> Continue with {b1}
              </button>
              <button className="vrinmo-btn-github" onClick={() => submitHandler(b2)}>
                <GitHubIcon /> Continue with {b2}
              </button>
            </div>
          )}

          <p className="vrinmo-card-footer">
            By continuing you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </>
  );
}