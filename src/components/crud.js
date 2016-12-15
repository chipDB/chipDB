import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import { web3, ethDb } from '../web3Controller';
import Form from './form';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

export default class TabsExampleSwipeable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  // _handleCreate(arr) {
  //   this._createRow(arr);
  // }

  // _handleUpdate(arr) {
  //   this._updateRow(arr);
  // }

  // _createRow(arr) {
  //   const self = this;
  //   const eth = ethDb.deployed();
  //     eth.create(arr, {from: this.props.mainAccount, gas: 4700000}).then((val) => {
  //     console.log('Return Row: ', val);
  //     this.props.readAll();
  //     });
  // }
  _createRow(arr) {
    const self = this;
    const eth = ethDb.deployed();
      eth.createRow(this.props.tableName, arr, {from: this.props.mainAccount, gas: 4700000}).then((val) => {
      console.log('Return Row: ', val);
      this.props.readAll();
      });
  }

  _updateRow(arr) {
    const self = this;
    const eth = ethDb.deployed();
    console.log('update', arr);
    eth.updateTable(this.props.tableName, ...arr, {from: this.props.mainAccount, gas: 4700000}).then((val) => {
      this.props.readAll();
    });
  }

  _deleteRow (arr) {
    const self = this;
    const eth = ethDb.deployed();
      eth.removeRow(this.props.tableName, ...arr, {from: this.props.mainAccount, gas: 4700000}).then((val) => {
        this.props.readAll();
      });
  }


  _handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this._handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Create" value={0} />
          <Tab label="Update" value={1} />
          <Tab label="Delete" value={2} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <h2 style={styles.headline}>Create</h2>
            
            <Form schema={this.props.tableData[0]} handleSubmit={this._createRow.bind(this)}/>


          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Update</h2>
            <Form schema={["Search Column", "Search Value", "Column To Update", "Update Value"]} handleSubmit={this._updateRow.bind(this)}/>
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Delete</h2>
            <Form schema={["Delete Column", "Delete Value"]} handleSubmit={this._deleteRow.bind(this)}/>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}


          // <form className='SendCoin'>
          //     <label htmlFor='first_name'>First Name</label>
          //     <input id='first_name' className='RecipientAddress' type='text' ref={(i)=>{ if(i) { this.firstName = i}}} />
          //     <label htmlFor='last_name'>Last Name</label>
          //     <input id='last_name' className='SendAmount' type='text' ref={(i) => { if(i) { this.lastName = i}}} />
          //     <label htmlFor='address'>Address</label>
          //     <input id='address' className='SendAmount' type='text' ref={(i) => { if(i) { this.address = i}}} />
          //     <br/>
          //     <button className='SendBtn' onClick={this._handleCreate.bind(this)}>Send</button>
          //   </form>

