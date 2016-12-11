import Web3 from 'web3';
import truffleConfig from '../truffle.js';
import ethDb from '../contracts/EthDb.sol';

const web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
const web3 = (typeof Web3 !== 'undefined') ? new Web3(Web3.currentProvider) : new Web3(new Web3.providers.HttpProvider(web3Location));
const provider = new web3.providers.HttpProvider('http://localhost:8545');
ethDb.setProvider(provider);
export { web3, ethDb };