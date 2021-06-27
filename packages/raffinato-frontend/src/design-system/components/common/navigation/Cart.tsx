/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';
import { Icon } from 'design-system/index';
import { useAppSelector } from 'hooks/useRedux';
import Button from '../form/Button';

const Cart = (props: { onCartClose: () => void; isCartOpen: boolean }) => {
  // todo: fix onClose animation
  // todo: place the close button properly
  const history = useHistory();
  const { isCartOpen } = props;

  const cart = useAppSelector((state) => state.cart);

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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridColumnGap: '24px',
            gridRowGap: '24px',
          }}
        >
          {cart.map((p) => {
            return (
              <div className="rf-margin-t-sm">
                <div
                  role="button"
                  className="rf-position-r"
                  onClick={() => history.push(`/product/${p.id}`)}
                >
                  <img
                    className="rf-margin-b-md rf-model-img"
                    src={p?.images?.model}
                    alt=""
                  />
                  {/* <img
                    className="rf-margin-b-md rf-cutout-img"
                    src={p?.images?.cutOut}
                    alt=""
                  /> */}
                </div>
                <p className="rf-margin-b-xxs rf-mobile-text-align-c">
                  <span className="rf-text-w-m">{p?.brand?.name}</span>
                  <span className="rf-diamond rf-opacity-20" />
                  <span className="rf-opacity-60 rf-text-w-r">
                    {p?.shortDescription}
                  </span>
                </p>
                <p className="rf-opacity-40 rf-margin-b-zr rf-mobile-text-align-c">
                  {p?.priceInfo?.formattedFinalPrice}
                </p>
              </div>
            );
          })}
        </div>
        {cart.length > 0 ? (
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
        ) : null}
      </motion.div>
    </motion.div>
  );
};

export default Cart;
