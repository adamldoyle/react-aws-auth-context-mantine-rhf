import * as Yup from 'yup';
import { ForgotPasswordFormProps, AuthMode } from '@adamldoyle/react-aws-auth-context-core';
import { InputField } from '../InputField';
import { AuthForm } from '../AuthForm';
import { Link } from '../Link';

const Schema = Yup.object({
  email: Yup.string().default('').required('Email is required').email('Invalid email syntax'),
});

const formDefaults = Schema.getDefault();

export function ForgotPasswordForm({ email, resetPassword, switchMode }: ForgotPasswordFormProps): JSX.Element {
  return (
    <AuthForm
      title="Reset password"
      Schema={Schema}
      formDefaults={{ ...formDefaults, email: email ?? '' }}
      submitLabel="Reset password"
      onSubmit={resetPassword}
      renderFormBody={(control) => (
        <>
          <InputField control={control} label="Email" name="email" autoComplete="email" autoFocus />
        </>
      )}
      actions={(getValues) => (
        <>
          <Link
            onClick={() => {
              switchMode(AuthMode.SIGN_UP, getValues('email'));
            }}
          >
            Don&#39;t have an account? Sign up
          </Link>
          <Link
            onClick={() => {
              switchMode(AuthMode.SIGN_IN, getValues('email'));
            }}
          >
            Remember your password? Sign in
          </Link>
        </>
      )}
    />
  );
}
