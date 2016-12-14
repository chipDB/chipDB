import { MAIN_ACCOUNT } from '../actions/getAccounts';

export default function(state = null, action) {
  switch (action.type) {
    case MAIN_ACCOUNT:
      return Object.assign({}, state, { Accounts: action.payload });
    default: return state;
  }
}