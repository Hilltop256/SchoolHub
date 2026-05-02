'use client';

import { useState, useEffect } from 'react';

// Reusable UI Components
const UButton = ({ children, onClick, variant = 'primary', className = '' }: any) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-medium transition-all ${variant === 'primary' ? 'bg-primary-600 hover:bg-primary-700 text-white' : variant === 'secondary' ? 'bg-neutral-700 hover:bg-neutral-600 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-white'} ${className}`}
  >
    {children}
  </button>
);

const UInput = ({ value, onChange, placeholder, type = 'text', className = '' }: any) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white ${className}`}
  />
);

const USelect = ({ value, onChange, options, className = '' }: any) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-primary-500 text-white ${className}`}
  >
    {options.map((opt: any) => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const UCard = ({ children, className = '' }: any) => (
  <div className={`bg-neutral-800 rounded-xl border border-neutral-700 p-6 ${className}`}>
    {children}
  </div>
);

const UModal = ({ isOpen, onClose, children, title }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const UStatCard = ({ title, value, icon, trend }: any) => (
  <UCard className="hover:border-primary-500 transition-colors">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-neutral-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 ${trend > 0 ? 'text-success-500' : 'text-danger-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </UCard>
);

const UDataTable = ({ columns, data, className = '' }: any) => (
  <UCard className={className}>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-700">
        <thead className="bg-neutral-900">
          <tr>
            {columns.map((column: any) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-700 bg-neutral-800">
          {data.map((row: any) => (
            <tr key={row.id} className="hover:bg-neutral-700">
              {columns.map((column: any) => (
                <td
                  key={`${row.id}-${column.accessor}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-neutral-100"
                >
                  {typeof column.cell === 'function' ? column.cell(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </UCard>
);

// Login Component
const Login = ({ onLogin }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      onLogin({ id: '1', email, role: 'admin' });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <UCard className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">School Hub</h1>
          <p className="text-neutral-400">Uganda School Management System</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <UButton variant="secondary" className="text-sm py-2">Admin</UButton>
          <UButton variant="secondary" className="text-sm py-2">Bursar</UButton>
          <UButton variant="secondary" className="text-sm py-2">Teacher</UButton>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <UInput value={email} onChange={setEmail} placeholder="Enter email" />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <UInput value={password} onChange={setPassword} type="password" placeholder="Enter password" />
            </div>
            {error && <p className="text-danger-500 text-sm">{error}</p>}
            <UButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </UButton>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-neutral-400">
          <p>Demo credentials:</p>
          <p>admin@sh.ug / admin</p>
          <p>bursar@sh.ug / bursar</p>
          <p>teacher@sh.ug / teacher</p>
        </div>
      </UCard>
    </div>
  );
};

// AppLayout Component
const AppLayout = ({ user, children, onLogout }: any) => (
  <div className="min-h-screen bg-neutral-900">
    <nav className="bg-neutral-800 border-b border-neutral-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-white">School Hub</h1>
            <div className="hidden md:flex space-x-1">
              <AppNavLink to="dashboard" label="Dashboard" />
              <AppNavLink to="students" label="Students" />
              <AppNavLink to="payments" label="Payments" />
              <AppNavLink to="attendance" label="Attendance" />
              <AppNavLink to="report-cards" label="Report Cards" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-neutral-400 hidden sm:block">{user?.role || 'User'}</span>
            <UButton variant="secondary" onClick={onLogout} className="text-sm">Logout</UButton>
          </div>
        </div>
      </div>
    </nav>
    <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
  </div>
);

const AppNavLink = ({ to, label, activePage, onPageChange }: any) => {
  const isActive = activePage === to;
  return (
    <button
      onClick={() => onPageChange(to)}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-primary-600 text-white' : 'text-neutral-300 hover:text-white hover:bg-neutral-700'}`}
    >
      {label}
    </button>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [stats] = useState({
    totalStudents: 1250,
    totalTeachers: 45,
    totalClasses: 24,
    totalRevenue: 45678900,
    outstandingBalance: 2345000,
    attendanceRate: 94,
  });

  const [recentPayments] = useState([
    { id: 1, student: 'Mugisha John', amount: 150000, date: '2026-04-15', method: 'Cash' },
    { id: 2, student: 'Nakato Sarah', amount: 150000, date: '2026-04-14', method: 'Mobile Money' },
    { id: 3, student: 'Kato Peter', amount: 150000, date: '2026-04-14', method: 'Bank Transfer' },
    { id: 4, student: 'Namukasa Grace', amount: 75000, date: '2026-04-13', method: 'Cash' },
    { id: 5, student: 'Ssentongo David', amount: 150000, date: '2026-04-13', method: 'Mobile Money' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="text-sm text-neutral-400">Demo School</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <UStatCard title="Total Students" value={stats.totalStudents.toLocaleString()} icon="👥" trend={5} />
        <UStatCard title="Total Teachers" value={stats.totalTeachers} icon="🏫" trend={2} />
        <UStatCard title="Total Revenue (UGX)" value={stats.totalRevenue.toLocaleString()} icon="💰" trend={12} />
        <UStatCard title="Attendance Rate" value={`${stats.attendanceRate}%`} icon="✅" trend={3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UCard>
          <h3 className="text-lg font-semibold mb-4">Outstanding Fees</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-neutral-400">Total Outstanding</span>
              <span className="font-bold text-danger-500">UGX {stats.outstandingBalance.toLocaleString()}</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div className="bg-danger-500 h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>
          </div>
        </UCard>

        <UCard>
          <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
          <UDataTable
            columns={[
              { key: 'student', header: 'Student' },
              { key: 'amount', header: 'Amount', render: (r: any) => `UGX ${r.amount.toLocaleString()}` },
              { key: 'date', header: 'Date' },
              { key: 'method', header: 'Method' },
            ]}
            data={recentPayments}
          />
        </UCard>
      </div>
    </div>
  );
};

// Main App Component
export default function SchoolHubApp() {
  const [user, setUser] = useState<any>(null);
  const [school, setSchool] = useState<any>(null);

  async function handleLogin(userData: any) {
    setUser(userData);
    setSchool({ name: 'Demo School', code: 'DEMO' });
  }

  function handleLogout() {
    setUser(null);
    setSchool(null);
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <AppLayout user={user} onLogout={handleLogout}>
      <Dashboard />
    </AppLayout>
  );
}
