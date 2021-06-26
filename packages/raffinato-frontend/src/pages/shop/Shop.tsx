import { motion } from 'framer-motion';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import { Skeleton } from 'design-system/index';
import getProducts from 'api/getProducts';
import './shop.scss';

interface Page {
  products: any[];
}

const Shop = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const count = 20;
  const res: UseInfiniteQueryResult<Page, unknown> = useInfiniteQuery(
    'products',
    ({ pageParam = 1 }) => {
      return getProducts(pageParam, count);
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    }
  );

  const handleImageLoaded = () => setIsImageLoaded(true);

  const { data, isLoading, fetchNextPage, hasNextPage } = res;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rf-page"
    >
      <div className="rf-container">
        <InfiniteScroll
          className="rf-shop-products-grid"
          dataLength={(data?.pages?.length || 0) * 20}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
          loader={
            <h4 className="rf-margin-t-xxl rf-text-align-c">Loading more...</h4>
          }
        >
          {isLoading
            ? 'Loading...'
            : data?.pages.map((pg) => {
                return pg.products.map((p: any, i: number) => {
                  return (
                    <ScrollAnimation
                      className="rf-product-listing"
                      animateIn="rf-product-listing-fade-in"
                      // animateOut="rf-product-listing-fade-out"
                      animateOnce
                      key={p.id}
                      initiallyVisible={i < 4}
                      delay={100 * (i % 4)}
                    >
                      <div className="rf-position-r">
                        {!isImageLoaded && (
                          <div className="rf-product-listing-skeleton-wrapper">
                            <Skeleton className="rf-product-listing-skeleton" />
                          </div>
                        )}
                        <img
                          className="rf-margin-b-md rf-model-img"
                          onLoad={handleImageLoaded}
                          src={p?.images?.model}
                          alt=""
                        />
                        <img
                          className="rf-margin-b-md rf-cutout-img"
                          src={p?.images?.cutOut}
                          alt=""
                        />
                      </div>
                      <p className="rf-margin-b-xxs">
                        <span className="rf-text-w-m">{p?.brand?.name}</span>
                        <span className="rf-diamond rf-opacity-20" />
                        <span className="rf-opacity-60 rf-text-w-r">
                          {p?.shortDescription}
                        </span>
                      </p>
                      <p className="rf-opacity-40 rf-margin-b-zr">
                        {p?.priceInfo?.formattedFinalPrice}
                      </p>
                    </ScrollAnimation>
                  );
                });
              })}
        </InfiniteScroll>
      </div>
    </motion.div>
  );
};

Shop.propTypes = {};

Shop.defaultProps = {};

export default Shop;
