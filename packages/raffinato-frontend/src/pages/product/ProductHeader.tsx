/* eslint-disable react/prop-types */
import React from 'react';

export default (props: { data: any }) => {
  const { data } = props;
  return (
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
        <h2 className="rf-product-page-price rf-margin-b-zr">
          {data?.product?.priceInfo?.formattedFinalPrice}
        </h2>
      </div>
    </div>
  );
};
