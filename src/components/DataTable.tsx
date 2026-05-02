import React from 'react';

interface DataTableProps<T> {
  columns: Array<{
    key: keyof T;
    label: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
  }>;
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

const DataTable: React.FC<DataTableProps<any>> = ({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
}) => {
  if (loading) {
    return (
      <div className="py-8 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`${className} overflow-x-auto`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column, colIndex) => {
                const value = row[column.key];
                const cellContent = column.render 
                  ? column.render(value, row) 
                  : value !== null && value !== undefined 
                    ? String(value) 
                    : '-';
                
                return (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`px-6 py-4 whitespace-nowrap ${
                      column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'
                    } text-sm font-medium text-gray-900`}
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;