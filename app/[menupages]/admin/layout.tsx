"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, ClipboardList, ListChecks, UtensilsCrossed } from "lucide-react";

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { menupages: string };
}) {
  const [open, setOpen] = useState(false);
  const base = `/${params.menupages}/admin`;
  const pathname = usePathname();

  const NavItem = ({
    href,
    children,
    icon: Icon,
    onNavigate,
  }: {
    href: string;
    children: React.ReactNode;
    icon: React.ComponentType<any>;
    onNavigate?: () => void;
  }) => {
    const active = pathname === href || (href !== base && pathname?.startsWith(href));
    return (
      <Link
        href={href}
        onClick={onNavigate}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
          active 
            ? "bg-primary/10 text-primary border-l-4 border-primary" 
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
        }`}
      >
        <Icon className="h-4 w-4" />
        {children}
      </Link>
    );
  };

  const Navigation = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-1">
      <NavItem href={base} icon={LayoutDashboard} onNavigate={onNavigate}>
        Dashboard
      </NavItem>
      <NavItem href={`${base}/new-orders`} icon={ClipboardList} onNavigate={onNavigate}>
        New Orders
      </NavItem>
      <NavItem href={`${base}/orders`} icon={ListChecks} onNavigate={onNavigate}>
        Orders
      </NavItem>
      <NavItem href={`${base}/manage-menu`} icon={UtensilsCrossed} onNavigate={onNavigate}>
        Manage Menu
      </NavItem>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Dashboard !</h1>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-card rounded-xl border sticky top-20">
              <div className="p-4 border-b">
                <h2 className="font-bold text-xl text-primary">SMARTDINI</h2>
              </div>
              <div className="p-3">
                <Navigation />
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="bg-card rounded-xl border">
              <div className="p-4 border-b bg-muted/5">
                <div className="inline-flex items-center gap-2 bg-white border rounded-full px-4 py-1.5 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium">Admin Dashboard</span>
                </div>
              </div>
              <div className="p-6">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-bold text-xl text-primary">SMARTDINI</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-3">
              <Navigation onNavigate={() => setOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}