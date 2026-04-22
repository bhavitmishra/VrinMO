"use client";
import { useEffect, useRef, useState } from "react";

// ── scroll-in hook ────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── stat pill ─────────────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="vrinmo-stat">
      <span className="vrinmo-stat-value">{value}</span>
      <span className="vrinmo-stat-label">{label}</span>
    </div>
  );
}

// ── feature card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className="vrinmo-feature-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.65s ${delay}ms, transform 0.65s ${delay}ms`,
      }}
    >
      <div className="vrinmo-feature-icon">{icon}</div>
      <h3 className="vrinmo-feature-title">{title}</h3>
      <p className="vrinmo-feature-desc">{desc}</p>
    </div>
  );
}

// ── step ─────────────────────────────────────────────────────────────────────
function Step({ num, title, desc, delay }: { num: string; title: string; desc: string; delay: number }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className="vrinmo-step"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.65s ${delay}ms, transform 0.65s ${delay}ms`,
      }}
    >
      <div className="vrinmo-step-num">{num}</div>
      <h3 className="vrinmo-step-title">{title}</h3>
      <p className="vrinmo-step-desc">{desc}</p>
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const featuresSec = useInView();
  const stepsSec = useInView();
  const ctaSec = useInView();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        /* ── tokens ── */
        :root {
          --cream: #fdfcfa;
          --ink:   #111;
          --muted: #666;
          --faint: #f4f1eb;
          --amber: #d4a843;
          --amber-light: rgba(212,168,67,0.12);
          --border: rgba(0,0,0,0.07);
          --radius: 1.5rem;
        }

        body { background: var(--cream); color: var(--ink); }

        /* ── hero ── */
        .vrinmo-hero {
          min-height: calc(100vh - 68px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 2rem 60px;
        }
        @media (max-width: 768px) {
          .vrinmo-hero { grid-template-columns: 1fr; padding: 60px 1.25rem 40px; text-align: center; }
          .vrinmo-hero-stats { justify-content: center !important; }
          .vrinmo-hero-actions { justify-content: center !important; }
          .vrinmo-hero-right { order: -1; }
        }

        .vrinmo-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--amber-light);
          border: 1px solid rgba(212,168,67,0.25);
          border-radius: 999px;
          padding: 0.3rem 0.85rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #9a7520;
          margin-bottom: 1.75rem;
        }
        .vrinmo-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--amber);
        }

        .vrinmo-h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.75rem, 4.5vw, 4.5rem);
          font-weight: 900;
          line-height: 1.06;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin-bottom: 1.25rem;
        }
        .vrinmo-h1 em {
          font-style: italic;
          color: var(--amber);
        }

        .vrinmo-hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          color: var(--muted);
          max-width: 420px;
          margin-bottom: 2.25rem;
        }

        .vrinmo-hero-actions {
          display: flex;
          gap: 0.875rem;
          flex-wrap: wrap;
          margin-bottom: 2.75rem;
        }

        .vrinmo-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--ink);
          color: var(--cream);
          border: 1.5px solid var(--ink);
          padding: 0.75rem 1.75rem;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s, color 0.2s;
          text-decoration: none;
        }
        .vrinmo-btn-primary:hover {
          background: transparent;
          color: var(--ink);
        }

        .vrinmo-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          color: var(--muted);
          border: none;
          padding: 0.75rem 0.25rem;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: color 0.2s;
          text-decoration: none;
        }
        .vrinmo-btn-ghost:hover { color: var(--ink); }

        /* stats row */
        .vrinmo-hero-stats {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .vrinmo-stat {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          background: var(--faint);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 0.875rem 1.25rem;
          min-width: 90px;
        }
        .vrinmo-stat-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--ink);
          line-height: 1;
        }
        .vrinmo-stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.7rem;
          font-weight: 400;
          color: var(--muted);
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* video card */
        .vrinmo-video-wrap {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .vrinmo-video-card {
          position: relative;
          border-radius: 2rem;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 24px 64px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.05);
          max-width: 420px;
          width: 100%;
        }
        .vrinmo-video-card video {
          display: block;
          width: 100%;
        }
        /* subtle floating pill badge over the video */
        .vrinmo-video-badge {
          position: absolute;
          bottom: 1.25rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(253,252,250,0.88);
          backdrop-filter: blur(12px);
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 0.45rem 1rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          color: var(--ink);
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .vrinmo-video-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #22c55e;
          animation: vrinmo-pulse 2s ease-in-out infinite;
        }
        @keyframes vrinmo-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(0.85); }
        }

        /* ── divider ── */
        .vrinmo-divider {
          width: 100%;
          height: 1px;
          background: var(--border);
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ── section wrapper ── */
        .vrinmo-section {
          padding: 96px 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .vrinmo-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 0.7rem;
        }
        .vrinmo-section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.75rem, 3vw, 2.75rem);
          font-weight: 700;
          color: var(--ink);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 3.5rem;
        }
        .vrinmo-section-title em {
          font-style: italic;
          color: var(--amber);
        }

        /* ── features ── */
        .vrinmo-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 768px) { .vrinmo-features-grid { grid-template-columns: 1fr; } }

        .vrinmo-feature-card {
          background: var(--faint);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2rem 1.75rem;
          transition: border-color 0.2s, box-shadow 0.2s;
          cursor: default;
        }
        .vrinmo-feature-card:hover {
          border-color: rgba(212,168,67,0.3);
          box-shadow: 0 8px 32px rgba(0,0,0,0.06);
        }
        .vrinmo-feature-icon {
          font-size: 1.6rem;
          margin-bottom: 1.1rem;
          line-height: 1;
        }
        .vrinmo-feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.6rem;
          letter-spacing: -0.01em;
        }
        .vrinmo-feature-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.75;
        }

        /* ── steps section bg ── */
        .vrinmo-steps-bg {
          background: var(--faint);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .vrinmo-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          position: relative;
        }
        @media (max-width: 768px) { .vrinmo-steps-grid { grid-template-columns: 1fr; } }

        /* connector line between steps */
        .vrinmo-steps-grid::before {
          content: '';
          position: absolute;
          top: 22px;
          left: calc(16.66% + 1rem);
          right: calc(16.66% + 1rem);
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
        }
        @media (max-width: 768px) { .vrinmo-steps-grid::before { display: none; } }

        .vrinmo-step { text-align: center; }
        .vrinmo-step-num {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px solid var(--border);
          background: var(--cream);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 1.25rem;
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--ink);
        }
        .vrinmo-step-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 0.5rem;
          letter-spacing: -0.01em;
        }
        .vrinmo-step-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: var(--muted);
          line-height: 1.75;
          max-width: 200px;
          margin: 0 auto;
        }

        /* ── CTA banner ── */
        .vrinmo-cta-wrap {
          padding: 80px 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .vrinmo-cta-inner {
          background: var(--ink);
          border-radius: 2rem;
          padding: 4rem 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .vrinmo-cta-inner::before {
          content: '';
          position: absolute;
          top: -60%;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(212,168,67,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .vrinmo-cta-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 0.875rem;
        }
        .vrinmo-cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: var(--cream);
          margin-bottom: 0.875rem;
          letter-spacing: -0.02em;
        }
        .vrinmo-cta-sub {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: rgba(253,252,250,0.5);
          max-width: 400px;
          margin: 0 auto 2.25rem;
          line-height: 1.75;
        }
        .vrinmo-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--amber);
          color: var(--ink);
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 999px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.925rem;
          font-weight: 500;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: opacity 0.2s, transform 0.2s;
        }
        .vrinmo-cta-btn:hover { opacity: 0.88; transform: translateY(-1px); }

        /* ── footer ── */
        .vrinmo-footer {
          border-top: 1px solid var(--border);
          padding: 2.25rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .vrinmo-footer-logo {
          display: flex; align-items: center; gap: 0.35rem;
          font-family: 'Playfair Display', serif;
          font-size: 1.15rem; font-weight: 700; color: var(--ink);
          text-decoration: none;
        }
        .vrinmo-footer-logo-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--amber);
          margin-bottom: -1px;
        }
        .vrinmo-footer-copy {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: var(--muted);
        }
        .vrinmo-footer-links {
          display: flex; gap: 1.75rem;
        }
        .vrinmo-footer-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .vrinmo-footer-links a:hover { color: var(--ink); }

        /* ── hero entrance ── */
        .hero-enter {
          opacity: 0; transform: translateY(18px);
          transition-property: opacity, transform;
          transition-timing-function: ease;
        }
        .hero-enter.in { opacity: 1; transform: translateY(0); }
      `}</style>

      <div style={{ background: "var(--cream)", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ══════════════════════════════ HERO ══════════════════════════════ */}
        <main>
          <div className="vrinmo-hero">

            {/* LEFT */}
            <div>
              <div
                className={`hero-enter${mounted ? " in" : ""}`}
                style={{ transitionDuration: "0.5s", transitionDelay: "0.05s" }}
              >
                <div className="vrinmo-badge">
                  <span className="vrinmo-badge-dot" />
                  Developed by Bhavit Mishra
                </div>
              </div>

              <h1
                className={`vrinmo-h1 hero-enter${mounted ? " in" : ""}`}
                style={{ transitionDuration: "0.6s", transitionDelay: "0.15s" }}
              >
                Pay friends.<br />Pay for <em>everything.</em>
              </h1>

              <p
                className={`vrinmo-hero-sub hero-enter${mounted ? " in" : ""}`}
                style={{ transitionDuration: "0.6s", transitionDelay: "0.28s" }}
              >
                Send money to anyone and pay for anything — online, in-store,
                or splitting a bill — all from one clean, fast app.
              </p>

              <div
                className={`vrinmo-hero-actions hero-enter${mounted ? " in" : ""}`}
                style={{ transitionDuration: "0.6s", transitionDelay: "0.4s" }}
              >
                <a href="/signin" className="vrinmo-btn-primary">Get started free</a>
                <a href="#how" className="vrinmo-btn-ghost">See how it works →</a>
              </div>

              <div
                className={`vrinmo-hero-stats hero-enter${mounted ? " in" : ""}`}
                style={{ transitionDuration: "0.6s", transitionDelay: "0.54s" }}
              >
                <Stat value="₹2B+" label="Transferred" />
                <Stat value="4.9 ★" label="App rating" />
                <Stat value="500K+" label="Users" />
              </div>
            </div>

            {/* RIGHT — video */}
            <div
              className={`vrinmo-video-wrap hero-enter${mounted ? " in" : ""}`}
              style={{ transitionDuration: "0.7s", transitionDelay: "0.2s" }}
            >
              <div className="vrinmo-video-card">
                <video autoPlay loop muted playsInline>
                  <source src="/finalVrinMO.mp4" type="video/mp4" />
                </video>
                <div className="vrinmo-video-badge">
                  <span className="vrinmo-video-badge-dot" />
                  Live transfers enabled
                </div>
              </div>
            </div>

          </div>
        </main>

        <div className="vrinmo-divider" />

        {/* ══════════════════════════════ FEATURES ══════════════════════════ */}
        <section>
          <div className="vrinmo-section">
            <div
              ref={featuresSec.ref}
              style={{
                opacity: featuresSec.visible ? 1 : 0,
                transform: featuresSec.visible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.6s, transform 0.6s",
                marginBottom: "3.5rem",
              }}
            >
              <p className="vrinmo-section-label">Why Vrinmo</p>
              <h2 className="vrinmo-section-title">Built around <em>your</em> life</h2>
            </div>
            <div className="vrinmo-features-grid">
              <FeatureCard icon="⚡" title="Instant Transfers" desc="Money reaches your recipient in seconds. Real-time confirmations so you're never left wondering." delay={0} />
              <FeatureCard icon="🛡️" title="Bank-Grade Security" desc="End-to-end encryption, biometric lock, and round-the-clock fraud detection on every transaction." delay={110} />
              <FeatureCard icon="🌐" title="Pay Anywhere" desc="UPI, online checkout, or splitting dinner — one app handles every payment without the friction." delay={220} />
            </div>
          </div>
        </section>

        <div className="vrinmo-divider" />

        {/* ══════════════════════════════ HOW IT WORKS ══════════════════════ */}
        <section className="vrinmo-steps-bg" id="how">
          <div className="vrinmo-section">
            <div
              ref={stepsSec.ref}
              style={{
                opacity: stepsSec.visible ? 1 : 0,
                transform: stepsSec.visible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.6s, transform 0.6s",
                textAlign: "center",
                marginBottom: "3.5rem",
              }}
            >
              <p className="vrinmo-section-label">The process</p>
              <h2 className="vrinmo-section-title" style={{ marginBottom: 0 }}>Up and running in three steps</h2>
            </div>
            <div className="vrinmo-steps-grid">
              <Step num="I"   title="Create an Account"    desc="Sign up in under a minute with your email or phone number." delay={0} />
              <Step num="II"  title="Link Your Money"       desc="Connect your bank account or card — fully encrypted, fully safe." delay={130} />
              <Step num="III" title="Send & Receive"        desc="Tap a name, confirm, done. Money moves before you put your phone down." delay={260} />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════ CTA ══════════════════════════════ */}
        <div
          ref={ctaSec.ref}
          className="vrinmo-cta-wrap"
          style={{
            opacity: ctaSec.visible ? 1 : 0,
            transform: ctaSec.visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s, transform 0.7s",
          }}
        >
          <div className="vrinmo-cta-inner">
            <p className="vrinmo-cta-label">Start today</p>
            <h2 className="vrinmo-cta-title">Your money, your terms.</h2>
            <p className="vrinmo-cta-sub">Join half a million Indians who've made Vrinmo their everyday payments app.</p>
            <button className="vrinmo-cta-btn" onClick={()=>{window.location.href = "/signin"}}>Create free account</button>
          </div>
        </div>

        {/* ══════════════════════════════ FOOTER ═══════════════════════════ */}
        <footer>
          <div className="vrinmo-footer">
            <a href="/" className="vrinmo-footer-logo">
              Vrinmo <span className="vrinmo-footer-logo-dot" />
            </a>
            <p className="vrinmo-footer-copy">© {new Date().getFullYear()} Vrinmo. All rights reserved.</p>
            <nav className="vrinmo-footer-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Support</a>
            </nav>
          </div>
        </footer>

      </div>
    </>
  );
}