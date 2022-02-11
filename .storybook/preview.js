import { Amplify } from 'aws-amplify';
import { MantineProvider, Container } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.STORYBOOK_AWS_REGION ?? process.env.AWS_REGION,
    userPoolId: process.env.STORYBOOK_AWS_POOL_ID ?? process.env.AWS_POOL_ID,
    userPoolWebClientId: process.env.STORYBOOK_AWS_CLIENT_ID ?? process.env.AWS_CLIENT_ID,
  },
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, { globals }) => (
    <MantineProvider withNormalizeCSS withGlobalStyles theme={{ colorScheme: globals.theme }}>
      <Container>
        <ToastContainer position="top-center" autoClose={5000} draggable={false} />
        <Story />
      </Container>
    </MantineProvider>
  ),
];

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};
