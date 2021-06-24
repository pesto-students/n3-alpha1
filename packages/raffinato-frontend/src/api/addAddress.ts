import { Address } from 'design-system/components/common/box/AddressBox';
import { get, post } from 'lib/fetch';

type AddressMutationResult = {
  status: string | number;
};

const addAddress = (address: Partial<Address>) => {
  return post('addAddress', address) as Promise<AddressMutationResult>;
};

export default addAddress;
