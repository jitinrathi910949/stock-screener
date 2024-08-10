// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';
import "rsuite/dist/rsuite.min.css";


// scroll bar
import 'simplebar/src/simplebar.css';

// editor
import 'react-quill/dist/quill.snow.css';

import PropTypes from 'prop-types';
// import cookie from 'cookie';
// next
import Head from 'next/head';
import App from 'next/app';
import { AuthProvider } from '../contexts/JWTContext';
import ProgressBar from '../components/ProgressBar';

// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// redux
import { store, persistor } from '../redux/store';
// theme
import ThemeProvider from '../theme';
import GlobalStyles from '../theme/globalStyles';

//
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import NotistackProvider from '../components/NotistackProvider';
import { BaseOptionChartStyle } from '../components/charts/BaseOptionChart';

import ThemeLocalization from '../components/ThemeLocalization';
import MotionLazyContainer from '../components/animate/MotionLazyContainer';


function MyApp(props) {
  const { Component, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <AuthProvider>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ThemeProvider>
                <NotistackProvider>
                  <GlobalStyles />
                  <BaseOptionChartStyle />

                  <MotionLazyContainer>
                    <ThemeLocalization>
                      {/* <RtlLayout> */}
                      {/* <ChartStyle /> */}
                      {/* <Settings /> */}
                      {/* <ProgressBarStyle /> */}
                      <ProgressBar />
                      {getLayout(<Component {...pageProps} />)}
                      {/* </RtlLayout> */}
                    </ThemeLocalization>
                  </MotionLazyContainer>
                </NotistackProvider>
              </ThemeProvider>
            </LocalizationProvider>
          </PersistGate>
        </ReduxProvider>
      </AuthProvider>
    </>
  );
}


MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};


MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context);

  // const cookies = cookie.parse(context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie);

  return {
    ...appProps,
  };
};

export default MyApp;
