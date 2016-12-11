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
            <Link to="/">Dashboard</Link>
          </li>
          <li className="nav-item">
            <button onClick={this._handleSubmit.bind(this)}>Sign Out</button>
          </li>
        </ul>
      )
    }
  }
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <span>chipDB</span>
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