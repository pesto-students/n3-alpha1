import { combineReducers } from '@reduxjs/toolkit';
import alertReducer from './alertSlice';
import cartReducer from './cartSlice';
import settingsReducer from './settingsSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  alert: alertReducer,
  settings: settingsReducer,
});

export default rootReducer;
