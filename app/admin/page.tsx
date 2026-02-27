// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { Button } from "@/components/ui/button";

// type Plan = "Demo (7 Days)" | "1 Month" | "6 Months" | "12 Months";

// const plans: { label: Plan; days: number }[] = [
//   { label: "Demo (7 Days)", days: 7 },
//   { label: "1 Month", days: 30 },
//   { label: "6 Months", days: 182 },
//   { label: "12 Months", days: 365 },
// ];

// function fmt(d: Date) {
//   const dd = String(d.getDate()).padStart(2, "0");
//   const mm = String(d.getMonth() + 1).padStart(2, "0");
//   const yyyy = d.getFullYear();
//   return `${dd}-${mm}-${yyyy}`;
// }

// export default function SuperAdminHome() {
//   const today = useMemo(() => new Date(), []);
//   const [activeTab, setActiveTab] = useState<"add" | "manage">("add");

//   const [cafeName, setCafeName] = useState("");
//   const [ownerName, setOwnerName] = useState("");
//   const [city, setCity] = useState("");
//   const [location, setLocation] = useState("");
//   const [plan, setPlan] = useState<Plan>("Demo (7 Days)");
//   const [start, setStart] = useState(fmt(today));
//   const [end, setEnd] = useState("");
//   const [slug, setSlug] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     const p = plans.find((p) => p.label === plan)!;
//     const [dd, mm, yyyy] = start.split("-").map((v) => parseInt(v, 10));
//     const s = new Date(yyyy, mm - 1, dd);
//     const e = new Date(s);
//     e.setDate(e.getDate() + p.days);
//     setEnd(fmt(e));
//   }, [plan, start]);

//   useEffect(() => {
//     const s =
//       cafeName
//         .toLowerCase()
//         .replace(/[^a-z0-9\s-]/g, "")
//         .trim()
//         .replace(/\s+/g, "") || "";
//     setSlug(s);
//   }, [cafeName]);

//   const handleCreate = () => {
//     // UI only
//     alert(
//       `Profile created for ${cafeName}\nSlug: ${slug}\nAdmin: ${username}\nPlan: ${plan}\nStart: ${start}\nEnd: ${end}`
//     );
//   };

//   return (
//     <div className="min-h-svh bg-background">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Top bar */}
//         <div className="bg-card rounded-2xl border p-4 flex items-center justify-between">
//           <div className="text-2xl font-bold">
//             <span className="text-primary">Smart</span>dini
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="text-sm text-muted-foreground">Super Admin</div>
//             <div className="w-9 h-9 rounded-full bg-primary text-white grid place-items-center font-semibold">
//               SA
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex items-center justify-center my-6">
//           <div className="bg-card rounded-full border p-1 shadow-sm flex">
//             <button
//               className={`px-6 py-2 rounded-full font-semibold ${
//                 activeTab === "add"
//                   ? "bg-primary text-white shadow"
//                   : "text-foreground"
//               }`}
//               onClick={() => setActiveTab("add")}
//             >
//               Add Cafes
//             </button>
//             <button
//               className={`px-6 py-2 rounded-full font-semibold ${
//                 activeTab === "manage"
//                   ? "bg-primary text-white shadow"
//                   : "text-foreground"
//               }`}
//               onClick={() => setActiveTab("manage")}
//             >
//               Manage Cafes
//             </button>
//           </div>
//         </div>

