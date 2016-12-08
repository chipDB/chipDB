import React, { Component } from 'react';
import './App.css';
import Login from './containers/login.js';

//import AccountListContainer from 'components/AccountList/AccountListContainer'
import EthDb from 'components/AccountList/ethDb';

        //  <AccountListContainer web3={this.props.web3} />
class App extends Component {
  render () {
    return (
      <div className="App">
        {/*<EthDb web3={this.props.web3} />*/}
        <Login web3={this.props.route.web3}/>
      </div>
    )
  }
}

export default App
