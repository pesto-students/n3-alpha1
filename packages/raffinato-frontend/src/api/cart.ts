import { post, get } from 'lib/fetch';

type CartItem = {
  status: number;
  id: number | string;
  images: Record<string, string | null>;
  shortDescription: string;
  brand: {
    id: number;
    name: string;
  };
  sizeSelected: {
    value: string;
    label: string;
  };
  quantity: number;
  priceInfo: Record<string, any>;
  userId: string;
};

type AddToCartMutationResult = {
  status: string | number;
  item: CartItem;
};

type RemoveFromCartMutationResult = AddToCartMutationResult;

type CartQueryResult = {
  items: CartItem[];
};

const addToCart = (item: Partial<CartItem>) => {
  return post('addToCart', { item }) as Promise<AddToCartMutationResult>;
};

const removeFromCart = (id: string | number) => {
  return post('removeFromCart', {
    id,
  }) as Promise<RemoveFromCartMutationResult>;
};

const getCart = () => {
  return get('getCart') as Promise<CartQueryResult>;
};

const syncCart = (items: CartItem[]) => {
  return post('syncCart', { items }) as Promise<AddToCartMutationResult>;
};

export { addToCart, removeFromCart, getCart, syncCart };
