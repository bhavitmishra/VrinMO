"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { User } from "lucide-react";

// Minimal VrinMO Logo component
const VrinmoLogo = () => (
  <svg
    width="150"
    height="45"
    viewBox="0 0 200 60"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="VrinMO Digital Wallet"
    className="drop-shadow-sm"
  >
    <defs>
      <linearGradient
        id="primaryGradient-minimal"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" style={{ stopColor: "#1F2937", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#374151", stopOpacity: 1 }} />
      </linearGradient>

      <linearGradient
        id="accentGradient-minimal"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" style={{ stopColor: "#6366F1", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#4F46E5", stopOpacity: 1 }} />
      </linearGradient>

      <filter id="glow-minimal">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <g transform="translate(5, 8)">
      {/* Wallet/Card Background */}
      <rect
        x="2"
        y="0"
        width="36"
        height="36"
        rx="6"
        fill="url(#primaryGradient-minimal)"
        opacity="0.1"
      />

      {/* Main V Shape */}
      <path
        d="M8 12 L20 38 L32 12 L28 12 L20 28 L12 12 Z"
        fill="url(#primaryGradient-minimal)"
        filter="url(#glow-minimal)"
      />

      {/* Accent Elements - representing digital transactions */}
      <circle
        cx="35"
        cy="16"
        r="2"
        fill="url(#accentGradient-minimal)"
        opacity="0.8"
      />
      <circle
        cx="38"
        cy="20"
        r="1.5"
        fill="url(#accentGradient-minimal)"
        opacity="0.6"
      />
      <circle
        cx="33"
        cy="24"
        r="1"
        fill="url(#accentGradient-minimal)"
        opacity="0.4"
      />

      {/* Digital Flow Lines */}
      <path
        d="M36 18 Q40 20 38 24"
        stroke="url(#accentGradient-minimal)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />
    </g>

    {/* Company Name */}
    <text
      x="55"
      y="25"
      fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
      fontSize="25"
      fontWeight="700"
      letterSpacing="-0.02em"
      fill="#1F2937"
    >
      VrinMO
    </text>

    {/* Tagline */}
    <text
      x="55"
      y="44"
      fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif"
      fontSize="8"
      fontWeight="500"
      letterSpacing="0.1em"
      fill="#6B7280"
      opacity="0.8"
    >
      DIGITAL WALLET
    </text>
  </svg>
);

export const AppBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoggedIn = !!session;

  return (
    <header className="ui:bg-white ui:shadow-sm ui:sticky ui:top-0 ui:z-50">
      <nav className="ui:container ui:mx-auto ui:px-6 ui:py-4 ui:flex ui:justify-between ui:items-center">
        {/* Logo */}
        <Link href="/" aria-label="VrinMO Home">
          <VrinmoLogo />
        </Link>

        {/* Right Actions */}
        <div>
          {status === "loading" ? (
            <span className="ui:text-gray-500">Loading...</span>
          ) : isLoggedIn ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="ui:flex ui:items-center ui:space-x-2 ui:px-5 ui:py-2.5 ui:font-semibold ui:text-blue-500 ui:border-2 ui:border-blue-500 ui:rounded-full ui:transition-colors ui:duration-200 ui:hover:bg-blue-50"
            >
              <User className="ui:w-5 ui:h-5" />
              <span>Log out</span>
            </button>
          ) : (
            <button
              onClick={() => router.push("/signin")}
              className="ui:flex ui:items-center ui:space-x-2 ui:px-5 ui:py-2.5 ui:font-semibold ui:text-blue-500 ui:border-2 ui:border-blue-500 ui:rounded-full ui:transition-colors ui:duration-200 ui:hover:bg-blue-50"
            >
              <User className="ui:w-5 ui:h-5" />
              <span>Log in</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
