import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'w-full',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${sizeClasses[size]} p-4`}>
        <div className="bg-white rounded-lg shadow-xl">
          {title && (
            <div className="flex justify-between items-center pb-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <Button variant="outline" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ×
              </Button>
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

// We need Button for the close button in Modal
import Button from './Button';

export default Modal;