import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchGetFeeds,
  fetchGetOrders,
  getFeeds,
  getOrders
} from '../../services/slices/ordersSlice';
export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(getFeeds); //GET FEEDS?

  const getStoreFeeds = () => {
    dispatch(fetchGetFeeds());
  };

  useEffect(() => {
    getStoreFeeds();
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={getStoreFeeds} />;
};
