import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { ReactComponent as AccountIcon } from 'design-system/assets/icons/account.svg';
import { ReactComponent as BagIcon } from 'design-system/assets/icons/bag.svg';
import { ReactComponent as Logo } from 'design-system/assets/images/logo.svg';
import { ReactComponent as MenuIcon } from 'design-system/assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from 'design-system/assets/icons/search.svg';
import AccountMenu from 'design-system/components/common/navigation/AccountMenu';
import clsx from 'clsx';
import useIsSignedIn from 'hooks/useIsSignedIn';
import Cart from './Cart';
import Menu from './Menu';
import './accountmenu.scss';

const DEFAULT_ICON = require('design-system/assets/icons/account.svg');

type NavbarProps = {
  theme?: string;
  signInCallback?: () => void;
};

export default function Navbar(props: NavbarProps) {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { isSignedIn, username, userPhoto } = useIsSignedIn();

  const { theme, signInCallback } = props;
  const baseClassName = 'rf-navbar';
  const themeClassName = `rf-navbar-theme-${theme}`;
  const finalClassName = [baseClassName, themeClassName].join(' ');

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

  const handleAccountClick = () => {
    signInCallback?.();
  };

  return (
    <nav className={finalClassName}>
      <div className="rf-navbar-menu-button-wrapper">
        <div
          className="rf-navbar-menu-button"
          onClick={() => setIsMenuOpen(true)}
          onKeyDown={() => setIsMenuOpen(true)}
          role="button"
          tabIndex={0}
        >
          <MenuIcon />
        </div>
      </div>
      <div className="rf-navbar-logo">
        <Logo onClick={() => history.push('/')} />
      </div>
      <div className="rf-navbar-upfront-menu">
        <div className="rf-navbar-upfront-menu-button">
          <SearchIcon onClick={() => setIsAccountMenuOpen(false)} />
        </div>
        <div
          className="rf-navbar-upfront-menu-button"
          onClick={() => setIsCartOpen(true)}
          onKeyDown={() => setIsCartOpen(true)}
          role="button"
          tabIndex={0}
        >
          <BagIcon />
        </div>
        <div
          className={clsx('rf-navbar-upfront-menu-button', {
            'rf-navbar-upfront-menu-button--signedin': isSignedIn,
          })}
          {...(isSignedIn && {
            role: 'button',
            tabIndex: 0,
            onKeyDown: () => setIsAccountMenuOpen(true),
            onClick: () => setIsAccountMenuOpen(true),
          })}
        >
          {isSignedIn ? (
            <img src={userPhoto || DEFAULT_ICON} alt="profile avatar" />
          ) : (
            <AccountIcon onClick={handleAccountClick} />
          )}

          <AccountMenu
            isOpen={isAccountMenuOpen}
            closeMenu={() => setIsAccountMenuOpen(false)}
            userPhoto={userPhoto}
            username={username}
          />
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
