import { cleanup } from '@testing-library/react';

import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from './cartSlice';
import store from './store';

const itemToAdd = {
  id: 16864752,
  shortDescription: 'logo-print patchwork sweatshirt',
  merchantId: 12550,
  brand: { id: 574542, name: 'Marcelo Burlon County of Milan' },
  gender: 'men',
  images: {
    cutOut:
      'https://cdn-images.farfetch-contents.com/16/86/47/52/16864752_33550311_480.jpg',
    model:
      'https://cdn-images.farfetch-contents.com/16/86/47/52/16864752_33551381_480.jpg',
    all: null,
  },
  priceInfo: {
    formattedFinalPrice: '$643',
    formattedInitialPrice: '$643',
    finalPrice: 643,
    initialPrice: 643,
    currencyCode: 'USD',
    isOnSale: false,
    discountLabel: null,
    installmentsLabel: null,
  },
  merchandiseLabel: 'New Season',
  merchandiseLabelField: 'NewSeason',
  isCustomizable: false,
  availableSizes: [
    { scaleId: 0, size: 'XS' },
    { scaleId: 0, size: 'S' },
    { scaleId: 0, size: 'M' },
    { scaleId: 0, size: 'L' },
  ],
  stockTotal: 4,
  heroProductType: null,
  type: 'Product',
  quantity: 1,
};

describe('Testing Cart actions', () => {
  afterEach(cleanup);

  it('Cart is empty initially', () => {
    const cartState = store.getState().cart;

    expect(cartState).toEqual([]);
  });

  it('Items can be added to cart', () => {
    store.dispatch(addToCart(itemToAdd));

    const cartState = store.getState().cart;

    expect(cartState).toEqual([itemToAdd]);
  });

  it('Quantity can be incremented in cart', () => {
    store.dispatch(incrementQuantity({ id: itemToAdd.id }));
    store.dispatch(incrementQuantity({ id: itemToAdd.id }));

    const cartState = store.getState().cart;

    expect(cartState[0].quantity).toEqual(3);
  });

  it('Quantity can be decremented in cart', () => {
    store.dispatch(decrementQuantity({ id: itemToAdd.id }));

    const cartState = store.getState().cart;

    expect(cartState[0].quantity).toEqual(2);
  });

  it('Items can be removed from cart', () => {
    store.dispatch(removeFromCart({ id: itemToAdd.id }));

    const cartState = store.getState().cart;

    expect(cartState).toEqual([]);
  });
});
