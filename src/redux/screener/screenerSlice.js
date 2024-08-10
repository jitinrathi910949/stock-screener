import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  createScreenerApi,
  updateScreenerApi,
  getScreenerByUserApi,
  getScreenersIdApi,
  getAllCategoryApi,
  generateScreenerQueryApi,
  getScreenerBySlugApi,
  getSectorListApi,
  getStockListApi,
  getIndustryListApi,
  getScreenerByCategoryApi,
  getMostPopularScreenerIdsApi,
} from './screenerApi';
// import { createAlertApi } from './alertApi';

const initialState = {
  // businessSelected: {},
  filterPanelList: [{ data: [], bgColor: '#F2F4F9', relation: 'AND', type: 'filter', isActive: true }],
  selectedScreener: {},
  screenerList: [],
  alertList: [],
  isListLoading: false,
  categoryList: [],
  screenerQuery: '',
  screenerResult: [],
  columnSelected: [{label: 'Date', field: 'date'}, {label: 'Symbol', field: 'symbol'}],
  typeScreener: '',
  chartPatternsScreener: [],
  harminicPatternScreener: [],
  candlestickPatternScreener: [],
  mostPopularScreenerIds: [],
  screenersId: {},
  isScreenerQueryLoading: false,
  stockList: [],
  sectorList: [],
  industryList: [],
};

const type = {
  ExploreScreener: `Explore Screener`,
  FundamentalScreener: 'Fundamental Screener',
  TechnicalScreener: `Technical Screener`,
  ChartPatternsScreener: 'Chart Patterns Screener',
  HarminicPatternScreener: 'Harminik Pattern Screener',
  CandlestickPatternScreener: 'Candlestick Pattern Screener',
};

const slice = createSlice({
  name: 'screenerSlice',
  initialState,
  reducers: {
    setTypeScreener: (state, action) => {
      state.typeScreener = action.payload;
    },
    setFilterPanelList: (state, action) => {
      state.filterPanelList = action.payload;
    },
    resetSelectedScreener: (state, action) => {
      state.filterPanelList = initialState.filterPanelList;
      state.selectedScreener = {};
    },
  },
  extraReducers: {
    [createScreenerApi.fulfilled]: (state, action) => {
      state.selectedScreener = action.payload?.data;
    },
    [updateScreenerApi.fulfilled]: (state, action) => {
      state.selectedScreener = action.payload?.data;
    },
    [getScreenerByUserApi.pending]: (state) => {
      state.isListLoading = true;
      state.screenerList = [];
      state.alertList = [];
    },
    [getScreenerByUserApi.fulfilled]: (state, action) => {
      state.screenerList = action.payload;
      state.isListLoading = false;
      state.alertList = _.chain(action.payload)
        .filter((screener) => !!screener?.alert)
        .map((screener) => ({ ...screener.alert, screenerName: screener?.screenerName, screenerId: screener?._id }))
        .value();
    },
    [getScreenerByUserApi.rejected]: (state) => {
      state.isListLoading = false;
      state.screenerList = [];
      state.alertList = [];
    },
    [getScreenerByCategoryApi.pending]: (state) => {
      state.isListLoading = true;
      state.alertList = [];
    },
    [getScreenerByCategoryApi.fulfilled]: (state, action) => {
      state.isListLoading = false;

      switch (action.payload[0]?.scanCategory) {
        case type.ChartPatternsScreener:
          state.chartPatternsScreener = action.payload;
          break;
        case type.HarminicPatternScreener:
          state.harminicPatternScreener = action.payload;
          break;
        case type.CandlestickPatternScreener:
          state.candlestickPatternScreener = action.payload;
          break;
        default:
          break;
      }
    },
    [getScreenerByCategoryApi.rejected]: (state) => {
      state.isListLoading = false;
      state.alertList = [];
      state.chartPatternsScreener = [];
      state.harminicPatternScreener = [];
      state.candlestickPatternScreener = [];
    },
    [getScreenerBySlugApi.pending]: (state, action) => {
      state.selectedScreener = {};
      state.filterPanelList = [];
    },
    [getScreenerBySlugApi.fulfilled]: (state, action) => {
      state.selectedScreener = action.payload;
      state.filterPanelList = action.payload.filterPanelList;
    },
    [getScreenerBySlugApi.rejected]: (state, action) => {
      state.selectedScreener = {};
      state.filterPanelList = [];
    },
    [getScreenersIdApi.pending]: (state, action) => {
      state.selectedScreener = {};
      state.screenersId = [];
    },
    [getScreenersIdApi.fulfilled]: (state, action) => {
      state.selectedScreener = action.payload;
      state.screenersId = action.payload;
    },
    [getScreenersIdApi.rejected]: (state, action) => {
      state.selectedScreener = {};
      state.screenersId = [];
    },
    [getAllCategoryApi.fulfilled]: (state, action) => {
      state.categoryList = action.payload;
    },
    [generateScreenerQueryApi.pending]: (state, action) => {
      state.isScreenerQueryLoading = true;
      state.screenerResult = [];
    },
    [generateScreenerQueryApi.fulfilled]: (state, action) => {
      state.isScreenerQueryLoading = false;
      state.screenerQuery = action.payload?.query;
      state.screenerResult = action.payload?.result;
    },
    [generateScreenerQueryApi.rejected]: (state, action) => {
      state.isScreenerQueryLoading = false;
      state.screenerQuery = '';
      state.screenerResult = [];
    },

    [getStockListApi.fulfilled]: (state, action) => {
      let dataList = action.payload;

      if (!_.isEmpty(dataList?.data)) {
        state.stockList = _.map(dataList?.data, (stock) => ({
          name: stock?.symbol,
          action: 'SYM_SEC_VALUE',
          templateValue: stock?.symbol,
          groupedAs: '',
          templateValType: 'SIMPLE',
        }));
      } else state.stockList = [];
    },
    [getIndustryListApi.fulfilled]: (state, action) => {
      let dataList = action.payload;

      if (!_.isEmpty(dataList?.data)) {
        state.industryList = _.map(dataList?.data, (stock) => ({
          name: stock,
          action: 'SYM_SEC_VALUE',
          groupedAs: '',
          templateValue: stock,
          templateValType: 'SIMPLE',
        }));
      } else state.industryList = [];
    },
    [getSectorListApi.fulfilled]: (state, action) => {
      let dataList = action.payload;

      if (!_.isEmpty(dataList?.data)) {
        state.sectorList = _.map(dataList?.data, (stock) => ({
          name: stock,
          action: 'SYM_SEC_VALUE',
          groupedAs: '',
          templateValue: stock,
          templateValType: 'SIMPLE',
        }));
      } else state.sectorList = [];
    },
    [getMostPopularScreenerIdsApi.pending]: (state, action) => {
      state.isScreenerQueryLoading = true;
      state.mostPopularScreenerIds = [];
    },
    [getMostPopularScreenerIdsApi.fulfilled]: (state, action) => {
      state.isScreenerQueryLoading = false;
      state.mostPopularScreenerIds = action.payload;
    },
    [getMostPopularScreenerIdsApi.rejected]: (state, action) => {
      state.isScreenerQueryLoading = false;
      state.mostPopularScreenerIds = [];
    },
  },
});

export const screenerAction = slice.actions;
export default slice.reducer;
