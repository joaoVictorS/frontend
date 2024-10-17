import { InputProps } from '@/interfaces/inputProps';

const Input: React.FC<InputProps> = ({ label, type, placeholder, value, onChange, onBlur, name, error }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        value={value} // Isso será opcional
        onChange={onChange} // Isso também será opcional
        onBlur={onBlur} // Adicionando suporte ao onBlur
        placeholder={placeholder}
        className={`w-full p-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default Input;
