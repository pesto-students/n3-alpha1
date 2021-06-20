import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar(props: any) {
  const { theme } = props;
  const baseClassName = 'rf-navbar';
  const themeClassName = `rf-navbar-theme-${theme}`;
  const finalClassName = [baseClassName, themeClassName].join(' ');

  return <nav className={finalClassName}> Navbar </nav>;
}

Navbar.propTypes = {
  theme: PropTypes.string,
};

Navbar.defaultProps = {
  theme: 'dark',
};
