import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient } from '@graphql';
import { saveJwtToken } from '@services/AsyncStoreExt';
// import { showLoading, hideLoading } from './app';

const KEY_CONSTANT = 'account';

export const signIn = createAsyncThunk(
  `${KEY_CONSTANT}/signIn`,
  async (input, { dispatch }) => {
    // dispatch(showLoading());
    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.SIGN_IN,
      variables: input,
    });

    const token = data?.generateStaffToken?.token;
    console.log('data signIn', token);
    await saveJwtToken(token);
    // dispatch(hideLoading());
    return { error, data };
  },
);

export const signOut = createAsyncThunk(`${KEY_CONSTANT}/signOut`, async () => {
  // dispatch(showLoading());
  const { error, data } = await graphQlClient.mutate({
    mutation: mutation.SIGN_OUT,
  });

  console.log('data signOut', data);
  console.log('error signOut', error);

  if (data?.result) {
    await saveJwtToken(null);
  }
  // dispatch(hideLoading());
  return { error, data };
});

const accountSlice = createSlice({
  name: 'account',
  initialState: { isLogin: false, username: null, password: null },
  reducers: {
    login(state, action) {
      state.isLogin = false;
      // state.username = action.payload.username;
      // state.password = action.payload.password;
    },
    loginSuccess(state, action) {},
    loginFail(state, action) {},
    logout(state, action) {
      state.isLogin = true;
    },
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
      if (token) {
        state.signInError = null;
        state.isLogin = true;
      } else {
        state.signInError = error;
        state.isLogin = false;
      }
    },
    // [signIn.rejected]: (state, action) => {
    //   Logger.info(action, 'accountSlice rejected');
    // },
    [signOut.pending]: (state, action) => {
      // Logger.info(action, 'signIn pending');
    },
    [signOut.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { error, data } = action.payload;
      state.isLogin = data?.result;
    },
    // [signOut.rejected]: (state, action) => {
    //   Logger.info(action, 'accountSlice rejected');
    // },
  },
});

const { actions, reducer } = accountSlice;
export const { login, loginSuccess, loginFail, logout } = actions;
export default reducer;
