'use client';

import { useState, useEffect, useMemo } from 'react';
import { Student, User, Payment, LedgerEntry, AttendanceRecord, ReportCard, FeeStructure, StudentFee, Class, Subject, Term, AcademicYear, SMSNotification, DashboardStats } from '../types/index';

// Reusable UI Components
const UButton = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }: any) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-medium transition-all ${variant === 'primary' ? 'bg-primary-600 hover:bg-primary-700 text-white' : variant === 'secondary' ? 'bg-neutral-700 hover:bg-neutral-600 text-white' : 'bg-neutral-800 hover:bg-neutral-700 text-white'} ${className}`}
  >
    {children}
  </button>
);

const UInput = ({ value, onChange, placeholder, type = 'text', className = '', label, error }: any) => (
  <div className="mb-4">
    {label && <label className="block text-sm text-neutral-300 mb-1">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-2 bg-neutral-800 border ${error ? 'border-danger-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white ${className}`}
    />
    {error && <p className="text-danger-500 text-sm mt-1">{error}</p>}
  </div>
);

const USelect = ({ value, onChange, options, className = '', label, error }: any) => (
  <div className="mb-4">
    {label && <label className="block text-sm text-neutral-300 mb-1">{label}</label>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 bg-neutral-800 border ${error ? 'border-danger-500' : 'border-neutral-700'} rounded-lg focus:ring-2 focus:ring-primary-500 text-white ${className}`}
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value} className="bg-neutral-800">{opt.label}</option>
      ))}
    </select>
    {error && <p className="text-danger-500 text-sm mt-1">{error}</p>}
  </div>
);

const UCard = ({ children, className = '' }: any) => (
  <div className={`bg-neutral-800 rounded-xl border border-neutral-700 p-6 ${className}`}>
    {children}
  </div>
);

const UModal = ({ isOpen, onClose, children, title, size = 'md' }: any) => {
  if (!isOpen) return null;
  const sizes = { sm: 'max-w-sm', md: 'max-w-2xl', lg: 'max-w-4xl', full: 'w-full' };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className={`${sizes[size as keyof typeof sizes]} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-700">
            <h3 className="text-xl font-semibold text-white">{title}</h3>
            <button onClick={onClose} className="text-neutral-400 hover:text-white text-2xl leading-none">&times;</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const UStatCard = ({ title, value, icon, trend, trendUp = true }: any) => (
  <UCard className="hover:border-primary-500 transition-colors">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-neutral-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1 text-white">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 ${trendUp ? 'text-success-500' : 'text-danger-500'}`}>
            {trendUp ? '↑' : '↓'} {Math.abs(trend)}% from last month
          </p>
        )}
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </UCard>
);