//         {/* Add Cafes */}
//         {activeTab === "add" && (
//           <div className="bg-card rounded-2xl border p-6 shadow-sm">
//             <div className="grid lg:grid-cols-3 gap-4">
//               <div>
//                 <div className="text-sm mb-1">Cafe Name</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   placeholder="e.g. Beans & Brews"
//                   value={cafeName}
//                   onChange={(e) => setCafeName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <div className="text-sm mb-1">Owner Name</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   placeholder="e.g. Full Name"
//                   value={ownerName}
//                   onChange={(e) => setOwnerName(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <div className="text-sm mb-1">City</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   placeholder="e.g. New York"
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                 />
//               </div>
//               <div className="lg:col-span-3">
//                 <div className="text-sm mb-1">Location (Full Address)</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   placeholder="123 Street Name..."
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <div className="text-sm mb-1">Subscription Plan</div>
//                 <select
//                   className="w-full px-3 py-2 rounded-lg border"
//                   value={plan}
//                   onChange={(e) => setPlan(e.target.value as Plan)}
//                 >
//                   {plans.map((p) => (
//                     <option key={p.label} value={p.label}>
//                       {p.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <div className="text-sm mb-1">Start Date</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   value={start}
//                   onChange={(e) => setStart(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <div className="text-sm mb-1">End Date</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   value={end}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <div className="text-sm mb-1">Generated Slug (URL ID)</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   value={slug}
//                   readOnly
//                 />
//               </div>
//               <div>
//                 <div className="text-sm mb-1">Cafe Username</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   placeholder="Login Username"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//               <div>
//                 <div className="text-sm mb-1">Cafe Password</div>
//                 <input
//                   className="w-full px-3 py-2 rounded-lg border"
//                   placeholder="Login Password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="pt-6">
//               <Button className="w-full h-12 text-base" onClick={handleCreate}>
//                 Create New Profile
//               </Button>
//             </div>
//           </div>
//         )}

//         {/* Manage Cafes */}
//         {activeTab === "manage" && (
//           <div className="bg-card rounded-2xl border p-6 shadow-sm">
//             <div className="overflow-auto">
//               <table className="w-full text-sm">
//                 <thead className="bg-muted/30">
//                   <tr>
//                     <th className="text-left px-3 py-2 font-medium">Cafe Name</th>
//                     <th className="text-left px-3 py-2 font-medium">Start Date</th>
//                     <th className="text-left px-3 py-2 font-medium">End Date</th>
//                     <th className="text-left px-3 py-2 font-medium">Status</th>
//                     <th className="text-left px-3 py-2 font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {[
//                     { name: "Chai Adda", start: "01-02-2026", end: "01-03-2026", active: true, slug: "chaiadda105" },
//                     { name: "Beans & Brews", start: "10-01-2026", end: "10-07-2026", active: false, slug: "beansbrews" },
//                   ].map((r, i) => (
//                     <tr key={i} className="border-t">
//                       <td className="px-3 py-2">{r.name}</td>
//                       <td className="px-3 py-2">{r.start}</td>
//                       <td className="px-3 py-2">{r.end}</td>
//                       <td className="px-3 py-2">
//                         <span
//                           className={`px-2 py-1 rounded-md text-xs ${
//                             r.active ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
//                           }`}
//                         >
//                           {r.active ? "Active" : "Closed"}
//                         </span>
//                       </td>
//                       <td className="px-3 py-2 space-x-2">
//                         <a
//                           href={`/${r.slug}/menu`}
//                           className="px-3 py-1 rounded-lg bg-primary text-white"
//                         >
//                           Open
//                         </a>
//                         <button className="px-3 py-1 rounded-lg bg-gray-200">Close</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }







// superadmin.tsx
"use client";
import { useState, useEffect, useRef } from 'react';

