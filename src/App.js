import React, { Component } from 'react';
import Header from './components/header';


//import Login from './containers/login';
//<AccountListContainer web3={this.props.web3} />
//<Login web3={this.props.route.web3}/>
/*<EthDb web3={this.props.web3} />*/

// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
