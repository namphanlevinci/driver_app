import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient, query } from '@graphql';
import { showLoadingItem, hideLoadingItem } from './app';

const KEY_CONSTANT = 'notification';

export const notification = createAsyncThunk(
  `${KEY_CONSTANT}/notificationList`,
  async (input, { dispatch }) => {
    dispatch(showLoadingItem());

    const { error, data } = await graphQlClient.query({
      query: query.NOTIFICATION_LIST,
      variables: input,
    });

    console.log('data notification', data);
    console.log('error notification', error);

    dispatch(hideLoadingItem());
    return { error, data };
  },
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    err: '',
    notificationList: [],
  },
  reducers: {},
  extraReducers: {
    [notification.pending]: (state, action) => {
      console.log('notification pending', action);
      state.err = null;
    },
    [notification.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { error, data } = action.payload;
      const list = data?.notifications?.list;
      if (list) {
        state.notificationList = list;
      }
    },
    [notification.rejected]: (state, action) => {
      // state.isLogin = true;
    },
  },
});

const { actions, reducer } = notificationSlice;
export const {} = actions;
export default reducer;
