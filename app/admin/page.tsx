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
  // New state variables for added fields
  const [editEmail, setEditEmail] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editPlan, setEditPlan] = useState('1');
  const [editEndDate, setEditEndDate] = useState('');
  // New state for edit start date
  const [editStartDate, setEditStartDate] = useState('');

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

  // Calculate edit end date when edit start date or edit plan changes
  useEffect(() => {
    if (!editStartDate) return;

    const date = new Date(editStartDate);
    
    if (editPlan === 'demo') {
      date.setDate(date.getDate() + 7);
    } else if (editPlan === 'lifetime') {
      // For lifetime, set a far future date or keep as is
      date.setFullYear(date.getFullYear() + 100);
    } else {
      date.setMonth(date.getMonth() + parseInt(editPlan));
    }

    setEditEndDate(date.toISOString().split('T')[0]);
  }, [editStartDate, editPlan]);

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

  // Modal functions - Updated to include all fields including start date
  const openEditModal = (name: string, owner: string, city: string, email: string = '', location: string = '', currentPlan: string = '1', endDate: string = '', startDate: string = '') => {
    setEditName(name);
    setEditOwner(owner);
    setEditCity(city);
    setEditEmail(email);
    setEditLocation(location);
    setEditPlan(currentPlan);
    setEditEndDate(endDate);
    setEditStartDate(startDate || new Date().toISOString().split('T')[0]); // Set default if not provided
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
              {/* Added Email ID Field */}
              <div className="form-group">
                <label>Email ID</label>
                <input type="email" className="form-control" placeholder="owner@example.com" required />
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

        {/* Table - REDESIGNED FOR PROPER ALIGNMENT AND SCROLLING */}
        <div className="table-wrapper">
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Cafe Name</th>
                  <th>Owner</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Location</th>
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
                  <td><div className="cell-content">Central Perk</div></td>
                  <td><div className="cell-content">Gunther</div></td>
                  <td><div className="cell-content">gunther@centralperk.com</div></td>
                  <td><div className="cell-content">New York</div></td>
                  <td><div className="cell-content">199 Bedford Ave, Brooklyn</div></td>
                  <td><div className="cell-content">12 Months</div></td>
                  <td><div className="cell-content">2024-12-31</div></td>
                  <td><div className="cell-content">central_p</div></td>
                  <td>
                    <div className="status-wrapper">
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="action-wrapper">
                      <button className="btn-edit" onClick={() => openEditModal(
                        'Central Perk', 
                        'Gunther', 
                        'New York',
                        'gunther@centralperk.com',
                        '199 Bedford Ave, Brooklyn',
                        '12',
                        '2024-12-31',
                        '2024-01-01' // Start date
                      )}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-pencil">
                          <path d="M3 17.25V21h3.75L21 6.75 17.25 3 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr>
                  <td><div className="cell-content">Luke's Diner</div></td>
                  <td><div className="cell-content">Luke Danes</div></td>
                  <td><div className="cell-content">luke@lukesdiner.com</div></td>
                  <td><div className="cell-content">Stars Hollow</div></td>
                  <td><div className="cell-content">45 Main Street, Stars Hollow</div></td>
                  <td><div className="cell-content">6 Months</div></td>
                  <td><div className="cell-content">2024-06-30</div></td>
                  <td><div className="cell-content">lukes_diner</div></td>
                  <td>
                    <div className="status-wrapper">
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="action-wrapper">
                      <button className="btn-edit" onClick={() => openEditModal(
                        "Luke's Diner", 
                        'Luke Danes', 
                        'Stars Hollow',
                        'luke@lukesdiner.com',
                        '45 Main Street, Stars Hollow',
                        '6',
                        '2024-06-30',
                        '2024-01-01' // Start date
                      )}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-pencil">
                          <path d="M3 17.25V21h3.75L21 6.75 17.25 3 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr>
                  <td><div className="cell-content">The Rose</div></td>
                  <td><div className="cell-content">Moiraine</div></td>
                  <td><div className="cell-content">moiraine@therose.com</div></td>
                  <td><div className="cell-content">Tar Valon</div></td>
                  <td><div className="cell-content">12 White Tower, Tar Valon</div></td>
                  <td><div className="cell-content">Demo</div></td>
                  <td><div className="cell-content">2023-10-10</div></td>
                  <td><div className="cell-content">rose_cafe</div></td>
                  <td>
                    <div className="status-wrapper">
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="action-wrapper">
                      <button className="btn-edit" onClick={() => openEditModal(
                        'The Rose', 
                        'Moiraine', 
                        'Tar Valon',
                        'moiraine@therose.com',
                        '12 White Tower, Tar Valon',
                        '0',
                        '2023-10-10',
                        '2023-10-03' // Start date
                      )}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-pencil">
                          <path d="M3 17.25V21h3.75L21 6.75 17.25 3 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                {/* Additional rows for testing scroll */}
                <tr>
                  <td><div className="cell-content">Coffee House</div></td>
                  <td><div className="cell-content">John Smith</div></td>
                  <td><div className="cell-content">john@coffeehouse.com</div></td>
                  <td><div className="cell-content">Chicago</div></td>
                  <td><div className="cell-content">123 Main St, Chicago, IL</div></td>
                  <td><div className="cell-content">1 Month</div></td>
                  <td><div className="cell-content">2024-04-15</div></td>
                  <td><div className="cell-content">coffee_house</div></td>
                  <td>
                    <div className="status-wrapper">
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="action-wrapper">
                      <button className="btn-edit" onClick={() => openEditModal(
                        'Coffee House', 
                        'John Smith', 
                        'Chicago',
                        'john@coffeehouse.com',
                        '123 Main St, Chicago, IL',
                        '1',
                        '2024-04-15',
                        '2024-03-15' // Start date
                      )}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-pencil">
                          <path d="M3 17.25V21h3.75L21 6.75 17.25 3 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td><div className="cell-content">Tea Time</div></td>
                  <td><div className="cell-content">Emma Watson</div></td>
                  <td><div className="cell-content">emma@teatime.com</div></td>
                  <td><div className="cell-content">Boston</div></td>
                  <td><div className="cell-content">456 Park Ave, Boston, MA</div></td>
                  <td><div className="cell-content">3 Months</div></td>
                  <td><div className="cell-content">2024-06-20</div></td>
                  <td><div className="cell-content">tea_time</div></td>
                  <td>
                    <div className="status-wrapper">
                      <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="action-wrapper">
                      <button className="btn-edit" onClick={() => openEditModal(
                        'Tea Time', 
                        'Emma Watson', 
                        'Boston',
                        'emma@teatime.com',
                        '456 Park Ave, Boston, MA',
                        '3',
                        '2024-06-20',
                        '2024-03-20' // Start date
                      )}>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon-pencil">
                          <path d="M3 17.25V21h3.75L21 6.75 17.25 3 3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41L18.37 3.29a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {showModal && (
        <div id="editModal" className="modal-overlay" style={{ display: 'flex' }}>
          <div className="modal" ref={modalRef}>
            <div className="modal-header">
              <h3>Extend Plan</h3>
              <button className="modal-close" onClick={closeEditModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-form-grid">
                {/* Row 1: Cafe Name and Owner Name */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Cafe Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Owner Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editOwner}
                      onChange={(e) => setEditOwner(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Row 2: Email and City */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Email ID</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editCity}
                      onChange={(e) => setEditCity(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Row 3: Location (full width) */}
                <div className="form-row full-width">
                  <div className="form-group full-width">
                    <label>Location</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editLocation}
                      onChange={(e) => setEditLocation(e.target.value)}
                      placeholder="Full address"
                    />
                  </div>
                </div>
                
                {/* Row 4: Plan and Start Date */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Extend Plan</label>
                    <select 
                      className="form-control"
                      value={editPlan}
                      onChange={(e) => setEditPlan(e.target.value)}
                    >
                      <option value="demo">Demo (7 Days)</option>
                      <option value="1">1 Month</option>
                      <option value="3">3 Months</option>
                      <option value="6">6 Months</option>
                      <option value="12">1 Year</option>
                      <option value="lifetime">Lifetime</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      value={editStartDate}
                      onChange={(e) => setEditStartDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 5: End Date (auto-calculated) */}
                <div className="form-row full-width">
                  <div className="form-group full-width">
                    <label>New End Date (Auto-calculated)</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      value={editEndDate}
                      readOnly
                      style={{ backgroundColor: '#f0f0f0', cursor: 'not-allowed' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={closeEditModal}>Cancel</button>
              <button className="btn-primary" onClick={saveChanges}>Extend Plan</button>
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

        /* --- TABLE - REDESIGNED FOR PROPER ALIGNMENT AND SCROLLING --- */
        .table-wrapper {
          background: var(--white);
          border-radius: 12px;
          box-shadow: var(--shadow);
          overflow: hidden;
          width: 100%;
        }

        .table-scroll {
          overflow-x: auto;
          overflow-y: auto;
          max-height: 400px;
          scrollbar-width: thin;
          scrollbar-color: var(--primary) #f0f0f0;
          -ms-overflow-style: none;  /* Hide scrollbar for IE and Edge */
          scrollbar-width: none;  /* Hide scrollbar for Firefox */
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .table-scroll::-webkit-scrollbar {
          display: none;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1200px;
          table-layout: auto;
        }

        thead {
          background: #f8f9fa;
          border-bottom: 2px solid var(--border);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        th {
          padding: 16px 12px;
          text-align: left;
          font-weight: 600;
          color: var(--dark);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
          background: #f8f9fa;
        }

        td {
          padding: 16px 12px;
          border-bottom: 1px solid var(--border);
          font-size: 0.9rem;
          color: #444;
          vertical-align: middle;
        }

        /* Cell content wrapper for consistent alignment */
        .cell-content {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* Status and action wrappers */
        .status-wrapper, .action-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        tr:hover {
          background-color: #fcfcfc;
        }

        tr:hover td {
          background-color: #fcfcfc;
        }

        /* Status Toggle Switch */
        .switch { 
          position: relative; 
          display: inline-block; 
          width: 40px; 
          height: 22px; 
          margin: 0;
        }
        
        .switch input { 
          opacity: 0; 
          width: 0; 
          height: 0; 
        }
        
        .slider { 
          position: absolute; 
          cursor: pointer; 
          top: 0; 
          left: 0; 
          right: 0; 
          bottom: 0; 
          background-color: #ccc; 
          transition: .4s; 
          border-radius: 34px; 
        }
        
        .slider:before { 
          position: absolute; 
          content: ""; 
          height: 16px; 
          width: 16px; 
          left: 3px; 
          bottom: 3px; 
          background-color: white; 
          transition: .4s; 
          border-radius: 50%; 
        }
        
        input:checked + .slider { 
          background-color: var(--success); 
        }
        
        input:checked + .slider:before { 
          transform: translateX(18px); 
        }

        .btn-edit { 
          background: #edf2f7; 
          color: #000; 
          border: none; 
          padding: 8px 12px; 
          border-radius: 6px; 
          cursor: pointer; 
          transition: 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-edit:hover { 
          background: #e2e8f0; 
          color: var(--primary); 
        }
        
        .btn-edit .icon-pencil { 
          width: 16px; 
          height: 16px; 
          fill: currentColor; 
          display: inline-block; 
        }

        /* Responsive table styles */
        @media (max-width: 768px) {
          .table-scroll {
            max-height: 350px;
          }
          
          th, td {
            padding: 12px 8px;
            font-size: 0.85rem;
          }
          
          .cell-content {
            max-width: 150px;
          }
        }

        /* --- MODAL (Popup) Styles --- */
        .modal-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);
          display: none; justify-content: center; align-items: center; z-index: 1000;
          padding: 20px;
        }
        .modal {
          background: var(--white); 
          width: 100%; 
          max-width: 800px; 
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
          animation: modalSlideUp 0.3s ease;
          overflow: hidden;
        }

        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
          color: white;
          border-bottom: none;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 600;
        }

        .modal-close {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          line-height: 1;
          padding: 0;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: rotate(90deg);
        }

        .modal-body {
          padding: 24px;
          max-height: 70vh;
          overflow-y: auto;
        }

        .modal-form-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-row.full-width {
          grid-template-columns: 1fr;
        }

        .form-group.full-width {
          width: 100%;
        }

        .modal .form-group {
          margin-bottom: 0;
        }

        .modal .form-group label {
          font-weight: 500;
          color: var(--dark);
          margin-bottom: 6px;
          font-size: 0.9rem;
        }

        .modal .form-control {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 10px 12px;
          width: 100%;
          transition: all 0.2s;
        }

        .modal .form-control:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(203, 33, 45, 0.1);
          outline: none;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 20px 24px;
          background: #f8f9fa;
          border-top: 1px solid var(--border);
        }

        .btn-cancel {
          background: white;
          color: var(--text-gray);
          border: 1px solid var(--border);
          padding: 10px 24px;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-cancel:hover {
          background: #f1f1f1;
          border-color: #cbd5e0;
        }

        .modal-footer .btn-primary {
          width: auto;
          margin-top: 0;
          padding: 10px 28px;
          border-radius: 8px;
          font-weight: 500;
        }

        /* Responsive styles for modal */
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .modal {
            max-width: 95%;
          }
          
          .modal-body {
            padding: 20px;
          }
          
          .modal-footer {
            padding: 16px 20px;
            flex-direction: column-reverse;
          }
          
          .modal-footer .btn-primary,
          .btn-cancel {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}