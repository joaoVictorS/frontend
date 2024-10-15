interface InputProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;  
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, onChange, placeholder }) => {
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
        className="mt-1 w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default Input;
