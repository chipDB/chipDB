import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import { web3, ethDb } from '../web3Controller';

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

  _handleCreate(e) {
    e.preventDefault()
    this._createRow([this.firstName.value, this.lastName.value, this.address.value]);
    this.firstName.value = '';
    this.lastName.value = '';
    this.address.value = '';
  }

  _createRow (arr) {
    const self = this;
    const eth = ethDb.deployed();
      eth.create(arr, {from: this.props.mainAccount, gas: 4700000}).then((val) => {
      console.log('Return Row: ', val);
      this.props.readAll();
      });
  }

  // _readAll () {
  //   const self = this;
  //   const eth = ethDb.deployed();
  //     eth.readAll.call().then((value)=> {
  //       const result = value.reduce((acc, val, i, arr) => {
  //         if(i % self.state.tableWidth === 0) acc.push([]);
  //         acc[acc.length - 1].push(web3.toAscii(val));
  //         return acc;
  //       }, []);
  //       self.setState({tableData: result}, function(){console.log('return statedata', self.state.tableData)});
  //     });
  // }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
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
            
            <form className='SendCoin'>
              <label htmlFor='first_name'>First Name</label>
              <input id='first_name' className='RecipientAddress' type='text' ref={(i)=>{ if(i) { this.firstName = i}}} />
              <label htmlFor='last_name'>Last Name</label>
              <input id='last_name' className='SendAmount' type='text' ref={(i) => { if(i) { this.lastName = i}}} />
              <label htmlFor='address'>Address</label>
              <input id='address' className='SendAmount' type='text' ref={(i) => { if(i) { this.address = i}}} />
              <br/>
              <button className='SendBtn' onClick={this._handleCreate.bind(this)}>Send</button>
            </form>


          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Update</h2>
            slide n°2
          </div>
          <div style={styles.slide}>
            <h2 style={styles.headline}>Delete</h2>
            slide n°3
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

