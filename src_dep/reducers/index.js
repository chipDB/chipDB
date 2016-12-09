import { combineReducers } from 'redux';
import ActiveAccountReducer from './reducer_activeAccount';
import MainAccountReducer from './reducer_getMainAccount';

const rootReducer = combineReducers({
  activeAccount: ActiveAccountReducer,
  mainAccount: MainAccountReducer
});

export default rootReducer;