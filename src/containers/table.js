import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTableData } from '../actions/getTableData';
import { bindActionCreators } from 'redux';
import { web3, Tomos } from '../web3Controller';
import CrudTabs from '../components/crud.js';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class RenderedTable extends Component {
  componentDidMount() {
    this._getTableWidth();
  }

  _getTableWidth(){
    const tomos = Tomos.deployed();
    tomos.getTblWidth.call(this.props.params.table).then((val) => { 
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
       if (code === 0) continue;
       str += String.fromCharCode(code);
   }
   return str;
  }

  _readAll (width) {
    const tomos = Tomos.deployed();
    tomos.readTable.call(this.props.params.table).then((value) => {
       let result = value.reduce((acc, val, i, arr) => {
          if(i % width === 0) acc.push([]);
          acc[acc.length - 1].push(web3.toAscii(val).slice(1));
          return acc;
        }, []);

      result = result.map((row, ind) => {
        if (ind < 2) { return row; }
        return row.map((val, ind) => {
          const type = result[1][ind];
          if (type === 'Number') {
            return +val;
          }

          if (type === 'Datetime') {
            return new Date(val);
          }

          if (type === 'Boolean') {
            return val === 'true';
          }

          return val;
        })
      })
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
      return (<TableRow key={ind}>
        {row.map((item, ind) => {
          return <TableRowColumn key={ind}>{item}</TableRowColumn>
        })}
      </TableRow>)
    });
  }

  render() {
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