import React, {
  Component
} from 'react'

import ethDb from 'contracts/EthDb.sol';
import Web3 from 'web3';

let web3;

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
ethDb.setProvider(provider);

class EthDb extends Component {
  constructor(props){
    super(props);


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

    eth.createSchema(['123', '456', '789'], {from: '0xca98f7edb28fa147a12a7946f3b0df2ed7e803fe', gas: 4700000}).then((val) => {
      console.log('Return Val: ', val);
      eth.readAll.call().then((value)=> {
        value.forEach((item, i) => {
          console.log(i, web3.toAscii(item));
        });
        console.log('return data', value);
      });
    });


    console.log(provider);
  }
  render(){
    return <div>Test</div>
  }
}

export default EthDb