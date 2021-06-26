import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import clsx from 'clsx';
import React from 'react';

import { ContainerBox, TextInput, Button } from 'design-system/index';
import { createAlert } from 'store/alertSlice';
import { useAppDispatch } from 'hooks/useRedux';
import addAddress from 'api/addAddress';
import Icon from 'design-system/components/common/icons/Icon';
import type { Address } from 'design-system/components/common/box/AddressBox';
import useForm from 'hooks/useForm';
import './address.scss';

const AddAddressPage = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const addAddressMutation = useMutation(
    (address: Partial<Address>) => addAddress(address),
    {
      onSettled: () => {
        dispatch(
          createAlert({
            message: 'Address added successfully',
            type: 'success',
          })
        );

        history.push('/checkout/address');
      },
    }
  );

  const icon = <Icon name="arrow-right" size={24} />;

  const handleFormSubmit = async (values: Partial<Address>) => {
    await addAddressMutation.mutate(values);
  };

  const { values, handleChange, handleSubmit } = useForm<Partial<Address>>(
    {},
    { onSubmit: handleFormSubmit }
  );

  return (
    <div className={clsx('rf-address-page', 'rf-flex', 'rf-flex-h', 'rf-ju-c')}>
      <ContainerBox title="Add a delivery address">
        <div className="rf-address-page-form-sections">
          <form>
            <div
              className={clsx(
                'rf-address-page-add-section',
                'rf-flex',
                'rf-ju-c'
              )}
            >
              <p className="rf-text-sm">Contact person details</p>
              <TextInput
                name="fullName"
                onChange={handleChange}
                value={values.fullName}
                placeholder="Enter your full name"
              />
              <TextInput
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Enter email"
              />
              <TextInput
                name="phone"
                onChange={handleChange}
                value={values.phone}
                placeholder="Enter phone number"
              />
            </div>
            <div
              className={clsx(
                'rf-address-page-add-section',
                'rf-flex',
                'rf-ju-c'
              )}
            >
              <p className="rf-text-sm">Address details</p>
              <TextInput
                name="addressLine1"
                onChange={handleChange}
                value={values.addressLine1}
                placeholder="Enter address line 1"
              />
              <TextInput
                name="addressLine2"
                onChange={handleChange}
                value={values.addressLine2}
                placeholder="Enter address line 2"
              />
              <TextInput
                name="city"
                onChange={handleChange}
                value={values.city}
                placeholder="Enter city"
              />
              <TextInput
                name="state"
                onChange={handleChange}
                value={values.state}
                placeholder="Enter state"
              />
              <TextInput
                name="pinCode"
                onChange={handleChange}
                value={values.pinCode}
                placeholder="Enter pincode"
              />
            </div>
            <Button onClick={handleSubmit} righticon={icon}>
              Continue
            </Button>
          </form>
        </div>
      </ContainerBox>
    </div>
  );
};

export default AddAddressPage;
