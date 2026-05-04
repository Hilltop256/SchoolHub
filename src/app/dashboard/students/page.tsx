'use client';

import { useState } from 'react';

const initialStudents = [
  { id: 1, number: 'STD-001', name: 'Mugisha John', class: 'P.1', gender: 'Male', phone: '0772-123456', parent: 'Mugisha Peter', fees: 150000, paid: 150000, status: 'active' },
  { id: 2, number: 'STD-002', name: 'Nakato Sarah', class: 'P.2', gender: 'Female', phone: '0782-234567', parent: 'Nakato Mary', fees: 150000, paid: 75000, status: 'active' },
  { id: 3, number: 'STD-003', name: 'Kato Peter', class: 'P.3', gender: 'Male', phone: '0703-345678', parent: 'Kato James', fees: 150000, paid: 150000, status: 'active' },
  { id: 4, number: 'STD-004', name: 'Namukasa Grace', class: 'P.4', gender: 'Female', phone: '0774-456789', parent: 'Namukasa Alice', fees: 150000, paid: 0, status: 'active' },
  { id: 5, number: 'STD-005', name: 'Ssentongo David', class: 'P.5', gender: 'Male', phone: '0785-567890', parent: 'Ssentongo Robert', fees: 150000, paid: 150000, status: 'active' },
  { id: 6, number: 'STD-006', name: 'Achieng Rose', class: 'P.6', gender: 'Female', phone: '0706-678901', parent: 'Achieng Jane', fees: 150000, paid: 150000, status: 'active' },
  { id: 7, number: 'STD-007', name: 'Okello Brian', class: 'P.1', gender: 'Male', phone: '0777-789012', parent: 'Okello Samuel', fees: 150000, paid: 75000, status: 'active' },
  { id: 8, number: 'STD-008', name: 'Nantume Faith', class: 'P.2', gender: 'Female', phone: '0788-890123', parent: 'Nantume Grace', fees: 150000, paid: 150000, status: 'active' },
];

export default function StudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [formData, setFormData] = useState({ name: '', class: 'P.1', gender: 'Male', phone: '', parent: '' });

  const classes = ['all', 'P.1', 'P.2', 'P.3', 'P.4', 'P.5', 'P.6', 'P.7', 'P.8'];

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.number.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass === 'all' || s.class === filterClass;
    return matchSearch && matchClass;
  });

  const openAddModal = () => {
    setEditingStudent(null);
    setFormData({ name: '', class: 'P.1', gender: 'Male', phone: '', parent: '' });
    setShowModal(true);
  };

  const openEditModal = (student: any) => {
    setEditingStudent(student);
    setFormData({ name: student.name, class: student.class, gender: student.gender, phone: student.phone, parent: student.parent });
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent.id ? { ...s, ...formData } : s));
    } else {
      const newStudent = {
        id: students.length + 1,
        number: `STD-${String(students.length + 1).padStart(3, '0')}`,
        ...formData,
        fees: 150000,
        paid: 0,
        status: 'active',
      };
      setStudents([...students, newStudent]);
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const totalFees = students.reduce((sum, s) => sum + s.fees, 0);
  const totalPaid = students.reduce((sum, s) => sum + s.paid, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Students</h1>
          <p className="text-neutral-400 mt-1">Manage student records and information</p>
        </div>
        <button onClick={openAddModal} className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Total Students</p>
          <p className="text-2xl font-bold text-white">{totalStudents}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Active</p>
          <p className="text-2xl font-bold text-green-400">{activeStudents}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Total Fees</p>
          <p className="text-2xl font-bold text-white">UGX {(totalFees / 1000).toFixed(0)}K</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Fees Paid</p>
          <p className="text-2xl font-bold text-green-400">UGX {(totalPaid / 1000).toFixed(0)}K</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name or number..."
              className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          >
            {classes.map(c => <option key={c} value={c}>{c === 'all' ? 'All Classes' : c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-700">
            <thead className="bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider hidden sm:table-cell">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider hidden md:table-cell">Parent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Fees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider hidden lg:table-cell">Balance</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-neutral-700/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center text-sm text-white font-medium">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{student.name}</p>
                        <p className="text-xs text-neutral-400">{student.number}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{student.class}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300 hidden sm:table-cell">{student.gender}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300 hidden md:table-cell">{student.parent}</td>
                  <td className="px-6 py-4 text-sm text-white">UGX {student.fees.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm hidden lg:table-cell">
                    <span className={`${student.fees - student.paid > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      UGX {(student.fees - student.paid).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditModal(student)} className="p-1 text-neutral-400 hover:text-primary-400 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button onClick={() => handleDelete(student.id)} className="p-1 text-neutral-400 hover:text-red-400 transition">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="py-12 text-center text-neutral-400">
            <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p>No students found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{editingStudent ? 'Edit Student' : 'Add New Student'}</h3>
              <button onClick={() => setShowModal(false)} className="text-neutral-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="e.g. Mugisha John"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Class</label>
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    {['P.1','P.2','P.3','P.4','P.5','P.6','P.7','P.8'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-300 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Parent Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="e.g. 0772-123456"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Parent Name</label>
                <input
                  type="text"
                  value={formData.parent}
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none"
                  placeholder="e.g. Mugisha Peter"
                />
              </div>
            </div>
            <div className="p-6 border-t border-neutral-700 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition">
                {editingStudent ? 'Update' : 'Add Student'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}