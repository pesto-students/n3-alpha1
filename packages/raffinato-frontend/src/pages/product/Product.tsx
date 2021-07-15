import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useQuery, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';

import getProduct from 'api/getProduct';
import BlendableBackground from 'design-system/assets/images/rect.png';
import ProductPageTabs from './ProductPageTabs';
import ProductHeader from './ProductHeader';
import ProductActions from './ProductActions';
import ProductGalleryDesktop from './ProductGalleryDesktop';
import ProductGalleryMobile from './ProductGalleryMobile';
import './product.scss';

const CDN_BASE_URL = process.env.REACT_APP_CDN_BASE_URL;

const Product = () => {
  // todo: add proper content for info and size
  // todo: handle loading state
  // todo: add min/max quantity to settings
  // todo: ui improvements for delivery tab

  const { id } = useParams<{ id: string }>();

  const res: UseQueryResult<any, unknown> = useQuery(`product-${id}`, () => {
    return getProduct({ id });
  });

  const { data } = res;

  const { imageCount } = data?.product || {};

  const imagesArray = useMemo(
    () =>
      Array(imageCount)
        .fill(0)
        .map(
          (_, index) => `${CDN_BASE_URL}/${data?.product.id}-${index}-hq.jpg`
        ),
    [data?.product.id, imageCount]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rf-page"
    >
      <div className="rf-container">
        <div className="rf-product-page-intro">
          <div className="rf-product-page-main-image-container">
            <div className="rf-product-page-main-image-outer-wrapper">
              <div className="rf-product-page-main-image-wrapper">
                <div
                  className="rf-product-page-main-image"
                  style={{
                    backgroundImage: `url(${CDN_BASE_URL}/${data?.product.id}-0-hq.jpg), url(${BlendableBackground})`,
                  }}
                />
              </div>
            </div>
            <ProductGalleryMobile images={imagesArray} />
            <div className="rf-product-more-images-indicator rf-hide-xs">
              <span>MORE IMAGES</span>
              <div />
            </div>
          </div>
          <div className="rf-product-description rf-padding-l-xxl rf-padding-r-xxl">
            <ProductHeader data={data} />
            <ProductPageTabs />
            <hr className="rf-margin-b-xl rf-margin-t-xl" />
            <ProductActions id={id} data={data} />
          </div>
        </div>
        <ProductGalleryDesktop images={imagesArray} />
      </div>
    </motion.div>
  );
};

Product.propTypes = {};

Product.defaultProps = {};

export default Product;
