import React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import './select.scss';

type RFSelectProps = Omit<SelectProps, 'theme'> & {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  theme: 'light' | 'dark';
};

const RFSelect = (props: RFSelectProps) => {
  const { variant, className, theme, ...restProps } = props;
  const finaClassName = `rf-select rf-select-variant-${variant} rf-select-theme-${theme} ${className}`;

  return (
    <Select
      {...restProps}
      className={finaClassName}
      classNamePrefix="rf-select"
    />
  );
};

export default RFSelect;
