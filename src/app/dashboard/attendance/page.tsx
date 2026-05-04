'use client';

import { useState } from 'react';

const initialAttendance = [
  { id: 1, name: 'Mugisha John', class: 'P.1', date: '2026-05-03', status: 'present' },
  { id: 2, name: 'Nakato Sarah', class: 'P.1', date: '2026-05-03', status: 'present' },
  { id: 3, name: 'Kato Peter', class: 'P.1', date: '2026-05-03', status: 'absent' },
  { id: 4, name: 'Namukasa Grace', class: 'P.2', date: '2026-05-03', status: 'present' },
  { id: 5, name: 'Ssentongo David', class: 'P.2', date: '2026-05-03', status: 'late' },
  { id: 6, name: 'Achieng Rose', class: 'P.2', date: '2026-05-03', status: 'present' },
  { id: 7, name: 'Okello Brian', class: 'P.3', date: '2026-05-03', status: 'present' },
  { id: 8, name: 'Nantume Faith', class: 'P.3', date: '2026-05-03', status: 'excused' },
];

const classes = ['P.1', 'P.2', 'P.3', 'P.4', 'P.5', 'P.6', 'P.7', 'P.8'];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [selectedClass, setSelectedClass] = useState('P.1');
  const [date, setDate] = useState('2026-05-03');

  const classStudents = ['Mugisha John', 'Nakato Sarah', 'Kato Peter', 'Namukasa Grace', 'Ssentongo David', 'Achieng Rose', 'Okello Brian', 'Nantume Faith'];
  
  const classAttendance = classStudents.map((name, i) => ({
    id: i + 1,
    name,
    class: selectedClass,
    date,
    status: ['present', 'present', 'absent', 'present', 'late', 'present', 'present', 'excused'][i] as string,
  }));

  const present = classAttendance.filter(s => s.status === 'present').length;
  const absent = classAttendance.filter(s => s.status === 'absent').length;
  const late = classAttendance.filter(s => s.status === 'late').length;
  const rate = classAttendance.length > 0 ? Math.round((present / classAttendance.length) * 100) : 0;

  const setStatus = (id: number, status: string) => {
    setAttendance(attendance.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance</h1>
          <p className="text-neutral-400 mt-1">Track daily student attendance</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Class</label>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none">
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Total</p>
          <p className="text-2xl font-bold text-white">{classAttendance.length}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Present</p>
          <p className="text-2xl font-bold text-green-400">{present}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Absent</p>
          <p className="text-2xl font-bold text-red-400">{absent}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Attendance Rate</p>
          <p className="text-2xl font-bold text-primary-400">{rate}%</p>
        </div>
      </div>

      {/* Attendance list */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{selectedClass} Attendance</h3>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition">
            Save Attendance
          </button>
        </div>
        <div className="divide-y divide-neutral-700">
          {classAttendance.map((student) => (
            <div key={student.id} className="px-6 py-4 flex items-center justify-between hover:bg-neutral-700/30 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{student.name}</p>
                  <p className="text-xs text-neutral-400">{student.class}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { status: 'present', label: 'P', color: 'bg-green-500' },
                  { status: 'absent', label: 'A', color: 'bg-red-500' },
                  { status: 'late', label: 'L', color: 'bg-yellow-500' },
                  { status: 'excused', label: 'E', color: 'bg-blue-500' },
                ].map(({ status, label, color }) => (
                  <button
                    key={status}
                    onClick={() => setStatus(student.id, status)}
                    className={`w-10 h-8 rounded-lg text-xs font-bold transition ${
                      student.status === status ? `${color} text-white` : 'bg-neutral-700 text-neutral-400 hover:bg-neutral-600'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All records */}
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-700">
          <h3 className="text-lg font-semibold text-white">Recent Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-700">
            <thead className="bg-neutral-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase hidden sm:table-cell">Class</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase hidden md:table-cell">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {attendance.map(a => (
                <tr key={a.id} className="hover:bg-neutral-700/50">
                  <td className="px-6 py-4 text-sm text-white">{a.name}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300 hidden sm:table-cell">{a.class}</td>
                  <td className="px-6 py-4 text-sm text-neutral-300 hidden md:table-cell">{a.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      a.status === 'present' ? 'bg-green-500/20 text-green-400' :
                      a.status === 'absent' ? 'bg-red-500/20 text-red-400' :
                      a.status === 'late' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}