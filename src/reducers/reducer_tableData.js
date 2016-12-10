import { TABLE_DATA } from '../actions/getTableData';
import Web3 from 'web3';
console.log('getting complicated', Web3.toAscii);

export default function (state = null, action) {


  switch (action.type) {
    //parse table data with state tablewidth
    case TABLE_DATA:
    // const result = action.payload.reduce((acc, val, i, arr) => {
    //       if(i % self.state.tableWidth === 0) acc.push([]);
    //       acc[acc.length - 1].push(Web3.toAscii(val));
    //       return acc;
    //     }, []);
  console.log('payload tdata', action.width);
      return Object.assign({}, state, { tableData: action.payload });
    default: return state;
  }
}