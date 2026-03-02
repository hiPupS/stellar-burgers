import {
  constructorReducer,
  addIngredient,
  removeIngredient,
  setBun,
  clearConstructor
} from '../constructorSlice';
import { TIngredient } from '@utils-types';

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
    const state = constructorReducer(undefined, addIngredient(mockMain));
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('main-1');
    expect(state.ingredients[0]).toHaveProperty('id');
    expect(typeof state.ingredients[0].id).toBe('string');
  });

  it('при добавлении нескольких ингредиентов все появляются в списке', () => {
    let state = constructorReducer(undefined, addIngredient(mockMain));
    state = constructorReducer(state, addIngredient(mockMain));
    expect(state.ingredients).toHaveLength(2);
  });

  it('при удалении ингредиента по id он исчезает из списка', () => {
    let state = constructorReducer(undefined, addIngredient(mockMain));
    const idToRemove = state.ingredients[0].id;
    state = constructorReducer(state, removeIngredient(idToRemove));
    expect(state.ingredients).toHaveLength(0);
  });

  it('setBun устанавливает булку', () => {
    const state = constructorReducer(undefined, setBun(mockBun));
    expect(state.bun).toEqual(mockBun);
  });

  it('clearConstructor очищает булку и ингредиенты', () => {
    let state = constructorReducer(undefined, setBun(mockBun));
    state = constructorReducer(state, addIngredient(mockMain));
    state = constructorReducer(state, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});
