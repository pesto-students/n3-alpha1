import { combineReducers } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import cartReducer from './cartSlice';
import addressReducer from './addressSlice';
import settingsReducer from './settingsSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  alert: alertReducer,
  selectedAddress: addressReducer,
  settings: settingsReducer,
});

export default rootReducer;
