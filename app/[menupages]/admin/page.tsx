"use client";

export default function AdminDashboard() {
  const points = [10, 25, 18, 32, 28, 35, 30];
  const path = points
    .map((y, i) => {
      const x = 40 + i * 50;
      const yy = 140 - y * 2.5;
      return `${i === 0 ? "M" : "L"} ${x} ${yy}`;
    })
    .join(" ");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Welcome back, Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Total Orders</p>
          <p className="text-3xl font-bold mt-2">50</p>
          <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 inline-flex px-2 py-1 rounded-full">
            ↑ 12% from last week
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500/5 to-transparent rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Pending Orders</p>
          <p className="text-3xl font-bold mt-2">20</p>
          <div className="mt-2 text-xs text-amber-600 bg-amber-50 inline-flex px-2 py-1 rounded-full">
            Need attention
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500/5 to-transparent rounded-xl border p-6">
          <p className="text-sm text-muted-foreground">Completed Orders</p>
          <p className="text-3xl font-bold mt-2">30</p>
          <div className="mt-2 text-xs text-emerald-600 bg-emerald-50 inline-flex px-2 py-1 rounded-full">
            ↑ 8% completion rate
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Weekly Orders Overview</h3>
          <span className="text-xs bg-muted px-3 py-1 rounded-full">Last 7 days</span>
        </div>
        
        <div className="relative">
          <svg viewBox="0 0 400 180" className="w-full h-48">
            {/* Grid lines */}
            <line x1="40" y1="30" x2="40" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            <line x1="90" y1="30" x2="90" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            <line x1="140" y1="30" x2="140" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            <line x1="190" y1="30" x2="190" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            <line x1="240" y1="30" x2="240" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            <line x1="290" y1="30" x2="290" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            <line x1="340" y1="30" x2="340" y2="150" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4" />
            
            {/* Data line */}
            <path d={path} fill="none" stroke="hsl(355, 72%, 46%)" strokeWidth="3" />
            
            {/* Data points */}
            {points.map((y, i) => {
              const x = 40 + i * 50;
              const yy = 140 - y * 2.5;
              return (
                <circle key={i} cx={x} cy={yy} r="4" fill="hsl(355, 72%, 46%)" />
              );
            })}
          </svg>
          
          {/* X-axis labels */}
          <div className="flex justify-between px-8 mt-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <span key={day} className="text-xs text-muted-foreground">{day}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">#{i}</span>
                </div>
                <div>
                  <p className="font-medium">Order #{100 + i}</p>
                  <p className="text-xs text-muted-foreground">Chicken Burger • 2 items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{497 + i * 100}</p>
                <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}