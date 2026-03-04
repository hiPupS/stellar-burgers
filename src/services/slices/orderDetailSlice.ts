import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

type TOrderDetailState = {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderDetailState = {
  order: null,
  loading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'orderDetail/fetch',
  async (number: number, { rejectWithValue }) => {
    try {
      const data = await getOrderByNumberApi(number);
      if (data?.success && data.orders?.length) {
        return data.orders[0];
      }
      return rejectWithValue('Заказ не найден');
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Ошибка загрузки заказа'
      );
    }
  }
);

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    clearOrderDetail: (state) => {
      state.order = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrderDetail } = orderDetailSlice.actions;
export const orderDetailReducer = orderDetailSlice.reducer;
