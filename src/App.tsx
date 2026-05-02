import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { User, School, Student, Payment, LedgerEntry, AttendanceRecord, ReportCard, SMSNotification, FeeStructure, Class, Term, AcademicYear, Subject } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

export { UButton, UInput, USelect, UCard, UModal, UStatCard, UDataTable };