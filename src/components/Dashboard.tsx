import React from 'react';
import Card from './Card';
import Button from './Button';
import DataTable from './DataTable';

const Dashboard: React.FC = () => {
  const stats = [
    { title: 'Total Students', value: 124, icon: '👥', trend: '+5%' },
    { title: 'Pending Payments', value: 12, icon: '💰', trend: '-3%' },
    { title: 'Attendance Rate', value: '94%', icon: '📊', trend: '+2%' },
    { title: 'Upcoming Events', value: 5, icon: '📅', trend: '→' },
  ];

  const recentStudents = [
    { id: 1, name: 'John Doe', grade: '10th', attendance: '95%', fees: '$1200' },
    { id: 2, name: 'Jane Smith', grade: '9th', attendance: '98%', fees: '$1100' },
    { id: 3, name: 'Michael Johnson', grade: '11th', attendance: '88%', fees: '$1300' },
    { id: 4, name: 'Emily Davis', grade: '10th', attendance: '92%', fees: '$1200' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="flex items-center p-4">
            <div className="flex-shrink-0 h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              {stat.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm">{stat.trend}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Students</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <DataTable
            columns={[
              { key: 'name', label: 'Name' },
              { key: 'grade', label: 'Grade' },
              { key: 'attendance', label: 'Attendance' },
              { key: 'fees', label: 'Fees Status' },
            ]}
            data={recentStudents}
          />
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="space-y-3">
            <Button variant="primary" className="w-full flex items-center justify-start">
              <span className="mr-3">👥</span> Add New Student
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-start">
              <span className="mr-3">💰</span> Record Payment
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-start">
              <span className="mr-3">📊</span> Take Attendance
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-start">
              <span className="mr-3">📝</span> Generate Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;