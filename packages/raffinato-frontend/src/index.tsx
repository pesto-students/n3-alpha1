import React, { Suspense, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import { Provider as ReduxProvider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from 'framer-motion';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';

import AlertContainer from 'design-system/components/common/alert/AlertContainer';
import {
  Home,
  Product,
  Shop,
  Address,
  AddAddress,
  ConfirmOrder,
  Payment,
  Contact,
  Order,
  About,
} from 'pages';
import { SplashScreen } from 'design-system';
import CommonLayout from 'layout/CommonLayout';
import firebaseConfig from 'auth/firebaseConfig';
import ProtectedRoute, { Status } from 'routes/ProtectedRoute';
import store from 'store/store';
import 'design-system/scss/index.scss';
import './index.scss';
import useRefreshToken from 'hooks/useRefreshToken';
import { fetchSettings } from 'store/settingsSlice';
import { useAppDispatch } from 'hooks/useRedux';
import useScrollToTop from 'hooks/useScrollToTop';
import ErrorBoundary from 'components/ErrorBoundary';

require('dotenv').config();

const persistor = persistStore(store);

const { REACT_APP_ENVIRONMENT, REACT_APP_SENTRY_DSN } = process.env;

Sentry.init({
  dsn: REACT_APP_SENTRY_DSN,
  environment: REACT_APP_ENVIRONMENT,
});

const App = () => {
  // todo: handle global loader
  // todo: fix route animation
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSettings());
  });
  const location = useLocation();
  useRefreshToken();
  useScrollToTop();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>

        <ProtectedRoute
          exact
          status={Status.SIGNED_IN}
          path={['/user/address', '/checkout/address']}
          component={Address}
        />
        <ProtectedRoute
          status={Status.SIGNED_IN}
          path="/checkout/address/add"
          component={AddAddress}
        />
        <ProtectedRoute
          status={Status.SIGNED_IN}
          path="/checkout/confirm"
          component={ConfirmOrder}
        />
        <ProtectedRoute
          status={Status.SIGNED_IN}
          path="/checkout/payment"
          component={Payment}
        />
        <ProtectedRoute
          status={Status.SIGNED_IN}
          path="/orders"
          component={Order}
        />
      </Switch>
    </AnimatePresence>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
        <ReduxProvider store={store}>
          <PersistGate loading={<SplashScreen />} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <AlertContainer />
              <Suspense fallback={<SplashScreen />}>
                <Router>
                  {/* Global navbar */}
                  <CommonLayout />
                  <App />
                  {/* todo: add footer */}
                </Router>
              </Suspense>
            </QueryClientProvider>
          </PersistGate>
        </ReduxProvider>
      </FirebaseAppProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
