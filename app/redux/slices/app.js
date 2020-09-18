import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: { isVisible: false, message: false, bom: false, isLoadingApp: true, bottom: 100 },
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
        startUp(state){
            state.isLoadingApp = false;
        },
        animated(state){
            state.bottom = state.bottom - 100;
        }
    },
});

const { actions, reducer } = appSlice;
export const { showModal, hideModal, startUp, animated, showBom, hideBom, showMessage, hideMessage} = actions;
export default reducer;
