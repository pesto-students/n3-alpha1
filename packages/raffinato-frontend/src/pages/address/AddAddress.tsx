import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import clsx from 'clsx';
import React from 'react';

import { ContainerBox, TextInput, Button, Icon } from 'design-system/index';
import { createAlert } from 'store/alertSlice';
import { useAppDispatch } from 'hooks/useRedux';
import addAddress from 'api/addAddress';
import type { Address } from 'design-system/components/common/box/AddressBox';
import useForm from 'hooks/useForm';
import './address.scss';

const validate = (values: Partial<Address>) => {
  const errorObject: Partial<Address> = {};

  if (!values.fullName) {
    errorObject.fullName = 'Please add full name.';
  }

  if (!values.email) {
    errorObject.email = 'Please add email.';
  }

  if (!values.phone) {
    errorObject.phone = 'Please add phone no.';
  }

  if (!values.addressLine1) {
    errorObject.addressLine1 = 'Please add address line 1.';
  }

  if (!values.city) {
    errorObject.city = 'Please add city.';
  }

  if (!values.state) {
    errorObject.state = 'Please add state.';
  }

  if (!values.pinCode) {
    errorObject.pinCode = 'Please add pincode.';
  }

  return errorObject;
};

const icon = <Icon name="arrow-right" size={24} />;

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

  const handleFormSubmit = async (values: Partial<Address>) => {
    await addAddressMutation.mutate(values);
  };

  const { errors, values, handleChange, handleSubmit } = useForm<
    Partial<Address>
  >({}, { onSubmit: handleFormSubmit, validate });

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
                error={errors?.fullName}
                placeholder="Enter your full name"
              />
              <TextInput
                name="email"
                onChange={handleChange}
                value={values.email}
                error={errors?.email}
                placeholder="Enter email"
              />
              <TextInput
                name="phone"
                onChange={handleChange}
                value={values.phone}
                error={errors?.phone}
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
                error={errors?.addressLine1}
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
                error={errors?.city}
                placeholder="Enter city"
              />
              <TextInput
                name="state"
                onChange={handleChange}
                value={values.state}
                error={errors?.state}
                placeholder="Enter state"
              />
              <TextInput
                name="pinCode"
                onChange={handleChange}
                value={values.pinCode}
                error={errors?.pinCode}
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
