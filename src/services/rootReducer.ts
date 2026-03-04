import { combineReducers } from '@reduxjs/toolkit';
import {
  ingredientsReducer,
  constructorReducer,
  orderReducer,
  feedReducer,
  ordersReducer,
  orderDetailReducer,
  authReducer
} from './slices';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  feed: feedReducer,
  orders: ordersReducer,
  orderDetail: orderDetailReducer,
  auth: authReducer
});
