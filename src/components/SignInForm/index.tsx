import * as Yup from 'yup';
import { SignInFormProps, AuthMode } from '@adamldoyle/react-aws-auth-context-core';
import { InputField } from '../InputField';
import { AuthForm } from '../AuthForm';
import { Link } from '../Link';

const Schema = Yup.object({
  email: Yup.string().default('').required('Email is required').email('Invalid email syntax'),
  password: Yup.string().default('').required('Password is required'),
});

const formDefaults = Schema.getDefault();

export function SignInForm({ email, signIn, switchMode }: SignInFormProps): JSX.Element {
  return (
    <AuthForm
      title="Sign in"
      Schema={Schema}
      formDefaults={{ ...formDefaults, email: email ?? '' }}
      submitLabel="Sign in"
      onSubmit={signIn}
      renderFormBody={(control) => (
        <>
          <InputField control={control} label="Email" name="email" autoComplete="email" autoFocus />
          <InputField
            control={control}
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
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
              switchMode(AuthMode.FORGOT_PASSWORD, getValues('email'));
            }}
          >
            Forgot your password? Reset it
          </Link>
        </>
      )}
    />
  );
}
