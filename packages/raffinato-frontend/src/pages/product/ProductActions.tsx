/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import {
  getItemIndex,
  removeFromCart,
  addToCartThunk,
  addToCart,
  removeFromCartThunk,
} from 'store/cartSlice';
import { Icon, Button, Counter, Select } from 'design-system/index';
import useIsSignedIn from 'hooks/useIsSignedIn';

const ProductActions = (props: { id: string; data: any }) => {
  const { id, data } = props;
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const settings = useAppSelector((state) => state.settings);
  const sizeOptions = settings?.listData?.size || [];
  const defaultSize = sizeOptions[4];
  const [size, setSize] = useState(defaultSize);
  const defaultInCartProduct: null | any = null;
  const [inCartProduct, setInCartProduct] = useState(defaultInCartProduct);
  const minQuantity = settings?.minQuantity || 1;
  const maxQuantity = settings?.maxQuantity || 5;
  const [quantity, setQuantity] = useState(minQuantity);

  const { isSignedIn } = useIsSignedIn();

  const handleAddToCart = () => {
    const productInfo = {
      id: data?.product?.id,
      images: data?.product?.images,
      shortDescription: data?.product?.shortDescription,
      brand: data?.product?.brand,
      sizeSelected: size,
      quantity,
      priceInfo: data?.product?.priceInfo,
    };

    if (isSignedIn) {
      return dispatch(addToCartThunk(productInfo));
    }

    return dispatch(addToCart(productInfo));
  };

  const handleRemoveFromCart = () => {
    if (isSignedIn) {
      return dispatch(removeFromCartThunk(parseInt(id, 10)));
    }

    return dispatch(removeFromCart({ id: parseInt(id, 10) }));
  };

  // check if product already in cart
  useEffect(() => {
    const itemIndex = getItemIndex(cart, parseInt(id, 10));
    if (itemIndex >= 0) setInCartProduct(cart[itemIndex]);
    else setInCartProduct(null);
  }, [cart]);

  // set default size on fresh page load
  // (i.e. when settings is not available in first go)
  useEffect(() => {
    if (!size) setSize(defaultSize);
  }, [sizeOptions]);

  // quantity counter logic
  const onIncrement = () => {
    if (quantity === maxQuantity) return;
    setQuantity(quantity + 1);
  };
  const onDecrement = () => {
    if (quantity === minQuantity) return;
    setQuantity(quantity - 1);
  };
  const counterArgs = {
    isDeletable: false,
    variant: 'secondary',
    size: 'large',
    defaultValue: 1,
    value: quantity,
    minValue: minQuantity,
    maxValue: maxQuantity,
    onIncrement,
    onDecrement,
  };

  return (
    <div>
      {inCartProduct ? (
        <div className="rf-flex rf-flex-h rf-ju-sb rf-margin-t-xxl">
          <div>
            <Icon name="tick" />
            <span className="rf-text-w-m rf-margin-l-sm">
              {' '}
              {inCartProduct.quantity}{' '}
              {inCartProduct.sizeSelected.label.toUpperCase()} SIZE
            </span>
            <span className="rf-opacity-60"> added to your bag.</span>
          </div>
          <div
            className="rf-danger-link"
            onClick={() => handleRemoveFromCart()}
          >
            remove
          </div>
        </div>
      ) : (
        <>
          <div
            className="rf-grid rf-grid-2-col"
            style={{
              gridColumnGap: '16px',
              alignItems: 'stretch',
              textTransform: 'uppercase',
            }}
          >
            <Select
              options={sizeOptions}
              defaultValue={defaultSize}
              value={size ? { ...size, label: `${size.label} SIZE` } : size}
              onChange={(sizeObj: any) => setSize(sizeObj)}
              variant="secondary"
              theme="dark"
            />
            <Counter {...counterArgs} />
          </div>
          <Button
            variant="primary"
            theme="dark"
            className="rf-margin-t-lg"
            onClick={() => handleAddToCart()}
            size="large"
            responsive
          >
            + Add to bag
          </Button>
        </>
      )}
    </div>
  );
};

export default ProductActions;
