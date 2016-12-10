export const TABLE_DATA = 'TABLE_DATA';

export function getTableData(tdata, width) {
  console.log('tabledata action', tdata);
  return {
    type: TABLE_DATA,
    payload: tdata,
    width: width
  };
}