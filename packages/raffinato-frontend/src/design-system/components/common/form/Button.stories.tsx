/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Meta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Components/common/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    theme: {
      options: ['dark', 'light'],
      control: { type: 'radio' },
    },
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
    },
    label: {
      control: { type: 'text' },
    },
    responsive: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

export const Primary: React.VFC<{
  label: string;
  size: string;
  variant: string;
  theme: string;
}> = (args) => (
  <Button {...args} onClick={() => {}}>
    {args.label || 'Create account'}
  </Button>
);
