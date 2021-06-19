import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props: {
  children: React.ReactChild;
  variant: string;
  size: string;
  theme: string;
  responsive: boolean;
}) {
  const { children, variant, size, theme, responsive } = props;
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
  ].join(' ');

  return (
    <button className={finalClassName} type="button">
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
};

Button.defaultProps = {
  variant: 'primary',
  size: 'large',
  theme: 'dark',
  responsive: true,
};