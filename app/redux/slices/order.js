import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient, query } from '@graphql';
import { saveJwtToken } from '@services/AsyncStoreExt';
import { showLoadingItem, hideLoadingItem, showLoading, hideLoading } from './app';

const KEY_CONSTANT = 'order';

export const orderList = createAsyncThunk(
    `${KEY_CONSTANT}/orderList`,
    async (value, { dispatch }) => {
        // dispatch(showLoadingItem());
        const { error, data } = await graphQlClient.query({
            query: query.ORDER_LIST,
        });

        console.log('data orderList', data);
        console.log('error orderList', error);

        // dispatch(hideLoadingItem());
        return { error, data };
    },
);

export const orderDetail = createAsyncThunk(
    `${KEY_CONSTANT}/orderDetail`,
    async (id, { dispatch }) => {
        dispatch(showLoading());
        const { error, data } = await graphQlClient.query({
            query: query.ORDER_DETAILS,
            variables: id,
        });

        console.log('data orderDetail', data);
        console.log('error orderDetail', error);

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
        orderDetail: {}
    },
    reducers: {
    },
    extraReducers: {
        [orderList.pending]: (state, action) => {
            console.log('orderList pending', action);
            state.getListError = null;
        },
        [orderList.fulfilled]: (state, action) => {

            const { error, data } = action.payload;
            const newList = data?.deliveryOrders?.new;
            const recentlyList = data?.deliveryOrders?.recently;
            if (newList) {
                state.new = newList;
                state.recently = recentlyList
            } else {
                state.getListError = error;
            }
        },


        [orderDetail.pending]: (state, action) => {
            state.orderDetail = {}
            console.log('orderDetail pending', action);
            state.getListError = null;
        },
        [orderDetail.fulfilled]: (state, action) => {

            const { error, data } = action.payload;
            const orderInfo = data?.orderDetail
            if (orderInfo) {
                state.orderDetail = orderInfo;
            }
        },
    },
});

const { actions, reducer } = orderSlice;
export const { } = actions;
export default reducer;
