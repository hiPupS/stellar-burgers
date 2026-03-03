import { rootReducer } from '../rootReducer';

describe('rootReducer: настройка и работа хранилища', () => {
  it('при вызове с undefined и неизвестным экшеном возвращает корректное начальное состояние', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' as const };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toBeDefined();
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('profileOrders');
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });
    expect(state.ingredients).toEqual({
      items: [],
      loading: false,
      error: null
    });
    expect(state.order).toEqual({
      orderModalData: null,
      loading: false,
      error: null
    });
    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    });
    expect(state.profileOrders).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });
});
