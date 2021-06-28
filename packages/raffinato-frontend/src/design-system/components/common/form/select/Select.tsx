import React from 'react';
import Select from 'react-select';
import './select.scss';

const RFSelect = (props: any) => {
  // eslint-disable-next-line prefer-const
  let { variant, className, theme } = props;
  className = `rf-select rf-select-variant-${variant} rf-select-theme-${theme} ${className}`;
  return (
    <Select {...props} className={className} classNamePrefix="rf-select" />
  );
};

export default RFSelect;
