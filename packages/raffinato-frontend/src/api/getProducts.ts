import { get } from 'lib/fetch';

const getProducts = () => {
  get('products');
};

export default getProducts;
