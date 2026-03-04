import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchOrders = createAsyncThunk(
  'orders/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка загрузки заказов'
      );
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
