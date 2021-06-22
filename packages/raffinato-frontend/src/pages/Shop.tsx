import React from 'react';
// import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import getProducts from 'api/getProducts';

const Shop = () => {
  const { data, isLoading } = useQuery('products', getProducts);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Shop page
    </motion.div>
  );
};

Shop.propTypes = {};

Shop.defaultProps = {};

export default Shop;
