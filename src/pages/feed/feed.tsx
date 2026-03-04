import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices';
import {
  selectFeedOrders,
  selectFeedLoading,
  selectFeedError
} from '../../services/selectors';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC } from 'react';
import styles from '../../components/app/app.module.css';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const loading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (loading && !orders.length && !error) {
    return <Preloader />;
  }

  if (error && !orders.length) {
    return (
      <div className={`${styles.error} text text_type_main-medium pt-4`}>
        {error}
      </div>
    );
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeeds())} />
  );
};
