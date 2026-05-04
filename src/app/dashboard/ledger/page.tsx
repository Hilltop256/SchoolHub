'use client';

import { useState } from 'react';

const initialEntries = [
  { id: 1, date: '2026-05-03', description: 'Term 1 fees collection', account: '4000 - Fee Income', debit: 0, credit: 450000, balance: 450000 },
  { id: 2, date: '2026-05-03', description: 'Office supplies purchase', account: '5000 - Office Expenses', debit: 35000, credit: 0, balance: 415000 },
  { id: 3, date: '2026-05-02', description: 'Mobile Money payment - Nakato', account: '1000 - Cash', debit: 75000, credit: 0, balance: 490000 },
  { id: 4, date: '2026-05-02', description: 'Teacher salary - May', account: '6000 - Salaries', debit: 250000, credit: 0, balance: 240000 },
  { id: 5, date: '2026-05-01', description: 'Bank transfer - Ssentongo', account: '1100 - Bank Account', debit: 150000, credit: 0, balance: 390000 },
  { id: 6, date: '2026-05-01', description: 'Utility bill payment', account: '5100 - Utilities', debit: 45000, credit: 0, balance: 345000 },
  { id: 7, date: '2026-04-30', description: 'Term 1 fees - batch 1', account: '4000 - Fee Income', debit: 0, credit: 300000, balance: 645000 },
  { id: 8, date: '2026-04-30', description: 'Maintenance repair', account: '5200 - Maintenance', debit: 80000, credit: 0, balance: 565000 },
];

export default function LedgerPage() {
  const [entries] = useState(initialEntries);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ description: '', account: '1000 - Cash', type: 'debit', amount: '' });

  const totalDebits = entries.reduce((sum, e) => sum + e.debit, 0);
  const totalCredits = entries.reduce((sum, e) => sum + e.credit, 0);
  const netBalance = totalCredits - totalDebits;

  const filtered = entries.filter(e =>
    e.description.toLowerCase().includes(search.toLowerCase()) ||
    e.account.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Financial Ledger</h1>
          <p className="text-neutral-400 mt-1">Immutable record of all financial transactions</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          New Entry
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Total Income</p>
          <p className="text-2xl font-bold text-green-400">UGX {totalCredits.toLocaleString()}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Total Expenses</p>
          <p className="text-2xl font-bold text-red-400">UGX {totalDebits.toLocaleString()}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Net Balance</p>
          <p className="text-2xl font-bold text-primary-400">UGX {netBalance.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search transactions..." className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 outline-none" />
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-700">
            <thead className="bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase hidden md:table-cell">Account</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase">Debit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase">Credit</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase hidden sm:table-cell">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filtered.map(entry => (
                <tr key={entry.id} className="hover:bg-neutral-700/50 transition">
                  <td className="px-6 py-4 text-sm text-neutral-300">{entry.date}</td>
                  <td className="px-6 py-4 text-sm text-white">{entry.description}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300 hidden md:table-cell">{entry.account}</td>
                  <td className="px-6 py-4 text-sm text-right text-red-400">{entry.debit > 0 ? `UGX ${entry.debit.toLocaleString()}` : '-'}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-400">{entry.credit > 0 ? `UGX ${entry.credit.toLocaleString()}` : '-'}</td>
                  <td className="px-6 py-4 text-sm text-right text-white hidden sm:table-cell">UGX {entry.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 w-full max-w-md">
            <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">New Ledger Entry</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Description</label>
                <input type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Transaction description" />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Account</label>
                <select value={formData.account} onChange={(e) => setFormData({...formData, account: e.target.value})} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none">
                  <option>1000 - Cash</option>
                  <option>1100 - Bank Account</option>
                  <option>4000 - Fee Income</option>
                  <option>5000 - Office Expenses</option>
                  <option>5100 - Utilities</option>
                  <option>5200 - Maintenance</option>
                  <option>6000 - Salaries</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Type</label>
                  <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none">
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Amount</label>
                  <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none" placeholder="0" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-neutral-700 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition">Add Entry</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
