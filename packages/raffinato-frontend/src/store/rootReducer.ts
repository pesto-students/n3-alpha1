import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import alertReducer from './alertSlice';
import cartReducer from './cartSlice';
import addressReducer from './addressSlice';
import settingsReducer from './settingsSlice';

const reducers = combineReducers({
  cart: cartReducer,
  alert: alertReducer,
  selectedAddress: addressReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default persistedReducer;
