import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'utils/axios';
import { screenerUrlCreator, fundamentalUrlCreator } from 'utils/jwt';

const url = {
  search: `search`,
};

export const searchApi = createAsyncThunk('findScan/screener/searchApi', async (params, thunkApi) => {
  try {
    const response = await axios.get(screenerUrlCreator(url.search), { params });
    if (_.isArray(response.data?.data)) {
      return response.data?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});

export const searchExchangeApi = createAsyncThunk(
  'findScan/fundamental/searchExchangeApi',
  async (params, thunkApi) => {
    try {
      const response = await axios.get(
        fundamentalUrlCreator(
          `${url.search}?query=${params}&limit=10&exchange=NASDAQ&apikey=d8d3f8541615274be19c1a9e11102f27`
        )
      );
      if (_.isArray(response.data)) {
        var res = response.data.map((obj) => ({
            name: obj.symbol,
            type: 'STOCK',
            fullName: obj.name,
          }));
        return res;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);
