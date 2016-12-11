import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Login from './containers/login';
import Home from './containers/home';
import Table from './containers/table';
import verify from './components/verify_account';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={verify(Home)} />
    <Route path='/login' component={Login} />
    <Route path='/:table' component={verify(Table)} />
  </Route>
);

