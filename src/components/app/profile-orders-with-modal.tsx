import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { fetchOrderByNumber, clearOrderDetail } from '../../services/slices';
import { ProfileOrders } from '@pages';
import { Modal, OrderInfo } from '@components';

export const ProfileOrdersWithModal: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    if (number) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
    return () => {
      dispatch(clearOrderDetail());
    };
  }, [dispatch, number]);

  const handleClose = () => navigate('/profile/orders');

  if (!number) return null;

  return (
    <>
      <ProfileOrders />
      <Modal title='' onClose={handleClose}>
        <OrderInfo />
      </Modal>
    </>
  );
};
