import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        isVisible: false,
        message: false,
        bom: false,
        isLoadingApp: false,
        isLoading: false,
        loadingItem: false
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
        }
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
    hideLoadingItem
} = actions;
export default reducer;
