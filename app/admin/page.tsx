"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Plan = "Demo (7 Days)" | "1 Month" | "6 Months" | "12 Months";

const plans: { label: Plan; days: number }[] = [
  { label: "Demo (7 Days)", days: 7 },
  { label: "1 Month", days: 30 },
  { label: "6 Months", days: 182 },
  { label: "12 Months", days: 365 },
];

function fmt(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

export default function SuperAdminHome() {
  const today = useMemo(() => new Date(), []);
  const [activeTab, setActiveTab] = useState<"add" | "manage">("add");

  const [cafeName, setCafeName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [plan, setPlan] = useState<Plan>("Demo (7 Days)");
  const [start, setStart] = useState(fmt(today));
  const [end, setEnd] = useState("");
  const [slug, setSlug] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const p = plans.find((p) => p.label === plan)!;
    const [dd, mm, yyyy] = start.split("-").map((v) => parseInt(v, 10));
    const s = new Date(yyyy, mm - 1, dd);
    const e = new Date(s);
    e.setDate(e.getDate() + p.days);
    setEnd(fmt(e));
  }, [plan, start]);

  useEffect(() => {
    const s =
      cafeName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "") || "";
    setSlug(s);
  }, [cafeName]);

  const handleCreate = () => {
    // UI only
    alert(
      `Profile created for ${cafeName}\nSlug: ${slug}\nAdmin: ${username}\nPlan: ${plan}\nStart: ${start}\nEnd: ${end}`
    );
  };

  return (
    <div className="min-h-svh bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Top bar */}
        <div className="bg-card rounded-2xl border p-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <span className="text-primary">Smart</span>dini
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-muted-foreground">Super Admin</div>
            <div className="w-9 h-9 rounded-full bg-primary text-white grid place-items-center font-semibold">
              SA
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center my-6">
          <div className="bg-card rounded-full border p-1 shadow-sm flex">
            <button
              className={`px-6 py-2 rounded-full font-semibold ${
                activeTab === "add"
                  ? "bg-primary text-white shadow"
                  : "text-foreground"
              }`}
              onClick={() => setActiveTab("add")}
            >
              Add Cafes
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold ${
                activeTab === "manage"
                  ? "bg-primary text-white shadow"
                  : "text-foreground"
              }`}
              onClick={() => setActiveTab("manage")}
            >
              Manage Cafes
            </button>
          </div>
        </div>

        {/* Add Cafes */}
        {activeTab === "add" && (
          <div className="bg-card rounded-2xl border p-6 shadow-sm">
            <div className="grid lg:grid-cols-3 gap-4">
              <div>
                <div className="text-sm mb-1">Cafe Name</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  placeholder="e.g. Beans & Brews"
                  value={cafeName}
                  onChange={(e) => setCafeName(e.target.value)}
                />
              </div>
              <div>
                <div className="text-sm mb-1">Owner Name</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  placeholder="e.g. Full Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div>
                <div className="text-sm mb-1">City</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  placeholder="e.g. New York"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="lg:col-span-3">
                <div className="text-sm mb-1">Location (Full Address)</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  placeholder="123 Street Name..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <div className="text-sm mb-1">Subscription Plan</div>
                <select
                  className="w-full px-3 py-2 rounded-lg border"
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as Plan)}
                >
                  {plans.map((p) => (
                    <option key={p.label} value={p.label}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="text-sm mb-1">Start Date</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                />
              </div>
              <div>
                <div className="text-sm mb-1">End Date</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  value={end}
                  readOnly
                />
              </div>
              <div>
                <div className="text-sm mb-1">Generated Slug (URL ID)</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  value={slug}
                  readOnly
                />
              </div>
              <div>
                <div className="text-sm mb-1">Cafe Username</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  placeholder="Login Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <div className="text-sm mb-1">Cafe Password</div>
                <input
                  className="w-full px-3 py-2 rounded-lg border"
                  placeholder="Login Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="pt-6">
              <Button className="w-full h-12 text-base" onClick={handleCreate}>
                Create New Profile
              </Button>
            </div>
          </div>
        )}

        {/* Manage Cafes */}
        {activeTab === "manage" && (
          <div className="bg-card rounded-2xl border p-6 shadow-sm">
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium">Cafe Name</th>
                    <th className="text-left px-3 py-2 font-medium">Start Date</th>
                    <th className="text-left px-3 py-2 font-medium">End Date</th>
                    <th className="text-left px-3 py-2 font-medium">Status</th>
                    <th className="text-left px-3 py-2 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Chai Adda", start: "01-02-2026", end: "01-03-2026", active: true, slug: "chaiadda105" },
                    { name: "Beans & Brews", start: "10-01-2026", end: "10-07-2026", active: false, slug: "beansbrews" },
                  ].map((r, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-3 py-2">{r.name}</td>
                      <td className="px-3 py-2">{r.start}</td>
                      <td className="px-3 py-2">{r.end}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`px-2 py-1 rounded-md text-xs ${
                            r.active ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {r.active ? "Active" : "Closed"}
                        </span>
                      </td>
                      <td className="px-3 py-2 space-x-2">
                        <a
                          href={`/${r.slug}/menu`}
                          className="px-3 py-1 rounded-lg bg-primary text-white"
                        >
                          Open
                        </a>
                        <button className="px-3 py-1 rounded-lg bg-gray-200">Close</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
