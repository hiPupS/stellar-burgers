import { rootReducer } from '../rootReducer';
import { addIngredient } from '../slices/constructorSlice';
import { fetchIngredients } from '../slices/ingredientsSlice';
import { TConstructorIngredient } from '@utils-types';

const REQUIRED_SLICE_KEYS = [
  'burgerConstructor',
  'ingredients',
  'order',
  'feed',
  'orders',
  'orderDetail',
  'auth'
];

const mockIngredient: TConstructorIngredient = {
  _id: 'id',
  name: 'x',
  type: 'main',
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 0,
  image: '',
  image_large: '',
  image_mobile: '',
  id: 'uuid'
};

describe('rootReducer: настройка и работа хранилища', () => {
  it('возвращает состояние с корректной структурой стора', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN' as const });

    expect(state).toBeDefined();
    REQUIRED_SLICE_KEYS.forEach((key) => {
      expect(state).toHaveProperty(key);
      expect(state[key as keyof typeof state]).toBeDefined();
    });
  });

  it('делегирует экшен нужному редьюсеру: при экшене burgerConstructor меняется только burgerConstructor', () => {
    const initialState = rootReducer(undefined, { type: 'INIT' as const });
    const nextState = rootReducer(initialState, addIngredient(mockIngredient));

    expect(nextState.burgerConstructor).not.toEqual(
      initialState.burgerConstructor
    );
    expect(nextState.ingredients).toEqual(initialState.ingredients);
    expect(nextState.order).toEqual(initialState.order);
    expect(nextState.feed).toEqual(initialState.feed);
    expect(nextState.orders).toEqual(initialState.orders);
    expect(nextState.orderDetail).toEqual(initialState.orderDetail);
    expect(nextState.auth).toEqual(initialState.auth);
  });

  it('делегирует экшен нужному редьюсеру: при экшене ingredients меняется только ingredients', () => {
    const initialState = rootReducer(undefined, { type: 'INIT' as const });
    const nextState = rootReducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );

    expect(nextState.ingredients).not.toEqual(initialState.ingredients);
    expect(nextState.burgerConstructor).toEqual(initialState.burgerConstructor);
    expect(nextState.order).toEqual(initialState.order);
    expect(nextState.feed).toEqual(initialState.feed);
    expect(nextState.orders).toEqual(initialState.orders);
    expect(nextState.orderDetail).toEqual(initialState.orderDetail);
    expect(nextState.auth).toEqual(initialState.auth);
  });
});
