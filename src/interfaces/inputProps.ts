export interface InputProps {
  label: string;
  type: string;
  placeholder?: string;
  name?: string;
  value?: string; // Deixe o 'value' opcional
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}
