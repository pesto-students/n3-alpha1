import clsx from 'clsx';
import React from 'react';
import './addressBox.scss';

import { Skeleton } from 'design-system/index';

type Address = {
  id: string;
  userId: string;
  addressLine1: string;
  addressLine2: string;
  state: string;
  city: string;
  pinCode: string;
  email: string;
  phone: string;
  fullName: string;
};

type AddressBoxProps =
  | {
      address: Address;
      handleAddressClick?: (id?: Address['id']) => void;
      isSelected?: boolean;
      isLoading?: false;
    }
  | {
      isLoading: true;
      address?: never;
      handleAddressClick?: never;
      isSelected?: never;
    };

function AddressBox({
  address,
  handleAddressClick,
  isSelected,
  isLoading,
}: AddressBoxProps) {
  const {
    id,
    addressLine1,
    addressLine2,
    state,
    city,
    pinCode,
    email,
    phone,
    fullName,
  } = address || {};

  const fullAddress = [addressLine1, addressLine2].join(',');
  const fullState = [city, state].join(',');

  return (
    <button
      type="button"
      onClick={() => handleAddressClick?.(id)}
      className={clsx('rf-address-box-wrapper', 'rf-flex', 'rf-flex-h', {
        'rf-address-box-wrapper--selected': isSelected,
      })}
    >
      <div className="rf-address-box-personal-info">
        <p className="rf-text-w-m">
          {isLoading ? <Skeleton width="70%" /> : fullName}
        </p>
        <p className="rf-text-sm">
          {isLoading ? <Skeleton width="70%" /> : email}
        </p>
        <p className="rf-text-sm">
          {isLoading ? <Skeleton width="70%" /> : phone}
        </p>
      </div>
      <div className="rf-address-box-address-info">
        <p className="rf-text-sm">
          {isLoading ? <Skeleton count={3} /> : fullAddress}
        </p>
        <p className="rf-text-sm">{isLoading ? <Skeleton /> : fullState}</p>
        <p className="rf-text-sm">{isLoading ? <Skeleton /> : pinCode}</p>
      </div>
    </button>
  );
}

export default AddressBox;
export type { Address };
