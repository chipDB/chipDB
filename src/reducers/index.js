import { combineReducers } from 'redux';
import ActiveAccountReducer from './reducer_activeAccount';
import MainAccountReducer from './reducer_getAccounts';
import TableDataReducer from './reducer_tableData';
import TableNameReducer from './reducer_tableName';

const rootReducer = combineReducers({
  activeAccount: ActiveAccountReducer,
  Accounts: MainAccountReducer,
  tableData: TableDataReducer,
  tableName: TableNameReducer
});

export default rootReducer;