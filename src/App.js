import React, { Component } from 'react';
import Header from './components/header';


//import Login from './containers/login';
//<AccountListContainer web3={this.props.web3} />
//<Login web3={this.props.route.web3}/>
/*<EthDb web3={this.props.web3} />*/

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default App;
