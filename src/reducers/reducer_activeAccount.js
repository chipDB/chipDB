import { ACTIVE_ACCOUNT } from '../actions/activeAccount';

export default function(state = null, action) {
  switch (action.type) {
    case ACTIVE_ACCOUNT:
      return action.payload;
    default: return state;
  }
}