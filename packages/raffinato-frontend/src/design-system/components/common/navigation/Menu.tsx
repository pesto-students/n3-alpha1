import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { Icon } from 'design-system/index';
import Button from '../form/Button';

const Menu = (props: {
  onNavigate: () => void;
  onMenuClose: () => void;
  isMenuOpen: boolean;
}) => {
  // todo: a simple about page
  // todo: a simple contact page
  // todo: vertically center menu (it should scroll if screen is small)
  const { isMenuOpen } = props;
  const navigateTo = () => {
    props.onNavigate();
  };

  return (
    <motion.div
      animate={{ translateY: isMenuOpen ? '0%' : '100%' }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      initial={{ translateY: '100%' }}
      className="rf-fullscreen-menu"
    >
      <h1 className="rf-italiana rf-opacity-20">Menu</h1>
      <Link to="/shop?gender=men" onClick={navigateTo}>
        <h1>Men</h1>
      </Link>
      <Link to="/shop?gender=women" onClick={navigateTo}>
        <h1>Women</h1>
      </Link>
      <Link to="/about" onClick={navigateTo}>
        <h1>About</h1>
      </Link>
      <Link to="/contact" onClick={navigateTo}>
        <h1>Contact</h1>
      </Link>
      <Button
        className="rf-fullscreen-menu-close"
        onClick={() => props.onMenuClose()}
        variant="tertiary"
        theme="light"
        responsive={false}
      >
        <Icon
          style={{ marginLeft: 0, marginRight: 0 }}
          size={16}
          name="close"
          fillColor="#fff"
        />
      </Button>
    </motion.div>
  );
};

export default Menu;
