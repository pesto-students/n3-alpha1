import { get } from 'lib/fetch';

const getProduct = (params: { id: string }) => {
  const { id } = params;
  return get('product', {
    productId: String(id),
  });
};

export default getProduct;
