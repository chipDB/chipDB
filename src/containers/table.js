import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router';
import { getTableData } from '../actions/getTableData';
import { bindActionCreators } from 'redux';
import { web3, ethDb } from '../web3Controller';
import CrudTabs from '../components/crud.js';

class Table extends Component {
  componentDidMount() {

    this._readAll();
  }

  _readAll () {
    const eth = ethDb.deployed();
    eth.readAll.call().then((value) => {
      const result = value.reduce((acc, val, i, arr) => {
          if(i % 3 === 0) acc.push([]);                 //get tablewith for 3
          acc[acc.length - 1].push(web3.toAscii(val));
          return acc;
        }, []);
      this.props.getTableData(result);
    });
  }

  _renderHeader(data) {
    if(!data.length) return;
    return data[0].map((el, ind) => {
      return <td key={ind}>{el.toUpperCase()}</td>
    });
  }

  render() {
    console.log('Props on Table:', this.props);
    return (
      <div>
        <table className='table'>
          <thead>
            <tr></tr>
            <tr>{this._renderHeader(this.props.tableData.tableData)}</tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <CrudTabs mainAccount={this.props.activeAccount} readAll={this._readAll.bind(this)}/>
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