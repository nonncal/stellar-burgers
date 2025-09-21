import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientsSlice from './slices/ingridientSlice';
import constructorSlice from './slices/constructorSlice';
import userSlice from './slices/userSlice';
import orderSlice from './slices/orderSlice';
import ordersSlice from './slices/ordersSlice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  userSlice,
  orderSlice,
  ordersSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
