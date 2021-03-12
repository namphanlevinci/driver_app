import { graphQlClient, query } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  hideLoading,
  hideLoadingItem,
  showLoading,
  showLoadingItem,
} from './app';

const KEY_CONSTANT = 'order';

// DELIVERY ORDER
export const deliveryOrderList = createAsyncThunk(
  `${KEY_CONSTANT}/deliveryOrderList`,
  async (value, { dispatch }) => {
    dispatch(showLoadingItem());
    const { error, data } = await graphQlClient.query({
      query: query.DELIVERY_ORDER,
    });

    // console.log('data deliveryOrderList', data);
    // console.log('error deliveryOrderList', error);

    dispatch(hideLoadingItem());
    return { error, data };
  },
);

// RECENTLY ORDER
export const recentlyOrderList = createAsyncThunk(
  `${KEY_CONSTANT}/recentlyOrderList`,
  async (input, { dispatch }) => {
    dispatch(showLoadmore());
    const { error, data } = await graphQlClient.query({
      query: query.RECENTLY_ORDER,
      variables: input,
    });

    // console.log('data recentlyOrderList', data);
    // console.log('error recentlyOrderList', error);

    dispatch(hideLoadmore());
    return { error, data };
  },
);

// ORDER DETAILS
export const orderDetail = createAsyncThunk(
  `${KEY_CONSTANT}/orderDetail`,
  async (id, { dispatch }) => {
    dispatch(showLoading());
    const { error, data } = await graphQlClient.query({
      query: query.ORDER_DETAILS,
      variables: id,
    });

    // console.log('data orderDetail', data);
    // console.log('error orderDetail', error);

    dispatch(hideLoading());
    return { error, data };
  },
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    getListError: '',
    new: [],
    recently: [],
    orderDetail: {},
    currentPage: 0,
    total_pages: 0,
    isLoadmore: false,
  },
  reducers: {
    resetOrderDetail(state, action) {
      state.orderDetail = {};
    },
    showLoadmore(state, action) {
      state.isLoadmore = true;
    },
    hideLoadmore(state, action) {
      state.isLoadmore = false;
    },
  },
  extraReducers: {
    [deliveryOrderList.pending]: (state, action) => {
      // console.log('deliveryOrderList pending', action);
      state.getListError = null;
    },
    [deliveryOrderList.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      const newList = data?.deliveryOrders?.orders;
      if (newList) {
        state.new = newList;
      } else {
        state.getListError = error;
      }
    },

    [recentlyOrderList.pending]: (state, action) => {
      // console.log('recentlyOrderList pending', action);
      state.getListError = null;
    },
    [recentlyOrderList.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      // const recentlyList = data?.recentlyOrders?.orders;
      // if (recentlyList) {
      //   state.recently = recentlyList;
      // } else {total_pages
      //   state.getListError = error;
      // }
      state.total_pages =
        data?.recentlyOrders?.page_info?.total_pages || state.total_pages;

      state.currentPage = action?.meta?.arg?.page || 0;
      state.recently =
        state.currentPage === 1
          ? data?.recentlyOrders?.orders
          : state.recently.concat(data?.recentlyOrders?.orders);
    },

    [orderDetail.pending]: (state, action) => {
      // state.orderDetail = {}
      // console.log('orderDetail pending', action);
      state.getListError = null;
    },
    [orderDetail.fulfilled]: (state, action) => {
      const { data } = action.payload;
      const orderInfo = data?.orderDetail;
      if (orderInfo) {
        state.orderDetail = orderInfo;
      }
    },
  },
});

const { actions, reducer } = orderSlice;
export const { resetOrderDetail, showLoadmore, hideLoadmore } = actions;
export default reducer;
