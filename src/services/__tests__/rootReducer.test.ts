import { rootReducer } from '../rootReducer';
import {
  addIngredient,
  setBun,
  clearConstructor
} from '../slices/constructorSlice';
import { createOrder } from '../slices/orderSlice';
import { clearOrderModal } from '../slices/orderSlice';
import { fetchIngredients } from '../slices/ingredientsSlice';
import { fetchFeeds } from '../slices/feedSlice';
import { fetchOrders } from '../slices/ordersSlice';
import {
  fetchOrderByNumber,
  clearOrderDetail
} from '../slices/orderDetailSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

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

const mockIngredient: TConstructorIngredient = {
  ...mockBun,
  id: 'id-1'
};

describe('rootReducer: настройка и работа хранилища', () => {
  it('при вызове с undefined и неизвестным экшеном возвращает корректное начальное состояние', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' as const };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toBeDefined();
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');
    expect(state).toHaveProperty('orders');
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
      orderRequest: false,
      error: null
    });
    expect(state.feed).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      loading: false,
      error: null
    });
    expect(state.orders).toEqual({
      orders: [],
      loading: false,
      error: null
    });
  });

  it('rootReducer обрабатывает addIngredient и обновляет burgerConstructor', () => {
    const state = rootReducer(undefined, addIngredient(mockIngredient));
    expect(state.burgerConstructor.ingredients).toHaveLength(1);
    expect(state.burgerConstructor.ingredients[0]._id).toBe('bun-1');
  });

  it('rootReducer обрабатывает setBun и обновляет burgerConstructor', () => {
    const state = rootReducer(undefined, setBun(mockBun));
    expect(state.burgerConstructor.bun).toEqual(mockBun);
  });

  it('rootReducer обрабатывает createOrder.fulfilled и очищает burgerConstructor', () => {
    let state = rootReducer(undefined, setBun(mockBun));
    state = rootReducer(
      state,
      addIngredient({ ...mockIngredient, _id: 'main-1', id: 'id-2' })
    );
    state = rootReducer(
      state,
      createOrder.fulfilled({ number: 12345 }, '', [])
    );
    expect(state.burgerConstructor.bun).toBeNull();
    expect(state.burgerConstructor.ingredients).toHaveLength(0);
  });

  it('rootReducer обрабатывает clearOrderModal и обновляет order', () => {
    let state = rootReducer(
      undefined,
      createOrder.fulfilled({ number: 123 }, '', [])
    );
    expect(state.order.orderModalData).toEqual({ number: 123 });
    state = rootReducer(state, clearOrderModal());
    expect(state.order.orderModalData).toBeNull();
  });

  it('rootReducer обрабатывает createOrder.pending/rejected и обновляет order', () => {
    let state = rootReducer(undefined, createOrder.pending('', []));
    expect(state.order.orderRequest).toBe(true);

    state = rootReducer(
      state,
      createOrder.rejected(new Error('Ошибка'), '', [], 'Ошибка')
    );
    expect(state.order.orderRequest).toBe(false);
    expect(state.order.error).toBe('Ошибка');
  });

  it('rootReducer обрабатывает fetchIngredients и обновляет ingredients', () => {
    const items = [mockBun];
    let state = rootReducer(undefined, fetchIngredients.pending('', undefined));
    expect(state.ingredients.loading).toBe(true);

    state = rootReducer(
      state,
      fetchIngredients.fulfilled(items, '', undefined)
    );
    expect(state.ingredients.loading).toBe(false);
    expect(state.ingredients.items).toEqual(items);
  });

  it('rootReducer обрабатывает fetchFeeds и обновляет feed', () => {
    const payload = { success: true, orders: [], total: 10, totalToday: 5 };
    let state = rootReducer(undefined, fetchFeeds.pending('', undefined));
    state = rootReducer(state, fetchFeeds.fulfilled(payload, '', undefined));
    expect(state.feed.orders).toEqual([]);
    expect(state.feed.total).toBe(10);
    expect(state.feed.totalToday).toBe(5);
  });

  it('rootReducer обрабатывает fetchOrders и обновляет orders', () => {
    const orders: never[] = [];
    let state = rootReducer(undefined, fetchOrders.pending('', undefined));
    state = rootReducer(state, fetchOrders.fulfilled(orders, '', undefined));
    expect(state.orders.orders).toEqual([]);
    expect(state.orders.loading).toBe(false);
  });

  it('rootReducer обрабатывает orderDetail и clearOrderDetail', () => {
    const order = {
      _id: '1',
      number: 1,
      status: 'done',
      name: 'Test',
      createdAt: '',
      updatedAt: '',
      ingredients: []
    };
    let state = rootReducer(
      undefined,
      fetchOrderByNumber.fulfilled(order, '', 1)
    );
    expect(state.orderDetail.order).toEqual(order);

    state = rootReducer(state, clearOrderDetail());
    expect(state.orderDetail.order).toBeNull();
  });
});
