import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="flex-shrink-0 flex items-center h-16 border-b border-gray-200">
        <span className="ml-6 text-xl font-semibold text-gray-800">Navigation</span>
      </div>
      <nav className="mt-6 space-y-2 px-3">
        <Link href="/dashboard" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
          Dashboard
        </Link>
        <Link href="/students" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
          Student Management
        </Link>
        <Link href="/payments" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
          Payment Management
        </Link>
        <Link href="/ledger" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
          Ledger Management
        </Link>
        <Link href="/attendance" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
          Attendance Management
        </Link>
        <Link href="/report-cards" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
          Report Card Management
        </Link>
        <Link href="/sms" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
          SMS Management
        </Link>
        <Link href="/settings" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;