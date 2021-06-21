import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';

import 'design-system/scss/index.scss';
import 'scss/index.scss';
import { Home, Product, Shop } from 'pages';
import { Navbar } from 'design-system';
import AlertContainer from 'design-system/components/common/alert/AlertContainer';
import firebaseConfig from 'auth/firebaseConfig';
import store from 'store/store';

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ReduxProvider store={store}>
        <AlertContainer />
        <Router>
          {/* Global navbar */}
          <Route path="/" exact>
            <Navbar theme="light" />
          </Route>
          <Route path="/:other" exact>
            <Navbar theme="dark" />
          </Route>

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
      </ReduxProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
