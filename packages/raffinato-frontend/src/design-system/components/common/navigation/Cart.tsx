/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';
import Icon from 'design-system/components/Icon/Icon';
import Button from '../form/Button';

const Cart = (props: { onCartClose: () => void; isCartOpen: boolean }) => {
  // todo: fix onClose animation
  // todo: place the close button properly
  const history = useHistory();
  const { isCartOpen } = props;

  if (!isCartOpen) return null;
  return (
    <motion.div
      animate={{ opacity: isCartOpen ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      initial={{ opacity: 0 }}
      className="rf-backdrop"
      onClick={() => props.onCartClose()}
    >
      <motion.div
        animate={{ translateX: isCartOpen ? '0%' : '100%' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        initial={{ translateX: '100%' }}
        className="rf-sidebar"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={() => props.onCartClose()}
          variant="primary"
          theme="dark"
          responsive={false}
          className="rf-sidebar-close"
        >
          <Icon
            style={{ marginLeft: 0, marginRight: 0 }}
            size={16}
            name="close"
            // strokeColor="#fff"
            fillColor="#fff"
          />
        </Button>
        <div className="rf-section-header">
          <h3>Your Bag</h3>
          <h3>$ 756</h3>
        </div>
        <div className="rf-cta-placeholder">
          <Button
            onClick={() => {
              props.onCartClose();
              history.push('/select-address');
            }}
            variant="primary"
            theme="dark"
            responsive
            className="rf-cta"
          >
            Checkout
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Cart;
