"use client";

import { Button } from "@/components/ui/button";

export default function SuperAdminLogin() {
  return (
    <div className="min-h-svh bg-background flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-card rounded-2xl border p-6 shadow-sm">
        <div className="text-3xl font-bold text-center mb-1">
          <span className="text-primary">Smart</span>dini
        </div>
        <div className="text-center text-xs tracking-wide text-muted-foreground mb-4">
          SUPER ADMIN PORTAL
        </div>
        <label className="text-sm">Username</label>
        <input className="w-full px-3 py-2 rounded-lg border mb-3" placeholder="Enter admin username" />
        <label className="text-sm">Password</label>
        <input className="w-full px-3 py-2 rounded-lg border mb-4" placeholder="Enter password" type="password" />
        <Button className="w-full h-11 text-base">Access Dashboard</Button>
        <div className="text-[10px] text-center text-muted-foreground mt-6">© 2026 Smartdini. All rights reserved.</div>
      </div>
    </div>
  );
}
