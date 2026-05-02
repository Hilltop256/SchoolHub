import React from 'react';

interface SelectProps {
  label?: string;
  options: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  className = '',
  error,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={`select-${label}`} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={`select-${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${disabled ? 'bg-gray-50' : ''} ${className}`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Optional: Add an arrow icon */}
        <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Select;