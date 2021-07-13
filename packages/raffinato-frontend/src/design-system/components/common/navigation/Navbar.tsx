import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import { ReactComponent as AccountIcon } from 'design-system/assets/icons/account.svg';
import { ReactComponent as BagIcon } from 'design-system/assets/icons/bag.svg';
import { useAppSelector } from 'hooks/useRedux';
import { ReactComponent as Logo } from 'design-system/assets/images/logo.svg';
import { ReactComponent as LogoMobile } from 'design-system/assets/images/logo-mobile.svg';
import { ReactComponent as MenuIcon } from 'design-system/assets/icons/menu.svg';
import { ReactComponent as SearchIcon } from 'design-system/assets/icons/search.svg';
import AccountMenu from 'design-system/components/common/navigation/AccountMenu';
import useIsSignedIn from 'hooks/useIsSignedIn';
import Search from './Search';
import Cart from './Cart';
import Menu from './Menu';
import './accountmenu.scss';

const DEFAULT_ICON = require('design-system/assets/icons/account.svg');

type NavbarProps = {
  theme?: string;
  signInCallback?: () => void;
};

export default function Navbar(props: NavbarProps) {
  // todo: on scroll shrink navbar
  // todo: animate cart badge on each increment/decrement (currently only animates for 1st item(s) added or last item(s) removed)
  const cart = useAppSelector((state) => state.cart);
  const numOfItemsInCart = cart
    .map((i) => i.quantity)
    .reduce((total, quantity) => total + quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
      <Link className="rf-navbar-logo" to="/">
        <Logo className="rf-hide-mobile" />
        <LogoMobile className="rf-hide-desktop" />
      </Link>
      <div className="rf-navbar-upfront-menu">
        <div
          className="rf-navbar-upfront-menu-button rf-hide-mobile"
          onClick={() => setIsSearchOpen(true)}
          onKeyDown={() => setIsSearchOpen(true)}
          role="button"
          tabIndex={0}
        >
          <SearchIcon />
        </div>
        <div
          className="rf-navbar-upfront-menu-button"
          onClick={() => setIsCartOpen(true)}
          onKeyDown={() => setIsCartOpen(true)}
          role="button"
          tabIndex={0}
        >
          <motion.div
            animate={{ scale: numOfItemsInCart > 0 ? 1 : 0 }}
            transition={{ duration: 0.35 }}
            className="rf-cart-badge"
          >
            {numOfItemsInCart}
          </motion.div>
          <BagIcon />
        </div>
        <div
          className={clsx(
            'rf-navbar-upfront-menu-button',
            'rf-account-menu-icon',
            {
              'rf-navbar-upfront-menu-button--signedin': isSignedIn,
            }
          )}
          role="button"
          tabIndex={0}
          onKeyDown={
            isSignedIn ? () => setIsAccountMenuOpen(true) : handleAccountClick
          }
          onClick={
            isSignedIn ? () => setIsAccountMenuOpen(true) : handleAccountClick
          }
        >
          {isSignedIn ? (
            <img src={userPhoto || DEFAULT_ICON} alt="profile avatar" />
          ) : (
            <AccountIcon />
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
      <Search
        isSearchOpen={isSearchOpen}
        onSearchClose={() => {
          setIsSearchOpen(false);
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
