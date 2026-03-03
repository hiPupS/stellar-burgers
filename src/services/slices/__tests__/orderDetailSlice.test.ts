import {
  orderDetailReducer,
  fetchOrderByNumber,
  clearOrderDetail
} from '../orderDetailSlice';

const mockOrder = {
  _id: '1',
  number: 1,
  status: 'done',
  name: 'Test',
  createdAt: '',
  updatedAt: '',
  ingredients: []
};

describe('orderDetailSlice: редьюсер деталей заказа', () => {
  it('должен возвращать начальное состояние', () => {
    const state = orderDetailReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      order: null,
      loading: false,
      error: null
    });
  });

  it('fetchOrderByNumber.pending выставляет loading: true и сбрасывает error', () => {
    const state = orderDetailReducer(
      { order: null, loading: false, error: 'Err' },
      fetchOrderByNumber.pending('', 1)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchOrderByNumber.fulfilled записывает order', () => {
    const state = orderDetailReducer(
      { order: null, loading: true, error: null },
      fetchOrderByNumber.fulfilled(mockOrder, '', 1)
    );
    expect(state.loading).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('fetchOrderByNumber.rejected записывает error и сбрасывает loading', () => {
    const state = orderDetailReducer(
      { order: null, loading: true, error: null },
      fetchOrderByNumber.rejected(new Error('Ошибка'), '', 1, 'Ошибка')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('clearOrderDetail очищает order, error и loading', () => {
    const state = orderDetailReducer(
      { order: mockOrder, loading: false, error: 'Err' },
      clearOrderDetail()
    );
    expect(state.order).toBeNull();
    expect(state.error).toBeNull();
    expect(state.loading).toBe(false);
  });
});
