import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { getFeeds, getOrders, getTotal, getTotalToday } from '../../services/slices/ordersSlice';

const setOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feed = useSelector(getFeeds);
  const total = useSelector(getTotal);
  const totalToday = useSelector(getTotalToday);
  const readyOrders = setOrders(feed, 'done');

  const pendingOrders = setOrders(feed, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{orders: feed,
        total,
        totalToday
      }}
    />
  );
};
