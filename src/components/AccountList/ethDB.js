import React, {
  Component
} from 'react'

import ethDb from 'contracts/EthDb.sol';
import Web3 from 'web3';

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
      tableWidth: 3
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
    this.props.web3.eth.getAccounts((err, accs) => {
      console.log('account: ', accs[0]);
      this.setState({mainAccount: accs[0]}, this._createSchema);
    });
  }

  _createSchema () {
    const self = this;
    const eth = ethDb.deployed();
      eth.createSchema(['first','last','address'], {from: this.state.mainAccount, gas: 4700000}).then((val) => {
      console.log('Return Schema: ', val);
      self._createRow();
      });
  }

  _createRow () {
    const self = this;
    const eth = ethDb.deployed();
      eth.create(['jimmy','johns','15th Street'], {from: this.state.mainAccount, gas: 4700000}).then((val) => {
      console.log('Return Row: ', val);
      self._readAll();
      });
  }

  // _updateRow () {
  //   const self = this;
  //   const eth = ethDb.deployed();
  //     eth.create(['jimmy','johns','15th Street'], {from: this.state.mainAccount, gas: 4700000}).then((val) => {
  //     console.log('Return Row: ', val);
  //     });
  // }

  // _deleteRow () {
  //   const self = this;
  //   const eth = ethDb.deployed();
  //     eth.create(['jimmy','johns','15th Street'], {from: this.state.mainAccount, gas: 4700000}).then((val) => {
  //     console.log('Return Row: ', val);
  //     });
  // }

  componentDidMount() {
    this._getMainAccount();
  }
  
  render() {
    return (
      <table>
        <thead>
          <tr><td>FirstName</td><td>LastName</td><td>Address</td></tr>
        </thead>
        <tbody>
          {this.state.tableData.map(this.renderAccount)}
        </tbody>
      </table>
    )
  }

  renderAccount(row, ind) {
    return <tr key={ind}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>
  }
}


export default EthDb