import { get } from 'lib/fetch';
import { Order } from './createOrder';

type OrderQueryResult = {
  orders: Order[];
};

const getOrders = () => {
  return get('getOrders') as Promise<OrderQueryResult>;
};

export default getOrders;
export type { OrderQueryResult };
