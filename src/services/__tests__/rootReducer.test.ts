import { rootReducer } from '../rootReducer';

describe('rootReducer: настройка и работа хранилища', () => {
  it('при вызове с undefined и неизвестным экшеном возвращает корректное начальное состояние', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' as const };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toBeDefined();
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredients');
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });
    expect(state.ingredients).toEqual({
      items: [],
      loading: false,
      error: null
    });
  });
});
