"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

// Define props for icon components for type safety
interface IconProps {
  className?: string;
}

// Icon for the "Log in" / "Log out" button
const UserIcon: FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// Logo component
const VenmoLogo: FC = () => (
  <svg
    width="150"
    height="45"
    viewBox="0 0 200 60"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Vrinmo Home"
  >
    <defs>
      <linearGradient id="apexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#0077FF", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#0055BB", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M10 10 L30 50 L50 10 L40 10 L30 30 L20 10 Z"
      fill="url(#apexGradient)"
    />
    <text
      x="65"
      y="40"
      fontFamily="Inter, sans-serif"
      fontSize="30"
      fontWeight="600"
      fill="#1F2937"
    >
      Vrinmo
    </text>
  </svg>
);

// The main AppBar component
export const AppBar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoggedIn = !!session;

  return (
    <header className="ui:bg-white ui:shadow-sm ui:sticky ui:top-0 ui:z-50">
      <nav className="ui:container ui:mx-auto ui:px-6 ui:py-4 ui:flex ui:justify-between ui:items-center">
        <div className="ui:flex ui:items-center ui:space-x-10">
          <a href="/" aria-label="Vrinmo Home">
            <VenmoLogo />
          </a>
        </div>

        <div className="ui:flex ui:items-center ui:space-x-6">
          {isLoggedIn ? (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="ui:flex ui:items-center ui:space-x-2 ui:px-5 ui:py-2.5 ui:font-semibold ui:text-blue-500 ui:border-2 ui:border-blue-500 ui:rounded-full hover:ui:bg-blue-50 ui:transition-colors ui:duration-200"
            >
              <UserIcon className="ui:w-5 ui:h-5" />
              <span>Log out</span>
            </button>
          ) : (
            <button
              onClick={() => router.push("/signin")}
              className="ui:flex ui:items-center ui:space-x-2 ui:px-5 ui:py-2.5 ui:font-semibold ui:text-blue-500 ui:border-2 ui:border-blue-500 ui:rounded-full hover:ui:bg-blue-50 ui:transition-colors ui:duration-200"
            >
              <UserIcon className="ui:w-5 ui:h-5" />
              <span>Log in</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
