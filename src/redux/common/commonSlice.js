import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { searchApi, searchExchangeApi } from './commonApi';

const initialState = {
  // businessSelected: {},
  searchList: [],
  searchExchangeList: [],
  isSearching: false,
  searchText: '',
};

const slice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSearching: (state, action) => {
      state.isSearching = action.payload;
    },
  },
  extraReducers: {
    [searchApi.pending]: (state, action) => {
      state.isSearching = true;
    },
    [searchApi.fulfilled]: (state, action) => {
      state.isSearching = false;
      state.searchList = action.payload;
    },
    [searchApi.rejected]: (state, action) => {
      state.isSearching = false;
    },
    [searchExchangeApi.pending]: (state, action) => {
      // state.isSearching = true;
    },
    [searchExchangeApi.fulfilled]: (state, action) => {
      // state.isSearching = false;
      state.searchExchangeList = action.payload;
    },
    [searchExchangeApi.rejected]: (state, action) => {
      state.isSearching = false;
    },
  },
});
export const commonAction = slice.actions;

export default slice.reducer;
