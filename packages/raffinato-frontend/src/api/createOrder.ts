import { post } from 'lib/fetch';

// TODO: Fix types
type OrderMuationResult = any;
type Order = any;

const createOrder = (items: Partial<Order>) => {
  return post('createOrder', items) as Promise<OrderMuationResult>;
};

export default createOrder;
export type { Order };
