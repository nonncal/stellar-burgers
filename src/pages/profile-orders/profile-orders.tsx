import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchGetOrders, getOrders } from '../../services/slices/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);

  useEffect(() => {
    dispatch(fetchGetOrders());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
