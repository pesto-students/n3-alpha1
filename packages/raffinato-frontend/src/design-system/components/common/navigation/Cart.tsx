/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router';
import { Icon, Counter, ProductListing } from 'design-system/index';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import {
  incrementQuantity,
  decrementQuantity,
  CartItem,
} from 'store/cartSlice';
import ConfirmationModal from 'components/modals/ConfirmationModal';
import useOutsideClick from 'hooks/useOutsideClick';
import Button from '../form/Button';

const Cart = (props: { onCartClose: () => void; isCartOpen: boolean }) => {
  // todo: if user directly comes to address then show cart in a new page with items or empty
  const { isCartOpen, onCartClose } = props;
  const cartRef = useRef<HTMLDivElement | null>(null);
  const confirmationRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  useOutsideClick([cartRef, confirmationRef], onCartClose);

  const cart = useAppSelector((state) => state.cart);
  const numOfItemsInCart = cart
    .map((i) => i.quantity)
    .reduce((total, quantity) => total + quantity, 0);

  const totalAmount = cart
    .map((i) => i.priceInfo?.finalPrice * i.quantity)
    .reduce((total, price) => total + price, 0);

  const handleDecrement = (product: CartItem) => {
    if (product.quantity === 1) {
      return setIsConfirmationOpen(true);
    }

    return dispatch(decrementQuantity({ id: product.id }));
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          animate={{ opacity: isCartOpen ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="rf-backdrop"
        >
          <motion.div
            animate={{ translateX: isCartOpen ? '0%' : '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            initial={{ translateX: '100%' }}
            exit={{ translateX: '100%' }}
            className="rf-sidebar"
            ref={cartRef}
            key="cart-wrapper"
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
                <h3>
                  Your Bag{numOfItemsInCart > 0 && `(${numOfItemsInCart})`}
                </h3>
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
                {cart.map((product) => {
                  return (
                    <div key={product.id} className="rf-margin-t-xl">
                      <ProductListing
                        isInCart
                        product={product}
                        hideCutOutImage
                        counterSlot={
                          <Counter
                            size="medium"
                            isDeletable
                            value={product.quantity}
                            minValue={1}
                            maxValue={5}
                            variant="primary"
                            onIncrement={() =>
                              dispatch(incrementQuantity({ id: product.id }))
                            }
                            onDecrement={() => handleDecrement(product)}
                          />
                        }
                        quantityPriceBreakup={`${product.priceInfo.formattedFinalPrice} x ${product.quantity}`}
                        totalPrice={`$${
                          product.priceInfo.finalPrice * product.quantity
                        }`}
                      />

                      <ConfirmationModal
                        confirmLabel="Delete"
                        declineLabel="Go back"
                        overlayRef={(ref) => {
                          confirmationRef.current = ref;
                        }}
                        confirmSublabel="This will remove the product from cart"
                        isOpen={isConfirmationOpen}
                        onConfirmClick={() =>
                          dispatch(decrementQuantity({ id: product.id }))
                        }
                        onRequestClose={(e) => {
                          e.stopPropagation();
                          setIsConfirmationOpen(false);
                        }}
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
      )}
    </AnimatePresence>
  );
};

export default Cart;
