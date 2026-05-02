import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import DataTable from './DataTable';

const LedgerManagement: React.FC = () => {
  const [search, setSearch] = useState('');
  const [accountFilter, setAccountFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const ledgerEntries = [
    { id: 1, date: '2023-01-15', account: 'Tuition Fees', description: 'January tuition - John Doe', debit: '$1200', credit: '$0', balance: '$1200' },
    { id: 2, date: '2023-01-15', account: 'Bank Account', description: 'Payment received - John Doe', debit: '$0', credit: '$1200', balance: '$0' },
    { id: 3, date: '2023-01-14', account: 'Tuition Fees', description: 'January tuition - Jane Smith', debit: '$1100', credit: '$0', balance: '$1100' },
    { id: 4, date: '2023-01-14', account: 'Bank Account', description: 'Payment received - Jane Smith', debit: '$0', credit: '$1100', balance: '$0' },
    { id: 5, date: '2023-01-13', account: 'Tuition Fees', description: 'January tuition - Michael Johnson', debit: '$1300', credit: '$0', balance: '$1300' },
    { id: 6, date: '2023-01-12', account: 'Tuition Fees', description: 'January tuition - Emily Davis', debit: '$1200', credit: '$0', balance: '$1200' },
    { id: 7, date: '2023-01-10', account: 'Tuition Fees', description: 'January tuition - David Wilson', debit: '$1400', credit: '$0', balance: '$1400' },
  ];

  const accounts = ['Tuition Fees', 'Bank Account', 'Expenses', 'Income'];
  const types = ['Debit', 'Credit'];

  const filteredEntries = ledgerEntries.filter(
    entry =>
      entry.description.toLowerCase().includes(search.toLowerCase()) &&
      (accountFilter === '' || entry.account === accountFilter) &&
      (typeFilter === '' || 
        (typeFilter === 'Debit' && entry.debit !== '$0') || 
        (typeFilter === 'Credit' && entry.credit !== '$0'))
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Ledger Management</h1>
        <Button variant="outline">
          Export Ledger
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search entries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              label="Account"
              options={accounts.map(acc => ({ value: acc, label: acc }))}
              value={accountFilter}
              onChange={(value) => setAccountFilter(value as string)}
            />
            <Select
              label="Type"
              options={types.map(type => ({ value: type, label: type }))}
              value={typeFilter}
              onChange={(value) => setTypeFilter(value as string)}
            />
          </div>
        </div>

        <DataTable
          columns={[
            { key: 'date', label: 'Date' },
            { key: 'account', label: 'Account' },
            { key: 'description', label: 'Description' },
            { key: 'debit', label: 'Debit', align: 'right' },
            { key: 'credit', label: 'Credit', align: 'right' },
            { key: 'balance', label: 'Balance', align: 'right' },
          ]}
          data={filteredEntries}
        />
      </div>
    </div>
  );
};

export default LedgerManagement;