import { useEffect } from 'react';
import { Grid, Title } from '@mantine/core';
import { SignOutProps } from '@adamldoyle/react-aws-auth-context-core';

export function SignOut({ signOut }: SignOutProps): JSX.Element {
  useEffect(() => {
    const timeout = setTimeout(async () => {
      await signOut();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [signOut]);

  return (
    <Grid justify="center" align="center">
      <Grid.Col xs={12} sm={6} md={4}>
        <Title order={2}>Signing out...</Title>
      </Grid.Col>
    </Grid>
  );
}
