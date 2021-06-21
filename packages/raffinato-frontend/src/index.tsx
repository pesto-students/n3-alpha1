import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AlertContainer from 'design-system/components/common/alert/AlertContainer';
import { Navbar } from 'design-system';
import { Home, Product, Shop } from 'pages';
import store from 'store/store';
import 'design-system/scss/index.scss';
import 'scss/index.scss';

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
);
