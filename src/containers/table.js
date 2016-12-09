import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActiveAccount } from '../actions/activeAccount';
import { Link } from 'react-router';

class Table extends Component {

  render () {
    console.log('Props on Table:', this.props);
    return (
      <div>
        <p>Insert Table</p>
      </div>
    )
  }
}

function mapStateToProps({activeAccount}) {
  return { activeAccount };
}

export default connect(mapStateToProps)(Table);