const UDataTable = ({ columns, data, className = '', emptyMessage = 'No data available' }: any) => {
  if (!data || data.length === 0) {
    return (
      <UCard className={className}>
        <div className="py-8 text-center text-neutral-400">{emptyMessage}</div>
      </UCard>
    );
  }
  return (
    <UCard className={className}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-700">
          <thead className="bg-neutral-900">
            <tr>
              {columns.map((column: any, colIndex: number) => (
                <th key={`col-${column.key || column.accessor}-${colIndex}`} className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-700 bg-neutral-800">
            {data.map((row: any, rowIndex: number) => (
              <tr key={row.id || `row-${rowIndex}`} className="hover:bg-neutral-700 transition-colors">
                {columns.map((column: any, colIndex: number) => {
                  const key = column.key || column.accessor;
                  const value = row[key];
                  const cellContent = column.render ? column.render(value, row) : (value !== null && value !== undefined ? String(value) : '-');
                  return (
                    <td key={`${row.id || `row-${rowIndex}`}-${colIndex}`} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-100">
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </UCard>
  );
};

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
              <AppNavLink to="ledger" label="Ledger" />
              <AppNavLink to="attendance" label="Attendance" />
              <AppNavLink to="reports" label="Reports" />
              <AppNavLink to="sms" label="SMS" />
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

// Student Management Component
const StudentManagement = () => {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, name: 'Mugisha John', grade: 'Senior 4', email: 'john@sh.ug', phone: '0701234567', attendance: '95%', fees: 'UGX 450,000', status: 'Active' },
    { id: 2, name: 'Nakato Sarah', grade: 'Senior 3', email: 'sarah@sh.ug', phone: '0702345678', attendance: '98%', fees: 'UGX 450,000', status: 'Active' },
    { id: 3, name: 'Kato Peter', grade: 'Senior 5', email: 'peter@sh.ug', phone: '0703456789', attendance: '88%', fees: 'UGX 500,000', status: 'Active' },
  ]);

  const grades = ['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4', 'Senior 5', 'Senior 6'];

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (gradeFilter === '' || s.grade === gradeFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <UButton variant="primary" onClick={() => setShowModal(true)}>Add Student</UButton>
      </div>

      <UCard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <UInput
            value={search}
            onChange={setSearch}
            placeholder="Search students..."
            label="Search"
          />
          <USelect
            value={gradeFilter}
            onChange={setGradeFilter}
            options={[{ value: '', label: 'All Grades' }, ...grades.map(g => ({ value: g, label: g }))]}
            label="Filter by Grade"
          />
        </div>

        <UDataTable
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'grade', header: 'Grade' },
            { key: 'email', header: 'Email' },
            { key: 'phone', header: 'Phone' },
            { key: 'attendance', header: 'Attendance' },
            { key: 'fees', header: 'Fees' },
            { key: 'status', header: 'Status', cell: (v: string) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${v === 'Active' ? 'bg-success-500 bg-opacity-20 text-success-500' : 'bg-neutral-700 text-neutral-400'}`}>
                {v}
              </span>
            )},
          ]}
          data={filteredStudents}
        />
      </UCard>

      <UModal isOpen={showModal} onClose={() => setShowModal(false)} title="Add New Student">
        <form className="space-y-4">
          <UInput label="First Name" placeholder="First name" value="" onChange={() => {}} />
          <UInput label="Last Name" placeholder="Last name" value="" onChange={() => {}} />
          <UInput label="Email" type="email" placeholder="Email address" value="" onChange={() => {}} />
          <UInput label="Phone" type="tel" placeholder="Phone number" value="" onChange={() => {}} />
          <USelect label="Grade" value={grades[0]} onChange={() => {}} options={grades.map(g => ({ value: g, label: g }))} />
          <div className="flex justify-end space-x-3 pt-4">
            <UButton variant="secondary" onClick={() => setShowModal(false)}>Cancel</UButton>
            <UButton variant="primary">Save Student</UButton>
          </div>
        </form>
      </UModal>
    </div>
  );
};

// Payment Management Component
const PaymentManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [payments] = useState([
    { id: 1, student: 'Mugisha John', amount: 150000, date: '2026-04-15', method: 'Cash', status: 'confirmed' },
    { id: 2, student: 'Nakato Sarah', amount: 150000, date: '2026-04-14', method: 'Mobile Money', status: 'confirmed' },
    { id: 3, student: 'Kato Peter', amount: 200000, date: '2026-04-10', method: 'Bank Transfer', status: 'pending' },
  ]);

  const statuses = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const methods = ['Cash', 'Bank Transfer', 'Mobile Money', 'Cheque'];

  const [paymentForm, setPaymentForm] = useState({ student: '', amount: '', date: '', method: '', reference: '', description: '' });

  const filteredPayments = payments.filter(p =>
    p.student.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === '' || p.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Payment Management</h2>
        <UButton variant="primary" onClick={() => setShowModal(true)}>Record Payment</UButton>
      </div>

      <UCard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <UInput
            value={search}
            onChange={setSearch}
            placeholder="Search by student..."
            label="Search"
          />
          <USelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={statuses}
            label="Filter by Status"
          />
        </div>

        <UDataTable
          columns={[
            { key: 'student', header: 'Student' },
            { key: 'amount', header: 'Amount', cell: (v: number) => `UGX ${v.toLocaleString()}` },
            { key: 'date', header: 'Date' },
            { key: 'method', header: 'Method' },
            { key: 'status', header: 'Status', cell: (v: string) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                v === 'confirmed' ? 'bg-success-500 bg-opacity-20 text-success-500' :
                v === 'pending' ? 'bg-yellow-500 bg-opacity-20 text-yellow-500' :
                'bg-danger-500 bg-opacity-20 text-danger-500'
              }`}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </span>
            )},
          ]}
          data={filteredPayments}
        />
      </UCard>

      <UModal isOpen={showModal} onClose={() => setShowModal(false)} title="Record New Payment" size="lg">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <USelect
              label="Student"
              value={paymentForm.student}
              onChange={(v: string) => setPaymentForm({ ...paymentForm, student: v })}
              options={[
                { value: '', label: 'Select student' },
                { value: '1', label: 'Mugisha John - Senior 4' },
                { value: '2', label: 'Nakato Sarah - Senior 3' },
                { value: '3', label: 'Kato Peter - Senior 5' },
              ]}
            />
            <UInput
              label="Amount (UGX)"
              type="number"
              placeholder="Enter amount"
              value={paymentForm.amount}
              onChange={(v: string) => setPaymentForm({ ...paymentForm, amount: v })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UInput
              label="Payment Date"
              type="date"
              value={paymentForm.date}
              onChange={(v: string) => setPaymentForm({ ...paymentForm, date: v })}
            />
            <USelect
              label="Payment Method"
              value={paymentForm.method}
              onChange={(v: string) => setPaymentForm({ ...paymentForm, method: v })}
              options={[{ value: '', label: 'Select method' }, ...methods.map(m => ({ value: m, label: m }))]}
            />
          </div>
          <UInput
            label="Reference/Transaction ID"
            placeholder="Enter reference number"
            value={paymentForm.reference}
            onChange={(v: string) => setPaymentForm({ ...paymentForm, reference: v })}
          />
          <UInput
            label="Description"
            placeholder="Optional description"
            value={paymentForm.description}
            onChange={(v: string) => setPaymentForm({ ...paymentForm, description: v })}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <UButton variant="secondary" onClick={() => setShowModal(false)}>Cancel</UButton>
            <UButton variant="primary">Confirm Payment</UButton>
          </div>
        </form>
      </UModal>
    </div>
  );
};

// Ledger Management Component
const LedgerManagement = () => {
  const [search, setSearch] = useState('');
  const [accountFilter, setAccountFilter] = useState('');

  const [ledgerEntries] = useState([
    { id: 1, date: '2026-04-15', account: 'Tuition Revenue', code: '4000', description: 'Payment from Mugisha John - Term 1', debit: 0, credit: 150000, balance: 1250000 },
    { id: 2, date: '2026-04-14', account: 'Tuition Revenue', code: '4000', description: 'Payment from Nakato Sarah - Term 1', debit: 0, credit: 150000, balance: 1100000 },
    { id: 3, date: '2026-04-10', account: 'Office Supplies', code: '5000', description: 'Purchase of stationery', debit: 150000, credit: 0, balance: 950000 },
    { id: 4, date: '2026-04-08', account: 'Tuition Revenue', code: '4000', description: 'Payment from Kato Peter - Term 1', debit: 0, credit: 200000, balance: 1100000 },
  ]);

  const accounts = ['All Accounts', 'Tuition Revenue', 'Office Supplies', 'Utilities', 'Salaries'];

  const filteredEntries = ledgerEntries.filter(e =>
    e.description.toLowerCase().includes(search.toLowerCase()) &&
    (accountFilter === '' || accountFilter === 'All Accounts' || e.account === accountFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Ledger Management</h2>
        <UButton variant="secondary">Export Ledger</UButton>
      </div>

      <UCard>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <UInput
            value={search}
            onChange={setSearch}
            placeholder="Search entries..."
            label="Search"
          />
          <USelect
            value={accountFilter}
            onChange={setAccountFilter}
            options={accounts.map(a => ({ value: a, label: a }))}
            label="Filter by Account"
          />
        </div>

        <UDataTable
          columns={[
            { key: 'date', header: 'Date' },
            { key: 'code', header: 'Account Code' },
            { key: 'account', header: 'Account' },
            { key: 'description', header: 'Description' },
            { key: 'debit', header: 'Debit (UGX)', cell: (v: number) => v > 0 ? v.toLocaleString() : '-' },
            { key: 'credit', header: 'Credit (UGX)', cell: (v: number) => v > 0 ? v.toLocaleString() : '-' },
            { key: 'balance', header: 'Balance (UGX)', cell: (v: number) => v.toLocaleString() },
          ]}
          data={filteredEntries}
        />
      </UCard>
    </div>
  );
};

// Attendance Management Component
const AttendanceManagement = () => {
  const [date, setDate] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const grades = ['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4', 'Senior 5', 'Senior 6'];

  const [attendanceData] = useState([
    { id: 1, name: 'Mugisha John', grade: 'Senior 4', status: 'present' },
    { id: 2, name: 'Nakato Sarah', grade: 'Senior 3', status: 'present' },
    { id: 3, name: 'Kato Peter', grade: 'Senior 5', status: 'absent' },
    { id: 4, name: 'Namukasa Grace', grade: 'Senior 4', status: 'late' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-success-500 bg-opacity-20 text-success-500';
      case 'absent': return 'bg-danger-500 bg-opacity-20 text-danger-500';
      case 'late': return 'bg-yellow-500 bg-opacity-20 text-yellow-500';
      case 'excused': return 'bg-primary-500 bg-opacity-20 text-primary-500';
      default: return 'bg-neutral-700 text-neutral-400';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredData = attendanceData.filter(a =>
    (gradeFilter === '' || a.grade === gradeFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <UButton variant="primary" onClick={() => setShowModal(true)}>Take Attendance</UButton>
      </div>

      <UCard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <UInput
            value={date}
            onChange={setDate}
            type="date"
            label="Select Date"
          />
          <USelect
            value={gradeFilter}
            onChange={setGradeFilter}
            options={[{ value: '', label: 'All Grades' }, ...grades.map(g => ({ value: g, label: g }))]}
            label="Filter by Grade"
          />
        </div>

        {date && (
          <div className="mb-4 text-lg text-white">
            Attendance for {new Date(date).toLocaleDateString()}
          </div>
        )}

        <UDataTable
          columns={[
            { key: 'name', header: 'Student Name' },
            { key: 'grade', header: 'Grade' },
            { key: 'status', header: 'Status', cell: (v: string) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(v)}`}>
                {getStatusLabel(v)}
              </span>
            )},
          ]}
          data={filteredData}
        />
      </UCard>

      <UModal isOpen={showModal} onClose={() => setShowModal(false)} title="Take Attendance" size="lg">
        <div className="space-y-4">
          <UInput
            label="Date"
            type="date"
            value={date}
            onChange={setDate}
          />
          <div className="max-h-96 overflow-y-auto">
            {attendanceData.map((student) => (
              <div key={student.id} className="flex items-center justify-between py-3 border-b border-neutral-700">
                <div>
                  <div className="font-medium text-white">{student.name}</div>
                  <div className="text-sm text-neutral-400">{student.grade}</div>
                </div>
                <USelect
                  value="present"
                  onChange={() => {}}
                  options={[
                    { value: 'present', label: 'Present' },
                    { value: 'absent', label: 'Absent' },
                    { value: 'late', label: 'Late' },
                    { value: 'excused', label: 'Excused' },
                  ]}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <UButton variant="secondary" onClick={() => setShowModal(false)}>Cancel</UButton>
            <UButton variant="primary">Submit Attendance</UButton>
          </div>
        </div>
      </UModal>
    </div>
  );
};

// Report Cards Component
const ReportCards = () => {
  const [termFilter, setTermFilter] = useState('');

  const terms = ['Term 1', 'Term 2', 'Term 3'];

  const [reportCards] = useState([
    { id: 1, student: 'Mugisha John', currentGrade: 'Senior 4', term: 'Term 1', year: '2024', avgScore: 85, grade: 'A', position: 5 },
    { id: 2, student: 'Nakato Sarah', currentGrade: 'Senior 3', term: 'Term 1', year: '2024', avgScore: 78, grade: 'B', position: 12 },
    { id: 3, student: 'Kato Peter', currentGrade: 'Senior 5', term: 'Term 2', year: '2024', avgScore: 92, grade: 'A', position: 2 },
  ]);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-success-500 bg-opacity-20 text-success-500';
      case 'B': return 'bg-primary-500 bg-opacity-20 text-primary-500';
      case 'C': return 'bg-yellow-500 bg-opacity-20 text-yellow-500';
      case 'D': return 'bg-orange-500 bg-opacity-20 text-orange-500';
      case 'E': return 'bg-danger-500 bg-opacity-20 text-danger-500';
      case 'F': return 'bg-danger-500 bg-opacity-20 text-danger-500';
      default: return 'bg-neutral-700 text-neutral-400';
    }
  };

  const filteredCards = reportCards.filter(r =>
    termFilter === '' || r.term === termFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Report Card Management</h2>
        <UButton variant="primary">Generate Report</UButton>
      </div>

      <UCard>
        <div className="mb-6">
          <USelect
            value={termFilter}
            onChange={setTermFilter}
            options={[{ value: '', label: 'All Terms' }, ...terms.map(t => ({ value: t, label: t }))]}
            label="Filter by Term"
          />
        </div>

        <UDataTable
          columns={[
            { key: 'student', header: 'Student' },
            { key: 'grade', header: 'Current Grade' },
            { key: 'term', header: 'Term' },
            { key: 'year', header: 'Academic Year' },
            { key: 'avgScore', header: 'Average Score', cell: (v: number) => `${v}%` },
            { key: 'grade', header: 'Grade', cell: (v: string) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(v)}`}>
                {v}
              </span>
            )},
            { key: 'position', header: 'Position' },
          ]}
          data={filteredCards}
        />
      </UCard>
    </div>
  );
};

// SMS Management Component
const SMSManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [smsList] = useState([
    { id: 1, recipient: '+256701234567', message: 'Term 1 fees payment due', status: 'sent', date: '2026-04-15' },
    { id: 2, recipient: '+256702345678', message: 'Attendance report available', status: 'sent', date: '2026-04-14' },
    { id: 3, recipient: '+256703456789', message: 'Parent-teacher meeting scheduled', status: 'pending', date: '2026-04-10' },
  ]);

  const statuses = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'sent', label: 'Sent' },
    { value: 'failed', label: 'Failed' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-success-500 bg-opacity-20 text-success-500';
      case 'pending': return 'bg-yellow-500 bg-opacity-20 text-yellow-500';
      case 'failed': return 'bg-danger-500 bg-opacity-20 text-danger-500';
      default: return 'bg-neutral-700 text-neutral-400';
    }
  };

  const filteredSMS = smsList.filter(s =>
    s.recipient.includes(search) &&
    (statusFilter === '' || s.status === statusFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">SMS Management</h2>
        <UButton variant="primary" onClick={() => setShowModal(true)}>Send SMS</UButton>
      </div>

      <UCard>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <UInput
            value={search}
            onChange={setSearch}
            placeholder="Search by phone..."
            label="Search"
          />
          <USelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={statuses}
            label="Filter by Status"
          />
        </div>

        <UDataTable
          columns={[
            { key: 'recipient', header: 'Recipient' },
            { key: 'message', header: 'Message' },
            { key: 'date', header: 'Date' },
            { key: 'status', header: 'Status', cell: (v: string) => (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(v)}`}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </span>
            )},
          ]}
          data={filteredSMS}
        />
      </UCard>

      <UModal isOpen={showModal} onClose={() => setShowModal(false)} title="Send SMS" size="lg">
        <form className="space-y-4">
          <USelect
            label="Recipient Type"
            value="all"
            onChange={() => {}}
            options={[
              { value: 'all', label: 'All Parents' },
              { value: 'grade', label: 'Specific Grade' },
              { value: 'individual', label: 'Individual Student' },
            ]}
          />
          <USelect
            label="Grade (Optional)"
            value=""
            onChange={() => {}}
            options={[
              { value: '', label: 'Select grade' },
              ...['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4', 'Senior 5', 'Senior 6'].map(g => ({ value: g, label: g }))
            ]}
          />
          <UInput
            label="Message"
            type="textarea"
            placeholder="Enter your message..."
            value=""
            onChange={() => {}}
          />
          <div className="text-sm text-neutral-400">
            Character count: 0 / 160
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <UButton variant="secondary" onClick={() => setShowModal(false)}>Cancel</UButton>
            <UButton variant="primary">Send SMS</UButton>
          </div>
        </form>
      </UModal>
    </div>
  );
};

// Main App Component
export default function SchoolHubApp() {
  const [user, setUser] = useState<any>(null);
  const [school, setSchool] = useState<any>(null);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
    document.title = activePage === 'dashboard' ? 'Dashboard - School Hub' : `${activePage.charAt(0).toUpperCase() + activePage.slice(1)} - School Hub`;
  }, [activePage]);

  async function handleLogin(userData: any) {
    setUser(userData);
    setSchool({ name: 'Demo School', code: 'DEMO' });
    setActivePage('dashboard');
  }

  function handleLogout() {
    setUser(null);
    setSchool(null);
    setActivePage('dashboard');
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'ledger':
        return <LedgerManagement />;
      case 'attendance':
        return <AttendanceManagement />;
      case 'reports':
        return <ReportCards />;
      case 'sms':
        return <SMSManagement />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const handleNavChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <AppLayout user={user} onLogout={handleLogout}>
      {renderPage()}
    </AppLayout>
  );
}
