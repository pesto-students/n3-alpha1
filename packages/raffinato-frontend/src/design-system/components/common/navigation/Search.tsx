import { Button, Icon, ProductListing, TextInput } from 'design-system';
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import useOutsideClick from 'hooks/useOutsideClick';
import InfiniteScroll from 'react-infinite-scroll-component';
import React, { useState, useRef } from 'react';
import getProductsBySearchQuery from 'api/getProductsBySearchQuery';
import ScrollAnimation from 'react-animate-on-scroll';
import './search.scss';

interface Page {
  products: any[];
}

const Search = (props: {
  onSearchClose: () => void;
  isSearchOpen: boolean;
}) => {
  const { isSearchOpen, onSearchClose } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const count = 20;
  const res: UseInfiniteQueryResult<Page, unknown> = useInfiniteQuery(
    ['products', searchQuery],
    ({ pageParam = 1 }) => {
      return getProductsBySearchQuery({
        page: pageParam,
        count,
        query: searchQuery,
      });
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) =>
        lastPage.products.length && pages.length + 1,
    }
  );

  const { data, isLoading, fetchNextPage, hasNextPage } = res;

  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick([searchContainerRef], onSearchClose);

  // todo: opacity animation trigger issue on mobile
  let numOfColumns: number;
  if (window.innerWidth < 1919 && window.innerWidth > 600) {
    numOfColumns = parseInt(`${window.innerWidth / 400}`, 10);
  } else if (window.innerWidth < 600) {
    numOfColumns = 1;
  } else {
    numOfColumns = 5;
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          animate={{
            opacity: isSearchOpen ? 1 : 0,
            backgroundColor: searchQuery
              ? 'rgba(0, 0, 0, 0.8)'
              : 'rgba(0, 0, 0, 0.6)',
          }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="rf-backdrop"
        >
          <motion.div
            animate={{ translateY: isSearchOpen ? '0%' : '10%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            initial={{ translateY: '10%' }}
            exit={{ translateY: '10%' }}
            className="rf-search-container rf-container"
            ref={searchContainerRef}
            key="search-container"
            id="rf-search-container"
          >
            <motion.div
              className="rf-searchbar-container"
              animate={{ translateY: searchQuery ? '0px' : '40vh' }}
              initial={{ translateY: '40vh' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <TextInput
                theme="light"
                responsive
                name="search"
                placeholder="Search by brand name or style"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
            {searchQuery ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              >
                <InfiniteScroll
                  className="rf-shop-products-grid"
                  dataLength={(data?.pages?.length || 0) * 20}
                  next={fetchNextPage}
                  hasMore={Boolean(hasNextPage)}
                  loader={
                    <h4 className="rf-margin-t-xxl rf-text-align-c">
                      Loading more...
                    </h4>
                  }
                  scrollableTarget="rf-search-container"
                >
                  {isLoading
                    ? 'Loading...'
                    : data?.pages.map((pg, j) => {
                        return pg.products.map((p, i) => {
                          return (
                            <ScrollAnimation
                              className="rf-product-listing"
                              animateIn="rf-product-listing-fade-in"
                              animateOnce
                              // eslint-disable-next-line react/no-array-index-key
                              key={i}
                              initiallyVisible={j === 0 && i < numOfColumns}
                              delay={100 * (i % numOfColumns)}
                              scrollableParentSelector="#rf-search-container"
                            >
                              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                              <ProductListing theme="light" product={p} />
                            </ScrollAnimation>
                          );
                        });
                      })}
                </InfiniteScroll>
              </motion.div>
            ) : null}
          </motion.div>
          <Button
            className="rf-search-close"
            responsive={false}
            onClick={() => onSearchClose()}
            theme="light"
          >
            <Icon
              style={{ marginLeft: 0, marginRight: 0 }}
              size={16}
              name="close"
              fillColor="#fff"
            />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Search;
