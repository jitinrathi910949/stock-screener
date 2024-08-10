import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { screenerUrlCreator } from 'utils/jwt';

const url = {
  tickerDetails: 'tickerDetails',
  tickerNews: 'tickerNews',
  tickerDividendAndSplit : 'tickerDividendAndSplit',
  tickerFinancial: 'tickerFinancialDetails',
  loadNewsURL : 'loadMoreNews'
};

export const getTickerDetailsApi = createAsyncThunk('findScan/stock/getTickerDetailsApi', async (params, thunkApi) => {
    try {
      const response = await axios.post(screenerUrlCreator(url.tickerDetails), params);
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

  export const getTickerNewsApi = createAsyncThunk('findScan/stock/getTickerNewsApi', async (params, thunkApi) => {
    try {
      const response = await axios.post(screenerUrlCreator(url.tickerNews), params);
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

  export const getTickerDividendAndSplitApi = createAsyncThunk('findScan/stock/getTickerDividendAndSplitApi', async (params, thunkApi) => {
    try {
      const response = await axios.post(screenerUrlCreator(url.tickerDividendAndSplit), params);
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

  export const getTickerFinancialApi = createAsyncThunk('findScan/stock/getTickerFinancialApi', async (params, thunkApi) => {
    try {
      const response = await axios.post(screenerUrlCreator(url.tickerFinancial), params);
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

  export const loadMoreNewsApi = createAsyncThunk('findScan/stock/loadMoreNewsApi', async (params, thunkApi) => {
    try {
      const response = await axios.post(screenerUrlCreator(url.loadNewsURL), params);
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