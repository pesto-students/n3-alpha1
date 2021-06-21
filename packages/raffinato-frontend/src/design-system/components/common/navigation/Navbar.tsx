/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';
import { ReactComponent as BagIcon } from '../../../assets/icons/bag.svg';
import { ReactComponent as AccountIcon } from '../../../assets/icons/account.svg';
import Menu from './Menu';
import Cart from './Cart';

export default function Navbar(props: any) {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { theme } = props;
  const baseClassName = 'rf-navbar';
  const themeClassName = `rf-navbar-theme-${theme}`;
  const finalClassName = [baseClassName, themeClassName].join(' ');

  return (
    <nav className={finalClassName}>
      <div className="rf-navbar-menu-button-wrapper">
        <div
          className="rf-navbar-menu-button"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon />
        </div>
      </div>
      <div className="rf-navbar-logo">
        <Logo onClick={() => history.push('/')} />
      </div>
      <div className="rf-navbar-upfront-menu">
        <div className="rf-navbar-upfront-menu-button">
          <SearchIcon />
        </div>
        <div
          className="rf-navbar-upfront-menu-button"
          onClick={() => setIsCartOpen(true)}
        >
          <BagIcon />
        </div>
        <div className="rf-navbar-upfront-menu-button">
          <AccountIcon />
        </div>
      </div>
      <Menu
        isMenuOpen={isMenuOpen}
        onNavigate={() => {
          setIsMenuOpen(false);
        }}
        onMenuClose={() => {
          setIsMenuOpen(false);
        }}
      />
      <Cart
        isCartOpen={isCartOpen}
        onCartClose={() => {
          setIsCartOpen(false);
        }}
      />
    </nav>
  );
}

Navbar.propTypes = {
  theme: PropTypes.string,
};

Navbar.defaultProps = {
  theme: 'dark',
};
