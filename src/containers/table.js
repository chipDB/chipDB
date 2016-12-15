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
    eth.readTable.call('table_a').then((value) => {
      const result = value.reduce((acc, val, i, arr) => {
          if(i % 3 === 0) acc.push([]);                 //get tablewith for 3
          acc[acc.length - 1].push(web3.toAscii(val));
          return acc;
        }, []);
      this.props.getTableData(result);
    });
  }
  // _readAll () {
  //   const eth = ethDb.deployed();
  //   eth.readAll.call().then((value) => {
  //     const result = value.reduce((acc, val, i, arr) => {
  //         if(i % 3 === 0) acc.push([]);                 //get tablewith for 3
  //         acc[acc.length - 1].push(web3.toAscii(val));
  //         return acc;
  //       }, []);
  //     this.props.getTableData(result);
  //   });
  // }

  _renderHeader(data) {
    if(!data.length) return;
    return data[0].map((el, ind) => {
      return <td key={ind}>{el.toUpperCase()}</td>
    });
  }

  _renderBody(data) {
    if(!data.length) return;
    return data.map((row, ind) => {
      if(!ind) { return; }
      return (<tr>
        {row.map((item, ind) => {
          return <td key={ind}>{item}</td>
        })}
      </tr>)
    });
  }

  render() {
    console.log('Props on Table:', this.props);
    if (!this.props.tableData) {
      return;
    }
    return (
      <div>
        <table className='table'>
          <thead>
            <tr></tr>
            <tr>{this._renderHeader(this.props.tableData.tableData)}</tr>
          </thead>
          <tbody>
            {this._renderBody(this.props.tableData.tableData)}
          </tbody>
        </table>
        <CrudTabs mainAccount={this.props.activeAccount} tableData={this.props.tableData.tableData} readAll={this._readAll.bind(this)}/>
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