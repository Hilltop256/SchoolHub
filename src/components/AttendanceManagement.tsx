import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import DataTable from './DataTable';
import Modal from './Modal';

const AttendanceManagement: React.FC = () => {
  const [date, setDate] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const students = [
    { id: 1, name: 'John Doe', grade: '10th', status: 'Present' },
    { id: 2, name: 'Jane Smith', grade: '9th', status: 'Present' },
    { id: 3, name: 'Michael Johnson', grade: '11th', status: 'Absent' },
    { id: 4, name: 'Emily Davis', grade: '10th', status: 'Present' },
    { id: 5, name: 'David Wilson', grade: '12th', status: 'Late' },
  ];

  const grades = ['9th', '10th', '11th', '12th'];
  const statuses = ['Present', 'Absent', 'Late', 'Excused'];

  const filteredStudents = students.filter(
    student =>
      gradeFilter === '' || student.grade === gradeFilter
  );

  const handleShowAttendanceModal = () => {
    setShowAttendanceModal(true);
  };

  const handleCloseModal = () => {
    setShowAttendanceModal(false);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setSelectedDate(e.target.value);
  };

  const handleAttendanceChange = (studentId: number, status: string) => {
    // In a real app, you would update the attendance record
    alert(`Attendance updated for student ${studentId}: ${status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Attendance Management</h1>
        <Button variant="primary" onClick={handleShowAttendanceModal}>
          Take Attendance
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Date"
              placeholder="Select date"
              type="date"
              value={date}
              onChange={handleDateChange}
            />
            <Select
              label="Filter by Grade"
              options={grades.map(grade => ({ value: grade, label: grade }))}
              value={gradeFilter}
              onChange={(value) => setGradeFilter(value as string)}
            />
          </div>
        </div>

        {selectedDate && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Attendance for {new Date(selectedDate).toLocaleDateString()}</h3>
          </div>
        )}

        <DataTable
          columns={[
            { key: 'name', label: 'Student Name' },
            { key: 'grade', label: 'Grade' },
            {
              key: 'status',
              label: 'Status',
              render: (value: string) => {
                const colorMap: Record<string, string> = {
                  Present: 'bg-green-100 text-green-800',
                  Absent: 'bg-red-100 text-red-800',
                  Late: 'bg-yellow-100 text-yellow-800',
                  Excused: 'bg-blue-100 text-blue-800',
                };
                return (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorMap[value] || 'bg-gray-100 text-gray-800'}`}>
                    {value}
                  </span>
                );
              }
            },
          ]}
          data={filteredStudents}
        />
      </div>

      <Modal
        isOpen={showAttendanceModal}
        onClose={handleCloseModal}
        title="Take Attendance"
      >
        <form className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Date
            </label>
            <Input
              placeholder="Select date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="font-medium text-gray-900 mb-2">
              Select attendance status for each student:
            </div>
            {filteredStudents.map((student) => (
              <div key={student.id} className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {student.name} ({student.grade})
                </label>
                <Select
                  label="Status"
                  options={statuses.map(status => ({ value: status, label: status }))}
                  value={student.status}
                  onChange={(value) => handleAttendanceChange(student.id, value as string)}
                  className="w-full"
                />
              </div>
            ))}
          </div>

          <Button variant="primary" className="w-full">
            Submit Attendance
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AttendanceManagement;