import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
