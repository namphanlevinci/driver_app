import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient, query } from '@graphql';
import { saveJwtToken } from '@services/AsyncStoreExt';
import { showLoading, hideLoading } from './app';

const KEY_CONSTANT = 'account';

export const signIn = createAsyncThunk(
  `${KEY_CONSTANT}/signIn`,
  async (input, { dispatch }) => {
    dispatch(showLoading());

    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.SIGN_IN,
      variables: input,
    });
    
    const token = data?.generateStaffToken?.token;
    console.log('data signIn', data);
    await saveJwtToken(token);
    dispatch(hideLoading());
    return { error, data };
  },
);

export const signOut = createAsyncThunk(`${KEY_CONSTANT}/signOut`,
  async (value, { dispatch }) => {
    dispatch(showLoading());
    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.SIGN_OUT,
    });

    console.log('data signOut', data);
    console.log('error signOut', error);

    if (data?.result) {
      await saveJwtToken(null);
    }
    dispatch(hideLoading());
    return { error, data };
  }
);

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

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    isLogin: false,
    signInError: '',
    token: '',
    info: {}
  },
  reducers: {
    login(state, action) { state.isLogin = true },
    loginSuccess(state, action) { },
    loginFail(state, action) { },
    logout(state, action) {
      state.isLogin = false;
    },
    clearError(state, action){
      state.signInError = '';
    }
  },
  extraReducers: {
    [signIn.pending]: (state, action) => {
      console.log('signIn pending', action);
      state.signInError = null;
    },
    [signIn.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { error, data } = action.payload;
      const token = data?.generateStaffToken?.token;
      state.isLogin = true;
      // if (token) {
      //   state.signInError = null;
      //   state.isLogin = true;
      //   state.token = token;
      //   state.info = data?.generateStaffToken
      // } else {
      //   state.signInError = error;
      //   state.isLogin = false;
      // }
    },
    [signIn.rejected]: (state, action) => {
      state.isLogin = true;
    },
    [signOut.pending]: (state, action) => {
      // Logger.info(action, 'signIn pending');
    },
    [signOut.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { error, data } = action.payload;
      // state.isLogin = data?.result;
      state.isLogin = false;
    },
    [signOut.rejected]: (state, action) => {
      state.isLogin = false;
    },
  },
});

const { actions, reducer } = accountSlice;
export const { login, loginSuccess, loginFail, logout, clearError } = actions;
export default reducer;
