import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputWrapper, ErrorText } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errorMessage: string;
}

export function Input({ errorMessage, name, ...rest }: InputProps) {
  const { register } = useFormContext();

  return (
    <InputWrapper>
      <input {...register(name)} {...rest} />
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </InputWrapper>
  );
};
