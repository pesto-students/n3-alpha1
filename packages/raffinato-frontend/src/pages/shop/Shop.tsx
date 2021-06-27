import { motion } from 'framer-motion';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useEffect } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import { Skeleton } from 'design-system/index';
import getProducts from 'api/getProducts';
import './shop.scss';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import Filters from '../../design-system/components/shop/filters/Filters';

interface Page {
  products: any[];
}

const Shop = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // todo: add placeholder loaders
  // todo: fix jump-loading of images
  // todo: show a nice infinite scroll loader (placeholder loaders would be much better :))
  // tood: handle scroll end

  const history = useHistory();
  const qs: {
    gender?: string;
  } = queryString.parse(window.location.search);

  // todo: set default value for filters using state below
  const initialFiltersState = {
    gender: qs?.gender || 'ALL',
    clothing: 'ALL',
    size: 'ALL',
    brand: 'ALL',
  };
  const [filters, setFilters] = useState(initialFiltersState);

  useEffect(() => {
    if (qs.gender) {
      setFilters({
        ...filters,
        gender: qs.gender,
      });
    }
  }, [filters, qs.gender]);

  const count = 20;
  const res: UseInfiniteQueryResult<Page, unknown> = useInfiniteQuery(
    ['products', filters.gender, filters.clothing, filters.size, filters.brand],
    ({ pageParam = 1 }) => {
      return getProducts({ page: pageParam, count, ...filters });
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    }
  );

  const handleImageLoaded = () => setIsImageLoaded(true);

  const { data, isLoading, fetchNextPage, hasNextPage } = res;

  // todo: opacity animation trigger issue on mobile
  let numOfColumns: number;
  if (window.innerWidth < 1680 && window.innerWidth > 400) {
    numOfColumns = parseInt(`${window.innerWidth / 400}`, 10);
  } else if (window.innerWidth < 400) {
    numOfColumns = 1;
  } else {
    numOfColumns = 5;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rf-page"
    >
      <div className="rf-container">
        <Filters
          onFiltersChange={(currentFilters: {
            gender: { value: string };
            clothing: { value: string };
            size: { value: string };
            brand: { value: string };
          }) => {
            // console.log(filters);
            setFilters({
              gender: currentFilters.gender.value,
              clothing: currentFilters.clothing.value,
              size: currentFilters.size.value,
              brand: currentFilters.brand.value,
            });
          }}
        />
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
                      animateOnce
                      // eslint-disable-next-line react/no-array-index-key
                      key={i}
                      initiallyVisible={i < numOfColumns}
                      delay={100 * (i % numOfColumns)}
                    >
                      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                      <div
                        role="button"
                        className="rf-position-r"
                        tabIndex={0}
                        onClick={() => history.push(`/product/${p.id}`)}
                      >
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
