import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActiveAccount } from '../actions/activeAccount';
import { bindActionCreators } from 'redux';
import { getAccounts } from '../actions/getAccounts';
import { Link } from 'react-router';

class Home extends Component {

  render () {
    console.log('Props on Home:', this.props);
    return (
      <div>
        <Link to='/table'>Table</Link>
      </div>
    )
  }
}

function mapStateToProps({activeAccount}) {
  return { activeAccount };
}

export default connect(mapStateToProps)(Home);