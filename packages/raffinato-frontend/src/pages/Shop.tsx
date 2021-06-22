import React from 'react';
import { useQuery } from 'react-query';
import getProducts from 'api/getProducts';

const Shop = () => {
  const { data, isLoading } = useQuery('products', getProducts);

  return <div>Shop page</div>;
};

Shop.propTypes = {};

Shop.defaultProps = {};

export default Shop;
