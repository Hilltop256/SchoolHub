'use client';

import { useState } from 'react';

const initialPayments = [
  { id: 1, student: 'Mugisha John', amount: 150000, date: '2026-05-03', method: 'Cash', status: 'confirmed', receipt: 'REC-001' },
  { id: 2, student: 'Nakato Sarah', amount: 75000, date: '2026-05-03', method: 'Mobile Money', status: 'confirmed', receipt: 'REC-002' },
  { id: 3, student: 'Kato Peter', amount: 150000, date: '2026-05-02', method: 'Bank Transfer', status: 'pending', receipt: 'REC-003' },
  { id: 4, student: 'Namukasa Grace', amount: 75000, date: '2026-05-02', method: 'Cash', status: 'confirmed', receipt: 'REC-004' },
  { id: 5, student: 'Ssentongo David', amount: 150000, date: '2026-05-01', method: 'Mobile Money', status: 'confirmed', receipt: 'REC-005' },
  { id: 6, student: 'Achieng Rose', amount: 225000, date: '2026-05-01', method: 'Bank Transfer', status: 'confirmed', receipt: 'REC-006' },
  { id: 7, student: 'Okello Brian', amount: 75000, date: '2026-04-30', method: 'Cash', status: 'confirmed', receipt: 'REC-007' },
  { id: 8, student: 'Nantume Faith', amount: 150000, date: '2026-04-30', method: 'Mobile Money', status: 'confirmed', receipt: 'REC-008' },
];

const paymentMethods = ['Cash', 'Mobile Money', 'Bank Transfer', 'Cheque'];
const statuses = ['all', 'confirmed', 'pending', 'cancelled'];

export default function PaymentsPage() {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ student: '', amount: '', method: 'Cash', notes: '' });

  const filtered = payments.filter(p => {
    const matchSearch = p.student.toLowerCase().includes(search.toLowerCase()) || p.receipt.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalCollected = payments.filter(p => p.status === 'confirmed').reduce((sum, p) => sum + p.amount, 0);
  const pending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const todayCollected = payments.filter(p => p.date === '2026-05-03' && p.status === 'confirmed').reduce((sum, p) => sum + p.amount, 0);

  const handleAddPayment = () => {
    if (!formData.student || !formData.amount) return;
    const newPayment = {
      id: payments.length + 1,
      student: formData.student,
      amount: parseInt(formData.amount),
      date: new Date().toISOString().split('T')[0],
      method: formData.method,
      status: 'pending',
      receipt: `REC-${String(payments.length + 1).padStart(3, '0')}`,
    };
    setPayments([newPayment, ...payments]);
    setShowModal(false);
    setFormData({ student: '', amount: '', method: 'Cash', notes: '' });
  };

  const confirmPayment = (id: number) => {
    setPayments(payments.map(p => p.id === id ? { ...p, status: 'confirmed' as const } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-neutral-400 mt-1">Track and manage fee payments</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Record Payment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Today Collected</p>
          <p className="text-2xl font-bold text-green-400">UGX {todayCollected.toLocaleString()}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Total Collected</p>
          <p className="text-2xl font-bold text-white">UGX {(totalCollected / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">UGX {pending.toLocaleString()}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Total Transactions</p>
          <p className="text-2xl font-bold text-white">{payments.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by student or receipt..." className="flex-1 px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 outline-none" />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none">
            {statuses.map(s => <option key={s} value={s}>{s === 'all' ? 'All Status' : s}</option>)}
          </select>
        </div>
      </div>

      {/* Payment list */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-700">
            <thead className="bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Receipt</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase hidden sm:table-cell">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase hidden md:table-cell">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filtered.map(payment => (
                <tr key={payment.id} className="hover:bg-neutral-700/50 transition">
                  <td className="px-6 py-4 text-sm text-primary-400 font-mono">{payment.receipt}</td>
                  <td className="px-6 py-4 text-sm text-white">{payment.student}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300 hidden sm:table-cell">{payment.date}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300 hidden md:table-cell">{payment.method}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-white">UGX {payment.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${payment.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {payment.status === 'pending' && (
                      <button onClick={() => confirmPayment(payment.id)} className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition">Confirm</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 w-full max-w-md">
            <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Record Payment</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Student Name</label>
                <input type="text" value={formData.student} onChange={(e) => setFormData({...formData, student: e.target.value})} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. Mugisha John" />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Amount (UGX)</label>
                <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. 150000" />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Payment Method</label>
                <select value={formData.method} onChange={(e) => setFormData({...formData, method: e.target.value})} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none">
                  {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Notes</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} rows={3} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Optional notes..." />
              </div>
            </div>
            <div className="p-6 border-t border-neutral-700 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition">Cancel</button>
              <button onClick={handleAddPayment} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition">Record Payment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}