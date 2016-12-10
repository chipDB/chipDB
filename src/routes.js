import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Login from './containers/login';
import Home from './containers/home';
import Table from './containers/table';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/:table' component={Table} />
  </Route>
);