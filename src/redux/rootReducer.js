import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import screenerReducer from './screener/screenerSlice';
import fundamentalsReducer from './fundamentals/stockSlice';
import commonReducer from './common/commonSlice';
import stockReducer from './stock';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};
const initialState = {};

const rootReducer = combineReducers({
  ...initialState,
  screenerReducer,
  commonReducer,
  stockReducer,
  fundamentalsReducer
});

export { rootPersistConfig, rootReducer };
