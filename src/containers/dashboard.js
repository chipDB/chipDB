import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { setActiveAccount } from '../actions/activeAccount';
//import { getAccounts } from '../actions/getAccounts';
import { Link, browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { getTableName } from '../actions/getTableName';
import { bindActionCreators } from 'redux';
import { web3, ethDb } from '../web3Controller';

    var schema = {
      '1': "String",
      '2': "Boolean",
      '3': "Number",
      '4': "Datetime"
    }
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      schema: [],
      val: []
    };
  }

  _handleToggle = () => {
    this.setState({open: !this.state.open});
  }

  _createFields = () => {
    return this.state.schema.map((val, ind) => {
      return ( 
        <div>
        <TextField
          onKeyDown={(event) => {if(event.keyCode == 13)this.handleClick()}}
          id={'text' + ind}
          key={'text' + ind}
          fullWidth={true}
          />
         <SelectField
          id={'select'+ ind}
          key={'select'+ ind}
          floatingLabelText="Datatype"
          value={this.state.val[ind]}
          onChange={this._handleChange.bind(this, ind)}
          >
          <MenuItem value={1} primaryText={schema[1]} />
          <MenuItem value={2} primaryText={schema[2]} />
          <MenuItem value={3} primaryText={schema[3]} />
          <MenuItem value={4} primaryText={schema[4]} />
         </SelectField> 
      </div> 
      )
   });                 
 };

  _submitTable = () => {
    const dataTypes = this.state.val.map( v => schema[v]);
    const submitSchema = this.state.schema.map( ele => {
    return document.getElementById('text' + ele).value;
    });
    const tableName = document.getElementById('tableName').value;
    const eth = ethDb.deployed();
    console.log(tableName, submitSchema, dataTypes);
    eth.createTable(tableName, submitSchema, dataTypes, {from: this.props.activeAccount, gas: 4700000}).then((val) => {
      browserHistory.push(`/${tableName}`);
    });
  }

  _handleChange = (i, event, ind, val) => {
    let copy = Object.assign({}, this.state);
    copy.val[i] = val;
    this.setState(copy);
  }

  _handleClick = () => {
    let copy = Object.assign({}, this.state);
    copy.schema.push(copy.schema.length);
    copy.val.push(null);
    this.setState(copy);
  }
 
  componentDidMount() {
    var html = document.documentElement;
    html.style.backgroundColor = 'white';

    const eth = ethDb.deployed();
    eth.getTableNames.call().then(tableNamesArray => {
      const tableNames = tableNamesArray.map(val => web3.toAscii(val));

      console.log('tableName', tableNames);
      this.props.getTableName(tableNames);
    });
  }

  render () {
    console.log('browserHistory', browserHistory.getCurrentLocation());
    console.log('tableName render', this.props.tableName.tableName);
    return (
      <div>
        {this.props.tableName.tableName.map((tbl) => <RaisedButton label={<Link to={`/${tbl}`}>{tbl}</Link>} />)}
        <RaisedButton label="New Table" onClick={this._handleToggle} />
        <Dialog open={this.state.open} width={300}>
          <TextField id="tableName" hintText="Table name"/>      
          <AppBar title="Create Schema" onClick={this._handleToggle} />
          <RaisedButton label="Make Table" onClick={this._submitTable}/>
          <RaisedButton label="Add Field" onClick={this._handleClick}/>
          {this._createFields()}
        </Dialog>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getTableName}, dispatch);
}

function mapStateToProps({activeAccount, Accounts, tableName}) {
  return { activeAccount, Accounts, tableName };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);