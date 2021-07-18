import { get } from 'lib/fetch';

const getProductsBySearchQuery = (params: {
  page: number;
  count: number;
  query: string;
}) => {
  const { page, count, query } = params;
  return get('searchProducts', {
    page: String(page),
    limit: String(count),
    query,
  });
};

export default getProductsBySearchQuery;
