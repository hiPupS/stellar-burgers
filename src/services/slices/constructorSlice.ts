import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createOrder } from './orderSlice';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient | null>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const payload = action.payload;
      if (!payload || typeof payload._id !== 'string' || !payload.id) return;
      if (!Array.isArray(state.ingredients)) {
        state.ingredients = [];
      }
      state.ingredients.push(payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const ingredients = Array.isArray(state.ingredients)
        ? state.ingredients
        : [];
      state.ingredients = ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      if (!Array.isArray(state.ingredients)) {
        state.ingredients = [];
      }
      const { fromIndex, toIndex } = action.payload;
      if (
        state.ingredients.length > 0 &&
        fromIndex >= 0 &&
        fromIndex < state.ingredients.length &&
        toIndex >= 0 &&
        toIndex < state.ingredients.length
      ) {
        const [removed] = state.ingredients.splice(fromIndex, 1);
        state.ingredients.splice(toIndex, 0, removed);
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;
export const constructorReducer = constructorSlice.reducer;
