import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ethDb from '../../contracts/EthDb.sol';
import { getTableData } from '../actions/getTableData';
import { bindActionCreators } from 'redux';

class Table extends Component {
  componentDidMount() {
    const provider = new this.props.route.web3.providers.HttpProvider('http://localhost:8545')
    ethDb.setProvider(provider);
    console.log(this.props);
    const eth = ethDb.deployed();
    const promise = eth.readAll.call();
    this.props.getTableData(promise, 3); //swap for tabledwidth later
  }

  render() {
    console.log('Props on Table:', this.props);
    return (
      <div>
        <table>
          <thead>
            <tr>{}</tr>
            <tr>{}</tr>
          </thead>
          <tbody>
            {}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTableData }, dispatch);
}

function mapStateToProps({ activeAccount, tableData }) {
  return { activeAccount, tableData };
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);