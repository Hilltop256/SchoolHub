'use client';

import { useState } from 'react';

const mockReportCards = [
  { id: 1, student: 'Mugisha John', class: 'P.1', term: 'Term 1', year: 2026, total: 420, grade: 'A', position: 3, subjects: [{ name: 'Mathematics', score: 85 }, { name: 'English', score: 78 }, { name: 'Science', score: 82 }, { name: 'SST', score: 75 }] },
  { id: 2, student: 'Nakato Sarah', class: 'P.2', term: 'Term 1', year: 2026, total: 380, grade: 'B+', position: 8, subjects: [{ name: 'Mathematics', score: 72 }, { name: 'English', score: 80 }, { name: 'Science', score: 68 }, { name: 'SST', score: 60 }] },
  { id: 3, student: 'Kato Peter', class: 'P.3', term: 'Term 1', year: 2026, total: 450, grade: 'A+', position: 1, subjects: [{ name: 'Mathematics', score: 95 }, { name: 'English', score: 88 }, { name: 'Science', score: 92 }, { name: 'SST', score: 75 }] },
  { id: 4, student: 'Namukasa Grace', class: 'P.4', term: 'Term 1', year: 2026, total: 340, grade: 'B', position: 12, subjects: [{ name: 'Mathematics', score: 65 }, { name: 'English', score: 70 }, { name: 'Science', score: 60 }, { name: 'SST', score: 55 }] },
  { id: 5, student: 'Ssentongo David', class: 'P.5', term: 'Term 1', year: 2026, total: 410, grade: 'A-', position: 5, subjects: [{ name: 'Mathematics', score: 80 }, { name: 'English', score: 82 }, { name: 'Science', score: 78 }, { name: 'SST', score: 70 }] },
];

const classes = ['P.1', 'P.2', 'P.3', 'P.4', 'P.5', 'P.6', 'P.7', 'P.8'];

function getGradeColor(grade: string) {
  if (grade.startsWith('A')) return 'text-green-400';
  if (grade.startsWith('B')) return 'text-blue-400';
  if (grade.startsWith('C')) return 'text-yellow-400';
  return 'text-red-400';
}

export default function ReportsPage() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedTerm] = useState('Term 1, 2026');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [search, setSearch] = useState('');

  const filtered = mockReportCards.filter(r => {
    const matchClass = selectedClass === 'all' || r.class === selectedClass;
    const matchSearch = r.student.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  const averageScore = mockReportCards.length > 0
    ? Math.round(mockReportCards.reduce((sum, r) => sum + r.total, 0) / mockReportCards.length)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Report Cards</h1>
          <p className="text-neutral-400 mt-1">View and generate academic report cards</p>
        </div>
        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          Export Reports
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Total Reports</p>
          <p className="text-2xl font-bold text-white">{mockReportCards.length}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Average Score</p>
          <p className="text-2xl font-bold text-primary-400">{averageScore}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">A Grades</p>
          <p className="text-2xl font-bold text-green-400">{mockReportCards.filter(r => r.grade.startsWith('A')).length}</p>
        </div>
        <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
          <p className="text-sm text-neutral-400">Published</p>
          <p className="text-2xl font-bold text-white">{mockReportCards.length}</p>
        </div>
      </div>

      <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by student name..." className="flex-1 px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-primary-500 outline-none" />
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:ring-2 focus:ring-primary-500 outline-none">
            <option value="all">All Classes</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(report => (
          <div key={report.id} className="bg-neutral-800 rounded-xl border border-neutral-700 p-6 hover:border-primary-500 transition cursor-pointer" onClick={() => setSelectedReport(report)}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center text-white font-medium">{report.student.charAt(0)}</div>
                <div>
                  <p className="text-sm font-semibold text-white">{report.student}</p>
                  <p className="text-xs text-neutral-400">{report.class}</p>
                </div>
              </div>
              <span className={`text-lg font-bold ${getGradeColor(report.grade)}`}>{report.grade}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-xs text-neutral-400">Total</p>
                <p className="text-sm font-semibold text-white">{report.total}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Position</p>
                <p className="text-sm font-semibold text-white">{report.position}{['st','nd','rd'][report.position-1] || 'th'}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Avg</p>
                <p className="text-sm font-semibold text-white">{Math.round(report.total / report.subjects.length)}%</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-700">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">{report.term} {report.year}</span>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Published</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-xl border border-neutral-700 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-700 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Report Card - {selectedReport.student}</h3>
              <button onClick={() => setSelectedReport(null)} className="text-neutral-400 hover:text-white"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-neutral-900 rounded-lg">
                  <p className="text-xs text-neutral-400">Total Score</p>
                  <p className="text-xl font-bold text-white">{selectedReport.total}</p>
                </div>
                <div className="text-center p-3 bg-neutral-900 rounded-lg">
                  <p className="text-xs text-neutral-400">Grade</p>
                  <p className={`text-xl font-bold ${getGradeColor(selectedReport.grade)}`}>{selectedReport.grade}</p>
                </div>
                <div className="text-center p-3 bg-neutral-900 rounded-lg">
                  <p className="text-xs text-neutral-400">Position</p>
                  <p className="text-xl font-bold text-white">{selectedReport.position}</p>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-neutral-300 mb-3">Subject Breakdown</h4>
              <div className="space-y-3">
                {selectedReport.subjects.map((subject: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-white">{subject.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${subject.score >= 80 ? 'bg-green-500' : subject.score >= 60 ? 'bg-blue-500' : subject.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${subject.score}%` }} />
                      </div>
                      <span className="text-sm font-semibold text-white w-10 text-right">{subject.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 border-t border-neutral-700 flex gap-3">
              <button onClick={() => setSelectedReport(null)} className="flex-1 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition">Close</button>
              <button className="flex-1 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition">Print Report</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
