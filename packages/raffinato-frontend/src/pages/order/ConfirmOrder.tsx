import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { ContainerBox, AddressBox, Button, Icon } from 'design-system/index';
import OrderTable from 'pages/order/OrderTable';
import { useAppSelector } from 'hooks/useRedux';
import './order.scss';

function ConfirmOrder() {
  const selectedAddress = useAppSelector((state) => state.selectedAddress);

  const history = useHistory();

  const cart = useAppSelector((state) => state.cart);
  const icon = <Icon name="arrow-right" size={24} />;

  const totalAmount = cart
    .map((i) => i.priceInfo?.finalPrice * i.quantity)
    .reduce((total, price) => total + price, 0);

  const headerItem = <h4>${totalAmount}</h4>;

  return (
    <div className={clsx('rf-address-page', 'rf-flex', 'rf-flex-h', 'rf-ju-c')}>
      <ContainerBox headerItem={headerItem} title="Confirm Order">
        <div className="rf-order-page-inner-wrapper">
          <div className="rf-confirm-page-order">
            <div className="rf-order-details-table">
              <OrderTable items={cart} borderBottom />
            </div>
            <Button
              onClick={() => history.push('/checkout/payment')}
              variant="primary"
              theme="dark"
              responsive
              righticon={icon}
              className="rf-order-confirm-cta"
            >
              Proceed to payment
            </Button>
          </div>
          <div className={clsx('rf-flex', 'rf-payment-options-wrapper')}>
            <p className="rf-text-sm">Delivering to</p>
            <AddressBox address={selectedAddress!} />
          </div>
        </div>
      </ContainerBox>
    </div>
  );
}

export default ConfirmOrder;
