/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';
import { Icon, Counter, ProductListing } from 'design-system/index';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { incrementQuantity, decrementQuantity } from 'store/cartSlice';
import Button from '../form/Button';

const Cart = (props: { onCartClose: () => void; isCartOpen: boolean }) => {
  // todo: fix onClose animation
  // todo: place the close button properly
  // todo: empty cart state
  // todo: if user directly comes to address then show cart in a new page with items or empty
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isCartOpen } = props;

  const cart = useAppSelector((state) => state.cart);
  const numOfItemsInCart = cart
    .map((i) => i.quantity)
    .reduce((total, quantity) => total + quantity, 0);
  const totalAmount = cart
    .map((i) => i.priceInfo?.finalPrice * i.quantity)
    .reduce((total, price) => total + price, 0);

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
          theme="light"
          responsive={false}
          className="rf-sidebar-close"
        >
          <Icon
            style={{ marginLeft: 0, marginRight: 0 }}
            size={16}
            name="close"
            fillColor="#fff"
          />
        </Button>
        <div className="rf-sidebar-inner">
          <div className="rf-section-header">
            <h3>Your Bag{numOfItemsInCart > 0 && `(${numOfItemsInCart})`}</h3>
            <h3>${totalAmount}</h3>
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
                <div key={p.id} className="rf-margin-t-xl">
                  <ProductListing
                    isInCart
                    product={p}
                    hideCutOutImage
                    counterSlot={
                      <Counter
                        size="medium"
                        isDeletable
                        value={p.quantity}
                        minValue={1}
                        maxValue={5}
                        variant="primary"
                        onIncrement={() =>
                          dispatch(incrementQuantity({ id: p.id }))
                        }
                        onDecrement={() =>
                          dispatch(decrementQuantity({ id: p.id }))
                        }
                      />
                    }
                    quantityPriceBreakup={`${p.priceInfo.formattedFinalPrice} x ${p.quantity}`}
                    totalPrice={`$${p.priceInfo.finalPrice * p.quantity}`}
                  />
                </div>
              );
            })}
          </div>
          {cart.length > 0 ? (
            <div className="rf-cta-placeholder">
              <Button
                onClick={() => {
                  props.onCartClose();
                  history.push('/checkout/address');
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
        </div>
      </motion.div>
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
    </motion.div>
  );
};

export default Cart;
