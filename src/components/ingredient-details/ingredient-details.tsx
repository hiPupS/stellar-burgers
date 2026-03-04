import { FC } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors';
import { Modal } from '@components';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = id
    ? ingredients.find((ing) => ing._id === id) ?? null
    : null;

  const handleClose = () => {
    const background = (location.state as { background?: { pathname: string } })
      ?.background;
    navigate(background?.pathname ?? '/', { replace: true });
  };

  if (!ingredientData) {
    return null;
  }

  return (
    <Modal title='Детали ингредиента' onClose={handleClose}>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </Modal>
  );
};
