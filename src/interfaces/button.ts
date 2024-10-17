export interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean; // Adiciona a prop 'disabled'
  }
  