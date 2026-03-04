import { orderReducer, clearOrderModal, createOrder } from '../orderSlice';

describe('orderSlice: редьюсер заказа', () => {
  it('должен возвращать начальное состояние', () => {
    const state = orderReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      orderModalData: null,
      orderRequest: false,
      error: null
    });
  });

  it('createOrder.pending выставляет orderRequest: true и сбрасывает error', () => {
    const state = orderReducer(
      { orderModalData: null, orderRequest: false, error: 'Previous' },
      createOrder.pending('', [])
    );
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('createOrder.fulfilled записывает номер заказа и сбрасывает orderRequest', () => {
    const state = orderReducer(
      { orderModalData: null, orderRequest: true, error: null },
      createOrder.fulfilled({ number: 12345 }, '', [])
    );
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual({ number: 12345 });
    expect(state.error).toBeNull();
  });

  it('createOrder.rejected записывает error и сбрасывает orderRequest', () => {
    const state = orderReducer(
      { orderModalData: null, orderRequest: true, error: null },
      createOrder.rejected(new Error('Ошибка'), '', [], 'Ошибка')
    );
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('clearOrderModal очищает orderModalData и error', () => {
    const state = orderReducer(
      { orderModalData: { number: 123 }, orderRequest: false, error: 'Err' },
      clearOrderModal()
    );
    expect(state.orderModalData).toBeNull();
    expect(state.error).toBeNull();
  });
});
