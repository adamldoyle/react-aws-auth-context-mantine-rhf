import * as Yup from 'yup';
import { SignUpFormProps, AuthMode } from '@adamldoyle/react-aws-auth-context-core';
import { InputField } from '../InputField';
import { CheckboxField } from '../CheckboxField';
import { AuthForm } from '../AuthForm';
import { Link } from '../Link';

const Schema = Yup.object({
  firstName: Yup.string().default(''),
  lastName: Yup.string().default(''),
  email: Yup.string().default('').required('Email is required').email('Invalid email syntax'),
  password: Yup.string().default('').required('Password is required'),
  passwordConfirm: Yup.string().default('').required('Password confirmation is required'),
  allowMarketing: Yup.boolean().default(false),
});

const formDefaults = Schema.getDefault();

export function SignUpForm({ email, signUp, switchMode }: SignUpFormProps): JSX.Element {
  return (
    <AuthForm
      title="Sign up"
      Schema={Schema}
      formDefaults={{ ...formDefaults, email: email ?? '' }}
      submitLabel="Sign up"
      onSubmit={signUp}
      validate={(values) => {
        if (values.password && values.password !== values.passwordConfirm) {
          return { passwordConfirm: 'Password confirmation must match' };
        }
      }}
      renderFormBody={(control) => (
        <>
          <InputField control={control} label="First name" name="firstName" autoComplete="given-name" autoFocus />
          <InputField control={control} label="Last name" name="lastName" autoComplete="family-name" />
          <InputField control={control} label="Email" name="email" autoComplete="email" />
          <InputField control={control} label="Password" name="password" type="password" autoComplete="new-password" />
          <InputField
            control={control}
            label="Password (confirm)"
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
          />
          <CheckboxField
            control={control}
            label="I want to receive marketing promotions and updates via email."
            name="allowMarketing"
          />
        </>
      )}
      actions={(getValues) => (
        <>
          <Link
            onClick={() => {
              switchMode(AuthMode.SIGN_IN, getValues('email'));
            }}
          >
            Already have an account? Sign in
          </Link>
        </>
      )}
    />
  );
}
