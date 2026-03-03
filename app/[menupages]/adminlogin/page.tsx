"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function CafeAdminLogin({ params }: { params: { menupages: string } }) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${params.menupages}/admin`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <form
        onSubmit={onLogin}
        className="w-full max-w-md md:max-w-lg mx-auto bg-card rounded-2xl md:rounded-3xl border-2 border-gray-200 p-6 md:p-8 space-y-6 shadow-lg"
      >
        <div className="text-3xl font-bold text-center">
          <span className="text-primary">Smart</span>dini
        </div>
        <div className="text-center text-sm text-muted-foreground">Cafe Admin Portal</div>

        <div className="space-y-4">
          <div>
            <label className="text-sm mb-1 block font-medium text-gray-700">Username</label>
            <Input
              required
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Enter username / store id"
              autoComplete="username"
              className="h-11 border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="text-sm mb-1 block font-medium text-gray-700">Password</label>
            <div className="relative">
              <Input
                required
                type={show ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="pr-9 h-11 border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Toggle password"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 border-2 border-primary/20">
            Log In to Dashboard
          </Button>
          <div className="text-xs text-right">
            <a className="text-primary font-medium hover:underline" href="#">
              Get Help
            </a>
          </div>
        </div>
        
        <div className="text-[10px] text-center text-gray-500 border-t border-gray-200 pt-4">
          © 2026 Smartdini. All rights reserved.
        </div>
      </form>
    </div>
  );
}
