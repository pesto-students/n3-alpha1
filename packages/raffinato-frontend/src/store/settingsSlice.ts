/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getSettingsAPI from '../api/getSettings';

export const fetchSettings = createAsyncThunk('settings', async () => {
  const response = await getSettingsAPI();
  return response;
});

type Option = {
  value: string;
  label: string;
};

const initialState: {
  listData: {
    gender: Option[];
    clothingCategory: Option[];
    size: Option[];
    brand: Option[];
    states: {
      name: string;
      cities: string[];
    }[];
  };
  availablePincodes: string[];
  minQuantity?: number;
  maxQuantity?: number;
} = {
  listData: {
    gender: [],
    clothingCategory: [],
    size: [],
    brand: [],
    states: [],
  },
  availablePincodes: [],
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSettings.fulfilled,
      (state, { payload: { listData, availablePincodes } }) => {
        state.listData = listData;
        state.availablePincodes = availablePincodes;
      }
    );
  },
});

export default settingsSlice.reducer;
export type { Option };
