import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router';
import { getTableData } from '../actions/getTableData';
import { bindActionCreators } from 'redux';
import { web3, ethDb } from '../web3Controller';
import CrudTabs from '../components/crud.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class RenderedTable extends Component {
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
      return <TableHeaderColumn key={ind}>{el.toUpperCase()}</TableHeaderColumn>
    });
  }

  _renderBody(data) {
    if(!data.length) return;
    return data.map((row, ind) => {
      if(!ind) { return; }
      return (<TableRow>
        {row.map((item, ind) => {
          return <TableRowColumn key={ind}>{item}</TableRowColumn>
        })}
      </TableRow>)
    });
  }

  render() {
    console.log('Props on Table:', this.props);
    if (!this.props.tableData) {
      return;
    }
    return (
      <div>
        <Table className='table'>
          <TableHeader>
            <TableRow></TableRow>
            <TableRow>{this._renderHeader(this.props.tableData.tableData)}</TableRow>
          </TableHeader>
          <TableBody>
            {this._renderBody(this.props.tableData.tableData)}
          </TableBody>
        </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(RenderedTable);