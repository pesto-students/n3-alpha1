import React from 'react';
import clsx from 'clsx';

import './order.scss';
import Rect from 'design-system/assets/images/rect.png';

import { CartItem } from 'store/cartSlice';

type OrderTableProps = {
  items: CartItem[];
  borderBottom?: boolean;
  borderTop?: boolean;
};

function OrderTable({
  items,
  borderBottom = false,
  borderTop = false,
}: OrderTableProps) {
  return (
    <>
      {items?.map((item) => {
        // TODO: Normalize these props
        const thumbnail = item.thumbnail || item.images.cutOut;
        const price = item.priceInfo?.finalPrice || item.price;
        const brandName = item.brand?.name || item.brand;

        return (
          <div
            className={clsx(
              'rf-order-table-row',
              'rf-flex',
              'rf-flex-h',
              'rf-al-c',
              { 'rf-order-table-row--border-bottom': borderBottom },
              { 'rf-order-table-row--border-top': borderTop }
            )}
            key={item.id}
          >
            <div
              className={clsx(
                'rf-order-table-row-left',
                'rf-flex',
                'rf-flex-h',
                'rf-al-c'
              )}
            >
              <div
                className="rf-order-confirm-thumbnail"
                style={{
                  backgroundImage: `url(${thumbnail}), url(${Rect})`,
                }}
              />
              <div>
                <p>{brandName}</p>
                <p className="rf-order-table-row-left-desc">
                  {item.shortDescription}
                </p>
              </div>
            </div>

            <div className="rf-order-row-column">
              <p>{item.quantity}</p>
              <p>Quantity</p>
            </div>

            <div className="rf-order-row-column">
              <p>${price * item.quantity}</p>
              <p>
                ${price} * {item.quantity}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default OrderTable;
