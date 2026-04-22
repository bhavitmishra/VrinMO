"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export const AppBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoggedIn = !!session;

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');

        .vrinmo-appbar {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: rgba(253, 252, 250, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }
        .vrinmo-appbar.scrolled {
          border-bottom: 1px solid rgba(0, 0, 0, 0.07);
          box-shadow: 0 1px 24px rgba(0, 0, 0, 0.04);
        }
        .vrinmo-appbar-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ── Logo ── */
        .vrinmo-logo {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          text-decoration: none;
          user-select: none;
        }
        .vrinmo-logo-wordmark {
          font-family: 'Playfair Display', serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #111;
          letter-spacing: -0.025em;
          line-height: 1;
        }
        .vrinmo-logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d4a843;
          flex-shrink: 0;
          margin-bottom: -1px;
        }

        /* ── Nav links (center) ── */
        .vrinmo-nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .vrinmo-nav-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          color: #555;
          text-decoration: none;
          letter-spacing: 0.01em;
          position: relative;
          transition: color 0.2s;
        }
        .vrinmo-nav-links a::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          right: 100%;
          height: 1px;
          background: #d4a843;
          transition: right 0.25s ease;
        }
        .vrinmo-nav-links a:hover {
          color: #111;
        }
        .vrinmo-nav-links a:hover::after {
          right: 0;
        }

        /* ── Auth button ── */
        .vrinmo-auth-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          color: #111;
          transition: opacity 0.2s;
        }
        .vrinmo-auth-btn:hover {
          opacity: 0.65;
        }
        .vrinmo-auth-btn-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          cursor: pointer;
          border: 1.5px solid #111;
          background: #111;
          color: #fdfcfa;
          padding: 0.5rem 1.25rem;
          border-radius: 999px;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .vrinmo-auth-btn-pill:hover {
          background: transparent;
          color: #111;
        }

        /* ── Avatar dot ── */
        .vrinmo-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f0ebe0;
          border: 1.5px solid rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .vrinmo-avatar svg {
          width: 15px;
          height: 15px;
          stroke: #555;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* ── Loading skeleton ── */
        .vrinmo-skeleton {
          width: 80px;
          height: 34px;
          border-radius: 999px;
          background: linear-gradient(90deg, #f0ece4 25%, #e8e2d6 50%, #f0ece4 75%);
          background-size: 200% 100%;
          animation: vrinmo-shimmer 1.4s infinite;
        }
        @keyframes vrinmo-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 640px) {
          .vrinmo-nav-links { display: none; }
          .vrinmo-appbar-inner { padding: 0 1.25rem; }
        }
      `}</style>

      <header className={`vrinmo-appbar${scrolled ? " scrolled" : ""}`}>
        <div className="vrinmo-appbar-inner">

          {/* Logo */}
          <Link href="/" className="vrinmo-logo" aria-label="Vrinmo Home">
            <span className="vrinmo-logo-wordmark">Vrinmo</span>
            <span className="vrinmo-logo-dot" aria-hidden="true" />
          </Link>

          {/*gjjj*/}
          {/* Nav links */}
          <nav aria-label="Main navigation">
            <ul className="vrinmo-nav-links">
              <li><a href="#">Features</a></li>
              <li><a href="#">How it works</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </nav>

          {/* Auth */}
          <div>
            {status === "loading" ? (
              <div className="vrinmo-skeleton" aria-hidden="true" />
            ) : isLoggedIn ? (
              <button
                className="vrinmo-auth-btn"
                onClick={() => signOut({ callbackUrl: "/" })}
                aria-label="Log out"
              >
                <div className="vrinmo-avatar">
                  {/* user icon */}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span>Log out</span>
              </button>
            ) : (
              <button
                className="vrinmo-auth-btn-pill"
                onClick={() => router.push("/signin")}
              >
                {/* user icon */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Log In
              </button>
            )}
          </div>

        </div>
      </header>
    </>
  );
};

export default AppBar;