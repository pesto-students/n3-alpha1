import React from 'react';
import { Provider } from 'react-redux';

import { render, fireEvent, waitFor } from 'util/test-utils';
import addAddress from 'api/addAddress';
import store from 'store/store';
import AddressForm from './AddAddress';

jest.mock('api/addAddress');

const mockAddAddress = addAddress as jest.Mock;
const mockAddress = {
  fullName: 'Bruce',
  email: 'bruce@wb.com',
  city: 'Gotham',
  state: 'NY',
  phone: '3232323232',
  pinCode: '424242',
  addressLine1: 'Gotham',
};

describe('Testing Address Form', () => {
  it('submits the form with proper values', async () => {
    mockAddAddress.mockResolvedValueOnce({ status: 200 });
    const { getByText, getByPlaceholderText } = render(
      <Provider store={store}>
        <AddressForm />
      </Provider>
    );

    const nameField = getByPlaceholderText(/name/i);
    const emailField = getByPlaceholderText(/email/i);
    const phoneField = getByPlaceholderText(/phone/i);
    const addressLine1 = getByPlaceholderText(/line 1/i);
    const city = getByPlaceholderText(/city/i);
    const state = getByPlaceholderText(/state/i);
    const pincode = getByPlaceholderText(/pincode/i);

    const submitBtn = getByText(/continue/i);

    fireEvent.change(nameField, { target: { value: mockAddress.fullName } });
    fireEvent.change(emailField, { target: { value: mockAddress.email } });
    fireEvent.change(phoneField, { target: { value: mockAddress.phone } });
    fireEvent.change(city, { target: { value: mockAddress.city } });
    fireEvent.change(state, { target: { value: mockAddress.state } });
    fireEvent.change(pincode, { target: { value: mockAddress.pinCode } });
    fireEvent.change(addressLine1, {
      target: { value: mockAddress.addressLine1 },
    });

    await waitFor(() => fireEvent.click(submitBtn));

    expect(mockAddAddress).toHaveBeenCalledTimes(1);
    expect(mockAddAddress).toHaveBeenCalledWith(mockAddress);
  });

  it('prevents submission when required values are empty', async () => {
    mockAddAddress.mockResolvedValueOnce({ status: 200 });
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Provider store={store}>
        <AddressForm />
      </Provider>
    );

    const nameField = getByPlaceholderText(/name/i);
    const emailField = getByPlaceholderText(/email/i);
    const phoneField = getByPlaceholderText(/phone/i);
    const city = getByPlaceholderText(/city/i);
    const state = getByPlaceholderText(/state/i);
    const pincode = getByPlaceholderText(/pincode/i);

    const submitBtn = getByText(/continue/i);

    fireEvent.change(nameField, { target: { value: mockAddress.fullName } });
    fireEvent.change(emailField, { target: { value: mockAddress.email } });
    fireEvent.change(phoneField, { target: { value: mockAddress.phone } });
    fireEvent.change(city, { target: { value: mockAddress.city } });
    fireEvent.change(state, { target: { value: mockAddress.state } });
    fireEvent.change(pincode, { target: { value: mockAddress.pinCode } });

    await waitFor(() => fireEvent.click(submitBtn));

    const addressLineError = queryByText(/Please add address line 1/);

    expect(mockAddAddress).toHaveBeenCalledTimes(0);
    expect(addressLineError).toBeInTheDocument();
  });
});
