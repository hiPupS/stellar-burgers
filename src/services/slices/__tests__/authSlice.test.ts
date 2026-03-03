import {
  authReducer,
  login,
  register,
  logout,
  fetchUser,
  updateUser,
  setAuthChecked,
  clearError
} from '../authSlice';

const mockUser = { email: 'test@test.com', name: 'Test' };

jest.mock('@api', () => ({}));

describe('authSlice: редьюсер авторизации', () => {
  it('должен возвращать начальное состояние', () => {
    const state = authReducer(undefined, { type: 'UNKNOWN' });
    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      loading: false,
      error: null
    });
  });

  it('login.pending выставляет loading: true и сбрасывает error', () => {
    const state = authReducer(
      { user: null, isAuthChecked: false, loading: false, error: 'Err' },
      login.pending('', { email: '', password: '' })
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('login.fulfilled записывает user', () => {
    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      login.fulfilled(mockUser, '', { email: '', password: '' })
    );
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });

  it('login.rejected записывает error', () => {
    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      login.rejected(
        new Error('Ошибка'),
        '',
        { email: '', password: '' },
        'Ошибка'
      )
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });

  it('register.fulfilled записывает user', () => {
    const state = authReducer(
      { user: null, isAuthChecked: false, loading: true, error: null },
      register.fulfilled(mockUser, '', {
        email: '',
        password: '',
        name: ''
      })
    );
    expect(state.user).toEqual(mockUser);
  });

  it('logout.fulfilled очищает user', () => {
    const state = authReducer(
      { user: mockUser, isAuthChecked: true, loading: false, error: null },
      logout.fulfilled(undefined, '', undefined)
    );
    expect(state.user).toBeNull();
  });

  it('logout.rejected очищает user', () => {
    const state = authReducer(
      { user: mockUser, isAuthChecked: true, loading: false, error: null },
      logout.rejected(new Error('Ошибка'), '', undefined)
    );
    expect(state.user).toBeNull();
  });

  it('fetchUser.fulfilled записывает user и isAuthChecked', () => {
    const state = authReducer(
      { user: null, isAuthChecked: false, loading: false, error: null },
      fetchUser.fulfilled(mockUser, '', undefined)
    );
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('fetchUser.rejected сбрасывает user и выставляет isAuthChecked', () => {
    const state = authReducer(
      { user: mockUser, isAuthChecked: false, loading: false, error: null },
      fetchUser.rejected(new Error('Ошибка'), '', undefined)
    );
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('updateUser.fulfilled обновляет user', () => {
    const state = authReducer(
      { user: mockUser, isAuthChecked: true, loading: false, error: null },
      updateUser.fulfilled({ ...mockUser, name: 'New' }, '', { name: 'New' })
    );
    expect(state.user?.name).toBe('New');
  });

  it('setAuthChecked выставляет isAuthChecked', () => {
    const state = authReducer(
      { user: null, isAuthChecked: false, loading: false, error: null },
      setAuthChecked()
    );
    expect(state.isAuthChecked).toBe(true);
  });

  it('clearError сбрасывает error', () => {
    const state = authReducer(
      { user: null, isAuthChecked: false, loading: false, error: 'Err' },
      clearError()
    );
    expect(state.error).toBeNull();
  });
});
