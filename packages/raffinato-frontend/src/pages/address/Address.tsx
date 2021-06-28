import React, { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import getAddress from 'api/getAddress';

import { ContainerBox, AddressBox, Button } from 'design-system/index';
import './address.scss';
import clsx from 'clsx';
import type { Address } from 'design-system/components/common/box/AddressBox';
import { useAppDispatch } from 'hooks/useRedux';
import { createAlert } from 'store/alertSlice';
import { useHistory } from 'react-router-dom';
import { selectAddress } from 'store/addressSlice';

const AddressPage = () => {
  const { data, isLoading, isFetching } = useQuery('addresses', getAddress);
  const addresses = data?.addresses;
  const loading = isLoading || isFetching;

  const dispatch = useAppDispatch();
  const history = useHistory();

  const [selectedAddress, setSelectedAddress] = useState<Address['id'] | null>(
    null
  );

  const selectedFullAddress = useMemo(() => {
    return addresses?.find((address) => address.id === selectedAddress);
  }, [addresses, selectedAddress]);

  const handleAddressClick = (id?: Address['id']) =>
    setSelectedAddress(id || null);

  const handleContinue = () => {
    if (!selectedAddress) {
      return dispatch(
        createAlert({
          message: 'Please select an address',
          type: 'failure',
        })
      );
    }

    dispatch(selectAddress(selectedFullAddress as Partial<Address>));

    return history.push('/checkout/payment');
  };

  return (
    <div className={clsx('rf-address-page', 'rf-flex', 'rf-flex-h', 'rf-ju-c')}>
      <ContainerBox title="Your delivery addresses">
        <div className="rf-address-page-inner-wrapper">
          {loading ? (
            <AddressBox isLoading />
          ) : (
            <>
              {addresses?.map((address) => (
                <AddressBox
                  key={address.id}
                  handleAddressClick={handleAddressClick}
                  address={address}
                  isSelected={address.id === selectedAddress}
                />
              ))}
            </>
          )}
          <div
            className={clsx(
              'rf-address-page-action-buttons',
              'rf-flex',
              'rf-flex-h',
              'rf-ju-c'
            )}
          >
            <Button
              variant="tertiary"
              onClick={() => history.push('/checkout/address/add')}
            >
              Add a New Address
            </Button>
            <Button onClick={handleContinue}>Continue</Button>
          </div>
        </div>
      </ContainerBox>
    </div>
  );
};

export default AddressPage;
