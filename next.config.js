const withTM = require('next-transpile-modules')([]);

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  target: 'serverless',
  env: {
    // FIREBASE AUTH
    FIREBASE_API_KEY: '',
    FIREBASE_AUTH_DOMAIN: '',
    FIREBASE_PROJECT_ID: '',
    FIREBASE_STORAGE_BUCKET: '',
    FIREBASE_MESSAGING_SENDER_ID: '',
    FIREBASE_APPID: '',
    FIREBASE_MEASUREMENT_ID: '',
    // AWS COGNITO AUTH
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0 AUTH
    AUTH0_CLIENT_ID: '',
    AUTH0_DOMAIN: '',
    //
    MAPBOX: '',
    // BASE_URL_USER: 'http://localhost:3050/user/api/v1',
    // BASE_URL_SCREENER: 'http://localhost:4050/screener/api/v1',
    // BASE_URL_USER: 'http://ec2-13-127-203-111.ap-south-1.compute.amazonaws.com/user/api/v1',
    // BASE_URL_SCREENER: 'http://ec2-13-127-203-111.ap-south-1.compute.amazonaws.com/screener/api/v1',
    BASE_URL_USER: 'https://api.findscan.mypip.in/user/api/v1',
    BASE_URL_SCREENER: 'https://api.findscan.mypip.in/screener/api/v1',
    BASE_URL_FUNDAMENTAL: 'https://fmpcloud.io/api/v3',
    BASE_URL_FUNDAMENTALS_V3: 'https://fmpcloud.io/api/v3',
    BASE_URL_FUNDAMENTALS_V4: 'https://fmpcloud.io/api/v4',
    ESLINT_NO_DEV_ERRORS: true,
    FMP_CLOUD_API_KEY:"d8d3f8541615274be19c1a9e11102f27"

  },
});
