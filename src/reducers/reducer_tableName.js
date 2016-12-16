import { TABLE_NAME } from '../actions/getTableName';

const initialState = {
  tableName: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TABLE_NAME:
      const stateClone = Object.assign({}, state);
      stateClone.tableName.push(action.payload);
      return stateClone;
    default: return state;
  }
}