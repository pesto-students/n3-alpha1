import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props: {
  children: React.ReactChild;
  variant: string;
  size: string;
  theme: string;
  responsive: boolean;
  onClick: () => void;
  className: string;
}) {
  const {
    children,
    variant,
    size,
    theme,
    responsive,
    className,
    onClick,
  } = props;
  const themeClassName = `rf-button-theme-${theme}`;
  const variantClassName = `rf-button-variant-${variant}`;
  const sizeClassName = `rf-button-size-${size}`;
  const responsiveClassName = responsive ? 'rf-button-responsive' : '';

  const finalClassName = [
    'rf-button-base',
    themeClassName,
    variantClassName,
    sizeClassName,
    responsiveClassName,
    className, // from props
  ].join(' ');

  return (
    <button className={finalClassName} type="button" onClick={onClick}>
      <div className="rf-button-inner-wrapper">{children}</div>
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
