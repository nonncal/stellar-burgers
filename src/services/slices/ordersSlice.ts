import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersType = {
  feeds: TOrder[];
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  selectedOrder: TOrder | null;
};

const initialState: TOrdersType = {
  feeds: [],
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  selectedOrder: null
};

export const fetchGetOrderByNumber = createAsyncThunk(
  'ordersSlice/fetchGetOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const fetchGetOrders = createAsyncThunk(
  'ordersSlice/fetchGetOrders',
  async () => getOrdersApi()
);

export const fetchGetFeeds = createAsyncThunk(
  'ordersSlice/fetchGetFeeds',
  async () => getFeedsApi()
);

const ordersSlice = createSlice({
  name: 'ordersSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchGetOrders.pending, (state) => {
        state.orders = [];
        state.error = null;
      })
      .addCase(fetchGetOrders.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchGetFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      .addCase(fetchGetFeeds.pending, (state) => {
        state.feeds = [];
        state.error = null;
      })
      .addCase(fetchGetFeeds.rejected, (state, action) => {
        state.error = action.error.message!;
      })
      .addCase(fetchGetOrderByNumber.fulfilled, (state, action) => {
        state.selectedOrder = action.payload.orders[0];
        state.error = null;
      })
      .addCase(fetchGetOrderByNumber.pending, (state) => {
        state.selectedOrder = null;
        state.error = null;
      })
      .addCase(fetchGetOrderByNumber.rejected, (state, action) => {
        state.error = action.error.message!;
      });
  },
  selectors: {
    getSelectedOrder: (state) => state.selectedOrder,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getOrders: (state) => state.orders,
    getFeeds: (state) => state.feeds
  }
});

export const {
  getSelectedOrder,
  getTotal,
  getTotalToday,
  getOrders,
  getFeeds
} = ordersSlice.selectors;

export default ordersSlice;
