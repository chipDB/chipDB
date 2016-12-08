import { MAIN_ACCOUNT } from '../actions/getMainAccount';

export default function (state = null, action) {
  console.log('MainAccAction obj:', action.payload);
  switch (action.type) {
    case MAIN_ACCOUNT:
      return Object.assign({}, state, { mainAccount: action.payload });
  }
  return state;
}