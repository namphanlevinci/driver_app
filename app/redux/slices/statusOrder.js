import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient, query } from '@graphql';
import { saveJwtToken } from '@services/AsyncStoreExt';
import { showLoading, hideLoading } from './app';

const KEY_CONSTANT = 'statusOrder';

export const Shipping = createAsyncThunk(
  `${KEY_CONSTANT}/shipping`,
  async (input, { dispatch }) => {
    dispatch(showLoading());
    const { error, data } = await graphQlClient.mutate({
      mutation: mutation.SHIPPING,
      variables: input,
    });

    dispatch(hideLoading());
    return { error, data };
  },
);

export const Arrived = createAsyncThunk(
    `${KEY_CONSTANT}/arrived`,
    async (input, { dispatch }) => {
      dispatch(showLoading());
      const { error, data } = await graphQlClient.mutate({
        mutation: mutation.ARRIVED,
        variables: input,
      });
  
      dispatch(hideLoading());
      return { error, data };
    },
  );

  export const Bom = createAsyncThunk(
    `${KEY_CONSTANT}/bom`,
    async (input, { dispatch }) => {
      dispatch(showLoading());
      const { error, data } = await graphQlClient.mutate({
        mutation: mutation.BOM,
        variables: input,
      });
  
      dispatch(hideLoading());
      return { error, data };
    },
  );

  export const Complete = createAsyncThunk(
    `${KEY_CONSTANT}/complete`,
    async (input, { dispatch }) => {
      dispatch(showLoading());
      const { error, data } = await graphQlClient.mutate({
        mutation: mutation.COMPLETE,
        variables: input,
      });
  
      dispatch(hideLoading());
      return { error, data };
    },
  );



const statusSlice = createSlice({
  name: 'statusOrder',
  initialState: {
    status: '',
    shipping: false,
    arrived: false,
    bom: false,
    complete: false
  },
  reducers: {
    
  },
  extraReducers: {
    [Shipping.pending]: (state, action) => {
      console.log('shipping pending', action);
      
    },
    [Shipping.fulfilled]: (state, action) => {
      
      const { error, data } = action.payload;
      const status = data?.result
      if(status){
        state.shipping = status;
      }
    },

    [Arrived.pending]: (state, action) => {
        console.log('arrived pending', action);
    },

    [Arrived.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      const status = data?.result
      if(status){
        state.arrived = status;
      }
    },

    [Bom.pending]: (state, action) => {
        console.log('bom pending', action);
    },

    [Bom.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      const status = data?.result
      if(status){
        state.bom = status;
      }
    },

    [Complete.pending]: (state, action) => {
        console.log('complete pending', action);
    },

    [Complete.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      const status = data?.result
      if(status){
        state.complete = status;
      }
    },

  },
});

const { actions, reducer } = statusSlice;
export const {} = actions;
export default reducer;
