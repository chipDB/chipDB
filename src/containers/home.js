import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActiveAccount } from '../actions/activeAccount';
import { getAccounts } from '../actions/getAccounts';
import { Link } from 'react-router';
import ethDb from '../../contracts/EthDb.sol';


class Home extends Component {
  componentDidMount() {
    this._createSchema();
  }

  _createSchema() {
    const self = this;
    const eth = ethDb.deployed();
      eth.createSchema(['first','last','address'], {from: this.props.activeAccount, gas: 4700000}).then((val) => {
      console.log('Return Schema: ', val);
      });
  }

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