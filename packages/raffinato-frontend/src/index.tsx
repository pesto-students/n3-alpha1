import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Home, Product, Shop } from 'pages';
import AlertContainer from 'design-system/components/common/alert/AlertContainer';
import CommonLayout from 'layout/CommonLayout';
import firebaseConfig from 'auth/firebaseConfig';
import store from 'store/store';
import './index.scss';
import 'design-system/scss/index.scss';

require('dotenv').config();

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <AlertContainer />
          <Suspense fallback="loading">
            <Router>
              {/* Global navbar */}
              <CommonLayout />

              {/* Page routes */}
              <Switch>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/shop">
                  <Shop />
                </Route>
                <Route path="/product/:id">
                  <Product />
                </Route>
              </Switch>
            </Router>
          </Suspense>
        </QueryClientProvider>
      </ReduxProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
