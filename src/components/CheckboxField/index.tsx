import { Checkbox, CheckboxProps, InputWrapper, createStyles } from '@mantine/core';
import { useController, Control } from 'react-hook-form';

const useStyles = createStyles((theme) => ({
  error: {
    borderColor: `${theme.colorScheme === 'dark' ? theme.colors.red[6] : theme.colors.red[7]} !important`,
  },
}));

export interface CheckboxFieldProps {
  label: string;
  name: string;
  control: Control;
}

type AllProps = CheckboxFieldProps & CheckboxProps;

export function CheckboxField({ label, name, control, ...checkboxProps }: AllProps): JSX.Element {
  const { classes } = useStyles();
  const { field, fieldState } = useController({ name, control });
  const showError = Boolean(fieldState.error);

  return (
    <InputWrapper error={showError ? fieldState.error.message : undefined}>
      <Checkbox
        id={`${name}-checkbox`}
        label={label}
        checked={field.value}
        classNames={{ input: showError ? classes.error : undefined }}
        {...checkboxProps}
        {...field}
      />
    </InputWrapper>
  );
}
