export const ACTIVE_ACCOUNT = 'ACTIVE_ACCOUNT';

export function setActiveAccount(acct) {
  return {
    type: ACTIVE_ACCOUNT,
    payload: acct
  };
}