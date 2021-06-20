import React from 'react';
import ReactDOM from 'react-dom';
import './design-system/scss/index.scss';
import './scss/index.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './design-system';
import { Home, Product, Shop } from './pages';
// import reportWebVitals from './reportWebVitals';

require('dotenv').config();

ReactDOM.render(
  <React.StrictMode>
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
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// eslint-disable-next-line no-console
// reportWebVitals(console.log);
