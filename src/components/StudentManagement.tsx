import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import DataTable from './DataTable';
import Modal from './Modal';

const StudentManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const students = [
    { id: 1, name: 'John Doe', grade: '10th', email: 'john@example.com', phone: '123-456-7890', attendance: '95%', fees: '$1200', status: 'Active' },
    { id: 2, name: 'Jane Smith', grade: '9th', email: 'jane@example.com', phone: '123-456-7891', attendance: '98%', fees: '$1100', status: 'Active' },
    { id: 3, name: 'Michael Johnson', grade: '11th', email: 'michael@example.com', phone: '123-456-7892', attendance: '88%', fees: '$1300', status: 'Active' },
    { id: 4, name: 'Emily Davis', grade: '10th', email: 'emily@example.com', phone: '123-456-7893', attendance: '92%', fees: '$1200', status: 'Active' },
    { id: 5, name: 'David Wilson', grade: '12th', email: 'david@example.com', phone: '123-456-7894', attendance: '85%', fees: '$1400', status: 'Pending' },
  ];

  const filteredStudents = students.filter(
    student =>
      student.name.toLowerCase().includes(search.toLowerCase()) &&
      (gradeFilter === '' || student.grade === gradeFilter)
  );

  const grades = ['9th', '10th', '11th', '12th'];

  const handleAddStudent = () => {
    setShowAddStudentModal(true);
  };

  const handleCloseModal = () => {
    setShowAddStudentModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
        <Button variant="primary" onClick={handleAddStudent}>
          Add New Student
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search students by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              label="Filter by Grade"
              options={grades.map(grade => ({ value: grade, label: grade }))}
              value={gradeFilter}
              onChange={(value) => setGradeFilter(value as string)}
            />
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'grade', label: 'Grade' },
            { key: 'email', label: 'Email' },
            { key: 'phone', label: 'Phone' },
            { key: 'attendance', label: 'Attendance' },
            { key: 'fees', label: 'Fees' },
            { key: 'status', label: 'Status' },
          ]}
          data={filteredStudents}
        />
      </div>

      <Modal
        isOpen={showAddStudentModal}
        onClose={handleCloseModal}
        title="Add New Student"
      >
        <form className="space-y-4">
          <Input
            label="First Name"
            placeholder="Enter first name"
            type="text"
            value=""
            onChange={() => {}}
          />
          <Input
            label="Last Name"
            placeholder="Enter last name"
            type="text"
            value=""
            onChange={() => {}}
          />
          <Select
            label="Grade"
            options={grades.map(grade => ({ value: grade, label: grade }))}
            value=""
            onChange={() => {}}
          />
          <Input
            label="Email"
            placeholder="Enter email address"
            type="email"
            value=""
            onChange={() => {}}
          />
          <Input
            label="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            value=""
            onChange={() => {}}
          />
          <Button variant="primary" className="w-full">
            Save Student
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default StudentManagement;