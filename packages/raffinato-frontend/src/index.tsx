import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import AlertContainer from 'design-system/components/common/alert/AlertContainer';
import { FirebaseAppProvider } from 'reactfire';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home, Product, Shop } from 'pages';
import CommonLayout from 'layout/CommonLayout';
import firebaseConfig from 'auth/firebaseConfig';
import store from 'store/store';
import 'design-system/scss/index.scss';
import { AnimatePresence } from 'framer-motion';
import ProtectedRoute, { Status } from 'routes/ProtectedRoute';
import Address from 'pages/address/Address';
import AddAddress from 'pages/address/AddAddress';
import { SplashScreen } from 'design-system';

require('dotenv').config();

const App = () => {
  const location = useLocation();
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
          status={Status.SIGNED_IN}
          path="/checkout/address/add"
          component={AddAddress}
        />
        <ProtectedRoute
          status={Status.SIGNED_IN}
          path="/checkout/address"
          component={Address}
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
