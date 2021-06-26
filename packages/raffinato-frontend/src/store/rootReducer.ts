import { combineReducers } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import cartReducer from './cartSlice';
import addressReducer from './addressSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  alert: alertReducer,
  selectedAddress: addressReducer,
});

export default rootReducer;
