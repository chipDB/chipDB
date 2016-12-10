import Web3 from 'web3';
import truffleConfig from '../truffle.js';

const web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`;
export default (typeof web3 !== 'undefined') ? new Web3(Web3.currentProvider) : new Web3(new Web3.providers.HttpProvider(web3Location));