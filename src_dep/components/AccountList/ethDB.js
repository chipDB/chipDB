import React, {
  Component
} from 'react'

import ethDb from 'contracts/EthDb.sol';
import Web3 from 'web3';
import '../SendCoin/SendCoin.css';
import './AccountList.css'

// let web3;

// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider);
// } else {
//   // set the provider you want from Web3.providers
//   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// }

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
ethDb.setProvider(provider);

class EthDb extends Component {
  constructor(props){
    super(props);
    this.state = {
      mainAccount: '',
      tableData: [],
      tableWidth: 0
    }

    // console.log('Web3', Web3);
    //const gasPrice = Web3.eth.gasPrice;
    //console.log(gasPrice.toString(10));


    var eth = ethDb.deployed();

    eth.tblLength.call().then((val) => {
      console.log('lengthReturn', val);
    });

    eth.test.call().then((val) => {
      console.log('testReturn', val);
    });

    // console.log('eth', eth);
    // console.log('ethdeployed', ethDb.deployed());
    // eth.createSchema(['jimmy','cat','nick2'], {from: '0xc76f781b9b32cf8a557c76bed3d7a0441fee2180', gas: 4700000}).then((val)=>{
    //   console.log(val);
    //   eth.readAll.call().then((value)=> {
    //     console.log('return data', value)
    //   })
    // });

    console.log(provider);
  }

  _readAll () {
    const self = this;
    const eth = ethDb.deployed();
      eth.readAll.call().then((value)=> {
        const result = value.reduce((acc, val, i, arr) => {
          if(i % self.state.tableWidth === 0) acc.push([]);
          acc[acc.length - 1].push(self.props.web3.toAscii(val));
          return acc;
        }, []);
        self.setState({tableData: result}, function(){console.log('return statedata', self.state.tableData)});
      });
  }

  _getMainAccount () {
    console.log('_getMainAccount called');
    this.props.web3.eth.getAccounts((err, accs) => {
      console.log('account: ', accs[0]);
      this.props.web3.eth.defaultAccount = accs[0];
      this.setState({mainAccount: accs[0]}, this._createSchema);
    });
  }

  _createSchema () {
    const self = this;
    const eth = ethDb.deployed();
      eth.createSchema(['first','last','address'], {from: this.state.mainAccount, gas: 4700000}).then((val) => {
      console.log('Return Schema: ', val);
      self._getTableWidth();
      });
  }

  _getTableWidth () {
      const self = this;
      const eth = ethDb.deployed();
      eth.getTableWidth.call().then((res)=> self.setState({tableWidth: res.valueOf()}, self._readAll));
  }

  _createRow (arr) {
    const self = this;
    const eth = ethDb.deployed();
      eth.create(arr, {from: this.state.mainAccount, gas: 4700000}).then((val) => {
      console.log('Return Row: ', val);
      self._readAll();
      });
  }

  _updateRow (searchColName, searchVal, colName, value) {
    const self = this;
    const eth = ethDb.deployed();
    eth.update(searchColName, searchVal, colName, value, {from: this.state.mainAccount, gas: 4700000}).then((val) => {
      self._readAll();
    });
  }

  _deleteRow (searchColName, searchVal) {
    const self = this;
    const eth = ethDb.deployed();
      eth.remove(searchColName, searchVal, {from: this.state.mainAccount, gas: 4700000}).then((val) => {
        self._readAll();
      });
  }

  componentDidMount() {
    this._getMainAccount();
  }
  
  render() {
    console.log('Rendered!');
    if(this.state.tableData.length === 0) return null; 
    return (
      <div>
        <h1>ethDB</h1>
        <h3>Account: {this.state.mainAccount}</h3>
        <h3>Table: Contacts</h3>
        <table>
          <thead>
            <tr>{this.state.tableData[0].map(this.renderHeader)}</tr>
          </thead>
          <tbody>
            {this.state.tableData.map(this.renderRow)}
          </tbody>
        </table>
        <form className='SendCoin'>
          <label htmlFor='first_name'>First Name</label>
          <input id='first_name' className='RecipientAddress' type='text' ref={(i)=>{ if(i) { this.firstName = i}}} />
          <label htmlFor='last_name'>Last Name</label>
          <input id='last_name' className='SendAmount' type='text' ref={(i) => { if(i) { this.lastName = i}}} />
          <label htmlFor='address'>Address</label>
          <input id='address' className='SendAmount' type='text' ref={(i) => { if(i) { this.address = i}}} />
          <br/>
          <button className='SendBtn' onClick={this.handleCreate.bind(this)}>Send</button>
        </form>
        <form className='SendCoin'>
          <label htmlFor='search_column'>Search Column</label>
          <input id='search_column' className='RecipientAddress' type='text' ref={(i)=>{ if(i) { this.search_column = i}}} />
          <label htmlFor='search_value'>Search Value</label>
          <input id='search_value' className='SendAmount' type='text' ref={(i) => { if(i) { this.search_value = i}}} />
          <label htmlFor='column_to_update'>Column To Update</label>
          <input id='column_to_update' className='SendAmount' type='text' ref={(i) => { if(i) { this.column_to_update = i}}} />
          <label htmlFor='update_value'>Update Value</label>
          <input id='update_value' className='SendAmount' type='text' ref={(i) => { if(i) { this.update_value = i}}} />
          <br/>
          <button className='SendBtn' onClick={this.handleUpdate.bind(this)}>Send</button>
        </form>
        <form className='SendCoin'>
          <label htmlFor='delete_column'>Search Column</label>
          <input id='delete_column' className='RecipientAddress' type='text' ref={(i)=>{ if(i) { this.delete_column = i}}} />
          <label htmlFor='delete_value'>Search Value</label>
          <input id='delete_value' className='SendAmount' type='text' ref={(i) => { if(i) { this.delete_value = i}}} />
          <br/>
          <button className='SendBtn' onClick={this.handleDelete.bind(this)}>Send</button>
        </form>
      </div>
    )
  }

 handleCreate(e) {
    e.preventDefault()
    this._createRow([this.firstName.value, this.lastName.value, this.address.value]);
    this.firstName.value = '';
    this.lastName.value = '';
    this.address.value = '';
  }

  handleUpdate(e) {
    e.preventDefault()
    this._updateRow(this.search_column.value, this.search_value.value, this.column_to_update.value, this.update_value.value);
    this.search_column.value = '';
    this.search_value.value = '';
    this.column_to_update.value = '';
    this.update_value.value = '';
  }

  handleDelete(e) {
    e.preventDefault()
    this._deleteRow(this.delete_column.value, this.delete_value.value);
    this.delete_column.value = '';
    this.delete_value.value = '';
  }



  renderHeader(data, ind){
    return <td key={ind}>{data}</td>
  }

  renderRow(row, ind) {
    const data = [];
    if(ind === 0) return;
    row.forEach((ele, ind) => {
      data.push(<td key={ind}>{ele}</td>);
    })
    return <tr key={ind}>{data}</tr>
  }
}


export default EthDb