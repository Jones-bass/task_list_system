import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputWrapper, ErrorText } from './styles';
import { FiAlertCircle } from 'react-icons/fi';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  onAdd?: () => void; // Adicionando a função onAdd como opcional
  errorMessage: string;
}

export function Input({ errorMessage, name, onAdd,...rest }: InputProps) {
  const { register } = useFormContext();

  return (
    <InputWrapper>
      <input {...register(name)} {...rest} />
      {onAdd && <button onClick={onAdd}>Add Task</button>}
      {errorMessage && (
        <ErrorText title={errorMessage}>
          <FiAlertCircle size={20} color="#c53030" />
        </ErrorText>
      )}
    </InputWrapper>
  );
};
