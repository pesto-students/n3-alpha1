import { post } from 'lib/fetch';

type CartItem = any;

type AddToCartMutationResult = {
  status: string | number;
  item: CartItem;
};

type RemoveFromCartMutationResult = any;

const addToCart = (item: Partial<CartItem>) => {
  return post('addToCart', item) as Promise<AddToCartMutationResult>;
};

const removeFromCart = (id: string) => {
  return post('removeFromCart', {
    id,
  }) as Promise<RemoveFromCartMutationResult>;
};

export { addToCart, removeFromCart };
