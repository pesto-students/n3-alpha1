import React from 'react';
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
import { Navbar } from 'design-system';
import { Home, Product, Shop } from 'pages';
import store from 'store/store';
import { AnimatePresence } from 'framer-motion';

require('dotenv').config();

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
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
      </Switch>
    </AnimatePresence>
  );
};

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

        <App />
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
