"use client";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const points = [10, 18, 22, 28, 35, 30, 40];
  const path = points
    .map((y, i) => {
      const x = 20 + i * 60;
      const yy = 150 - y * 3;
      return `${i === 0 ? "M" : "L"} ${x} ${yy}`;
    })
    .join(" ");

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg">Dashboard Overview</div>
          <div className="text-sm bg-muted px-3 py-1 rounded-full">Today</div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div className="bg-muted/30 rounded-xl border p-4">
            <div className="text-sm text-muted-foreground">Total Orders</div>
            <div className="text-2xl font-bold mt-1">50</div>
          </div>
          <div className="bg-muted/30 rounded-xl border p-4">
            <div className="text-sm text-muted-foreground">Pending Orders</div>
            <div className="text-2xl font-bold mt-1">20</div>
          </div>
          <div className="bg-muted/30 rounded-xl border p-4">
            <div className="text-sm text-muted-foreground">Completed Orders</div>
            <div className="text-2xl font-bold mt-1">30</div>
          </div>
        </div>
        <div className="mt-4 bg-white rounded-xl border p-4">
          <div className="text-sm text-muted-foreground mb-2">Weekly orders</div>
          <svg viewBox="0 0 400 180" className="w-full h-40">
            <rect x="0" y="0" width="400" height="180" rx="12" fill="transparent" />
            <path d={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}
