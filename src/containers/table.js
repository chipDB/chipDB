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
    this._getTableWidth();
  }

  _getTableWidth(){
    const eth = ethDb.deployed();
    eth.getTblWidth.call(this.props.params.table).then((val) => { //make table name dynamic
      console.log('lengthReturn', val.valueOf());
      this._readAll(val.valueOf());
    });

  }

  _convert(hex) {
   var str = '',
       i = 0,
       l = hex.length;
   if (hex.substring(0, 2) === '0x') {
       i = 2;
   }
   for (; i < l; i+=2) {
       var code = parseInt(hex.substr(i, 2), 16);
       if (code === 0) continue; // this is added
       str += String.fromCharCode(code);
   }
   return str;
  }

  _readAll (width) {
    const eth = ethDb.deployed();
    eth.readTable.call(this.props.params.table).then((value) => {
      const result = value.reduce((acc, val, i, arr) => {
          if(i % width === 0) acc.push([]);
          acc[acc.length - 1].push(web3.toAscii(val).slice(1));
          return acc;
        }, []);
      this.props.getTableData(result);
    });
  }

  _renderHeader(data) {
    if(!data.length) return;
    return data[0].map((el, ind) => {
      return <TableHeaderColumn key={ind}>{el.toUpperCase()}</TableHeaderColumn>
    });
  }

  _renderSchema(data) {
    if(!data.length) return;
    return data[1].map((el, ind) => {
      return <TableHeaderColumn key={"schema" + ind}>{el.toUpperCase()}</TableHeaderColumn>
    });
  }

  _renderBody(data) {
    if(!data.length) return;
    return data.map((row, ind) => {
      if(ind < 2) { return; }
      return (<TableRow>
        {row.map((item, ind) => {
          return <TableRowColumn key={ind}>{item}</TableRowColumn>
        })}
      </TableRow>)
    });
  }

  render() {
    console.log('params', this.props.params);
    console.log('tableName', this.props.tableName);
    console.log('Props on Table:', this.props);
    if (!this.props.tableData) {
      return;
    }
    return (
      <div>
        <Table className='table'>
          <TableHeader>
            <TableRow>{this._renderHeader(this.props.tableData.tableData)}</TableRow>
            <TableRow>{this._renderSchema(this.props.tableData.tableData)}</TableRow>
          </TableHeader>
          <TableBody>
            {this._renderBody(this.props.tableData.tableData)}
          </TableBody>
        </Table>
        <CrudTabs
          mainAccount={this.props.activeAccount}
          tableData={this.props.tableData.tableData}
          readAll={this._getTableWidth.bind(this)}
          tableName={this.props.params.table}
          />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getTableData }, dispatch);
}

function mapStateToProps({ activeAccount, tableData, tableName }) {
  return { activeAccount, tableData, tableName };
}

export default connect(mapStateToProps, mapDispatchToProps)(RenderedTable);