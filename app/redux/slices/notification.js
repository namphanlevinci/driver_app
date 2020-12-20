import { graphQlClient, query, mutation } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { hideLoadingItem, showLoadingItem } from './app';

const KEY_CONSTANT = 'notification';

export const notification = createAsyncThunk(
  `${KEY_CONSTANT}/notificationList`,
  async (input, { dispatch }) => {
    // dispatch(showLoadingItem());

    const { error, data } = await graphQlClient.query({
      query: query.NOTIFICATION_LIST,
      variables: input,
    });

    console.log('data notification', data);
    console.log('error notification', error);

    // dispatch(hideLoadingItem());
    return { error, data };
  },
);

export const markReadNotification = createAsyncThunk(
  `${KEY_CONSTANT}/markReadNotification`,
  async (input, { dispatch }) => {
    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.MARK_READ,
      variables: input,
    });

    console.log('data markReadNotification', data);
    console.log('error markReadNotification', error);
    dispatch(notification({ type: 'delivery' }));
    return { error, data };
  },
);

export const markReadAllNotification = createAsyncThunk(
  `${KEY_CONSTANT}/markReadAllNotification`,
  async (input, { dispatch }) => {
    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.MARK_READ_ALL,
      variables: input,
    });

    console.log('data markReadAllNotification', data);
    console.log('error markReadAllNotification', error);
    dispatch(notification({ type: 'delivery' }));
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
      const { data } = action.payload;
      const list = data?.notifications?.list;
      if (list) {
        state.notificationList = list;
      }
    },
    [notification.rejected]: (state, action) => {
      // state.isLogin = true;
    },

    [markReadNotification.pending]: (state, action) => {
      console.log('markReadNotification pending', action);
      state.err = null;
    },
    [markReadNotification.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { data } = action.payload;
    },

    [markReadAllNotification.pending]: (state, action) => {
      console.log('markReadAllNotification pending', action);
      state.err = null;
    },
    [markReadAllNotification.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { data } = action.payload;
    },
  },
});

const { actions, reducer } = notificationSlice;
export const {} = actions;
export default reducer;
