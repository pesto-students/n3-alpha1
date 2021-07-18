/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Meta } from '@storybook/react';
import TextInput from './TextInput';

export default {
  title: 'Components/common/TextInput',
  component: TextInput,
  argTypes: {
    theme: {
      options: ['dark', 'light'],
      control: { type: 'radio' },
    },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Enter your name',
    },
    helperText: {
      control: { type: 'text' },
      defaultValue: 'Please enter your full legal name',
    },
    hasError: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    responsive: {
      control: { type: 'boolean' },
    },
  },
} as Meta;

export const Primary: React.VFC<{
  placeholder: string;
  responsive: boolean;
  theme: string;
}> = (args) => <TextInput name="test" {...args} />;
