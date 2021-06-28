/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import './product-listing.scss';

const ProductListing = (props: any) => {
  // todo: brand name should ellipse in cart
  // todo: short desc should ellipse in cart
  const {
    product,
    onRedirect,
    hideCutOutImage,
    theme,
    counterSlot,
    isInCart,
    quantityPriceBreakup,
    totalPrice,
  } = props;
  const p = product;
  const history = useHistory();
  return (
    <>
      <div
        role="button"
        className={`rf-margin-b-md rf-position-r rf-product-listing-theme-${theme}`}
        id="product-listing-img"
        onClick={(e) => {
          // eslint-disable-next-line prefer-destructuring
          const target = e.target as HTMLElement;
          if (
            target.classList.contains('rf-cutout-img') ||
            target.classList.contains('rf-model-img')
          ) {
            history.push(`/product/${p.id}`);
            if (typeof onRedirect === 'function') onRedirect();
          }
        }}
      >
        <img className="rf-model-img" src={p?.images?.model} alt="" />
        {!hideCutOutImage ? (
          <img className="rf-cutout-img" src={p?.images?.cutOut} alt="" />
        ) : null}
        <div className="rf-product-listing-counter-slot">{counterSlot}</div>
      </div>
      {isInCart ? (
        <div className="rf-flex rf-flex-h rf-ju-sb rf-text-sm">
          <div className="rf-margin-r-sm">
            <span className="rf-text-w-m">{p?.brand?.name}</span>
            <br />
            <span className="rf-opacity-60 rf-text-w-r">
              {p?.shortDescription}
            </span>
          </div>
          <div
            className="rf-text-align-r"
            style={{ flexGrow: 1, flexShrink: 0 }}
          >
            <span className="rf-text-w-r">{totalPrice}</span>
            <br />
            <span className="rf-opacity-60 rf-text-w-r">
              {quantityPriceBreakup}
            </span>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default ProductListing;
