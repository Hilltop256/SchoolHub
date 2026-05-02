import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-semibold text-gray-800">School Management System</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 hover:underline">
              Dashboard
            </Link>
            <Link href="/students" className="text-gray-500 hover:text-gray-700 hover:underline">
              Students
            </Link>
            <Link href="/payments" className="text-gray-500 hover:text-gray-700 hover:underline">
              Payments
            </Link>
            <Link href="/attendance" className="text-gray-500 hover:text-gray-700 hover:underline">
              Attendance
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">Admin User</span>
            <button className="ml-3 flex-shrink-0 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;