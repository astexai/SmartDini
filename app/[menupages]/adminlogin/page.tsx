"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";

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
    <div className="min-h-[100dvh] bg-background grid place-items-center px-4 py-6">
      <form
        onSubmit={onLogin}
        className="w-full max-w-md md:max-w-lg mx-auto bg-card rounded-2xl md:rounded-3xl border p-6 md:p-8 space-y-6 shadow"
      >
        <div className="text-3xl font-bold text-center">
          <span className="text-primary">Smart</span>dini
        </div>
        <div className="text-center text-sm text-muted-foreground">Partner Login</div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              required
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username / Store ID"
              autoComplete="username"
              className="pl-9 h-11"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              required
              type={show ? "text" : "password"}
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="pl-9 pr-9 h-11"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
              aria-label="Toggle password"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button type="submit" className="w-full h-12 text-base">
            Log In to Dashboard
          </Button>
          <div className="text-xs text-right">
            <a className="text-primary" href="#">
              Get Help
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
