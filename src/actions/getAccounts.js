export const MAIN_ACCOUNT = 'MAIN_ACCOUNT';

export function getAccounts(accounts) {
  return {
    type: MAIN_ACCOUNT,
    payload: accounts
  };
}