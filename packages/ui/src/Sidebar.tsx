"use client";
import { Home, Compass, Gift, Send, List, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar({
  onToggle,
}: {
  onToggle?: (c: boolean) => void;
}) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const SideBarOptions = [
    { name: "Home", icon: <Home className="ui:h-5 ui:w-5" /> },
    { name: "Explore", icon: <Compass className="ui:h-5 ui:w-5" /> },
    { name: "Rewards", icon: <Gift className="ui:h-5 ui:w-5" /> },
    { name: "Transfer", icon: <Send className="ui:h-5 ui:w-5" /> },
    { name: "Transactions", icon: <List className="ui:h-5 ui:w-5" /> },
  ];

  // notify parent whenever collapsed changes
  useEffect(() => {
    onToggle?.(collapsed);
  }, [collapsed, onToggle]);

  return (
    <aside
      className={`${
        collapsed ? "ui:w-16" : "ui:w-64"
      } ui:h-screen ui:text-black ui:flex ui:flex-col ui:shadow-xl ui:transition-all ui:duration-300`}
    >
      <div className="ui:border-b">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ui:w-full ui:flex ui:items-center ui:justify-center ui:gap-2 ui:py-4 ui:text-black hover:ui:bg-[#3a2f4a] hover:ui:text-white ui:transition-colors"
        >
          <Menu className="ui:h-5 ui:w-5" />
          {!collapsed && <span className="ui:font-medium">Menu</span>}
        </button>
      </div>

      <nav className="ui:flex-1 ui:p-2">
        <ul className="ui:space-y-2">
          {SideBarOptions.map((option) => (
            <li key={option.name}>
              <button
                onClick={() => router.push(`/${option.name.toLowerCase()}`)}
                className="ui:flex ui:items-center ui:gap-3 ui:w-full ui:px-4 ui:py-2 ui:rounded-lg hover:ui:bg-[#3a2f4a] hover:ui:text-white ui:transition-colors"
              >
                <span className="ui:flex-shrink-0">{option.icon}</span>
                {!collapsed && (
                  <span className="ui:truncate">{option.name}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
