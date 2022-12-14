import React from 'react';
import { useSelector } from 'react-redux';
import { MainPageLayout } from '../components';
import { loadOrders } from '../store/reducers/orders';

const Orders = () => {
  const orders = useSelector(state => state.orders.orders);
  const token = useSelector(state => state.auth.token);
  return (
    <MainPageLayout
      path='orders'
      route='order'
      data={orders}
      deleteTitle='Order'
      action={loadOrders(token)}
      title='Active Orders'
    />
  );
};

export default Orders;
