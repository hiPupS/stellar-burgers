import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConstructorPage } from '@pages';
import { Modal, IngredientDetails } from '@components';

export const ConstructorWithIngredientModal: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => navigate('/');

  if (!id) return null;

  return (
    <>
      <ConstructorPage />
      <Modal title='Детали ингредиента' onClose={handleClose}>
        <IngredientDetails />
      </Modal>
    </>
  );
};
