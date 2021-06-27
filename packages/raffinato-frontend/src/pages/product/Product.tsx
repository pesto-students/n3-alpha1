/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import Icon from 'design-system/components/Icon/Icon';
import getProduct from '../../api/getProduct';
import { Button, TextInput, Tabs, Counter, Select } from '../../design-system';
import { addToCart, getItemIndex, removeFromCart } from '../../store/cartSlice';
import Rect from '../../design-system/assets/images/rect.png';
import './product.scss';

const Product = () => {
  // todo: add proper content for info and size
  // todo: handle loading state
  // todo: add min/max quantity to settings
  // todo: ui improvements for delivery tab

  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const settings = useAppSelector((state) => state.settings);
  const sizeOptions = settings?.listData?.size || [];
  const defaultSize = sizeOptions[4];
  const [size, setSize] = useState(defaultSize);
  const [pincode, setPincode] = useState('');
  const [pincodeState, setPincodeState] = useState('');
  const defaultInCartProduct: null | any = null;
  const [inCartProduct, setInCartProduct] = useState(defaultInCartProduct);
  const minQuantity = settings?.minQuantity || 1;
  const maxQuantity = settings?.maxQuantity || 5;
  const [quantity, setQuantity] = useState(minQuantity);

  // get product details from server
  const res: UseQueryResult<any, unknown> = useQuery(`product-${id}`, () => {
    return getProduct({ id });
  });
  const { data, isLoading } = res;

  // check if product already in cart
  useEffect(() => {
    const itemIndex = getItemIndex(cart, parseInt(id, 10));
    if (itemIndex >= 0) setInCartProduct(cart[itemIndex]);
    else setInCartProduct(null);
  }, [cart.length]);

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

  // tab names
  const tabs = ['INFO', 'SIZE & FIT', 'DELIVERY'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rf-page"
    >
      <div className="rf-container">
        <div className="rf-product-page-intro">
          <div
            className="rf-product-page-main-image"
            style={{
              backgroundImage: `url(${data?.product?.images?.cutOut}), url(${Rect})`,
            }}
          />
          <div className="rf-product-description rf-padding-l-xxl rf-padding-r-xxl">
            <div
              className="rf-section-header rf-padding-b-xl rf-margin-b-xl"
              style={{ alignItems: 'flex-end' }}
            >
              <div>
                <h2 className="rf-margin-b-xxs rf-text-w-r">
                  {data?.product?.brand?.name}
                </h2>
                <p className="rf-opacity-40 rf-margin-b-zr rf-text-w-r">
                  {data?.product?.shortDescription}
                </p>
              </div>
              <div>
                <h2 className="rf-margin-b-zr">
                  {data?.product?.priceInfo?.formattedFinalPrice}
                </h2>
              </div>
            </div>
            <div className="">
              <Tabs tabs={tabs}>
                <div key={tabs[0]} className="rf-text-sm rf-line-height-1_75">
                  Best known for their more-is-more gold-hued Baroque designs
                  and opulent Medusa heads, Versace takes a more understated
                  approach to everyday style for AW21. In a minimalist
                  monochrome colourway, this short-sleeve slim-fit T-shirt has
                  been simply printed with the House&apos;s logo lettering at
                  the chest.
                </div>
                <div key={tabs[1]} className="rf-text-sm">
                  <p className="rf-margin-b-lg rf-text-sm rf-line-height-1_75">
                    This piece fits true to size. We recommend you get your
                    regular size. Cut for a slim fit. Made with a mid-weight
                    non-stretch fabric.
                  </p>
                  <p className="rf-opacity-40 rf-text-sm rf-margin-b-xs">
                    Model Measurements
                  </p>
                  <p className="rf-text-sm rf-line-height-2">
                    Height: 6 ft 3 in <br />
                    bust/Chest: 35.8 in <br />
                    Hips: 34.6 in <br />
                    Waist: 28 in
                  </p>
                </div>
                <div key={tabs[2]} className="rf-text-sm rf-line-height-1_75">
                  Currently, we are only able to deliver to Tier-1 cities like
                  Mumbai, Bangalore, Kolkata etc. <br />
                  <br />
                  Enter your 6-digit pincode below to check. <br />
                  <br />
                  <div className="rf-flex rf-flex-h">
                    <div style={{ marginRight: '16px', width: '240px' }}>
                      <TextInput
                        name="pincode"
                        theme="dark"
                        value={pincode}
                        placeholder="Enter pincode"
                        onChange={(e) => {
                          setPincode(e.target.value);
                        }}
                      />
                    </div>
                    <div
                      className={pincode?.length === 6 ? '' : 'rf-opacity-0'}
                    >
                      <Button
                        size="small"
                        responsive={false}
                        onClick={() => {
                          let isValid = false;
                          settings.availablePincodes.forEach((code: string) => {
                            if (RegExp(code).test(pincode)) {
                              isValid = true;
                            }
                          });
                          if (isValid) {
                            setPincodeState('deliverable');
                          } else {
                            setPincodeState('not-deliverable');
                          }
                        }}
                      >
                        Check
                      </Button>
                    </div>
                  </div>
                  <div className="rf-margin-t-sm">
                    {pincodeState === 'deliverable' &&
                      'Great! We can deliver to this pincode!'}
                    {pincodeState === 'not-deliverable' &&
                      'Uhh oh... sorry, we cannot deliver to this pincode'}
                  </div>
                </div>
              </Tabs>
            </div>
            <hr className="rf-margin-b-xl rf-margin-t-xl" />
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
                    onClick={() =>
                      dispatch(removeFromCart({ id: parseInt(id, 10) }))
                    }
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
                      value={
                        size ? { ...size, label: `${size.label} SIZE` } : size
                      }
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
                    onClick={() => {
                      dispatch(
                        addToCart({
                          id: data?.product?.id,
                          images: data?.product?.images,
                          shortDescription: data?.product?.shortDescription,
                          brand: data?.product?.brand,
                          sizeSelected: size,
                          quantity,
                          priceInfo: data?.product?.priceInfo,
                        })
                      );
                    }}
                    size="large"
                    responsive
                  >
                    + Add to bag
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

Product.propTypes = {};

Product.defaultProps = {};

export default Product;
