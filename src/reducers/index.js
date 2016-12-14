import { combineReducers } from 'redux';
import ActiveAccountReducer from './reducer_activeAccount';
import MainAccountReducer from './reducer_getAccounts';
import TableDataReducer from './reducer_tableData';

const rootReducer = combineReducers({
  activeAccount: ActiveAccountReducer,
  Accounts: MainAccountReducer,
  tableData: TableDataReducer
});

export default rootReducer;