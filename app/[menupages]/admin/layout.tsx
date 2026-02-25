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

  const Item = ({
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
    const active = pathname?.startsWith(href);
    return (
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
          active ? "bg-primary/10 text-primary border-primary/30" : "bg-white border-transparent"
        }`}
      >
        <Icon className="h-4 w-4" />
        {children}
      </Link>
    );
  };

  const Nav = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex flex-col gap-2">
      <Item href={`${base}`} icon={LayoutDashboard} onNavigate={onNavigate}>
        Dashboard
      </Item>
      <Item href={`${base}/new-orders`} icon={ClipboardList} onNavigate={onNavigate}>
        New Orders
      </Item>
      <Item href={`${base}/orders`} icon={ListChecks} onNavigate={onNavigate}>
        Orders
      </Item>
      <Item href={`${base}/manage-menu`} icon={UtensilsCrossed} onNavigate={onNavigate}>
        Manage Menu
      </Item>
    </nav>
  );

  return (
    <div className="min-h-svh bg-background">
      <div className="w-full bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-lg font-semibold">Admin Dashboard !</div>
          <button
            className="lg:hidden rounded-md bg-white/10 px-3 py-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 py-4 grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-4">
        <aside className="hidden lg:block lg:sticky lg:top-0 self-start">
          <div className="bg-card rounded-2xl border p-4 relative shadow-sm">
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-primary/80 rounded-r-xl"></div>
            <div className="mb-3 font-extrabold text-primary tracking-wide">SMARTDINI</div>
            <Nav />
          </div>
        </aside>

        <main className="min-w-0">
          <div className="bg-card rounded-2xl border p-4">
            <div className="inline-flex items-center gap-2 bg-white border rounded-full px-3 py-1 shadow-sm mb-3">
              <div className="size-5 rounded-full bg-muted grid place-items-center">•</div>
              <div className="text-sm font-medium">Admin Dashboard !</div>
            </div>
            {children}
          </div>
        </main>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r p-4">
            <div className="mb-3 font-extrabold text-primary">SMARTDINI</div>
            <Nav onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
