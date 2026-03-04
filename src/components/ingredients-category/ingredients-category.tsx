import { forwardRef, useMemo } from 'react';
import { useSelector } from '../../services/store';
import { selectConstructor } from '../../services/selectors';
import { TIngredientsCategoryProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorState = useSelector(selectConstructor);
  const bun = constructorState?.bun ?? null;
  const constructorIngredients = constructorState?.ingredients ?? [];

  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};
    constructorIngredients.forEach((ingredient: TConstructorIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
