import { Address } from 'design-system/components/common/box/AddressBox';
import { get } from 'lib/fetch';

type AddressQueryResult = {
  addresses: Address[];
};

const getAddress = () => {
  return get('getAddress') as Promise<AddressQueryResult>;
};

export default getAddress;
