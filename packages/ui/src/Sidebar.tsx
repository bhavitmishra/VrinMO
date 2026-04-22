"use client";
import { Home, Users, Send, List, Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar({
  onToggle,
}: {
  onToggle?: (c: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const SideBarOptions = [
    { name: "Home",         path: "/home",         icon: Home  },
    { name: "P2P",          path: "/p2p",          icon: Users },
    { name: "Transfer",     path: "/transfer",     icon: Send  },
    { name: "Transactions", path: "/transactions", icon: List  },
  ];

  useEffect(() => {
    onToggle?.(collapsed);
  }, [collapsed, onToggle]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');

        .vr-sidebar {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-right: 1px solid rgba(0,0,0,0.07);
          transition: width 0.25s ease;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
        }
        .vr-sidebar.expanded { width: 220px; }
        .vr-sidebar.collapsed { width: 64px; }

        /* logo row */
        .vr-sb-logo {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 1.4rem 1.25rem 1rem;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          flex-shrink: 0;
          overflow: hidden;
          white-space: nowrap;
        }
        .vr-sb-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #111;
          letter-spacing: -0.025em;
          line-height: 1;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .vr-sb-logo-text.hidden { opacity: 0; width: 0; overflow: hidden; }
        .vr-sb-logo-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #d4a843;
          flex-shrink: 0;
          margin-bottom: -1px;
          transition: opacity 0.2s;
        }
        .vr-sb-logo-dot.hidden { opacity: 0; }

        /* toggle button */
        .vr-sb-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px; height: 30px;
          border-radius: 8px;
          border: 1px solid rgba(0,0,0,0.08);
          background: #fdfcfa;
          cursor: pointer;
          color: #666;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          flex-shrink: 0;
          margin-left: auto;
        }
        .vr-sb-toggle:hover {
          background: #111;
          color: #fdfcfa;
          border-color: #111;
        }
        .vr-sidebar.collapsed .vr-sb-toggle { margin-left: 0; }

        /* nav */
        .vr-sb-nav {
          flex: 1;
          padding: 0.875rem 0.625rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          overflow: hidden;
        }

        .vr-sb-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.65rem 0.75rem;
          border-radius: 0.875rem;
          border: 1px solid transparent;
          background: transparent;
          color: #777;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 400;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, border-color 0.18s;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
        }
        .vr-sb-item:hover {
          background: #f4f1eb;
          color: #111;
          border-color: rgba(0,0,0,0.06);
        }
        .vr-sb-item.active {
          background: #111;
          color: #fdfcfa;
          border-color: #111;
          font-weight: 500;
        }
        .vr-sb-item.active:hover {
          background: #222;
        }

        .vr-sb-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px; height: 18px;
        }

        .vr-sb-label {
          transition: opacity 0.2s;
          overflow: hidden;
        }
        .vr-sb-label.hidden { opacity: 0; width: 0; }

        /* active dot indicator (collapsed) */
        .vr-sb-active-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #d4a843;
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          flex-shrink: 0;
        }

        /* bottom section */
        .vr-sb-bottom {
          padding: 0.875rem 0.625rem;
          border-top: 1px solid rgba(0,0,0,0.06);
          flex-shrink: 0;
        }
        .vr-sb-version {
          font-size: 0.68rem;
          color: rgba(0,0,0,0.2);
          letter-spacing: 0.06em;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          transition: opacity 0.2s;
        }
        .vr-sb-version.hidden { opacity: 0; }
      `}</style>

      <aside className={`vr-sidebar ${collapsed ? "collapsed" : "expanded"}`}>

        {/* Logo + toggle */}
        <div className="vr-sb-logo">
          {!collapsed && (
            <>
              <span className="vr-sb-logo-text">Vrinmo</span>
              <span className="vr-sb-logo-dot" />
            </>
          )}
          <button
            className="vr-sb-toggle"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu size={14} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="vr-sb-nav">
          {SideBarOptions.map((option) => {
            const isActive = pathname === option.path;
            const Icon = option.icon;
            return (
              <button
                key={option.name}
                onClick={() => router.push(option.path)}
                className={`vr-sb-item${isActive ? " active" : ""}`}
                style={{ position: "relative" }}
                title={collapsed ? option.name : undefined}
              >
                <span className="vr-sb-icon">
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                </span>
                {!collapsed && (
                  <span className="vr-sb-label">{option.name}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="vr-sb-bottom">
          {!collapsed && (
            <p className="vr-sb-version">Vrinmo · v1.0</p>
          )}
        </div>

      </aside>
    </>
  );
}