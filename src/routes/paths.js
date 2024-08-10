function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_SCREENER = '/screener';
const ROOTS_AUTH = '/auth';
const ROOTS_PROFILE = '/profile';
export const ROOTS_SEARCH = '/search';
const ROOTS_STOCK = '/stock';
const ROOTS_CATEGORY = '/screener/category'

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
};

export const PATH_PAGE = {
  page404: '/404',
  page500: '/500',
};

export const PATH_SCREENER = {
  root: ROOTS_SCREENER,
  fundamentalScreener: path(ROOTS_CATEGORY, '/fundamental'),
  technicalScreener: path(ROOTS_CATEGORY, '/technical'),
  chartPatternScreener: path(ROOTS_CATEGORY, '/chart-pattern'),
  harminicPatternScreener: path(ROOTS_CATEGORY, '/harminic-pattern'),
  candleStickScreener: path(ROOTS_CATEGORY, '/candle-stick'),
  newScreener: path(ROOTS_SCREENER, '/new-screener'),
};

export const PATH_STOCK = {
  root: ROOTS_STOCK
}

export const PATH_PROFILE = {
  root: ROOTS_PROFILE,
  user: '/user-profile',
  screener: '/manage-screener',
  alert: '/manage-alert',
};
