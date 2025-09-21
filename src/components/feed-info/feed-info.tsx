import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { getFeeds, getOrders } from '../../services/slices/ordersSlice';
import { getOrder } from '../../services/slices/orderSlice';

const setOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(getFeeds);
  const feed = useSelector(getOrders);

  const readyOrders = setOrders(orders, 'done');

  const pendingOrders = setOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
