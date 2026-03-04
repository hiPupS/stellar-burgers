import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { ConstructorPage } from '@pages';
import { IngredientDetails } from '@components';

export const ConstructorWithIngredientModal: FC = () => {
  const { id } = useParams();

  if (!id) return null;

  return (
    <>
      <ConstructorPage />
      <IngredientDetails />
    </>
  );
};
