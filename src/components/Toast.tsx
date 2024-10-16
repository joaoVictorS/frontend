import { useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
  isError?: boolean; // Suporte para toast de erro ou sucesso
}

export const Toast = ({ message, show, onClose, isError }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Fecha o toast após 3 segundos
      }, 3000);
      return () => clearTimeout(timer); // Limpa o timer quando o componente é desmontado
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-3 rounded shadow-lg text-white ${
        isError ? 'bg-red-500' : 'bg-green-500'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
