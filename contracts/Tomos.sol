pragma solidity ^0.4.0;

contract Tomos {

  bytes32[][] tbl;
  bytes32[] tableNames;
  bytes32[] tblTemp;
  mapping (bytes32 => bytes32[][]) tables;

  /**
   * Create a new table within the database.
   * @param tableName Name of new table.
   * @param schema Definition of table schema.
   * @param dataTypes Definition of schema data types.
   */
  function createTable (bytes32 tableName, bytes32[] schema, bytes32[] dataTypes) {
    for (uint i = 0; i < tableNames.length; i++) {
      if (tableName == tableNames[i]) {
        return;
      }
    }
    tableNames.push(tableName);
    tables[tableName].push(schema);
    tables[tableName].push(dataTypes);
  }

  /**
   * Read entire contents of table.
   * @param tableName Name of new table.
   * @return Flattened table contents.
   */
  function readTable (bytes32 tableName) returns (bytes32[]) {
    tables[tableName];
    for (uint i = 0; i < tables[tableName].length; i++) {
      for (uint j = 0; j < tables[tableName][i].length; j++) {
        tblTemp.push(tables[tableName][i][j]);
      }
    }
    return tblTemp;
  }

  /**
   * Get table names.
   * @return Table names.
   */
  function getTableNames () returns (bytes32[]) {
    return tableNames;
  }

  /**
   * Create a new row in a table.
   * @param tableName Name of table to create row.
   * @param newRow Definitions of new row data.
   */
  function createRow (bytes32 tableName, bytes32[] newRow) {
    if (tables[tableName].length == 0) {
      return;
    }
    tables[tableName].push(newRow);
  }

  /**
   * Get width of a table.
   * @param tableName Name of desired table.
   * @return Width of table.
   */
  function getTblWidth (bytes32 tableName) returns (uint) {
    return tables[tableName][0].length;
  }

  /**
   * Search through matched records and update a field.
   * @param tableName Name of desired table.
   * @param searchColName Search column name.
   * @param searchVal Search value.
   * @param colName Column name to update.
   * @param value Value to update field.
   */
  function updateTable (bytes32 tableName, bytes32 searchColName, bytes32 searchVal, bytes32 colName, bytes32 value) {
    int8 searchIndex = -1;
    int8 changeIndex = -1;

    for (uint i = 0; i < tables[tableName][0].length; i++) {
      if (tables[tableName][0][i] == searchColName) {
        searchIndex = int8(i);
      }
      if (tables[tableName][0][i] == colName) {
        changeIndex = int8(i);
      }
    }
    if (searchIndex == -1 || changeIndex == -1) {
      return;
    }

    for (uint j = 1; j < tables[tableName].length; j++) {
      if (tables[tableName][j][uint(searchIndex)] == searchVal) {
        tables[tableName][j][uint(changeIndex)] = value;
      }
    }
  }

  /**
   * Delete a table row via matched column name and value.
   * @param tableName Name of desired table.
   * @param searchColName Search column name.
   * @param searchVal Search value.
   */
  function removeRow(bytes32 tableName, bytes32 searchColName, bytes32 searchVal) {
    int8 columnIndex = -1;

    for (uint i = 0; i < tables[tableName][0].length; i++) {
      if (tables[tableName][0][i] == searchColName) {
        columnIndex = int8(i);
      }
    }
    if (columnIndex == -1) {
      return;
    }

    for (uint j = 1; j < tables[tableName].length; j++) {
      if (tables[tableName][j][uint(columnIndex)] == searchVal) {
        removeRowHelper(tableName, j);
        j--;
      }
    }
  }

  /**
   * Helper function called by removeRow function that deletes a specific row
   * @param tableName Name of desired table.
   * @param index Row to delete.
   */
  function removeRowHelper(bytes32 tableName, uint index)  returns(uint[]) {
    if (index >= tables[tableName].length) {
      return;
    }

    for (uint i = index; i<tables[tableName].length - 1; i++){
      tables[tableName][i] = tables[tableName][i + 1];
    }
    delete tables[tableName][tables[tableName].length - 1];
    tables[tableName].length--;
  }

  /**
   * Query data by row and value in table
   * @param tableName Name of desired table.
   * @param colName Column to search.
   * @param value Value to match.
   * @return Matched rows.
   */
  function searchTable(bytes32 tableName, bytes32 colName, bytes32 value) returns(bytes32[]) {
    int8 index = -1;

    for (uint i = 0; i < tables[tableName][0].length; i++) {
      if (tables[tableName][0][i] == colName) {
        index = int8(i);
      }
    }

    if (index == -1) {
      return;
    }

    for (uint j = 1; j < tables[tableName].length; j++) {
      if (tables[tableName][j][uint(index)] == value) {
        for (uint k = 0; k < tables[tableName][j].length; k++) {
          tblTemp.push(tables[tableName][j][k]);
        }
      }
    }

    return tblTemp;
  }

}