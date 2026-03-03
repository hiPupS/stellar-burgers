import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  setBun,
  clearConstructor
} from '../constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

const mockBun: TIngredient = {
  _id: 'bun-1',
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
};

const mockMain: TIngredient = {
  _id: 'main-1',
  name: 'Котлета',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 5,
  calories: 100,
  price: 50,
  image: '',
  image_large: '',
  image_mobile: ''
};

describe('constructorSlice: редьюсер конструктора бургера', () => {
  it('должен возвращать начальное состояние', () => {
    const state = constructorReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({ bun: null, ingredients: [] });
  });

  it('при добавлении ингредиента он появляется в списке с полем id', () => {
    const ingredientWithId: TConstructorIngredient = {
      ...mockMain,
      id: 'test-id-1'
    };
    const state = constructorReducer(
      undefined,
      addIngredient(ingredientWithId)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main-1');
    expect(state.ingredients[0]).toHaveProperty('id');
    expect(state.ingredients[0].id).toBe('test-id-1');
  });

  it('при добавлении нескольких ингредиентов все появляются в списке', () => {
    const ing1: TConstructorIngredient = { ...mockMain, id: 'id-1' };
    const ing2: TConstructorIngredient = { ...mockMain, id: 'id-2' };
    let state = constructorReducer(undefined, addIngredient(ing1));
    state = constructorReducer(state, addIngredient(ing2));
    expect(state.ingredients).toHaveLength(2);
  });

  it('при удалении ингредиента по id он исчезает из списка', () => {
    const ingredientWithId: TConstructorIngredient = {
      ...mockMain,
      id: 'id-to-remove'
    };
    let state = constructorReducer(undefined, addIngredient(ingredientWithId));
    state = constructorReducer(state, removeIngredient('id-to-remove'));
    expect(state.ingredients).toHaveLength(0);
  });

  it('setBun устанавливает булку', () => {
    const state = constructorReducer(undefined, setBun(mockBun));
    expect(state.bun).toEqual(mockBun);
  });

  it('clearConstructor очищает булку и ингредиенты', () => {
    const ingredientWithId: TConstructorIngredient = {
      ...mockMain,
      id: 'id-1'
    };
    let state = constructorReducer(undefined, setBun(mockBun));
    state = constructorReducer(state, addIngredient(ingredientWithId));
    state = constructorReducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
