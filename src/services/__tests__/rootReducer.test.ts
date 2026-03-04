import { rootReducer } from '../rootReducer';

const REQUIRED_SLICE_KEYS = [
  'burgerConstructor',
  'ingredients',
  'order',
  'feed',
  'orders',
  'orderDetail',
  'auth'
];

describe('rootReducer: настройка и работа хранилища', () => {
  it('возвращает состояние с корректной структурой стора при неизвестном экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' as const };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toBeDefined();
    REQUIRED_SLICE_KEYS.forEach((key) => {
      expect(state).toHaveProperty(key);
      expect(state[key as keyof typeof state]).toBeDefined();
    });
  });

  it('делегирует экшены дочерним редьюсерам и возвращает валидное состояние', () => {
    const unknownAction = { type: 'SOME_ACTION' as const };
    const state = rootReducer(undefined, unknownAction);

    const nextState = rootReducer(state, unknownAction);

    expect(nextState).toBeDefined();
    REQUIRED_SLICE_KEYS.forEach((key) => {
      expect(nextState).toHaveProperty(key);
      expect(nextState[key as keyof typeof nextState]).toBeDefined();
    });
  });
});
