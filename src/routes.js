import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Login from './containers/login';
import Home from './containers/home';
import Table from './containers/table';
import Web3 from 'web3';
import truffleConfig from '../truffle.js';

const web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
const web3Provided = (typeof web3 !== 'undefined') ? new Web3(Web3.currentProvider) : new Web3(new Web3.providers.HttpProvider(web3Location));


export default (
  <Route path='/' web3={web3Provided} component={App}>
    <IndexRoute web3={web3Provided} component={Home} />
    <Route path='/login' web3={web3Provided} component={Login} />
    <Route path='/:table' web3={web3Provided} component={Table} />
  </Route>
);