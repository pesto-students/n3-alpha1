import React, { MouseEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import './accountmenu.scss';
import { useAuth } from 'reactfire';
import { useQueryClient } from 'react-query';

import useOutsideClick from 'hooks/useOutsideClick';

const DEFAULT_ICON = require('design-system/assets/icons/account.svg');

type AccountMenuProps = {
  isOpen: boolean;
  closeMenu: () => void;
  username?: string | null;
  userPhoto?: string | null;
};

function AccountMenu({
  isOpen = false,
  closeMenu,
  userPhoto,
  username,
}: AccountMenuProps) {
  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const auth = useAuth();

  const queryClient = useQueryClient();

  useOutsideClick(accountMenuRef, closeMenu);

  const handleSignOut = (e: MouseEvent) => {
    e.stopPropagation();
    closeMenu();

    localStorage.removeItem('@token');
    queryClient.clear();
    auth.signOut();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="rf-account-menu"
          ref={accountMenuRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className={clsx(
              'rf-account-menu-profile-section',
              'rf-flex',
              'rf-al-c',
              'rf-ju-c'
            )}
          >
            <img src={userPhoto || DEFAULT_ICON} alt="profile avatar" />
            <p>Hey {username}</p>
          </div>

          <div className={clsx('rf-account-menu-links-section', 'rf-flex')}>
            <Link to="/orders">
              <p>View your orders</p>
            </Link>
            <Link to="/user/address" onClick={closeMenu}>
              <p>View your addresses</p>
            </Link>
            <button onClick={handleSignOut}>Log out</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AccountMenu;
