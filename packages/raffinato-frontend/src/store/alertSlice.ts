import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqueId from 'lodash/uniqueId';

type Alert = {
  id: string;
  type: 'success' | 'failure';
  message: string;
};

const initialState: Alert[] = [];

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert: (state, action: PayloadAction<Omit<Alert, 'id'>>) => {
      state.push({
        id: uniqueId(),
        message: action.payload.message,
        type: action.payload.type,
      });
    },
    removeAlert: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { createAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
export type { Alert };
