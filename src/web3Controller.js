import Web3 from 'web3';
import truffleConfig from '../truffle.js';
import Tomos from '../contracts/Tomos.sol';

const web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
const web3 = (typeof web3 !== 'undefined') ? new Web3(Web3.currentProvider) : new Web3(new Web3.providers.HttpProvider(web3Location));
const provider = new web3.providers.HttpProvider('http://localhost:8545');
Tomos.setProvider(provider);
export { web3, Tomos };