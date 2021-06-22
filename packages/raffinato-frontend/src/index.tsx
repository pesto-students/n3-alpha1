import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import AlertContainer from 'design-system/components/common/alert/AlertContainer';
import { Navbar } from 'design-system';
import { Home, Product, Shop } from 'pages';
import store from 'store/store';

require('dotenv').config();

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
