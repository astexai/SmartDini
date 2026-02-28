"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Bell,
  ClipboardList,
  UtensilsCrossed,
  Menu,
  X,
  User,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const menupages = params?.menupages as string;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const base = `/${menupages}/admin`;

  const navItems = [
    { label: "Dashboard",   href: base,                    icon: LayoutDashboard },
    { label: "New Orders",  href: `${base}/new-orders`,    icon: Bell },
    { label: "Orders",      href: `${base}/orders`,        icon: ClipboardList },
    { label: "Manage Menu", href: `${base}/manage-menu`,   icon: UtensilsCrossed },
  ];

  return (
    <div
      className="min-h-screen bg-[hsl(0,0%,92%)]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen p-3 sm:p-4 gap-3 sm:gap-4">
        {/* ─── Sidebar ─── */}
        <aside
          className={[
            "fixed top-0 left-0 h-full z-30 w-56",
            "lg:static lg:z-auto lg:h-auto lg:w-52 xl:w-56",
            "bg-white rounded-2xl shadow-sm flex flex-col flex-shrink-0",
            "transition-transform duration-300 ease-in-out",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          ].join(" ")}
        >
          {/* Red logo area */}
          <div className="bg-[hsl(355,72%,46%)] rounded-t-2xl px-5 py-[1.1rem] flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold text-xl tracking-widest">SMARTDINI</span>
              <button
                className="lg:hidden text-white"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive =
                href === base
                  ? pathname === base
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={[
                    "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[hsl(355,72%,92%)] text-[hsl(355,72%,46%)]"
                      : "text-[hsl(0,0%,30%)] hover:bg-[hsl(0,0%,95%)]",
                  ].join(" ")}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* ─── Main content ─── */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Red top header */}
          <header className="bg-[hsl(355,72%,46%)] rounded-2xl px-4 sm:px-6 py-[1.1rem] mb-3 sm:mb-4 flex items-center gap-3 flex-shrink-0">
            <button
              className="lg:hidden text-white flex-shrink-0"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-white" />
              </div>
              <span className="text-white font-semibold text-base sm:text-lg">
                Admin Dashboard !
              </span>
            </div>
          </header>

          {/* Page */}
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
