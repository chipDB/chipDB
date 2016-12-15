export const TABLE_NAME = 'TABLE_NAME';

export function getTableName(tname) {
  return {
    type: TABLE_NAME,
    payload: tname
  };
}