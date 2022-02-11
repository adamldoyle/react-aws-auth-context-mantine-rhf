import { TextInput, TextInputProps } from '@mantine/core';
import { useController, Control } from 'react-hook-form';

export interface InputFieldProps {
  label: string;
  name: string;
  control: Control;
}

type AllProps = InputFieldProps & TextInputProps;

export function InputField({ label, name, control, ...textInputProps }: AllProps): JSX.Element {
  const { field, fieldState } = useController({ name, control });
  const showError = Boolean(fieldState.error);
  return (
    <TextInput
      id={`${name}-input`}
      label={label}
      error={showError ? fieldState.error.message : undefined}
      {...textInputProps}
      {...field}
    />
  );
}
