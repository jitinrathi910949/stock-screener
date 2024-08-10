import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
// utils
// import * as serviceWorkerRegistration from 'serviceWorkerRegistration';

import axios from '../utils/axios';
import { setSession, decodeToken, userUrlCreator } from '../utils/jwt';
import { USER_ROLE } from '../config';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  signupData: null,
  userActivity: null,
  loginReq: {},
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  TOGGLE_INITIALIZE: (state, action) => ({
    ...state,
    isInitialized: action.payload,
  }),
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
      signupData: null,
    };
  },
  SENDOTP: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      user,
    };
  },
  VERIFYOTP: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      user,
    };
  },
  LOGIN_REQ: (state, action) => ({ ...state, loginReq: action.payload }),
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  sendOtp: () => Promise.resolve(),
  verifyUser: () => Promise.resolve(),
  getUser: () => Promise.resolve(),
  setBackLoading: () => Promise.resolve(),
  resendEmail: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window?.localStorage?.getItem('accessToken');
        if (accessToken) {
          setSession(accessToken);
          const user = await getUser();
          user.displayName = `${user.firstName} ${user.lastName}`;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  let accessToken = null;
if (typeof window !== "undefined") {
  accessToken = window?.localStorage?.getItem('accessToken');
}

  useEffect(() => {
    if (_.isEmpty(accessToken)) {
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [accessToken]);

  const login = async (params) => {
    const response = await axios.post(userUrlCreator('signin'), params);
    if (response?.data?.status === 'success') {
      const user = response.data?.data;
      if (user) {
        user.displayName = `${user.firstName} ${user.lastName}`;
        setSession(user.loginToken);
        localStorage.setItem('user_id', user._id);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
          },
        });
      }
      return user;
    }
  };

  const sendOtp = async (params) => {
    dispatch({
      type: 'LOGIN_REQ',
      payload: params,
    });
    const resp = await axios.post('auth/SendOTP', params);
    return resp.data;
  };

  const register = async ({ email, password, firstName, lastName }) => {
    const response = await axios.post(userUrlCreator('signup'), {
      email,
      password,
      firstName,
      lastName,
    });
    if (response?.data?.status === 'success') {
      const { data } = response.data;
      const user = { ...data };
      delete user.loginToken;
      user.displayName = `${user.firstName} ${user.lastName}`;
      setSession(data.loginToken);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
    }
    return response;
  };

  const logout = async () => {
    setSession(null);
    localStorage.clear();
    dispatch({ type: 'LOGOUT' });
    window?.location?.reload();
  };

  const verifyUser = async (emailToken) => {
    const response = await axios.post(userUrlCreator('verify'), {
      emailToken,
    });

    return response.date;
  };
  const resetPassword = () => {};

  const updateProfile = () => {};

  const getUser = async () => {
    try {
      const user = await axios.get(userUrlCreator('user'), {});
      return user.data?.data || {};
    } catch (err) {
      return {};
    }
  };

  const resendEmail = async () => {
    try {
      const response = await axios.post(userUrlCreator('resendVerifyEmail'), {});
      return response.data;
    } catch (err) {
      return err.reponse;
    }
  };

  const setBackLoading = (isInitialized) => {
    dispatch({
      type: 'TOGGLE_INITIALIZE',
      payload: isInitialized,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        sendOtp,
        verifyUser,
        getUser,
        resendEmail,
        setBackLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
