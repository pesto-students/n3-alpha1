import { combineReducers } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  alert: alertReducer,
});

export default rootReducer;
