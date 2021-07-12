/* We can safely re-assign params in our reducers, as rtk takes care of immutability using immer */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  addToCart as addToCartAPI,
  removeFromCart as removeFromCartAPI,
  getCart as getCartAPI,
  syncCart,
} from 'api/cart';

// TODO: Change this into actual shape
type CartItem = Record<any, any>;
type ID = string | number;

const initialState: CartItem[] = [];

export const getItemIndex = (state: CartItem[], idToFind: ID): number => {
  const ids = state.map((item) => item.id);

  return ids.indexOf(idToFind);
};

export const addToCartThunk = createAsyncThunk(
  'addToCart',
  async (item: CartItem) => {
    const response = await addToCartAPI(item);
    return response;
  }
);

export const removeFromCartThunk = createAsyncThunk(
  'removeFromCart',
  async (id: string | number) => {
    const response = await removeFromCartAPI(id);
    return response;
  }
);

export const getCartThunk = createAsyncThunk(
  'getCart',
  async (_, { getState }) => {
    const response = await getCartAPI();
    const cartState = (getState() as any).cart;

    if (!response?.items?.length) {
      await syncCart(cartState);
    }
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
      // todo use minQuantity/maxQuantity from settings
      if (state[itemIndex].quantity >= 5) return;
      state[itemIndex].quantity += 1;
    },

    decrementQuantity(state, action: PayloadAction<{ id: ID }>) {
      const itemIndex = getItemIndex(state, action.payload.id);

      // todo use minQuantity/maxQuantity from settings
      if (state[itemIndex].quantity > 1) {
        state[itemIndex].quantity -= 1;
      } else {
        // state.filter((item) => item.id !== action.payload.id);
        state.splice(itemIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addToCartThunk.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        const { id, quantity } = action?.payload;
        const itemIndex = getItemIndex(state, id);

        if (itemIndex && itemIndex < 0) {
          state.push(action?.payload);
        } else {
          state[itemIndex].quantity += quantity;
        }
      }
    );

    builder.addCase(
      getCartThunk.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        const { items } = action?.payload || {};

        state = items?.length ? items : state;

        return state;
      }
    );

    builder.addCase(
      removeFromCartThunk.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        const { item } = action?.payload || {};

        return state.filter((itemCurrent) => itemCurrent.id !== item?.id);
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
