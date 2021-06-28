/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './counter.scss';
import { Icon } from 'design-system/index';

const Counter = (props: any) => {
  const {
    isDeletable,
    value,
    minValue,
    maxValue,
    variant,
    size,
    onIncrement,
    onDecrement,
  } = props;
  return (
    <div
      className={`rf-counter rf-counter-variant-${variant} rf-counter-size-${size} ${
        isDeletable && 'rf-counter-is-deletable'
      }`}
    >
      <div
        className={`rf-counter-decrementor ${
          value === minValue ? 'rf-opacity-40' : ''
        }`}
        onClick={onDecrement}
      >
        {isDeletable
          ? value === minValue && <Icon name="delete" />
          : value === minValue && '–'}
        {value !== minValue && '–'}
      </div>
      <div className="rf-counter-value">{value}</div>
      <div
        className={`rf-counter-incrementor ${
          value === maxValue ? 'rf-opacity-40' : ''
        }`}
        onClick={onIncrement}
      >
        +
      </div>
    </div>
  );
};

export default Counter;
