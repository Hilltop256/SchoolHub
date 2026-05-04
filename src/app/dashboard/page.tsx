'use client';

import { useState } from 'react';

// Mock data
const mockStats = {
  totalStudents: 1247,
  totalTeachers: 48,
  totalClasses: 24,
  totalRevenue: 45678900,
  outstandingBalance: 2345000,
  attendanceRate: 94,
  monthlyGrowth: 5.2,
};

const mockRecentPayments = [
  { id: 1, student: 'Mugisha John', amount: 150000, date: '2026-05-03', method: 'Cash', status: 'confirmed' },
  { id: 2, student: 'Nakato Sarah', amount: 150000, date: '2026-05-03', method: 'Mobile Money', status: 'confirmed' },
  { id: 3, student: 'Kato Peter', amount: 150000, date: '2026-05-02', method: 'Bank Transfer', status: 'pending' },
  { id: 4, student: 'Namukasa Grace', amount: 75000, date: '2026-05-02', method: 'Cash', status: 'confirmed' },
  { id: 5, student: 'Ssentongo David', amount: 150000, date: '2026-05-01', method: 'Mobile Money', status: 'confirmed' },
  { id: 6, student: 'Achieng Rose', amount: 225000, date: '2026-05-01', method: 'Bank Transfer', status: 'confirmed' },
];

const mockRecentAttendance = [
  { class: 'P.1', present: 38, absent: 2, late: 1, rate: 95 },
  { class: 'P.2', present: 35, absent: 4, late: 2, rate: 88 },
  { class: 'P.3', present: 40, absent: 1, late: 0, rate: 98 },
  { class: 'P.4', present: 32, absent: 5, late: 3, rate: 80 },
  { class: 'P.5', present: 36, absent: 3, late: 1, rate: 90 },
  { class: 'P.6', present: 34, absent: 4, late: 2, rate: 85 },
];

const mockRevenueData = [
  { month: 'Jan', amount: 8500000 },
  { month: 'Feb', amount: 9200000 },
  { month: 'Mar', amount: 7800000 },
  { month: 'Apr', amount: 10500000 },
  { month: 'May', amount: 9700000 },
  { month: 'Jun', amount: 11200000 },
];

const StatCard = ({ title, value, icon, trend, color = 'primary' }: any) => {
  const colors: Record<string, string> = {
    primary: 'bg-primary-500/20 text-primary-400',
    success: 'bg-green-500/20 text-green-400',
    danger: 'bg-red-500/20 text-red-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
  };
  return (
    <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-neutral-400 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default function DashboardPage() {
  const [selectedTerm] = useState('Term 1, 2026');
  const maxRevenue = Math.max(...mockRevenueData.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-neutral-400 mt-1">Welcome back! Here is what is happening at your school today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white">
            <option>{selectedTerm}</option>
            <option>Term 2, 2025</option>
          </select>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={mockStats.totalStudents.toLocaleString()}
          icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          trend={mockStats.monthlyGrowth}
          color="primary"
        />
        <StatCard
          title="Total Revenue"
          value={`UGX ${(mockStats.totalRevenue / 1000000).toFixed(1)}M`}
          icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          trend={12}
          color="success"
        />
        <StatCard
          title="Outstanding Fees"
          value={`UGX ${(mockStats.outstandingBalance / 1000).toFixed(0)}K`}
          icon="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          trend={-8}
          color="danger"
        />
        <StatCard
          title="Attendance Rate"
          value={`${mockStats.attendanceRate}%`}
          icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          trend={3}
          color="warning"
        />
      </div>

      {/* Charts and activity grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue chart */}
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Overview</h3>
          <div className="space-y-3">
            {mockRevenueData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm text-neutral-400 w-10">{item.month}</span>
                <div className="flex-1 h-8 bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-500"
                    style={{ width: `${(item.amount / maxRevenue) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-white w-24 text-right">
                  UGX {(item.amount / 1000000).toFixed(1)}M
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent payments */}
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Payments</h3>
            <a href="/dashboard/payments" className="text-sm text-primary-400 hover:text-primary-300">View all</a>
          </div>
          <div className="space-y-3">
            {mockRecentPayments.slice(0, 5).map(payment => (
              <div key={payment.id} className="flex items-center justify-between py-2 border-b border-neutral-700 last:border-0">
                <div>
                  <p className="text-sm text-white font-medium">{payment.student}</p>
                  <p className="text-xs text-neutral-400">{payment.date} · {payment.method}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">UGX {payment.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    payment.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance by class */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Attendance by Class</h3>
          <a href="/dashboard/attendance" className="text-sm text-primary-400 hover:text-primary-300">Manage</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockRecentAttendance.map((item, i) => (
            <div key={i} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#262626"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={item.rate >= 90 ? '#10b981' : item.rate >= 80 ? '#f59e0b' : '#ef4444'}
                    strokeWidth="3"
                    strokeDasharray={`${item.rate}, 100`}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                  {item.rate}%
                </span>
              </div>
              <p className="text-sm font-medium text-white">{item.class}</p>
              <p className="text-xs text-neutral-400">{item.present}/{item.present + item.absent}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Add Student', href: '/dashboard/students', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'bg-primary-600 hover:bg-primary-700' },
          { label: 'Record Payment', href: '/dashboard/payments', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', color: 'bg-green-600 hover:bg-green-700' },
          { label: 'Take Attendance', href: '/dashboard/attendance', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', color: 'bg-yellow-600 hover:bg-yellow-700' },
          { label: 'Send SMS', href: '/dashboard/sms', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', color: 'bg-purple-600 hover:bg-purple-700' },
        ].map((action, i) => (
          <a
            key={i}
            href={action.href}
            className={`${action.color} text-white rounded-xl p-4 text-center transition-all hover:scale-105`}
          >
            <svg className="w-6 h-6 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
            </svg>
            <span className="text-sm font-medium">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}