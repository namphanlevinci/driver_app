import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient, query } from '@graphql';

const KEY_CONSTANT = 'app';

export const checkReview = createAsyncThunk(
    `${KEY_CONSTANT}/checkReview`,
    async (value, { dispatch }) => {
        const { error, data } = await graphQlClient.query({
            query: query.APP_STATUS,
        });

        console.log('data checkReview', data);
        console.log('error checkReview', error);

        return { error, data };
    },
);

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isVisible: false,
        message: false,
        bom: false,
        isLoadingApp: true,
        isLoading: false,
        loadingItem: false,
        newOrder: false,
        ratingOrder: false,
        checkReview: false,
        info: {}
    },
    reducers: {
        showModal(state) {
            state.isVisible = true;
        },
        hideModal(state) {
            state.isVisible = false;
        },
        showBom(state) {
            state.bom = true;
        },
        hideBom(state) {
            state.bom = false;
        },
        showMessage(state) {
            state.message = true;
        },
        hideMessage(state) {
            state.message = false;
        },
        startUp(state) {
            state.isLoadingApp = false;
        },
        showLoading(state) {
            state.isLoading = true;
        },
        hideLoading(state) {
            state.isLoading = false;
        },
        showLoadingItem(state) {
            state.loadingItem = true;
        },
        hideLoadingItem(state) {
            state.loadingItem = false;
        },
        showNewOrder(state) {
            state.newOrder = true;
        },
        hideNewOrder(state) {
            state.newOrder = false;
        },
        showRatingOrder(state) {
            state.ratingOrder = true;
        },
        hideRatingOrder(state) {
            state.ratingOrder = false;
        },
        infoNotification(state, action) {
            state.info = action.payload;
        },
    },
    extraReducers: {
        [checkReview.pending]: (state, action) => {
            console.log('checkReview pending', action);
            state.getListError = null;
        },
        [checkReview.fulfilled]: (state, action) => {

            const { error, data } = action.payload;

            const check = data?.appStatus?.result;

            if (check === 1) {
                state.checkReview = true;
            } else {
                state.checkReview = false;
            }
        },
    },
});

const { actions, reducer } = appSlice;
export const {
    showModal,
    hideModal,
    startUp,
    showBom,
    hideBom,
    showMessage,
    hideMessage,
    showLoading,
    hideLoading,
    showLoadingItem,
    hideLoadingItem,
    showNewOrder,
    hideNewOrder,
    showRatingOrder,
    hideRatingOrder,
    infoNotification
} = actions;
export default reducer;
