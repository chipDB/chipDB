export const MAIN_ACCOUNT = 'MAIN_ACCOUNT';

export function getMainAccount(accounts) {
  return {
    type: MAIN_ACCOUNT,
    payload: accounts
  };
}