import React from 'react';

interface InputProps {
  label: string;
  type: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string; // Mensagem de erro
  // Adicionamos `ref` para integrar com react-hook-form
  inputRef?: React.Ref<HTMLInputElement>;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, onChange, placeholder, error, inputRef }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef} // Agora o `ref` é integrado com react-hook-form
        className={`mt-1 w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Exibe o erro */}
    </div>
  );
};

export default Input;
