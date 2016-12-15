import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Login from './containers/login';
import Dashboard from './containers/dashboard';
import RenderedTable from './containers/table';
import verify from './components/verify_account';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={verify(Dashboard)} />
    <Route path='/login' component={Login} />
    <Route path='/:table' component={verify(RenderedTable)} />
  </Route>
);

