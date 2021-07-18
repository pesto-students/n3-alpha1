import { post } from 'lib/fetch';

const createPayment = (items: any) => {
  return post('create-payment', items) as Promise<any>;
};

export default createPayment;
