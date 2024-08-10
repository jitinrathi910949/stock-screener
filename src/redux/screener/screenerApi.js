import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { screenerUrlCreator } from 'utils/jwt';

const url = {
  create: `createScreener`,
  update: 'updateScreener',
  getScreenerByUser: `getScreenersByUser`,
  deleteUserScreener: 'deleteScreener',
  getScreenersId: 'getScreenersId',
  getScreenerBySlug: 'getScreenerBySlug',
  getAllCategories: 'getAllCategories',
  getScreenerByCategory: 'getScreenerByCategory',
  generateScreenerQuery: 'generateScreenerQuery',
  stockList: 'https://t8ar6leftk.execute-api.us-east-1.amazonaws.com/dev/api/v1/fundamentals/available-traded/list',
  industryList: 'https://t8ar6leftk.execute-api.us-east-1.amazonaws.com/dev/api/v1/fundamentals/industries',
  sectorList: 'https://t8ar6leftk.execute-api.us-east-1.amazonaws.com/dev/api/v1/fundamentals/sectors',
  getMostPopularScreenerIds: 'getMostPopularScreenerIds',
};

export const createScreenerApi = createAsyncThunk('findScan/screener/createScreenerApi', async (params, thunkApi) => {
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

export const updateScreenerApi = createAsyncThunk('findScan/screener/updateScreenerApi', async (params, thunkApi) => {
  try {
    const response = await axios.put(screenerUrlCreator(url.update), params);
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

export const getScreenerByUserApi = createAsyncThunk(
  'findScan/screener/getScreenerByUser',
  async (params, thunkApi) => {
    try {
      const response = await axios.get(screenerUrlCreator(url.getScreenerByUser));
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
  }
);

export const getScreenerByCategoryApi = createAsyncThunk(
  'findScan/screener/getScreenerByCategoryApi',
  async (params, thunkApi) => {
    try {
      const response = await axios.get(screenerUrlCreator(url.getScreenerByCategory), { params });
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
  }
);

export const deleteUserScreenerApi = createAsyncThunk(
  'findScan/screener/deleteUserScreenerApi',
  async (params, thunkApi) => {
    try {
      const response = await axios.delete(screenerUrlCreator(`${url.deleteUserScreener}/${params.screenerId}`));
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
  }
);

export const getScreenersIdApi = createAsyncThunk('findScan/screener/getScreenersId', async (params, thunkApi) => {
  try {
    const response = await axios.get(screenerUrlCreator(`${url.getScreenersId}/${params.screenerId}`));
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

export const getScreenerBySlugApi = createAsyncThunk(
  'findScan/screener/getScreenerBySlug',
  async (params, thunkApi) => {
    try {
      const response = await axios.get(screenerUrlCreator(`${url.getScreenerBySlug}/${params.slugUrl}`));
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
  }
);

export const getAllCategoryApi = createAsyncThunk('findScan/screener/getAllCategory', async (params, thunkApi) => {
  try {
    const response = await axios.get(screenerUrlCreator(url.getAllCategories));
    if (response.data?.data) {
      return response.data?.data;
    }
    return thunkApi.rejectWithValue('Something went wrong with this');
  } catch (err) {
    return thunkApi.rejectWithValue('Something went wrong. Please try again');
  }
});

export const generateScreenerQueryApi = createAsyncThunk(
  'findScan/screener/generateScreenerQuery',
  async (params, thunkApi) => {
    try {
      const response = await axios.post(screenerUrlCreator(url.generateScreenerQuery), params);
      console.log('response is', response.data);
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
  }
);

export const getStockListApi = createAsyncThunk(
  'findScan/screener/getStockList',

  async (params, thunkApi) => {
    try {
      const response = await axios.get(url.stockList);
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);

export const getIndustryListApi = createAsyncThunk(
  'findScan/screener/getIndustryList',

  async (params, thunkApi) => {
    try {
      const response = await axios.get(url.industryList);
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);

export const getSectorListApi = createAsyncThunk(
  'findScan/screener/getSectorList',

  async (params, thunkApi) => {
    try {
      const response = await axios.get(url.sectorList);
      if (response.data) {
        return response.data;
      }
    } catch (err) {
      return thunkApi.rejectWithValue('Something went wrong. Please try again');
    }
  }
);

export const getMostPopularScreenerIdsApi = createAsyncThunk(
  'findScan/screener/getMostPopularScreenerIds',
  async (params, thunkApi) => {
    try {
      const response = await axios.get(screenerUrlCreator(`${url.getMostPopularScreenerIds}/48`));
      console.log('response is', response.data);
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
  }
);

// export const getScreenerQueryResultApi = createAsyncThunk(
//   'findScan/screener/getScreenerQueryResult',
//   async (params, thunkApi) => {
//     try {
//       // http://ec2-34-238-168-157.compute-1.amazonaws.com/stock-screener
//     } catch (err) {
//       return thunkApi.rejectWithValue('Something went wrong. Please try again');
//     }
//   }
// );
