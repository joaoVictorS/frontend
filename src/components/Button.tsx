import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className = '' }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
