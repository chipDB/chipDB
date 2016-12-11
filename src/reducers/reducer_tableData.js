import { TABLE_DATA } from '../actions/getTableData';

const initialState = {
  tableData: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TABLE_DATA:
      return Object.assign({}, state, { tableData: action.payload });
    default: return state;
  }
}