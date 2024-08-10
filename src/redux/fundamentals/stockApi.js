import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { fundamentalsUrlCreatorV3, fundamentalsUrlCreatorV4 } from 'utils/jwt';

const url = {
  getStock: `getStock`,
};
const apiKey = process.env.FMP_CLOUD_API_KEY;
export const getIncomeStatementApi = createAsyncThunk(
  'fundamentals/getIncomeStatementApi',
  async (params, thunkApi) => {
    try {
      // const response = await axios.get(screenerUrlCreator(`${url.deleteAlert}/${params.screenerId}`));
      const { ticker, period } = params;
      const response = await axios.get(
        fundamentalsUrlCreatorV3(`income-statement/${ticker.toUpperCase()}?period=${period}&limit=120&apikey=${apiKey}`)
      );

      if (response?.data) {
        return response?.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);
export const getKeyMetricsApi = createAsyncThunk('fundamentals/getKeyMetricsApi', async (params, thunkApi) => {
  try {
    // const response = await axios.get(screenerUrlCreator(`${url.deleteAlert}/${params.screenerId}`));
    const ticker = params.ticker;
    const response = await axios.get(
      fundamentalsUrlCreatorV3(`key-metrics-ttm/${ticker.toUpperCase()}?limit=40&apikey=${apiKey}`)
    );

    if (response?.data) {
      return response?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});
export const getBalanceSheetStatementApi = createAsyncThunk(
  'fundamentals/getBalanceSheetStatementApi',
  async (params, thunkApi) => {
    try {
      // const response = await axios.get(screenerUrlCreator(`${url.deleteAlert}/${params.screenerId}`));
      const { ticker, period } = params;
      const response = await axios.get(
        fundamentalsUrlCreatorV3(
          `balance-sheet-statement/${ticker.toUpperCase()}?period=${period}&limit=120&apikey=${apiKey}`
        )
      );

      if (response?.data) {
        return response?.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);
export const getCashFlowStatementApi = createAsyncThunk(
  'fundamentals/getCashFlowStatementApi',
  async (params, thunkApi) => {
    try {
      const { ticker, period } = params;
      const response = await axios.get(
        fundamentalsUrlCreatorV3(
          `cash-flow-statement/${ticker.toUpperCase()}?period=${period}&limit=120&apikey=${apiKey}`
        )
      );

      if (response?.data) {
        return response?.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);
export const getHistoricalChartApi = createAsyncThunk(
  'fundamentals/getHistoricalChartApi',
  async (params, thunkApi) => {
    try {
      const { ticker, period } = params;
      const response = await axios.get(
        fundamentalsUrlCreatorV3(`historical-chart/${period}/${ticker.toUpperCase()}?apikey=${apiKey}`)
      );

      if (response?.data) {
        return response?.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);
export const getHistoricalDailyChartApi = createAsyncThunk(
  'fundamentals/getHistoricalDailyChartApi',
  async (params, thunkApi) => {
    try {
      const { ticker, period } = params;
      const response = await axios.get(
        fundamentalsUrlCreatorV3(`historical-price-full/${ticker.toUpperCase()}?serietype=line&apikey=${apiKey}`)
      );

      if (response?.data) {
        return response?.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);
export const getProfileApi = createAsyncThunk('fundamentals/getProfileApi', async (params, thunkApi) => {
  try {
    const { ticker, period } = params;
    const response = await axios.get(fundamentalsUrlCreatorV3(`profile/${ticker.toUpperCase()}?apikey=${apiKey}`));

    if (response?.data) {
      return response?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});
export const getInstitutionalHoldersApi = createAsyncThunk(
  'fundamentals/getInstitutionalHoldersApi',
  async (params, thunkApi) => {
    try {
      const { ticker, period } = params;
      const response = await axios.get(
        fundamentalsUrlCreatorV3(`institutional-holder/${ticker.toUpperCase()}?apikey=${apiKey}`)
      );

      if (response?.data) {
        return response?.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);
export const getMutualFundHoldersApi = createAsyncThunk(
  'fundamentals/getMutualFundHoldersApi',
  async (params, thunkApi) => {
    try {
      const { ticker, period } = params;
      const response = await axios.get(
        fundamentalsUrlCreatorV3(`mutual-fund-holder/${ticker.toUpperCase()}?apikey=${apiKey}`)
      );

      if (response?.data) {
        return response?.data;
      }
      return thunkApi.rejectWithValue('Something went wrong with this');
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);
export const getETFHoldersApi = createAsyncThunk('fundamentals/getETFHoldersApi', async (params, thunkApi) => {
  try {
    const { ticker, period } = params;
    const response = await axios.get(fundamentalsUrlCreatorV3(`etf-holder/${ticker.toUpperCase()}?apikey=${apiKey}`));

    if (response?.data) {
      return response?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});
export const getInsiderTradingApi = createAsyncThunk('fundamentals/getInsiderTradingApi', async (params, thunkApi) => {
  try {
    const { ticker, period } = params;
    const response = await axios.get(
      fundamentalsUrlCreatorV4(`insider-trading?symbol=${ticker.toUpperCase()}&limit=100&apikey=${apiKey}`)
    );

    if (response?.data) {
      return response?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});
export const getStockNewsApi = createAsyncThunk('fundamentals/getStockNewsApi', async (params, thunkApi) => {
  try {
    const { ticker, period } = params;
    const response = await axios.get(
      fundamentalsUrlCreatorV3(`stock_news?tickers=${ticker.toUpperCase()}&limit=100&apikey=${apiKey}`)
    );

    if (response?.data) {
      return response?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});
export const getKeyExecutivesApi = createAsyncThunk('fundamentals/getKeyExecutivesApi', async (params, thunkApi) => {
  try {
    const { ticker, period } = params;
    const response = await axios.get(
      fundamentalsUrlCreatorV3(`key-executives/${ticker.toUpperCase()}?apikey=${apiKey}`)
    );

    if (response?.data) {
      return response?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});
export const getActivesApi = createAsyncThunk('fundamentals/getActivesApi', async (params, thunkApi) => {
  try {
    const response = await axios.get(fundamentalsUrlCreatorV3(`actives?apikey=${apiKey}`));

    if (response?.data) {
      return response?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});

export const getQuoteApi = createAsyncThunk('fundamentals/getQuoteApi', async (params, thunkApi) => {
  try {
    const { ticker, period } = params;
    const response = await axios.get(fundamentalsUrlCreatorV3(`quote/${ticker.toUpperCase()}?apikey=${apiKey}`));

    if (response?.data) {
      return response?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});
