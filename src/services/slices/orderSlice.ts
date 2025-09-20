import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { TConstructorType } from './constructorSlice';

type TOrderState = {
  isOrderLoading: boolean;
  order: TOrder | null;
  error: string | null;
  ingredients: string[];
};

const initialState: TOrderState = {
  isOrderLoading: false,
  order: null,
  error: null,
  ingredients: []
};

export const createAndSubmitOrder = createAsyncThunk(
  'orderSlice/createAndSubmitOrder',
  async (data: TConstructorType, { dispatch }) => {
    dispatch(createOrder(data));
    const ingredients = data.ingredients.map((ingredient) => ingredient._id);
    if (data.bun) {
      ingredients.unshift(data.bun._id);
      ingredients.push(data.bun._id);
    }
    return await orderBurgerApi(ingredients);
  }
);

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<TConstructorType>) => {
      state.ingredients = action.payload.ingredients.map(
        (ingredient) => ingredient._id
      );

      if (action.payload.bun) {
        state.ingredients.unshift(action.payload.bun._id);
        state.ingredients.push(action.payload.bun._id);
      }
    },
    clearOrder: (state) => {
      state.order = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAndSubmitOrder.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(createAndSubmitOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.order = action.payload.order;
        state.error = null;
      })
      .addCase(createAndSubmitOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message!;
      });
  },
  selectors: {
    getIsOrderLoading: (state) => state.isOrderLoading,
    getOrder: (state) => state.order
  }
});

export const { getIsOrderLoading, getOrder } = orderSlice.selectors;

export const { createOrder, clearOrder } = orderSlice.actions;

export default orderSlice;
