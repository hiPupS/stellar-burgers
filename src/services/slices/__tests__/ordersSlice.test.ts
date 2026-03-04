import { ordersReducer, fetchOrders } from '../ordersSlice';

describe('ordersSlice: редьюсер заказов пользователя', () => {
  it('должен возвращать начальное состояние', () => {
    const state = ordersReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });

  it('fetchOrders.pending выставляет loading: true и сбрасывает error', () => {
    const state = ordersReducer(
      { orders: [], loading: false, error: 'Err' },
      fetchOrders.pending('', undefined)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchOrders.fulfilled записывает orders', () => {
    const orders: never[] = [];
    const state = ordersReducer(
      { orders: [], loading: true, error: null },
      fetchOrders.fulfilled(orders, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.error).toBeNull();
  });

  it('fetchOrders.rejected записывает error и сбрасывает loading', () => {
    const state = ordersReducer(
      { orders: [], loading: true, error: null },
      fetchOrders.rejected(new Error('Ошибка'), '', undefined, 'Ошибка')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
