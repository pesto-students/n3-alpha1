import React from 'react';
import './product.scss';
import { motion } from 'framer-motion';
import { useQuery, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useRedux';
import getProduct from '../../api/getProduct';
import { Button } from '../../design-system';
import { addToCart } from '../../store/cartSlice';

// import PropTypes from 'prop-types';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const res: UseQueryResult<any, unknown> = useQuery(`product-${id}`, () => {
    return getProduct({ id });
  });
  const dispatch = useAppDispatch();
  const { data, isLoading } = res;
  const x = {
    success: true,
    product: {
      id: 15957314,
      shortDescription: 'Skater slim-fit jeans',
      merchantId: 9359,
      brand: { id: 19003, name: 'Dsquared2' },
      gender: 'men',
      images: {
        cutOut:
          'https://cdn-images.farfetch-contents.com/15/95/73/14/15957314_33189897_480.jpg',
        model:
          'https://cdn-images.farfetch-contents.com/15/95/73/14/15957314_33190385_480.jpg',
        all: null,
      },
      priceInfo: {
        formattedFinalPrice: '$453',
        formattedInitialPrice: '$755',
        finalPrice: 453,
        initialPrice: 755,
        currencyCode: 'USD',
        isOnSale: true,
        discountLabel: '40% Off',
        installmentsLabel: null,
      },
      merchandiseLabel: null,
      merchandiseLabelField: 'NoTag',
      isCustomizable: false,
      availableSizes: [
        { scaleId: 0, size: 'XS' },
        { scaleId: 0, size: 'S' },
        { scaleId: 0, size: 'M' },
        { scaleId: 0, size: 'L' },
        { scaleId: 0, size: 'XL' },
        { scaleId: 0, size: 'XXL' },
      ],
      stockTotal: 69,
      url:
        '/in/shopping/men/dsquared2-skater-slim-fit-jeans-item-15957314.aspx?storeid=9359',
      heroProductType: null,
      type: 'Product',
      properties: {},
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rf-page"
    >
      <div className="rf-container">
        <div className="rf-product-page-intro">
          <img src={data?.product?.images?.cutOut} alt="" />
          <div className="rf-product-description">
            <div className="rf-flex rf-flex-h rf-al-e rf-ju-sb">
              <div>
                <h2 className="rf-margin-b-xxs">
                  {data?.product?.brand?.name}
                </h2>
                <h4 className="rf-opacity-40 rf-margin-b-zr">
                  {data?.product?.shortDescription}
                </h4>
              </div>
              <div>
                <h2 className="rf-margin-b-zr">
                  {data?.product?.priceInfo?.formattedFinalPrice}
                </h2>
              </div>
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
                  })
                );
              }}
              size="large"
              responsive
            >
              + Add to bag
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

Product.propTypes = {};

Product.defaultProps = {};

export default Product;
