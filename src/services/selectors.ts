import type { RootState } from './store';

const getConstructorState = (state: RootState) =>
  state.burgerConstructor;

export const selectConstructor = getConstructorState;

export const selectConstructorBun = (state: RootState) =>
  getConstructorState(state).bun;

export const selectConstructorIngredients = (state: RootState) =>
  getConstructorState(state).ingredients;

export const selectIngredients = (state: RootState) => state.ingredients;

export const selectIngredientsItems = (state: RootState) =>
  state.ingredients.items;

export const selectOrder = (state: RootState) => state.order;

export const selectOrderLoading = (state: RootState) => state.order.loading;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectFeed = (state: RootState) => state.feed;

export const selectFeedOrders = (state: RootState) => state.feed.orders;
