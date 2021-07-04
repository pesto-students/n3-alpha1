/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery, UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';
import getProduct from 'api/getProduct';
import BlendableBackground from 'design-system/assets/images/rect.png';
import './product.scss';
import placeholder0 from 'design-system/assets/images/gallery-placeholders/0.png';
import placeholder1 from 'design-system/assets/images/gallery-placeholders/1.png';
import placeholder2 from 'design-system/assets/images/gallery-placeholders/2.png';
import placeholder3 from 'design-system/assets/images/gallery-placeholders/3.png';
import ProductPageTabs from './ProductPageTabs';
import ProductHeader from './ProductHeader';
import ProductActions from './ProductActions';
import ProductGalleryDesktop from './ProductGalleryDesktop';
import ProductGalleryMobile from './ProductGalleryMobile';

const CDN_BASE_URL =
  'https://res.cloudinary.com/pesto-alpha/image/upload/Assets';

const Product = () => {
  // todo: add proper content for info and size
  // todo: handle loading state
  // todo: add min/max quantity to settings
  // todo: ui improvements for delivery tab

  const { id } = useParams<{ id: string }>();

  // get product details from server
  const res: UseQueryResult<any, unknown> = useQuery(`product-${id}`, () => {
    return getProduct({ id });
  });
  const { data } = res;

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
            <ProductGalleryMobile
              images={[placeholder0, placeholder1, placeholder2, placeholder3]}
            />
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
        <ProductGalleryDesktop
          images={[placeholder0, placeholder1, placeholder2, placeholder3]}
        />
      </div>
    </motion.div>
  );
};

Product.propTypes = {};

Product.defaultProps = {};

export default Product;
