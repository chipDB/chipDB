import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import { web3, Tomos } from '../web3Controller';
import Form from './form';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
    textAlign: "center"
  },
  slide: {
    padding: 10,
    textAlign: "center"
  },
};

export default class TabsExampleSwipeable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  _createRow(arr) {
    const self = this;
    const tomos = Tomos.deployed();
      arr = arr.map(val => '_' + val);
      tomos.createRow(this.props.tableName, arr, {from: this.props.mainAccount, gas: 4700000}).then((val) => {
      this.props.readAll();
      });
  }

  _updateRow(arr) {
    const self = this;
    const tomos = Tomos.deployed();
    arr = arr.map(val => '_' + val);
    tomos.updateTable(this.props.tableName, ...arr, {from: this.props.mainAccount, gas: 4700000}).then((val) => {
      this.props.readAll();
    });
  }

  _deleteRow (arr) {
    const self = this;
    const tomos = Tomos.deployed();
    arr = arr.map(val => '_' + val);
    tomos.removeRow(this.props.tableName, ...arr, {from: this.props.mainAccount, gas: 4700000}).then((val) => {
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
          <div style={styles.slide}>
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
