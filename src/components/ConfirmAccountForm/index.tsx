import { Box, InputWrapper } from '@mantine/core';
import * as Yup from 'yup';
import { ConfirmAccountFormProps } from '@adamldoyle/react-aws-auth-context-core';
import { InputField } from '../InputField';
import { AuthForm } from '../AuthForm';
import { Link } from '../Link';

const Schema = Yup.object({
  code: Yup.string().default('').required('Code is required'),
});

const formDefaults = Schema.getDefault();

export function ConfirmAccountForm({ email, confirmAccount, resendCode }: ConfirmAccountFormProps): JSX.Element {
  return (
    <AuthForm
      title="Confirm account"
      Schema={Schema}
      formDefaults={formDefaults}
      formDescription="A confirmation code was sent to your email. Enter it to confirm your new account."
      submitLabel="Confirm account"
      onSubmit={confirmAccount}
      renderFormBody={(control) => (
        <>
          <InputWrapper label="Email">
            <Box>{email}</Box>
          </InputWrapper>
          <InputField control={control} label="Code" name="code" autoComplete="one-time-code" autoFocus />
        </>
      )}
      actions={() => (
        <>
          <Link
            onClick={() => {
              resendCode();
            }}
          >
            Don&#39;t have a code? Resend email
          </Link>
        </>
      )}
    />
  );
}
