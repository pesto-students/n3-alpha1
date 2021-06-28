import { Address } from 'design-system/components/common/box/AddressBox';
import { post } from 'lib/fetch';

const createPayment = (items: any) => {
  return post('create-payment', items) as Promise<any>;
};

export default createPayment;
