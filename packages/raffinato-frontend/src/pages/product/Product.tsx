import React from 'react';
import './product.scss';
import { motion } from 'framer-motion';
import { useQuery, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'hooks/useRedux';
import getProduct from '../../api/getProduct';
import { Button } from '../../design-system';
import { addToCart, addToCartThunk } from '../../store/cartSlice';

// import PropTypes from 'prop-types';

const CDN_BASE_URL =
  'https://res.cloudinary.com/pesto-alpha/image/upload/Assets';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const res: UseQueryResult<any, unknown> = useQuery(`product-${id}`, () => {
    return getProduct({ id });
  });
  const { data, isLoading } = res;
  const dispatch = useAppDispatch();

  console.log(data);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rf-page"
    >
      <div className="rf-container">
        <div className="rf-product-page-intro">
          <img src={`${CDN_BASE_URL}/${data?.product.id}-0-hq.jpg`} alt="" />
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
                  addToCartThunk({
                    id: data?.product?.id,
                    images: data?.product?.images,
                    shortDescription: data?.product?.shortDescription,
                    brand: data?.product?.brand,
                    quantity: 1,
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
        <div className="rf-product-page-gallery">p</div>
      </div>
    </motion.div>
  );
};

Product.propTypes = {};

Product.defaultProps = {};

export default Product;
