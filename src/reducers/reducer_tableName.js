import { TABLE_NAME } from '../actions/getTableName';

const initialState = {
  tableName: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TABLE_NAME:
      return Object.assign({}, state, { tableName: action.payload });
    default: return state;
  }
}