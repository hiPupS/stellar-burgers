import {
  ingredientsReducer,
  fetchIngredients
} from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 100,
    image: '',
    image_large: '',
    image_mobile: ''
  }
];

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

const { getIngredientsApi } = require('@api');

describe('ingredientsSlice: асинхронный запрос за ингредиентами', () => {
  const initialState = {
    items: [] as TIngredient[],
    loading: false,
    error: null as string | null
  };

  it('при диспатче fetchIngredients.pending выставляет loading: true и сбрасывает error', () => {
    const state = ingredientsReducer(
      { ...initialState, error: 'Previous error' },
      fetchIngredients.pending('', undefined)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('при fetchIngredients.fulfilled записывает ингредиенты и сбрасывает loading и error', () => {
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.items).toEqual(mockIngredients);
  });

  it('при fetchIngredients.rejected записывает error и сбрасывает loading', () => {
    const errorMessage = 'Ошибка загрузки';
    const state = ingredientsReducer(
      { ...initialState, loading: true },
      fetchIngredients.rejected(
        new Error(errorMessage),
        '',
        undefined,
        errorMessage
      )
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(state.items).toEqual([]);
  });
});
