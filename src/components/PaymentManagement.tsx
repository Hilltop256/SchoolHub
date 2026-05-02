import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import DataTable from './DataTable';
import Modal from './Modal';

const PaymentManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    studentId: '',
    amount: '',
    date: '',
    method: '',
    description: '',
  });

  const payments = [
    { id: 1, student: 'John Doe', amount: '$1200', date: '2023-01-15', method: 'Bank Transfer', status: 'Paid' },
    { id: 2, student: 'Jane Smith', amount: '$1100', date: '2023-01-14', method: 'Cash', status: 'Paid' },
    { id: 3, student: 'Michael Johnson', amount: '$1300', date: '2023-01-13', method: 'Credit Card', status: 'Pending' },
    { id: 4, student: 'Emily Davis', amount: '$1200', date: '2023-01-12', method: 'Bank Transfer', status: 'Paid' },
    { id: 5, student: 'David Wilson', amount: '$1400', date: '2023-01-10', method: 'Cash', status: 'Overdue' },
  ];

  const statuses = ['Paid', 'Pending', 'Overdue'];
  const methods = ['Cash', 'Bank Transfer', 'Credit Card', 'Check', 'Online'];

  const filteredPayments = payments.filter(
    payment =>
      payment.student.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === '' || payment.status === statusFilter)
  );

  const handleShowPaymentModal = () => {
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setPaymentData({
      studentId: '',
      amount: '',
      date: '',
      method: '',
      description: '',
    });
  };

  const handlePaymentChange = (field: keyof typeof paymentData, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would submit to an API
    alert('Payment recorded successfully!');
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
        <Button variant="primary" onClick={handleShowPaymentModal}>
          Record Payment
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search payments by student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              label="Filter by Status"
              options={statuses.map(status => ({ value: status, label: status }))}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value as string)}
            />
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'student', label: 'Student' },
            { key: 'amount', label: 'Amount' },
            { key: 'date', label: 'Date' },
            { key: 'method', label: 'Method' },
            { key: 'status', label: 'Status' },
          ]}
          data={filteredPayments}
        />
      </div>

      <Modal
        isOpen={showPaymentModal}
        onClose={handleCloseModal}
        title="Record New Payment"
      >
        <form onSubmit={handleSubmitPayment} className="space-y-4">
          <Select
            label="Student"
            options={[
              { value: '1', label: 'John Doe' },
              { value: '2', label: 'Jane Smith' },
              { value: '3', label: 'Michael Johnson' },
              { value: '4', label: 'Emily Davis' },
              { value: '5', label: 'David Wilson' },
            ]}
            value={paymentData.studentId}
            onChange={(value) => handlePaymentChange('studentId', value as string)}
          />
          <Input
            label="Amount ($)"
            placeholder="Enter amount"
            type="number"
            value={paymentData.amount}
            onChange={(e) => handlePaymentChange('amount', e.target.value)}
          />
          <Input
            label="Date"
            placeholder="Select date"
            type="date"
            value={paymentData.date}
            onChange={(e) => handlePaymentChange('date', e.target.value)}
          />
          <Select
            label="Payment Method"
            options={methods.map(method => ({ value: method, label: method }))}
            value={paymentData.method}
            onChange={(value) => handlePaymentChange('method', value as string)}
          />
          <Input
            label="Description"
            placeholder="Enter description (optional)"
            type="text"
            value={paymentData.description}
            onChange={(e) => handlePaymentChange('description', e.target.value)}
          />
          <Button variant="primary" className="w-full" type="submit">
            Record Payment
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentManagement;