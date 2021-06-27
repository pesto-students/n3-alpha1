import { get } from 'lib/fetch';

const getProducts = (params: {
  page: number;
  count: number;
  gender: string;
  clothing: string;
  size: string;
  brand: string;
}) => {
  const { page, count, gender, clothing, size, brand } = params;
  return get('products', {
    page: String(page),
    limit: String(count),
    gender,
    clothing,
    size,
    brand,
  });
};

export default getProducts;
