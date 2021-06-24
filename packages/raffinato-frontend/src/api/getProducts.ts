import { get } from 'lib/fetch';

const getProducts = (page: number, count: number) => {
  return get('products', {
    page: String(page),
    limit: String(count),
  });
};

export default getProducts;
