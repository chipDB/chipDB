import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux'; 
import { setActiveAccount } from '../actions/activeAccount';
import { bindActionCreators } from 'redux';

class Header extends Component {
   _handleSubmit(event) {
    event.preventDefault();
    this.props.setActiveAccount('');
    browserHistory.push('/login');
  }
  
  _authButton() {    
    if (this.props.activeAccount) {
      return (
        <ul className="nav navbar-nav">       
          <li className="nav-item">
            <Link className="nav-link" to="/">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link float-md-right" onClick={this._handleSubmit.bind(this)}>Sign Out</Link>
          </li> 
        </ul>
      )
    }
  }
  
  render() {
    return (
        <div className="header">
          <nav className="navbar navbar-dark">
            <a className="navbar-brand">Tomos</a>
            {this._authButton()}
          </nav>
        </div>
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