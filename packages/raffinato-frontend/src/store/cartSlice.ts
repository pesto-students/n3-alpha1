/* We can safely re-assign params in our reducers, as rtk takes care of immutability using immer */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addToCart as addToCardAPI } from 'api/cart';

// TODO: Change this into actual shape
type CartItem = Record<any, any>;
type ID = string | number;

const initialState: CartItem[] = [];

const getItemIndex = (state: CartItem[], idToFind: ID): number => {
  const ids = state.map((item) => item.id);

  return ids.indexOf(idToFind);
};

export const addToCartThunk = createAsyncThunk(
  'addToCart',
  async (item: CartItem) => {
    const response = await addToCardAPI({ item });
    return response;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const itemIndex = getItemIndex(state, action.payload.id);

      if (itemIndex && itemIndex < 0) {
        state.push(action.payload);
      } else {
        state[itemIndex].quantity += action.payload.quantity;
      }
    },

    removeFromCart(state, action: PayloadAction<{ id: ID }>) {
      return state.filter((item) => item.id !== action.payload.id);
    },

    removeFromCartBatch(state, action: PayloadAction<{ ids: ID[] }>) {
      return state.filter((item) => !action.payload.ids.includes(item.id));
    },

    clearCart(state) {
      state = initialState;
      return state;
    },

    incrementQuantity(state, action: PayloadAction<{ id: ID }>) {
      const itemIndex = getItemIndex(state, action.payload.id);
      state[itemIndex].quantity += 1;
    },

    decrementQuantity(state, action: PayloadAction<{ id: ID }>) {
      const itemIndex = getItemIndex(state, action.payload.id);

      if (state[itemIndex].quantity > 1) {
        state[itemIndex].quantity -= 1;
      } else {
        state.filter((item) => item.id !== action.payload.id);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addToCartThunk.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        const { item } = action?.payload;
        const itemIndex = getItemIndex(state, item.id);

        if (itemIndex && itemIndex < 0) {
          state.push(item);
        } else {
          state[itemIndex].quantity += item.quantity;
        }
      }
    );
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCartBatch,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export type { CartItem };
