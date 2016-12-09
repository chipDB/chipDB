import { ACTIVE_ACCOUNT } from '../actions/activeAccount';

export default function (state = null, action) {
  console.log('Action obj:', action.payload);
  switch (action.type) {
    case ACTIVE_ACCOUNT:
      return Object.assign({}, state, { activeAccount: action.payload });
  }
  return state;
}