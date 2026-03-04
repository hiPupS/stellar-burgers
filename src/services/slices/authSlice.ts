import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

const setAuthTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const clearAuthTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);
      if (res?.success && res.accessToken && res.refreshToken) {
        setAuthTokens(res.accessToken, res.refreshToken);
        return res.user;
      }
      return rejectWithValue('Ошибка входа');
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка входа'
      );
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);
      if (res?.success && res.accessToken && res.refreshToken) {
        setAuthTokens(res.accessToken, res.refreshToken);
        return res.user;
      }
      return rejectWithValue('Ошибка регистрации');
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка регистрации'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      clearAuthTokens();
    } catch (err) {
      clearAuthTokens();
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка выхода'
      );
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserApi();
      if (res?.success && res.user) {
        return res.user;
      }
      return rejectWithValue('Не удалось загрузить пользователя');
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка загрузки'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const res = await updateUserApi(user);
      if (res?.success && res.user) {
        return res.user;
      }
      return rejectWithValue('Ошибка обновления');
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка обновления'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.user = null;
      })
      // fetchUser
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
        state.isAuthChecked = true;
      })
      // updateUser
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { setAuthChecked, clearError } = authSlice.actions;
export const authReducer = authSlice.reducer;
