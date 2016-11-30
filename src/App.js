import React, { Component } from 'react'
import './App.css'

//import AccountListContainer from 'components/AccountList/AccountListContainer'
import EthDb from 'components/AccountList/ethDb'

        //  <AccountListContainer web3={this.props.web3} />
class App extends Component {
  render () {
    return (
      <div className="App">
        <EthDb web3={this.props.web3} />
      </div>
    )
  }
}

export default App
