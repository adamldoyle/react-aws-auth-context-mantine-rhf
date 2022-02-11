import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, Title } from '@mantine/core';
import { AuthContext } from '@adamldoyle/react-aws-auth-context-core';
import { AuthContextProvider, AuthContextProviderProps } from '.';

export default {
  title: 'context/AuthContextProvider',
  component: AuthContextProvider,
} as Meta;

const Template: Story<AuthContextProviderProps> = (args) => (
  <AuthContextProvider {...args}>
    <AuthContext.Consumer>
      {({ session, profile, signOut }) => (
        <>
          <Title order={4}>Authenticated</Title>
          <Title order={6}>Profile</Title>
          <p>{JSON.stringify(profile)}</p>
          <Title order={6}>ID payload</Title>
          <ul>
            {Object.entries(session.getIdToken().payload).map((payloadEntry) => (
              <li key={payloadEntry[0]}>
                {payloadEntry[0]}: {JSON.stringify(payloadEntry[1])}
              </li>
            ))}
          </ul>
          <Title order={6}>Access payload</Title>
          <ul>
            {Object.entries(session.getAccessToken().payload).map((payloadEntry) => (
              <li key={payloadEntry[0]}>
                {payloadEntry[0]}: {JSON.stringify(payloadEntry[1])}
              </li>
            ))}
          </ul>
          <Button onClick={signOut}>Sign out</Button>
        </>
      )}
    </AuthContext.Consumer>
  </AuthContextProvider>
);

export const Default = Template.bind({});
Default.args = {
  sessionPingDelay: 1,
};
