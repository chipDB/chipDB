import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux'; 
import { setActiveAccount } from '../actions/activeAccount';
import { bindActionCreators } from 'redux';

class Header extends Component {
   _handleSubmit(event) {
    event.preventDefault();
    this.props.setActiveAccount('');
    browserHistory.push('/');
  }
  
  _authButton() {    
    if (this.props.activeAccount) {
      return <button onClick={this._handleSubmit.bind(this)}>Sign Out</button>; 
    }
    
    return <button>Sign In</button>;
  }
  
  render() {
    return (
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">       
          <li className="nav-item">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/login">Login</Link>
          </li>
          <li className="nav-item">
            {this._authButton()}
          </li>
        </ul>
      </nav>
    )
  }
}

function mapStateToProps({ activeAccount }) {
  return { activeAccount };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({setActiveAccount}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);