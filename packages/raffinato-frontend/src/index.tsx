import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AnimatePresence } from 'framer-motion';

import AlertContainer from 'design-system/components/common/alert/AlertContainer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import {
  Home,
  Product,
  Shop,
  Address,
  AddAddress,
  Payment,
  Order,
} from 'pages';
import { SplashScreen } from 'design-system';
import CommonLayout from 'layout/CommonLayout';
import firebaseConfig from 'auth/firebaseConfig';
import ProtectedRoute, { Status } from 'routes/ProtectedRoute';
import store from 'store/store';
import 'design-system/scss/index.scss';
import './index.scss';
import useRefreshToken from 'hooks/useRefreshToken';

require('dotenv').config();

const App = () => {
  const location = useLocation();
  useRefreshToken();

  return (
    <AnimatePresence exitBeforeEnter>
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
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <AlertContainer />
          <Suspense fallback={<SplashScreen />}>
            <Router>
              {/* Global navbar */}
              <CommonLayout />
              <App />
            </Router>
          </Suspense>
        </QueryClientProvider>
      </ReduxProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
