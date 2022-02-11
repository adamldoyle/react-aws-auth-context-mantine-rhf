import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Link, LinkProps } from './';

export default {
  title: 'components/Link',
  component: Link,
  argTypes: { onClick: { action: 'onClick' } },
} as Meta;

interface StoryArgs {
  defaultValue: boolean;
  required: boolean;
  onSubmit: (values: any) => {};
}

type AllProps = LinkProps & StoryArgs;

const Template: Story<AllProps> = (args) => <Link {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <>Link content</>,
};
