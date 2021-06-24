/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import getProducts from 'api/getProducts';
import './shop.scss';
import ScrollAnimation from 'react-animate-on-scroll';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Page {
  products: any[];
}

const Shop = () => {
  // const [filters, ]
  const count = 20;
  const res: UseInfiniteQueryResult<Page, unknown> = useInfiniteQuery(
    'products',
    ({ pageParam = 1 }) => {
      return getProducts(pageParam, count);
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => pages.length,
    }
  );

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
                        <img
                          className="rf-margin-b-md rf-model-img"
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
