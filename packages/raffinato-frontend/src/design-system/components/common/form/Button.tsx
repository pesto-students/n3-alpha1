import React, { MouseEvent } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export default function Button(props: {
  children: React.ReactChild;
  variant: string;
  size: string;
  theme: string;
  responsive: boolean;
  onClick?: (event: MouseEvent<any>) => void;
  className: string;
  leftIcon?: any;
  righticon?: any;
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit' | 'button';
}) {
  const {
    children,
    variant,
    size,
    theme,
    responsive,
    className,
    onClick,
    leftIcon,
    righticon,
    disabled,
    loading = false,
    type = 'button',
  } = props;
  const themeClassName = `rf-button-theme-${theme}`;
  const variantClassName = `rf-button-variant-${variant}`;
  const sizeClassName = `rf-button-size-${size}`;
  const loadingClassName = `rf-button-loading`;
  const disabledClassName = `rf-button--disabled`;
  const hasIconClassName = `rf-button--has-icon`;

  const responsiveClassName = responsive ? 'rf-button-responsive' : '';

  const finalClassName = clsx(
    'rf-button-base',
    themeClassName,
    variantClassName,
    sizeClassName,
    responsiveClassName,
    { [hasIconClassName]: leftIcon || righticon },
    { [disabledClassName]: disabled },
    { [loadingClassName]: loading },

    className // from props
  );

  return (
    <button
      className={finalClassName}
      type={type}
      onClick={onClick}
      aria-label={children.toString()}
    >
      <div
        className={clsx('rf-button-inner-wrapper', {
          'rf-button-inner-wrapper--has-icon': leftIcon || righticon,
        })}
      >
        {leftIcon}
        {children}
        {righticon}
      </div>
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  theme: PropTypes.string,
  responsive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'large',
  theme: 'dark',
  responsive: true,
  className: '',
};
