import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient, query } from '@graphql';
import { saveJwtToken } from '@services/AsyncStoreExt';
import { showLoadingItem, hideLoadingItem } from './app';

const KEY_CONSTANT = 'order';

export const orderList = createAsyncThunk(
    `${KEY_CONSTANT}/orderList`,
    async () => {
        // dispatch(showLoading());
        const { error, data } = await graphQlClient.query({
            query: query.ORDER_LIST,
        });

        console.log('data orderList', data);
        console.log('error orderList', error);

        // dispatch(hideLoading());
        return { error, data };
    },
);

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        getListError: '',
        new: [],
        recently: []
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
    },
});

const { actions, reducer } = orderSlice;
export const {  } = actions;
export default reducer;
