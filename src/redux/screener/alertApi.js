import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { screenerUrlCreator } from 'utils/jwt';

const url = {
  create: `createAlert`,
  deleteAlert: 'deleteAlert'
};

export const createAlertApi = createAsyncThunk('findScan/alert/createAlertApi', async (params, thunkApi) => {
  try {
    const response = await axios.post(screenerUrlCreator(url.create), params);
    // if (Array.isArray(response.data) && response.data.length >= 1) {
    //   const data = await response.data;
    //   return data;
    // }
    if (response.data) {
      return response.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});

export const deleteAlertApi = createAsyncThunk('findScan/screener/deleteAlertApi', async (params, thunkApi) => {
  try {
    const response = await axios.delete(screenerUrlCreator(`${url.deleteAlert}/${params.screenerId}`));
    // if (Array.isArray(response.data) && response.data.length >= 1) {
    //   const data = await response.data;
    //   return data;
    // }
    if (response.data?.data) {
      return response.data?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});
