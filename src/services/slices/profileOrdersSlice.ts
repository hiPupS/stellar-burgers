import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetch',
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

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const profileOrdersReducer = profileOrdersSlice.reducer;
