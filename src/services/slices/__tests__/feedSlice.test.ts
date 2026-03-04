import { feedReducer, fetchFeeds } from '../feedSlice';

describe('feedSlice: редьюсер ленты заказов', () => {
  it('должен возвращать начальное состояние', () => {
    const state = feedReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    });
  });

  it('fetchFeeds.pending выставляет loading: true и сбрасывает error', () => {
    const state = feedReducer(
      { orders: [], total: 0, totalToday: 0, loading: false, error: 'Err' },
      fetchFeeds.pending('', undefined)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchFeeds.fulfilled записывает orders, total, totalToday', () => {
    const payload = { success: true, orders: [], total: 10, totalToday: 5 };
    const state = feedReducer(
      { orders: [], total: 0, totalToday: 0, loading: true, error: null },
      fetchFeeds.fulfilled(payload, '', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
    expect(state.error).toBeNull();
  });

  it('fetchFeeds.rejected записывает error и сбрасывает loading', () => {
    const state = feedReducer(
      { orders: [], total: 0, totalToday: 0, loading: true, error: null },
      fetchFeeds.rejected(new Error('Ошибка'), '', undefined, 'Ошибка')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
