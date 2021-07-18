/* We can safely re-assign params in our reducers, as rtk takes care of immutability using immer */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Address } from 'design-system/components/common/box/AddressBox';

const initialState = null as Partial<Address> | null;

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    selectAddress: (
      state: typeof initialState,
      action: PayloadAction<Partial<Address>>
    ) => {
      state = action.payload;

      return state;
    },
  },
});

export const { selectAddress } = addressSlice.actions;
export default addressSlice.reducer;
