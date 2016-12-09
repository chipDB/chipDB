import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';
import Routes from './routes';

window.addEventListener('load', function() {
  const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory} routes={Routes}/>
    </Provider>,
    document.getElementById('root')
  );
});