export default function SuperAdmin() {
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');
  const [cafeName, setCafeName] = useState('');
  const [slug, setSlug] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [plan, setPlan] = useState('demo');
  const [showSuccess, setShowSuccess] = useState(false);
  const [menuLink, setMenuLink] = useState('');
  const [adminLink, setAdminLink] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editOwner, setEditOwner] = useState('');
  const [editCity, setEditCity] = useState('');

  // Refs for modal close on outside click
  const modalRef = useRef<HTMLDivElement>(null);

  // Set default date on component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
  }, []);

  // Calculate end date when start date or plan changes
  useEffect(() => {
    if (!startDate) return;

    const date = new Date(startDate);
    
    if (plan === 'demo') {
      date.setDate(date.getDate() + 7);
    } else {
      date.setMonth(date.getMonth() + parseInt(plan));
    }

    setEndDate(date.toISOString().split('T')[0]);
  }, [startDate, plan]);

  // Generate slug from cafe name
  const generateSlug = (name: string) => {
    const newSlug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setSlug(newSlug);
  };

  // Handle cafe name change
  const handleCafeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setCafeName(name);
    generateSlug(name);
  };

  // Handle form submission
  const handleCreateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!slug) return;

    // Update links
    setMenuLink(`smartdini.com/${slug}/menu`);
    setAdminLink(`smartdini.com/${slug}/admin`);

    // Show success message
    setShowSuccess(true);
    
    // Scroll to success message
    setTimeout(() => {
      const successElement = document.getElementById('successMsg');
      if (successElement) {
        successElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Modal functions
  const openEditModal = (name: string, owner: string, city: string) => {
    setEditName(name);
    setEditOwner(owner);
    setEditCity(city);
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
  };

  const saveChanges = () => {
    const btn = document.querySelector('.modal-footer .btn-primary') as HTMLButtonElement;
    if (btn) {
      btn.innerHTML = 'Saving...';
      
      setTimeout(() => {
        btn.innerHTML = 'Save Changes';
        closeEditModal();
        alert('Changes saved successfully!');
      }, 1000);
    }
  };

  // Handle outside click for modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header>
        <div className="brand">
          <h2>Smart<span>dini</span></h2>
        </div>
        <div className="admin-profile">
          <span>Super Admin</span>
          <div className="admin-avatar">SA</div>
        </div>
      </header>

      {/* Toggle Tabs */}
      <div className="tab-container">
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`} 
          onClick={() => setActiveTab('add')}
        >
          Add Cafes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'manage' ? 'active' : ''}`} 
          onClick={() => setActiveTab('manage')}
        >
          Manage Cafes
        </button>
      </div>

      {/* 1. ADD CAFES SECTION */}
      <div id="section-add" className={`dashboard-section ${activeTab === 'add' ? 'active' : ''}`}>
        <div className="card">
          <form id="addCafeForm" onSubmit={handleCreateProfile}>
            <div className="form-grid">
              {/* Cafe Info */}
              <div className="form-group">
                <label>Cafe Name</label>
                <input 
                  type="text" 
                  id="cName" 
                  className="form-control" 
                  placeholder="e.g. Beans & Brews" 
                  value={cafeName}
                  onChange={handleCafeNameChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Owner Name</label>
                <input type="text" className="form-control" placeholder="Full Name" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" className="form-control" placeholder="e.g. New York" required />
              </div>
              <div className="form-group">
                <label>Location (Full Address)</label>
                <input type="text" className="form-control" placeholder="123 Street Name..." required />
              </div>

              {/* Subscription */}
              <div className="form-group">
                <label>Subscription Plan</label>
                <select 
                  id="subPlan" 
                  className="form-control" 
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                >
                  <option value="demo">Demo (7 Days)</option>
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                  <option value="12">1 Year</option>
                </select>
              </div>
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="date" 
                  id="startDate" 
                  className="form-control" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required 
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="date" 
                  id="endDate" 
                  className="form-control" 
                  value={endDate}
                  readOnly 
                />
              </div>
              
              {/* Credentials */}
              <div className="form-group">
                <label>Generated Slug (URL ID)</label>
                <input 
                  type="text" 
                  id="cSlug" 
                  className="form-control" 
                  value={slug}
                  readOnly 
                  style={{ backgroundColor: '#eee', cursor: 'not-allowed' }}
                />
              </div>
              <div className="form-group">
                <label>Cafe Username</label>
                <input type="text" className="form-control" placeholder="Login Username" required />
              </div>
              <div className="form-group">
                <label>Cafe Password</label>
                <input type="text" className="form-control" placeholder="Login Password" required />
              </div>
            </div>

            <button type="submit" className="btn-primary">Create New Profile</button>
          </form>

          {/* Success Message */}
          {showSuccess && (
            <div id="successMsg" className="success-box" style={{ display: 'block' }}>
              <h4><i className="fas fa-check-circle"></i> Cafe Profile Created Successfully!</h4>
              <div className="link-row">
                <span>Menu Page:</span> <a href={`https://${menuLink}`} id="linkMenu" target="_blank" rel="noopener noreferrer">{menuLink}</a>
              </div>
              <div className="link-row">
                <span>Admin Page:</span> <a href={`https://${adminLink}`} id="linkAdmin" target="_blank" rel="noopener noreferrer">{adminLink}</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. MANAGE CAFES SECTION */}
      <div id="section-manage" className={`dashboard-section ${activeTab === 'manage' ? 'active' : ''}`}>
        
        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card total">
            <h3>124</h3>
            <p>Total Cafes</p>
          </div>
          <div className="stat-card active">
            <h3>110</h3>
            <p>Active Cafes</p>
          </div>
          <div className="stat-card inactive">
            <h3>14</h3>
            <p>Inactive Cafes</p>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <select className="filter-select">
            <option>All Cities</option>
            <option>New York</option>
            <option>London</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Active</option>
            <option>Discontinued</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Cafe Name</th>
                <th>Owner</th>
                <th>City</th>
                <th>Plan</th>
                <th>End Date</th>
                <th>Username</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr>
                <td>Central Perk</td>
                <td>Gunther</td>
                <td>New York</td>
                <td>12 Months</td>
                <td>2024-12-31</td>
                <td>central_p</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => openEditModal('Central Perk', 'Gunther', 'New York')}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-pencil">
                      <path d="M3 17.25V21h3.75L21 6.75 17.25 3 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr>
                <td>Luke's Diner</td>
                <td>Luke Danes</td>
                <td>Stars Hollow</td>
                <td>6 Months</td>
                <td>2024-06-30</td>
                <td>lukes_diner</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => openEditModal("Luke's Diner", 'Luke Danes', 'Stars Hollow')}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-pencil">
                      <path d="M3 17.25V21h3.75L21 6.75 17.25 3 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr>
                <td>The Rose</td>
                <td>Moiraine</td>
                <td>Tar Valon</td>
                <td>Demo</td>
                <td>2023-10-10</td>
                <td>rose_cafe</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </td>
                <td>
                  <button className="btn-edit" onClick={() => openEditModal('The Rose', 'Moiraine', 'Tar Valon')}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-pencil">
                      <path d="M3 17.25V21h3.75L21 6.75 17.25 3 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div id="editModal" className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal" ref={modalRef}>
            <div className="modal-header">
              <h3>Edit Cafe Details</h3>
              <i className="fas fa-times" style={{ cursor: 'pointer' }} onClick={closeEditModal}></i>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>Cafe Name</label>
                <input 
                  type="text" 
                  id="editName" 
                  className="form-control" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Owner Name</label>
                <input 
                  type="text" 
                  id="editOwner" 
                  className="form-control" 
                  value={editOwner}
                  onChange={(e) => setEditOwner(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  id="editCity" 
                  className="form-control" 
                  value={editCity}
                  onChange={(e) => setEditCity(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Change Plan</label>
                <select className="form-control">
                  <option>Current Plan</option>
                  <option>Extend 1 Month</option>
                  <option>Extend 1 Year</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeEditModal}>Cancel</button>
              <button className="btn-primary" style={{ width: 'auto', marginTop: 0 }} onClick={saveChanges}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        /* --- CSS VARIABLES & RESET --- */
        :root {
          --primary: #cb212d;
          --primary-hover: #b01c26;
          --primary-shadow: rgba(203, 33, 45, 0.35);
          --success: #22c55e;
          --success-shadow: rgba(34, 197, 94, 0.35);
          --warning: #ffc107;
          --dark: #2c3e50;
          --light-bg: #f4f7fc;
          --white: #ffffff;
          --text-gray: #6c757d;
          --border: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: var(--light-bg);
          color: var(--dark);
          font-family: 'Poppins', sans-serif;
        }

        /* --- HEADER --- */
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          background: var(--white);
          padding: 15px 25px;
          border-radius: 12px;
          box-shadow: var(--shadow);
        }

        .brand h2 { font-weight: 700; color: var(--dark); }
        .brand span { color: var(--primary); }
        .admin-profile { display: flex; align-items: center; gap: 10px; font-weight: 500; }
        .admin-avatar { width: 40px; height: 40px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; }

        /* --- TOGGLE TABS --- */
        .tab-container {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
          background: var(--white);
          padding: 10px;
          border-radius: 50px;
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
          box-shadow: var(--shadow);
        }

        .tab-btn {
          padding: 12px 30px;
          border: none;
          background: transparent;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 40px;
          color: var(--text-gray);
          transition: all 0.3s ease;
        }

        .tab-btn.active {
          background-color: var(--primary);
          color: var(--white);
          box-shadow: 0 4px 15px rgba(203, 33, 45, 0.3);
        }

        /* --- SECTIONS COMMON --- */
        .dashboard-section { display: none; animation: fadeIn 0.4s ease; }
        .dashboard-section.active { display: block; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- FORM STYLES (Add Cafe) --- */
        .card {
          background: var(--white);
          padding: 30px;
          border-radius: 16px;
          box-shadow: var(--shadow);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .form-group label { display: block; margin-bottom: 8px; font-weight: 500; font-size: 0.9rem; color: var(--dark); }
        .form-control {
          width: 100%; padding: 12px; border: 1px solid var(--border); border-radius: 8px; outline: none; transition: 0.3s;
          background: #fafafa;
        }
        .form-control:focus { border-color: var(--primary); background: #fff; }
        
        .btn-primary {
          background-color: var(--primary); color: white; border: none; padding: 14px 25px; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; margin-top: 20px; font-size: 1rem; transition: 0.3s;
        }
        .btn-primary:hover { background-color: var(--primary-hover); }

        /* Success Message Area */
        .success-box {
          margin-top: 20px;
          padding: 20px;
          background: #e9f7ef;
          border: 1px solid #c3e6cb;
          border-radius: 8px;
          color: #155724;
          display: none;
        }
        .success-box h4 { margin-bottom: 10px; display: flex; align-items: center; gap: 10px; }
        .link-row { margin-top: 5px; font-size: 0.9rem; }
        .link-row a { color: var(--primary); font-weight: 600; text-decoration: none; }
        .link-row span { font-weight: 600; color: #333; }

        /* --- MANAGE CAFES (Stats & Filters) --- */
        .stats-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }
        .stat-card {
          background: var(--white);
          padding: 20px;
          border-radius: 12px;
          box-shadow: var(--shadow);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .stat-card::after{
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 6px;
          background: var(--primary);
          box-shadow: 0 6px 10px -2px var(--primary-shadow);
        }
        .stat-card.active::after{
          background: var(--success);
          box-shadow: 0 6px 10px -2px var(--success-shadow);
        }
        .stat-card.inactive::after{
          background: var(--primary);
          box-shadow: 0 6px 10px -2px var(--primary-shadow);
        }
        .stat-card h3 { font-size: 2rem; color: var(--dark); margin-bottom: 5px; }
        .stat-card p { color: var(--text-gray); font-size: 0.9rem; font-weight: 500; }

        .filter-bar {
          display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap;
        }
        .filter-select { padding: 10px; border-radius: 8px; border: 1px solid var(--border); min-width: 150px; }

        /* --- TABLE --- */
        .table-responsive { overflow-x: auto; background: var(--white); border-radius: 12px; box-shadow: var(--shadow); }
        table { width: 100%; border-collapse: collapse; min-width: 1000px; }
        thead { background: #f8f9fa; border-bottom: 2px solid var(--border); }
        th { padding: 15px; text-align: left; font-weight: 600; color: var(--dark); font-size: 0.85rem; text-transform: uppercase; }
        td { padding: 15px; border-bottom: 1px solid var(--border); font-size: 0.9rem; color: #444; vertical-align: middle; }
        tr:hover { background-color: #fcfcfc; }

        /* Status Toggle Switch */
        .switch { position: relative; display: inline-block; width: 40px; height: 22px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }
        .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%; }
        input:checked + .slider { background-color: var(--success); }
        input:checked + .slider:before { transform: translateX(18px); }

        .btn-edit { background: #edf2f7; color: #000; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; transition: 0.2s; }
        .btn-edit:hover { background: #e2e8f0; color: var(--primary); }
        .btn-edit .icon-pencil { width: 16px; height: 16px; fill: currentColor; display: inline-block; }

        /* --- MODAL (Popup) --- */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);
          display: none; justify-content: center; align-items: center; z-index: 1000;
        }
        .modal {
          background: var(--white); width: 90%; max-width: 600px; padding: 30px; border-radius: 12px;
          animation: slideDown 0.3s ease;
        }
        .modal-header { display: flex; justify-content: space-between; margin-bottom: 20px; align-items: center; }
        .modal-footer { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
        .btn-cancel { background: #eee; color: #555; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }

        @keyframes slideDown { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        /* Responsive */
        @media (max-width: 768px) {
          .tab-container { width: 100%; justify-content: space-between; }
          .tab-btn { padding: 10px 20px; font-size: 0.9rem; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
