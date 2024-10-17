// src/components/Button.tsx
import { FC, ReactNode } from 'react';

interface ButtonProps {
  type: 'submit' | 'button';
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ type, className, disabled, children, onClick }) => {
  return (
    <button
      type={type}
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} py-2 px-4 bg-blue-600 text-white rounded`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
