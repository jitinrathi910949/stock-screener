import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  getKeyMetricsApi,
  getIncomeStatementApi,
  getBalanceSheetStatementApi,
  getCashFlowStatementApi,
  getHistoricalChartApi,
  getHistoricalDailyChartApi,
  getProfileApi,
  getInstitutionalHoldersApi,
  getETFHoldersApi,
  getMutualFundHoldersApi,
  getInsiderTradingApi,
  getStockNewsApi,
  getKeyExecutivesApi,
  getActivesApi,
  getQuoteApi,
} from './stockApi';

const initialState = {
  // businessSelected: {},
  incomeStatement: {},
  keyMetrics: {},
  balanceSheetStatement: {},
  cashFlowStatement: {},
  historicalChart: [],
  historicalDailyChart: {},
  institutionalHolders: [],
  mutualFundHolders: [],
  insiderTrading: [],
  etfHolders: [],
  stockNews: [],
  keyExecutives: [],
  actives: [],
  quote: [],
  isLoading: false,
  ticker: '',
  error: {},
};

const slice = createSlice({
  name: 'fundamentalsSlice',
  initialState,
  reducers: {
    setStock: (state, action) => {
      state.ticker = action.payload;
    },
  },
  extraReducers: {
    [getIncomeStatementApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getIncomeStatementApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.incomeStatement = action.payload;
    },
    [getIncomeStatementApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getKeyMetricsApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getKeyMetricsApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.keyMetrics = action.payload;
    },
    [getKeyMetricsApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getBalanceSheetStatementApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getBalanceSheetStatementApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.balanceSheetStatement = action.payload;
    },
    [getBalanceSheetStatementApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getCashFlowStatementApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCashFlowStatementApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cashFlowStatement = action.payload;
    },
    [getCashFlowStatementApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getHistoricalChartApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getHistoricalChartApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.historicalChart = action.payload;
    },
    [getHistoricalChartApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getHistoricalDailyChartApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getHistoricalDailyChartApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.historicalDailyChart = action.payload;
    },
    [getHistoricalDailyChartApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getProfileApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProfileApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
    },
    [getProfileApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getInstitutionalHoldersApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getInstitutionalHoldersApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.institutionalHolders = action.payload;
    },
    [getInstitutionalHoldersApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getMutualFundHoldersApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getMutualFundHoldersApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.mutualFundHolders = action.payload;
    },
    [getMutualFundHoldersApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getETFHoldersApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getETFHoldersApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.etfHolders = action.payload;
    },
    [getETFHoldersApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getInsiderTradingApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getInsiderTradingApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.insiderTrading = action.payload;
    },
    [getInsiderTradingApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getStockNewsApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getStockNewsApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.stockNews = action.payload;
    },
    [getStockNewsApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getKeyExecutivesApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getKeyExecutivesApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.keyExecutives = action.payload;
    },
    [getKeyExecutivesApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [getActivesApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getActivesApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.actives = action.payload;
    },
    [getActivesApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [getQuoteApi.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getQuoteApi.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.quote = action.payload;
    },
    [getQuoteApi.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});
export const stockFundamentalsAction = slice.actions;

export default slice.reducer;
