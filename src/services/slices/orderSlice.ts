import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

type TOrderModalData = {
  number: number;
};

type TOrderState = {
  orderModalData: TOrderModalData | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const createOrder = createAsyncThunk<
  { number: number },
  string[],
  { rejectValue: string }
>('order/create', async (ingredientIds, { rejectWithValue }) => {
  try {
    const data = await orderBurgerApi(ingredientIds);
    if (data?.success && data.order) {
      return { number: data.order.number };
    }
    return rejectWithValue('Ошибка создания заказа');
  } catch (err) {
    return rejectWithValue(
      err instanceof Error ? err.message : 'Ошибка создания заказа'
    );
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = { number: action.payload.number };
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.payload ?? 'Ошибка';
      });
  }
});

export const { clearOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
