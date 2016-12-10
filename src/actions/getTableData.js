export const TABLE_DATA = 'TABLE_DATA';

export function getTableData(tdata) {
  return {
    type: TABLE_DATA,
    payload: tdata
  };
}