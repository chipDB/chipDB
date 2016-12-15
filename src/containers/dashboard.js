import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { setActiveAccount } from '../actions/activeAccount';
//import { getAccounts } from '../actions/getAccounts';
import { Link } from 'react-router';
import ethDb from '../../contracts/EthDb.sol';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';


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
          id={'text' + this.state.schema.length}
          key={'text' + this.state.schema.length}
          fullWidth={true}
          />
         <SelectField
          id={'select'+ this.state.schema.length}
          key={'select'+ this.state.schema.length}
          floatingLabelText="Datatype"
          value={this.state.val[ind]}
          onChange={this._handleChange.bind(this, ind)}
          >
          <MenuItem value={1} primaryText="String" />
          <MenuItem value={2} primaryText="Boolean" />
          <MenuItem value={3} primaryText="Number" />
          <MenuItem value={4} primaryText="Datetime" />
         </SelectField> 
      </div> 
      )
   });                 
 };


  _handleChange = (i, event, ind, val) => {
    console.log('i', i);
    console.log('e', event);
    console.log('ind', ind);
    console.log('val', val);
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
    this._createSchema();
  }

  _createSchema() {
    const eth = ethDb.deployed();
    
    eth.createTable('table_a', ['first','last','address'], ['string','string','string'], {from: this.props.activeAccount, gas: 4700000}).then((val) => {
      console.log('Return Schema: ', val);
    });

  }

  render () {
    return (
      <div>
        <RaisedButton label={<Link to='/table'>Table</Link>} />
        <RaisedButton label="New Table" keyboardFocused={true} onClick={this._handleToggle} />
        <Dialog open={this.state.open} width={300}>      
          <AppBar title="Create Schema" onClick={this._handleToggle} />
          <RaisedButton label="Make Table" />
          <RaisedButton label="Add Field" onClick={this._handleClick}/>
          {this._createFields()}
        </Dialog>
      </div>
    )
  }
}

function mapStateToProps({activeAccount, Accounts}) {
  return { activeAccount, Accounts };
}

export default connect(mapStateToProps)(Dashboard);