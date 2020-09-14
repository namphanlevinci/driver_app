import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: { isVisible: false, isLoadingApp: true },
    reducers: {
        showModal(state) {
            state.isVisible = true;
        },
        hideModal(state) {
            state.isVisible = false;
        },
        startUp(state){
            state.isLoadingApp = false;
        }
    },
});

const { actions, reducer } = appSlice;
export const { showModal, hideModal, startUp} = actions;
export default reducer;
