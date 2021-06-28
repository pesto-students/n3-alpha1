/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Meta } from '@storybook/react';
import Filters from './Filters';

export default {
  title: 'Components/shop/Filters',
  component: Filters,
  argTypes: {
    // variant: {
    //   options: ['primary', 'secondary', 'tertiary'],
    //   control: { type: 'radio' },
    // },
    // theme: {
    //   options: ['dark', 'light'],
    //   control: { type: 'radio' },
    // },
    // size: {
    //   options: ['small', 'medium', 'large'],
    //   control: { type: 'radio' },
    // },
    // label: {
    //   control: { type: 'text' },
    // },
    // responsive: {
    //   control: { type: 'boolean' },
    // },
    onFiltersChange: {
      control: { type: 'function' },
    },
  },
} as Meta;

export const Primary: React.VFC<{}> = (args) => (
  <Filters
    {...args}
    onFiltersChange={(filters: {
      gender: { value: string };
      clothing: { value: string };
      size: { value: string };
      brand: { value: string };
    }) => {
      console.log(filters);
    }}
  />
);
