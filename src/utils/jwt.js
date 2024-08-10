import jwtDecode from 'jwt-decode';
import axios from './axios';
import { BASE_URL } from '../config';

const setSession = (accessToken, token) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const decodeToken = (accessToken) => {
  if (accessToken) {
    const payload = jwtDecode(accessToken);
    return payload;
  }
  return null;
};

const userUrlCreator = (append) => `${BASE_URL.user}/${append}`;

const screenerUrlCreator = (append) => `${BASE_URL.screener}/${append}`;

const fundamentalUrlCreator = (append) => `${BASE_URL.fundamental}/${append}`;

const fundamentalsUrlCreatorV3 = (append) => `${BASE_URL.fundamentalsV3}/${append}`;

const fundamentalsUrlCreatorV4 = (append) => `${BASE_URL.fundamentalsV4}/${append}`;

export { setSession, decodeToken, userUrlCreator, screenerUrlCreator, fundamentalUrlCreator, fundamentalsUrlCreatorV3, fundamentalsUrlCreatorV4 };
