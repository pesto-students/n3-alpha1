import { get } from 'lib/fetch';

const getProducts = () => {
  return get('products');
};

export default getProducts;
