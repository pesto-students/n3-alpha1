import React from 'react';
import clsx from 'clsx';
import { useQuery } from 'react-query';

import { ContainerBox } from 'design-system/index';
import getOrders from 'api/getOrders';
import OrderTable from 'pages/order/OrderTable';
import './order.scss';

const formatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

function Order() {
  const { data } = useQuery('orders', getOrders);
  const orders = data?.orders;

  return (
    <div className={clsx('rf-address-page', 'rf-flex', 'rf-flex-h', 'rf-ju-c')}>
      <ContainerBox title="Your orders">
        <div className="rf-order-page-inner-wrapper">
          {orders?.map((order) => (
            <div className="rf-order-page-order">
              <div
                className={clsx(
                  'rf-order-details-header',
                  'rf-flex',
                  'rf-flex-h',
                  'rf-ju-sb'
                )}
              >
                <div className="rf-order-header-left">
                  <p className="rf-order-header-order-id">Order #{order.id}</p>
                  <div className={clsx('rf-flex', 'rf-flex-h', 'rf-al-c')}>
                    <p className="rf-order-header-order-date">
                      {formatter.format(new Date(order.createdAt))}
                    </p>
                    <span className="rf-order-header-order-status">
                      {order?.status}
                    </span>
                  </div>
                </div>
                <div className="rf-order-header-right">${order.totalPrice}</div>
              </div>
              <div className="rf-order-details-table">
                <OrderTable borderTop items={order.items} />
              </div>
            </div>
          ))}
        </div>
      </ContainerBox>
    </div>
  );
}

export default Order;
