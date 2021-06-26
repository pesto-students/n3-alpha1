/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-useless-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { ReactComponent as Logo } from 'design-system/assets/images/logo.svg';
import { ReactComponent as LogoMobile } from 'design-system/assets/images/logo-mobile.svg';
import { ReactComponent as MenuIcon } from 'design-system/assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from 'design-system/assets/icons/search.svg';
import { ReactComponent as BagIcon } from 'design-system/assets/icons/bag.svg';
import { ReactComponent as AccountIcon } from 'design-system/assets/icons/account.svg';
import Menu from './Menu';
import Cart from './Cart';

type NavbarProps = {
  theme?: string;
  signInCallback?: () => void;
};

export default function Navbar(props: NavbarProps) {
  // todo: on scroll shrink navbar
  // todo: search
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { theme, signInCallback } = props;
  const baseClassName = 'rf-navbar';
  const themeClassName = `rf-navbar-theme-${theme}`;
  const finalClassName = [baseClassName, themeClassName].join(' ');

  const handleAccountClick = () => {
    signInCallback?.();
  };

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
        <Logo className="rf-hide-mobile" onClick={() => history.push('/')} />
        <LogoMobile
          className="rf-hide-desktop"
          onClick={() => history.push('/')}
        />
      </div>
      <div className="rf-navbar-upfront-menu">
        <div className="rf-navbar-upfront-menu-button rf-hide-mobile">
          <SearchIcon />
        </div>
        <div
          className="rf-navbar-upfront-menu-button"
          onClick={() => setIsCartOpen(true)}
        >
          <BagIcon />
        </div>
        <div className="rf-navbar-upfront-menu-button rf-hide-mobile">
          <AccountIcon onClick={handleAccountClick} />
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
