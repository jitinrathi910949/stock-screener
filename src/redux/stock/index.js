import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import moment from 'moment';
import { getTickerDetailsApi, getTickerDividendAndSplitApi, getTickerFinancialApi, getTickerNewsApi } from './stockApi';

const initialState = {
  tickerDetails: {},
  tickerFinance: [],
  tickerNews: [],
  tickerDividendAndSplit: {},
  loadMoreNewsUrl: ''
};

const slice = createSlice({
  name: 'tickerSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [getTickerDetailsApi.fulfilled]: (state, action) => {
      state.tickerDetails = action.payload?.data?.results;
    },
    [getTickerFinancialApi.fulfilled]: (state, action) => {
      state.tickerFinance = action.payload?.data?.results;
    },
    [getTickerNewsApi.fulfilled]: (state, action) => {
      state.tickerNews = action.payload?.data?.results;
      state.loadMoreNewsUrl = action.payload?.data?.next_url;
    },
    [getTickerDividendAndSplitApi.fulfilled]: (state, action) => {
      if(action.payload?.data) {
        const upcomingEvent = [];
        const pastEvent = [];

        const {tickerSplits: {results:splits=[]}={}, tickerDividends:{results: dividends = []}={}} = action.payload?.data
        const currentDate  = moment();
        const allRes = _.concat(splits, dividends);
        _.chain(allRes).orderBy(res => res?.record_date || res?.execution_date, 'desc').forEach(data =>{
          const compDate = data?.record_date || data?.execution_date;
          if(moment(new Date(compDate)).isAfter(currentDate)) {
            upcomingEvent.push(data);
          } else {
            pastEvent.push(data);
          }
        }).value();
      }
      state.tickerDividendAndSplit = {...action.payload?.data, upcomingEvent, pastEvent};
    },
  },
});
export const tickerAction = slice.action;
export default slice.reducer;
