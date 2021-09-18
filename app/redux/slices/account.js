import { graphQlClient, mutation, query } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { saveJwtToken } from '@services/AsyncStoreExt';
import { hideLoading, showLoading } from './app';

const KEY_CONSTANT = 'account';

export const signIn = createAsyncThunk(
  `${KEY_CONSTANT}/signIn`,
  async (input, { dispatch }) => {
    dispatch(showLoading());

    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.SIGN_IN,
      variables: input,
    });

    dispatch(hideLoading());

    const token = data?.generateStaffToken?.token;
    // console.log('data signIn', data);

    await saveJwtToken(token);

    return { error, data };
  },
);

export const signUp = createAsyncThunk(
  `${KEY_CONSTANT}/signUp`,
  async (input, { dispatch }) => {
    dispatch(showLoading());

    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.SIGN_UP,
      variables: input,
    });

    dispatch(hideLoading());
    return { error, data };
  },
);

export const signOut = createAsyncThunk(
  `${KEY_CONSTANT}/signOut`,
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
  },
);

export const acceptShipping = createAsyncThunk(
  `${KEY_CONSTANT}/acceptShipping`,
  async (input, { dispatch }) => {
    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.ACCEPT_SHPPING,
      variables: input,
    });

    console.log('data acceptShipping', data);
    console.log('error acceptShipping', error);

    return { error, data };
  },
);

export const shipperInfo = createAsyncThunk(
  `${KEY_CONSTANT}/getShipperInfo`,
  async (id, { dispatch }) => {
    // dispatch(showLoading());
    const { error, data } = await graphQlClient.query({
      query: query.GET_SHIPPER_INFO,
      variables: id,
    });

    console.log('data shipperInfo', data);
    console.log('error shipperInfo', error);

    // dispatch(hideLoading());
    return { error, data };
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    isLogin: false,
    signInError: '',
    signUpError: '',
    token: '',
    info: {},
    fcm_token: null,
    acceptShipping: true,
    popupSuccess: false,
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
    },
    loginSuccess(state, action) {},
    loginFail(state, action) {},
    logout(state, action) {
      state.isLogin = false;
    },
    clearError(state, action) {
      state.signInError = '';
      state.signUpError = '';
    },
    saveTokenDevice(state, action) {
      state.fcm_token = action.payload;
    },
    closeModal(state, action) {
      state.popupSuccess = false;
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
      const accept_shipping = data?.generateStaffToken?.accept_order;
      console.log(accept_shipping);
      if (accept_shipping === 0) {
        state.acceptShipping = false;
      } else {
        state.acceptShipping = true;
      }
      if (token) {
        state.signInError = null;
        state.isLogin = true;
        state.token = token;
        state.info = data?.generateStaffToken;
      } else {
        state.signInError = error;
        state.isLogin = false;
      }
    },
    [signIn.rejected]: (state, action) => {
      // state.isLogin = true;
    },

    [signUp.pending]: (state, action) => {
      console.log('signUp pending', action);
      state.signInError = null;
    },
    [signUp.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { error, data } = action.payload;
      const Success = data?.registerStaff?.result;

      const err = error?.message.join('');
      if (
        err === 'Internal server error' ||
        err === 'A user with the same user name or email already exists.' ||
        err === 'System error.'
      ) {
        state.signUpError = 'Email hoặc mã nhân viên đã tồn tại';
      }
      if (Success) {
        state.popupSuccess = Success;
      }
    },
    [signUp.rejected]: (state, action) => {
      // state.isLogin = true;
    },

    [signOut.pending]: (state, action) => {
      // Logger.info(action, 'signIn pending');
    },
    [signOut.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { data } = action.payload;
      state.isLogin = data?.result;
    },
    [signOut.rejected]: (state, action) => {
      // state.isLogin = true;
    },

    [acceptShipping.pending]: (state, action) => {
      // Logger.info(action, 'signIn pending');
    },
    [acceptShipping.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { data } = action.payload;
      state.acceptShipping = data?.acceptShipping?.result === 0 ? false : true;
    },
    [acceptShipping.rejected]: (state, action) => {
      // state.isLogin = false;
    },

    [shipperInfo.pending]: (state, action) => {
      // Logger.info(action, 'signIn pending');
      console.log('pending', action);
    },
    [shipperInfo.fulfilled]: (state, action) => {
      // Logger.info(action, 'signIn fulfilled');
      const { data } = action.payload;
      const accept_order = data?.getShipperInfo?.accept_order;

      state.info = data?.getShipperInfo || state.info;
      state.acceptShipping = accept_order === 0 ? false : true;
    },
  },
});

const { actions, reducer } = accountSlice;
export const {
  login,
  loginSuccess,
  loginFail,
  logout,
  clearError,
  saveTokenDevice,
  closeModal,
} = actions;
export default reducer;
