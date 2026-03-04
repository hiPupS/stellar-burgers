import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TConstructorItems = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export type BurgerConstructorUIProps = {
  constructorItems: TConstructorItems;
  orderRequest: boolean;
  price: number;
  orderModalData: { number: number } | null;
  onOrderClick: () => void;
  closeOrderModal: () => void;
  onRemoveIngredient: (id: string) => void;
};
