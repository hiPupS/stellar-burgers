import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feed.orders);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
